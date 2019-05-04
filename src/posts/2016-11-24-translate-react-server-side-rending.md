---
layout:     post
title:      服务端渲染 React 组件 [译]
subtitle:   Rendering React Components on the Server
class:      "note"
date:       2016-11-24 
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- React
- 译文

---

# 服务端渲染 React 组件

[原文](!http://www.crmarsh.com/react-ssr/)

近期使用 React 过程中遇到了 checksum 的问题，于是翻译了此篇文章。文章发于 August 12, 2014，内容不一定完全符合当前React版本，仅供参考。

以下正文：

***

我喜欢用React进行开发，甚至可能用的过多，这要感谢可汗学院对该技术的广泛使用：-）。

最近做的一个小项目中，我想在服务端进行React组件渲染，而不是客户端(通常叫做服务端渲染 server-side-rendering 或SSR)。

一般出于以下原因：

- 1.页面加载更快：可以传输完整的页面，减少HTTP请求。
- 2.更好的SEO：爬虫能够捕获完整的页面，而不是需要js进行后续填充的空页面。

（当然这并不意味着服务端渲染一定比客户端渲染更好，只是一种方式。）

SSR在React中是完全可行的，不过很多SSR相关的资料都忽略了一些基本知识，在此我会介绍一下我所知的先验知识。

## 基础

### 静态标记

先从静态部分讲起，也就是渲染后发送给客户端不需要re-render的部分。

React 提供了一个方法 `renderComponentToStaticMarkup`，该方法将 React Component 转化为对应 HTML 标记的字符串。这是服务端渲染的利器，你可以把字符串放入模板引擎就可以在客户端进行呈现。比如，假设你用Handlebars，你可以将 `markup` 变量这样传入：

\<div>{\{\{ markup }}}</div>

### 可响应的组件

通常来说你不会希望组件是“纯”静态的，因为静态组件无法响应有价值的用户交互，更新 `state` ,重新渲染等等。总之这类组件完全处于被动，或者说，静态。

为了使React组件能够符合预期的运作，我们需要一个真正的 react.js 实例，能够进行事件绑定，管理 `prop` 和 `state` 的变化，并将变化在 DOM 中做出响应。没有这些，静态组件将没有什么意义。

值得庆幸的是，React提供了另一种方法，`renderComponentToString`，它同样会返回 HTML 标记的字符串，并且保证组件能够响应客户端交互。

它是怎样做到的呢？实现方法就是**在页面 load 时在客户端再次渲染组件（表面上如此）**。听我慢慢道来。

### 示例

现在我们编写一个 React 组件,`Item`, 组件有 prop `initialCount` 和 state `count`。`count`由`initialCount`初始化，其值在点击时增加。下面是一个最简单实现:

<pre>
var Item = React.createClass({
    getInitialState: function() {
        return {
            count: this.props.initialCount
        };
    },

    _increment: function() {
        this.setState({ count: this.state.count + 1 });
    },

    render: function() {
        return <div onClick={this._increment}>
            {this.state.count}
        </div>;
    }
});
</pre>

然后在服务端渲染该组件，写法为:

<pre>
var React = require('react');
...
var markup = React.renderComponentToString(
    Item({ initialCount: 7 })
);
res.render('template', {
    markup: markup
});
</pre>

然后，在模板中:

\<div id="container">{\{\{ markup }}}</div>

现在打开页面，将会看到"7"，但是当我们进行点击时，数字并不会增加。因为我们还没有让客户端的 React 实例意识到组件的存在，所以需要执行一次重新渲染。在此就遇到了一个问题，HTML字符串作为静态标记，是无法绑定onClick事件的，更别提触发事件了。

所以为了解决这个问题，我们需要在浏览器中做类似于下面的事情(暂时假设React 和 Item 是全局的):

<pre>
var container = document.getElementById('container');
var component = Item({ initialCount: 7 });
React.renderComponent(component, container);
</pre>

现在刷新页面，点击组件会发现 count 值增加: 表示事件被绑定给组件，和客户端渲染的情况下表现一致。

神奇之处在于: 无论是在客户端还是服务端，当我们用相同的 props 来渲染 `Item` 到同一个节点，**React将不会真正的重新渲染一次组件**(会影响性能)-它可以很聪明的识别出需要渲染的`Item`已经存在于DOM中，只是简单的给它打上标记，表示这个组件将来可能会被重新渲染。

于是就产生了双赢的结果: **既能获得服务端渲染的优势，也能保证其组件的特性。**

### 同步 Props

有一点非常重要: 我们在客户端和服务端都要用相同的props来渲染组件，听起来让人沮丧，但实际上实现起来并不困难，下面就是几种可行的方案:

##### 1.通过模板传递原始的props

 [Michael Hart's](!https://github.com/mhart/react-server-example)给出了很好的示例，下面是这种方法的基本思想:


	var props = { initialCount: 7 };
	var markup = React.renderComponentToString(Item(props));
	res.send(
	    '<div id="container">' + markup + '</div>' +
	    '<script>
	        var container = document.getElementById("container");
	        var component = Item(' + JSON.stringify(props) + ');
	        React.renderComponent(component, container);
	     </script>'
	);

**提示:** 在这些示例中，为了避免XSS([Ben Alpert's blog post](!http://benalpert.com/2012/08/03/preventing-xss-json.html))，最好用`safeStringify`方法，而不是`JSON.stringify`。这里有一种[JavaScript实现](!https://github.com/mhart/react-server-example/blob/master/server.js#L96)。

##### 2.将原始props写入`<script>`标签,使用`type="application/json"`

同样的，标准方式是用模板来实现该方法:

	<div id="container">{{{ markup }}}</div>
	<script id="props" type="application/json">
	    {{{ jsonifiedProps }}}
	</script>
	<script>
	    var container = document.getElementById("container");
	    var props = JSON.parse(document.getElementById("props").innerHTML);
	    React.renderComponent(Item(props), container);
	</script>

由于第二个`<script>`标签完全独立于我们传输给模板的内容，我们可以按照Andrey Popp's 的[示例](!https://github.com/andreypopp/react-quickstart/blob/master/client.js#L101)用`item.jsx`替代第二个`<script>`标签:

<pre>
if (typeof window !== 'undefined') {
    var container = document.getElementById("container");
    var props = JSON.parse(document.getElementById("props").innerHTML);
    React.renderComponent(Item(props), container);
}
</pre>

##### 3.将原始props写入组件自身包含的`<script>`标签

这算是方法2的一个变种，用了非常规的实现方式。在我们的`Item`例子中，`render`方法可以改写为:

	render: function() {
	    var json = safeStringify(this.props);
	    var propStore = <script type="application/json"
	        id={propStoreID}
	        dangerouslySetInnerHTML={{__html: json}}>
	    </script>;
	
	    return <div onClick={this._increment}>
	        {propStore}
	        {this.state.count}
	    </div>;
	}

其中的`dangerouslySetInnerHTML`属性用来[防溢出](!https://facebook.github.io/react/docs/jsx-in-depth.html)。

这种写法的优势在于: 可以避免使用模板传递props，一旦你用`if (typeof window !== 'undefined')`模式，将客户端的`React.renderComponent`放在JSX文件中, 你就可以将所有React服务端渲染相关的逻辑打包在一起。

题外话: 我使用了一种 `SSRWrapper` React 组件，能同时处理`<script type="application/json">`注入，及客户端调用 `React.renderComponent`，省去自己处理的时间。

##### 4.将原始props赋给`window`层级的变量，这种方法相当直接。

### Browserifying

还有一件事: 客户端页面需要获取JSX文件，通常我们会创建一个 Browserify 或 Webpack的 bundle 文件来进行打包，然后通过`<script>`标签放入React组件。

所以对于前几节介绍的方法，我们要对`render`进行一些修改:

	render: function() {
	    return <div onClick={this._increment}>
	        <script src="/bundles/item.js"></script>
	        {this.state.count}
	    </div>;
	}

(当然也可以用模板将`<script>`标签放到页面任何地方。同样的，使用`SSRWrapper`组件能简化这个步骤)

在服务端要保证`item.js`被打包成bundle，我用了[browserify-middleware](!https://github.com/ForbesLindesay/browserify-middleware)，对应的 Express 中的逻辑应该是：

<pre>
var browserify = require('browserify-middleware');
var reactify = require('reactify');
browserify.settings('transform', ['reactify']);
app.get('/bundles/item.js', browserify('./jsx/item.jsx'));
</pre>

一些情况下需要为React打包共用的bundle，还要提供每个组件自身需要的独立的bundle，这种情况下可以这样做:

<pre>
...
var shared = ['react'];
router.get('/bundles/shared.js', browserify(shared));
app.get('/bundles/item.js', browserify('./jsx/item.jsx', {
    external: shared
}));
</pre>

## React是怎样做到的？

现在我们对服务端渲染的实现方式已经有了足够的了解，下面来看看这个过程中到底发生了什么。如果你用`withrenderComponentToString`来监控一下服务端渲染的React组件，你会看到一个在客户端组件中看不到的属性，`data-react-checksum`。比如在下面的例子中，经过服务端处理后，`Item`组件将会变成:

	<div id="container">
	    <div data-reactid=".feh782p6o0" data-react-checksum="75238508">
	        7
	    </div>
	</div>

在React源码中 `renderComponentToString` 的作用是:

<pre>
function renderComponentToString(component) {
    ...
    var componentInstance = instantiateReactComponent(component);
    var markup = componentInstance.mountComponent(id, transaction, 0);
    return ReactMarkupChecksum.addChecksumToMarkup(markup);
}
</pre>

进一步查看 `addChecksumToMarkup `方法，可以发现 `data-react-checksum`是对HTML计算出的[Adler-32](!https://en.wikipedia.org/wiki/Adler-32)值，每个服务端渲染的组件都会被添加这个值。

然后，当我们在客户端调用`renderComponent `方法时，对于"新"组件(不曾在客户端React实例中出现的组件，比如在服务端生成的组件)，会执行 `canReuseMarkup` 进行一次检验:

<pre>
// `markup` 是由组件生成的HTML
// `element` 是组件被渲染进的目标节点
canReuseMarkup: function(markup, element) {
    var existingChecksum = element.getAttribute(
        ReactMarkupChecksum.CHECKSUM_ATTR_NAME
    );
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32(markup);
    return markupChecksum === existingChecksum;
}
</pre>

执行过检验之后，React将不会执行渲染，而是记录下这个组件。

所以整个过程其实很简单：

- 在服务端渲染时，React给每个组件的外部DOM节点添加上这个组件的 checksum 值。
- 当客户端遇到"新"组件时，它会首先从组件的外部DOM中获取服务端添加的 Adler-32 checksum 值
- 然后与"新"组件的计算出的checksum值进行比较
- 如果两个值相同，则表示不必重新执行渲染。

例如，我们在服务端渲染了`Item({ initialCount: 5 })`,那么它外部的DOM节点将会被添加它的 checksum 值，之后在客户端调用`React.renderComponent(Item({ initialCount: 5 }), container)`时，它会检验此时`Item({ initialCount: 5 })`计算出的checksum值与已有的 checksum 是否匹配，在匹配的情况下，就不会进行重新渲染。

## 回顾

让我们记住以下几点：

- 在服务端渲染时，React 的生命周期函数中只有`getDefaultProps`, `getInitialState`, `andcomponentWillMount`会生效（详见[文档](!http://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount)中`componentDidMount `的note）。 
- 如果使用模板引擎，你需要在标记中用三重`{`，否则将不会被视为原生的HTML来进行解释(详见[文档](!http://handlebarsjs.com/)中HTML Escaping部分)。
- 模板引擎使用时最好用：

	&emsp;&emsp;\<div>{\{\{ markup }}}</div>

相对于：

&emsp;&emsp;<div>

&emsp;&emsp;&emsp;{\{\{ markup }}}

&emsp;&emsp;</div>

React 有时会对空格很敏感: 假如你用的是后者，然后把它渲染到一个`<div>`中，React将会认为这个`<div>`的`firstChild`是一个[换行符](!https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild) ，而不是组件。所以组件将会被重新渲染，这是一个尚未修复的[issue](!https://github.com/facebook/react/issues/996)。

- 为避免重新渲染，要保证markup值完全相同，也就是说，不能在服务端用`<script>`附上原始props，所以一个经验法则就是，尽量不要在渲染有关的部分写`(typeof window !== 'undefined')`这类代码。

## 参考&致谢

- Andrey Popp's [ReactAsync](!https://github.com/andreypopp/react-async/tree/master/example) examples.
- Andrey Popp's [react-quickstart](!https://github.com/andreypopp/react-quickstart) guide.
- Michael Hart's [react-server-example](!https://github.com/mhart/react-server-example) repo.
- Pete Hunt's [react-server-rendering-example](!https://github.com/petehunt/react-server-rendering-example) repo.
