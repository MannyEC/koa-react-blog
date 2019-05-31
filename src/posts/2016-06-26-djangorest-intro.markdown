---
layout:     post
title:      Django REST framework 介绍
subtitle:   
type:       blog
date:       2016-06-26
tags:        python
---
![logo](/img/restlogo.png)

Django REST framework 是一个用于构建Web APIs的有效工具。

# 准备工作

REST framework 必需依赖以下工具:

* Python (2.7, 3.2, 3.3, 3.4, 3.5)
* Django (1.7+, 1.8, 1.9)

下列packages可根据自己的需求使用:

* Markdown (2.1.0+) - Markdown 用于支持可视化API(browsable API).
* django-filter (0.9.2+) – 支持过滤.
* django-crispy-forms - Improved HTML display for filtering.
* django-guardian (1.1.1+) - Object 级别的权限支持.

# 安装

使用pip安装
<pre>
pip install djangorestframework
pip install markdown       # Markdown support for the browsable API.
pip install django-filter  # Filtering support
</pre>

或者从github上clone项目

<pre>
git clone git@github.com:tomchristie/django-rest-framework.git
</pre>

在项目的`setting.py`中`INSTALLED_APPS` 添加 `rest_framework`

<pre>
	INSTALLED_APPS = (
	    ...
     'rest_framework',
	)
</pre>

•	如果你打算使用可视化API，你应该也需要添加REST framework的login和logout视图。请将下面的代码添加到` urls.py `中。

<pre>
	urlpatterns = [
	    ...
	    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
	]
</pre>

该URL路径可以自行设置，但是必须 include以`rest_framework`为namespace的 `rest_framework.urls` ，在Django 1.9+可以不显式的写出namespace，框架会为你自动处理。

# 示例

Let's take a look at a quick example of using REST framework to build a simple model-backed API.

We'll create a read-write API for accessing information on the users of our project.

Any global settings for a REST framework API are kept in a single configuration dictionary named REST_FRAMEWORK. Start off by adding the following to your `settings.py` module:

<pre>
	REST_FRAMEWORK = {
	    # Use Django's standard `django.contrib.auth` permissions,
	    # or allow read-only access for unauthenticated users.
	    'DEFAULT_PERMISSION_CLASSES': [
	        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
	    ]
	}
</pre>

别忘了将 `rest_framework` 添加到 `INSTALLED_APPS`中

现在可以开始编写API了，下面的内容位于项目的 `urls.py `中

<pre>
	from django.conf.urls import url, include
	from django.contrib.auth.models import User
	from rest_framework import routers, serializers, viewsets
	
	# Serializers define the API representation.
	class UserSerializer(serializers.HyperlinkedModelSerializer):
	    class Meta:
	        model = User
	        fields = ('url', 'username', 'email', 'is_staff')
	
	# ViewSets 定义了 view的行为.
	class UserViewSet(viewsets.ModelViewSet):
	    queryset = User.objects.all()
	    serializer_class = UserSerializer
	
	# Routers provide an easy way of automatically determining the URL conf.
	router = routers.DefaultRouter()
	router.register(r'users', UserViewSet)
	
	# Wire up our API using automatic URL routing.
	# Additionally, we include login URLs for the browsable API.
	urlpatterns = [
	    url(r'^', include(router.urls)),
	    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
	]
</pre>

现在可以打开页面 http://127.0.0.1:8000/,查看你的users API.如果你开启了登录控制，那么在页面右上角你将可以为网站add, create 和 delete 用户。
