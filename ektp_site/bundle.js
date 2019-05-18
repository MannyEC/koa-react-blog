/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ektp_server/index.js":
/*!******************************!*\
  !*** ./ektp_server/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n__webpack_require__(/*! @babel/register */ \"@babel/register\");\n\n__webpack_require__(/*! @babel/polyfill */ \"@babel/polyfill\");\n\nvar Koa = __webpack_require__(/*! koa */ \"koa\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar Router = __webpack_require__(/*! koa-router */ \"koa-router\");\n\nvar staticServer = __webpack_require__(/*! koa-static */ \"koa-static\");\n\nvar filePath = path.resolve('./src/posts');\nvar router = new Router();\n\nvar index = __webpack_require__(/*! ./routes/index */ \"./ektp_server/routes/index.js\"); // get post list\n\n\nrouter.get('/api/v1/posts',\n/*#__PURE__*/\nfunction () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ctx, next) {\n    var files;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            files = [];\n            _context.next = 3;\n            return new Promise(function (resolve, reject) {\n              fs.readFile(\"\".concat(filePath, \"/index.json\"), function (err, data) {\n                if (err) ctx.throw(err);\n                var jsonData = JSON.parse(data.toString());\n                jsonData.forEach(function (item) {\n                  files.push(item);\n                });\n                resolve();\n              });\n            });\n\n          case 3:\n            ctx.body = files;\n\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}()); // get post content\n\nrouter.get('/api/v1/post/:id',\n/*#__PURE__*/\nfunction () {\n  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(ctx, next) {\n    var id, ret;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            id = ctx.params.id;\n            ret = null;\n            _context2.next = 4;\n            return new Promise(function (resolve, reject) {\n              fs.readFile(\"\".concat(filePath, \"/\").concat(id), function (err, data) {\n                if (err) ctx.throw(err);\n                ret = data.toString();\n                resolve();\n              });\n            });\n\n          case 4:\n            ctx.body = ret;\n\n          case 5:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}());\nvar app = new Koa();\napp.use(index.routes(), index.allowedMethods());\napp.use(router.routes()).use(router.allowedMethods());\napp.use(staticServer('./ektp_site'));\napp.on('error', function (err, ctx) {\n  console.error('server error', err, ctx);\n});\napp.listen(8910);\nconsole.log(\"api server is listening on \".concat(8910));\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(filePath, \"filePath\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\index.js\");\n  reactHotLoader.register(router, \"router\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\index.js\");\n  reactHotLoader.register(app, \"app\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_server/index.js?");

/***/ }),

/***/ "./ektp_server/renders/index.js":
/*!**************************************!*\
  !*** ./ektp_server/renders/index.js ***!
  \**************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _ektp_src_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../ektp_src/routes */ \"./ektp_src/routes/index.js\");\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layout */ \"./ektp_server/renders/layout.js\");\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_layout__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./store */ \"./ektp_server/renders/store.js\");\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\n\n\n\n\n\n\n\n\nvar getMatch = function getMatch(routesArray, url) {\n  return routesArray.some(function (router) {\n    return Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"matchPath\"])(url, {\n      path: router.path,\n      exact: router.exact\n    });\n  });\n};\n\nvar render =\n/*#__PURE__*/\nfunction () {\n  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ctx, next) {\n    var _getCreateStore, store, history, branch, promises, dataLoader, lf, isMatch, html, initState, body;\n\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _getCreateStore = Object(_store__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(ctx), store = _getCreateStore.store, history = _getCreateStore.history; // const branch = matchRoutes(router, ctx.req.url);\n\n            branch = [];\n            promises = branch.map(function (_ref2) {\n              var route = _ref2.route;\n              var fetch = route.component.fetch;\n              return fetch instanceof Function ? fetch(store) : Promise.resolve(null);\n            });\n            dataLoader = _ektp_src_routes__WEBPACK_IMPORTED_MODULE_7__[\"RouterConfigs\"][0].loadData;\n            console.log('-----------------------');\n            lf = dataLoader[0];\n            lf(store).catch(function (err) {\n              console.log(err);\n            });\n            console.log(lf(store));\n            _context.next = 10;\n            return Promise.all(promises).catch(function (err) {\n              console.log(err);\n            });\n\n          case 10:\n            // let isMatch = getMatch(router, ctx.req.url);\n            isMatch = true;\n\n            if (isMatch) {\n              _context.next = 16;\n              break;\n            }\n\n            _context.next = 14;\n            return next();\n\n          case 14:\n            _context.next = 20;\n            break;\n\n          case 16:\n            html = react_dom_server__WEBPACK_IMPORTED_MODULE_3___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_5__[\"Provider\"], {\n              store: store\n            }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"StaticRouter\"], {\n              location: ctx.url,\n              context: {}\n            }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ektp_src_routes__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null))));\n            initState = store.getState();\n            body = Object(_layout__WEBPACK_IMPORTED_MODULE_8__[\"layout\"])(html, initState);\n            ctx.body = body;\n\n          case 20:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function render(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(getMatch, \"getMatch\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\renders\\\\index.js\");\n  reactHotLoader.register(render, \"render\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\renders\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_server/renders/index.js?");

