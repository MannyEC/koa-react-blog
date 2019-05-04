---
layout:     post
title:      Django REST framework 教程2 Requests and Responses
subtitle:   
class:		"note"
date:       2016-06-27
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- Django
- 译文

---

# Tutorial 2: Requests and Responses

从本节开始我们将真正介绍REST framework的核心部分，先介绍一些最重要的部件。

## Request 对象

REST framework 提供了 `Request `对象，它是 `HttpRequest`的扩展，提供了更灵活地 request解析方式。 `Request` 对象的核心是  `request.data` 属性， 这个属性和`request.POST`有些类似，但是在 Web APIs中起到更大的作用。

```
request.POST  # 只能处理表单数据，'POST'方法可用.
request.data  # 处理任意数据，  'POST', 'PUT' 和'PATCH' 方法可用.
```

## Response 对象

REST framework 提供了 `Response `对象，这是一种` TemplateResponse `，将传入的未处理(unrender)数据经由内容协商来返回正确的数据。

```
return Response(data)  # Renders to content type as requested by the client.
```

## Status codes状态码

在视图中仅使用 HTTP 状态码不便于阅读，而且容易记错。REST framework 提供了更精确的标识符来表示状态码，比如位于 `status `模块中的 `HTTP_400_BAD_REQUEST `。最好在项目中全部使用这种标识符，而不是数值状态码。

## 封装API 视图

REST framework 有两种 API 视图的封装机制。

1.  使用 `@api_view `装饰器来封装based views函数

2.  使用 `APIView` 类来封装based views类。

这两个封装器提供了一些功能，比如说，确保你的视图接收到` Request `参数，或者为 `Response` 对象传入context，以保证内容协商能够正常运作。

它也提供了一些默认的行为，比如返回 `405 Method Not Allowed` ，或是当 `request.data `数据格式出错时自动处理`ParseError` 。

## 使用一下

下面来用这些新的部件写一些视图，现在不需要再用 `JSONResponse `类了，删掉` views.py`的代码，开始重构。

```
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer


@api_view(['GET', 'POST'])
def snippet_list(request):
    """
    List all snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

现在的视图比起之前的有了很大的进步，更加简洁而且和Forms API很相似。 经过命名的status codes也使得response更直观。下面是处理单个snippet的视图，同样属于 `views.py `中。

```
@api_view(['GET', 'PUT', 'DELETE'])
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a snippet instance.
    """
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SnippetSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

上面的代码是不是看起来十分熟悉，因为它和标准的Django 视图几乎没有什么差别。

你会发现，我们不需要再去刻意区分内容类型。 `request.data `可以传入 `json `和其他类型数据，response和之前一样要返回数据，但REST framework自动为我们转换数据类型。

## 为URLs添加可选格式

为了充分发挥response不在局限于一种内容类型的优势，让我们使API支持格式尾缀(format suffixes)。 格式尾缀给URLs 提供了格式参考，也就是说使API能够处理一些特别的URLs ，比如 http://example.com/api/items/4/.json.

第一步给两个视图添加 `format` 关键字参数

```
def snippet_list(request, format=None):
```

以及

```
def snippet_detail(request, pk, format=None):
```

将 `urls.py` 稍作修改，将 `format_suffix_patterns` 集合添加给现有的URLs.

```
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

urlpatterns = [
    url(r'^snippets/$', views.snippet_list),
    url(r'^snippets/(?P<pk>[0-9]+)$', views.snippet_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
```

不是一定要使用这种重复urlpatterns的写法，但是这种写法比较直观的体现了替换过程。

## 效果如何？

用tutorial part1中介绍的方法，使用命令行测试API。与之前不同的是现在API能更好的处理一些不正确的请求。

先看一下获取snippets列表的API

```
http http://127.0.0.1:8000/snippets/

HTTP/1.1 200 OK
...
[
  {
    "id": 1,
    "title": "",
    "code": "foo = \"bar\"\n",
    "linenos": false,
    "language": "python",
    "style": "friendly"
  },
  {
    "id": 2,
    "title": "",
    "code": "print \"hello, world\"\n",
    "linenos": false,
    "language": "python",
    "style": "friendly"
  }
]
```

我们可通过传入 Accept 头部来控制response类型:

```
http http://127.0.0.1:8000/snippets/ Accept:application/json  # Request JSON
http http://127.0.0.1:8000/snippets/ Accept:text/html         # Request HTML
```

或者用格式尾缀:

```
http http://127.0.0.1:8000/snippets.json  # JSON suffix
http http://127.0.0.1:8000/snippets.api   # Browsable API suffix
```

修改 `Content-Type` 头部也可以控制request类型：

```
# POST using form data
http --form POST http://127.0.0.1:8000/snippets/ code="print 123"

{
  "id": 3,
  "title": "",
  "code": "print 123",
  "linenos": false,
  "language": "python",
  "style": "friendly"
}

# POST using JSON
http --json POST http://127.0.0.1:8000/snippets/ code="print 456"

{
    "id": 4,
    "title": "",
    "code": "print 456",
    "linenos": false,
    "language": "python",
    "style": "friendly"
}
```

在浏览器中查看API http://127.0.0.1:8000/snippets/.

## 可视化

API能根据客户端给请求返回对应的类型，默认的返回类型为HTML-通过浏览器访问时的标准格式化类型。 这使得API 能够以一个完全web-可视化的HTML呈现。web-可视化API给开发带来的极大的便利，也减少了与其他开发者协作开发一个API时的壁垒。

查看 [browsable api](http://www.django-rest-framework.org/topics/browsable-api/) 主题能获取更多browsable API 特性

## 下一步
 
tutorial part 3 将会开始使用class based views来精简代码。
