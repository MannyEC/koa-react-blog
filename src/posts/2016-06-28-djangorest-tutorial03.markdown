---
layout:     post
title:      Django REST framework 教程3 Class Based Views
subtitle:   
class:		"note"
date:       2016-06-28
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- Django
- 译文

---
API views也可以使用class based views来编写，而不是function based views。你会发现这是一种很有效的模式，能够让我们复用代码，保持代码[DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself)。

## 使用class based views重写 API

我们先来把root视图转换为class based view。在 `views.py`中进行一些重构：

```
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SnippetList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

目前为止进展顺利，尽管和之前的写法仍有相似，但是在不同的HTTP方法之前做到了分离，下面将 `views.py `中另外一个视图进行重构：

```
class SnippetDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Snippet.objects.get(pk=pk)
        except Snippet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

现在的写法仍然和function based view有些类似，接下来修改 `urls.py` 来使用class based views。

```
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

urlpatterns = [
    url(r'^snippets/$', views.SnippetList.as_view()),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
```

这样API就重构完成了，服务器运行之后API和之前完全相同。 

## 使用 mixins

使用 class based views 的一个好处就是能构建可复用的机制。

在我们目前基于模型的视图中，诸如create/retrieve/update/delete的API经常出现。REST framework's mixin 提供了这类通用的行为。

下面来学习使用mixin构建视图，编辑 `views.py `：

```
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import mixins
from rest_framework import generics

class SnippetList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
```

我们来花点时间解释一下它的机制。首先用 `GenericAPIView`创建了视图，然后添加了 `ListModelMixin `和`CreateModelMixin`。

base class提供了核心的功能， mixin classes提供了 `.list()` 和`.create()`功能。 然后绑定到 `get` 和`post`方法中。

```
class SnippetDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
```

我们再一次用了 `GenericAPIView`class来提供核心功能，用mixins来提供 `.retrieve()`, `.update()` 和`.destroy()` 功能。

## 使用generic class based views

使用mixin classes 已然减少了代码量，但是还能进一步优化。REST framework 提供了一系列mixed-in generic views，利用它可以将 `views.py `进一步瘦身：

```
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import generics


class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
```

使用了之后，代码进一步的简洁了。
在part 4中，我们将会了解到的API添加用户和权限管理的方式。