/***/ }),

/***/ "./ektp_server/renders/layout.js":
/*!***************************************!*\
  !*** ./ektp_server/renders/layout.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\r\n * content 上下文 data后期需要挂在的数据\r\n */\n//<link href=\"/static/css/main.css\" rel=\"stylesheet\">\n\nexports.layout = function (content, initState) {\n  return \"\\n  <!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n\\n<head>\\n    <meta charset=\\\"utf-8\\\">\\n    <meta name=\\\"viewport\\\" content=\\\"width=device-width,initial-scale=1,shrink-to-fit=no\\\">\\n    <meta name=\\\"theme-color\\\" content=\\\"#000000\\\">\\n    <link href=\\\"/main.css\\\" rel=\\\"stylesheet\\\">\\n    <title>Eckid Blooooooog</title>\\n</head>\\n\\n<body>\\n    <noscript>You need to enable JavaScript to run this app.</noscript>\\n    <div id=\\\"root\\\"> \".concat(content, \"</div>\\n    <script>window.__INITIAL_STATE__ =\").concat(JSON.stringify(initState), \"</script>\\n    <script type=\\\"text/javascript\\\" src=\\\"/babel-polyfill.[aaa].js\\\"></script>\\n    <script type=\\\"text/javascript\\\" src=\\\"/react.[aaa].js\\\"></script>\\n    <script type=\\\"text/javascript\\\" src=\\\"/react-dom.[aaa].js\\\"></script>\\n    <script type=\\\"text/javascript\\\" src=\\\"/vendor.[aaa].js\\\"></script>\\n    <script type=\\\"text/javascript\\\" src=\\\"/app.[aaa].js\\\"></script>\\n</body>\\n\\n</html>\\n\");\n};\n\n//# sourceURL=webpack:///./ektp_server/renders/layout.js?");

/***/ }),

/***/ "./ektp_server/renders/store.js":
/*!**************************************!*\
  !*** ./ektp_server/renders/store.js ***!
  \**************************************/
/*! exports provided: client, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"client\", function() { return client; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! connected-react-router */ \"connected-react-router\");\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(connected_react_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var history_createMemoryHistory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! history/createMemoryHistory */ \"history/createMemoryHistory\");\n/* harmony import */ var history_createMemoryHistory__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(history_createMemoryHistory__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _ektp_src_redux_modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ektp_src/redux/modules */ \"./ektp_src/redux/modules/index.js\");\n/* harmony import */ var _ektp_src_redux_ApiClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ektp_src/redux/ApiClient */ \"./ektp_src/redux/ApiClient.js\");\n/* harmony import */ var _ektp_src_redux_middleware_clientMiddleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ektp_src/redux/middleware/clientMiddleware */ \"./ektp_src/redux/middleware/clientMiddleware.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n // import { routerMiddleware } from 'react-router-redux';\n\n\n\n\n\n\nvar client = new _ektp_src_redux_ApiClient__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n\nvar getCreateStore = function getCreateStore(ctx) {\n  var initialState = {};\n  var path = ctx.req.url;\n  var history = history_createMemoryHistory__WEBPACK_IMPORTED_MODULE_2___default()({\n    initialEntries: [path]\n  });\n  var middleware = [Object(connected_react_router__WEBPACK_IMPORTED_MODULE_1__[\"routerMiddleware\"])(history), Object(_ektp_src_redux_middleware_clientMiddleware__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(client)];\n  var composedEnhancers = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"])(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"].apply(void 0, middleware));\n  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(Object(_ektp_src_redux_modules__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(history), initialState, composedEnhancers);\n  return {\n    history: history,\n    store: store\n  };\n};\n\nvar _default = getCreateStore;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(client, \"client\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\renders\\\\store.js\");\n  reactHotLoader.register(getCreateStore, \"getCreateStore\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\renders\\\\store.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\renders\\\\store.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_server/renders/store.js?");

