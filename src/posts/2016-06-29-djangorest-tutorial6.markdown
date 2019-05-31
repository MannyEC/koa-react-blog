---
layout:     post
title:      Django REST framework 教程6 ViewSets & Routers
subtitle:   
type:       blog
date:       2016-06-29
tags:       python
---
# Tutorial 6: ViewSets & Routers

REST framework 的 `ViewSets`类帮助我们专注于设计API的状态和交互，并且自动的处理URL 的结构。`ViewSet` 类和 `View` 类的差别仅在于它提供了 `read`或`update`方法，替代了原来的 `get` 或 `put`方法。 `ViewSet` 类最终只是关联了一系列方法，在实例化之后需要用 `Router` 来绑定URL。

## 用ViewSets重构视图

让我们重构视图，首先将 `UserList` 和 `UserDetail` 视图替换为一个 `UserViewSet`：

```
from rest_framework import viewsets

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
```

我们用 `ReadOnlyModelViewSet` 类提供了一个默认为只读的视图， `queryset` 和`serializer_class` 属性和之前的一样，没有改变。但是不需要将下面的视图分割为多个类来呈现。让我们替换掉 `SnippetList`, `SnippetDetail` 以及`SnippetHighlight `类，用一个类表示：

```
from rest_framework.decorators import detail_route

class SnippetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    @detail_route(renderer_classes=[renderers.StaticHTMLRenderer])
    def highlight(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
```

我们用 `ModelViewSet `类来提供默认的读写操作。

注意到我们用了` @detail_route `装饰器定义了highlight操作，这个装饰器适用于创建 `create/update/delete `以外的自定义操作。 `@detail_route` 装饰器默认处理 `GET `请求，可以修改其 `methods`参数来处理` POST `请求。

自定义操作的URL默认关联与它的命名，如需修改就把url_path做为参数传入装饰器。

## 把ViewSets 与URLs关联

视图只有绑定到 URLConf才能有作用，在 `urls.py` 文件中：

```
from snippets.views import SnippetViewSet, UserViewSet, api_root
from rest_framework import renderers

snippet_list = SnippetViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
snippet_detail = SnippetViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
snippet_highlight = SnippetViewSet.as_view({
    'get': 'highlight'
}, renderer_classes=[renderers.StaticHTMLRenderer])
user_list = UserViewSet.as_view({
    'get': 'list'
})
user_detail = UserViewSet.as_view({
    'get': 'retrieve'
})
```

请观察我们怎样将每个 `ViewSet `类视图绑定http方法。现在把视图注册到URL。

```
urlpatterns = format_suffix_patterns([
    url(r'^$', api_root),
    url(r'^snippets/$', snippet_list, name='snippet-list'),
    url(r'^snippets/(?P<pk>[0-9]+)/$', snippet_detail, name='snippet-detail'),
    url(r'^snippets/(?P<pk>[0-9]+)/highlight/$', snippet_highlight, name='snippet-highlight'),
    url(r'^users/$', user_list, name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)/$', user_detail, name='user-detail')
])
```

## 使用Routers

由于我们用的是 `ViewSet` 类，所以不需要自己注册URL，通过 `Router`类可以自动处理关联，我们只需要将正确的view注册到router中即可。在`urls.py `中：

```
from django.conf.urls import url, include
from snippets import views
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'snippets', views.SnippetViewSet)
router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```

当然，使用router也要设置url模式串。 `DefaultRouter` 类会自动创建API的根视图，所以可以把`api_root` 方法从` views `中删去。

## 权衡views和viewsets

viewsets对视图创建进行和很好的抽象，它提供了统一的URL地址，极少的代码量，能让我们专注于API本身，省掉了配置URL的精力。但它也不是所有情况下都最适用的。相比based views，使用viewsets会让视图变得不易于理解。

## 回顾

我们构建了一个完整的可视化API,具有认证机制，对象权限以及支持多种格式。让我们回顾一下设计的每一个步骤，想想逐步简化视图的过程。

最终的代码 [tutorial code](https://github.com/tomchristie/rest-framework-tutorial) 位于 GitHub, 或者访问 [the sandbox](http://restframework.herokuapp.com/).

## 继续向前

教程已经进入了尾声，面对接下来的REST framework 项目, 可以从以下方式继续学习：
•   在 [GitHub](https://github.com/tomchristie/django-rest-framework) 上一起优化REST framework.
•   加入讨论组 [REST framework discussion group](https://groups.google.com/forum/?fromgroups#!forum/django-rest-framework),成为社区的一员
•   用Twitter和作者交流 [the author](https://twitter.com/_tomchristie) 
Now go build awesome things.

