---
layout:     post
title:      Python中__all__的作用
subtitle:   
class:		"note"
date:       2016-07-01
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- Python

---
在使用Python来定义module和包的时候，都需要考虑模块被使用时，会导入的模块属性。

## 用`from module import *`来导入的情况下

首先，**这绝非一个导入模块的好方法，最好不要这样使用。**而且这种情况下会导入哪些文件取决于操作系统的文件系统。

在PEP8中建议使用`__all__`机制防止导入全局变量。我们可以在`__init__.py`中使用`__all__`变量指定这种情况下自动导入的模块或者属性的名称。

在模块中要阻止模块属性被导入，可以将模块属性命名前加上下划线`_`，这样模块可以防止被`from module import *`所导入。当然，你可以用直接指定的方式来使用这个模块，如`import module._bar`。

### 在包中使用

```
# pkg/__init__.py
__all__ = ['moduleA','moduleB']

from moduleA import Phone, calling
from moduleB import User
...
```

### 在模块中使用

```
# 模块 phone.py
__all__ = ['Phone','calling']

```