/***/ }),

/***/ "./ektp_server/routes/index.js":
/*!*************************************!*\
  !*** ./ektp_server/routes/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\nvar _require = __webpack_require__(/*! ../renders */ \"./ektp_server/renders/index.js\"),\n    render = _require.render;\n\nvar router = __webpack_require__(/*! koa-router */ \"koa-router\")();\n\nrouter.get('/main/*', render);\nmodule.exports = router;\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(router, \"router\", \"T:\\\\koa-react-blog\\\\ektp_server\\\\routes\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_server/routes/index.js?");

/***/ }),

/***/ "./ektp_src/redux/ApiClient.js":
/*!*************************************!*\
  !*** ./ektp_src/redux/ApiClient.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"@babel/runtime/helpers/objectSpread\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"@babel/runtime/helpers/typeof\");\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! superagent */ \"superagent\");\n/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\nvar methods = ['get', 'post', 'put', 'patch', 'del'];\nvar apiPrefix = '/api/v1';\n\nfunction formatUrl(path) {\n  var adjustedPath = '';\n\n  if (/^\\/static\\/*/.test(path)) {\n    adjustedPath = path;\n  } else {\n    adjustedPath = path[0] !== '/' ? \"\".concat(apiPrefix, \"/\").concat(path) : apiPrefix + path;\n  }\n\n  return adjustedPath;\n}\n\nvar _ApiClient =\n/*#__PURE__*/\nfunction () {\n  function _ApiClient(req) {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, _ApiClient);\n\n    var isWindow = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(global.window) === 'object' ? true : false;\n\n    if (!isWindow) {\n      methods.forEach(function (method) {\n        return _this[method] = function (path) {\n          var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n              params = _ref.params,\n              data = _ref.data,\n              headers = _ref.headers,\n              resType = _ref.resType;\n\n          return new Promise(function (resolve, reject) {\n            resolve([{\n              title: 'aaaaaaaaaaaaaaaaaaaa'\n            }]);\n          });\n        };\n      });\n    } else {\n      methods.forEach(function (method) {\n        return _this[method] = function (path) {\n          var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n              params = _ref2.params,\n              data = _ref2.data,\n              headers = _ref2.headers,\n              resType = _ref2.resType;\n\n          return new Promise(function (resolve, reject) {\n            var request = superagent__WEBPACK_IMPORTED_MODULE_4___default.a[method](formatUrl(path));\n            request.set('Accept', 'application/json'); // update superagent, support 'blob' responseType, then we can use Apiclient download pictures or reports\n\n            if (resType) {\n              request.responseType(resType);\n            }\n\n            if (params) {\n              request.query(params);\n            } // custom header fields\n\n\n            if (headers) {\n              request.set(headers);\n            }\n\n            if (data) {\n              request.send(data);\n            }\n\n            request.end(function (err, res) {\n              if (err) {\n                if (resType === 'blob') {\n                  var reader = new FileReader();\n\n                  reader.onloadend = function () {\n                    var newRes = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, res, {\n                      body: JSON.parse(reader.result)\n                    });\n\n                    reject(newRes || err);\n                  };\n\n                  reader.readAsText(res.body);\n                } else {\n                  reject(res || err);\n                }\n              } else if (res.body) {\n                if (resType && resType === 'blob') {\n                  resolve(res);\n                } else {\n                  resolve(res.body);\n                }\n              } else {\n                resolve(res.xhr);\n              }\n            });\n          });\n        };\n      });\n    }\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(_ApiClient, [{\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return _ApiClient;\n}();\n\nvar ApiClient = _ApiClient;\nvar _default = ApiClient;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(methods, \"methods\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(apiPrefix, \"apiPrefix\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(formatUrl, \"formatUrl\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(_ApiClient, \"_ApiClient\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(ApiClient, \"ApiClient\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/redux/ApiClient.js?");

