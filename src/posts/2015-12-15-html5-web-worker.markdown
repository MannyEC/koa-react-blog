---
layout:     post
title:      "web worker基础"
subtitle:   
class:		"note"
date:       2015-12-10 
author:     "eckid"
header-img: "img/practice-bg.jpg"
tags:
    - HTML5
---

# web worker基础

Web Workers 是 HTML5 提供的一个javascript多线程解决方案，它允许在浏览器后台执行javascript脚本，能够执行事务或者逻辑，并与页面及时的交互和响应。

### 主要方法
	postMessage()       用于交互数据
	terminate()         终止web worker，释放资源

### 事件
	
	onmessage        事件处理器，也可以用addEventListener

## 示例

在学习web worker时，做了一个示例练习。即用浏览器后台脚本执行累加运算，然后在页面中接受数据并实时呈现。

接着加上三个按钮，来控制数据运算的start，stop，continue。 

![示例](/img/webworkerexp.png)

其中start和stop是基本的创建和撤销。核心的用法有这四个

    var work = new Worker("count.js");   //创建worker对象

	work.terminate();                 	 //实现stop

	work.onmessage = function(e) {       //监听work事件
		numDiv.innerHTML = e.data;
	}    							
	
    postMessage(num);                   //count.js向页面传送num的值

在实现continue时，我曾想要用localStorage或者sessionStorage来为count.js传递数据，但是web worker为后台脚本，不支持Web存储的直接提取，同样不支持的还有：

- 无法访问DOM节点；
- 无法访问全局变量或是全局函数；
- 无法调用alert()或者confirm之类的函数；
- 无法访问window、document之类的浏览器全局变量；

不过Web Worker中的Javascript依然可以使用setTimeout(),setInterval()之类的函数，也可以使用XMLHttpRequest对象来做Ajax通信。

于是在这里我用postMessage()来交互数据的curNum。

### 全部代码

#### html

	<!DOCTYPE html>
	<html>
	<head>
 	   <title>web worker基础</title>
 	   <meta charset="UTF-8">
	</head>

	<body>
    	<div id="number"></div>
   		<input id="start" type="button" value="start">
   		<input id="stop" type="button" value="stop">
    	<input id="continue" type="button" value="continue">
	</body>
	<script src="index.js"></script>
	</html>


#### index.js

	var numDiv;
    var curNum;
    var work = null;

    window.onload = function() {
        document.getElementById("start").onclick = startCount;
        document.getElementById("stop").onclick = function() {
            if(work){
                work.terminate();
            }
        }
        document.getElementById("continue").onclick = continueCount;
    }
    
    function startCount() {
        work = new Worker("count.js");
        showCount(0);
    }
    
    function continueCount(){
        work = new Worker("count.js");
        showCount(curNum);
    }
    
    function showCount(num){
        var numDiv = document.getElementById("number");
        work.postMessage(num);
        work.onmessage = function(e) {
            numDiv.innerHTML = e.data;
            curNum = e.data;
        }
    }
    
    
    





#### count.js

	var num = 0;

    //获取index.js传来的num值
    onmessage = function(e){
        num = e.data;
        count();
    }
    function count(){
        postMessage(num);
        num++;
        setTimeout(count,1000);
    }
