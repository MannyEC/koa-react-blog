webpackHotUpdate("app",{

/***/ "./ektp_src/routes/PageA/components/PageAComponent.js":
/*!************************************************************!*\
  !*** ./ektp_src/routes/PageA/components/PageAComponent.js ***!
  \************************************************************/
/*! exports provided: pageAReducer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageAReducer\", function() { return pageAReducer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\");\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\n\n\n\n\n\nvar pageAReducer = {};\n\nvar PageAComponent = function PageAComponent(props) {\n  var name = props.name,\n      history = props.history;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"pageA is powered by \", name, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    onClick: function onClick() {\n      return history.push('/main/rootB');\n    }\n  }, \"go to B\"));\n};\n\nvar _default = PageAComponent;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(pageAReducer, \"pageAReducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\components\\\\PageAComponent.js\");\n  reactHotLoader.register(PageAComponent, \"PageAComponent\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\components\\\\PageAComponent.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\components\\\\PageAComponent.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/components/PageAComponent.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/containers/PageAContainer.js":
/*!************************************************************!*\
  !*** ./ektp_src/routes/PageA/containers/PageAContainer.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! connected-react-router */ \"./node_modules/connected-react-router/esm/index.js\");\n/* harmony import */ var _components_PageAComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PageAComponent */ \"./ektp_src/routes/PageA/components/PageAComponent.js\");\n/* harmony import */ var _modules_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/actions */ \"./ektp_src/routes/PageA/modules/actions.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\n\n\n\n\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    loading: state.PageA.loading\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"bindActionCreators\"])({\n    pushState: connected_react_router__WEBPACK_IMPORTED_MODULE_3__[\"push\"],\n    loadPost: _modules_actions__WEBPACK_IMPORTED_MODULE_5__[\"loadPost\"]\n  }, dispatch);\n};\n\nvar _default = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"])(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"withRouter\"], // asyncProvider({\n//   async: ({\n//     dispatch,\n//   }) => {\n//     const promises = [];\n//     return Promise.all(promises);\n//   }\n// }),\nObject(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps))(_components_PageAComponent__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(mapStateToProps, \"mapStateToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\containers\\\\PageAContainer.js\");\n  reactHotLoader.register(mapDispatchToProps, \"mapDispatchToProps\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\containers\\\\PageAContainer.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\containers\\\\PageAContainer.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/containers/PageAContainer.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/index.js":
/*!****************************************!*\
  !*** ./ektp_src/routes/PageA/index.js ***!
  \****************************************/
/*! exports provided: pageAReducer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageAReducer\", function() { return pageAReducer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _containers_PageAContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./containers/PageAContainer */ \"./ektp_src/routes/PageA/containers/PageAContainer.js\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules */ \"./ektp_src/routes/PageA/modules/index.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n// import React from 'react';\n// import PropTypes from 'prop-types';\n// import { compose, bindActionCreators } from 'redux';\n// import { hot } from 'react-hot-loader';\n// import { connect } from 'react-redux';\n// import { isEmpty, isEqual } from 'lodash';\n// import { withRouter } from 'react-router-dom';\n// import { Route, Switch, Redirect } from 'react-router-dom';\n// export const pageAReducer = {\n// };\n// const PageAComponent = (props) => {\n//   const { name, history } = props;\n//   return (\n//     <div>\n//       pageA is powered by {name}\n//       <div onClick={() => history.push('/main/rootB')}>go to B</div>\n//     </div>\n//   );\n// };\n// const mapStateToProps = state => ({\n//   name: state.auth.name,\n// });\n// const mapDispatchToProps = dispatch =>\n//   bindActionCreators(\n//     {},\n//     dispatch\n//   );\n// const PageAContainer = compose(\n//   withRouter,\n//   connect(mapStateToProps, mapDispatchToProps)\n// )(PageAComponent);\n// export default PageAContainer;\n\n\n\nvar pageAReducer = {\n  PageA: _modules__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n};\nvar _default = _containers_PageAContainer__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(pageAReducer, \"pageAReducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/index.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/modules/actions.js":
/*!**************************************************!*\
  !*** ./ektp_src/routes/PageA/modules/actions.js ***!
  \**************************************************/
/*! exports provided: loadPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadPost\", function() { return loadPost; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./ektp_src/routes/PageA/modules/constants.js\");\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\nfunction loadPost() {\n  return function (dispatch) {\n    return dispatch({\n      types: [_constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD_SUCCESS, _constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].POSTS_LOAD_FAILED],\n      promise: function promise(client) {\n        return client.get('/node/main/');\n      }\n    });\n  };\n}\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(loadPost, \"loadPost\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\actions.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/modules/actions.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/modules/constants.js":
/*!****************************************************!*\
  !*** ./ektp_src/routes/PageA/modules/constants.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var keymirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! keymirror */ \"./node_modules/keymirror/index.js\");\n/* harmony import */ var keymirror__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(keymirror__WEBPACK_IMPORTED_MODULE_0__);\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\n\nvar _default = keymirror__WEBPACK_IMPORTED_MODULE_0___default()({\n  POSTS_LOAD: null,\n  POSTS_LOAD_SUCCESS: null,\n  POSTS_LOAD_FAILED: null\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\constants.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/modules/constants.js?");

/***/ }),

/***/ "./ektp_src/routes/PageA/modules/index.js":
/*!************************************************!*\
  !*** ./ektp_src/routes/PageA/modules/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return reducer; });\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./ektp_src/routes/PageA/modules/constants.js\");\n\n\n(function () {\n  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n  enterModule && enterModule(module);\n})();\n\n\nvar initialState = {\n  posts: []\n};\nfunction reducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"].POSTS_LOAD_SUCCESS:\n      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {\n        posts: action.result\n      });\n\n    default:\n      return state;\n  }\n}\n;\n\n(function () {\n  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(initialState, \"initialState\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\index.js\");\n  reactHotLoader.register(reducer, \"reducer\", \"T:\\\\koa-react-blog\\\\ektp_src\\\\routes\\\\PageA\\\\modules\\\\index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./ektp_src/routes/PageA/modules/index.js?");

/***/ }),

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