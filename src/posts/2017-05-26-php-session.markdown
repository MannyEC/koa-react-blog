---
layout:     post
title:      PHP session 机制
subtitle:   
type:       blog
date:       2017-05-26
tags:       other
---

**起因**：最近发现了产品日志记录中，logout日志存在记录Username为空的现象，由于Username从session中获取，首先怀疑的是session过期导致，由此引发了以下对PHP session和浏览器session信息清除机制的研究。

## 一、现象

[![01](/img/post/2017-05-26-php-session.png)](/img/post/2017-05-26-php-session.png)

用户名不见了╮(￣▽￣)╭ ，此处的用户名取自`$_SESSION[‘UserName’]`, 首先想到的是页面开启时间较长，本次session过期后内容被清除，但是测试爸爸表示即便是24h以上的未关闭页面也可以直接进行其他操作，不需要重新登陆，并现场给我演示了一下。打脸来的太快，所以还是先来看一下PHP 的session机制。


## 二、PHP 服务端session 处理

PHP 中 session 的配置位于 `php.ini` 中，默认是将session以文件形式存储与文件夹下，一般是 `/tmp` 目录，每个session文件以 `sess_`  开始命名。

处理方式的配置项为

	session.save_handler = files

当需要自定义时可以设置

	session.save_handler = user

### 1.  session机制的开始

`session_start()`

先看文档：

>session_start() creates a session or resumes the current one based on a session identifier passed via a GET or POST request, or passed via a cookie.

这里的 session identifier 指的就是同样在 `php.ini` 配置的

    session.name = PHPSESSID //默认值PHPSESSID

简单来说，`session_start()` 启用了 session 机制，基于客户端是否携带有 session 信息，会进行新建 session 或者复用现有 session。

### 2．session 的过期或失效

session 有两种无效的场景，一种场景是客户端结束会话，session 就被视为失效，另一种场景是超出了过期时间。过期时间的默认配置为`1440s`，也就是24分钟，配置项为:

	session.gc_maxlifetime = 1440

超过这个时间的 session 文件被视为过期，但是仅仅是被视为过期，至于清除过期 session 文件则是另外的工作。 

### 3．session的垃圾回收

session 即使是已经过期，但是文件仍然会存在于 `/tmp` 目录下，所以需要启动 GC 机制来清除这些过期文件，否则使用对应的 sessionid 仍然可以使用这些文件，PHP 对 session 的垃圾回收处理是有一定概率触发的,同样在 `php.ini` 中，有两个参数： 

    session.gc_probability = 1
    session.gc_divisor = 1000
  
这表示每次新建 session 时，PHP 会有1/1000的概率执行垃圾回收，触发后才会清除当前已有的过期 session 文件 

### 4. session手工销毁

    session_destroy();   // 删除$_SESSION 删除session文件，和session_id

## 三、客户端session处理

之前提到了配置中可以设置 session 关键字的名称`session.name = PHPSESSID`, 服务端对于每次请求，会自动判断当前 `cookie` 是否携带了 `$_COOKIE[session_name()];` ，如果存在则直接查找对应的 session 文件，否则就会生成新的 session_id ,然后把生成的 session_id 作为 COOKIE 的值传递到客户端，所以可以看到客户端 cookie 中包含了 PHPSESSID。

[![02](/img/post/2017-05-26-php-session-2.png)](/img/post/2017-05-26-php-session-2.png)

存在于客户端 cookie 中的 session 信息，在客户端关闭后会自动被清除，客户端关闭指的是关闭浏览器，而不是关闭一个 tab。

## 四、分析

回到这个问题：

### 1.  session中为什么会缺失UserName？

1）session超过24分钟后过期，且服务器session文件被其他请求触发的GC清除。此时如果没有手动清除浏览器缓存，那么logout请求仍然携带原session标识符，查找该session为空，所以没有UserName。

2）session未过期，手工清除浏览器缓存，此时cookie不包含session标识符，新建s
ession不含有UserName。

### 2.  为什么长时间不关闭页面也可能继续操作？

未手工清除浏览器缓存，cookie中含有session标识符，服务器session虽然已经过期，但文件未被触发GC清除，所以能够根据标识符再次访问session文件。
