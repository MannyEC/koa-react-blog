webpackHotUpdate("app",{

/***/ "./ektp_src/routes/PageA/modules/actions.js":
/*!**************************************************!*\
  !*** ./ektp_src/routes/PageA/modules/actions.js ***!
  \**************************************************/
/*! exports provided: loadPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadPost\", function() { return loadPost; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./ektp_src/routes/PageA/modules/constants.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\nfunction loadPost() {\n  return function (dispatch) {\n    return dispatch({\n      types: [_constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD_SUCCESS, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD_FAILED],\n      promise: function promise(client) {\n        return client.get('/posts/');\n      }\n    });\n  };\n}\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(loadPost, \"loadPost\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\actions.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/modules/actions.js?");

/***/ })

})