/***/ }),

/***/ "./ektp_src/redux/middleware/clientMiddleware.js":
/*!*******************************************************!*\
  !*** ./ektp_src/redux/middleware/clientMiddleware.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return clientMiddleware; });\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"@babel/runtime/helpers/objectSpread\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"@babel/runtime/helpers/slicedToArray\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"@babel/runtime/helpers/objectWithoutProperties\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! connected-react-router */ \"connected-react-router\");\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(connected_react_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\nfunction clientMiddleware(client) {\n  return function (_ref) {\n    var dispatch = _ref.dispatch,\n        getState = _ref.getState;\n    return function (next) {\n      return function (action) {\n        if (typeof action === 'function') {\n          return action(dispatch, getState);\n        }\n\n        var promise = action.promise,\n            types = action.types,\n            rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(action, [\"promise\", \"types\"]); // eslint-disable-line no-redeclare\n\n\n        if (!promise) {\n          return next(action);\n        }\n\n        var _types = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(types, 4),\n            REQUEST = _types[0],\n            SUCCESS = _types[1],\n            FAILURE = _types[2],\n            PARAMS_ERROR = _types[3];\n\n        var PARAMS_ERROR_TYPE = '';\n\n        if (PARAMS_ERROR === undefined) {\n          PARAMS_ERROR_TYPE = FAILURE;\n        } else {\n          PARAMS_ERROR_TYPE = PARAMS_ERROR;\n        }\n\n        next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {\n          type: REQUEST\n        }));\n        var actionPromise = promise(client);\n        actionPromise.then(function (result) {\n          next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {\n            statusCode: 200,\n            result: result,\n            type: SUCCESS\n          }));\n        }, function (res) {\n          var error = res.body;\n          var statusCode = res.statusCode;\n\n          switch (statusCode) {\n            case 400:\n              next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {\n                error: error,\n                statusCode: statusCode,\n                type: PARAMS_ERROR_TYPE\n              }));\n              break;\n\n            case 401:\n              break;\n\n            case 403:\n              break;\n\n            case 500:\n              next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {\n                error: error,\n                statusCode: statusCode,\n                type: FAILURE\n              }));\n              break;\n\n            case 501:\n              next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {\n                result: error.response,\n                statusCode: statusCode,\n                type: SUCCESS\n              }));\n              break;\n\n            default:\n              next(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {\n                res: res,\n                statusCode: statusCode,\n                type: FAILURE\n              }));\n              break;\n          }\n        });\n        return actionPromise;\n      };\n    };\n  };\n}\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(clientMiddleware, \"clientMiddleware\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\middleware\\\\clientMiddleware.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/redux/middleware/clientMiddleware.js?");

/***/ }),

/***/ "./ektp_src/redux/modules/index.js":
/*!*****************************************!*\
  !*** ./ektp_src/redux/modules/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"@babel/runtime/helpers/objectSpread\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! connected-react-router */ \"connected-react-router\");\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(connected_react_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! routes */ \"./ektp_src/routes/index.js\");\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\nvar initState = {\n  name: 'eckid'\n};\n\nfunction todos() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case 'ADD_TODO':\n      return state.concat([action.text]);\n\n    default:\n      return state;\n  }\n}\n\nvar _default = function _default(history) {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_1__[\"combineReducers\"])(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({\n    router: Object(connected_react_router__WEBPACK_IMPORTED_MODULE_2__[\"connectRouter\"])(history)\n  }, routes__WEBPACK_IMPORTED_MODULE_3__[\"rootReducer\"], {\n    auth: todos\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(initState, \"initState\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\modules\\\\index.js\");\n  reactHotLoader.register(todos, \"todos\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\modules\\\\index.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\modules\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/redux/modules/index.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/components/PageAComponent.js":
/*!************************************************************!*\
  !*** ./ektp_src/routes/PageA/components/PageAComponent.js ***!
  \************************************************************/
