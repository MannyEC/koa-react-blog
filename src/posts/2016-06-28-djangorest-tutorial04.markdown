---
layout:     post
title:      Django REST framework 教程4 认证与权限
subtitle:   
class:		"note"
date:       2016-06-28
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- Django
- 译文

---
# Tutorial 4: 认证与权限 

目前的 API 没有对编辑或删除snippets的操作进行权限控制，为了实现这个功能我们需要一些更高级的机制。

- Code snippets必须有创建者.
- 只有认证用户才能创建snippets.
- 只有snippet的创建者才能修改或删除它 
- 未授权的request只能查看

## 给model增加field

现在要修改 `Snippet model`，首先增加两个field。一个用于记录创建者，另一个用于存储高亮的HTML代码。
更改`models.py`中的 `Snippet` model ：

```
owner = models.ForeignKey('auth.User', related_name='snippets')
highlighted = models.TextField()
```

用 `pygments` 来在model存储时生成高亮HTML代码。

还需要import:

```
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight
```

在model中添加 `.save() `方法：

```
def save(self, *args, **kwargs):
    """
    Use the `pygments` library to create a highlighted HTML
    representation of the code snippet.
    """
    lexer = get_lexer_by_name(self.language)
    linenos = self.linenos and 'table' or False
    options = self.title and {'title': self.title} or {}
    formatter = HtmlFormatter(style=self.style, linenos=linenos,
                              full=True, **options)
    self.highlighted = highlight(self.code, lexer, formatter)
    super(Snippet, self).save(*args, **kwargs)
```

修改完model后要更新数据库表。

```
rm -f tmp.db db.sqlite3
rm -r snippets/migrations
python manage.py makemigrations snippets
python manage.py migrate
```

使用 `createsuperuser` 命令创建几个用户用于测试API.

```
python manage.py createsuperuser
```

## 为User models添加endpoints 

创建了user之后，让我们写一个呈现user的API。在 `serializers.py` 中:

```
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'snippets')
```

由于 `snippets`与User model是反向关系,但是在使用`ModelSerializer` 时不会默认生成这种关系，所以我们要自己声明。
还要在 `views.py`中添加几个视图，使用只读的视图用来呈现所以可以用 `ListAPIView` 和 `RetrieveAPIView`来构建class based views.

```
from django.contrib.auth.models import User


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

先import `UserSerializer` 类

```
from snippets.serializers import UserSerializer
```

 `urls.py `中把视图注册给urls

```
url(r'^users/$', views.UserList.as_view()),
url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
```

## 关联Snippets和Users

现在的snippet和user是没有关联的，因为user 并非做为serialized数据被传入, 而是由request传入。

解决方法是在snippet 视图中使用 `.perform_create()`方法，该方法能修改save的方式，并能处理request和请求URL中的数据。

在 `SnippetList` 视图中添加一下方法：

```
def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
```

现在 `create()` 被传入了 `owner` field，数据来与request.

## 改进serializer

现在snippets 和创建它的user有了关联，改变`SnippetSerializer` 来反映这一变化，修改 `serializers.py`:

```
owner = serializers.ReadOnlyField(source='owner.username')
```

提示: 记得把 `owner`, 添加到 `Meta` 的field中。

下面来解释一下这个field。 `source` 对象指明了数据来源，`ReadOnlyField`类是无类型的，而`CharField`,`BooleanField` 等都是指明数据类型的。`ReadOnlyField`是只读的，常用于呈现序列化数据，但是不适用模板中需要更新反序列化的数据。所以在这里使用`CharField(read_only=True)`也是可以的。

## 给视图添加权限

现在 snippets 已经引入了users项，下一步就是确保只有具有权限的用户才能对snippets进行创建，删除和更新。
REST framework包含了一系列的permission类，可以使用它们来构建视图权限。

本例中使用的 `IsAuthenticatedOrReadOnly`, 能保证通过用户认证后，发送的请求，能执行读写操作，而未认证的用户请求只能读取数据。

import REST framework的权限模块

```
from rest_framework import permissions
```

给`SnippetList`和`SnippetDetail`视图添加参数：

```
permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
```

## 为可视化API添加login

如果现在查看可视化 API ，你会发现除非你进行用户登录，否则不能创建新的snippets。

可以给可视化API加入login，修改项目的`urls.py`文件：

先import include:

```
from django.conf.urls import include
```

将可视化 API添加到urls.

```
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]
```

其中 `r'^api-auth/'` 的正则部分是可以更改的，只要记得使用namespace `'rest_framework'`。在 Django 1.9+版本中，不需要显式写出namespace。现在用浏览器访问API可以看到右上角的Login，通过它登陆后就又能创建snippet了。

创建几个snippet之后，访问'/users/' 路径，会发现user中显示了其创建的snippet的pks。

## 对象权限

所有用户都能查看snippet，但只有其创建者才能进行修改或删除。

实现方法是创建custom permission.

在应用中创建一个新文件，名为 `permissions.py`

```
from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # 读权限对任何request都是开放的
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # 写权限只给创建者开放
        return obj.owner == request.user
```

现在修改 `SnippetDetail` views class中的` permission_classes`属性

```
permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly,)
```

记得引入 `IsOwnerOrReadOnly` 类

```
from snippets.permissions import IsOwnerOrReadOnly
```

现在用浏览器访问API，会发现 'DELETE' 及'PUT' 行为之后对登录后的创建者开放。

## 使用API进行授权

现在的API要用户认证后才能编辑snippet，但我们没有设置 [authentication classes](http://www.django-rest-framework.org/api-guide/authentication/), 现在使用的是默认的`SessionAuthentication` 和`BasicAuthentication`。

当使用浏览器访问API时，我们可以用浏览器登录，然后由session授权request。当通过程序调用API时，我们要为request提供授权信息。

未授权时试图创建snippet 会触发一个error:

```
http POST http://127.0.0.1:8000/snippets/ code="print 123"

{
    "detail": "Authentication credentials were not provided."
}
```

我们可以使用之前创建的账户访问API.

```
http -a tom:password123 POST http://127.0.0.1:8000/snippets/ code="print 789"

{
    "id": 5,
    "owner": "tom",
    "title": "foo",
    "code": "print 789",
    "linenos": false,
    "language": "python",
    "style": "friendly"
}
```

## 总结

现在API已经启用了权限管理，路径可以对user和snippet的创建者有限制的开放。

在教程的 part 5 ，我们把这些整合起来，用HTML实现高亮snippet。，同时你讲学到如何设计API之间的关系。

