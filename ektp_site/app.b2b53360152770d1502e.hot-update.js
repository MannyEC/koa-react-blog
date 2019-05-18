webpackHotUpdate("app",{

/***/ "./ektp_src/redux/ApiClient.js":
/*!*************************************!*\
  !*** ./ektp_src/redux/ApiClient.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module, global) {/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! superagent */ \"./node_modules/superagent/lib/client.js\");\n/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\nvar methods = ['get', 'post', 'put', 'patch', 'del'];\nvar apiPrefix = '/api/v1';\n\nfunction formatUrl(path) {\n  var adjustedPath = '';\n\n  if (/^\\/static\\/*/.test(path)) {\n    adjustedPath = path;\n  } else {\n    adjustedPath = path[0] !== '/' ? \"\".concat(apiPrefix, \"/\").concat(path) : apiPrefix + path;\n  }\n\n  return adjustedPath;\n}\n\nvar _ApiClient =\n/*#__PURE__*/\nfunction () {\n  function _ApiClient(req) {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, _ApiClient);\n\n    console.log(global);\n    methods.forEach(function (method) {\n      return _this[method] = function (path) {\n        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n            params = _ref.params,\n            data = _ref.data,\n            headers = _ref.headers,\n            resType = _ref.resType;\n\n        return new Promise(function (resolve, reject) {\n          var request = superagent__WEBPACK_IMPORTED_MODULE_3___default.a[method](formatUrl(path));\n          request.set('Accept', 'application/json'); // update superagent, support 'blob' responseType, then we can use Apiclient download pictures or reports\n\n          if (resType) {\n            request.responseType(resType);\n          }\n\n          if (params) {\n            request.query(params);\n          } // custom header fields\n\n\n          if (headers) {\n            request.set(headers);\n          }\n\n          if (data) {\n            request.send(data);\n          }\n\n          request.end(function (err, res) {\n            if (err) {\n              if (resType === 'blob') {\n                var reader = new FileReader();\n\n                reader.onloadend = function () {\n                  var newRes = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, res, {\n                    body: JSON.parse(reader.result)\n                  });\n\n                  reject(newRes || err);\n                };\n\n                reader.readAsText(res.body);\n              } else {\n                reject(res || err);\n              }\n            } else if (res.body) {\n              if (resType && resType === 'blob') {\n                resolve(res);\n              } else {\n                resolve(res.body);\n              }\n            } else {\n              resolve(res.xhr);\n            }\n          });\n        });\n      };\n    });\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(_ApiClient, [{\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return _ApiClient;\n}();\n\nvar ApiClient = _ApiClient;\nvar _default = ApiClient;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(methods, \"methods\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(apiPrefix, \"apiPrefix\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(formatUrl, \"formatUrl\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(_ApiClient, \"_ApiClient\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(ApiClient, \"ApiClient\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\ApiClient.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module), __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./ektp_src/redux/ApiClient.js?");

/***/ })

})