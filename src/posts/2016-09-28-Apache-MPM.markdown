---
layout:     post
title:      Apache 多处理模块
subtitle:   
type:       blog
date:       2016-09-28
tags:       other
---

# Apache MPMs

Apache 多处理模块(Multi-Processing Modules)比较广泛使用的有以下三种:

- prefork
- worker
- event

---

> Apache 能更好的为有特殊要求的站点定制。例如，要求 更高伸缩性的站点可以选择使用线程的 MPM，即 worker 或 event； 需要可靠性或者与旧软件兼容的站点可以使用 prefork。

> MPM 必须在编译前夕，配置时指定，然后编译到服务器程序中。 仅当编译器知道使用了线程时，它才有能力优化许多函数。

> 为了使用指定的 MPM，请在执行 configure 时，使用参数 --with-mpm=NAME。NAME 是指定的 MPM 名称。

> 编译完成后，可以使用 ./httpd -l 来确定选择的 MPM。 此命令会列出编译到服务器程序中的所有模块，包括 MPM。

# MPM 的选择
---
prefork 每个子进程只有一个线程，每个时间点只能处理一个请求。优势在于其成熟稳定，劣势在于系统资源消耗多，不擅长处理高并发情况。

worker 是多进程和多线程的混合模式。预先fork几个子进程，并为其创建多个线程。线程可以共享父进程的内存空间，所以内存占用可以低一些。优势在于占用更少的内存，更适应高并发，劣势在于线程安全问题和模块兼容性。

event 解决了keep-alive情况下长期被占用的资源浪费问题，它提供了一个线程来管理这些keep-alive的线程。


## prefork

mpm_prefork is.. well.. it's compatible with everything. It spins of a number of child processes for serving requests, and the child processes only serve one request at a time. Because it's got the server process sitting there, ready for action, and not needing to deal with thread marshaling, it's actually faster than the more modern threaded MPMs when you're only dealing with a single request at a time - but concurrent requests suffer, since they're made to wait in line until a server process is free. Additionally, attempting to scale up in the count of prefork child processes, you'll easily suck down some serious RAM.

It's probably not advisable to use prefork unless you need a module that's not thread safe.

**Use if:** You need modules that break when threads are used, like mod_php. Even then, consider using FastCGI and php-fpm.

**Don't use if:** Your modules won't break in threading.

## worker

mpm_worker uses threading - which is a big help for concurrency. Worker spins off some child processes, which in turn spin off child threads; similar to prefork, some spare threads are kept ready if possible, to service incoming connections. This approach is much kinder on RAM, since the thread count doesn't have a direct bearing on memory use like the server count does in prefork. It also handles concurrency much more easily, since the connections just need to wait for a free thread (which is usually available) instead of a spare server in prefork.

**Use if:** You're on Apache 2.2, or 2.4 and you're running primarily SSL.

**Don't use if:** You really can't go wrong, unless you need prefork for compatibility.

However, note that the treads are attached to connections and not requests - which means that a keep-alive connection always keeps ahold of a thread until it's closed (which can be a long time, depending on your configuration). Which is why we have..

## event

mpm_event is very similar to worker, structurally; it's just been moved from 'experimental' to 'stable' status in Apache 2.4. The big difference is that it uses a dedicated thread to deal with the kept-alive connections, and hands requests down to child threads only when a request has actually been made (allowing those threads to free back up immediately after the request is completed). This is great for concurrency of clients that aren't necessarily all active at a time, but make occasional requests, and when the clients might have a long keep-alive timeout.

The exception here is with SSL connections; in that case, it behaves identically to worker (gluing a given connection to a given thread until the connection closes).

**Use if:** You're on Apache 2.4 and like threads, but you don't like having threads waiting for idle connections. Everyone likes threads!

**Don't use if:** You're not on Apache 2.4, or you need prefork for compatibility.

</pre>

# 使用MPM
 ---
### 查看当前MPM模式
	
	httpd -l //查看MPM模式
	httpd -t -D DUMP_MODULES  //查看所有httpd加载的模块 

### 编译时指定MPM模式

在Apache编译时，做configure这一步，可以加上`–with-mpm=event`来将event编译作为MPM编译进去，同样也可以选择prefork和worker。另外，也可以将多个MPM编译为共享模块，configure中的参数为：`–enable-mpms-shared=MPM-LIST` （如：`–enable-mpms-shared=’prefork worker’， –enable-mpms-shared=all`）。

### 相关

[多处理模块](https://httpd.apache.org/docs/2.2/mpm.html)

[模块索引列表](https://httpd.apache.org/docs/2.2/mpm.html)