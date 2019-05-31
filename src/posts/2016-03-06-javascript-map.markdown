---
layout:     post
title:      Array.prototype.map()学习
subtitle:   
type:       blog
date:       2016-03-06
tags:       js
---

# Array.prototype.map()学习

文档中对于` map() `方法的定义为：

` map() `方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。**[Mozilla 标准库 »](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)**

语法为：
` array.map(callback[, thisArg]) `


## 然而下面这道题：

<pre>
What is the result of this expression? (or multiple ones)

["1", "2", "3"].map(parseInt)

答案为 [1, NaN, NaN]
</pre>

这是因为map()在执行过程中并不是只给callback传入一个参数，而是自动传入三个参数：数组元素currentValue，元素索引index，原数组本身Array。

所以当题目中的callback函数为parseInt时，它需要两个参数，第一个为需转换的值，第二个为进制数。所以map()传入的三个值中前两个将被使用，第三个将被抛弃。于是有了这种情况：
<pre>
parseInt("1", 0);
//1
parseInt("2", 1);
//NaN
parseInt("3", 2);
//NaN
</pre>

## 其他值得注意的有：

* 如果 thisArg 参数有值，则每次 callback 函数被调用的时候，this 都会指向 thisArg 参数上的这个对象。如果省略了 thisArg 参数,或者赋值为 null 或 undefined，则 this 指向全局对象 。

* map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）。

* 使用 map 方法处理数组时，数组元素的范围是在 callback 方法第一次调用之前就已经确定了。在 map 方法执行的过程中：**原数组中新增加的元素将不会被 callback 访问到**；若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 map 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。

