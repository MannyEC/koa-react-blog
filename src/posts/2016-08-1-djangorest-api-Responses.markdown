---
layout:     post
title:      Django REST framework API：Responses
subtitle:   
type:       blog
date:       2016-08-12
tags:       python
---
## Responses

[原文](http://www.django-rest-framework.org/api-guide/responses/)

不同于HttpResponse对象, TemplateResponse 对象中含有view需要返回的上下文，response最终要返回的数据直到使用时才会被计算。

[Django documentation](https://docs.djangoproject.com/en/dev/ref/template-response/)

REST framework支持HTTP内容协商，只需要提供一个`Response` 类，让该类支持根据客户端请求所返回的不同媒体类型的内容。

#### `Response` 的子类

Django的 `SimpleTemplateResponse.Response` 需要由原生Python构成的data来进行初始化。REST framework使用标准HTTP内容协商来决定返回的内容类型。

你并不一定要用 `Response`类，如果需要的话，可以返回常见的 `HttpResponse` 或者`reamingHttpResponse` 对象。

使用 `Response` 类只是为你提供了一个更好的接口，便于返回支持内容协商，可以返回多种格式的Web API。

除非你需要深度定制的REST framework，否则你最好使用 `APIView` 类或`@api_view` 装饰器来返回`Response` 对象，这样做能够确保view能在视图返回之前就进行内容协商，并且选择合适的renderer。

***

## Response()

**Signature**: `Response(data, status=None, template_name=None, headers=None, content_type=None)`

不同于常规的 `HttpResponse` 对象，你不必用转换过的内容来实例化一个 `Response` 对象，而是应该传入一个未转换的原生python数据。

`Response` 类使用的renderer只能处理简单的数据类型，比如Django的model实例，所以在创建`Response` 对象之前你需要将数据序列化为原生的数据类型。

你可以用REST framework的 `Serializer`类来执行数据的序列化，或者自己进行序列化处理。

**参数**：

- `data`: 响应中的序列化数据

- `status`: 响应的状态码，默认为202，更多信息见 [status codes](http://www.django-rest-framework.org/api-guide/status-codes/).

- `template_name`: 当 `HTMLRenderer` 被选用时需要使用的模板名

- `headers`: 响应中使用的一个 HTTP 头的字典

- `content_type`:响应的内容类型，一般自动由renderer根据内容协商结果来设定，但是有些情况下也需要特别指定。

***

# 属性

## .data

一个 `Request` 对象的未转换(unrendered)内容。

## .status_code

一个 HTTP 响应的数值状态码。

## .content
响应的转化后内容，`.render()` 方法必须在 `.content` 被使用之前调用。

## .template_name

`template_name` 只有在 `HTMLRenderer` 或者其他renderer时才需要使用。

## .accepted_renderer

该属性指定response执行渲染的renderer实例，在响应返回之前，由 APIView 或 @api_view 自动指定。

## .accepted_media_type
该属性是内容协商可接受的媒体类型，在响应返回前，由 `APIView` 或 `@api_view `自动指定。

## .renderer_context

这是一个附加的上下文信息构成的字典，能够传递给 `.render()` 方法，在响应返回前，由 `APIView` 或` @api_view` 自动指定。

***

## Standard HttpResponse attributes

`Response` 类继承于 `SimpleTemplateResponse`, 原有的属性和方法在response中都可使用，例如你可以用原有的方法来设置响应的header：

<pre>
response = Response()
response['Cache-Control'] = 'no-cache'
</pre>

## .render()

**Signature**: `.render()`

在大多数`TemplateResponse`中都存在此方法，用来将序列化的数据渲染为响应内容，当调用 `.render()` 时， `.render(data, accepted_media_type, renderer_context)` 方法对 accepted_renderer实例执行结果的返回值将作为response的内容。

一般不需要自己调用 `.render()` ，Django's 的响应机制会为你处理它。
