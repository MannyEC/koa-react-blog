---
layout:     post
title:      Django REST framework 教程5 关联性与 Hyperlinked APIs
subtitle:   
class:		"note"
date:       2016-06-29
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- Django
- 译文

---
# Tutorial 5: 关联性与 Hyperlinked APIs

现在为止API的关系是用主键表示的，本篇中我们将用超链接来提高API的关联性与可预测性。

## API的根路径

现在有路径'snippets' 和'users', 但是还没有API的根路径，可以用 `@api_view` 装饰器来创建一个。在`snippets/views.py `中：

```
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })
```

这里有两点要解释。第一，我们用REST framework's `reverse` 方法来返回完全限定的URLs; 第二, URL 模式串会被用name表示。

## 高亮snippets的服务端点

现在还没有高亮snippet的endpoint。与其他路径不同的是，在这里希望用HTML而不是JSON来呈现。REST framework里有两种render HTML的方式，一个是使用模板，另一个是使用预创建的HTML。在此介绍第二种方式。
我们返回的不是实例，而是实例的属性，所以没有可供使用的concrete generic view。

所以在此用base class呈现实例, 自己编写`.get() `方法，位于 `snippets/views.py` 中:

```
from rest_framework import renderers
from rest_framework.response import Response

class SnippetHighlight(generics.GenericAPIView):
    queryset = Snippet.objects.all()
    renderer_classes = (renderers.StaticHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)
```

在 `snippets/urls.py`中写入：

```
url(r'^$', views.api_root),
```

将高亮视图写入url:

```
url(r'^snippets/(?P<pk>[0-9]+)/highlight/$', views.SnippetHighlight.as_view()),
```

## 将API超链接

Web API 设计的一个难点就是处理API间关系，有很多设计原则可供选择：

- 基于主键.
- 基于整体的超链接
- 基于相关项的slug field
- 基于相关项的默认文本
- 基于子项-母项关系
- 其他方式

REST framework支持上述的所有方式，可以根据你的需求灵活使用，本例中我们用超链接来处理API关系。实现方法是修改serializers ，用`HyperlinkedModelSerializer` 替代之前使用的 `ModelSerializer`。

`HyperlinkedModelSerializer` 和 `ModelSerializer`有以下不同：

- 不会默认包含 `pk` 项
- 默认包含 `url` 项，使用 `HyperlinkedIdentityField`.
- 关系使用的是 `HyperlinkedRelatedField`而不是 `PrimaryKeyRelatedField`.

下面用超链接重写 `snippets/serializers.py `:

```
class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    highlight = serializers.HyperlinkedIdentityField(view_name='snippet-highlight', format='html')

    class Meta:
        model = Snippet
        fields = ('url', 'highlight', 'owner',
                  'title', 'code', 'linenos', 'language', 'style')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    snippets = serializers.HyperlinkedRelatedField(many=True, view_name='snippet-detail', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'snippets')
```

注意到我们同时添加了 `'highlight'` 项，它和 `url` 项相同, 但指向了 `'snippet-highlight'` 而不是 `'snippet-detail'` 。

由于我们开启了 `'.json'`之类的格式尾缀，所以给 `highlight` 项指定 `'.html'` 尾缀。


## 将URL patterns命名

要编写超链接API,就要给URL模式命名。先了解一下我们的命名原则：

- API 的根路径指向 `'user-list'` 和 `'snippet-list'`.
- snippet serializer中有一个项指向`'snippet-highlight'`.
- user serializer 有一个项指向 `'snippet-detail'`.
- snippet 和user serializers都包含 `'url'` 项，默认情况下指向 `'{model_name}-detail'`，可以写作 `'snippet-detail'` 和`'user-detail'`.

最终的`snippets/urls.py `文件将是下面这样：

```
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

# API endpoints
urlpatterns = format_suffix_patterns([
    url(r'^$', views.api_root),
    url(r'^snippets/$',
        views.SnippetList.as_view(),
        name='snippet-list'),
    url(r'^snippets/(?P<pk>[0-9]+)/$',
        views.SnippetDetail.as_view(),
        name='snippet-detail'),
    url(r'^snippets/(?P<pk>[0-9]+)/highlight/$',
        views.SnippetHighlight.as_view(),
        name='snippet-highlight'),
    url(r'^users/$',
        views.UserList.as_view(),
        name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)/$',
        views.UserDetail.as_view(),
        name='user-detail')
])

# Login and logout views for the browsable API
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]
```

### 分页

users 和code snippets 会含有很多数据，所以需要进行分页处理。用 pagination可以想改变默认的列表呈现方式，在 `tutorial/settings.py `添加以下代码：

```
REST_FRAMEWORK = {
    'PAGE_SIZE': 10
}
```

REST framework的配置都写在变量'REST_FRAMEWORK'内，这样使得它和其他项目配置能相互独立。分页的样式也可以自己修改，只是本篇中没有用到。

## 测试API
用浏览器查看可视化API, 会看到API url的field呈现为超链接，可以直接点击。

在下一篇 part 6 我们将使用 ViewSets 和Routers来精简代码。
