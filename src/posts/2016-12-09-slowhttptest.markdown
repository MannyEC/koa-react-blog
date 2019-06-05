---
layout:     post
title:      SlowHTTPtest 慢速连接攻击及解决
subtitle:   
type:       blog
date:       2016-12-09
tags:       other
---

# SlowHTTPtest 慢速连接攻击及解决

### 慢速攻击介绍 

[CC攻击的变异品种 慢速攻击](http://blog.nsfocus.net/cc-attack-defense/)

## slowhttptest

slowhttptest是一款进行慢速连接攻击测试的工具，建议在Linux环境中使用。同时，如果使用虚拟机，可能遇到构建有效连接数很少的情况，大部分的连接都会被pending和closed。所以最好在实体机上运行。

下载源码之后，`./congigure` `make` `make install` 即可安装。

### 可配置选项的完整列表如下:
 
	slowhttptest使用参数说明

	 slow headers 攻击，缓慢发送/r/n，让服务器一直等待
	-B slow Body 攻击
	-R 范围攻击Apache killer
	-X slow read 攻击，读的慢，让服务器发送缓存堵塞
	报告生成选项：
	-g  生成socket状态变化统计
	-o file_prefix 将输出保存到file.html和file.csv中 
	-v level 日志等级，0-4：Fatal，Info，Error，Warning，Debug
	普通选项：
	-c connections 目标连接数（50）
	-i seconds 数据发送间隔（10）
	-l seconds 测试一个目标的时间长度（240）
	-r rate  每秒多少个连接（50）
	-s bytes Content-Length的值（4096）
	-t verb  请求中使用的动词，如果是slow header攻击，默认是GET；如果是slow body攻击，默认是POST
	-u URL  目标URL（http://localhost/）
	-x bytes 每一个tick随机生成的键值对最大长度，例如，-x 2 生成x-xx：xx是头字段，或是类似&xx=xx的消息体，x是随机字符（32）
	探针/代理选项：
	-d host:port 所有数据走指定代理host:port
	-e host:port  探针流量走指定代理host:port
	-p seconds 探针超时时长，服务器被认为是网络不可达（5）
	范围攻击具体选项：
	-a start 左边界值（5）
	-b bytes 右边界值（2000）
	slow read攻击具体选项
	-k num  同一请求重复次数，当服务器支持持久化连接时用于放大响应长度（1）
	-n seconds 每次从接收缓冲区中读取消息的时间间隔（1）
	-w bytes 从通知窗中获取数据的起始位置（1）
	-y bytes  从通知窗中获取数据的结束位置（512）
	-z bytes 每次从接收缓冲区中读取的长度（5）
 
### 示例 

slow body 模式

	./slowhttptest -c 1000 -B -g -o my_body_stats -i 110 -r 200 -s 8192 -t FAKEVERB -u https://myseceureserver/resources/loginform.html -x 10 -p 3
 
slow header模式的示例
 
	lowhttptest -c 1000 -H -g -o my_header_stats -i 10 -r 200 -t GET -u https://myseceureserver/resources/index.html -x 24 -p 3

## 慢速连接攻击解决方案

使用 Apache mod_qos模块,配置之后能够限制服务器并发连接数和带宽。

[mod_qos 文档](http://opensource.adnovum.ch/mod_qos/)

### 使用的参数配置

- QS_ClientEntries <number>  可处理的不同ip地址数量

- QS_SrvMaxConnPerIP <number>  每个IP最大连接数量

- MaxClients <number>        允许活动的TCP连接数

- QS_SrvMaxConnClose <number>[%]   当在达到规定的活动连接数的%时禁用'keep-alive'属性

- QS_SrvMinDataRate <bytes per second>      最小的请求/响应速度

- QS_LimitRequestBody <bytes>    限制请求的头和内容

        <IfModule mod_qos.c>
            QS_ClientEntries 100000
            QS_SrvMaxConnPerIP 50
            MaxClients 256
            QS_SrvMaxConnClose 180
            QS_SrvMinDataRate 150 1200
        </IfModule>

我是以补丁的形式来增加防护功能

### 测试攻击语句

	-c 2000 -B -g -o my_body_stats -i 110 -r 200 -s 8192 -t FAKEVERB -u https://10.... -x 10 -p 3
