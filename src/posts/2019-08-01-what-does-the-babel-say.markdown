---
layout:     post
title:      What does the babel say
subtitle:
type:       blog
date:       2019-08-01
tags:       other
---

![](/img/post/babel.png)

# 前言

本文简要介绍babel的功能，基本概念、以及核心模块的工作原理。目的是让日常开发中使用了babel但是对其没有过多了解的前端开发同学对babel有一个宏观的掌握。

文中讨论的内容，都是基于当前最新的 Babel 7版本。

Author： eckid 2019.8

# Babel简介

Babel（音同babble）Babel 是一个 JavaScript 编译器, 是大多数现代前端工程不能缺少的工具之一。

在编写js代码的时候，通常情况下，我们都希望使用ES2015或者最新标准的一些语法和特性来提高我们的开发体验。但是js代码要在浏览器或者node环境才能运行，而用户的浏览器对ES2015的兼容程度参差不齐，所以就会产生运行环境与代码不兼容的问题。

为了解决这个问题，就产生了babel这类工具，它用于"将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。”

简单来说，就是把我们写的最新版本的代码，翻译成不同浏览器都能支持的语法。

举几个例子看一下babel做了什么：

1) 箭头函数

    // 假如我们写的是ES2015的箭头函数
    [1, 2, 3].map((n) => n + 1);
    
    // 经过Babel编译后，变成兼容ES5的代码
    [1, 2, 3].map(function(n) {
      return n + 1;
    });

2) export

    // 假如我们使用了 export
    export const calling = () => {
      return "calling...";
    }

    // 经过Babel编译后，变成兼容ES5的代码
    "use strict";
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calling = void 0;
    
    const calling = function calling() {
      return "calling...";
    };
    
    exports.calling = calling;

3) 模板字符串

    // 假如我们使用了模板字符串
    import { calling } from './call';
    
    const testfunc = (descStr) => `descStr ${descStr}`;

    // 经过Babel编译后，变成兼容ES5的代码
    "use strict";
    
    var _call = require("./call");
    
    const testfunc = descStr => "descStr ".concat(descStr);

# 模块划分

我们的一个前端工程中，往往可以看到数十个@babel前缀的包，如果想弄清他们的作用，首先要理解它们分别属于：“核心的功能模块”、“插件”或者“preset”中的哪一个。下面就介绍一些babel核心模块。

## @babel/cli

babel 内置的命令行工具，安装了之后，可以通过命令行调用babel来编译文件。

## @babel/core

babel核心功能模块，编译器核心，提供transform接口

## @babel/polyfill

如果说 @babel/core 的功能时“对代码的改写”， @babel/polyfill 的功能就是对运行环境的一种"功能补充"。

我们知道Babel的核心模块是对ES5不支持的新语法进行转译，代码经过转译后就变成了 ES5 支持的代码，于是可以顺利运行。

但是对于标准中新增的API(如Promise,Set,Array.includes等)，这种global层级天生不支持的API，没办法通过“换个写法”来解决。此时就需要使用 @babel/polyfill 来让浏览器支持这些接口。通常我们将 @babel/polyfill 放在代码的最上层引入，以便后续的代码可以使用这些API。

**@babel/polyfill 的缺点：**

1) 体积过大，完全引入将会大大增加代码量。解决方案为：配合 @babel/preset-env 的 useBuiltIns 来配置。或者单独引入需要的 @babel/polyfill 模块。

2) 污染全局作用域

## @babel/plugin-transform-runtime  与 @babel/runtime

@babel/plugin-transform-runtime 这个插件的功能是避免多次编译出helper函数(babel转译的代码需要借助helper)，另外与@babel/runtime 一起使用用于解决 @babel/polyfill 污染全局作用域的问题。

@babel/plugin-transform-runtime是开发模式使用的依赖，@babel/runtime 是发布环境使用的依赖。

babel-runtime有个缺点，它不模拟实例方法，即内置对象原型上的方法，所以类似Array.prototype.find，你通过babel-runtime是无法使用的。

# 插件机制

刚才提到，代码的编译过程是在@babel/core中进行，为了提高可扩展性，babel提供了插件机制来执行编译阶段对代码要做的改造。我们可以通过编写插件来定制自己需要的编译结果。插件相关的概念有 plugin和preset。

## 1. Plugin
plugin 操作的对象不是代码，而是babel解析好的抽象语法树（AST）。插件的功能就是实现 ast => ast 的改造。最终经过一系列插件的改造后，babel再将AST生成为代码。这个流程可以看出，插件的执行顺序很重要，前序插件的改造结果将影响后序插件的输入。关于执行顺序有以下几个规则：

