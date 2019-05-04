---
layout:     post
title:      "HTML5拖放 drag &amp; drop"
subtitle:   
class:		"note"
date:       2015-12-13 
author:     "eckid"
header-img: "img/practice-bg.jpg"
tags:
    - HTML5
---

# HTML5拖放 drag & drop

HTML5提供拖放操作的API。拖放的基本操作会涉及四个步骤：拖动开始，设置拖动数据，放入位置，放置。

* 拖动开始  ondragstart()
* 设置拖动数据 setData()
* 放入位置 ondragover()
* 放置 ondrop()  

图片等元素可以直接拖动，而对于div等不能直接拖动的，可以为其设置draggable属性允许拖动。

	<div id="box" width="100px" height="100px" draggable="True"></div>

## 来回拖放图片的示例

[demo](http://mannyec.github.io/demo/dropAndDrag/)

实现的最终效果是在两个box之间来回拖放一张图片。

### 1.首先创建图片和容器

box1和box2作为图片容器，img1为图片元素，加入一个msgbox来输出监听的事件信息来了解拖放事件。

	<div id="box1" class="box"></div>
	<div id="box2" class="box"></div>
	<img id="img1" src="12.jpg">
	<div id="msgbox"></div>

设置简单样式使box可见

	.box {
		width: 200px;
		height: 200px;
		background-color: #269abc;
		display: inline-block;
	}

### 2.JS控制拖拽

##### 监听信息的呈现

	//输出监听信息,事件信息通过dataTransfer获取
	function showMsg(msg){
		var s= "";
		for(var k in msg){
			s+=k+"</br>";
		}
		msgbox.innerHTML = s;
	}

我们可以利用showMsg来查看拖拽事件发生的过程。

	//监听ondragenter并输出信息
	boxDiv1.ondragenter = function(e){
	showMsg(e.dataTransfer);
	}


##### 拖拽操作

	var boxDiv1,boxDiv2,msgbox,img1;
	window.onload = function(){
		boxDiv1 = document.getElementById('box1');
		boxDiv2 = document.getElementById('box2');
		msgbox = document.getElementById('msgbox');
		img1 = document.getElementById('img1');

	//  关闭默认属性，否则将无法置入
		boxDiv1.ondragover = function(e){
			e.preventDefault();
		}

		boxDiv2.ondragover = function(e){
			e.preventDefault();
		}


	//	设置图片
		img1.ondragstart = function(e){
			e.dataTransfer.setData("imgId","img1");
		}

		boxDiv1.ondrop =dropIn;
		boxDiv2.ondrop =dropIn;

	}

##### 置入操作

    //置入函数封装
	function dropIn(e){
		showMsg(e.dataTransfer);
		e.preventDefault();

		var img = document.getElementById(e.dataTransfer.getData("imgId"));
		e.target.appendChild(img);
	}




