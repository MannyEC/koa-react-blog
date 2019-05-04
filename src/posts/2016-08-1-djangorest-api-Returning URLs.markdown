---
layout:     post
title:      Django REST framework API：Returning URLs
subtitle:   
class:		"note"
date:       2016-08-12
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- Django
- 译文

---
# Returning URLs

[原文](http://www.django-rest-framework.org/api-guide/reverse/)

>使REST架构有别于其他架构的最核心特征便是它强调组件间具有统一的接口。

>— Roy Fielding, [Architectural Styles and the Design of Network-based Software Architectures](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_1_5)

让你的Web APIs返回绝对URIs是一个更好的实践，比如`http://example.com/foobar`, 比 `/foobar`更好。

这样做的优势在于:

- 更明确

- 减轻API客户端压力

- 当返回JSON这种非原生URIs类型时，不会导致字符串产生歧义。

- 更易于来用超链接标记 HTML。
- 
REST framework 提供了两个方法来给API返回绝对URIs。你可以不必使用它们，但是使用它们可以更方便的构建API。

## reverse

**Signature**: `reverse(viewname, *args, **kwargs)`
和 `django.core.urlresolvers.reverse` 的行为类似，不同之处在于它会返回一个全限定URL，并且根据请求来决定host和port。

使用该方法时应该传入request及关键字参数，如:

<pre>
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from django.utils.timezone import now

class APIRootView(APIView):
    def get(self, request):
        year = now().year
        data = {
            ...
            'year-summary-url': reverse('year-summary', args=[year], request=request)
        }
        return Response(data)
</pre>

## reverse_lazy

**Signature**: `reverse_lazy(viewname, *args, **kwargs)`
和 `django.core.urlresolvers.reverse_lazy`行为类似，不同之处在于它会返回一个全限定URL，并且根据请求来决定host和port。

同 `reverse`方法一样要传入request做为关键字参数：

<pre>
api_root = reverse_lazy('api-root', request=request)
</pre>
