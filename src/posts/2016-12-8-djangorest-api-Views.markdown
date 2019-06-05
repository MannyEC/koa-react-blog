---
layout:     post
title:      Django REST framework API：Views
subtitle:   
type:       blog
date:       2016-12-08
tags:       python
---

[原文](http://www.django-rest-framework.org/api-guide/views/)

## 基于类的视图(Class-based Views)

>Django基于类的视图是对原有视图的一种受欢迎的颠覆。

>— [Reinout van Rees](http://reinout.vanrees.org/weblog/2011/08/24/class-based-views-usage.html)

REST framework 提供了 `APIView` 类，它是 Django 中 `View` 的子类。

`APIView` 与 `View` 的不同之处在于:

- 传给 handler 方法的请求需要是一个 REST framework 的 `Request` 实例，而不是 Django 的 `HttpRequest` 实例。

- Handler 方法需要return一个REST framework `Response`，而不是 Django 的 `HttpResponse`。视图将会负责内容协商以及处理正确的返回值。

- 所有 `APIException` 异常都会被捕捉并交由对应的响应。

- 请求会首先经历认证和权限的校验，通过后再进入handle方法处理。

 `APIView` 和 `View` 的用法很类似,请求将会被交由适当的handler处理，例如 `.get()` 或 `.post()`。另外，我们需要设置一系列属性来配置API的方方面面。

示例:

    from rest_framework.views import APIView
    from rest_framework.response import Response
    from rest_framework import authentication, permissions

    class ListUsers(APIView):
        """
        该视图用于列出系统中所有用户
        * 需要token 认证
        * 只有admin可以查看该视图
        """
        authentication_classes = (authentication.TokenAuthentication,)
        permission_classes = (permissions.IsAdminUser,)

        def get(self, request, format=None):
            """
            返回用户的列表
            """
            usernames = [user.username for user in User.objects.all()]
            return Response(usernames)

## API 策略属性 (policy attributes)

下面的属性与 API 视图的可插拔(pluggable aspects)有关。

**.renderer_classes**

**.parser_classes**

**.authentication_classes**

**.throttle_classes**

**.permission_classes**

**.content_negotiation_class**

## API 策略实例化方法 (policy instantiation methods)

下列方法用于实例化上述的 API 可插拔(pluggable)策略。 你不需要重写以下方法。

**.get_renderers(self)**

**.get_parsers(self)**

**.get_authenticators(self)**

**.get_throttles(self)**

**.get_permissions(self)**

**.get_content_negotiator(self)**

## API 策略实施方法(policy implementation methods)

下面的方法将会在请求下发给handler 之前调用。

**.check_permissions(self, request)**

**.check_throttles(self, request)**

**.perform_content_negotiation(self, request, force=False)**

## Dispatch方法

下列的方法将会被视图的 `.dispatch()` 方法直接调用，可能需要在 `.get()`, `.post()`, `put()`, `patch()` 及 `.delete()` 这类handler方法前/后调用。

### .initial(self, request, *args, **kwargs)

在 handler 方法调用前执行，用于权限限制或者内容协商。

一般不需要重写该方法。

### .handle_exception(self, exc)

此函数接受所有 handler 中发生的异常，返回值是一个 `Response` 实例或者重新触发该异常。

它能够处理所有 `rest_framework.exceptions.APIException` 的子类，以及 Django 的 `Http404` 和 `PermissionDenied` 异常，并返回对应的异常响应。

当你需要定制异常响应时，你应该创建该方法的子类。

### .initialize_request(self, request, *args, **kwargs)

用于确保传给 handler 方法的 request 对象是一个 `Request`实例，而不是 Django `HttpRequest`。

一般不需要重写该方法。

### .finalize_response(self, request, response, *args, **kwargs)

该方法确保 handler 方法返回的 `Response` 对象根据内容协商被渲染为正确的 content type。

一般不需要重写该方法。

## 基于方法的视图(Function Based Views)

>【基于类的视图总是更好的解决方案】这种说法是错误的。

>— [Nick Coghlan](http://www.boredomandlaziness.org/2012/05/djangos-cbvs-are-not-mistake-but.html)

REST framework 允许你使用常规的基于方法的视图，也提供了一些装饰器来包装这种视图，以保证接受到的是 `Request` 实例(而非 Django 的 `HttpRequest`) 并且返回 `Response` (而非 Django 的 `HttpResponse`)，也允许你去配置请求过程。

### @api_view()

**Signature**: `@api_view(http_method_names=['GET'])`

整个功能的核心就是 `api_view` 装饰器, 它接收一系列需要进行响应的  HTTP 方法。举例说明，下面的视图只是简单的返回一些数据：

同 `reverse`方法一样要传入request做为关键字参数：

    from rest_framework.decorators import api_view

    @api_view()
    def hello_world(request):
        return Response({"message": "Hello, world!"})

该视图将会使用 [settings](http://www.django-rest-framework.org/api-guide/settings/) 指定的默认的 renderers, parsers, authentication 等等。

在默认情况下，可以接受 `GET` 请求，其余请求将会响应 "405 Method Not Allowed"。

使用下面的做法可以添加其他请求:

    @api_view(['GET', 'POST'])
    def hello_world(request):
        if request.method == 'POST':
            return Response({"message": "Got some data!", "data": request.data})
        return Response({"message": "Hello, world!"})

### API 策略装饰器(policy decorators)

如果要覆盖默认设置，可以用REST framework 提供的一些view装饰器。它们必须在 `@api_view` 装饰器之后(after/below)调用。举例说明，创建一个视图，用  [throttle](http://www.django-rest-framework.org/api-guide/throttling/)  来保证该视图每天只能被指定用户调用一次，使用 `@throttle_classes` 装饰器,传递一个由throttle 类构成的列表：

    from rest_framework.decorators import api_view, throttle_classes
    from rest_framework.throttling import UserRateThrottle

    class OncePerDayUserThrottle(UserRateThrottle):
            rate = '1/day'

    @api_view(['GET'])
    @throttle_classes([OncePerDayUserThrottle])
    def view(request):
        return Response({"message": "Hello for today! See you tomorrow!"})

这些装饰器和 `APIView` 子类中的属性相对应。

可用的装饰器有:

- `@renderer_classes(...)`

- `@parser_classes(...)`

- `@authentication_classes(...)`

- `@throttle_classes(...)`

- `@permission_classes(...)`

这些装饰器可以接受一个参数，此参数必须是class构成的元组或列表。