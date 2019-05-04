---
layout:     post
title:      Django csrf
subtitle:   
class:		"note"
date:       2016-06-22
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- Django

---
# Django csrf

Django中可以将` csrf_token `模板和`CsrfViewMiddleware`中间件结合使用，来实现csrf攻击的防御功能。

### 文档
https://docs.djangoproject.com/en/dev/ref/csrf/

### 实现机制
在页面view渲染的过程中，会将视图form中` csrf_token `标签转换为一个隐藏的表单项，其中携带了服务器端生成的token,同时在cookie中写入此token。在该form提交时，会比对该token和cookie中存储的token是否一致，如果不一致，则返回403异常.

#### 下面是使用csrf_token时在html和cookie中产生的效果
form中的token
![form-csrf](/img/django-csrf-form.png)

cookie中的token
![cookie-csrf](/img/django-csrf-cookie.png)

### 如何使用
Django Book中给出了以下的使用步骤：

```
To take advantage of CSRF protection in your views, follow these steps:
1.	The CSRF middleware is activated by default in the MIDDLEWARE setting. If you override that setting, remember that'django.middleware.csrf.CsrfViewMiddleware' should come before any view middleware that assume that CSRF attacks have been dealt with.
If you disabled it, which is not recommended, you can use csrf_protect() on particular views you want to protect (see below).
2.	In any template that uses a POST form, use the csrf_token tag inside the<form> element if the form is for an internal URL, e.g.:
3.	<form action="" method="post">csrf_token
This should not be done for POST forms that target external URLs, since that would cause the CSRF token to be leaked, leading to a vulnerability.
4.	In the corresponding view functions, ensure that RequestContext is used to render the response so that csrf_token will work properly. If you’re using the render() function, generic views, or contrib apps, you are covered already since these all use RequestContext.
```
### 要点为：
1.在项目的`settings.py`中，为`MIDDLEWARE_CLASSES` 中添加

    'django.middleware.csrf.CsrfViewMiddleware',
  
 我使用的django1.9版本中，默认的顺序为：

    MIDDLEWARE_CLASSES = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

2.在表单中加入 csrf_token 标签，要注意的是，django默认对所有页面的表单都进行csrf验证，对于想跳过检验的视图，可以使用装饰器。
    
    from django.views.decorators.csrf import csrf_exempt

    @csrf_exempt

3.使用`RequestContext`
要确保在返回的响应中传入了`RequestContext`，使得中间件可以起作用。

我在最初使用时漏掉了这一点，出现了下面的错误。

    UserWarning: A  csrf_token  was used in a template, but the context did not provide the value.  This is usually caused by not using RequestContext.

使用时首先引入`RequestContext`

    from django.template import RequestContext
    
然后可以选择配合render使用或者使用其他response方法

    #如果使用render
    def login(request):
        ...
        t=loader.get_template('login.html')
        c=RequestContext(request,{'name':'zhang'})
        return HttpResponse(t.render(c))
    #如果使用render_to_response
    def login(request):
        ...
        return render_to_response('login.html',{'name'    :'zhang'},context_instance = RequestContext(request))