- 插件在 Presets 前运行。
- 插件顺序从前往后排列。
- Preset 顺序是颠倒的（从后往前）。
    
另外，在开发插件的时候，每个插件的功能粒度最好划分的小一些，这样能把插件的影响控制在可控范围内，如果需要定制多种变换，应通过多个插件进行。

插件配置示例：

    {
      "plugins": ["transform-decorators-legacy", "transform-class-properties"]
    }

## 2. Preset

每个preset是一套插件的组合，可以看作是一套适用某种环境的插件集。值得注意的是Preset的执行 顺序是颠倒的（根据配置从后往前）。

preset配置示例：

    {
      "presets": ["es2015", "react", "stage-2"]
    }

**值得了解的几个preset：**

1) @babel/preset-env

基本包含了目前js新的特性，并且可以配置目标环境，来选择不支持的新特性进行转译。比如可以指定最低的浏览器版本：
    
    {
      "targets": {
        "chrome": "58",
        "ie": "11"
      }
    }
    
2) @babel/preset-react

这个preset包含了以下的插件，专为react开发设计。

    @babel/plugin-syntax-jsx
    @babel/plugin-transform-react-jsx
    @babel/plugin-transform-react-display-name

3) 各种stage

Babel 7开始，决定不再继续支持各种处于提案阶段的内容，以前的版本中是通过 stage-0, stage-1等preset来支持的，所以最好避免使用这类preset，以免踩坑。

## 配置方式

babel支持使用配置文件的方式，通过在项目根目录下使用`.babelrc`文件 或 `babel.config.js`文件来进行配置。官方推荐使用 babel.config.js 作为配置文件。

除此之外，@babel/cli 在使用的时候，可以传入参数， @babel/core 在引用时，可以传入参数。在这里就不做详细介绍了。

比如用命令行编译 src 目录下文件，并输出到 lib 目录

    ./node_modules/.bin/babel src --out-dir lib

或者直接在代码中引用
    
    const babel = require("@babel/core");
    babel.transform("code", optionsObject);


# 工作原理

大部分编译器的工作可以被分解为三个主要阶段：解析（Parsing），转化（Transformation）以及代码生成（Code Generation）。

1. *解析* 将源代码转换为一个更抽象的形式。

2. *转换* 接受解析产生的抽象形式并且操纵这些抽象形式做任何编译器想让它们做的事。

3. *代码生成* 基于转换后的代码表现形式（code representation）生成目标代码。

Babel 也遵循上述的编译器原理，分为“解析”-> “转换” -> “生成” 三个阶段，在@babel/core中完成。下图是通过@babel/cli进行编译的一个执行流程。


![](/img/post/flow.png)


首先@babel/cli根据参数读取代码后，会调用 @babel/core 提供的 transfrom 执行进行编译 

    export function transform(
      filename: string,
      code: string,
      opts: Object,
    ): Promise<Object> {
      opts = {
        ...opts,
        caller: CALLER,
        filename,
      };
    
      return new Promise((resolve, reject) => {
        babel.transform(code, opts, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    }

接着在@babel/core中，先对code 进行解析，将传入的代码串编译成AST。

    export function parseSync(
      code: string,
      opts?: InputOptions,
    ): ParseResult | null {
      const config = loadConfig(opts);
    
      if (config === null) {
        return null;
      }
    
      return normalizeFile(config.passes, normalizeOptions(config), code).ast;
    }

构建AST后，就到了编译环节，此时各种插件将会逐一执行，对AST进行改造。

    function transformFile(file: File, pluginPasses: PluginPasses): void {
      for (const pluginPairs of pluginPasses) {
        ...    
        // 遍历插件，traverse ast执行转译
        // merge all plugin visitors into a single visitor
        const visitor = traverse.visitors.merge(
          visitors,
          passes,
          file.opts.wrapPluginVisitorMethod,
        );
        traverse(file.ast, visitor, file.scope);
    
        for (const [plugin, pass] of passPairs) {
          const fn = plugin.post;
          if (fn) {
            const result = fn.call(pass, file);
            ...
          }
        }
      }
    }
    
最后生成将改造后的AST 生成code，使用@babel/generate

    ...
    transformFile(file, config.passes);
    
    const opts = file.opts;
    const { outputCode, outputMap } =
      opts.code !== false ? generateCode(config.passes, file) : {};
    ...


# 补充阅读

[Babel 官网](https://babeljs.io/)

[tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)