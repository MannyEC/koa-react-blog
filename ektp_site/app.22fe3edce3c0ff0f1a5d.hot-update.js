webpackHotUpdate("app",{

/***/ "./ektp_src/routes/PageA/index.js":
/*!****************************************!*\
  !*** ./ektp_src/routes/PageA/index.js ***!
  \****************************************/
/*! exports provided: pageAReducer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageAReducer\", function() { return pageAReducer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\n\n\n\n\n\nvar pageAReducer = {};\n\nvar PageAComponent = function PageAComponent(props) {\n  var name = props.name,\n      history = props.history;\n  console.log(props);\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"pageA is powered by \", name, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: function onClick() {\n      console.log('ckickekekekek');\n    }\n  }, \"btn\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: function onClick() {\n      console.log(22222222);\n      history.push('/rootB');\n    }\n  }, \"go to B\"));\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    name: state.auth.name\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_2__[\"bindActionCreators\"])({}, dispatch);\n};\n\nvar PageAContainer = Object(redux__WEBPACK_IMPORTED_MODULE_2__[\"compose\"])(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"withRouter\"], Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"connect\"])(mapStateToProps, mapDispatchToProps))(PageAComponent);\nvar _default = PageAContainer;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(pageAReducer, \"pageAReducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n  reactHotLoader.register(PageAComponent, \"PageAComponent\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n  reactHotLoader.register(mapStateToProps, \"mapStateToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n  reactHotLoader.register(mapDispatchToProps, \"mapDispatchToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n  reactHotLoader.register(PageAContainer, \"PageAContainer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/index.js?");

/***/ })

})