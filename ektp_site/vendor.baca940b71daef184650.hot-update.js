webpackHotUpdate("vendor",{

/***/ "./node_modules/keymirror/index.js":
/*!*****************************************!*\
  !*** ./node_modules/keymirror/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright 2013-2014 Facebook, Inc.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n *\n */\n\n\n\n/**\n * Constructs an enumeration with keys equal to their value.\n *\n * For example:\n *\n *   var COLORS = keyMirror({blue: null, red: null});\n *   var myColor = COLORS.blue;\n *   var isColorValid = !!COLORS[myColor];\n *\n * The last line could not be performed if the values of the generated enum were\n * not equal to their keys.\n *\n *   Input:  {key1: val1, key2: val2}\n *   Output: {key1: key1, key2: key2}\n *\n * @param {object} obj\n * @return {object}\n */\nvar keyMirror = function(obj) {\n  var ret = {};\n  var key;\n  if (!(obj instanceof Object && !Array.isArray(obj))) {\n    throw new Error('keyMirror(...): Argument must be an object.');\n  }\n  for (key in obj) {\n    if (!obj.hasOwnProperty(key)) {\n      continue;\n    }\n    ret[key] = key;\n  }\n  return ret;\n};\n\nmodule.exports = keyMirror;\n\n\n//# sourceURL=webpack:///./node_modules/keymirror/index.js?");

/***/ })

})