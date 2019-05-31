---
layout:     post
title:      Django REST framework API： Requests
subtitle:   
type:       blog
date:       2016-08-12
tags:       python
---
# Requests

[原文](http://www.django-rest-framework.org/api-guide/requests/#requests)

>如果你构建的是REST风格的应用，你最好忘掉request.POST。

>— Malcom Tredinnick, [Django developers group](https://groups.google.com/d/topic/django-developers/dxI4qVzrBY4/discussion)

REST framework的` Request `类是对原生` HttpRequest`的扩展，来为REST framework提供灵活的请求解析和认证功能。

***

## Request 解析

REST framework的Request 对象提供了灵活的请求解析机制，使你可以将请求做为JSON数据来处理，或者其它媒体类型。

## .data

`request.data` 返回的是请求主体的解析内容。这和标准的 `request.POST`和 

`request.FILES` 属性类似，但是存在以下区别：

- 它包含了所有被解析的内容, 包括`file `和` non-file `类型的输入。

- 它支持解析HTTP 方法的内容，不局限于 `POST`, 这表示你可以处理 `PUT` 及`PATCH `请求。

- 它为REST framework's 提供了灵活的请求解析机制，不局限于表单数据。例如,你可以像处理表单数据一样处理JSON数据。

更多内容参见 [parsers documentation](http://www.django-rest-framework.org/api-guide/parsers/).

## .query_params

`request.query_params` 是更准确命名的 `request.GET`的同义词(synonym)。

为了代码的可读性，我们建议使用 `request.query_params` 来替代 Django的`request.GET`。这样能使代码更加明确，因为任何HTTP方法都包含查询参数，不仅是`GET`请求。

## .parsers

使用 `APIView` 类或者 `@api_view` 装饰器能够保证属性值能够自动被设置给一系列`Parser` 实例，它基于 view 中的` parser_classes `设置，或者`DEFAULT_PARSER_CLASSES` 中的设置。一般不需要自己处理该属性。

***

**提示**: 一旦客户端发送了形式有误的内容(malformed content)，此时访问 `request.data` 将会引发一个`ParseError`。默认情况下REST framework的 `APIView` 类或者 or `@api_view` 装饰器将会捕捉到这个错误并返回一个`400 Bad Request` 响应。

加入请求包含了一个无法被解析的content-type ，那么将会引发`UnsupportedMediaType`异常，该异常默认返回 `415 Unsupported Media Type`响应。

***

## 内容协商

请求将会暴露一些属性，让你来确定内容协商的级别。它能协助你来完善行为，比如选择合适的序列化方式来应对不同的设备类型。

## .accepted_renderer

由内容协商级别所选出的renderer实例。

## .accepted_media_type

一个内容协商级别能够接受的媒体类型的字符串。

***

## Authentication

REST framework提供了灵活的, 单次请求的认证机制，能让你：

- 在API的不同部分使用不同的认证策略

- 支持多种认证策略

- 同时提供此次请求的user和token的信息

## .user

`request.user` 通常会返回一个` django.contrib.auth.models.User`的实例，尽管其行为会依赖于当前使用的认证策略。
如果此次请求是未经认证的，那么 `request.user` 的默认值将是一个`django.contrib.auth.models.AnonymousUser`的实例。

更多信息请参见 [authentication documentation](http://www.django-rest-framework.org/api-guide/authentication/).

## .auth

`request.auth` 返回一段额外的认证上下文， `request.auth` 的行为依赖于当前的认证策略，但是通常情况下将会是被认证的请求的token实例。

假如请求是未认证的，或者没有携带额外的上下文， `request.auth` 的默认值是`None`。

更多信息可见 [authentication documentation](http://www.django-rest-framework.org/api-guide/authentication/).

## .authenticators

`APIView` 或 `@api_view` 装饰器能够保证`Authentication` 实例能自动设置一系列属性，其基于view中的 `authentication_classes` 设置或是`DEFAULT_AUTHENTICATORS` 设置。通常不会用到这个属性。

***

## 浏览器增强

REST framework提供了基于不同浏览器的功能增强，比如 `PUT` `PATCH` 和 `DELETE`表单。

## .method

`request.method` 返回了该请求的HTTP方法的大写命名字符串。

基于浏览器的 `PUT`, `PATCH `和`DELETE` 表单的透明支持。

更多信息参见 [browser enhancements documentation](http://www.django-rest-framework.org/topics/browser-enhancements/).

## .content_type

`request.content_type`返回一个字符串来指示此次HTTP 请求主体的媒体类型，如果未提供媒体类型则该参数为空。

通常情况下我们不需要直接获取请求的内容，使用REST framework提供的请求解析是更好的选择。

如果要获取请求的媒体类型，使用 `.content_type` 属性比使用 `request.META.get('HTTP_CONTENT_TYPE')`要更好，因为它提供了浏览器端无表单内容的透明支持。

更多信息参见[browser enhancements documentation](http://www.django-rest-framework.org/topics/browser-enhancements/).

## .stream

`request.stream` 返回了请求主体的流式(stream)呈现。

通常情况下我们不需要直接获取请求的内容，使用REST framework提供的请求解析是更好的选择。

***

## 标准HttpRequest属性

由于REST framework的`Request` 扩展自Django的 `HttpRequest`，它可以支持所有的原有属性和方法。比如 `request.META` 和`request.session` 。

需要注意的是由于`Request`类并非继承自 `HttpRequest` 类,但是在其基础上进行了扩展。