/*! exports provided: pageAReducer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageAReducer\", function() { return pageAReducer; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"@babel/runtime/helpers/possibleConstructorReturn\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"@babel/runtime/helpers/getPrototypeOf\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"@babel/runtime/helpers/inherits\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\nvar pageAReducer = {};\n\nvar PageAComponent =\n/*#__PURE__*/\nfunction (_Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(PageAComponent, _Component);\n\n  function PageAComponent() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PageAComponent);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(PageAComponent).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PageAComponent, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var loadPost = this.props.loadPost;\n      loadPost();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          name = _this$props.name,\n          history = _this$props.history,\n          posts = _this$props.posts;\n      var postLists = posts.map(function (item) {\n        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", null, \"title: \", item.title);\n      });\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", null, \"pageA is powered by \", name, postLists, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        onClick: function onClick() {\n          return history.push('/main/rootB');\n        }\n      }, \"go to B\"));\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return PageAComponent;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\nvar _default = PageAComponent;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(pageAReducer, \"pageAReducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\components\\\\PageAComponent.js\");\n  reactHotLoader.register(PageAComponent, \"PageAComponent\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\components\\\\PageAComponent.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\components\\\\PageAComponent.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/components/PageAComponent.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/containers/PageAContainer.js":
/*!************************************************************!*\
  !*** ./ektp_src/routes/PageA/containers/PageAContainer.js ***!
  \************************************************************/
/*! exports provided: initLoader, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLoader\", function() { return initLoader; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_PageAComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/PageAComponent */ \"./ektp_src/routes/PageA/components/PageAComponent.js\");\n/* harmony import */ var _modules_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/actions */ \"./ektp_src/routes/PageA/modules/actions.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\n\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    posts: state.PageA.posts\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"bindActionCreators\"])({\n    loadPost: _modules_actions__WEBPACK_IMPORTED_MODULE_4__[\"loadPost\"]\n  }, dispatch);\n};\n\nvar initLoader = [function (store) {\n  return store.dispatch(Object(_modules_actions__WEBPACK_IMPORTED_MODULE_4__[\"loadPost\"])());\n}];\n\nvar _default = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"])(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"withRouter\"], Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps))(_components_PageAComponent__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(mapStateToProps, \"mapStateToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\containers\\\\PageAContainer.js\");\n  reactHotLoader.register(mapDispatchToProps, \"mapDispatchToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\containers\\\\PageAContainer.js\");\n  reactHotLoader.register(initLoader, \"initLoader\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\containers\\\\PageAContainer.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\containers\\\\PageAContainer.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/containers/PageAContainer.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/index.js":
/*!****************************************!*\
  !*** ./ektp_src/routes/PageA/index.js ***!
  \****************************************/
/*! exports provided: pageAReducer, PageAinitLoader, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageAReducer\", function() { return pageAReducer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PageAinitLoader\", function() { return PageAinitLoader; });\n/* harmony import */ var _containers_PageAContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers/PageAContainer */ \"./ektp_src/routes/PageA/containers/PageAContainer.js\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules */ \"./ektp_src/routes/PageA/modules/index.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\nvar pageAReducer = {\n  PageA: _modules__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n};\nvar PageAinitLoader = _containers_PageAContainer__WEBPACK_IMPORTED_MODULE_0__[\"initLoader\"];\nvar _default = _containers_PageAContainer__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(pageAReducer, \"pageAReducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n  reactHotLoader.register(PageAinitLoader, \"PageAinitLoader\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/index.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/modules/actions.js":
/*!**************************************************!*\
  !*** ./ektp_src/routes/PageA/modules/actions.js ***!
  \**************************************************/
/*! exports provided: loadPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadPost\", function() { return loadPost; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./ektp_src/routes/PageA/modules/constants.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\nfunction loadPost() {\n  return function (dispatch) {\n    return dispatch({\n      types: [_constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD_SUCCESS, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD_FAILED],\n      promise: function promise(client) {\n        return client.get('/posts/');\n      }\n    });\n  };\n}\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(loadPost, \"loadPost\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\actions.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/modules/actions.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/modules/constants.js":
/*!****************************************************!*\
  !*** ./ektp_src/routes/PageA/modules/constants.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var keymirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! keymirror */ \"keymirror\");\n/* harmony import */ var keymirror__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(keymirror__WEBPACK_IMPORTED_MODULE_0__);\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\nvar _default = keymirror__WEBPACK_IMPORTED_MODULE_0___default()({\n  POSTS_LOAD: null,\n  POSTS_LOAD_SUCCESS: null,\n  POSTS_LOAD_FAILED: null\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\constants.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/modules/constants.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/modules/index.js":
/*!************************************************!*\
  !*** ./ektp_src/routes/PageA/modules/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return reducer; });\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"@babel/runtime/helpers/objectSpread\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./ektp_src/routes/PageA/modules/constants.js\");\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\nvar initialState = {\n  posts: []\n};\nfunction reducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].POSTS_LOAD_SUCCESS:\n      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {\n        posts: action.result\n      });\n\n    default:\n      return state;\n  }\n}\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(initialState, \"initialState\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\index.js\");\n  reactHotLoader.register(reducer, \"reducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/modules/index.js?");

/***/ }),

