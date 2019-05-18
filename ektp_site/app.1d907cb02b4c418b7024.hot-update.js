webpackHotUpdate("app",{

/***/ "./ektp_src/routes/index.js":
/*!**********************************!*\
  !*** ./ektp_src/routes/index.js ***!
  \**********************************/
/*! exports provided: rootReducer, RouterConfigs, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rootReducer\", function() { return rootReducer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RouterConfigs\", function() { return RouterConfigs; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _PageA__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PageA */ \"./ektp_src/routes/PageA/index.js\");\n/* harmony import */ var _PageB__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./PageB */ \"./ektp_src/routes/PageB/index.js\");\n\n\n\n\n\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n// require('theme/antd.overrides.less');\n// require('theme/iconfont.less');\n\n\n\n\n\n\n\n\n\n\nvar rootReducer = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5___default()({}, _PageA__WEBPACK_IMPORTED_MODULE_13__[\"pageAReducer\"], _PageB__WEBPACK_IMPORTED_MODULE_14__[\"pageBReducer\"]);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    name: state.auth.name\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_8__[\"bindActionCreators\"])({}, dispatch);\n};\n\nvar renderRoutes = function renderRoutes(routes) {\n  var ret = [];\n  routes.forEach(function (routeConfig, index) {\n    ret.push(react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_12__[\"Route\"], {\n      key: index.toString(),\n      path: routeConfig.path,\n      component: routeConfig.component\n    }));\n  });\n  return ret;\n}; // 我想routerConfigs也可以向上级传递\n\n\nvar RouterConfigs = [{\n  path: '/main/rootA',\n  component: _PageA__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  loadData: null,\n  routes: []\n}, {\n  path: '/main/rootB',\n  component: _PageB__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n  loadData: null,\n  routes: []\n}];\n\nvar ApplicationContainer =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ApplicationContainer, _React$Component);\n\n  function ApplicationContainer() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApplicationContainer);\n\n    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ApplicationContainer).apply(this, arguments));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApplicationContainer, [{\n    key: \"render\",\n    value: function render() {\n      var routeCom = renderRoutes(RouterConfigs);\n      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_12__[\"Switch\"], null, routeCom, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_12__[\"Redirect\"], {\n        to: _PageB__WEBPACK_IMPORTED_MODULE_14__[\"default\"]\n      }));\n    }\n  }, {\n    key: \"__reactstandin__regenerateByEval\",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return ApplicationContainer;\n}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);\n\nApplicationContainer.propTypes = {\n  language: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string\n};\n\nvar _default = Object(redux__WEBPACK_IMPORTED_MODULE_8__[\"compose\"])(Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_9__[\"hot\"])(module), react_router_dom__WEBPACK_IMPORTED_MODULE_12__[\"withRouter\"], // asyncProvider({\n//   async: ({ state, params }) => {\n//     let actionParams = {};\n//     const { user } = state.auth;\n//     if (isEmpty(user)) {\n//       actionParams = {\n//       };\n//     }\n//     return actionParams;\n//   },\n//   mapActions: {\n//   }\n// }),\nObject(react_redux__WEBPACK_IMPORTED_MODULE_10__[\"connect\"])(mapStateToProps, mapDispatchToProps))(ApplicationContainer);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(rootReducer, \"rootReducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(mapStateToProps, \"mapStateToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(mapDispatchToProps, \"mapDispatchToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(renderRoutes, \"renderRoutes\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(RouterConfigs, \"RouterConfigs\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(ApplicationContainer, \"ApplicationContainer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/index.js?");

/***/ })

})