---
layout:     post
title:      "<progress><meter>标签"
subtitle:   
class:		"note"
date:       2015-12-10 
author:     "eckid"
header-img: "img/practice-bg.jpg"
tags:
    - HTML5标签
descript:   "介绍HTML5<progress><meter>标签的用法"
---

# `<progress><meter>`标签 JS控制

#### `<progress>`标签用于定义运行中的进度（进程）

#### `<meter>`标签用来表示度量		

### 用法示例
	<p>当前进度为:<progress max="100"><span id="progress">0</span>%</progress></p>

	<meter id="meter" value="50" max="100" min="0">0.5</meter>

### JS示例

当我想用Meter实现一个从0%-100%的加载过程时，首先尝试了用for循环以及setTimeout()来控制。
大概像这样:
	
	for(var i=0;i<100;i++){
		setTimeout(setMeterValue(i),100);
	}

但是运行后并没有发生一个逐步变化的过程。由于JS是单线程的，setTimeout的时间延迟在for循环完毕之后才执行setMeterValue()，结果只执行了最后一次。

因此就采用setInterval()来实现。

	<script>
		var i=1;
		function thread_one(){
			if(i<100){
				setMeterValue(i);
				i++;
			}
		}
		setInterval(thread_one,100)
	
		function setMeterValue(newvalue){
			var meterBar = document.getElementById('meter');
			meterBar.value = newvalue;
		}
	</script>

完整的样例代码

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Meter元素JS控制</title>
	</head>
	<body>
	<section>
		<meter id="meter" value="50" max="100" min="0"></meter>
	</section>
	<script>
		var i=1;
		function thread_one(){
			if(i<100){
				setMeterValue(i);
				i++;
			}
		}
		setInterval(thread_one,100)

		function setMeterValue(newvalue){
			var meterBar = document.getElementById('meter');
			meterBar.value = newvalue;
		}
	</script>
	</body>
	</html>