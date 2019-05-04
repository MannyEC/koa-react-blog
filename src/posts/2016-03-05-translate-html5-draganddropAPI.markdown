---
layout:     post
title:      使用 HTML5 原生 Drag & Drop API [译]
subtitle:   Using HTML5’s Native Drag and Drop API
class:      "note"
date:       2016-03-05 
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- HTML5
- 译文

---

# 使用 HTML5 原生 Drag & Drop API

文章介绍了 HTML5 原生 API Drag 和 Drop，并结合这两个 API 制作出几个常见的案例。 **[原文 »](http://www.sitepoint.com/html5-native-drag-and-drop-api/)**

人人都喜欢易于使用且交互性好的用户界面，自从智能手机开始进入人们视野，用户对于用户界面的期望值有了进一步的提高：他们期待你的网站更加直观、具有通用简明的操作，总而言之就是给用户提供更便捷的方式去使用你的网站。

给用户提供 drag, drop 和 sort 的功能，能让他们更直观的理解怎样将元素 X 移动到位置 Y,或是怎样将对象 A 移到 B 的前面。

解决 dragging, dropping, 和 sorting 一直是 JavaScript 的工作，以前开发者可以选择自己构建交互方式，或者[使用现成的解决方案](https://jqueryui.com/draggable/)。随着 **HTML5 Drag and Drop API** 的到来，开发者们可以直接使用原生事件和属性，进行此类交互的开发。

## 简介

先浏览一下 API 来大致了解一下它的工作机制。

原生 API 允许我们给元素添加 `draggable="true"` 属性来定义元素可被拖放。也有一些元素被默认为可拖放的，无需再添加属性（比如 images 或 text）。

[![01](/img/post/2016-03-05-translate-01.jpg)](/img/post/2016-03-05-translate-01.jpg)

默认情况下，当可拖动元素被拖动时，只有 `form`类元素，如`input`，才能作为接受它们放入的容器。你应该曾见到过这种情况：如果你选中了一些文本，将他们拖入一个 `textarea`，这些文本将会被复制到该 `textarea`元素中。

[![02](/img/post/2016-03-05-translate-02.png)](/img/post/2016-03-05-translate-02.png)

原生 API 也能接受从 OS 中浏览器的外部区域，拖入文件到你的置入区域。几乎所有优秀的内容管理系统都能提供内容的拖拽上传。由于这些文件位于外部，你需要便是配置 drop 区域（以及能兼容的浏览器）。

[![03](/img/post/2016-03-05-translate-03.jpg)](/img/post/2016-03-05-translate-03.jpg)

### 移动设备的简要说明

目前原生 API 并不支持移动设备。也许将来将会引入，但是目前你最好在桌面浏览器上来看下列例子是怎样执行的。

## Drag &amp; Drop API 事件

原生 API 提供了以下这些可监听的 **events**。在设定的时间内，**draggable 对象**和 **drop 区域**都可以被应用此类事件。

当某一事件被触发后，我们可以捕获一个对象（我们称之为 `event`）。这个对象包含了更多关于该事件本身的信息，同时使你能获取 `dataTransfer` 对象，用来设置大部分方法和属性。

我们给每个事件绑定一个回调函数来和 API 交互:
<pre class="brush: actionscript3; gutter: true">// add a handler to trigger on dragstart 
//为 dragstart 添加一个处理函数 

document.addEventListener('dragstart', function(event) { 

// add your dragstart code here 
//在此添加你的 dragstart 代码 

}, false);</pre>

### Drag 相关事件

此类事件只能由 draggable 对象触发。

[**dragstart**](https://developer.mozilla.org/en-US/docs/Web/Events/dragstart)

<span style="font-weight: normal;">该事件在拖动一发生立即被触发。应该在该事件被触发时告诉 API 我们想要拖动的元素，以及设置其他值。使用 </span>`setData()`<span style="font-weight: normal;"> 方法来设置你要保存的数据，为 draggable 元素设置</span>`effectAllowed`<span style="font-weight: normal;"> 属性，以及用 </span>`setDragImage()`<span style="font-weight: normal;"> 来定义 draggable helper。</span>

[**drag**](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/drag)

<span style="font-weight: normal;">该事件将在拖动过程中持续被触发。触发次数和浏览器有关。它在准确定位被拖动元素的位置时将非常有用。</span>

[**dragend**](https://developer.mozilla.org/en-US/docs/Web/Events/dragend)

<span style="font-weight: normal;">该事件在 draggable 对象被 drop 时即刻触发（无论被 drop 在哪里），而且往往紧随在 drop 区域的 </span>`drop`<span style="font-weight: normal;"> 事件之后被触发。你可以利用该方法来重置之前给拖动中状态设置的样式，或者执行其他的清除工作。</span>`dragend`<span style="font-weight: normal;"> 事件能够获取被draggable 对象，所以你可以在拖动结束之后执行运算（比如查询新加入的元素来判断 </span>`drop`<span style="font-weight: normal;"> 事件是否成功，然后移除之前的 draggable 对象）。</span>

### Drop 相关事件

此类事件只能在你指定为 drop target 的对象上被触发（或者本身即为 drop target 的对象，如 form 对象）。

[**dragenter**](https://developer.mozilla.org/en-US/docs/Web/Events/dragenter)

该事件仅在 draggable 对象进入 droppable 区域时被触发一次。只有当50%以上的 draggable 对象进入 drop 区域中才会被触发。

该事件将设置 drop 区域的 `dropEffect` 。默认情况下，drop 于非表单对象将什么都不会发生。你需要人为的调用 `event.preventDefault()`和 `event.stopPropagation()` 来通知 API 此次 drop 应该发生。

你可以查看 `dataTransfer` 对象的 `effectAllowed` 值，该值由 draggable 对象设置，用它和 drop 区域的 `dropEffect` 值做比较。如果这两个值不相同（例如一个是 `copy` 而另一个是 `link`），那么浏览器将无法成功 drop 这个对象（即使你调用了上文的 prevented defaults 和 stopped propagation）。

之前在 `dragstart` 事件中设置的数据，可以用 `types` 属性来获取其数据类型的列表。但你只能得到数据类型，无法获得数据值。此时你可以调用 `contains` 方法来查看某一特定类型的数据是否被创建。具体通过 `event.dataTransfer.types.contains(type)` 方法实现。例如，你可以用它来确保某些数据已经被设置为`text/html`类型。

通过设置 classes 或者触发行为，你可以得知 draggable 对象进入了 drop 区域（一种常用做法是给drop 区域激发前后设置不同的样式）。

[**dragover**](https://developer.mozilla.org/en-US/docs/Web/Events/dragover)

该事件基本上与 `dragenter` 相同，但是他在 draggable 对象位于 drop 区域中时仍会被持续触发。当你想确定 draggable 的具体位置时，该事件是最好的选择（因为它会持续被更新）。

该事件和 `dragenter` 事件类似，会为 drop 区域设置 `dropEffect`，你同样需要 prevent default 和 propagation。

[**dragleave**](https://developer.mozilla.org/en-US/docs/Web/Events/dragleave)

该事件在 draggable 对象离开 drop 区域时即被触发。它常用于移除在 `dragenter` 和 `dragover` 事件发生时添加的样式，当 draggable 对象不与 drop 区域重叠时，就会触发该事件。

[**drop**](https://developer.mozilla.org/en-US/docs/Web/Events/drop)

该事件将在 draggable 对象被释放，同时 drop 区域允许接受此次 drop 时被触发。也就是当 draggable 对象和 drop 区域有正确的 `dropEffect` 和 `effectAllowed` 值时才会被触发。在该事件中，你可能会需要用 `getData()` 方法来获取信息。

## Drag &amp; Drop API 方法

[dataTransfer](http://help.dottoro.com/ljmpcqdb.php) 对象是我们处理原生 drag &amp; drop API 时的主要交互对象。它作为 event 的回调函数的一部分暴露给我们，也给我们提供了一些可用的函数。

[**setData**](http://help.dottoro.com/ljvspfdo.php)

该方法用来设置从 draggable 对象中获取的数据，使用方法为 [event.datatransfer.setData(type, data)](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)。在拖放过程中你将会需要传递数据类型和数据本身，但是这些需要在 `dragstart` 事件触发时就被设置，否则将会失败，并且只有在之后的 `drop` 事件期间这些值才能被获取到。

`type` 的参数应该为[可用数据类型](http://www.iana.org/assignments/media-types/media-types.xhtml)。在 Chrome, Safari, 或 Firefox 浏览器下，你可以使用多种数据类型，比如 `text/html` 或 `text/uri-list`。在 IE 浏览器下，你必须设置类型为 `Text` 或 `URL`（只能是这两种类型，否则将出错）。

`data` 的参数是你想存储的 data。你可以存储 URL 和 HTML 代码块，或者任何数据段。在每个 `type` 中只能设置一个数据段。比如说，假如你设置了 `text/html` 类型来存储一些 HTML，你就不能再用 `setData()` 方法来设置一些新的数据，因为这会取代原有内容。

[**getData**](http://help.dottoro.com/ljolwfvj.php)

这是与 `setData()` 对应的方法，用来获取 `startdrag` 事件中 draggable 对象的数据集。使用方法为 `event.dataTransfer.getData(type)`，要指明想要获取数据的类型。

你很有可能需要查看现有的数据类型，可以使用`event.dataTransfer.types`来查看目前有哪些格式。如果你试图获取一种当前没有被设置的类型，IE 浏览器下将会报错。

该方法只能用于 `drop` 事件，应为只有此时 API 才会将值暴露给我们来获取（此做法是为了在传送过程中保护数据）。

[**clearData**](http://help.dottoro.com/ljdbqmud.php)

该方法正如它的命名，用来清除使用 `setData` 设置的所有数据。用法为 `event.dataTransfer.clearData(type)`。你需要制定需要清除的数据类型（例如 `text/html` 或 `URL`）。该方法只能用于 `dragstart` 事件中。

[**setDragImage**](http://help.dottoro.com/ljdpgfkx.php)

该方法可以设置 dragging 开始时呈现的图像，使用方式为：[event.dataTransfer.setDragImage()](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations#dragfeedback)。默认情况下，当你进行拖动时，用户将会看到一个被拖动对象的半透明图像。使用该方法，你可以自己定义此时显示的图像。除了 IE 外，其他浏览器都支持该方法， [IE 目前也没有支持它的打算](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6542268-setdragimage-on-datatransfer-of-dragevent)。

## Drag and Drop API Properties

## Drag &amp; Drop API 属性

`dataTransfer` 对象有[多个属性](http://help.dottoro.com/ljmpcqdb.php)。我们通过事件回调的 **event** 变量来设置这些属性。

[**effectAllowed**](http://help.dottoro.com/ljevcwjm.php)

该属性只有 draggable 对象可用。它会通知 API drag 事件的发生，并且决定鼠标显示的图标样式（样式也和 OS 及浏览器有关）。使用方法为：在 dragstart 事件中，使用 [event.dataTransfer.effectAllowed](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer#effectAllowed.28.29) 来赋值。可选值有

`copy`,`move`,`link`,`copyLink`,`copyMove`,`linkMove`,`all`,`none`,和 `uninitialized`。

如果该值和 `dropEffect` 不能匹配，那么 `drop` 事件将无法被触发（以确保适当的置入发生）。

[**dropEffect**](http://help.dottoro.com/ljffjemc.php)

该属性只有 drop 区域可用，决定了允许置于此区域的 drag 对象。使用方法为：在 `dragenter` 或 `dragover` 事件中，用 `event.dataTransfer.dropEffect` 来赋值。可选值有 `copy`,`link`,`move`, 和`none`。

与之前类似，如果如果该值和 `effectAllowed` 不能匹配，那么 `drop` 事件将无法被触发（以确保适当的置入发生）。

[**files**](http://help.dottoro.com/ljslrhdh.php)

该属性包含了已经被设置的本地文件的列表。使用方法为：`event.dataTransfer.files`。 它只会包含从 OS 中拖入的文件（比如从桌面拖到网站的上传容器中的图片文件）。浏览器中被拖动的文件将不会被写入 files 属性中（比如当你拖动一个图片， `files` 将不会写入它的数据）。

利用这个属性你能够查看是否有文件，并且可以用[fileReader对象](https://developer.mozilla.org/en/docs/Web/API/FileReader) 来获取和处理已有文件的内容。

[**types**](http://help.dottoro.com/ljchqudq.php)

该属性提供了当前 drag 对象的数据类型列表。使用方法为： `event.dataTransfer.types`。可以用该属性来查看 `dragenter` 和 `dragover` 事件中设置的数据类型。

### `effectAllowed` &amp; `dropEffect` 实战

如果你迫不及待的想知道这两个属性的在实践中怎样使用，可以看下面的 CodePen 示例：

See the Pen [Native Drag and Drop — the effectAllowed and the DropEffect properties](http://codepen.io/SitePoint/pen/epQPNP/) by SitePoint ([@SitePoint](http://codepen.io/SitePoint)) on [CodePen](http://codepen.io/).

我们先定义 draggable 对象，设置 drop 它们的区域。创建几个 droppable 区域并且为它们设置接收的 drop 类型。正确的设定这些属性可以让浏览器清楚哪些 draggable 对象可以被 drop 。

尽管 IE 浏览器支持 `effectAllowed` 和 `dropEffect` 属性，但是在 IE 中并不能利用原生实现 drag 对象拖入 drop 区域。Chrome, Safari, 和 Firefox 会限制 drag 对象，并且阻止错误的 drop 行为触发 `drop` 事件。所以在 IE 浏览器中，需要人为的比对 value，以阻止不正确的 `drop` 事件被触发。

## 用原生 API 来做些实例

我们已经了解了很多关于原生 API 的信息，下面我们使用它们来构建一个实例。

原生 API 首要关注 **draggable** 和 **droppable** 对象之间的交互，以及它们之间数据的传输。原生 API 不会关心你怎样移动两个元素试图交换它们的位置，而是关注拖放对象的数据，正是这种关注点使原生 API 独树一帜。

原生 API 的一个优点是能够处理不同**类型**和**位置**的数据。

数据类型包括：

*   纯文本字符串
*   Text / HTML 内容
*   URL 列表
*   单个或多个文件
*   多种其他或自定义类型

数据单元包括：

*   内部元素被拖放产生的数据
*   其他标签、窗口、浏览器中可拖动对象产生的数据
*   桌面等本地资源产生的数据

## 处理 Drag &amp; Drop 中对象的数据

原生 API 提供了对元素进行 dropping 和 dragging 的基本支持。与 jQuery UI 不同的是，尽管 API 提供给你可监听的事件，用来获得拖动成功的时刻，你仍需要自己去移动或复制元素，来调整 API。

这是因为当你开始拖动一个对象时，你就触发了此对象的 `dragStart` 事件，该对象设置了你想传输的数据（还有你想为此对象添加的效果，比如：copy，move，或link）。当你把被拖动对象放入正确的位置时，将会触发置入区域的 `drop` 事件。此时你可以利用这个事件，操纵你想要移动的对象的数据，而不是直接得到 这个 UI 对象（你需要自己用 JavaScript 来获取）。

让我们通过一个实例来理解它是怎样运作的。

## 实例：拖放拼图游戏

通过下面的例子来了解怎样使用 API 来在同一页面中的元素间传递数据。

See the Pen [Native Drag &amp; Drop – Data transfer on a single page](http://codepen.io/SitePoint/pen/yYQRvG/) by SitePoint ([@SitePoint](http://codepen.io/SitePoint)) on [CodePen](http://codepen.io/).

示例中定义了一系列的区域。左侧区域放置了主要的拼图块，右侧是用来置入拼图块的空区域。游戏的玩法是将左侧的拼图拖到右侧的正确位置，拼出正确的图像。

### 在 `dragStart` 中设置数据

在每块拼图的 `dragStart` 事件中，我们首先要设置 `effectAllowed` 属性来允许它进行 `copy` 类型的拖动。

然后，取得当前的 `src`(图片资源) 以及 `outerHTML`(HTML 节点)，将它们写入 data transfer 对象，类型设为 `text/uri-list` 和 `text/html`。而在 IE 浏览器中，只需要写入拖动对象的 `src` ，类型设为 `text`。
<pre class="brush: actionscript3; gutter: true">var dragItem;

//在拖动开始时触发

function dragStart(event) {

drag = event.target;

dragItem = event.target;

//给被拖动对象设置 effectAllowed 属性

event.dataTransfer.effectAllowed = 'copy';

var imageSrc = $(dragItem).prop('src');

var imageHTML = $(dragItem).prop('outerHTML');

//判断是否为 IE （仅支持 text 或 URL 类型）

try {

event.dataTransfer.setData('text/uri-list', imageSrc);

event.dataTransfer.setData('text/html', imageHTML);

} catch (e) {

event.dataTransfer.setData('text', imageSrc);

}

$(drag).addClass('drag-active');

}</pre>

### 校准 effectAllowed / dropEffect

在我们 drop 拼图块之前，`dragEnter` 和 `dragOver` 事件将会被触发。此时一定要记得要用 return false 或者 prevent default 来通知浏览器允许 drop。这两种方式都能将 drop 区域的 `dropEffect` 属性设为 `copy`，使得该区域能够接受 `effectAllowed` 属性为 `copy` 的被拖动对象（和之前的设置一拍即合）。我在这里特别说明这个事情是因为假如 `dropEffect` 与 `effectAllowed` 不匹配，那么 drop 事件将不会被触发，我们的拖动也会被取消。

### 获取 drop 的数据

当我们把拼图放到右侧区域中后，要使用 `getData` 方法来获取之前设置的 `text/uri-list` 和 `text/html` 数据。当然，在 IE 浏览器中只需要获取 `text` 数据。

此时就要根据具体数据，进行不同的处理。如果我们能获取 `dataHTML` 数据，说明当前处在一个完全支持的浏览器环境下，我们能直接得到拼图块的对象节点。把这个节点添加到 drop 区域中，整个 drop 就实现了。

如果当前浏览器不支持这种方式，我们需要复用在 `dragStart` 时定义的 `dragItem` 变量来获得拼图块的对象节点。然后将此节点添加到drop 区域中，完成所有操作。
<pre class="brush: actionscript3; gutter: true">
//在 draggable 对象置入 droppable 对象时调用
function drop(event) {

drop = this;
$(drop).removeClass('drop-active');

var dataList, dataHTML, dataText;

//获取数据（要考虑浏览器的不同）
try {
dataList = event.dataTransfer.getData('text/uri-list');
dataHTML = event.dataTransfer.getData('text/html');
} catch (e) {
dataText = event.dataTransfer.getData('text');
}

//能获得 HTML 时
if (dataHTML) {
$(drop).empty();
$(drop).prepend(dataHTML);

//判断拼图块的位置有没有拼对
checkCorrectDrop(drop, dragItem);

//查看整个拼图是否已经完成
checkCorrectFinalImage();
}

//只能得到 text（老式浏览器 + IE）

else {
$(drop).empty();
$(drop).prepend($(dragItem).clone());

//判断拼图块的位置有没有拼对
checkCorrectDrop(drop, dragItem);

//查看整个拼图是否已经完成

checkCorrectFinalImage();
}

event.preventDefault();
event.stopPropagation();
}</pre>

### 完成整个游戏

两个drop 事件都会调用 `checkCorrectDrop(drop, dragItem)` 和 `checkCorrectFinalImage()` 函数。它们被用于我们的游戏。

`checkCorrectDrop()` 函数用来判断 drag对象和 drop区域的自定义的属性 `data-value` 是否一致。如果一致，就说明拼图块位置正确，显示一个绿色的边框（以及 `active` 类）。

`checkCorrectFinalImage()` 函数来判断当前所有的拼图块是否都放对了位置，如果位置正确的对象数量和可拖动对象总数相同，那么说明我们拼对了整个拼图——万岁！

## 从其他标签页或桌面本地文件中传输数据

原生 API 能让你定义 drop 区域来接收拖动对象。似乎我们用 jQuery UI

也能实现这个功能，但是用 jQuery UI 不能从其他标签页，窗口和浏览器中拖放对象到当前的 drop 区域。

我们已经在很多网站上见到过这种例子。这些网站允许你从其他页面直接拖入资源到他们页面对应的 drop 区域中。

为了获得大部分的 dragging 和 dropping，我们要配置 drop 区域，使它能处理多种数据（基本上 draggable 对象都可能被拖入 drop 区域中，如 images, text, links 和 content）。

将**桌面或本地设备**的内容拖入**网页**中，并且自动实现上传的过程,是原生 API 的一个革命性的特征，你简直无法想象没有它之前我们怎样去实现这个功能。

大多数的 CMS（如 WordPress）通过一个拖拽界面来支持内容的上传。而其他的 web 应用，像 Gmail 也提供了这个功能，允许你直接拖入内容，并且自动实现关联或存储这些内容，以供使用。

## 实例：从外部资源拖入图片

下一个例子中我们将实践从其他页面或窗口中进行拖动交互，让 drop 区域来呈现拖入的图片。

另外，这个实例可以处理本地拖入的图像。你能够直接从桌面拖图片到浏览器的 drop 区域中，原生 API 将会处理图片并将它展示出来。

[![04](/img/post/2016-03-05-translate-04.jpg)](/img/post/2016-03-05-translate-04.jpg)

如果你现在就想知道它是怎样实现的，可以看下面的 CodePen 示例：

See the Pen [Native Drag and Drop – Dragging files directly onto the website](http://codepen.io/SitePoint/pen/zvMMvr/) by SitePoint ([@SitePoint](http://codepen.io/SitePoint)) on[CodePen](http://codepen.io/).

我们在这个示例中，主要关注对置入后的对象进一步处理。也就是说在上一个例子中我们要在对象被 drag 时设置数据，而在本例中我们只需要收集对象被 drop 后的数据，然后决定怎样处理它。

在 `drop` 函数中，我们首先要用 `getData(format)` 方法从 `dataTransfer` 对象中获取信息。
<pre class="brush: actionscript3; gutter: true">
//获取被拖入元素的 URL
try {
dataValue = event.dataTransfer.getData('text/uri-list');
dataType = 'text/uri-list';
} catch (e) {
dataValue = event.dataTransfer.getData('URL');
dataType = 'URL';
}</pre>

我们用 try-catch 结构来包含代码主体是因为 IE 浏览器无法识别用 `getData()` 方法获取 format 数据，导致抛出 error 并终止进程。

如果我们能得到 `text/uri-list` 类型的数据，就获取它；否则我们就退一步，使用基本的 `URL` 属性。

大多数我们拖动的对象，比如 images, links 或 data 可能有多种数据类型。因此我们只关注这些对象的 URL，这样做很有效。

如果能获得 `dataValue` 的集合，就表示用户在 drop 区域中拖入了对象。下一步工作就是识别该对象。由于我们只想处理图片文件，但是 API 不能区分图片的 URL 和标准 link 的差别，所以我们需要自己检验一下是否为图片。
<pre class="brush: actionscript3; gutter: true">
//判定我们的 URL 是否为一个图片
imageDropped = false;
var imageExtensions = ['.jpg','.jpeg','.png','.bmp','.gif'];
for (i = 0; i&lt; imageExtensions.length; i++) { 
if (dataValue.indexOf(imageExtensions[i]) !== -1) {
//创建我们要添加的图片
var image = '&lt;img src="' + dataValue + '"&gt;';
drop.append(image);
imageDropped = true;
break;  
}
}</pre>

创建一个图片扩展名的列表，包含常见的图片类型，如`.jpg` 和 `.png`，检验 URL 中是否出现过这些类型。如果出现，就表示置入的对象为一个图片，然后我们创建一个新的图片对象，给它赋予此 URL 路径。

### 处理本地 drop 对象

处理本地元素的 drop 方式有一些不同。我们不再用 `getData(format)` 方法，而是用 `files()`。该方法能给我们一个含有所有 dropped 元素的列表，所以我们可以遍历。
<pre class="brush: actionscript3; gutter: true">var dataFiles = event.dataTransfer.files;
var dataOutput = []; 
if (dataFiles) {
for (i =0; i &lt; dataFiles.length; i++) {
//在此处执行操作
} 
}</pre>

我们的例子中通过遍历所有拖入的文件并检验是否为图片。循环到的每个文件都有一系列属性，包括 `type` 属性，列出了该文件的 MIME 类型。
<pre class="brush: actionscript3; gutter: true">
//判定是否为图片
if (dataType.match('image.*')) {
//拖入的为图片，继续下一步
}</pre>

一旦我们匹配到 image 类型，就创建一个[fileReader](https://developer.mozilla.org/en/docs/Web/API/FileReader) 对象，用它来将文件读入内存。接下来用 `readAsDataURL(item)` 方法读取文件。这一切就绪后，文件就会触发 `onload` 事件，我们要在这个事件中进行下一步操作。
<pre class="brush: actionscript3; gutter: true">
//读入内存
var reader = new FileReader();

//导入元素
reader.readAsDataURL(dataItem);</pre>

现在要做的就是获取 file reader 的结果，然后把它添加到 DOM 中。这样就是实现了将桌面图片拖入网站的操作。
<pre class="brush: actionscript3; gutter: true">
//当图片被导入
reader.onload = (function(theFile) {
return function(e) {
var url = e.target.result;

drop.append('&lt;img src="' + url + '" title="' + dataName + '"/&gt;');
messageContainer.append('
&lt;p&gt;&lt;strong&gt;Successfully dropped an image from your desktop&lt;/strong&gt;&lt;/p&gt;
');
};
})(dataItem);</pre>

## 浏览器支持一览

正如命名所示，API 为开发者提供了一系列事件和方法，使我们无需依赖第三方 JavaScript 库即可实现 UI 交互。

总的来说，目前桌面浏览器对此 API 有很好的支持，而移动端则基本不支持。所以只要遵循开发规范，在大部分现代桌面浏览器中都能运行的不错。但是 IE 浏览器则会产生一些特有的问题。

桌面浏览器对 API 的支持情况出奇的好，Chrome, Firefox, Safari 以及 Opera 都全面支持。另一方面，IE 对该 API 的支持性略有不同，取决于你当前使用的是哪一个 IE 版本,比如说：

*   **IE7, IE8 和 IE9 中不支持`dataTransfer.files`和`.types`对象。**也就是说在 IE9 及它之前的版本中你不能使用原生的 drag &amp; drop来支持将桌面文件拖入页面中的操作。
*   **`dataTransfer.setData/getData` 支持的格式很有限。**实际使用中，当我们拖动元素时，需要在 drag 对象中存储 drop 区域可取得的数据。大部分浏览器中可以存储为多种类型(如 `text/html` 或 `text/uri-list`) ，以及你的自定义类型。但是 IE 仅支持 `Text` 或 `URL` 类型, 也就是说 IE 中你能处理的数据仅限这两种。
*   **IE 所以版本中都不支持 `dataTransfer.setDragImage()` 方法。** 基本上来说无法自定义拖放时显示的图片或元素。你只能利用浏览器默认样式（大多数情况下是被拖动元素的半透明图片）。

移动端对于此 API 基本没有提供具有实用价值的支持（截至2015年10月）。这可能和移动端浏览器自身便是利用拖动或滚动来查看内容的交互方式有关。IE11 是唯一支持该 API 的移动端浏览器。

## 补充资料

目前还有很多优秀的资源可以让我们去进一步了解 Drag &amp; Drop API 的其他细节。其中一些会讨论各种API 中方法的适用性，探讨可捕获的 event 事件，还有一些会详述 API 在不同浏览器中的差异，或是概述一个很好的实例。

你可以从下面这些链接开始学习，我就是通过它们来入门原生 Drag &amp; Drop API的：

*   [Native HTML5 Drag and Drop](http://www.html5rocks.com/en/tutorials/dnd/basics/) on HTML5 Rocks
*   [The dataTransfer object](http://help.dottoro.com/ljmpcqdb.php) on the Dottoro Web Reference
*   [Introduction to Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop) from Mozilla

## 总结

至此，你已经对原生 Drag &amp; Drop API 和应用 API 来实现交互界面有了基本的掌握。但是真正理解这些知识，还需要大量的实践。

尽管目前原生 API 缺少对移动设备的支持，但是它在桌面浏览器上出色的表现完全值得你把它应用于你的新项目中。

Tags: [drag and drop](http://www.sitepoint.com/tag/drag-and-drop/), [HTML5 drag and drop](http://www.sitepoint.com/tag/html5-drag-and-drop/)