/***/ "./ektp_src/routes/PageB/index.js":
/*!****************************************!*\
  !*** ./ektp_src/routes/PageB/index.js ***!
  \****************************************/
/*! exports provided: pageBReducer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageBReducer\", function() { return pageBReducer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\n\n\n\n\n\nvar pageBReducer = {};\n\nvar PageBComponent = function PageBComponent(props) {\n  var name = props.name,\n      history = props.history;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"page B is powered by \", name);\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    name: state.auth.name\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_2__[\"bindActionCreators\"])({}, dispatch);\n};\n\nvar PageBContainer = Object(redux__WEBPACK_IMPORTED_MODULE_2__[\"compose\"])(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"withRouter\"], Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(mapStateToProps, mapDispatchToProps))(PageBComponent);\nvar _default = PageBContainer;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(pageBReducer, \"pageBReducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageB\\\\index.js\");\n  reactHotLoader.register(PageBComponent, \"PageBComponent\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageB\\\\index.js\");\n  reactHotLoader.register(mapStateToProps, \"mapStateToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageB\\\\index.js\");\n  reactHotLoader.register(mapDispatchToProps, \"mapDispatchToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageB\\\\index.js\");\n  reactHotLoader.register(PageBContainer, \"PageBContainer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageB\\\\index.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageB\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageB/index.js?");

/***/ }),

/***/ "./ektp_src/routes/index.js":
/*!**********************************!*\
  !*** ./ektp_src/routes/index.js ***!
  \**********************************/
/*! exports provided: rootReducer, RouterConfigs, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rootReducer\", function() { return rootReducer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RouterConfigs\", function() { return RouterConfigs; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"@babel/runtime/helpers/possibleConstructorReturn\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"@babel/runtime/helpers/getPrototypeOf\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"@babel/runtime/helpers/inherits\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"@babel/runtime/helpers/objectSpread\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _PageA__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./PageA */ \"./ektp_src/routes/PageA/index.js\");\n/* harmony import */ var _PageB__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PageB */ \"./ektp_src/routes/PageB/index.js\");\n\n\n\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\n\n\n\n\n\n\nvar rootReducer = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5___default()({}, _PageA__WEBPACK_IMPORTED_MODULE_12__[\"pageAReducer\"], _PageB__WEBPACK_IMPORTED_MODULE_13__[\"pageBReducer\"]);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    name: state.auth.name\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_8__[\"bindActionCreators\"])({}, dispatch);\n};\n\nvar renderRoutes = function renderRoutes(routes) {\n  var ret = [];\n  routes.forEach(function (routeConfig, index) {\n    ret.push(react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__[\"Route\"], {\n      key: index.toString(),\n      path: routeConfig.path,\n      component: routeConfig.component\n    }));\n  });\n  return ret;\n}; // 我想routerConfigs也可以向上级传递\n\n\nvar RouterConfigs = [{\n  path: '/main/rootA',\n  component: _PageA__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  loadData: _PageA__WEBPACK_IMPORTED_MODULE_12__[\"PageAinitLoader\"],\n  routes: []\n}, {\n  path: '/main/rootB',\n  component: _PageB__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  loadData: null,\n  routes: []\n}];\n\nvar ApplicationContainer =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ApplicationContainer, _React$Component);\n\n  function ApplicationContainer() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApplicationContainer);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ApplicationContainer).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApplicationContainer, [{\n    key: \"render\",\n    value: function render() {\n      var routeCom = renderRoutes(RouterConfigs);\n      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__[\"Switch\"], null, routeCom);\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return ApplicationContainer;\n}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);\n\nApplicationContainer.propTypes = {\n  language: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string\n};\n\nvar _default = Object(redux__WEBPACK_IMPORTED_MODULE_8__[\"compose\"])(Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_9__[\"hot\"])(module), react_router_dom__WEBPACK_IMPORTED_MODULE_11__[\"withRouter\"], Object(react_redux__WEBPACK_IMPORTED_MODULE_10__[\"connect\"])(mapStateToProps, mapDispatchToProps))(ApplicationContainer);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(rootReducer, \"rootReducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(mapStateToProps, \"mapStateToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(mapDispatchToProps, \"mapDispatchToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(renderRoutes, \"renderRoutes\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(RouterConfigs, \"RouterConfigs\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(ApplicationContainer, \"ApplicationContainer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"react-hot-loader\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ 0:
/*!********************************************************************!*\
  !*** multi @babel/polyfill react react-dom ./ektp_server/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @babel/polyfill */\"@babel/polyfill\");\n__webpack_require__(/*! react */\"react\");\n__webpack_require__(/*! react-dom */\"react-dom\");\nmodule.exports = __webpack_require__(/*! T:\\koa-react-blog\\ektp_server\\index.js */\"./ektp_server/index.js\");\n\n\n//# sourceURL=webpack:///multi_@babel/polyfill_react_react-dom_./ektp_server/index.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "@babel/register":
