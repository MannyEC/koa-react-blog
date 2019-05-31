---
layout:     post
title:      easel.js移动捕捉实例
subtitle:   
type:       blog
date:       2015-12-28 
tags:       HTML
---

# easel.js移动捕捉实例

##### 页面演示 [demo](https://mannyec.github.io/practice/easeljs-movecatch/index.html)

Create.js是一个HTML5的javascript库，提供了完整的javascript游戏开发包。其中有四个组件，分别是：

- easel.js
- preload.js
- tween.js
- sound.js

其中easel.js提供了针对HTML5的canvas的开发库。在这里用它实现了一个demo中追踪鼠标移动和点击事件的动画效果。


### 全部代码

#### html

	<!DOCTYPE html>
	<html>
	<head lang="en">
	    <meta charset="UTF-8">
	    <title></title>
	    <style>
	        #canvas {
	            background-color: #269abc;
	        }
	    </style>
	    <script src="easeljs-0.8.2.min.js"></script>

	</head>
	<body>
	<canvas id="canvas" width="1000px" height="500px" ></canvas>
	<script src="test.js"></script>
	</body>
	</html>

#### test.js

	var canvas;
	var stage;
	var img = new Image();
	var sprite;

	window.onload = function(){
	    canvas = document.getElementById("canvas");
	    stage = new createjs.Stage(canvas);
		//stage事件监听
	    stage.addEventListener("stagemousedown", clickCanvas);
	    stage.addEventListener("stagemousemove", moveCanvas);

	    var data ={
	        images:["cat.png"],
	        frames:{width:120,height:120,regX:10,regY:10}
	    }

	    sprite = new createjs.Sprite(new createjs.SpriteSheet(data));
	    createjs.Ticker.setFPS(20);
	    createjs.Ticker.addEventListener("tick",tick);
	}



	function tick(e){
	    var t = stage.getNumChildren();
	    for(var i=t-1;i>0;i--){
	        var s = stage.getChildAt(i);

	        s.vY +=2;
	        s.vX +=1;
	        s.x+= s.vX;
	        s.y+= s.vY;
	        s.scaleX = s.scaleY = s.scaleX + s.vS;
	        s.alpha += s.vA;

	        if(s.alpha <=0 || s.y>canvas.height){
	            stage.removeChildAt(i);
	        }
	    }
	    stage.update(e);
	}

	function clickCanvas(e){
	    addS(Math.random()*100 + 100,stage.mouseX,stage.mouseY,2);
	}

	function moveCanvas(e){
	    addS(Math.random()*2 + 1,stage.mouseX,stage.mouseY,1);
	}

	function addS(count,x,y,speed){
	    for(var i = 0;i<count;i++){
	        var s = sprite.clone();
	        s.x = x;
	        s.y = y;
	        s.alpha = Math.random()*0.5 + 0.5;
	        s.scaleX = s.scaleY = (Math.random() +0.3)/10;
	        //这里除10是因为图片尺寸比较大，为完整显示，设置frame尺寸120*120
	        //但是呈现时要将他缩小一些

	        var a = Math.PI * 2 *Math.random();
	        var v = (Math.random() - 0.5) *30 *speed;
	        s.vX = Math.cos(a) *v;
	        s.vY = Math.sin(a) *v;
	        s.vS = (Math.random() - 0.5) *0.2; // scale
	        s.vA = -Math.random() *0.05 -0.01; // alpha
	        stage.addChild(s);
	    }
	}