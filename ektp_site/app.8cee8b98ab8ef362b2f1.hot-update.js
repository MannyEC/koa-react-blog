webpackHotUpdate("app",{

/***/ "./ektp_src/redux/modules/index.js":
/*!*****************************************!*\
  !*** ./ektp_src/redux/modules/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! connected-react-router */ \"./node_modules/connected-react-router/esm/index.js\");\n/* harmony import */ var routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! routes */ \"./ektp_src/routes/index.js\");\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\nvar initState = {\n  name: 'eckid'\n};\n\nfunction todos() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case 'ADD_TODO':\n      return state.concat([action.text]);\n\n    default:\n      return state;\n  }\n}\n\nvar _default = function _default(history) {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_1__[\"combineReducers\"])(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({\n    router: Object(connected_react_router__WEBPACK_IMPORTED_MODULE_2__[\"connectRouter\"])(history)\n  }, routes__WEBPACK_IMPORTED_MODULE_3__[\"rootReducer\"], {\n    auth: todos // SimpleForm,\n    // Loading,\n    // GlobalTips,\n    // UiMessage,\n    // GlobalScopeTree,\n    // License,\n\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(initState, \"initState\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\modules\\\\index.js\");\n  reactHotLoader.register(todos, \"todos\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\modules\\\\index.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\redux\\\\modules\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/redux/modules/index.js?");

/***/ })

})