/*!**********************************!*\
  !*** external "@babel/register" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/register\");\n\n//# sourceURL=webpack:///external_%22@babel/register%22?");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/asyncToGenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/asyncToGenerator%22?");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/classCallCheck\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/classCallCheck%22?");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/createClass\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/createClass%22?");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/getPrototypeOf\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/getPrototypeOf%22?");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/inherits\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/inherits%22?");

/***/ }),

/***/ "@babel/runtime/helpers/objectSpread":
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/objectSpread" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/objectSpread\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/objectSpread%22?");

/***/ }),

/***/ "@babel/runtime/helpers/objectWithoutProperties":
/*!*****************************************************************!*\
  !*** external "@babel/runtime/helpers/objectWithoutProperties" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/objectWithoutProperties\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/objectWithoutProperties%22?");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/possibleConstructorReturn\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/possibleConstructorReturn%22?");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/slicedToArray\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/slicedToArray%22?");

/***/ }),

/***/ "@babel/runtime/helpers/typeof":
/*!************************************************!*\
  !*** external "@babel/runtime/helpers/typeof" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/typeof\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/typeof%22?");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/regenerator\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/regenerator%22?");

/***/ }),

/***/ "connected-react-router":
/*!*****************************************!*\
  !*** external "connected-react-router" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connected-react-router\");\n\n//# sourceURL=webpack:///external_%22connected-react-router%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "history/createMemoryHistory":
/*!**********************************************!*\
  !*** external "history/createMemoryHistory" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"history/createMemoryHistory\");\n\n//# sourceURL=webpack:///external_%22history/createMemoryHistory%22?");

/***/ }),

/***/ "keymirror":
/*!****************************!*\
  !*** external "keymirror" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"keymirror\");\n\n//# sourceURL=webpack:///external_%22keymirror%22?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");\n\n//# sourceURL=webpack:///external_%22koa-router%22?");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");\n\n//# sourceURL=webpack:///external_%22koa-static%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"prop-types\");\n\n//# sourceURL=webpack:///external_%22prop-types%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");\n\n//# sourceURL=webpack:///external_%22react-dom%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-hot-loader":
/*!***********************************!*\
  !*** external "react-hot-loader" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-hot-loader\");\n\n//# sourceURL=webpack:///external_%22react-hot-loader%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-config\");\n\n//# sourceURL=webpack:///external_%22react-router-config%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "superagent":
/*!*****************************!*\
  !*** external "superagent" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"superagent\");\n\n//# sourceURL=webpack:///external_%22superagent%22?");

/***/ })

/******/ });