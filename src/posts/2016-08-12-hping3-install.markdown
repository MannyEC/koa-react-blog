---
layout:     post
title:      Ubuntu下hping3安装
subtitle:   
type:       blog
date:       2016-08-12
tags:       other
---
# Ubuntu下hping3安装

安装环境 Ubuntu12.04

安装包下载自git  [https://github.com/antirez/hping](https://github.com/antirez/hping)

解压后正常的安装步骤为

	$ ./configure (first try ./configure --help)
	$ make
	$ make strip
	$ make install

如果期间没有任何报错产生，那么可以直接通过`hping3`命令使用。


## 常见问题

安装期间我遇到的问题和解决方法在此列出，基本上能覆盖所有可能遇到的问题。

#### 1. `libpcap_stuff.c:20:21: 错误：net/bpf.h：没有那个文件或目录`

安装libpcap及libpcap-dev

	sudo apt-get install libpcap-dev

或已安装情况下

	ln -sf /usr/include/pcap-bpf.h /usr/include/net/bpf.h

#### 2.`/usr/bin/ld: cannot find -ltcl`

安装tcl库

	yum -y install tcl       

	yum -y install tcl-devel 或 sudo apt-get install tcl-dev

#### 3.安装GCC

	sudo apt-get install build-essential

#### 4. `Your operating system's lex is insufficient to compile libpcap. `

安装 flex

	sudo apt-get install flex

#### 4.安装libpcap

[http://www.tcpdump.org/#latest-release](http://www.tcpdump.org/#latest-release)下载libpcap

#### 5.安装yacc包：

解决办法：
 
	sudo apt-get install -y byacc

#### 6.`/home/zhangmanni/Desktop/hping-master/main.c:190: undefined reference to 'hping_script'`

	$ sudo make clean

#### 7.`Sorry, this hping binary was compiled without TCL scripting support`

	$ sudo apt-get install tcl-dev
