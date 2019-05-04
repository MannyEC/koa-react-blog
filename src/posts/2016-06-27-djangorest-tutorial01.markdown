---
layout:     post
title:      Django REST framework 教程1 Serialization
subtitle:   
class:		"note"
date:       2016-06-27
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- Django
- 译文

---
# Tutorial 1: Serialization

## 介绍

本教程将会开发一个简单的pastbin代码高亮API，整个过程会用到构成REST framework的各个components，完成后你将会理解框架中各部分共同运作的机制。
本教程的内容十分深入，所以你最好打起精神来阅读。如果你只想快速浏览一下REST Framework的用法，那么你可以去阅读 quickstart 文档。

**提示**: 本教程的代码位于Github上 [tomchristie/rest-framework-tutorial](https://github.com/tomchristie/rest-framework-tutorial) repository on GitHub。示例的在线版本位于： [available here](http://restframework.herokuapp.com/).

## 配置环境

在一切开始之前我们首先要创建一个新的虚拟环境，这里我们使用 `virtualenv`。它能确保本项目的包配置独立于系统中的其他项目。

```
virtualenv env
source env/bin/activate
```

现在我们已经在一个virtualenv 环境下了，可以安装我们需要的包。

```
pip install django
pip install djangorestframework
pip install pygments  # We'll be using this for the code highlighting
```

**提示**: 任何时候想要退出virtualenv ，只需输入 `deactivate`。详细资料请查看 [virtualenv documentation](https://virtualenv.pypa.io/en/latest/index.html)

## 开始

好的，可以开始写代码了，首先创建一个新的项目。

```
cd ~
django-admin.py startproject tutorial
cd tutorial
```

创建一个新的APP

```
python manage.py startapp snippets
```

将 `snippets` app 以及 `rest_framework` app 都添加到 `INSTALLED_APPS`，位于`tutorial/settings.py `文件中：

```
INSTALLED_APPS = (
    ...
    'rest_framework',
    'snippets.apps.SnippetsConfig',
)
```

准备工作就到此为止了。

## 创建model

下一步我们来创建 `Snippet` 模型用于存储代码片段。需要编辑 `snippets/models.py `文件。 **提示**: 编写注释是一种很好的编程实践，但是我们希望现在更专注于代码，所以省略了注释。 

```
from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)

    class Meta:
        ordering = ('created',)
```

创建模型之后要在数据库中同步创建表。

```
python manage.py makemigrations snippets
python manage.py migrate
```

## 创建Serializer 类

首先来实现Web API返回的数据序列化或者反序列化，比如以 `json`格式返回。实现方法和Django的`form`有些类似，我们需要声明`serializers`。在 `snippets` 目录下创建`serializers.py `文件并写入以下代码：

```
from rest_framework import serializers
from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES


class SnippetSerializer(serializers.Serializer):
    pk = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    code = serializers.CharField(style={'base_template': 'textarea.html'})
    linenos = serializers.BooleanField(required=False)
    language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
    style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        更新数据Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
```

serializer 类的第一部分用来定义需要被序列化/反序列化的数据域。`create()` 和`update() `方法定义了`serializer.save()`被调用时，处理数据的方式。

serializer 类与 Django的 `Form `类十分类似, 可以使用类似的属性标签，例如`required`,` max_length` 及 `default`.

这些标签也可以控制serializer在特定环境下的呈现方式，例如`render`为HTML时， `{'base_template': 'textarea.html'} `标签和在Django Form类中使用 `widget=widgets.Textarea `有相同的作用。这个标签在控制可视化API显示的时候非常有用，在后续的教程中会见到。 

上述的功能可以用 `ModelSerializer` 类来更方便的实现,但此时用`serializer`可使定义更清楚一些。

## 使用Serializers

开始下一步之前，我们先来熟悉一下刚创建的Serializer 类。进入Django shell.

```
python manage.py shell
```

import一些模块之后，来定义一些snippets

```
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

snippet = Snippet(code='foo = "bar"\n')
snippet.save()

snippet = Snippet(code='print "hello, world"\n')
snippet.save()
```

我们现在已经有了两个snippet的实例，下面来序列化一下这个实例

```
serializer = SnippetSerializer(snippet)
serializer.data
# {'pk': 2, 'title': u'', 'code': u'print "hello, world"\n', 'linenos': False, 'language': u'python', 'style': u'friendly'}
```

此时我们已经把模板类型转换成了Python的原生数据类型，序列化的最后一步就是把它转换为 `json`类型

```
content = JSONRenderer().render(serializer.data)
content
# '{"pk": 2, "title": "", "code": "print \\"hello, world\\"\\n", "linenos": false, "language": "python", "style": "friendly"}'
```

反序列化与之相似，首先把数据转为Python原生类型。

```
from django.utils.six import BytesIO

stream = BytesIO(content)
data = JSONParser().parse(stream)
...then we restore those native datatypes into a fully populated object instance.
serializer = SnippetSerializer(data=data)
serializer.is_valid()
# True
serializer.validated_data
# OrderedDict([('title', ''), ('code', 'print "hello, world"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])
serializer.save()
# <Snippet: Snippet object>
```

这和forms使用的API多么相似！当我们在视图中使用自己设定的serializer时这种相似性会跟明显。我们也可以序列化querysets（数据的查询集）而不是model类型的实例，你只需要传入参数 `many=True` 。

```
serializer = SnippetSerializer(Snippet.objects.all(), many=True)
serializer.data
# [OrderedDict([('pk', 1), ('title', u''), ('code', u'foo = "bar"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')]), OrderedDict([('pk', 2), ('title', u''), ('code', u'print "hello, world"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')]), OrderedDict([('pk', 3), ('title', u''), ('code', u'print "hello, world"'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])]
```

## 使用ModelSerializers

我们的 `SnippetSerializer` 类与 `Snippet` 模型有很多重复的地方，这些代码可以更精炼一些就像Django同时提供了` Form `类和`ModelForm `类，REST framework也提供了`Serializer`类和  `ModelSerializer` 类.。

先看一下使用 `ModelSerializer` 类对serializer进行重构的方法。将 `snippets/serializers.py `中的 `SnippetSerializer `类替换为下面的写法：

```
class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style')
```

serializers很方便的一点就是你能print出所有fields。在 `python manage.py shell`中尝试下面的代码：

```
from snippets.serializers import SnippetSerializer
serializer = SnippetSerializer()
print(repr(serializer))
# SnippetSerializer():
#    id = IntegerField(label='ID', read_only=True)
#    title = CharField(allow_blank=True, max_length=100, required=False)
#    code = CharField(style={'base_template': 'textarea.html'})
#    linenos = BooleanField(required=False)
#    language = ChoiceField(choices=[('Clipper', 'FoxPro'), ('Cucumber', 'Gherkin'), ('RobotFramework', 'RobotFramework'), ('abap', 'ABAP'), ('ada', 'Ada')...
#    style = ChoiceField(choices=[('autumn', 'autumn'), ('borland', 'borland'), ('bw', 'bw'), ('colorful', 'colorful')...
```

要记住 `ModelSerializer `类并非万能，它只是一个创建serializer类的便捷方式而已：

* 一个自动提供fields选择的集合
* 默认的 `create()` 和`update()` 方法。

## 编写使用Serializer 的Django views 

下面为我们创建的API 编写视图。在这里我们只使用Django views，暂时不会用到REST framework's 的其他特性。我们会编写一个`HttpResponse `的子类，将数据都换转为 `json`类型return。

在 `snippets/views.py `文件中写入：

```
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)
```

首先，我们来写一个视图呈现所有snippets的列表，同时能创建一个新的snippet。

```
@csrf_exempt
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)
```

由于我们要向同一个视图进行POST但是没有`CSRF token`，所有要用装饰器` csrf_exempt`来避免csrf限制。一般情况下不会这么处理，只是现在为了方便暂时这么使用。

我们还需要一个视图来查看独立的snippet，同时能够对它进行修改和删除处理。

```
@csrf_exempt
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)
```

最后在 `snippets/urls.py `文件中构建路径：

```
from django.conf.urls import url
from snippets import views

urlpatterns = [
    url(r'^snippets/$', views.snippet_list),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.snippet_detail),
]
```

把snippets的url注册到项目根目录的url中，` tutorial/urls.py `。

```
from django.conf.urls import url, include

urlpatterns = [
    url(r'^', include('snippets.urls')),
]
```

我们现在还有很多问题尚未解决，比如遇到无法解析的 `json`, 或者视图无法处理的请求时，我们需要返回一个500 "server error" 的响应。

## 使用Web API的第一次尝试

现在来实际运行一下项目，首先退出shell...

```
quit()
```

启动Django's 开发服务器

```
python manage.py runserver

Validating models...

0 errors found
Django version 1.8.3, using settings 'tutorial.settings'
Development server is running at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

打开另一个命令行窗口，我们对这个服务进行测试。

在这里可以用 `curl` 或者 `httpie `来测试API。`Httpie `是个对用户很友好的http客户端，它是用Python编写的。

用pip安装 `httpie` :

```
pip install httpie
```

然后我们能都获得所有snippets的列表:

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

或者传入id来获取某个snippet:

```
http http://127.0.0.1:8000/snippets/2/

HTTP/1.1 200 OK
...
{
  "id": 2,
  "title": "",
  "code": "print \"hello, world\"\n",
  "linenos": false,
  "language": "python",
  "style": "friendly"
}
```

当然，通过浏览器访问API也会获得同样的json数据结果。

## 目前的进展

到目前为止我们已经构建了获取一个序列化数据的API，能通过Django views来呈现数据，而且和Django's Forms API很接近。

我们的API 视图现在没有什么特别的功能，只是呈现了 json 响应, 而且还存在很多待解决的问题。

在下一篇中我们将学会怎么改进它 part 2 of the tutorial.

