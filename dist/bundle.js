module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("atom");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase_app = __webpack_require__(32);

// Export a single instance of firebase app
var firebase = (0, _firebase_app.createFirebaseNamespace)(); /**
                                                             * Copyright 2017 Google Inc.
                                                             *
                                                             * Licensed under the Apache License, Version 2.0 (the "License");
                                                             * you may not use this file except in compliance with the License.
                                                             * You may obtain a copy of the License at
                                                             *
                                                             *   http://www.apache.org/licenses/LICENSE-2.0
                                                             *
                                                             * Unless required by applicable law or agreed to in writing, software
                                                             * distributed under the License is distributed on an "AS IS" BASIS,
                                                             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                             * See the License for the specific language governing permissions and
                                                             * limitations under the License.
                                                             */
// Import the createFirebaseNamespace function
exports.default = firebase;
module.exports = exports['default'];
//# sourceMappingURL=app.js.map


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const dom = __webpack_require__(38)
const render = __webpack_require__(7)
const {initialize, update, updateSync, destroy, destroySync} = __webpack_require__(40)
const {setScheduler, getScheduler} = __webpack_require__(14)

module.exports = {
  dom, render,
  initialize, update, updateSync, destroy, destroySync,
  setScheduler, getScheduler
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postConversation = exports.getSiteUrl = exports.repoIdForPath = exports.fbKeyDecode = exports.fbKeyEncode = undefined;

var _client = __webpack_require__(25);

var _client2 = _interopRequireDefault(_client);

var _app = __webpack_require__(1);

var firebase = _interopRequireWildcard(_app);

__webpack_require__(11);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fbKeyEncode = exports.fbKeyEncode = function fbKeyEncode(str) {
  return encodeURIComponent(str).replace(/\./g, "%2E");
};

// These imports load individual services into the firebase namespace.
var fbKeyDecode = exports.fbKeyDecode = function fbKeyDecode(str) {
  return decodeURIComponent(str).replace("%2E", ".");
};

var repoIdForPath = exports.repoIdForPath = function repoIdForPath(goalPath, savedRepos) {
  var idx = atom.project.getDirectories().findIndex(function (dir) {
    return dir.contains(goalPath);
  });
  if (idx === -1 || !savedRepos) {
    return null;
  }
  var url = savedRepos[idx];
  return url ? fbKeyEncode(url) : null;
};

var getSiteUrl = exports.getSiteUrl = function getSiteUrl() {
  var siteUrl = atom.config.get("codesidestory-atom.siteUrl");
  if (siteUrl.lastIndexOf("/") === siteUrl.length - 1) {
    siteUrl = siteUrl.substring(0, siteUrl.length - 1);
  }
  return siteUrl;
};

var postConversation = exports.postConversation = function postConversation(_ref) {
  var ref = _ref.ref,
      event = _ref.event;

  var user = firebase.auth().currentUser;
  user.getIdToken().then(function (jwt) {
    var siteUrl = getSiteUrl();
    var payload = { ref: ref, jwt: jwt, event: event };
    _client2.default.post(siteUrl + "/api/chat/send").type("json").accept("json").send(payload).then(function () {}).catch(console.error);
  });
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// taken from https://github.com/facebook/react/blob/67f8524e88abbf1ac0fd86d38a0477d11fbc7b3e/src/isomorphic/classic/element/ReactDOMFactories.js#L153
module.exports = new Set([
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan'
])


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const updateProps = __webpack_require__(13)
const SVG_TAGS = __webpack_require__(6)

function render (virtualNode, options) {
  let domNode
  if (virtualNode.text != null) {
    domNode = document.createTextNode(virtualNode.text)
  } else {
    const {tag, children} = virtualNode
    let {props} = virtualNode

    if (typeof tag === 'function') {
      let ref
      if (props && props.ref) {
        ref = props.ref
      }
      const component = new tag(props || {}, children)
      virtualNode.component = component
      domNode = component.element
      if (options && options.refs && ref) {
        options.refs[ref] = component
      }
    } else if (SVG_TAGS.has(tag)) {
      domNode = document.createElementNS("http://www.w3.org/2000/svg", tag);
      if (children) addChildren(domNode, children, options)
      if (props) updateProps(domNode, null, virtualNode, options)
    } else {
      domNode = document.createElement(tag)
      if (children) addChildren(domNode, children, options)
      if (props) updateProps(domNode, null, virtualNode, options)
    }
  }
  virtualNode.domNode = domNode
  return domNode
}

function addChildren (parent, children, options) {
  for (let i = 0; i < children.length; i++) {
    parent.appendChild(render(children[i], options))
  }
}

module.exports = render


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// taken from https://github.com/facebook/react/blob/67f8524e88abbf1ac0fd86d38a0477d11fbc7b3e/src/isomorphic/classic/element/ReactDOMFactories.js#L153
module.exports = new Set([
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan'
])


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const updateProps = __webpack_require__(16)
const SVG_TAGS = __webpack_require__(8)

function render (virtualNode, options) {
  let domNode
  if (virtualNode.text != null) {
    domNode = document.createTextNode(virtualNode.text)
  } else {
    const {tag, children} = virtualNode
    let {props} = virtualNode

    if (typeof tag === 'function') {
      let ref
      if (props && props.ref) {
        ref = props.ref
      }
      const component = new tag(props || {}, children)
      virtualNode.component = component
      domNode = component.element
      if (options && options.refs && ref) {
        options.refs[ref] = component
      }
    } else if (SVG_TAGS.has(tag)) {
      domNode = document.createElementNS("http://www.w3.org/2000/svg", tag);
      if (children) addChildren(domNode, children, options)
      if (props) updateProps(domNode, null, virtualNode, options)
    } else {
      domNode = document.createElement(tag)
      if (children) addChildren(domNode, children, options)
      if (props) updateProps(domNode, null, virtualNode, options)
    }
  }
  virtualNode.domNode = domNode
  return domNode
}

function addChildren (parent, children, options) {
  for (let i = 0; i < children.length; i++) {
    parent.appendChild(render(children[i], options))
  }
}

module.exports = render


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var scope = void 0;
if (typeof global !== 'undefined') {
    scope = global;
} else if (typeof self !== 'undefined') {
    scope = self;
} else {
    try {
        scope = Function('return this')();
    } catch (e) {
        throw new Error('polyfill failed because global object is unavailable in this environment');
    }
}
var PromiseImpl = scope.Promise || __webpack_require__(34);
var local = exports.local = {
    Promise: PromiseImpl,
    GoogPromise: PromiseImpl
};
//# sourceMappingURL=shared_promise.js.map


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */

var firebase = __webpack_require__(1);
(function(){(function(){var h,aa=aa||{},k=this,m=function(a){return void 0!==a},p=function(a){return"string"==typeof a},ba=function(a){return"boolean"==typeof a},ca=function(a){return"number"==typeof a},da=function(){},ea=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&
!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},fa=function(a){return null===a},ga=function(a){return"array"==ea(a)},ha=function(a){var b=ea(a);return"array"==b||"object"==b&&"number"==typeof a.length},q=function(a){return"function"==ea(a)},r=function(a){var b=
typeof a;return"object"==b&&null!=a||"function"==b},ia=function(a,b,c){return a.call.apply(a.bind,arguments)},ja=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},t=function(a,b,c){t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return t.apply(null,
arguments)},ka=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},la=Date.now||function(){return+new Date},u=function(a,b){function c(){}c.prototype=b.prototype;a.Nc=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.dg=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var v=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,v);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};u(v,Error);v.prototype.name="CustomError";var ma=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},na=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},va=function(a){if(!oa.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(pa,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(qa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ra,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(sa,"&quot;"));-1!=a.indexOf("'")&&
(a=a.replace(ta,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(ua,"&#0;"));return a},pa=/&/g,qa=/</g,ra=/>/g,sa=/"/g,ta=/'/g,ua=/\x00/g,oa=/[\x00&<>"']/,w=function(a,b){return-1!=a.indexOf(b)},wa=function(a,b){return a<b?-1:a>b?1:0};var xa=function(a,b){b.unshift(a);v.call(this,ma.apply(null,b));b.shift()};u(xa,v);xa.prototype.name="AssertionError";
var ya=function(a,b,c,d){var e="Assertion failed";if(c){e+=": "+c;var f=d}else a&&(e+=": "+a,f=b);throw new xa(""+e,f||[]);},x=function(a,b,c){a||ya("",null,b,Array.prototype.slice.call(arguments,2))},za=function(a,b){throw new xa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},Aa=function(a,b,c){ca(a)||ya("Expected number but got %s: %s.",[ea(a),a],b,Array.prototype.slice.call(arguments,2));return a},Ba=function(a,b,c){p(a)||ya("Expected string but got %s: %s.",[ea(a),a],b,Array.prototype.slice.call(arguments,
2))},Ca=function(a,b,c){q(a)||ya("Expected function but got %s: %s.",[ea(a),a],b,Array.prototype.slice.call(arguments,2))};var Ea=function(){this.Mc="";this.He=Da};Ea.prototype.Jb=!0;Ea.prototype.Gb=function(){return this.Mc};Ea.prototype.toString=function(){return"Const{"+this.Mc+"}"};var Fa=function(a){if(a instanceof Ea&&a.constructor===Ea&&a.He===Da)return a.Mc;za("expected object of type Const, got '"+a+"'");return"type_error:Const"},Da={},Ga=function(a){var b=new Ea;b.Mc=a;return b};Ga("");var Ia=function(){this.Fc="";this.Ie=Ha};Ia.prototype.Jb=!0;Ia.prototype.Gb=function(){return this.Fc};Ia.prototype.toString=function(){return"TrustedResourceUrl{"+this.Fc+"}"};
var Ja=function(a){if(a instanceof Ia&&a.constructor===Ia&&a.Ie===Ha)return a.Fc;za("expected object of type TrustedResourceUrl, got '"+a+"' of type "+ea(a));return"type_error:TrustedResourceUrl"},La=function(a,b){a=Ka(a,b);b=new Ia;b.Fc=a;return b},Ka=function(a,b){var c=Fa(a);if(!Ma.test(c))throw Error("Invalid TrustedResourceUrl format: "+c);return c.replace(Na,function(a,e){if(!Object.prototype.hasOwnProperty.call(b,e))throw Error('Found marker, "'+e+'", in format string, "'+c+'", but no valid label mapping found in args: '+
JSON.stringify(b));a=b[e];return a instanceof Ea?Fa(a):encodeURIComponent(String(a))})},Na=/%{(\w+)}/g,Ma=/^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]|^about:blank(#|$)/i,Ha={};var Oa=Array.prototype.indexOf?function(a,b,c){x(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},y=Array.prototype.forEach?function(a,b,c){x(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=function(a,b){for(var c=p(a)?
a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)},Qa=Array.prototype.map?function(a,b,c){x(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ra=Array.prototype.some?function(a,b,c){x(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},
Ta=function(a){a:{var b=Sa;for(var c=a.length,d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:p(a)?a.charAt(b):a[b]},Ua=function(a,b){return 0<=Oa(a,b)},Wa=function(a,b){b=Oa(a,b);var c;(c=0<=b)&&Va(a,b);return c},Va=function(a,b){x(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length},Xa=function(a,b){var c=0;Pa(a,function(d,e){b.call(void 0,d,e,a)&&Va(a,e)&&c++})},Ya=function(a){return Array.prototype.concat.apply([],arguments)},
Za=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var $a=function(a){return Qa(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};var ab;a:{var bb=k.navigator;if(bb){var cb=bb.userAgent;if(cb){ab=cb;break a}}ab=""}var z=function(a){return w(ab,a)};var db=function(a,b){for(var c in a)b.call(void 0,a[c],c,a)},eb=function(a,b){for(var c in a)if(b.call(void 0,a[c],c,a))return!0;return!1},fb=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},gb=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},hb=function(a){for(var b in a)return!1;return!0},ib=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0},jb=function(a){var b={},c;for(c in a)b[c]=a[c];return b},kb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
lb=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<kb.length;f++)c=kb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var mb=function(a){mb[" "](a);return a};mb[" "]=da;var ob=function(a,b){var c=nb;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var qb=z("Opera"),A=z("Trident")||z("MSIE"),rb=z("Edge"),sb=rb||A,tb=z("Gecko")&&!(w(ab.toLowerCase(),"webkit")&&!z("Edge"))&&!(z("Trident")||z("MSIE"))&&!z("Edge"),ub=w(ab.toLowerCase(),"webkit")&&!z("Edge"),vb=function(){var a=k.document;return a?a.documentMode:void 0},wb;
a:{var xb="",yb=function(){var a=ab;if(tb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(rb)return/Edge\/([\d\.]+)/.exec(a);if(A)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(ub)return/WebKit\/(\S+)/.exec(a);if(qb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();yb&&(xb=yb?yb[1]:"");if(A){var zb=vb();if(null!=zb&&zb>parseFloat(xb)){wb=String(zb);break a}}wb=xb}
var Ab=wb,nb={},B=function(a){return ob(a,function(){for(var b=0,c=na(String(Ab)).split("."),d=na(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",l=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];l=/(\d*)(\D*)(.*)/.exec(l)||["","","",""];if(0==g[0].length&&0==l[0].length)break;b=wa(0==g[1].length?0:parseInt(g[1],10),0==l[1].length?0:parseInt(l[1],10))||wa(0==g[2].length,0==l[2].length)||wa(g[2],l[2]);g=g[3];l=l[3]}while(0==b)}return 0<=b})},Bb;var Cb=k.document;
Bb=Cb&&A?vb()||("CSS1Compat"==Cb.compatMode?parseInt(Ab,10):5):void 0;var Db=null,Eb=null,Gb=function(a){var b="";Fb(a,function(a){b+=String.fromCharCode(a)});return b},Fb=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=Eb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}Hb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),l=c(64);if(64===l&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=l&&b(g<<6&192|l))}},Hb=function(){if(!Db){Db={};Eb={};for(var a=0;65>a;a++)Db[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
Eb[Db[a]]=a,62<=a&&(Eb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var Ib=function(){this.Fa=-1};var Lb=function(a,b){this.Fa=64;this.lc=k.Uint8Array?new Uint8Array(this.Fa):Array(this.Fa);this.Rc=this.kb=0;this.i=[];this.wf=a;this.ge=b;this.Xf=k.Int32Array?new Int32Array(64):Array(64);m(Jb)||(Jb=k.Int32Array?new Int32Array(Kb):Kb);this.reset()},Jb;u(Lb,Ib);for(var Mb=[],Nb=0;63>Nb;Nb++)Mb[Nb]=0;var Ob=Ya(128,Mb);Lb.prototype.reset=function(){this.Rc=this.kb=0;this.i=k.Int32Array?new Int32Array(this.ge):Za(this.ge)};
var Pb=function(a){var b=a.lc;x(b.length==a.Fa);for(var c=a.Xf,d=0,e=0;e<b.length;)c[d++]=b[e]<<24|b[e+1]<<16|b[e+2]<<8|b[e+3],e=4*d;for(b=16;64>b;b++){d=c[b-15]|0;e=c[b-2]|0;e=(e>>>17|e<<15)^(e>>>19|e<<13)^e>>>10;var f=(c[b-16]|0)+((d>>>7|d<<25)^(d>>>18|d<<14)^d>>>3)|0;var g=(c[b-7]|0)+e|0;c[b]=f+g|0}var d=a.i[0]|0,e=a.i[1]|0,l=a.i[2]|0,n=a.i[3]|0,C=a.i[4]|0,pb=a.i[5]|0,Xb=a.i[6]|0;f=a.i[7]|0;for(b=0;64>b;b++){var Wh=((d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10))+(d&e^d&l^e&l)|0;g=C&pb^~C&Xb;f=f+
((C>>>6|C<<26)^(C>>>11|C<<21)^(C>>>25|C<<7))|0;g=g+(Jb[b]|0)|0;g=f+(g+(c[b]|0)|0)|0;f=Xb;Xb=pb;pb=C;C=n+g|0;n=l;l=e;e=d;d=g+Wh|0}a.i[0]=a.i[0]+d|0;a.i[1]=a.i[1]+e|0;a.i[2]=a.i[2]+l|0;a.i[3]=a.i[3]+n|0;a.i[4]=a.i[4]+C|0;a.i[5]=a.i[5]+pb|0;a.i[6]=a.i[6]+Xb|0;a.i[7]=a.i[7]+f|0};
Lb.prototype.update=function(a,b){m(b)||(b=a.length);var c=0,d=this.kb;if(p(a))for(;c<b;)this.lc[d++]=a.charCodeAt(c++),d==this.Fa&&(Pb(this),d=0);else if(ha(a))for(;c<b;){var e=a[c++];if(!("number"==typeof e&&0<=e&&255>=e&&e==(e|0)))throw Error("message must be a byte array");this.lc[d++]=e;d==this.Fa&&(Pb(this),d=0)}else throw Error("message must be string or array");this.kb=d;this.Rc+=b};
Lb.prototype.digest=function(){var a=[],b=8*this.Rc;56>this.kb?this.update(Ob,56-this.kb):this.update(Ob,this.Fa-(this.kb-56));for(var c=63;56<=c;c--)this.lc[c]=b&255,b/=256;Pb(this);for(c=b=0;c<this.wf;c++)for(var d=24;0<=d;d-=8)a[b++]=this.i[c]>>d&255;return a};
var Kb=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,
4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];var Rb=function(){Lb.call(this,8,Qb)};u(Rb,Lb);var Qb=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];var Sb=function(){this.Ia=this.Ia;this.Cc=this.Cc};Sb.prototype.Ia=!1;Sb.prototype.isDisposed=function(){return this.Ia};Sb.prototype.hb=function(){if(this.Cc)for(;this.Cc.length;)this.Cc.shift()()};var Tb=!A||9<=Number(Bb),Ub=A&&!B("9");!ub||B("528");tb&&B("1.9b")||A&&B("8")||qb&&B("9.5")||ub&&B("528");tb&&!B("8")||A&&B("9");var Vb=function(){if(!k.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});k.addEventListener("test",null,b);k.removeEventListener("test",null,b);return a}();var Wb=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.Ta=!1;this.re=!0};Wb.prototype.stopPropagation=function(){this.Ta=!0};Wb.prototype.preventDefault=function(){this.defaultPrevented=!0;this.re=!1};var Yb=function(a,b){Wb.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.la=this.state=null;a&&this.init(a,b)};u(Yb,Wb);
Yb.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;if(b=a.relatedTarget){if(tb){a:{try{mb(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;null===d?(this.offsetX=ub||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=ub||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:a.pageX,
this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.la=a;a.defaultPrevented&&
this.preventDefault()};Yb.prototype.stopPropagation=function(){Yb.Nc.stopPropagation.call(this);this.la.stopPropagation?this.la.stopPropagation():this.la.cancelBubble=!0};Yb.prototype.preventDefault=function(){Yb.Nc.preventDefault.call(this);var a=this.la;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Ub)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};Yb.prototype.af=function(){return this.la};var Zb="closure_listenable_"+(1E6*Math.random()|0),$b=0;var ac=function(a,b,c,d,e){this.listener=a;this.Gc=null;this.src=b;this.type=c;this.capture=!!d;this.qc=e;this.key=++$b;this.tb=this.kc=!1},bc=function(a){a.tb=!0;a.listener=null;a.Gc=null;a.src=null;a.qc=null};var cc=function(a){this.src=a;this.I={};this.fc=0};cc.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.I[f];a||(a=this.I[f]=[],this.fc++);var g=dc(a,b,d,e);-1<g?(b=a[g],c||(b.kc=!1)):(b=new ac(b,this.src,f,!!d,e),b.kc=c,a.push(b));return b};cc.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.I))return!1;var e=this.I[a];b=dc(e,b,c,d);return-1<b?(bc(e[b]),Va(e,b),0==e.length&&(delete this.I[a],this.fc--),!0):!1};
var ec=function(a,b){var c=b.type;c in a.I&&Wa(a.I[c],b)&&(bc(b),0==a.I[c].length&&(delete a.I[c],a.fc--))};cc.prototype.gd=function(a,b,c,d){a=this.I[a.toString()];var e=-1;a&&(e=dc(a,b,c,d));return-1<e?a[e]:null};cc.prototype.hasListener=function(a,b){var c=m(a),d=c?a.toString():"",e=m(b);return eb(this.I,function(a){for(var f=0;f<a.length;++f)if(!(c&&a[f].type!=d||e&&a[f].capture!=b))return!0;return!1})};
var dc=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.tb&&f.listener==b&&f.capture==!!c&&f.qc==d)return e}return-1};var fc="closure_lm_"+(1E6*Math.random()|0),gc={},hc=0,jc=function(a,b,c,d,e){if(d&&d.once)ic(a,b,c,d,e);else if(ga(b))for(var f=0;f<b.length;f++)jc(a,b[f],c,d,e);else c=kc(c),a&&a[Zb]?a.listen(b,c,r(d)?!!d.capture:!!d,e):lc(a,b,c,!1,d,e)},lc=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=r(e)?!!e.capture:!!e,l=mc(a);l||(a[fc]=l=new cc(a));c=l.add(b,c,d,g,f);if(!c.Gc){d=nc();c.Gc=d;d.src=a;d.listener=c;if(a.addEventListener)Vb||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),
d,e);else if(a.attachEvent)a.attachEvent(oc(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");hc++}},nc=function(){var a=pc,b=Tb?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},ic=function(a,b,c,d,e){if(ga(b))for(var f=0;f<b.length;f++)ic(a,b[f],c,d,e);else c=kc(c),a&&a[Zb]?qc(a,b,c,r(d)?!!d.capture:!!d,e):lc(a,b,c,!0,d,e)},rc=function(a,b,c,d,e){if(ga(b))for(var f=0;f<b.length;f++)rc(a,b[f],c,d,
e);else d=r(d)?!!d.capture:!!d,c=kc(c),a&&a[Zb]?a.da.remove(String(b),c,d,e):a&&(a=mc(a))&&(b=a.gd(b,c,d,e))&&sc(b)},sc=function(a){if(!ca(a)&&a&&!a.tb){var b=a.src;if(b&&b[Zb])ec(b.da,a);else{var c=a.type,d=a.Gc;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent&&b.detachEvent(oc(c),d);hc--;(c=mc(b))?(ec(c,a),0==c.fc&&(c.src=null,b[fc]=null)):bc(a)}}},oc=function(a){return a in gc?gc[a]:gc[a]="on"+a},uc=function(a,b,c,d){var e=!0;if(a=mc(a))if(b=a.I[b.toString()])for(b=b.concat(),
a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.tb&&(f=tc(f,d),e=e&&!1!==f)}return e},tc=function(a,b){var c=a.listener,d=a.qc||a.src;a.kc&&sc(a);return c.call(d,b)},pc=function(a,b){if(a.tb)return!0;if(!Tb){if(!b)a:{b=["window","event"];for(var c=k,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}d=b;b=new Yb(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(g){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=
b.currentTarget;e;e=e.parentNode)d.push(e);for(var e=a.type,f=d.length-1;!b.Ta&&0<=f;f--)b.currentTarget=d[f],a=uc(d[f],e,!0,b),c=c&&a;for(f=0;!b.Ta&&f<d.length;f++)b.currentTarget=d[f],a=uc(d[f],e,!1,b),c=c&&a}return c}return tc(a,new Yb(b,this))},mc=function(a){a=a[fc];return a instanceof cc?a:null},vc="__closure_events_fn_"+(1E9*Math.random()>>>0),kc=function(a){x(a,"Listener can not be null.");if(q(a))return a;x(a.handleEvent,"An object listener must have handleEvent method.");a[vc]||(a[vc]=function(b){return a.handleEvent(b)});
return a[vc]};var wc=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;var yc=function(){this.ta="";this.Ge=xc};yc.prototype.Jb=!0;yc.prototype.Gb=function(){return this.ta};yc.prototype.toString=function(){return"SafeUrl{"+this.ta+"}"};
var zc=function(a){if(a instanceof yc&&a.constructor===yc&&a.Ge===xc)return a.ta;za("expected object of type SafeUrl, got '"+a+"' of type "+ea(a));return"type_error:SafeUrl"},Ac=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,Cc=function(a){if(a instanceof yc)return a;a=a.Jb?a.Gb():String(a);Ac.test(a)||(a="about:invalid#zClosurez");return Bc(a)},xc={},Bc=function(a){var b=new yc;b.ta=a;return b};Bc("about:blank");var Fc=function(a){var b=[];Dc(new Ec,a,b);return b.join("")},Ec=function(){this.Hc=void 0},Dc=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(ga(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],Dc(a,a.Hc?a.Hc.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),
Gc(d,c),c.push(":"),Dc(a,a.Hc?a.Hc.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":Gc(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},Hc={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ic=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,
Gc=function(a,b){b.push('"',a.replace(Ic,function(a){var b=Hc[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Hc[a]=b);return b}),'"')};var Jc=function(){};Jc.prototype.Nd=null;var Kc=function(a){return a.Nd||(a.Nd=a.nd())};var Lc,Mc=function(){};u(Mc,Jc);Mc.prototype.mc=function(){var a=Nc(this);return a?new ActiveXObject(a):new XMLHttpRequest};Mc.prototype.nd=function(){var a={};Nc(this)&&(a[0]=!0,a[1]=!0);return a};
var Nc=function(a){if(!a.fe&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.fe=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.fe};Lc=new Mc;var Oc=function(){};u(Oc,Jc);Oc.prototype.mc=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new Pc;throw Error("Unsupported browser");};Oc.prototype.nd=function(){return{}};
var Pc=function(){this.ja=new XDomainRequest;this.readyState=0;this.onreadystatechange=null;this.responseText="";this.status=-1;this.statusText=this.responseXML=null;this.ja.onload=t(this.df,this);this.ja.onerror=t(this.be,this);this.ja.onprogress=t(this.ef,this);this.ja.ontimeout=t(this.ff,this)};h=Pc.prototype;h.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.ja.open(a,b)};
h.send=function(a){if(a)if("string"==typeof a)this.ja.send(a);else throw Error("Only string data is supported");else this.ja.send()};h.abort=function(){this.ja.abort()};h.setRequestHeader=function(){};h.getResponseHeader=function(a){return"content-type"==a.toLowerCase()?this.ja.contentType:""};h.df=function(){this.status=200;this.responseText=this.ja.responseText;Qc(this,4)};h.be=function(){this.status=500;this.responseText="";Qc(this,4)};h.ff=function(){this.be()};
h.ef=function(){this.status=200;Qc(this,1)};var Qc=function(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()};Pc.prototype.getAllResponseHeaders=function(){return"content-type: "+this.ja.contentType};var Rc=function(a,b,c){this.sf=c;this.Qe=a;this.Hf=b;this.Bc=0;this.rc=null};Rc.prototype.get=function(){if(0<this.Bc){this.Bc--;var a=this.rc;this.rc=a.next;a.next=null}else a=this.Qe();return a};Rc.prototype.put=function(a){this.Hf(a);this.Bc<this.sf&&(this.Bc++,a.next=this.rc,this.rc=a)};var Sc=function(a){k.setTimeout(function(){throw a;},0)},Tc,Uc=function(){var a=k.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!z("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
a=t(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!z("Trident")&&!z("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(m(c.next)){c=c.next;var a=c.Qd;c.Qd=null;a()}};return function(a){d.next={Qd:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){k.setTimeout(a,0)}};var Vc=function(){this.Wc=this.cb=null},Xc=new Rc(function(){return new Wc},function(a){a.reset()},100);Vc.prototype.add=function(a,b){var c=Xc.get();c.set(a,b);this.Wc?this.Wc.next=c:(x(!this.cb),this.cb=c);this.Wc=c};Vc.prototype.remove=function(){var a=null;this.cb&&(a=this.cb,this.cb=this.cb.next,this.cb||(this.Wc=null),a.next=null);return a};var Wc=function(){this.next=this.scope=this.fd=null};Wc.prototype.set=function(a,b){this.fd=a;this.scope=b;this.next=null};
Wc.prototype.reset=function(){this.next=this.scope=this.fd=null};var bd=function(a,b){Yc||Zc();$c||(Yc(),$c=!0);ad.add(a,b)},Yc,Zc=function(){if(-1!=String(k.Promise).indexOf("[native code]")){var a=k.Promise.resolve(void 0);Yc=function(){a.then(cd)}}else Yc=function(){var a=cd;!q(k.setImmediate)||k.Window&&k.Window.prototype&&!z("Edge")&&k.Window.prototype.setImmediate==k.setImmediate?(Tc||(Tc=Uc()),Tc(a)):k.setImmediate(a)}},$c=!1,ad=new Vc,cd=function(){for(var a;a=ad.remove();){try{a.fd.call(a.scope)}catch(b){Sc(b)}Xc.put(a)}$c=!1};var dd=function(a){return r(a)?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):void 0===a?"undefined":null===a?"null":typeof a},ed=function(a){return(a=a&&a.ownerDocument)&&(a.defaultView||a.parentWindow)||window};var fd=!A||9<=Number(Bb);!tb&&!A||A&&9<=Number(Bb)||tb&&B("1.9.1");A&&B("9");var hd=function(){this.ta="";this.Fe=gd};hd.prototype.Jb=!0;hd.prototype.Gb=function(){return this.ta};hd.prototype.toString=function(){return"SafeHtml{"+this.ta+"}"};var id=function(a){if(a instanceof hd&&a.constructor===hd&&a.Fe===gd)return a.ta;za("expected object of type SafeHtml, got '"+a+"' of type "+ea(a));return"type_error:SafeHtml"},gd={};hd.prototype.mf=function(a){this.ta=a;return this};var jd=function(a,b){var c=ed(a);"undefined"!=typeof c.HTMLScriptElement&&"undefined"!=typeof c.Element&&x(a&&(a instanceof c.HTMLScriptElement||!(a instanceof c.Element)),"Argument is not a HTMLScriptElement (or a non-Element mock); got: %s",dd(a));a.src=Ja(b)};var kd=function(a){var b=document;return p(a)?b.getElementById(a):a},md=function(a,b){db(b,function(b,d){b&&b.Jb&&(b=b.Gb());"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:ld.hasOwnProperty(d)?a.setAttribute(ld[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},ld={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",
type:"type",usemap:"useMap",valign:"vAlign",width:"width"},od=function(a,b,c){var d=arguments,e=document,f=String(d[0]),g=d[1];if(!fd&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',va(g.name),'"');if(g.type){f.push(' type="',va(g.type),'"');var l={};lb(l,g);delete l.type;g=l}f.push(">");f=f.join("")}f=e.createElement(f);g&&(p(g)?f.className=g:ga(g)?f.className=g.join(" "):md(f,g));2<d.length&&nd(e,f,d);return f},nd=function(a,b,c){function d(c){c&&b.appendChild(p(c)?a.createTextNode(c):
c)}for(var e=2;e<c.length;e++){var f=c[e];!ha(f)||r(f)&&0<f.nodeType?d(f):y(pd(f)?Za(f):f,d)}},pd=function(a){if(a&&"number"==typeof a.length){if(r(a))return"function"==typeof a.item||"string"==typeof a.item;if(q(a))return"function"==typeof a.item}return!1};var qd=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},rd=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var D=function(a,b){this.X=0;this.va=void 0;this.gb=this.qa=this.u=null;this.pc=this.ed=!1;if(a!=da)try{var c=this;a.call(b,function(a){sd(c,2,a)},function(a){if(!(a instanceof td))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}sd(c,3,a)})}catch(d){sd(this,3,d)}},ud=function(){this.next=this.context=this.mb=this.Qa=this.child=null;this.yb=!1};ud.prototype.reset=function(){this.context=this.mb=this.Qa=this.child=null;this.yb=!1};
var vd=new Rc(function(){return new ud},function(a){a.reset()},100),wd=function(a,b,c){var d=vd.get();d.Qa=a;d.mb=b;d.context=c;return d},E=function(a){if(a instanceof D)return a;var b=new D(da);sd(b,2,a);return b},F=function(a){return new D(function(b,c){c(a)})},yd=function(a,b,c){xd(a,b,c,null)||bd(ka(b,a))},zd=function(a){return new D(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{Ze:!0,value:f}:{Ze:!1,reason:f};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],yd(g,ka(e,f,!0),
ka(e,f,!1));else b(d)})};D.prototype.then=function(a,b,c){null!=a&&Ca(a,"opt_onFulfilled should be a function.");null!=b&&Ca(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return Ad(this,q(a)?a:null,q(b)?b:null,c)};qd(D);var Cd=function(a,b){b=wd(b,b,void 0);b.yb=!0;Bd(a,b);return a};D.prototype.f=function(a,b){return Ad(this,null,a,b)};D.prototype.cancel=function(a){0==this.X&&bd(function(){var b=new td(a);Dd(this,b)},this)};
var Dd=function(a,b){if(0==a.X)if(a.u){var c=a.u;if(c.qa){for(var d=0,e=null,f=null,g=c.qa;g&&(g.yb||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.X&&1==d?Dd(c,b):(f?(d=f,x(c.qa),x(null!=d),d.next==c.gb&&(c.gb=d),d.next=d.next.next):Ed(c),Fd(c,e,3,b)))}a.u=null}else sd(a,3,b)},Bd=function(a,b){a.qa||2!=a.X&&3!=a.X||Gd(a);x(null!=b.Qa);a.gb?a.gb.next=b:a.qa=b;a.gb=b},Ad=function(a,b,c,d){var e=wd(null,null,null);e.child=new D(function(a,g){e.Qa=b?function(c){try{var e=b.call(d,c);a(e)}catch(C){g(C)}}:
a;e.mb=c?function(b){try{var e=c.call(d,b);!m(e)&&b instanceof td?g(b):a(e)}catch(C){g(C)}}:g});e.child.u=a;Bd(a,e);return e.child};D.prototype.Uf=function(a){x(1==this.X);this.X=0;sd(this,2,a)};D.prototype.Vf=function(a){x(1==this.X);this.X=0;sd(this,3,a)};
var sd=function(a,b,c){0==a.X&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.X=1,xd(c,a.Uf,a.Vf,a)||(a.va=c,a.X=b,a.u=null,Gd(a),3!=b||c instanceof td||Hd(a,c)))},xd=function(a,b,c,d){if(a instanceof D)return null!=b&&Ca(b,"opt_onFulfilled should be a function."),null!=c&&Ca(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),Bd(a,wd(b||da,c||null,d)),!0;if(rd(a))return a.then(b,c,d),!0;if(r(a))try{var e=a.then;if(q(e))return Id(a,
e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1},Id=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},l=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,l)}catch(n){l(n)}},Gd=function(a){a.ed||(a.ed=!0,bd(a.Ve,a))},Ed=function(a){var b=null;a.qa&&(b=a.qa,a.qa=b.next,b.next=null);a.qa||(a.gb=null);null!=b&&x(null!=b.Qa);return b};D.prototype.Ve=function(){for(var a;a=Ed(this);)Fd(this,a,this.X,this.va);this.ed=!1};
var Fd=function(a,b,c,d){if(3==c&&b.mb&&!b.yb)for(;a&&a.pc;a=a.u)a.pc=!1;if(b.child)b.child.u=null,Jd(b,c,d);else try{b.yb?b.Qa.call(b.context):Jd(b,c,d)}catch(e){Kd.call(null,e)}vd.put(b)},Jd=function(a,b,c){2==b?a.Qa.call(a.context,c):a.mb&&a.mb.call(a.context,c)},Hd=function(a,b){a.pc=!0;bd(function(){a.pc&&Kd.call(null,b)})},Kd=Sc,td=function(a){v.call(this,a)};u(td,v);td.prototype.name="cancel";
var Ld=function(a,b){this.Jc=[];this.me=a;this.Ud=b||null;this.Hb=this.ib=!1;this.va=void 0;this.Gd=this.Ld=this.$c=!1;this.Sc=0;this.u=null;this.ad=0};Ld.prototype.cancel=function(a){if(this.ib)this.va instanceof Ld&&this.va.cancel();else{if(this.u){var b=this.u;delete this.u;a?b.cancel(a):(b.ad--,0>=b.ad&&b.cancel())}this.me?this.me.call(this.Ud,this):this.Gd=!0;this.ib||Md(this,new Nd)}};Ld.prototype.Sd=function(a,b){this.$c=!1;Od(this,a,b)};
var Od=function(a,b,c){a.ib=!0;a.va=c;a.Hb=!b;Pd(a)},Rd=function(a){if(a.ib){if(!a.Gd)throw new Qd;a.Gd=!1}};Ld.prototype.callback=function(a){Rd(this);Sd(a);Od(this,!0,a)};var Md=function(a,b){Rd(a);Sd(b);Od(a,!1,b)},Sd=function(a){x(!(a instanceof Ld),"An execution sequence may not be initiated with a blocking Deferred.")},Ud=function(a,b){Td(a,null,b,void 0)},Td=function(a,b,c,d){x(!a.Ld,"Blocking Deferreds can not be re-used");a.Jc.push([b,c,d]);a.ib&&Pd(a)};
Ld.prototype.then=function(a,b,c){var d,e,f=new D(function(a,b){d=a;e=b});Td(this,d,function(a){a instanceof Nd?f.cancel():e(a)});return f.then(a,b,c)};qd(Ld);
var Vd=function(a){return Ra(a.Jc,function(a){return q(a[1])})},Pd=function(a){if(a.Sc&&a.ib&&Vd(a)){var b=a.Sc,c=Wd[b];c&&(k.clearTimeout(c.Ib),delete Wd[b]);a.Sc=0}a.u&&(a.u.ad--,delete a.u);for(var b=a.va,d=c=!1;a.Jc.length&&!a.$c;){var e=a.Jc.shift(),f=e[0],g=e[1],e=e[2];if(f=a.Hb?g:f)try{var l=f.call(e||a.Ud,b);m(l)&&(a.Hb=a.Hb&&(l==b||l instanceof Error),a.va=b=l);if(rd(b)||"function"===typeof k.Promise&&b instanceof k.Promise)d=!0,a.$c=!0}catch(n){b=n,a.Hb=!0,Vd(a)||(c=!0)}}a.va=b;d&&(l=t(a.Sd,
a,!0),d=t(a.Sd,a,!1),b instanceof Ld?(Td(b,l,d),b.Ld=!0):b.then(l,d));c&&(b=new Xd(b),Wd[b.Ib]=b,a.Sc=b.Ib)},Qd=function(){v.call(this)};u(Qd,v);Qd.prototype.message="Deferred has already fired";Qd.prototype.name="AlreadyCalledError";var Nd=function(){v.call(this)};u(Nd,v);Nd.prototype.message="Deferred was canceled";Nd.prototype.name="CanceledError";var Xd=function(a){this.Ib=k.setTimeout(t(this.Tf,this),0);this.Y=a};
Xd.prototype.Tf=function(){x(Wd[this.Ib],"Cannot throw an error that is not scheduled.");delete Wd[this.Ib];throw this.Y;};var Wd={};var be=function(a){var b={},c=b.document||document,d=Ja(a),e=document.createElement("SCRIPT"),f={se:e,ec:void 0},g=new Ld(Yd,f),l=null,n=null!=b.timeout?b.timeout:5E3;0<n&&(l=window.setTimeout(function(){Zd(e,!0);Md(g,new $d(1,"Timeout reached for loading script "+d))},n),f.ec=l);e.onload=e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(Zd(e,b.eg||!1,l),g.callback(null))};e.onerror=function(){Zd(e,!0,l);Md(g,new $d(0,"Error while loading script "+d))};
f=b.attributes||{};lb(f,{type:"text/javascript",charset:"UTF-8"});md(e,f);jd(e,a);ae(c).appendChild(e);return g},ae=function(a){var b;return(b=(a||document).getElementsByTagName("HEAD"))&&0!=b.length?b[0]:a.documentElement},Yd=function(){if(this&&this.se){var a=this.se;a&&"SCRIPT"==a.tagName&&Zd(a,!0,this.ec)}},Zd=function(a,b,c){null!=c&&k.clearTimeout(c);a.onload=da;a.onerror=da;a.onreadystatechange=da;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)},$d=function(a,
b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);v.call(this,c);this.code=a};u($d,v);var ce=function(a,b,c,d,e){this.reset(a,b,c,d,e)};ce.prototype.Wd=null;var de=0;ce.prototype.reset=function(a,b,c,d,e){"number"==typeof e||de++;d||la();this.Ob=a;this.vf=b;delete this.Wd};ce.prototype.ue=function(a){this.Ob=a};var ee=function(a){this.ke=a;this.ce=this.bd=this.Ob=this.u=null},fe=function(a,b){this.name=a;this.value=b};fe.prototype.toString=function(){return this.name};var ge=new fe("SEVERE",1E3),he=new fe("INFO",800),ie=new fe("CONFIG",700),je=new fe("FINE",500);ee.prototype.getName=function(){return this.ke};ee.prototype.getParent=function(){return this.u};ee.prototype.ue=function(a){this.Ob=a};var ke=function(a){if(a.Ob)return a.Ob;if(a.u)return ke(a.u);za("Root logger has no level set.");return null};
ee.prototype.log=function(a,b,c){if(a.value>=ke(this).value)for(q(b)&&(b=b()),a=new ce(a,String(b),this.ke),c&&(a.Wd=c),c="log:"+a.vf,k.console&&(k.console.timeStamp?k.console.timeStamp(c):k.console.markTimeline&&k.console.markTimeline(c)),k.msWriteProfilerMark&&k.msWriteProfilerMark(c),c=this;c;){var d=c,e=a;if(d.ce)for(var f=0;b=d.ce[f];f++)b(e);c=c.getParent()}};ee.prototype.info=function(a,b){this.log(he,a,b)};ee.prototype.config=function(a,b){this.log(ie,a,b)};
var le={},me=null,ne=function(a){me||(me=new ee(""),le[""]=me,me.ue(ie));var b;if(!(b=le[a])){b=new ee(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=ne(a.substr(0,c));c.bd||(c.bd={});c.bd[d]=b;b.u=c;le[a]=b}return b};var oe=function(){Sb.call(this);this.da=new cc(this);this.Ke=this;this.sd=null};u(oe,Sb);oe.prototype[Zb]=!0;h=oe.prototype;h.addEventListener=function(a,b,c,d){jc(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){rc(this,a,b,c,d)};
h.dispatchEvent=function(a){pe(this);var b=this.sd;if(b){var c=[];for(var d=1;b;b=b.sd)c.push(b),x(1E3>++d,"infinite loop")}b=this.Ke;d=a.type||a;if(p(a))a=new Wb(a,b);else if(a instanceof Wb)a.target=a.target||b;else{var e=a;a=new Wb(d,b);lb(a,e)}var e=!0;if(c)for(var f=c.length-1;!a.Ta&&0<=f;f--){var g=a.currentTarget=c[f];e=qe(g,d,!0,a)&&e}a.Ta||(g=a.currentTarget=b,e=qe(g,d,!0,a)&&e,a.Ta||(e=qe(g,d,!1,a)&&e));if(c)for(f=0;!a.Ta&&f<c.length;f++)g=a.currentTarget=c[f],e=qe(g,d,!1,a)&&e;return e};
h.hb=function(){oe.Nc.hb.call(this);if(this.da){var a=this.da,b=0,c;for(c in a.I){for(var d=a.I[c],e=0;e<d.length;e++)++b,bc(d[e]);delete a.I[c];a.fc--}}this.sd=null};h.listen=function(a,b,c,d){pe(this);return this.da.add(String(a),b,!1,c,d)};
var qc=function(a,b,c,d,e){a.da.add(String(b),c,!0,d,e)},qe=function(a,b,c,d){b=a.da.I[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.tb&&g.capture==c){var l=g.listener,n=g.qc||g.src;g.kc&&ec(a.da,g);e=!1!==l.call(n,d)&&e}}return e&&0!=d.re};oe.prototype.gd=function(a,b,c,d){return this.da.gd(String(a),b,c,d)};oe.prototype.hasListener=function(a,b){return this.da.hasListener(m(a)?String(a):void 0,b)};var pe=function(a){x(a.da,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var re="StopIteration"in k?k.StopIteration:{message:"StopIteration",stack:""},se=function(){};se.prototype.next=function(){throw re;};se.prototype.Je=function(){return this};var G=function(a,b){a&&a.log(je,b,void 0)};var te=function(a,b){this.fa={};this.A=[];this.bb=this.o=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};h=te.prototype;h.ea=function(){ue(this);for(var a=[],b=0;b<this.A.length;b++)a.push(this.fa[this.A[b]]);return a};h.ra=function(){ue(this);return this.A.concat()};h.Ab=function(a){return ve(this.fa,a)};h.clear=function(){this.fa={};this.bb=this.o=this.A.length=0};
h.remove=function(a){return ve(this.fa,a)?(delete this.fa[a],this.o--,this.bb++,this.A.length>2*this.o&&ue(this),!0):!1};var ue=function(a){var b,c;if(a.o!=a.A.length){for(b=c=0;c<a.A.length;){var d=a.A[c];ve(a.fa,d)&&(a.A[b++]=d);c++}a.A.length=b}if(a.o!=a.A.length){var e={};for(b=c=0;c<a.A.length;)d=a.A[c],ve(e,d)||(a.A[b++]=d,e[d]=1),c++;a.A.length=b}};h=te.prototype;h.get=function(a,b){return ve(this.fa,a)?this.fa[a]:b};
h.set=function(a,b){ve(this.fa,a)||(this.o++,this.A.push(a),this.bb++);this.fa[a]=b};h.addAll=function(a){if(a instanceof te){var b=a.ra();a=a.ea()}else b=gb(a),a=fb(a);for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.ra(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new te(this)};
h.Je=function(a){ue(this);var b=0,c=this.bb,d=this,e=new se;e.next=function(){if(c!=d.bb)throw Error("The map has changed since the iterator was created");if(b>=d.A.length)throw re;var e=d.A[b++];return a?e:d.fa[e]};return e};var ve=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var we=function(a){if(a.ea&&"function"==typeof a.ea)return a.ea();if(p(a))return a.split("");if(ha(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return fb(a)},xe=function(a){if(a.ra&&"function"==typeof a.ra)return a.ra();if(!a.ea||"function"!=typeof a.ea){if(ha(a)||p(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return gb(a)}},ye=function(a,b,c){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,c);else if(ha(a)||p(a))y(a,b,c);else for(var d=xe(a),e=we(a),f=e.length,
g=0;g<f;g++)b.call(c,e[g],d&&d[g],a)};var ze=function(a,b,c){if(q(a))c&&(a=t(a,c));else if(a&&"function"==typeof a.handleEvent)a=t(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:k.setTimeout(a,b||0)},Ae=function(a){var b=null;return(new D(function(c,d){b=ze(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).f(function(a){k.clearTimeout(b);throw a;})};var Be=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,Ce=function(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e=null;if(0<=d){var f=a[c].substring(0,d);e=a[c].substring(d+1)}else f=a[c];b(f,e?decodeURIComponent(e.replace(/\+/g," ")):"")}}};var H=function(a){oe.call(this);this.headers=new te;this.Yc=a||null;this.ya=!1;this.Xc=this.b=null;this.Nb=this.je=this.yc="";this.Ma=this.ld=this.uc=this.dd=!1;this.ub=0;this.Pc=null;this.Ic="";this.Tc=this.Cf=this.Ee=!1};u(H,oe);var De=H.prototype,Ee=ne("goog.net.XhrIo");De.M=Ee;var Fe=/^https?$/i,Ge=["POST","PUT"];
H.prototype.send=function(a,b,c,d){if(this.b)throw Error("[goog.net.XhrIo] Object is active with another request="+this.yc+"; newUri="+a);b=b?b.toUpperCase():"GET";this.yc=a;this.Nb="";this.je=b;this.dd=!1;this.ya=!0;this.b=this.Yc?this.Yc.mc():Lc.mc();this.Xc=this.Yc?Kc(this.Yc):Kc(Lc);this.b.onreadystatechange=t(this.oe,this);this.Cf&&"onprogress"in this.b&&(this.b.onprogress=t(function(a){this.ne(a,!0)},this),this.b.upload&&(this.b.upload.onprogress=t(this.ne,this)));try{G(this.M,He(this,"Opening Xhr")),
this.ld=!0,this.b.open(b,String(a),!0),this.ld=!1}catch(f){G(this.M,He(this,"Error opening Xhr: "+f.message));this.Y(5,f);return}a=c||"";var e=this.headers.clone();d&&ye(d,function(a,b){e.set(b,a)});d=Ta(e.ra());c=k.FormData&&a instanceof k.FormData;!Ua(Ge,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.b.setRequestHeader(b,a)},this);this.Ic&&(this.b.responseType=this.Ic);"withCredentials"in this.b&&this.b.withCredentials!==this.Ee&&(this.b.withCredentials=
this.Ee);try{Ie(this),0<this.ub&&(this.Tc=Je(this.b),G(this.M,He(this,"Will abort after "+this.ub+"ms if incomplete, xhr2 "+this.Tc)),this.Tc?(this.b.timeout=this.ub,this.b.ontimeout=t(this.ec,this)):this.Pc=ze(this.ec,this.ub,this)),G(this.M,He(this,"Sending request")),this.uc=!0,this.b.send(a),this.uc=!1}catch(f){G(this.M,He(this,"Send error: "+f.message)),this.Y(5,f)}};var Je=function(a){return A&&B(9)&&ca(a.timeout)&&m(a.ontimeout)},Sa=function(a){return"content-type"==a.toLowerCase()};
H.prototype.ec=function(){"undefined"!=typeof aa&&this.b&&(this.Nb="Timed out after "+this.ub+"ms, aborting",G(this.M,He(this,this.Nb)),this.dispatchEvent("timeout"),this.abort(8))};H.prototype.Y=function(a,b){this.ya=!1;this.b&&(this.Ma=!0,this.b.abort(),this.Ma=!1);this.Nb=b;Ke(this);Le(this)};var Ke=function(a){a.dd||(a.dd=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
H.prototype.abort=function(){this.b&&this.ya&&(G(this.M,He(this,"Aborting")),this.ya=!1,this.Ma=!0,this.b.abort(),this.Ma=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),Le(this))};H.prototype.hb=function(){this.b&&(this.ya&&(this.ya=!1,this.Ma=!0,this.b.abort(),this.Ma=!1),Le(this,!0));H.Nc.hb.call(this)};H.prototype.oe=function(){this.isDisposed()||(this.ld||this.uc||this.Ma?Me(this):this.yf())};H.prototype.yf=function(){Me(this)};
var Me=function(a){if(a.ya&&"undefined"!=typeof aa)if(a.Xc[1]&&4==Ne(a)&&2==Oe(a))G(a.M,He(a,"Local request error detected and ignored"));else if(a.uc&&4==Ne(a))ze(a.oe,0,a);else if(a.dispatchEvent("readystatechange"),4==Ne(a)){G(a.M,He(a,"Request complete"));a.ya=!1;try{var b=Oe(a);a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.yc).match(Be)[1]||null;if(!f&&k.self&&k.self.location)var g=k.self.location.protocol,
f=g.substr(0,g.length-1);e=!Fe.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{try{var l=2<Ne(a)?a.b.statusText:""}catch(n){G(a.M,"Can not get status: "+n.message),l=""}a.Nb=l+" ["+Oe(a)+"]";Ke(a)}}finally{Le(a)}}};H.prototype.ne=function(a,b){x("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");this.dispatchEvent(Pe(a,"progress"));this.dispatchEvent(Pe(a,b?"downloadprogress":"uploadprogress"))};
var Pe=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},Le=function(a,b){if(a.b){Ie(a);var c=a.b,d=a.Xc[0]?da:null;a.b=null;a.Xc=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(a=a.M)&&a.log(ge,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},Ie=function(a){a.b&&a.Tc&&(a.b.ontimeout=null);ca(a.Pc)&&(k.clearTimeout(a.Pc),a.Pc=null)},Ne=function(a){return a.b?a.b.readyState:0},Oe=function(a){try{return 2<Ne(a)?
a.b.status:-1}catch(b){return-1}},Qe=function(a){try{return a.b?a.b.responseText:""}catch(b){return G(a.M,"Can not get responseText: "+b.message),""}};
H.prototype.getResponse=function(){try{if(!this.b)return null;if("response"in this.b)return this.b.response;switch(this.Ic){case "":case "text":return this.b.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in this.b)return this.b.mozResponseArrayBuffer}var a=this.M;a&&a.log(ge,"Response type "+this.Ic+" is not supported on this browser",void 0);return null}catch(b){return G(this.M,"Can not get response: "+b.message),null}};
H.prototype.getResponseHeader=function(a){if(this.b&&4==Ne(this))return a=this.b.getResponseHeader(a),null===a?void 0:a};H.prototype.getAllResponseHeaders=function(){return this.b&&4==Ne(this)?this.b.getAllResponseHeaders():""};var He=function(a,b){return b+" ["+a.je+" "+a.yc+" "+Oe(a)+"]"};var Re=function(a,b){this.ka=this.$a=this.ma="";this.ob=null;this.La=this.Aa="";this.$=this.rf=!1;if(a instanceof Re){this.$=m(b)?b:a.$;Se(this,a.ma);var c=a.$a;I(this);this.$a=c;Te(this,a.ka);Ue(this,a.ob);Ve(this,a.Aa);We(this,a.ba.clone());a=a.La;I(this);this.La=a}else a&&(c=String(a).match(Be))?(this.$=!!b,Se(this,c[1]||"",!0),a=c[2]||"",I(this),this.$a=Xe(a),Te(this,c[3]||"",!0),Ue(this,c[4]),Ve(this,c[5]||"",!0),We(this,c[6]||"",!0),a=c[7]||"",I(this),this.La=Xe(a)):(this.$=!!b,this.ba=new Ye(null,
0,this.$))};Re.prototype.toString=function(){var a=[],b=this.ma;b&&a.push(Ze(b,$e,!0),":");var c=this.ka;if(c||"file"==b)a.push("//"),(b=this.$a)&&a.push(Ze(b,$e,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.ob,null!=c&&a.push(":",String(c));if(c=this.Aa)this.ka&&"/"!=c.charAt(0)&&a.push("/"),a.push(Ze(c,"/"==c.charAt(0)?af:bf,!0));(c=this.ba.toString())&&a.push("?",c);(c=this.La)&&a.push("#",Ze(c,cf));return a.join("")};
Re.prototype.resolve=function(a){var b=this.clone(),c=!!a.ma;c?Se(b,a.ma):c=!!a.$a;if(c){var d=a.$a;I(b);b.$a=d}else c=!!a.ka;c?Te(b,a.ka):c=null!=a.ob;d=a.Aa;if(c)Ue(b,a.ob);else if(c=!!a.Aa){if("/"!=d.charAt(0))if(this.ka&&!this.Aa)d="/"+d;else{var e=b.Aa.lastIndexOf("/");-1!=e&&(d=b.Aa.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(w(e,"./")||w(e,"/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var l=e[g++];"."==l?d&&g==e.length&&f.push(""):".."==l?((1<f.length||
1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(l),d=!0)}d=f.join("/")}else d=e}c?Ve(b,d):c=""!==a.ba.toString();c?We(b,a.ba.clone()):c=!!a.La;c&&(a=a.La,I(b),b.La=a);return b};Re.prototype.clone=function(){return new Re(this)};
var Se=function(a,b,c){I(a);a.ma=c?Xe(b,!0):b;a.ma&&(a.ma=a.ma.replace(/:$/,""))},Te=function(a,b,c){I(a);a.ka=c?Xe(b,!0):b},Ue=function(a,b){I(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.ob=b}else a.ob=null},Ve=function(a,b,c){I(a);a.Aa=c?Xe(b,!0):b},We=function(a,b,c){I(a);b instanceof Ye?(a.ba=b,a.ba.Ed(a.$)):(c||(b=Ze(b,df)),a.ba=new Ye(b,0,a.$))},J=function(a,b,c){I(a);a.ba.set(b,c)},ef=function(a,b){return a.ba.get(b)};
Re.prototype.removeParameter=function(a){I(this);this.ba.remove(a);return this};var I=function(a){if(a.rf)throw Error("Tried to modify a read-only Uri");};Re.prototype.Ed=function(a){this.$=a;this.ba&&this.ba.Ed(a);return this};
var ff=function(a){return a instanceof Re?a.clone():new Re(a,void 0)},gf=function(a,b){var c=new Re(null,void 0);Se(c,"https");a&&Te(c,a);b&&Ve(c,b);return c},Xe=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},Ze=function(a,b,c){return p(a)?(a=encodeURI(a).replace(b,hf),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},hf=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},$e=/[#\/\?@]/g,bf=/[\#\?:]/g,af=/[\#\?]/g,df=/[\#\?@]/g,
cf=/#/g,Ye=function(a,b,c){this.o=this.j=null;this.R=a||null;this.$=!!c},jf=function(a){a.j||(a.j=new te,a.o=0,a.R&&Ce(a.R,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))},lf=function(a){var b=xe(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new Ye(null,0,void 0);a=we(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];ga(f)?kf(c,e,f):c.add(e,f)}return c};h=Ye.prototype;
h.add=function(a,b){jf(this);this.R=null;a=this.Z(a);var c=this.j.get(a);c||this.j.set(a,c=[]);c.push(b);this.o=Aa(this.o)+1;return this};h.remove=function(a){jf(this);a=this.Z(a);return this.j.Ab(a)?(this.R=null,this.o=Aa(this.o)-this.j.get(a).length,this.j.remove(a)):!1};h.clear=function(){this.j=this.R=null;this.o=0};h.Ab=function(a){jf(this);a=this.Z(a);return this.j.Ab(a)};h.forEach=function(a,b){jf(this);this.j.forEach(function(c,d){y(c,function(c){a.call(b,c,d,this)},this)},this)};
h.ra=function(){jf(this);for(var a=this.j.ea(),b=this.j.ra(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};h.ea=function(a){jf(this);var b=[];if(p(a))this.Ab(a)&&(b=Ya(b,this.j.get(this.Z(a))));else{a=this.j.ea();for(var c=0;c<a.length;c++)b=Ya(b,a[c])}return b};h.set=function(a,b){jf(this);this.R=null;a=this.Z(a);this.Ab(a)&&(this.o=Aa(this.o)-this.j.get(a).length);this.j.set(a,[b]);this.o=Aa(this.o)+1;return this};
h.get=function(a,b){a=a?this.ea(a):[];return 0<a.length?String(a[0]):b};var kf=function(a,b,c){a.remove(b);0<c.length&&(a.R=null,a.j.set(a.Z(b),Za(c)),a.o=Aa(a.o)+c.length)};h=Ye.prototype;h.toString=function(){if(this.R)return this.R;if(!this.j)return"";for(var a=[],b=this.j.ra(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.ea(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.R=a.join("&")};
h.clone=function(){var a=new Ye;a.R=this.R;this.j&&(a.j=this.j.clone(),a.o=this.o);return a};h.Z=function(a){a=String(a);this.$&&(a=a.toLowerCase());return a};h.Ed=function(a){a&&!this.$&&(jf(this),this.R=null,this.j.forEach(function(a,c){var b=c.toLowerCase();c!=b&&(this.remove(c),kf(this,b,a))},this));this.$=a};h.extend=function(a){for(var b=0;b<arguments.length;b++)ye(arguments[b],function(a,b){this.add(b,a)},this)};var mf=function(){var a=K();return A&&!!Bb&&11==Bb||/Edge\/\d+/.test(a)},nf=function(){return k.window&&k.window.location.href||""},of=function(a,b){b=b||k.window;var c="about:blank";a&&(c=zc(Cc(a)));b.location.href=c},pf=function(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):ga(a[d])?ib(a[d],b[d])||c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<pf(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c},rf=function(){var a=
K();a="Chrome"!=qf(a)?null:(a=a.match(/\sChrome\/(\d+)/i))&&2==a.length?parseInt(a[1],10):null;return a&&30>a?!1:!A||!Bb||9<Bb},sf=function(a){a=(a||K()).toLowerCase();return a.match(/android/)||a.match(/webos/)||a.match(/iphone|ipad|ipod/)||a.match(/blackberry/)||a.match(/windows phone/)||a.match(/iemobile/)?!0:!1},tf=function(a){a=a||k.window;try{a.close()}catch(b){}},uf=function(a,b,c){var d=Math.floor(1E9*Math.random()).toString();b=b||500;c=c||600;var e=(window.screen.availHeight-c)/2,f=(window.screen.availWidth-
b)/2;b={width:b,height:c,top:0<e?e:0,left:0<f?f:0,location:!0,resizable:!0,statusbar:!0,toolbar:!1};c=K().toLowerCase();d&&(b.target=d,w(c,"crios/")&&(b.target="_blank"));"Firefox"==qf(K())&&(a=a||"http://localhost",b.scrollbars=!0);c=a||"about:blank";(d=b)||(d={});a=window;b=c instanceof yc?c:Cc("undefined"!=typeof c.href?c.href:String(c));c=d.target||c.target;e=[];for(g in d)switch(g){case "width":case "height":case "top":case "left":e.push(g+"="+d[g]);break;case "target":case "noreferrer":break;
default:e.push(g+"="+(d[g]?1:0))}var g=e.join(",");(z("iPhone")&&!z("iPod")&&!z("iPad")||z("iPad")||z("iPod"))&&a.navigator&&a.navigator.standalone&&c&&"_self"!=c?(g=a.document.createElement("A"),e=ed(g),"undefined"!=typeof e.HTMLAnchorElement&&"undefined"!=typeof e.Location&&"undefined"!=typeof e.Element&&x(g&&(g instanceof e.HTMLAnchorElement||!(g instanceof e.Location||g instanceof e.Element)),"Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s",dd(g)),b=b instanceof yc?b:Cc(b),
g.href=zc(b),g.setAttribute("target",c),d.noreferrer&&g.setAttribute("rel","noreferrer"),d=document.createEvent("MouseEvent"),d.initMouseEvent("click",!0,!0,a,1),g.dispatchEvent(d),g={}):d.noreferrer?(g=a.open("",c,g),d=zc(b),g&&(sb&&w(d,";")&&(d="'"+d.replace(/'/g,"%27")+"'"),g.opener=null,a=Ga("b/12014412, meta tag with sanitized URL"),d='<META HTTP-EQUIV="refresh" content="0; url='+va(d)+'">',Ba(Fa(a),"must provide justification"),x(!/^[\s\xa0]*$/.test(Fa(a)),"must provide non-empty justification"),
g.document.write(id((new hd).mf(d))),g.document.close())):g=a.open(zc(b),c,g);if(g)try{g.focus()}catch(l){}return g},vf=function(a){return new D(function(b){var c=function(){Ae(2E3).then(function(){if(!a||a.closed)b();else return c()})};return c()})},wf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xf=function(){var a=null;return(new D(function(b){"complete"==k.document.readyState?b():(a=function(){b()},ic(window,"load",a))})).f(function(b){rc(window,"load",a);throw b;})},zf=function(){return yf(void 0)?
xf().then(function(){return new D(function(a,b){var c=k.document,d=setTimeout(function(){b(Error("Cordova framework is not ready."))},1E3);c.addEventListener("deviceready",function(){clearTimeout(d);a()},!1)})}):F(Error("Cordova must run in an Android or iOS file scheme."))},yf=function(a){a=a||K();return!("file:"!==Af()||!a.toLowerCase().match(/iphone|ipad|ipod|android/))},Bf=function(){var a=k.window;try{return!(!a||a==a.top)}catch(b){return!1}},Cf=function(){return firebase.INTERNAL.hasOwnProperty("reactNative")?
"ReactNative":firebase.INTERNAL.hasOwnProperty("node")?"Node":"Browser"},Df=function(){var a=Cf();return"ReactNative"===a||"Node"===a},qf=function(a){var b=a.toLowerCase();if(w(b,"opera/")||w(b,"opr/")||w(b,"opios/"))return"Opera";if(w(b,"iemobile"))return"IEMobile";if(w(b,"msie")||w(b,"trident/"))return"IE";if(w(b,"edge/"))return"Edge";if(w(b,"firefox/"))return"Firefox";if(w(b,"silk/"))return"Silk";if(w(b,"blackberry"))return"Blackberry";if(w(b,"webos"))return"Webos";if(!w(b,"safari/")||w(b,"chrome/")||
w(b,"crios/")||w(b,"android"))if(!w(b,"chrome/")&&!w(b,"crios/")||w(b,"edge/")){if(w(b,"android"))return"Android";if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&2==a.length)return a[1]}else return"Chrome";else return"Safari";return"Other"},Ef=function(a){var b=Cf();return("Browser"===b?qf(K()):b)+"/JsCore/"+a},K=function(){return k.navigator&&k.navigator.userAgent||""},L=function(a,b){a=a.split(".");b=b||k;for(var c=0;c<a.length&&"object"==typeof b&&null!=b;c++)b=b[a[c]];c!=a.length&&(b=void 0);
return b},Hf=function(){var a;if(a=(Ff()||"chrome-extension:"===Af()||yf())&&!Df())a:{try{var b=k.localStorage,c=Gf();if(b){b.setItem(c,"1");b.removeItem(c);a=mf()?!!k.indexedDB:!0;break a}}catch(d){}a=!1}return a},Ff=function(){return"http:"===Af()||"https:"===Af()},Af=function(){return k.location&&k.location.protocol||null},If=function(a){a=a||K();return sf(a)||"Firefox"==qf(a)?!1:!0},Jf=function(a){return"undefined"===typeof a?null:Fc(a)},Kf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&
null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return b},Lf=function(a){if(null!==a)return JSON.parse(a)},Gf=function(a){return a?a:""+Math.floor(1E9*Math.random()).toString()},Mf=function(a){a=a||K();return"Safari"==qf(a)||a.toLowerCase().match(/iphone|ipad|ipod/)?!1:!0},Nf=function(){var a=k.___jsl;if(a&&a.H)for(var b in a.H)if(a.H[b].r=a.H[b].r||[],a.H[b].L=a.H[b].L||[],a.H[b].r=a.H[b].L.concat(),a.CP)for(var c=0;c<a.CP.length;c++)a.CP[c]=null},Of=function(){return k.navigator&&"boolean"===typeof k.navigator.onLine?
k.navigator.onLine:!0},Pf=function(a,b,c,d){if(a>b)throw Error("Short delay should be less than long delay!");this.Qf=a;this.uf=b;a=c||K();d=d||Cf();this.qf=sf(a)||"ReactNative"===d};Pf.prototype.get=function(){return this.qf?this.uf:this.Qf};
var Qf=function(){var a=k.document;return a&&"undefined"!==typeof a.visibilityState?"visible"==a.visibilityState:!0},Rf=function(){var a=k.document,b=null;return Qf()||!a?E():(new D(function(c){b=function(){Qf()&&(a.removeEventListener("visibilitychange",b,!1),c())};a.addEventListener("visibilitychange",b,!1)})).f(function(c){a.removeEventListener("visibilitychange",b,!1);throw c;})};var Sf={};var Tf;try{var Uf={};Object.defineProperty(Uf,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Uf,"abcd",{configurable:!0,enumerable:!0,value:2});Tf=2==Uf.abcd}catch(a){Tf=!1}
var M=function(a,b,c){Tf?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c},Vf=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&M(a,c,b[c])},Wf=function(a){var b={};Vf(b,a);return b},Xf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},Yf=function(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0},Zf=function(a){var b=a;if("object"==typeof a&&null!=a){var b=
"length"in a?[]:{},c;for(c in a)M(b,c,Zf(a[c]))}return b};var $f="oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),ag=["client_id","response_type","scope","redirect_uri","state"],bg={$f:{Sb:500,Rb:600,providerId:"facebook.com",Ad:ag},ag:{Sb:500,Rb:620,providerId:"github.com",Ad:ag},bg:{Sb:515,Rb:680,providerId:"google.com",Ad:ag},cg:{Sb:485,Rb:705,providerId:"twitter.com",Ad:$f}},cg=function(a){for(var b in bg)if(bg[b].providerId==a)return bg[b];return null};var N=function(a,b){this.code="auth/"+a;this.message=b||dg[a]||""};u(N,Error);N.prototype.G=function(){return{code:this.code,message:this.message}};N.prototype.toJSON=function(){return this.G()};
var eg=function(a){var b=a&&a.code;return b?new N(b.substring(5),a.message):null},dg={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
"code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
"dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-already-in-use":"The email address is already in use by another account.","expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
"invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"The user's credential is no longer valid. The user must sign in again.","invalid-auth-event":"An internal error has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
"invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
"invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.",
"invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
"invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","missing-iframe-start":"An internal error has occurred.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.",
"missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
"no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The SMS quota for this project has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.",
timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","user-cancelled":"User did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.",
"user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled."};var O=function(a,b,c,d,e){this.ia=a;this.S=b||null;this.vb=c||null;this.Dd=d||null;this.Y=e||null;if(this.vb||this.Y){if(this.vb&&this.Y)throw new N("invalid-auth-event");if(this.vb&&!this.Dd)throw new N("invalid-auth-event");}else throw new N("invalid-auth-event");};O.prototype.oc=function(){return this.Dd};O.prototype.getError=function(){return this.Y};O.prototype.G=function(){return{type:this.ia,eventId:this.S,urlResponse:this.vb,sessionId:this.Dd,error:this.Y&&this.Y.G()}};
var fg=function(a){a=a||{};return a.type?new O(a.type,a.eventId,a.urlResponse,a.sessionId,a.error&&eg(a.error)):null};var gg=function(a){var b="unauthorized-domain",c=void 0,d=ff(a);a=d.ka;d=d.ma;"chrome-extension"==d?c=ma("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):"http"==d||"https"==d?c=ma("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):b=
"operation-not-supported-in-this-environment";N.call(this,b,c)};u(gg,N);var hg=function(a){this.tf=a.sub;la();this.Db=a.email||null;this.Df=a.provider_id||null;this.Me=!!a.is_anonymous||"anonymous"==this.Df};hg.prototype.getEmail=function(){return this.Db};hg.prototype.isAnonymous=function(){return this.Me};var ig=function(a,b){return a.then(function(a){if(a.idToken){a:{var c=a.idToken.split(".");if(3==c.length){for(var c=c[1],e=(4-c.length%4)%4,f=0;f<e;f++)c+=".";try{var g=JSON.parse(Gb(c));if(g.sub&&g.iss&&g.aud&&g.exp){var l=new hg(g);break a}}catch(n){}}l=null}if(!l||b!=l.tf)throw new N("user-mismatch");return a}throw new N("user-mismatch");}).f(function(a){throw a&&a.code&&"auth/user-not-found"==a.code?new N("user-mismatch"):a;})},jg=function(a,b){if(b.idToken||b.accessToken)b.idToken&&M(this,"idToken",
b.idToken),b.accessToken&&M(this,"accessToken",b.accessToken);else if(b.oauthToken&&b.oauthTokenSecret)M(this,"accessToken",b.oauthToken),M(this,"secret",b.oauthTokenSecret);else throw new N("internal-error","failed to construct a credential");M(this,"providerId",a)};jg.prototype.Fb=function(a){return kg(a,lg(this))};jg.prototype.zc=function(a,b){var c=lg(this);c.idToken=b;return mg(a,c)};jg.prototype.pd=function(a,b){var c=lg(this);return ig(ng(a,c),b)};
var lg=function(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.providerId;return{postBody:lf(b).toString(),requestUri:"http://localhost"}};jg.prototype.G=function(){var a={providerId:this.providerId};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};
var og=function(a,b){this.Gf=b||[];Vf(this,{providerId:a,isOAuthProvider:!0});this.Td={}};og.prototype.setCustomParameters=function(a){this.Td=jb(a);return this};var P=function(a){og.call(this,a,ag);this.Bd=[]};u(P,og);P.prototype.addScope=function(a){Ua(this.Bd,a)||this.Bd.push(a);return this};P.prototype.ae=function(){return Za(this.Bd)};
P.prototype.credential=function(a,b){if(!a&&!b)throw new N("argument-error","credential failed: must provide the ID token and/or the access token.");return new jg(this.providerId,{idToken:a||null,accessToken:b||null})};var pg=function(){P.call(this,"facebook.com")};u(pg,P);M(pg,"PROVIDER_ID","facebook.com");
var qg=function(a){if(!a)throw new N("argument-error","credential failed: expected 1 argument (the OAuth access token).");var b=a;r(a)&&(b=a.accessToken);return(new pg).credential(null,b)},rg=function(){P.call(this,"github.com")};u(rg,P);M(rg,"PROVIDER_ID","github.com");var sg=function(a){if(!a)throw new N("argument-error","credential failed: expected 1 argument (the OAuth access token).");var b=a;r(a)&&(b=a.accessToken);return(new rg).credential(null,b)},tg=function(){P.call(this,"google.com");this.addScope("profile")};
u(tg,P);M(tg,"PROVIDER_ID","google.com");var ug=function(a,b){var c=a;r(a)&&(c=a.idToken,b=a.accessToken);return(new tg).credential(c,b)},vg=function(){og.call(this,"twitter.com",$f)};u(vg,og);M(vg,"PROVIDER_ID","twitter.com");
var wg=function(a,b){var c=a;r(c)||(c={oauthToken:a,oauthTokenSecret:b});if(!c.oauthToken||!c.oauthTokenSecret)throw new N("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");return new jg("twitter.com",c)},xg=function(a,b){this.Db=a;this.td=b;M(this,"providerId","password")};xg.prototype.Fb=function(a){return Q(a,yg,{email:this.Db,password:this.td})};xg.prototype.zc=function(a,b){return Q(a,zg,{idToken:b,email:this.Db,password:this.td})};
xg.prototype.pd=function(a,b){return ig(this.Fb(a),b)};xg.prototype.G=function(){return{email:this.Db,password:this.td}};var Ag=function(){Vf(this,{providerId:"password",isOAuthProvider:!1})};Vf(Ag,{PROVIDER_ID:"password"});var Bg=function(a){if(!(a.verificationId&&a.Uc||a.dc&&a.phoneNumber))throw new N("internal-error");this.N=a;M(this,"providerId","phone")};Bg.prototype.Fb=function(a){return a.verifyPhoneNumber(Cg(this))};Bg.prototype.zc=function(a,b){var c=Cg(this);c.idToken=b;return Q(a,Dg,c)};
Bg.prototype.pd=function(a,b){var c=Cg(this);c.operation="REAUTH";a=Q(a,Eg,c);return ig(a,b)};Bg.prototype.G=function(){var a={providerId:"phone"};this.N.verificationId&&(a.verificationId=this.N.verificationId);this.N.Uc&&(a.verificationCode=this.N.Uc);this.N.dc&&(a.temporaryProof=this.N.dc);this.N.phoneNumber&&(a.phoneNumber=this.N.phoneNumber);return a};
var Cg=function(a){return a.N.dc&&a.N.phoneNumber?{temporaryProof:a.N.dc,phoneNumber:a.N.phoneNumber}:{sessionInfo:a.N.verificationId,code:a.N.Uc}},Fg=function(a){try{this.Oe=a||firebase.auth()}catch(b){throw new N("argument-error","Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().");}Vf(this,{providerId:"phone",isOAuthProvider:!1})};
Fg.prototype.verifyPhoneNumber=function(a,b){var c=this.Oe.g;return E(b.verify()).then(function(d){if(!p(d))throw new N("argument-error","An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");switch(b.type){case "recaptcha":return Q(c,Gg,{phoneNumber:a,recaptchaToken:d});default:throw new N("argument-error",'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.');}})};
var Hg=function(a,b){if(!a)throw new N("missing-verification-id");if(!b)throw new N("missing-verification-code");return new Bg({verificationId:a,Uc:b})};Vf(Fg,{PROVIDER_ID:"phone"});
var Ig=function(a){if(a.temporaryProof&&a.phoneNumber)return new Bg({dc:a.temporaryProof,phoneNumber:a.phoneNumber});var b=a&&a.providerId;if(!b||"password"===b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;try{switch(b){case "google.com":return ug(a,c);case "facebook.com":return qg(c);case "github.com":return sg(c);case "twitter.com":return wg(c,d);default:return(new P(b)).credential(a,c)}}catch(e){return null}},Jg=function(a){if(!a.isOAuthProvider)throw new N("invalid-oauth-provider");
};var Kg=function(a,b,c){N.call(this,a,c);a=b||{};a.email&&M(this,"email",a.email);a.phoneNumber&&M(this,"phoneNumber",a.phoneNumber);a.credential&&M(this,"credential",a.credential)};u(Kg,N);Kg.prototype.G=function(){var a={code:this.code,message:this.message};this.email&&(a.email=this.email);this.phoneNumber&&(a.phoneNumber=this.phoneNumber);var b=this.credential&&this.credential.G();b&&lb(a,b);return a};Kg.prototype.toJSON=function(){return this.G()};
var Lg=function(a){if(a.code){var b=a.code||"";0==b.indexOf("auth/")&&(b=b.substring(5));var c={credential:Ig(a)};if(a.email)c.email=a.email;else if(a.phoneNumber)c.phoneNumber=a.phoneNumber;else return new N(b,a.message||void 0);return new Kg(b,c,a.message)}return null};var Mg=function(a){this.Zf=a};u(Mg,Jc);Mg.prototype.mc=function(){return new this.Zf};Mg.prototype.nd=function(){return{}};
var R=function(a,b,c){var d="Node"==Cf();d=k.XMLHttpRequest||d&&firebase.INTERNAL.node&&firebase.INTERNAL.node.XMLHttpRequest;if(!d)throw new N("internal-error","The XMLHttpRequest compatibility library was not found.");this.m=a;a=b||{};this.Mf=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.Nf=a.secureTokenTimeout||Ng;this.te=jb(a.secureTokenHeaders||Og);this.Xe=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.Ye=a.firebaseTimeout||
Pg;this.Zd=jb(a.firebaseHeaders||Qg);c&&(this.Zd["X-Client-Version"]=c,this.te["X-Client-Version"]=c);this.Pe=new Oc;this.Yf=new Mg(d)},Rg,Ng=new Pf(3E4,6E4),Og={"Content-Type":"application/x-www-form-urlencoded"},Pg=new Pf(3E4,6E4),Qg={"Content-Type":"application/json"},Tg=function(a,b,c,d,e,f,g){Of()?(rf()?a=t(a.Pf,a):(Rg||(Rg=new D(function(a,b){Sg(a,b)})),a=t(a.Of,a)),a(b,c,d,e,f,g)):c&&c(null)};
R.prototype.Pf=function(a,b,c,d,e,f){var g="Node"==Cf(),l=Df()?g?new H(this.Yf):new H:new H(this.Pe);if(f){l.ub=Math.max(0,f);var n=setTimeout(function(){l.dispatchEvent("timeout")},f)}l.listen("complete",function(){n&&clearTimeout(n);var a=null;try{a=JSON.parse(Qe(this))||null}catch(pb){a=null}b&&b(a)});qc(l,"ready",function(){n&&clearTimeout(n);this.Ia||(this.Ia=!0,this.hb())});qc(l,"timeout",function(){n&&clearTimeout(n);this.Ia||(this.Ia=!0,this.hb());b&&b(null)});l.send(a,c,d,e)};
var Ug=Ga("https://apis.google.com/js/client.js?onload=%{onload}"),Vg="__fcb"+Math.floor(1E6*Math.random()).toString(),Sg=function(a,b){if(((window.gapi||{}).client||{}).request)a();else{k[Vg]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))};var c=La(Ug,{onload:Vg});Ud(be(c),function(){b(Error("CORS_UNSUPPORTED"))})}};
R.prototype.Of=function(a,b,c,d,e){var f=this;Rg.then(function(){window.gapi.client.setApiKey(f.m);var g=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(g);b&&b(a)}})}).f(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
var Xg=function(a,b){return new D(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?Tg(a,a.Mf+"?key="+encodeURIComponent(a.m),function(a){a?a.error?d(Wg(a)):a.access_token&&a.refresh_token?c(a):d(new N("internal-error")):d(new N("network-request-failed"))},"POST",lf(b).toString(),a.te,a.Nf.get()):d(new N("internal-error"))})},Yg=function(a,b,c,d,e,f){var g=ff(a.Xe+b);J(g,"key",a.m);f&&J(g,"cb",la().toString());var l="GET"==c;if(l)for(var n in d)d.hasOwnProperty(n)&&
J(g,n,d[n]);return new D(function(b,f){Tg(a,g.toString(),function(a){a?a.error?f(Wg(a,e||{})):b(a):f(new N("network-request-failed"))},c,l?void 0:Fc(Kf(d)),a.Zd,a.Ye.get())})},Zg=function(a){if(!wc.test(a.email))throw new N("invalid-email");},$g=function(a){"email"in a&&Zg(a)},bh=function(a,b){return Q(a,ah,{identifier:b,continueUri:Ff()?nf():"http://localhost"}).then(function(a){return a.allProviders||[]})},dh=function(a){return Q(a,ch,{}).then(function(a){return a.authorizedDomains||[]})},eh=function(a){if(!a.idToken)throw new N("internal-error");
},fh=function(a){if(a.phoneNumber||a.temporaryProof){if(!a.phoneNumber||!a.temporaryProof)throw new N("internal-error");}else{if(!a.sessionInfo)throw new N("missing-verification-id");if(!a.code)throw new N("missing-verification-code");}};R.prototype.signInAnonymously=function(){return Q(this,gh,{})};R.prototype.updateEmail=function(a,b){return Q(this,hh,{idToken:a,email:b})};R.prototype.updatePassword=function(a,b){return Q(this,zg,{idToken:a,password:b})};var ih={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};
R.prototype.updateProfile=function(a,b){var c={idToken:a},d=[];db(ih,function(a,f){var e=b[f];null===e?d.push(a):f in b&&(c[f]=e)});d.length&&(c.deleteAttribute=d);return Q(this,hh,c)};R.prototype.sendPasswordResetEmail=function(a){return Q(this,jh,{requestType:"PASSWORD_RESET",email:a})};R.prototype.sendEmailVerification=function(a){return Q(this,kh,{requestType:"VERIFY_EMAIL",idToken:a})};R.prototype.verifyPhoneNumber=function(a){return Q(this,lh,a)};
var nh=function(a,b,c){return Q(a,mh,{idToken:b,deleteProvider:c})},oh=function(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new N("internal-error");},ph=function(a){var b=null;a.needConfirmation?(a.code="account-exists-with-different-credential",b=Lg(a)):"FEDERATED_USER_ID_ALREADY_LINKED"==a.errorMessage?(a.code="credential-already-in-use",b=Lg(a)):"EMAIL_EXISTS"==a.errorMessage&&(a.code="email-already-in-use",b=Lg(a));if(b)throw b;if(!a.idToken)throw new N("internal-error");},kg=function(a,
b){b.returnIdpCredential=!0;return Q(a,qh,b)},mg=function(a,b){b.returnIdpCredential=!0;return Q(a,rh,b)},ng=function(a,b){b.returnIdpCredential=!0;b.autoCreate=!1;return Q(a,sh,b)},th=function(a){if(!a.oobCode)throw new N("invalid-action-code");};R.prototype.confirmPasswordReset=function(a,b){return Q(this,uh,{oobCode:a,newPassword:b})};R.prototype.checkActionCode=function(a){return Q(this,vh,{oobCode:a})};R.prototype.applyActionCode=function(a){return Q(this,wh,{oobCode:a})};
var wh={endpoint:"setAccountInfo",D:th,Za:"email"},vh={endpoint:"resetPassword",D:th,W:function(a){if(!a.email||!a.requestType)throw new N("internal-error");}},xh={endpoint:"signupNewUser",D:function(a){Zg(a);if(!a.password)throw new N("weak-password");},W:eh,wa:!0},ah={endpoint:"createAuthUri"},yh={endpoint:"deleteAccount",Xa:["idToken"]},mh={endpoint:"setAccountInfo",Xa:["idToken","deleteProvider"],D:function(a){if(!ga(a.deleteProvider))throw new N("internal-error");}},zh={endpoint:"getAccountInfo"},
kh={endpoint:"getOobConfirmationCode",Xa:["idToken","requestType"],D:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new N("internal-error");},Za:"email"},jh={endpoint:"getOobConfirmationCode",Xa:["requestType"],D:function(a){if("PASSWORD_RESET"!=a.requestType)throw new N("internal-error");Zg(a)},Za:"email"},ch={Md:!0,endpoint:"getProjectConfig",ee:"GET"},Ah={Md:!0,endpoint:"getRecaptchaParam",ee:"GET",W:function(a){if(!a.recaptchaSiteKey)throw new N("internal-error");}},uh={endpoint:"resetPassword",
D:th,Za:"email"},Gg={endpoint:"sendVerificationCode",Xa:["phoneNumber","recaptchaToken"],Za:"sessionInfo"},hh={endpoint:"setAccountInfo",Xa:["idToken"],D:$g,wa:!0},zg={endpoint:"setAccountInfo",Xa:["idToken"],D:function(a){$g(a);if(!a.password)throw new N("weak-password");},W:eh,wa:!0},gh={endpoint:"signupNewUser",W:eh,wa:!0},qh={endpoint:"verifyAssertion",D:oh,W:ph,wa:!0},sh={endpoint:"verifyAssertion",D:oh,W:function(a){if(a.errorMessage&&"USER_NOT_FOUND"==a.errorMessage)throw new N("user-not-found");
if(!a.idToken)throw new N("internal-error");},wa:!0},rh={endpoint:"verifyAssertion",D:function(a){oh(a);if(!a.idToken)throw new N("internal-error");},W:ph,wa:!0},Bh={endpoint:"verifyCustomToken",D:function(a){if(!a.token)throw new N("invalid-custom-token");},W:eh,wa:!0},yg={endpoint:"verifyPassword",D:function(a){Zg(a);if(!a.password)throw new N("wrong-password");},W:eh,wa:!0},lh={endpoint:"verifyPhoneNumber",D:fh,W:eh},Dg={endpoint:"verifyPhoneNumber",D:function(a){if(!a.idToken)throw new N("internal-error");
fh(a)},W:function(a){if(a.temporaryProof)throw a.code="credential-already-in-use",Lg(a);eh(a)}},Eg={Se:{USER_NOT_FOUND:"user-not-found"},endpoint:"verifyPhoneNumber",D:fh,W:eh},Q=function(a,b,c){if(!Yf(c,b.Xa))return F(new N("internal-error"));var d=b.ee||"POST",e;return E(c).then(b.D).then(function(){b.wa&&(c.returnSecureToken=!0);return Yg(a,b.endpoint,d,c,b.Se,b.Md||!1)}).then(function(a){return e=a}).then(b.W).then(function(){if(!b.Za)return e;if(!(b.Za in e))throw new N("internal-error");return e[b.Za]})},
Wg=function(a,b){var c=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var d={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(c=d[c]?new N(d[c]):null)return c;c=a.error&&a.error.message||"";d={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",
MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",INVALID_MESSAGE_PAYLOAD:"invalid-message-payload",INVALID_RECIPIENT_EMAIL:"invalid-recipient-email",INVALID_SENDER:"invalid-sender",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",
INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",CORS_UNSUPPORTED:"cors-unsupported",DYNAMIC_LINK_NOT_ACTIVATED:"dynamic-link-not-activated",INVALID_APP_ID:"invalid-app-id",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",OPERATION_NOT_ALLOWED:"operation-not-allowed",USER_CANCELLED:"user-cancelled",CAPTCHA_CHECK_FAILED:"captcha-check-failed",INVALID_APP_CREDENTIAL:"invalid-app-credential",INVALID_CODE:"invalid-verification-code",
INVALID_PHONE_NUMBER:"invalid-phone-number",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_APP_CREDENTIAL:"missing-app-credential",MISSING_CODE:"missing-verification-code",MISSING_PHONE_NUMBER:"missing-phone-number",MISSING_SESSION_INFO:"missing-verification-id",QUOTA_EXCEEDED:"quota-exceeded",SESSION_EXPIRED:"code-expired"};lb(d,b||{});b=(b=c.match(/^[^\s]+\s*:\s*(.*)$/))&&1<b.length?b[1]:void 0;for(var e in d)if(0===c.indexOf(e))return new N(d[e],
b);!b&&a&&(b=Jf(a));return new N("internal-error",b)};var Ch=function(a){this.C=a};Ch.prototype.value=function(){return this.C};Ch.prototype.ve=function(a){this.C.style=a;return this};Ch.prototype.getStyle=function(){return this.C.style};var Dh=function(a){this.C=a||{}};h=Dh.prototype;h.value=function(){return this.C};h.getUrl=function(){return this.C.url};h.ve=function(a){this.C.style=a;return this};h.getStyle=function(){return this.C.style};h.getId=function(){return this.C.id};h.getContext=function(){return this.C.context};var Fh=function(a){this.Wf=a;this.tc=null;this.rd=Eh(this)},Gh=function(a){var b=new Dh;b.C.where=document.body;b.C.url=a.Wf;b.C.messageHandlersFilter=L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER");b.C.attributes=b.C.attributes||{};(new Ch(b.C.attributes)).ve({position:"absolute",top:"-100px",width:"1px",height:"1px"});b.C.dontclear=!0;return b},Eh=function(a){return Hh().then(function(){return new D(function(b,c){L("gapi.iframes.getContext")().open(Gh(a).value(),function(d){a.tc=d;a.tc.restyle({setHideOnLeave:!1});
var e=setTimeout(function(){c(Error("Network Error"))},Ih.get()),f=function(){clearTimeout(e);b()};d.ping(f).then(f,function(){c(Error("Network Error"))})})})})};Fh.prototype.sendMessage=function(a){var b=this;return this.rd.then(function(){return new D(function(c){b.tc.send(a.type,a,c,L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})})};
var Jh=function(a,b){a.rd.then(function(){a.tc.register("authEvent",b,L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})},Kh=Ga("https://apis.google.com/js/api.js?onload=%{onload}"),Lh=new Pf(3E4,6E4),Ih=new Pf(5E3,15E3),Mh=null,Hh=function(){return Mh?Mh:Mh=(new D(function(a,b){if(Of()){var c=function(){Nf();L("gapi.load")("gapi.iframes",{callback:a,ontimeout:function(){Nf();b(Error("Network Error"))},timeout:Lh.get()})};if(L("gapi.iframes.Iframe"))a();else if(L("gapi.load"))c();else{var d="__iframefcb"+
Math.floor(1E6*Math.random()).toString();k[d]=function(){L("gapi.load")?c():b(Error("Network Error"))};d=La(Kh,{onload:d});E(be(d)).f(function(){b(Error("Network Error"))})}}else b(Error("Network Error"))})).f(function(a){Mh=null;throw a;})};var Nh=function(a,b,c){this.B=a;this.m=b;this.w=c;this.ab=null;this.gc=gf(this.B,"/__/auth/iframe");J(this.gc,"apiKey",this.m);J(this.gc,"appName",this.w)};Nh.prototype.Fd=function(a){this.ab=a;return this};Nh.prototype.toString=function(){this.ab?J(this.gc,"v",this.ab):this.gc.removeParameter("v");return this.gc.toString()};var Oh=function(a,b,c,d,e){this.B=a;this.m=b;this.w=c;this.Ne=d;this.ab=this.S=this.zd=null;this.Vb=e};Oh.prototype.Fd=function(a){this.ab=a;return this};
Oh.prototype.toString=function(){var a=gf(this.B,"/__/auth/handler");J(a,"apiKey",this.m);J(a,"appName",this.w);J(a,"authType",this.Ne);if(this.Vb.isOAuthProvider){J(a,"providerId",this.Vb.providerId);var b=this.Vb,c=Kf(b.Td),d;for(d in c)c[d]=c[d].toString();b=b.Gf;c=jb(c);for(d=0;d<b.length;d++){var e=b[d];e in c&&delete c[e]}hb(c)||J(a,"customParameters",Jf(c))}"function"===typeof this.Vb.ae&&(b=this.Vb.ae(),b.length&&J(a,"scopes",b.join(",")));this.zd?J(a,"redirectUrl",this.zd):a.removeParameter("redirectUrl");
this.S?J(a,"eventId",this.S):a.removeParameter("eventId");this.ab?J(a,"v",this.ab):a.removeParameter("v");if(this.ic)for(var f in this.ic)this.ic.hasOwnProperty(f)&&!ef(a,f)&&J(a,f,this.ic[f]);return a.toString()};
var Ph=function(a,b,c,d){this.B=a;this.m=b;this.w=c;this.$e=(this.Ga=d||null)?Ef(this.Ga):null;d=this.Ga;this.jf=(new Nh(a,b,c)).Fd(d).toString();this.pa=[];this.g=new R(b,null,this.$e);this.vc=this.sa=null},Qh=function(a){var b=nf();return dh(a).then(function(a){a:{for(var c=ff(b),e=c.ma,c=c.ka,f=0;f<a.length;f++){var g=a[f];var l=c;var n=e;0==g.indexOf("chrome-extension://")?l=ff(g).ka==l&&"chrome-extension"==n:"http"!=n&&"https"!=n?l=!1:wf.test(g)?l=l==g:(g=g.split(".").join("\\."),l=(new RegExp("^(.+\\."+
g+"|"+g+")$","i")).test(l));if(l){a=!0;break a}}a=!1}if(!a)throw new gg(nf());})};h=Ph.prototype;h.Lb=function(){if(this.vc)return this.vc;var a=this;return this.vc=xf().then(function(){a.sc=new Fh(a.jf);Rh(a)})};h.ac=function(a,b,c){var d=new N("popup-closed-by-user"),e=new N("web-storage-unsupported"),f=this,g=!1;return this.Na().then(function(){Sh(f).then(function(c){c||(a&&tf(a),b(e),g=!0)})}).f(function(){}).then(function(){if(!g)return vf(a)}).then(function(){if(!g)return Ae(c).then(function(){b(d)})})};
h.we=function(){var a=K();return!If(a)&&!Mf(a)};h.de=function(){return!1};h.Tb=function(a,b,c,d,e,f,g){if(!a)return F(new N("popup-blocked"));if(g&&!If())return this.Na().f(function(b){tf(a);e(b)}),d(),E();this.sa||(this.sa=Qh(this.g));var l=this;return this.sa.then(function(){var b=l.Na().f(function(b){tf(a);e(b);throw b;});d();return b}).then(function(){Jg(c);if(!g){var d=Th(l.B,l.m,l.w,b,c,null,f,l.Ga);of(d,a)}}).f(function(a){"auth/network-request-failed"==a.code&&(l.sa=null);throw a;})};
h.Ub=function(a,b,c){this.sa||(this.sa=Qh(this.g));var d=this;return this.sa.then(function(){Jg(b);var e=Th(d.B,d.m,d.w,a,b,nf(),c,d.Ga);of(e)}).f(function(a){"auth/network-request-failed"==a.code&&(d.sa=null);throw a;})};h.Na=function(){var a=this;return this.Lb().then(function(){return a.sc.rd}).f(function(){a.sa=null;throw new N("network-request-failed");})};h.ze=function(){return!0};
var Th=function(a,b,c,d,e,f,g,l,n){a=new Oh(a,b,c,d,e);a.zd=f;a.S=g;f=a.Fd(l);f.ic=jb(n||null);return f.toString()},Rh=function(a){if(!a.sc)throw Error("IfcHandler must be initialized!");Jh(a.sc,function(b){var c={};if(b&&b.authEvent){var d=!1;b=fg(b.authEvent);for(c=0;c<a.pa.length;c++)d=a.pa[c](b)||d;c={};c.status=d?"ACK":"ERROR";return E(c)}c.status="ERROR";return E(c)})},Sh=function(a){var b={type:"webStorageSupport"};return a.Lb().then(function(){return a.sc.sendMessage(b)}).then(function(a){if(a&&
a.length&&"undefined"!==typeof a[0].webStorageSupport)return a[0].webStorageSupport;throw Error();})};Ph.prototype.eb=function(a){this.pa.push(a)};Ph.prototype.Zb=function(a){Xa(this.pa,function(b){return b==a})};var Uh=function(a,b,c){M(this,"type","recaptcha");this.Vc=this.zb=null;this.Bb=!1;this.Rd=a;this.za=b||{theme:"light",type:"image"};this.J=[];if(this.za.sitekey)throw new N("argument-error","sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");this.wc="invisible"===this.za.size;if(!kd(a)||!this.wc&&kd(a).hasChildNodes())throw new N("argument-error","reCAPTCHA container is either not found or already contains inner elements!");try{this.h=c||firebase.app()}catch(g){throw new N("argument-error",
"No firebase.app.App instance is currently initialized.");}if(this.h.options&&this.h.options.apiKey)a=firebase.SDK_VERSION?Ef(firebase.SDK_VERSION):null,this.g=new R(this.h.options&&this.h.options.apiKey,null,a);else throw new N("invalid-api-key");var d=this;this.Qc=[];var e=this.za.callback;this.za.callback=function(a){d.Cb(a);if("function"===typeof e)e(a);else if("string"===typeof e){var b=L(e,k);"function"===typeof b&&b(a)}};var f=this.za["expired-callback"];this.za["expired-callback"]=function(){d.Cb(null);
if("function"===typeof f)f();else if("string"===typeof f){var a=L(f,k);"function"===typeof a&&a()}}};Uh.prototype.Cb=function(a){for(var b=0;b<this.Qc.length;b++)try{this.Qc[b](a)}catch(c){}};var Vh=function(a,b){Xa(a.Qc,function(a){return a==b})};Uh.prototype.c=function(a){var b=this;this.J.push(a);Cd(a,function(){Wa(b.J,a)});return a};
Uh.prototype.Mb=function(){var a=this;return this.zb?this.zb:this.zb=this.c(E().then(function(){if(Ff())return xf();throw new N("operation-not-supported-in-this-environment","RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.");}).then(function(){return Xh()}).then(function(){return Q(a.g,Ah,{})}).then(function(b){a.za.sitekey=b.recaptchaSiteKey}).f(function(b){a.zb=null;throw b;}))};
Uh.prototype.render=function(){Yh(this);var a=this;return this.c(this.Mb().then(function(){if(null===a.Vc){var b=a.Rd;if(!a.wc){var c=kd(b),b=od("DIV");c.appendChild(b)}a.Vc=grecaptcha.render(b,a.za)}return a.Vc}))};Uh.prototype.verify=function(){Yh(this);var a=this;return this.c(this.render().then(function(b){return new D(function(c){var d=grecaptcha.getResponse(b);if(d)c(d);else{var e=function(b){b&&(Vh(a,e),c(b))};a.Qc.push(e);a.wc&&grecaptcha.execute(a.Vc)}})}))};
var Yh=function(a){if(a.Bb)throw new N("internal-error","RecaptchaVerifier instance has been destroyed.");};Uh.prototype.clear=function(){Yh(this);this.Bb=!0;for(var a=0;a<this.J.length;a++)this.J[a].cancel("RecaptchaVerifier instance has been destroyed.");if(!this.wc)for(var a=kd(this.Rd),b;b=a.firstChild;)a.removeChild(b)};
var Zh=Ga("https://www.google.com/recaptcha/api.js?onload=%{onload}&render=explicit"),Xh=function(){return new D(function(a,b){if(Of())if(k.grecaptcha)a();else{var c="__rcb"+Math.floor(1E6*Math.random()).toString();k[c]=function(){k.grecaptcha?a():b(new N("internal-error"));delete k[c]};var d=La(Zh,{onload:c});E(be(d)).f(function(){b(new N("internal-error","Unable to load external reCAPTCHA dependencies!"))})}else b(new N("network-request-failed"))})};var $h=function(a){this.F=a||firebase.INTERNAL.reactNative&&firebase.INTERNAL.reactNative.AsyncStorage;if(!this.F)throw new N("internal-error","The React Native compatibility library was not found.");};h=$h.prototype;h.get=function(a){return E(this.F.getItem(a)).then(function(a){return a&&Lf(a)})};h.set=function(a,b){return E(this.F.setItem(a,Jf(b)))};h.remove=function(a){return E(this.F.removeItem(a))};h.fb=function(){};h.Wa=function(){};var ai=function(){this.F={}};h=ai.prototype;h.get=function(a){return E(this.F[a])};h.set=function(a,b){this.F[a]=b;return E()};h.remove=function(a){delete this.F[a];return E()};h.fb=function(){};h.Wa=function(){};var ci=function(){if(!bi()){if("Node"==Cf())throw new N("internal-error","The LocalStorage compatibility library was not found.");throw new N("web-storage-unsupported");}this.F=k.localStorage||firebase.INTERNAL.node.localStorage},bi=function(){var a="Node"==Cf(),a=k.localStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.localStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=ci.prototype;
h.get=function(a){var b=this;return E().then(function(){var c=b.F.getItem(a);return Lf(c)})};h.set=function(a,b){var c=this;return E().then(function(){var d=Jf(b);null===d?c.remove(a):c.F.setItem(a,d)})};h.remove=function(a){var b=this;return E().then(function(){b.F.removeItem(a)})};h.fb=function(a){k.window&&jc(k.window,"storage",a)};h.Wa=function(a){k.window&&rc(k.window,"storage",a)};var di=function(){this.F={}};h=di.prototype;h.get=function(){return E(null)};h.set=function(){return E()};h.remove=function(){return E()};h.fb=function(){};h.Wa=function(){};var fi=function(){if(!ei()){if("Node"==Cf())throw new N("internal-error","The SessionStorage compatibility library was not found.");throw new N("web-storage-unsupported");}this.F=k.sessionStorage||firebase.INTERNAL.node.sessionStorage},ei=function(){var a="Node"==Cf(),a=k.sessionStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.sessionStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=fi.prototype;
h.get=function(a){var b=this;return E().then(function(){var c=b.F.getItem(a);return Lf(c)})};h.set=function(a,b){var c=this;return E().then(function(){var d=Jf(b);null===d?c.remove(a):c.F.setItem(a,d)})};h.remove=function(a){var b=this;return E().then(function(){b.F.removeItem(a)})};h.fb=function(){};h.Wa=function(){};var gi=function(a,b,c,d,e,f){if(!window.indexedDB)throw new N("web-storage-unsupported");this.Te=a;this.qd=b;this.cd=c;this.De=d;this.bb=e;this.aa={};this.bc=[];this.Pb=0;this.kf=f||k.indexedDB},hi,ii=function(a){return new D(function(b,c){var d=a.kf.open(a.Te,a.bb);d.onerror=function(a){c(Error(a.target.errorCode))};d.onupgradeneeded=function(b){b=b.target.result;try{b.createObjectStore(a.qd,{keyPath:a.cd})}catch(f){c(f)}};d.onsuccess=function(a){b(a.target.result)}})},ji=function(a){a.he||(a.he=
ii(a));return a.he},ki=function(a,b){return b.objectStore(a.qd)},li=function(a,b,c){return b.transaction([a.qd],c?"readwrite":"readonly")},mi=function(a){return new D(function(b,c){a.onsuccess=function(a){a&&a.target?b(a.target.result):b()};a.onerror=function(a){c(Error(a.target.errorCode))}})};h=gi.prototype;
h.set=function(a,b){var c=!1,d,e=this;return Cd(ji(this).then(function(b){d=b;b=ki(e,li(e,d,!0));return mi(b.get(a))}).then(function(f){var g=ki(e,li(e,d,!0));if(f)return f.value=b,mi(g.put(f));e.Pb++;c=!0;f={};f[e.cd]=a;f[e.De]=b;return mi(g.add(f))}).then(function(){e.aa[a]=b}),function(){c&&e.Pb--})};h.get=function(a){var b=this;return ji(this).then(function(c){return mi(ki(b,li(b,c,!1)).get(a))}).then(function(a){return a&&a.value})};
h.remove=function(a){var b=!1,c=this;return Cd(ji(this).then(function(d){b=!0;c.Pb++;return mi(ki(c,li(c,d,!0))["delete"](a))}).then(function(){delete c.aa[a]}),function(){b&&c.Pb--})};
h.Sf=function(){var a=this;return ji(this).then(function(b){var c=ki(a,li(a,b,!1));return c.getAll?mi(c.getAll()):new D(function(a,b){var d=[],e=c.openCursor();e.onsuccess=function(b){(b=b.target.result)?(d.push(b.value),b["continue"]()):a(d)};e.onerror=function(a){b(Error(a.target.errorCode))}})}).then(function(b){var c={},d=[];if(0==a.Pb){for(d=0;d<b.length;d++)c[b[d][a.cd]]=b[d][a.De];d=pf(a.aa,c);a.aa=c}return d})};h.fb=function(a){0==this.bc.length&&this.Hd();this.bc.push(a)};
h.Wa=function(a){Xa(this.bc,function(b){return b==a});0==this.bc.length&&this.Lc()};h.Hd=function(){var a=this;this.Lc();var b=function(){a.ud=Ae(800).then(t(a.Sf,a)).then(function(b){0<b.length&&y(a.bc,function(a){a(b)})}).then(b).f(function(a){"STOP_EVENT"!=a.message&&b()});return a.ud};b()};h.Lc=function(){this.ud&&this.ud.cancel("STOP_EVENT")};var qi=function(){this.Vd={Browser:ni,Node:oi,ReactNative:pi}[Cf()]},ri,ni={V:ci,Jd:fi},oi={V:ci,Jd:fi},pi={V:$h,Jd:di};var si=function(a,b){this.Re=b;M(this,"verificationId",a)};si.prototype.confirm=function(a){a=Hg(this.verificationId,a);return this.Re(a)};var ti=function(a,b,c,d){return(new Fg(a)).verifyPhoneNumber(b,c).then(function(a){return new si(a,d)})};var ui=function(a){var b={},c=a.email,d=a.newEmail;a=a.requestType;if(!c||!a)throw Error("Invalid provider user info!");b.fromEmail=d||null;b.email=c;M(this,"operation",a);M(this,"data",Zf(b))};var vi=function(a,b,c,d,e,f){this.Af=a;this.If=b;this.cf=c;this.Ac=d;this.Kd=e;this.Jf=!!f;this.nb=null;this.Oa=this.Ac;if(this.Kd<this.Ac)throw Error("Proactive refresh lower bound greater than upper bound!");};vi.prototype.start=function(){this.Oa=this.Ac;wi(this,!0)};
var xi=function(a,b){if(b)return a.Oa=a.Ac,a.cf();b=a.Oa;a.Oa*=2;a.Oa>a.Kd&&(a.Oa=a.Kd);return b},wi=function(a,b){a.stop();a.nb=Ae(xi(a,b)).then(function(){return a.Jf?E():Rf()}).then(function(){return a.Af()}).then(function(){wi(a,!0)}).f(function(b){a.If(b)&&wi(a,!1)})};vi.prototype.stop=function(){this.nb&&(this.nb.cancel(),this.nb=null)};var Di=function(a){var b={};b["facebook.com"]=yi;b["google.com"]=zi;b["github.com"]=Ai;b["twitter.com"]=Bi;var c=a&&a.providerId;return c?b[c]?new b[c](a):new Ci(a):null},Ci=function(a){var b=Lf(a.rawUserInfo||"{}");a=a.providerId;if(!a)throw Error("Invalid additional user info!");M(this,"profile",Zf(b||{}));M(this,"providerId",a)},yi=function(a){Ci.call(this,a);if("facebook.com"!=this.providerId)throw Error("Invalid provider id!");};u(yi,Ci);
var Ai=function(a){Ci.call(this,a);if("github.com"!=this.providerId)throw Error("Invalid provider id!");M(this,"username",this.profile&&this.profile.login||null)};u(Ai,Ci);var zi=function(a){Ci.call(this,a);if("google.com"!=this.providerId)throw Error("Invalid provider id!");};u(zi,Ci);var Bi=function(a){Ci.call(this,a);if("twitter.com"!=this.providerId)throw Error("Invalid provider id!");M(this,"username",a.screenName||null)};u(Bi,Ci);var Ei=function(a,b,c,d){this.le=a;this.Cd=b;this.Kf=c;this.$b=d;this.T={};ri||(ri=new qi);a=ri;try{if(mf()){hi||(hi=new gi("firebaseLocalStorageDb","firebaseLocalStorage","fbase_key","value",1));var e=hi}else e=new a.Vd.V;this.Sa=e}catch(f){this.Sa=new ai,this.$b=!0}try{this.Oc=new a.Vd.Jd}catch(f){this.Oc=new ai}this.Id=t(this.xe,this);this.aa={}},Fi,Gi=function(){Fi||(Fi=new Ei("firebase",":",!Mf(K())&&Bf()?!0:!1,If()));return Fi};h=Ei.prototype;
h.Z=function(a,b){return this.le+this.Cd+a.name+(b?this.Cd+b:"")};h.get=function(a,b){return(a.V?this.Sa:this.Oc).get(this.Z(a,b))};h.remove=function(a,b){b=this.Z(a,b);a.V&&!this.$b&&(this.aa[b]=null);return(a.V?this.Sa:this.Oc).remove(b)};h.set=function(a,b,c){var d=this.Z(a,c),e=this,f=a.V?this.Sa:this.Oc;return f.set(d,b).then(function(){return f.get(d)}).then(function(b){a.V&&!this.$b&&(e.aa[d]=b)})};
h.addListener=function(a,b,c){a=this.Z(a,b);this.$b||(this.aa[a]=k.localStorage.getItem(a));hb(this.T)&&this.Hd();this.T[a]||(this.T[a]=[]);this.T[a].push(c)};h.removeListener=function(a,b,c){a=this.Z(a,b);this.T[a]&&(Xa(this.T[a],function(a){return a==c}),0==this.T[a].length&&delete this.T[a]);hb(this.T)&&this.Lc()};h.Hd=function(){this.Sa.fb(this.Id);this.$b||mf()||Hi(this)};
var Hi=function(a){Ii(a);a.od=setInterval(function(){for(var b in a.T){var c=k.localStorage.getItem(b),d=a.aa[b];c!=d&&(a.aa[b]=c,c=new Yb({type:"storage",key:b,target:window,oldValue:d,newValue:c,pe:!0}),a.xe(c))}},1E3)},Ii=function(a){a.od&&(clearInterval(a.od),a.od=null)};Ei.prototype.Lc=function(){this.Sa.Wa(this.Id);Ii(this)};
Ei.prototype.xe=function(a){if(a&&a.af){var b=a.la.key;if(0==b.indexOf(this.le+this.Cd)&&this.T[b]){"undefined"!==typeof a.la.pe?this.Sa.Wa(this.Id):Ii(this);if(this.Kf){var c=k.localStorage.getItem(b),d=a.la.newValue;if(d!==c)null!==d?k.localStorage.setItem(b,d):k.localStorage.removeItem(b);else if(this.aa[b]===d&&"undefined"===typeof a.la.pe)return}this.aa[b]=k.localStorage.getItem(b);this.Od(b)}}else y(a,t(this.Od,this))};Ei.prototype.Od=function(a){this.T[a]&&y(this.T[a],function(a){a()})};var Ji=function(a,b){this.v=a;this.l=b||Gi()},Ki={name:"authEvent",V:!0},Li=function(a){return a.l.get(Ki,a.v).then(function(a){return fg(a)})};Ji.prototype.eb=function(a){this.l.addListener(Ki,this.v,a)};Ji.prototype.Zb=function(a){this.l.removeListener(Ki,this.v,a)};var Mi=function(a){this.l=a||Gi()},Ni={name:"sessionId",V:!1};Mi.prototype.oc=function(a){return this.l.get(Ni,a)};var Oi=function(a,b,c,d,e,f){this.B=a;this.m=b;this.w=c;this.Ga=d||null;this.ye=b+":"+c;this.Lf=new Mi;this.$d=new Ji(this.ye);this.md=null;this.pa=[];this.pf=e||500;this.Ef=f||2E3;this.Kb=this.Dc=null},Pi=function(a){return new N("invalid-cordova-configuration",a)};
Oi.prototype.Na=function(){return this.Mb?this.Mb:this.Mb=zf().then(function(){if("function"!==typeof L("universalLinks.subscribe",k))throw Pi("cordova-universal-links-plugin is not installed");if("undefined"===typeof L("BuildInfo.packageName",k))throw Pi("cordova-plugin-buildinfo is not installed");if("function"!==typeof L("cordova.plugins.browsertab.openUrl",k))throw Pi("cordova-plugin-browsertab is not installed");if("function"!==typeof L("cordova.InAppBrowser.open",k))throw Pi("cordova-plugin-inappbrowser is not installed");
},function(){throw new N("cordova-not-ready");})};var Qi=function(){for(var a=20,b=[];0<a;)b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62*Math.random()))),a--;return b.join("")},Ri=function(a){var b=new Rb;b.update(a);return $a(b.digest())};h=Oi.prototype;h.ac=function(a,b){b(new N("operation-not-supported-in-this-environment"));return E()};h.Tb=function(){return F(new N("operation-not-supported-in-this-environment"))};h.ze=function(){return!1};h.we=function(){return!0};
h.de=function(){return!0};
h.Ub=function(a,b,c){if(this.Dc)return F(new N("redirect-operation-pending"));var d=this,e=k.document,f=null,g=null,l=null,n=null;return this.Dc=Cd(E().then(function(){Jg(b);return Si(d)}).then(function(){return Ti(d,a,b,c)}).then(function(){return(new D(function(a,b){g=function(){var b=L("cordova.plugins.browsertab.close",k);a();"function"===typeof b&&b();d.Kb&&"function"===typeof d.Kb.close&&(d.Kb.close(),d.Kb=null);return!1};d.eb(g);l=function(){f||(f=Ae(d.Ef).then(function(){b(new N("redirect-cancelled-by-user"))}))};n=
function(){Qf()&&l()};e.addEventListener("resume",l,!1);K().toLowerCase().match(/android/)||e.addEventListener("visibilitychange",n,!1)})).f(function(a){return Ui(d).then(function(){throw a;})})}),function(){l&&e.removeEventListener("resume",l,!1);n&&e.removeEventListener("visibilitychange",n,!1);f&&f.cancel();g&&d.Zb(g);d.Dc=null})};
var Ti=function(a,b,c,d){var e=Qi(),f=new O(b,d,null,e,new N("no-auth-event")),g=L("BuildInfo.packageName",k);if("string"!==typeof g)throw new N("invalid-cordova-configuration");var l=L("BuildInfo.displayName",k),n={};if(K().toLowerCase().match(/iphone|ipad|ipod/))n.ibi=g;else if(K().toLowerCase().match(/android/))n.apn=g;else return F(new N("operation-not-supported-in-this-environment"));l&&(n.appDisplayName=l);e=Ri(e);n.sessionId=e;var C=Th(a.B,a.m,a.w,b,c,null,d,a.Ga,n);return a.Na().then(function(){var b=
a.ye;return a.Lf.l.set(Ki,f.G(),b)}).then(function(){var b=L("cordova.plugins.browsertab.isAvailable",k);if("function"!==typeof b)throw new N("invalid-cordova-configuration");var c=null;b(function(b){if(b){c=L("cordova.plugins.browsertab.openUrl",k);if("function"!==typeof c)throw new N("invalid-cordova-configuration");c(C)}else{c=L("cordova.InAppBrowser.open",k);if("function"!==typeof c)throw new N("invalid-cordova-configuration");b=c;var d=K();d=!(!d.match(/(iPad|iPhone|iPod).*OS 7_\d/i)&&!d.match(/(iPad|iPhone|iPod).*OS 8_\d/i));
a.Kb=b(C,d?"_blank":"_system","location=yes")}})})};Oi.prototype.Cb=function(a){for(var b=0;b<this.pa.length;b++)try{this.pa[b](a)}catch(c){}};
var Si=function(a){a.md||(a.md=a.Na().then(function(){return new D(function(b){var c=function(d){b(d);a.Zb(c);return!1};a.eb(c);Vi(a)})}));return a.md},Ui=function(a){var b=null;return Li(a.$d).then(function(c){b=c;c=a.$d;return c.l.remove(Ki,c.v)}).then(function(){return b})},Vi=function(a){var b=L("universalLinks.subscribe",k);if("function"!==typeof b)throw new N("invalid-cordova-configuration");var c=new O("unknown",null,null,null,new N("no-auth-event")),d=!1,e=Ae(a.pf).then(function(){return Ui(a).then(function(){d||
a.Cb(c)})}),f=function(b){d=!0;e&&e.cancel();Ui(a).then(function(d){var e=c;if(d&&b&&b.url){var e=null;var f=b.url;var g=ff(f),l=ef(g,"link"),n=ef(ff(l),"link"),g=ef(g,"deep_link_id");f=ef(ff(g),"link")||g||n||l||f;-1!=f.indexOf("/__/auth/callback")&&(e=ff(f),e=Lf(ef(e,"firebaseError")||null),e=(e="object"===typeof e?eg(e):null)?new O(d.ia,d.S,null,null,e):new O(d.ia,d.S,f,d.oc()));e=e||c}a.Cb(e)})},g=k.handleOpenURL;k.handleOpenURL=function(a){0==a.toLowerCase().indexOf(L("BuildInfo.packageName",
k).toLowerCase()+"://")&&f({url:a});if("function"===typeof g)try{g(a)}catch(n){console.error(n)}};b(null,f)};Oi.prototype.eb=function(a){this.pa.push(a);Si(this).f(function(b){"auth/invalid-cordova-configuration"===b.code&&(b=new O("unknown",null,null,null,new N("no-auth-event")),a(b))})};Oi.prototype.Zb=function(a){Xa(this.pa,function(b){return b==a})};var Wi=function(a){this.v=a;this.l=Gi()},Xi={name:"pendingRedirect",V:!1},Yi=function(a){return a.l.set(Xi,"pending",a.v)},Zi=function(a){return a.l.remove(Xi,a.v)},$i=function(a){return a.l.get(Xi,a.v).then(function(a){return"pending"==a})};var dj=function(a,b,c){this.B=a;this.m=b;this.w=c;this.cc=[];this.lb=!1;this.Zc=t(this.jd,this);this.Ua=new aj(this);this.vd=new bj(this);this.Qb=new Wi(this.m+":"+this.w);this.Ca={};this.Ca.unknown=this.Ua;this.Ca.signInViaRedirect=this.Ua;this.Ca.linkViaRedirect=this.Ua;this.Ca.reauthViaRedirect=this.Ua;this.Ca.signInViaPopup=this.vd;this.Ca.linkViaPopup=this.vd;this.Ca.reauthViaPopup=this.vd;this.U=cj(this.B,this.m,this.w)},cj=function(a,b,c){var d=firebase.SDK_VERSION||null;return yf()?new Oi(a,
b,c,d):new Ph(a,b,c,d)};dj.prototype.reset=function(){this.lb=!1;this.U.Zb(this.Zc);this.U=cj(this.B,this.m,this.w)};dj.prototype.Lb=function(){var a=this;this.lb||(this.lb=!0,this.U.eb(this.Zc));var b=this.U;return this.U.Na().f(function(c){a.U==b&&a.reset();throw c;})};var gj=function(a){a.U.we()&&a.Lb().f(function(b){var c=new O("unknown",null,null,null,new N("operation-not-supported-in-this-environment"));ej(b)&&a.jd(c)});a.U.de()||fj(a.Ua)};
dj.prototype.subscribe=function(a){Ua(this.cc,a)||this.cc.push(a);if(!this.lb){var b=this;$i(this.Qb).then(function(a){a?Zi(b.Qb).then(function(){b.Lb().f(function(a){var c=new O("unknown",null,null,null,new N("operation-not-supported-in-this-environment"));ej(a)&&b.jd(c)})}):gj(b)}).f(function(){gj(b)})}};dj.prototype.unsubscribe=function(a){Xa(this.cc,function(b){return b==a})};
dj.prototype.jd=function(a){if(!a)throw new N("invalid-auth-event");for(var b=!1,c=0;c<this.cc.length;c++){var d=this.cc[c];if(d.Pd(a.ia,a.S)){(b=this.Ca[a.ia])&&b.qe(a,d);b=!0;break}}fj(this.Ua);return b};var hj=new Pf(2E3,1E4),ij=new Pf(3E4,6E4);dj.prototype.getRedirectResult=function(){return this.Ua.getRedirectResult()};dj.prototype.Tb=function(a,b,c,d,e){var f=this;return this.U.Tb(a,b,c,function(){f.lb||(f.lb=!0,f.U.eb(f.Zc))},function(){f.reset()},d,e)};
var ej=function(a){return a&&"auth/cordova-not-ready"==a.code?!0:!1};dj.prototype.Ub=function(a,b,c){var d=this,e;return Yi(this.Qb).then(function(){return d.U.Ub(a,b,c).f(function(a){if(ej(a))throw new N("operation-not-supported-in-this-environment");e=a;return Zi(d.Qb).then(function(){throw e;})}).then(function(){return d.U.ze()?new D(function(){}):Zi(d.Qb).then(function(){return d.getRedirectResult()}).then(function(){}).f(function(){})})})};
dj.prototype.ac=function(a,b,c,d){return this.U.ac(c,function(c){a.Ya(b,null,c,d)},hj.get())};var jj={},kj=function(a,b,c){var d=b+":"+c;jj[d]||(jj[d]=new dj(a,b,c));return jj[d]},aj=function(a){this.l=a;this.sb=null;this.Xb=[];this.Wb=[];this.qb=null;this.yd=!1};aj.prototype.reset=function(){this.sb=null;this.qb&&(this.qb.cancel(),this.qb=null)};
aj.prototype.qe=function(a,b){if(!a)return F(new N("invalid-auth-event"));this.reset();this.yd=!0;var c=a.ia,d=a.S,e=a.getError()&&"auth/web-storage-unsupported"==a.getError().code,f=a.getError()&&"auth/operation-not-supported-in-this-environment"==a.getError().code;"unknown"!=c||e||f?a=a.Y?this.wd(a,b):b.Eb(c,d)?this.xd(a,b):F(new N("invalid-auth-event")):(lj(this,!1,null,null),a=E());return a};var fj=function(a){a.yd||(a.yd=!0,lj(a,!1,null,null))};
aj.prototype.wd=function(a){lj(this,!0,null,a.getError());return E()};aj.prototype.xd=function(a,b){var c=this;b=b.Eb(a.ia,a.S);var d=a.vb,e=a.oc(),f=!!a.ia.match(/Redirect$/);return b(d,e).then(function(a){lj(c,f,a,null)}).f(function(a){lj(c,f,null,a)})};
var mj=function(a,b){a.sb=function(){return F(b)};if(a.Wb.length)for(var c=0;c<a.Wb.length;c++)a.Wb[c](b)},nj=function(a,b){a.sb=function(){return E(b)};if(a.Xb.length)for(var c=0;c<a.Xb.length;c++)a.Xb[c](b)},lj=function(a,b,c,d){b?d?mj(a,d):nj(a,c):nj(a,{user:null});a.Xb=[];a.Wb=[]};aj.prototype.getRedirectResult=function(){var a=this;return new D(function(b,c){a.sb?a.sb().then(b,c):(a.Xb.push(b),a.Wb.push(c),oj(a))})};
var oj=function(a){var b=new N("timeout");a.qb&&a.qb.cancel();a.qb=Ae(ij.get()).then(function(){a.sb||lj(a,!0,null,b)})},bj=function(a){this.l=a};bj.prototype.qe=function(a,b){if(!a)return F(new N("invalid-auth-event"));var c=a.ia,d=a.S;return a.Y?this.wd(a,b):b.Eb(c,d)?this.xd(a,b):F(new N("invalid-auth-event"))};bj.prototype.wd=function(a,b){b.Ya(a.ia,null,a.getError(),a.S);return E()};
bj.prototype.xd=function(a,b){var c=a.S,d=a.ia,e=b.Eb(d,c),f=a.vb;a=a.oc();return e(f,a).then(function(a){b.Ya(d,a,null,c)}).f(function(a){b.Ya(d,null,a,c)})};var pj=function(a){this.g=a;this.Da=this.ca=null;this.Ja=0};pj.prototype.G=function(){return{apiKey:this.g.m,refreshToken:this.ca,accessToken:this.Da,expirationTime:this.Ja}};
var rj=function(a,b){var c=b.idToken,d=b.refreshToken;b=qj(b.expiresIn);a.Da=c;a.Ja=b;a.ca=d},qj=function(a){return la()+1E3*parseInt(a,10)},sj=function(a,b){return Xg(a.g,b).then(function(b){a.Da=b.access_token;a.Ja=qj(b.expires_in);a.ca=b.refresh_token;return{accessToken:a.Da,expirationTime:a.Ja,refreshToken:a.ca}}).f(function(b){"auth/user-token-expired"==b.code&&(a.ca=null);throw b;})};
pj.prototype.getToken=function(a){a=!!a;return this.Da&&!this.ca?F(new N("user-token-expired")):a||!this.Da||la()>this.Ja-3E4?this.ca?sj(this,{grant_type:"refresh_token",refresh_token:this.ca}):E(null):E({accessToken:this.Da,expirationTime:this.Ja,refreshToken:this.ca})};var tj=function(a,b,c,d,e){Vf(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,providerId:b})},uj=function(a,b){Wb.call(this,a);for(var c in b)this[c]=b[c]};u(uj,Wb);
var S=function(a,b,c){this.J=[];this.m=a.apiKey;this.w=a.appName;this.B=a.authDomain||null;a=firebase.SDK_VERSION?Ef(firebase.SDK_VERSION):null;this.g=new R(this.m,null,a);this.na=new pj(this.g);vj(this,b.idToken);rj(this.na,b);M(this,"refreshToken",this.na.ca);wj(this,c||{});oe.call(this);this.Ec=!1;this.B&&Hf()&&(this.s=kj(this.B,this.m,this.w));this.Kc=[];this.oa=null;this.pb=xj(this);this.xb=t(this.kd,this)};u(S,oe);S.prototype.kd=function(){this.pb.nb&&(this.pb.stop(),this.pb.start())};
var yj=function(a){try{return firebase.app(a.w).auth()}catch(b){throw new N("internal-error","No firebase.auth.Auth instance is available for the Firebase App '"+a.w+"'!");}},xj=function(a){return new vi(function(){return a.getIdToken(!0)},function(a){return a&&"auth/network-request-failed"==a.code?!0:!1},function(){var b=a.na.Ja-la()-3E5;return 0<b?b:0},3E4,96E4,!1)},zj=function(a){a.Bb||a.pb.nb||(a.pb.start(),rc(a,"tokenChanged",a.xb),jc(a,"tokenChanged",a.xb))},Aj=function(a){rc(a,"tokenChanged",
a.xb);a.pb.stop()},vj=function(a,b){a.ie=b;M(a,"_lat",b)},Bj=function(a,b){Xa(a.Kc,function(a){return a==b})},Cj=function(a){for(var b=[],c=0;c<a.Kc.length;c++)b.push(a.Kc[c](a));return zd(b).then(function(){return a})},Dj=function(a){a.s&&!a.Ec&&(a.Ec=!0,a.s.subscribe(a))},wj=function(a,b){Vf(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,phoneNumber:b.phoneNumber||null,isAnonymous:b.isAnonymous||!1,providerData:[]})};
M(S.prototype,"providerId","firebase");var Ej=function(){},Fj=function(a){return E().then(function(){if(a.Bb)throw new N("app-deleted");})},Gj=function(a){return Qa(a.providerData,function(a){return a.providerId})},Ij=function(a,b){b&&(Hj(a,b.providerId),a.providerData.push(b))},Hj=function(a,b){Xa(a.providerData,function(a){return a.providerId==b})},Jj=function(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&M(a,b,c)};
S.prototype.copy=function(a){var b=this;b!=a&&(Vf(this,{uid:a.uid,displayName:a.displayName,photoURL:a.photoURL,email:a.email,emailVerified:a.emailVerified,phoneNumber:a.phoneNumber,isAnonymous:a.isAnonymous,providerData:[]}),y(a.providerData,function(a){Ij(b,a)}),this.na=a.na,M(this,"refreshToken",this.na.ca))};S.prototype.reload=function(){var a=this;return this.c(Fj(this).then(function(){return Kj(a).then(function(){return Cj(a)}).then(Ej)}))};
var Kj=function(a){return a.getIdToken().then(function(b){var c=a.isAnonymous;return Lj(a,b).then(function(){c||Jj(a,"isAnonymous",!1);return b})})};S.prototype.getIdToken=function(a){var b=this;return this.c(Fj(this).then(function(){return b.na.getToken(a)}).then(function(a){if(!a)throw new N("internal-error");a.accessToken!=b.ie&&(vj(b,a.accessToken),b.Pa());Jj(b,"refreshToken",a.refreshToken);return a.accessToken}))};
S.prototype.getToken=function(a){Sf["firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."]||(Sf["firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."]=!0,"undefined"!==typeof console&&"function"===typeof console.warn&&console.warn("firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."));return this.getIdToken(a)};
var Mj=function(a,b){b.idToken&&a.ie!=b.idToken&&(rj(a.na,b),a.Pa(),vj(a,b.idToken),Jj(a,"refreshToken",a.na.ca))};S.prototype.Pa=function(){this.dispatchEvent(new uj("tokenChanged"))};var Lj=function(a,b){return Q(a.g,zh,{idToken:b}).then(t(a.Bf,a))};
S.prototype.Bf=function(a){a=a.users;if(!a||!a.length)throw new N("internal-error");a=a[0];wj(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified,phoneNumber:a.phoneNumber});for(var b=Nj(a),c=0;c<b.length;c++)Ij(this,b[c]);Jj(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
var Nj=function(a){return(a=a.providerUserInfo)&&a.length?Qa(a,function(a){return new tj(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl)}):[]};S.prototype.reauthenticateAndRetrieveDataWithCredential=function(a){var b=this,c=null;return this.c(a.pd(this.g,this.uid).then(function(a){Mj(b,a);c=Oj(b,a,"reauthenticate");b.oa=null;return b.reload()}).then(function(){return c}),!0)};S.prototype.reauthenticateWithCredential=function(a){return this.reauthenticateAndRetrieveDataWithCredential(a).then(function(){})};
var Pj=function(a,b){return Kj(a).then(function(){if(Ua(Gj(a),b))return Cj(a).then(function(){throw new N("provider-already-linked");})})};S.prototype.linkAndRetrieveDataWithCredential=function(a){var b=this,c=null;return this.c(Pj(this,a.providerId).then(function(){return b.getIdToken()}).then(function(c){return a.zc(b.g,c)}).then(function(a){c=Oj(b,a,"link");return Qj(b,a)}).then(function(){return c}))};S.prototype.linkWithCredential=function(a){return this.linkAndRetrieveDataWithCredential(a).then(function(a){return a.user})};
S.prototype.linkWithPhoneNumber=function(a,b){var c=this;return this.c(Pj(this,"phone").then(function(){return ti(yj(c),a,b,t(c.linkAndRetrieveDataWithCredential,c))}))};S.prototype.reauthenticateWithPhoneNumber=function(a,b){var c=this;return this.c(E().then(function(){return ti(yj(c),a,b,t(c.reauthenticateAndRetrieveDataWithCredential,c))}),!0)};var Oj=function(a,b,c){var d=Ig(b);b=Di(b);return Wf({user:a,credential:d,additionalUserInfo:b,operationType:c})},Qj=function(a,b){Mj(a,b);return a.reload().then(function(){return a})};
h=S.prototype;h.updateEmail=function(a){var b=this;return this.c(this.getIdToken().then(function(c){return b.g.updateEmail(c,a)}).then(function(a){Mj(b,a);return b.reload()}))};h.updatePhoneNumber=function(a){var b=this;return this.c(this.getIdToken().then(function(c){return a.zc(b.g,c)}).then(function(a){Mj(b,a);return b.reload()}))};h.updatePassword=function(a){var b=this;return this.c(this.getIdToken().then(function(c){return b.g.updatePassword(c,a)}).then(function(a){Mj(b,a);return b.reload()}))};
h.updateProfile=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return Fj(this);var b=this;return this.c(this.getIdToken().then(function(c){return b.g.updateProfile(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){Mj(b,a);Jj(b,"displayName",a.displayName||null);Jj(b,"photoURL",a.photoUrl||null);y(b.providerData,function(a){"password"===a.providerId&&(M(a,"displayName",b.displayName),M(a,"photoURL",b.photoURL))});return Cj(b)}).then(Ej))};
h.unlink=function(a){var b=this;return this.c(Kj(this).then(function(c){return Ua(Gj(b),a)?nh(b.g,c,[a]).then(function(a){var c={};y(a.providerUserInfo||[],function(a){c[a.providerId]=!0});y(Gj(b),function(a){c[a]||Hj(b,a)});c[Fg.PROVIDER_ID]||M(b,"phoneNumber",null);return Cj(b)}):Cj(b).then(function(){throw new N("no-such-provider");})}))};
h["delete"]=function(){var a=this;return this.c(this.getIdToken().then(function(b){return Q(a.g,yh,{idToken:b})}).then(function(){a.dispatchEvent(new uj("userDeleted"))})).then(function(){for(var b=0;b<a.J.length;b++)a.J[b].cancel("app-deleted");a.J=[];a.Bb=!0;Aj(a);M(a,"refreshToken",null);a.s&&a.s.unsubscribe(a)})};
h.Pd=function(a,b){return"linkViaPopup"==a&&(this.ha||null)==b&&this.ga||"reauthViaPopup"==a&&(this.ha||null)==b&&this.ga||"linkViaRedirect"==a&&(this.Ba||null)==b||"reauthViaRedirect"==a&&(this.Ba||null)==b?!0:!1};h.Ya=function(a,b,c,d){"linkViaPopup"!=a&&"reauthViaPopup"!=a||d!=(this.ha||null)||(c&&this.Ra?this.Ra(c):b&&!c&&this.ga&&this.ga(b),this.K&&(this.K.cancel(),this.K=null),delete this.ga,delete this.Ra)};
h.Eb=function(a,b){return"linkViaPopup"==a&&b==(this.ha||null)?t(this.Xd,this):"reauthViaPopup"==a&&b==(this.ha||null)?t(this.Yd,this):"linkViaRedirect"==a&&(this.Ba||null)==b?t(this.Xd,this):"reauthViaRedirect"==a&&(this.Ba||null)==b?t(this.Yd,this):null};h.nc=function(){return Gf(this.uid+":::")};h.linkWithPopup=function(a){var b=this;return Rj(this,"linkViaPopup",a,function(){return Pj(b,a.providerId).then(function(){return Cj(b)})},!1)};
h.reauthenticateWithPopup=function(a){return Rj(this,"reauthViaPopup",a,function(){return E()},!0)};
var Rj=function(a,b,c,d,e){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));if(a.oa&&!e)return F(a.oa);var f=cg(c.providerId),g=a.nc(),l=null;(!If()||Bf())&&a.B&&c.isOAuthProvider&&(l=Th(a.B,a.m,a.w,b,c,null,g,firebase.SDK_VERSION||null));var n=uf(l,f&&f.Sb,f&&f.Rb);d=d().then(function(){Sj(a);if(!e)return a.getIdToken().then(function(){})}).then(function(){return a.s.Tb(n,b,c,g,!!l)}).then(function(){return new D(function(c,d){a.Ya(b,null,new N("cancelled-popup-request"),a.ha||
null);a.ga=c;a.Ra=d;a.ha=g;a.K=a.s.ac(a,b,n,g)})}).then(function(a){n&&tf(n);return a?Wf(a):null}).f(function(a){n&&tf(n);throw a;});return a.c(d,e)};S.prototype.linkWithRedirect=function(a){var b=this;return Tj(this,"linkViaRedirect",a,function(){return Pj(b,a.providerId)},!1)};S.prototype.reauthenticateWithRedirect=function(a){return Tj(this,"reauthViaRedirect",a,function(){return E()},!0)};
var Tj=function(a,b,c,d,e){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));if(a.oa&&!e)return F(a.oa);var f=null,g=a.nc();d=d().then(function(){Sj(a);if(!e)return a.getIdToken().then(function(){})}).then(function(){a.Ba=g;return Cj(a)}).then(function(b){a.Va&&(b=a.Va,b=b.l.set(Uj,a.G(),b.v));return b}).then(function(){return a.s.Ub(b,c,g)}).f(function(b){f=b;if(a.Va)return Vj(a.Va);throw f;}).then(function(){if(f)throw f;});return a.c(d,e)},Sj=function(a){if(!a.s||!a.Ec){if(a.s&&
!a.Ec)throw new N("internal-error");throw new N("auth-domain-config-required");}};S.prototype.Xd=function(a,b){var c=this;this.K&&(this.K.cancel(),this.K=null);var d=null,e=this.getIdToken().then(function(d){return mg(c.g,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=Oj(c,a,"link");return Qj(c,a)}).then(function(){return d});return this.c(e)};
S.prototype.Yd=function(a,b){var c=this;this.K&&(this.K.cancel(),this.K=null);var d=null,e=E().then(function(){return ig(ng(c.g,{requestUri:a,sessionId:b}),c.uid)}).then(function(a){d=Oj(c,a,"reauthenticate");Mj(c,a);c.oa=null;return c.reload()}).then(function(){return d});return this.c(e,!0)};S.prototype.sendEmailVerification=function(){var a=this;return this.c(this.getIdToken().then(function(b){return a.g.sendEmailVerification(b)}).then(function(b){if(a.email!=b)return a.reload()}).then(function(){}))};
S.prototype.c=function(a,b){var c=this,d=Wj(this,a,b);this.J.push(d);Cd(d,function(){Wa(c.J,d)});return d};var Wj=function(a,b,c){return a.oa&&!c?(b.cancel(),F(a.oa)):b.f(function(b){!b||"auth/user-disabled"!=b.code&&"auth/user-token-expired"!=b.code||(a.oa||a.dispatchEvent(new uj("userInvalidated")),a.oa=b);throw b;})};S.prototype.toJSON=function(){return this.G()};
S.prototype.G=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,phoneNumber:this.phoneNumber,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.m,appName:this.w,authDomain:this.B,stsTokenManager:this.na.G(),redirectEventId:this.Ba||null};y(this.providerData,function(b){a.providerData.push(Xf(b))});return a};
var Xj=function(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.expirationTime)c.idToken=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken||null,c.expiresIn=(a.stsTokenManager.expirationTime-la())/1E3;else return null;var d=new S(b,c,a);a.providerData&&y(a.providerData,function(a){a&&Ij(d,Wf(a))});a.redirectEventId&&(d.Ba=a.redirectEventId);return d},
Yj=function(a,b,c){var d=new S(a,b);c&&(d.Va=c);return d.reload().then(function(){return d})};var Zj=function(a){this.v=a;this.l=Gi()},Uj={name:"redirectUser",V:!1},Vj=function(a){return a.l.remove(Uj,a.v)},ak=function(a,b){return a.l.get(Uj,a.v).then(function(a){a&&b&&(a.authDomain=b);return Xj(a||{})})};var bk=function(a){this.v=a;this.l=Gi()},ck={name:"authUser",V:!0},dk=function(a,b){return a.l.set(ck,b.G(),a.v)},ek=function(a){return a.l.remove(ck,a.v)},fk=function(a,b){return a.l.get(ck,a.v).then(function(a){a&&b&&(a.authDomain=b);return Xj(a||{})})};var T=function(a){this.Ha=!1;M(this,"app",a);if(this.h().options&&this.h().options.apiKey)a=firebase.SDK_VERSION?Ef(firebase.SDK_VERSION):null,this.g=new R(this.h().options&&this.h().options.apiKey,null,a);else throw new N("invalid-api-key");this.J=[];this.Ea=[];this.wb=[];this.xf=firebase.INTERNAL.createSubscribe(t(this.lf,this));this.hc=void 0;this.zf=firebase.INTERNAL.createSubscribe(t(this.nf,this));gk(this,null);a=this.h().options.apiKey;var b=this.h().name;this.xa=new bk(a+":"+b);a=this.h().options.apiKey;
b=this.h().name;this.rb=new Zj(a+":"+b);this.jc=this.c(hk(this));this.ua=this.c(ik(this));this.xc=!1;this.hd=t(this.Rf,this);this.Ce=t(this.jb,this);this.xb=t(this.kd,this);this.Ae=t(this.gf,this);this.Be=t(this.hf,this);jk(this);this.INTERNAL={};this.INTERNAL["delete"]=t(this["delete"],this);this.Ka=0};T.prototype.toJSON=function(){return{apiKey:this.h().options.apiKey,authDomain:this.h().options.authDomain,appName:this.h().name,currentUser:U(this)&&U(this).G()}};
var kk=function(a){return a.Ue||F(new N("auth-domain-config-required"))},jk=function(a){var b=a.h().options.authDomain,c=a.h().options.apiKey;b&&Hf()&&(a.Ue=a.jc.then(function(){if(!a.Ha)return a.s=kj(b,c,a.h().name),a.s.subscribe(a),U(a)&&Dj(U(a)),a.Yb&&(Dj(a.Yb),a.Yb=null),a.s}))};h=T.prototype;h.Pd=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.ha==b&&!!this.ga;default:return!1}};
h.Ya=function(a,b,c,d){"signInViaPopup"==a&&this.ha==d&&(c&&this.Ra?this.Ra(c):b&&!c&&this.ga&&this.ga(b),this.K&&(this.K.cancel(),this.K=null),delete this.ga,delete this.Ra)};h.Eb=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.ha==b&&this.ga?t(this.We,this):null};
h.We=function(a,b){var c=this;a={requestUri:a,sessionId:b};this.K&&(this.K.cancel(),this.K=null);var d=null,e=null,f=kg(c.g,a).then(function(a){d=Ig(a);e=Di(a);return a});a=c.jc.then(function(){return f}).then(function(a){return lk(c,a)}).then(function(){return Wf({user:U(c),credential:d,additionalUserInfo:e,operationType:"signIn"})});return this.c(a)};h.nc=function(){return Gf()};
h.signInWithPopup=function(a){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));var b=this,c=cg(a.providerId),d=this.nc(),e=null;(!If()||Bf())&&this.h().options.authDomain&&a.isOAuthProvider&&(e=Th(this.h().options.authDomain,this.h().options.apiKey,this.h().name,"signInViaPopup",a,null,d,firebase.SDK_VERSION||null));var f=uf(e,c&&c.Sb,c&&c.Rb),c=kk(this).then(function(b){return b.Tb(f,"signInViaPopup",a,d,!!e)}).then(function(){return new D(function(a,c){b.Ya("signInViaPopup",
null,new N("cancelled-popup-request"),b.ha);b.ga=a;b.Ra=c;b.ha=d;b.K=b.s.ac(b,"signInViaPopup",f,d)})}).then(function(a){f&&tf(f);return a?Wf(a):null}).f(function(a){f&&tf(f);throw a;});return this.c(c)};h.signInWithRedirect=function(a){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));var b=this,c=kk(this).then(function(){return b.s.Ub("signInViaRedirect",a)});return this.c(c)};
h.getRedirectResult=function(){if(!Hf())return F(new N("operation-not-supported-in-this-environment"));var a=this,b=kk(this).then(function(){return a.s.getRedirectResult()}).then(function(a){return a?Wf(a):null});return this.c(b)};
var lk=function(a,b){var c={};c.apiKey=a.h().options.apiKey;c.authDomain=a.h().options.authDomain;c.appName=a.h().name;return a.jc.then(function(){return Yj(c,b,a.rb)}).then(function(b){if(U(a)&&b.uid==U(a).uid)return U(a).copy(b),a.jb(b);gk(a,b);Dj(b);return a.jb(b)}).then(function(){a.Pa()})},gk=function(a,b){U(a)&&(Bj(U(a),a.Ce),rc(U(a),"tokenChanged",a.xb),rc(U(a),"userDeleted",a.Ae),rc(U(a),"userInvalidated",a.Be),Aj(U(a)));b&&(b.Kc.push(a.Ce),jc(b,"tokenChanged",a.xb),jc(b,"userDeleted",a.Ae),
jc(b,"userInvalidated",a.Be),0<a.Ka&&zj(b));M(a,"currentUser",b)};T.prototype.signOut=function(){var a=this,b=this.ua.then(function(){if(!U(a))return E();gk(a,null);return ek(a.xa).then(function(){a.Pa()})});return this.c(b)};
var mk=function(a){var b=a.h().options.authDomain,b=ak(a.rb,b).then(function(b){if(a.Yb=b)b.Va=a.rb;return Vj(a.rb)});return a.c(b)},hk=function(a){var b=a.h().options.authDomain,c=mk(a).then(function(){return fk(a.xa,b)}).then(function(b){return b?(b.Va=a.rb,a.Yb&&(a.Yb.Ba||null)==(b.Ba||null)?b:b.reload().then(function(){return dk(a.xa,b).then(function(){return b})}).f(function(c){return"auth/network-request-failed"==c.code?b:ek(a.xa)})):null}).then(function(b){gk(a,b||null)});return a.c(c)},ik=
function(a){return a.jc.then(function(){return a.getRedirectResult()}).f(function(){}).then(function(){if(!a.Ha)return a.hd()}).f(function(){}).then(function(){if(!a.Ha){a.xc=!0;var b=a.xa;b.l.addListener(ck,b.v,a.hd)}})};h=T.prototype;
h.Rf=function(){var a=this,b=this.h().options.authDomain;return fk(this.xa,b).then(function(b){if(!a.Ha){var c;if(c=U(a)&&b){c=U(a).uid;var e=b.uid;c=void 0===c||null===c||""===c||void 0===e||null===e||""===e?!1:c==e}if(c)return U(a).copy(b),U(a).getIdToken();if(U(a)||b)gk(a,b),b&&(Dj(b),b.Va=a.rb),a.s&&a.s.subscribe(a),a.Pa()}})};h.jb=function(a){return dk(this.xa,a)};h.kd=function(){this.Pa();this.jb(U(this))};h.gf=function(){this.signOut()};h.hf=function(){this.signOut()};
var nk=function(a,b){var c=null,d=null;return a.c(b.then(function(b){c=Ig(b);d=Di(b);return lk(a,b)}).then(function(){return Wf({user:U(a),credential:c,additionalUserInfo:d,operationType:"signIn"})}))};h=T.prototype;h.lf=function(a){var b=this;this.addAuthTokenListener(function(){a.next(U(b))})};h.nf=function(a){var b=this;ok(this,function(){a.next(U(b))})};
h.onIdTokenChanged=function(a,b,c){var d=this;this.xc&&firebase.Promise.resolve().then(function(){q(a)?a(U(d)):q(a.next)&&a.next(U(d))});return this.xf(a,b,c)};h.onAuthStateChanged=function(a,b,c){var d=this;this.xc&&firebase.Promise.resolve().then(function(){d.hc=d.getUid();q(a)?a(U(d)):q(a.next)&&a.next(U(d))});return this.zf(a,b,c)};h.bf=function(a){var b=this,c=this.ua.then(function(){return U(b)?U(b).getIdToken(a).then(function(a){return{accessToken:a}}):null});return this.c(c)};
h.signInWithCustomToken=function(a){var b=this;return this.ua.then(function(){return nk(b,Q(b.g,Bh,{token:a}))}).then(function(a){a=a.user;Jj(a,"isAnonymous",!1);return b.jb(a)}).then(function(){return U(b)})};h.signInWithEmailAndPassword=function(a,b){var c=this;return this.ua.then(function(){return nk(c,Q(c.g,yg,{email:a,password:b}))}).then(function(a){return a.user})};h.createUserWithEmailAndPassword=function(a,b){var c=this;return this.ua.then(function(){return nk(c,Q(c.g,xh,{email:a,password:b}))}).then(function(a){return a.user})};
h.signInWithCredential=function(a){return this.signInAndRetrieveDataWithCredential(a).then(function(a){return a.user})};h.signInAndRetrieveDataWithCredential=function(a){var b=this;return this.ua.then(function(){return nk(b,a.Fb(b.g))})};h.signInAnonymously=function(){var a=this;return this.ua.then(function(){var b=U(a);return b&&b.isAnonymous?b:nk(a,a.g.signInAnonymously()).then(function(b){b=b.user;Jj(b,"isAnonymous",!0);return a.jb(b)}).then(function(){return U(a)})})};h.h=function(){return this.app};
var U=function(a){return a.currentUser};T.prototype.getUid=function(){return U(this)&&U(this).uid||null};var pk=function(a){return U(a)&&U(a)._lat||null};h=T.prototype;h.Pa=function(){if(this.xc){for(var a=0;a<this.Ea.length;a++)if(this.Ea[a])this.Ea[a](pk(this));if(this.hc!==this.getUid()&&this.wb.length)for(this.hc=this.getUid(),a=0;a<this.wb.length;a++)if(this.wb[a])this.wb[a](pk(this))}};h.Le=function(a){this.addAuthTokenListener(a);this.Ka++;0<this.Ka&&U(this)&&zj(U(this))};
h.Ff=function(a){var b=this;y(this.Ea,function(c){c==a&&b.Ka--});0>this.Ka&&(this.Ka=0);0==this.Ka&&U(this)&&Aj(U(this));this.removeAuthTokenListener(a)};h.addAuthTokenListener=function(a){var b=this;this.Ea.push(a);this.c(this.ua.then(function(){b.Ha||Ua(b.Ea,a)&&a(pk(b))}))};h.removeAuthTokenListener=function(a){Xa(this.Ea,function(b){return b==a})};var ok=function(a,b){a.wb.push(b);a.c(a.ua.then(function(){!a.Ha&&Ua(a.wb,b)&&a.hc!==a.getUid()&&(a.hc=a.getUid(),b(pk(a)))}))};h=T.prototype;
h["delete"]=function(){this.Ha=!0;for(var a=0;a<this.J.length;a++)this.J[a].cancel("app-deleted");this.J=[];this.xa&&(a=this.xa,a.l.removeListener(ck,a.v,this.hd));this.s&&this.s.unsubscribe(this);return firebase.Promise.resolve()};h.c=function(a){var b=this;this.J.push(a);Cd(a,function(){Wa(b.J,a)});return a};h.fetchProvidersForEmail=function(a){return this.c(bh(this.g,a))};h.verifyPasswordResetCode=function(a){return this.checkActionCode(a).then(function(a){return a.data.email})};
h.confirmPasswordReset=function(a,b){return this.c(this.g.confirmPasswordReset(a,b).then(function(){}))};h.checkActionCode=function(a){return this.c(this.g.checkActionCode(a).then(function(a){return new ui(a)}))};h.applyActionCode=function(a){return this.c(this.g.applyActionCode(a).then(function(){}))};h.sendPasswordResetEmail=function(a){return this.c(this.g.sendPasswordResetEmail(a).then(function(){}))};
h.signInWithPhoneNumber=function(a,b){return this.c(ti(this,a,b,t(this.signInAndRetrieveDataWithCredential,this)))};var qk="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),V=function(a,b){return{name:a||"",O:"a valid string",optional:!!b,P:p}},rk=function(){return{name:"opt_forceRefresh",O:"a boolean",optional:!0,P:ba}},W=function(a,b){return{name:a||"",O:"a valid object",optional:!!b,P:r}},sk=function(a,b){return{name:a||"",O:"a function",optional:!!b,P:q}},tk=function(){return{name:"",O:"null",optional:!1,P:fa}},uk=function(){return{name:"",O:"an HTML element",optional:!1,P:function(a){return!!(a&&
a instanceof Element)}}},vk=function(){return{name:"auth",O:"an instance of Firebase Auth",optional:!0,P:function(a){return!!(a&&a instanceof T)}}},wk=function(){return{name:"app",O:"an instance of Firebase App",optional:!0,P:function(a){return!!(a&&a instanceof firebase.app.App)}}},xk=function(a){return{name:a?a+"Credential":"credential",O:a?"a valid "+a+" credential":"a valid credential",optional:!1,P:function(b){if(!b)return!1;var c=!a||b.providerId===a;return!(!b.Fb||!c)}}},yk=function(){return{name:"authProvider",
O:"a valid Auth provider",optional:!1,P:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}},zk=function(){return{name:"applicationVerifier",O:"an implementation of firebase.auth.ApplicationVerifier",optional:!1,P:function(a){return!!(a&&p(a.type)&&q(a.verify))}}},X=function(a,b,c,d){return{name:c||"",O:a.O+" or "+b.O,optional:!!d,P:function(c){return a.P(c)||b.P(c)}}};var Y=function(a,b){for(var c in b){var d=b[c].name;a[d]=Ak(d,a[c],b[c].a)}},Z=function(a,b,c,d){a[b]=Ak(b,c,d)},Ak=function(a,b,c){if(!c)return b;var d=Bk(a);a=function(){var a=Array.prototype.slice.call(arguments);a:{var e=Array.prototype.slice.call(a);var l=0;for(var n=!1,C=0;C<c.length;C++)if(c[C].optional)n=!0;else{if(n)throw new N("internal-error","Argument validator encountered a required argument after an optional argument.");l++}n=c.length;if(e.length<l||n<e.length)e="Expected "+(l==n?1==
l?"1 argument":l+" arguments":l+"-"+n+" arguments")+" but got "+e.length+".";else{for(l=0;l<e.length;l++)if(n=c[l].optional&&void 0===e[l],!c[l].P(e[l])&&!n){e=c[l];if(0>l||l>=qk.length)throw new N("internal-error","Argument validator received an unsupported number of arguments.");e=qk[l]+" argument "+(e.name?'"'+e.name+'" ':"")+"must be "+e.O+".";break a}e=null}}if(e)throw new N("argument-error",d+" failed: "+e);return b.apply(this,a)};for(var e in b)a[e]=b[e];for(e in b.prototype)a.prototype[e]=
b.prototype[e];return a},Bk=function(a){a=a.split(".");return a[a.length-1]};Y(T.prototype,{applyActionCode:{name:"applyActionCode",a:[V("code")]},checkActionCode:{name:"checkActionCode",a:[V("code")]},confirmPasswordReset:{name:"confirmPasswordReset",a:[V("code"),V("newPassword")]},createUserWithEmailAndPassword:{name:"createUserWithEmailAndPassword",a:[V("email"),V("password")]},fetchProvidersForEmail:{name:"fetchProvidersForEmail",a:[V("email")]},getRedirectResult:{name:"getRedirectResult",a:[]},onAuthStateChanged:{name:"onAuthStateChanged",a:[X(W(),sk(),"nextOrObserver"),
sk("opt_error",!0),sk("opt_completed",!0)]},onIdTokenChanged:{name:"onIdTokenChanged",a:[X(W(),sk(),"nextOrObserver"),sk("opt_error",!0),sk("opt_completed",!0)]},sendPasswordResetEmail:{name:"sendPasswordResetEmail",a:[V("email")]},signInAndRetrieveDataWithCredential:{name:"signInAndRetrieveDataWithCredential",a:[xk()]},signInAnonymously:{name:"signInAnonymously",a:[]},signInWithCredential:{name:"signInWithCredential",a:[xk()]},signInWithCustomToken:{name:"signInWithCustomToken",a:[V("token")]},signInWithEmailAndPassword:{name:"signInWithEmailAndPassword",
a:[V("email"),V("password")]},signInWithPhoneNumber:{name:"signInWithPhoneNumber",a:[V("phoneNumber"),zk()]},signInWithPopup:{name:"signInWithPopup",a:[yk()]},signInWithRedirect:{name:"signInWithRedirect",a:[yk()]},signOut:{name:"signOut",a:[]},toJSON:{name:"toJSON",a:[V(null,!0)]},verifyPasswordResetCode:{name:"verifyPasswordResetCode",a:[V("code")]}});
Y(S.prototype,{"delete":{name:"delete",a:[]},getIdToken:{name:"getIdToken",a:[rk()]},getToken:{name:"getToken",a:[rk()]},linkAndRetrieveDataWithCredential:{name:"linkAndRetrieveDataWithCredential",a:[xk()]},linkWithCredential:{name:"linkWithCredential",a:[xk()]},linkWithPhoneNumber:{name:"linkWithPhoneNumber",a:[V("phoneNumber"),zk()]},linkWithPopup:{name:"linkWithPopup",a:[yk()]},linkWithRedirect:{name:"linkWithRedirect",a:[yk()]},reauthenticateAndRetrieveDataWithCredential:{name:"reauthenticateAndRetrieveDataWithCredential",
a:[xk()]},reauthenticateWithCredential:{name:"reauthenticateWithCredential",a:[xk()]},reauthenticateWithPhoneNumber:{name:"reauthenticateWithPhoneNumber",a:[V("phoneNumber"),zk()]},reauthenticateWithPopup:{name:"reauthenticateWithPopup",a:[yk()]},reauthenticateWithRedirect:{name:"reauthenticateWithRedirect",a:[yk()]},reload:{name:"reload",a:[]},sendEmailVerification:{name:"sendEmailVerification",a:[]},toJSON:{name:"toJSON",a:[V(null,!0)]},unlink:{name:"unlink",a:[V("provider")]},updateEmail:{name:"updateEmail",
a:[V("email")]},updatePassword:{name:"updatePassword",a:[V("password")]},updatePhoneNumber:{name:"updatePhoneNumber",a:[xk("phone")]},updateProfile:{name:"updateProfile",a:[W("profile")]}});Y(D.prototype,{f:{name:"catch"},then:{name:"then"}});Y(si.prototype,{confirm:{name:"confirm",a:[V("verificationCode")]}});Z(Ag,"credential",function(a,b){return new xg(a,b)},[V("email"),V("password")]);Y(pg.prototype,{addScope:{name:"addScope",a:[V("scope")]},setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});
Z(pg,"credential",qg,[X(V(),W(),"token")]);Y(rg.prototype,{addScope:{name:"addScope",a:[V("scope")]},setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});Z(rg,"credential",sg,[X(V(),W(),"token")]);Y(tg.prototype,{addScope:{name:"addScope",a:[V("scope")]},setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});Z(tg,"credential",ug,[X(V(),X(W(),tk()),"idToken"),X(V(),tk(),"accessToken",!0)]);
Y(vg.prototype,{setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});Z(vg,"credential",wg,[X(V(),W(),"token"),V("secret",!0)]);Y(P.prototype,{addScope:{name:"addScope",a:[V("scope")]},credential:{name:"credential",a:[X(V(),tk(),"idToken",!0),X(V(),tk(),"accessToken",!0)]},setCustomParameters:{name:"setCustomParameters",a:[W("customOAuthParameters")]}});Z(Fg,"credential",Hg,[V("verificationId"),V("verificationCode")]);
Y(Fg.prototype,{verifyPhoneNumber:{name:"verifyPhoneNumber",a:[V("phoneNumber"),zk()]}});Y(N.prototype,{toJSON:{name:"toJSON",a:[V(null,!0)]}});Y(Kg.prototype,{toJSON:{name:"toJSON",a:[V(null,!0)]}});Y(gg.prototype,{toJSON:{name:"toJSON",a:[V(null,!0)]}});Y(Uh.prototype,{clear:{name:"clear",a:[]},render:{name:"render",a:[]},verify:{name:"verify",a:[]}});
(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:T,Error:N};Z(a,"EmailAuthProvider",Ag,[]);Z(a,"FacebookAuthProvider",pg,[]);Z(a,"GithubAuthProvider",rg,[]);Z(a,"GoogleAuthProvider",tg,[]);Z(a,"TwitterAuthProvider",vg,[]);Z(a,"OAuthProvider",P,[V("providerId")]);Z(a,"PhoneAuthProvider",Fg,[vk()]);Z(a,"RecaptchaVerifier",Uh,[X(V(),uk(),"recaptchaContainer"),W("recaptchaParameters",!0),wk()]);firebase.INTERNAL.registerService("auth",function(a,
c){a=new T(a);c({INTERNAL:{getUid:t(a.getUid,a),getToken:t(a.bf,a),addAuthTokenListener:t(a.Le,a),removeAuthTokenListener:t(a.Ff,a)}});return a},a,function(a,c){if("create"===a)try{c.auth()}catch(d){}});firebase.INTERNAL.extendNamespace({User:S})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();}).call(this);
}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {
  onCopy: 'copy',
  onCut: 'cut',
  onPaste: 'paste',
  onCompositionEnd: 'compositionend',
  onCompositionStart: 'compositionstart',
  onCompositionUpdate: 'compositionupdate',
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',
  onFocus: 'focus',
  onBlur: 'blur',
  onChange: 'change',
  onInput: 'input',
  onSubmit: 'submit',
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onDoubleClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mousenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onSelect: 'select',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',
  onScroll: 'scroll',
  onWheel: 'wheel',
  onAbort: 'abort',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEncrypted: 'encrypted',
  onEnded: 'ended',
  onError: 'error',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadat',
  onLoadStart: 'loadstart',
  onPause: 'pause',
  onPlay: 'play',
  onPlaying: 'playing',
  onProgress: 'progress',
  onRateChange: 'ratechange',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onStalled: 'stalled',
  onSuspend: 'suspend',
  onTimeUpdate: 'timeupdate',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',
  onLoad: 'load',
  onError: 'error',
  onAnimationStart: 'animationstart',
  onAnimationEnd: 'animationend',
  onAnimationIteration: 'animationiteration',
  onTransitionEnd: 'transitionend'
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const EVENT_LISTENER_PROPS = __webpack_require__(12)
const SVG_TAGS = __webpack_require__(6)
const SVG_ATTRIBUTE_TRANSLATIONS = __webpack_require__(39)
const EMPTY = ''

module.exports = function (domNode, oldVirtualNode, newVirtualNode, options) {
  const oldProps = oldVirtualNode && oldVirtualNode.props
  const newProps = newVirtualNode.props

  let refs, listenerContext
  if (options) {
    refs = options.refs
    listenerContext = options.listenerContext
  }
  updateProps(domNode, oldVirtualNode, oldProps, newVirtualNode, newProps)
  if (refs) updateRef(domNode, oldProps && oldProps.ref, newProps && newProps.ref, refs)
  updateEventListeners(domNode, oldVirtualNode, newVirtualNode, listenerContext)
}

// Using var to avoid "Unsupported phi use of variable" deoptimization in Chrome 56
function updateProps (domNode, oldVirtualNode, oldProps, newVirtualNode, newProps) {
  if (oldProps) {
    for (var name in oldProps) {
      if (name === 'ref' || name === 'on') continue
      if (name in EVENT_LISTENER_PROPS) continue
      if (!newProps || !(name in newProps)) {
        if (name === 'dataset') {
          updateProps(domNode.dataset, null, oldProps && oldProps.dataset, null, null)
        } else if (name !== 'innerHTML' && oldVirtualNode && SVG_TAGS.has(oldVirtualNode.tag)) {
          domNode.removeAttribute(SVG_ATTRIBUTE_TRANSLATIONS.get(name) || name)
        } else {
          // Clear property for objects that don't support deletion (e.g. style
          // or className). If we used null instead of an empty string, the DOM
          // could sometimes stringify the value and mistakenly assign 'null'.
          domNode[name] = EMPTY
          delete domNode[name]
        }
      }
    }
  }

  if (newProps) {
    for (var name in newProps) {
      if (name === 'ref' || name === 'on') continue
      if (name in EVENT_LISTENER_PROPS) continue
      var oldValue = oldProps && oldProps[name]
      var newValue = newProps[name]
      if (name === 'dataset') {
        updateNestedProps(domNode.dataset, oldValue, newValue, false)
      } else if (name === 'style' && typeof newValue !== 'string') {
        if (typeof oldValue === 'string') {
          domNode.style = ''
          oldValue = null
        }
        updateNestedProps(domNode.style, oldValue, newValue, true)
      } else if (name === 'attributes') {
        updateAttributes(domNode, oldValue, newValue)
      } else {
        if (newValue !== oldValue) {
          if (name !== 'innerHTML' && newVirtualNode && SVG_TAGS.has(newVirtualNode.tag)) {
            domNode.setAttribute(SVG_ATTRIBUTE_TRANSLATIONS.get(name) || name, newValue)
          } else if (newVirtualNode && newVirtualNode.tag === 'input'
            && name === 'value' && domNode[name] === newValue) {
            // Do not update `value` of an `input` unless it differs.
            // Every change will reset the cursor position.
          } else {
            domNode[name] = newValue
          }
        }
      }
    }
  }
}

function updateNestedProps (domProps, oldProps, newProps, isStyleObject) {
  if (oldProps) {
    for (var name in oldProps) {
      if (!newProps || !(name in newProps)) {
        if (isStyleObject) {
          domProps[name] = EMPTY
        } else {
          delete domProps[name]
        }
      }
    }
  }

  if (newProps) {
    for (var name in newProps) {
      const oldValue = oldProps && oldProps[name]
      const newValue = newProps[name]
      if (newValue !== oldValue) {
        domProps[name] = newValue
      }
    }
  }
}

function updateAttributes (domNode, oldAttributes, newAttributes) {
  if (oldAttributes) {
    for (var name in oldAttributes) {
      if (!newAttributes || !(name in newAttributes)) {
        domNode.removeAttribute(name)
      }
    }
  }

  if (newAttributes) {
    for (var name in newAttributes) {
      const oldValue = oldAttributes && oldAttributes[name]
      const newValue = newAttributes[name]
      if (newValue !== oldValue) {
        domNode.setAttribute(name, newValue)
      }
    }
  }
}

function updateRef (domNode, oldRefName, newRefName, refs) {
  if (newRefName !== oldRefName) {
    if (oldRefName && refs[oldRefName] === domNode) delete refs[oldRefName]
    if (newRefName) refs[newRefName] = domNode
  }
}

function updateEventListeners (domNode, oldVirtualNode, newVirtualNode, listenerContext) {
  const oldListeners = oldVirtualNode && oldVirtualNode.props && oldVirtualNode.props.on
  const newListeners = newVirtualNode.props && newVirtualNode.props.on

  for (const eventName in oldListeners) {
    if (!(newListeners && eventName in newListeners)) {
      let listenerToRemove
      if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
        listenerToRemove = oldVirtualNode.boundListeners[eventName]
      } else {
        listenerToRemove = oldListeners[eventName]
      }
      domNode.removeEventListener(eventName, listenerToRemove)
    }
  }

  for (const eventName in newListeners) {
    const oldListener = oldListeners && oldListeners[eventName]
    const newListener = newListeners[eventName]

    if (newListener !== oldListener) {
      if (oldListener) {
        let listenerToRemove
        if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
          listenerToRemove = oldVirtualNode.boundListeners[eventName]
        } else {
          listenerToRemove = oldListener
        }
        domNode.removeEventListener(eventName, listenerToRemove)
      }
      let listenerToAdd
      if (listenerContext) {
        listenerToAdd = newListener.bind(listenerContext)
        if (!newVirtualNode.boundListeners) newVirtualNode.boundListeners = {}
        newVirtualNode.boundListeners[eventName] = listenerToAdd
      } else {
        listenerToAdd = newListener
      }
      domNode.addEventListener(eventName, listenerToAdd)
    }
  }
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// This file implements getter and setter functions for a scheduler to be used
// by this library when updating the DOM. The scheduler's job is to ensure that
// DOM interaction is performed efficiently. When using `etch` in Atom, you
// should tell `etch` to use Atom's scheduler by calling
// `setScheduler(atom.views)`.
//
// Schedulers should support the following interface:
// * `updateDocument(fn)` This method is asynchronous. It enqueues functions to
// be executed later.
// * `getNextUpdatePromise()` This function should return a promise that
// resolves after all pending document update functions have been invoked.
//
// Schedulers could support the following optional methods, which are supported
// by Atom's scheduler.
//
// * `readDocument` This method can be invoked by clients other than `etch` when
// it is necessary to read from the DOM. Functions enqueued via this method
// should not be run until all document update functions have been executed.
// Batching updates and reads in this way will prevent forced synchronous
// reflows.
// * `pollDocument` This method is similar to `readDocument`, but it runs the
// associated functions repeatedly. Again, they should be scheduled in such a
// way so as to avoid synchronous reflows.

const DefaultScheduler = __webpack_require__(42)

let scheduler = null

module.exports.setScheduler = function setScheduler (customScheduler) {
  scheduler = customScheduler
}

module.exports.getScheduler = function getScheduler () {
  if (!scheduler) {
    scheduler = new DefaultScheduler()
  }
  return scheduler
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {
  onCopy: 'copy',
  onCut: 'cut',
  onPaste: 'paste',
  onCompositionEnd: 'compositionend',
  onCompositionStart: 'compositionstart',
  onCompositionUpdate: 'compositionupdate',
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',
  onFocus: 'focus',
  onBlur: 'blur',
  onChange: 'change',
  onInput: 'input',
  onSubmit: 'submit',
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onDoubleClick: 'doubleclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mousenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onSelect: 'select',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',
  onScroll: 'scroll',
  onWheel: 'wheel',
  onAbort: 'abort',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEncrypted: 'encrypted',
  onEnded: 'ended',
  onError: 'error',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadat',
  onLoadStart: 'loadstart',
  onPause: 'pause',
  onPlay: 'play',
  onPlaying: 'playing',
  onProgress: 'progress',
  onRateChange: 'ratechange',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onStalled: 'stalled',
  onSuspend: 'suspend',
  onTimeUpdate: 'timeupdate',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',
  onLoad: 'load',
  onError: 'error',
  onAnimationStart: 'animationstart',
  onAnimationEnd: 'animationend',
  onAnimationIteration: 'animationiteration',
  onTransitionEnd: 'transitionend'
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const EVENT_LISTENER_PROPS = __webpack_require__(15)
const SVG_TAGS = __webpack_require__(8)
const SVG_ATTRIBUTE_TRANSLATIONS = __webpack_require__(46)
const EMPTY = ''

module.exports = function (domNode, oldVirtualNode, newVirtualNode, options) {
  const oldProps = oldVirtualNode && oldVirtualNode.props
  const newProps = newVirtualNode.props

  let refs, listenerContext
  if (options) {
    refs = options.refs
    listenerContext = options.listenerContext
  }
  updateProps(domNode, oldVirtualNode, oldProps, newVirtualNode, newProps)
  if (refs) updateRef(domNode, oldProps && oldProps.ref, newProps && newProps.ref, refs)
  updateEventListeners(domNode, oldVirtualNode, newVirtualNode, listenerContext)
}

function updateProps (domNode, oldVirtualNode, oldProps, newVirtualNode, newProps) {
  if (oldProps) {
    const oldPropsNames = Object.keys(oldProps)
    for (let i = 0; i < oldPropsNames.length; i++) {
      const name = oldPropsNames[i]
      if (name === 'ref' || name === 'on') continue
      if (name in EVENT_LISTENER_PROPS) continue
      if (!newProps || !(name in newProps)) {
        if (name === 'dataset') {
          updateProps(domNode.dataset, null, oldProps && oldProps.dataset, null, null)
        } else if (name !== 'innerHTML' && oldVirtualNode && SVG_TAGS.has(oldVirtualNode.tag)) {
          domNode.removeAttribute(SVG_ATTRIBUTE_TRANSLATIONS.get(name) || name)
        } else {
          // Clear property for objects that don't support deletion (e.g. style
          // or className). If we used null instead of an empty string, the DOM
          // could sometimes stringify the value and mistakenly assign 'null'.
          domNode[name] = EMPTY
          delete domNode[name]
        }
      }
    }
  }

  if (newProps) {
    const newPropsNames = Object.keys(newProps)
    for (let i = 0; i < newPropsNames.length; i++) {
      const name = newPropsNames[i]
      if (name === 'ref' || name === 'on') continue
      if (name in EVENT_LISTENER_PROPS) continue
      const oldValue = oldProps && oldProps[name]
      const newValue = newProps[name]
      if (name === 'dataset') {
        updateNestedProps(domNode.dataset, oldValue, newValue, false)
      } else if (name === 'style' && typeof newValue !== 'string') {
        let oldProps = oldValue
        if (typeof oldProps === 'string') {
          domNode.style = ''
          oldProps = null
        }
        updateNestedProps(domNode.style, oldProps, newValue, true)
      } else {
        if (newValue !== oldValue) {
          if (name !== 'innerHTML' && newVirtualNode && SVG_TAGS.has(newVirtualNode.tag)) {
            domNode.setAttribute(SVG_ATTRIBUTE_TRANSLATIONS.get(name) || name, newValue)
          } else {
            domNode[name] = newValue
          }
        }
      }
    }
  }
}

function updateNestedProps (domProps, oldProps, newProps, isStyleObject) {
  if (oldProps) {
    const oldPropsNames = Object.keys(oldProps)
    for (let i = 0; i < oldPropsNames.length; i++) {
      const name = oldPropsNames[i]
      if (!newProps || !(name in newProps)) {
        if (isStyleObject) {
          domProps[name] = EMPTY
        } else {
          delete domProps[name]
        }
      }
    }
  }

  if (newProps) {
    const newPropsNames = Object.keys(newProps)
    for (let i = 0; i < newPropsNames.length; i++) {
      const name = newPropsNames[i]
      const oldValue = oldProps && oldProps[name]
      const newValue = newProps[name]
      if (newValue !== oldValue) {
        domProps[name] = newValue
      }
    }
  }
}

function updateRef (domNode, oldRefName, newRefName, refs) {
  if (newRefName !== oldRefName) {
    if (oldRefName && refs[oldRefName] === domNode) delete refs[oldRefName]
    if (newRefName) refs[newRefName] = domNode
  }
}

function updateEventListeners (domNode, oldVirtualNode, newVirtualNode, listenerContext) {
  const oldListeners = oldVirtualNode && oldVirtualNode.props && oldVirtualNode.props.on
  const newListeners = newVirtualNode.props && newVirtualNode.props.on

  for (const eventName in oldListeners) {
    if (!(newListeners && eventName in newListeners)) {
      let listenerToRemove
      if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
        listenerToRemove = oldVirtualNode.boundListeners[eventName]
      } else {
        listenerToRemove =oldListeners[eventName]
      }
      domNode.removeEventListener(eventName, listenerToRemove)
    }
  }

  for (const eventName in newListeners) {
    const oldListener = oldListeners && oldListeners[eventName]
    const newListener = newListeners[eventName]

    if (newListener !== oldListener) {
      if (oldListener) {
        let listenerToRemove
        if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
          listenerToRemove = oldVirtualNode.boundListeners[eventName]
        } else {
          listenerToRemove = oldListener
        }
        domNode.removeEventListener(eventName, listenerToRemove)
      }
      let listenerToAdd
      if (listenerContext) {
        listenerToAdd = newListener.bind(listenerContext)
        if (!newVirtualNode.boundListeners) newVirtualNode.boundListeners = {}
        newVirtualNode.boundListeners[eventName] = listenerToAdd
      } else {
        listenerToAdd = newListener
      }
      domNode.addEventListener(eventName, listenerToAdd)
    }
  }
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// This file implements getter and setter functions for a scheduler to be used
// by this library when updating the DOM. The scheduler's job is to ensure that
// DOM interaction is performed efficiently. When using `etch` in Atom, you
// should tell `etch` to use Atom's scheduler by calling
// `setScheduler(atom.views)`.
//
// Schedulers should support the following interface:
// * `updateDocument(fn)` This method is asynchronous. It enqueues functions to
// be executed later.
// * `getNextUpdatePromise()` This function should return a promise that
// resolves after all pending document update functions have been invoked.
//
// Schedulers could support the following optional methods, which are supported
// by Atom's scheduler.
//
// * `readDocument` This method can be invoked by clients other than `etch` when
// it is necessary to read from the DOM. Functions enqueued via this method
// should not be run until all document update functions have been executed.
// Batching updates and reads in this way will prevent forced synchronous
// reflows.
// * `pollDocument` This method is similar to `readDocument`, but it runs the
// associated functions repeatedly. Again, they should be scheduled in such a
// way so as to avoid synchronous reflows.

const DefaultScheduler = __webpack_require__(49)

let scheduler = null

module.exports.setScheduler = function setScheduler (customScheduler) {
  scheduler = customScheduler
}

module.exports.getScheduler = function getScheduler () {
  if (!scheduler) {
    scheduler = new DefaultScheduler()
  }
  return scheduler
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var PathSeparator, queryIsLastPathSegment;

  PathSeparator = __webpack_require__(3).sep;

  exports.basenameScore = function(string, query, score) {
    var base, depth, index, lastCharacter, segmentCount, slashCount;
    index = string.length - 1;
    while (string[index] === PathSeparator) {
      index--;
    }
    slashCount = 0;
    lastCharacter = index;
    base = null;
    while (index >= 0) {
      if (string[index] === PathSeparator) {
        slashCount++;
        if (base == null) {
          base = string.substring(index + 1, lastCharacter + 1);
        }
      } else if (index === 0) {
        if (lastCharacter < string.length - 1) {
          if (base == null) {
            base = string.substring(0, lastCharacter + 1);
          }
        } else {
          if (base == null) {
            base = string;
          }
        }
      }
      index--;
    }
    if (base === string) {
      score *= 2;
    } else if (base) {
      score += exports.score(base, query);
    }
    segmentCount = slashCount + 1;
    depth = Math.max(1, 10 - segmentCount);
    score *= depth * 0.01;
    return score;
  };

  exports.score = function(string, query) {
    var character, characterScore, indexInQuery, indexInString, lowerCaseIndex, minIndex, queryLength, queryScore, stringLength, totalCharacterScore, upperCaseIndex, _ref;
    if (string === query) {
      return 1;
    }
    if (queryIsLastPathSegment(string, query)) {
      return 1;
    }
    totalCharacterScore = 0;
    queryLength = query.length;
    stringLength = string.length;
    indexInQuery = 0;
    indexInString = 0;
    while (indexInQuery < queryLength) {
      character = query[indexInQuery++];
      lowerCaseIndex = string.indexOf(character.toLowerCase());
      upperCaseIndex = string.indexOf(character.toUpperCase());
      minIndex = Math.min(lowerCaseIndex, upperCaseIndex);
      if (minIndex === -1) {
        minIndex = Math.max(lowerCaseIndex, upperCaseIndex);
      }
      indexInString = minIndex;
      if (indexInString === -1) {
        return 0;
      }
      characterScore = 0.1;
      if (string[indexInString] === character) {
        characterScore += 0.1;
      }
      if (indexInString === 0 || string[indexInString - 1] === PathSeparator) {
        characterScore += 0.8;
      } else if ((_ref = string[indexInString - 1]) === '-' || _ref === '_' || _ref === ' ') {
        characterScore += 0.7;
      }
      string = string.substring(indexInString + 1, stringLength);
      totalCharacterScore += characterScore;
    }
    queryScore = totalCharacterScore / queryLength;
    return ((queryScore * (queryLength / stringLength)) + queryScore) / 2;
  };

  queryIsLastPathSegment = function(string, query) {
    if (string[string.length - query.length - 1] === PathSeparator) {
      return string.lastIndexOf(query) === string.length - query.length;
    }
  };

}).call(this);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// These imports load individual services into the firebase namespace.


var _atom = __webpack_require__(0);

var _remote = __webpack_require__(20);

var _remote2 = _interopRequireDefault(_remote);

var _lodash = __webpack_require__(21);

var _lodash2 = _interopRequireDefault(_lodash);

var _jwtDecode = __webpack_require__(22);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _helpers = __webpack_require__(4);

var _repoSettingsView = __webpack_require__(37);

var _repoSettingsView2 = _interopRequireDefault(_repoSettingsView);

var _conversationsGutter = __webpack_require__(53);

var _conversationsGutter2 = _interopRequireDefault(_conversationsGutter);

var _app = __webpack_require__(1);

var firebase = _interopRequireWildcard(_app);

__webpack_require__(11);

__webpack_require__(57);

var _etch = __webpack_require__(2);

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _etch2.default.dom;

var BrowserWindow = _remote2.default.require("browser-window");

module.exports = {
  subscriptions: null,
  gutter: null,

  config: {
    siteUrl: {
      type: "string",
      default: "https://codesidestory.com"
    },
    firebase: {
      type: "object",
      properties: {
        apiKey: {
          type: "string",
          default: "AIzaSyDl666AqnErZFcXD4H_XRbV_cBc8PvFImk"
        },
        authDomain: {
          default: "codesidestory-1.firebaseapp.com",
          type: "string"
        },
        databaseURL: {
          default: "https://codesidestory-1.firebaseio.com",
          type: "string"
        },
        projectId: {
          default: "codesidestory-1",
          type: "string"
        },
        storageBucket: {
          default: "codesidestory-1.appspot.com",
          type: "string"
        },
        messagingSenderId: {
          type: "string",
          default: "485659103520"
        }
      }
    }
  },

  activate: function activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.state = state || {};

    // Have separate subscriptions for logout and login state.
    this.subscriptions = new _atom.CompositeDisposable();
    this.loginsubs = new _atom.CompositeDisposable();
    this.logoutsubs = new _atom.CompositeDisposable();
    this.subscriptions.add(this.loginsubs, this.logoutsubs);

    this.login();
    /*
    this.logoutsubs.add(
      atom.commands.add("atom-workspace", {
        "codesidestory:init": () => this.login()
      })
    );
    */
  },
  deactivate: function deactivate() {
    this.subscriptions.dispose();
    if (this.repoSettingsView) {
      this.repoSettingsView.destroy();
    }
  },
  serialize: function serialize() {
    return this.state;
  },
  login: function login() {
    var _this = this;

    if (firebase.apps.length) {
      this.auth();
      return;
    }

    var firebaseConfig = atom.config.get("codesidestory-atom.firebase");
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        _this.logoutsubs.dispose();

        user.getIdToken().then(function (tok) {
          var _ref = (0, _jwtDecode2.default)(tok) || {},
              team_id = _ref.team_id;

          if (!team_id) {
            return _this.error("No team_id found for user ", user.uid);
          }
          var userTeam = { user_id: user.uid, team_id: team_id };

          _this.init(userTeam);

          _this.loginsubs.add(atom.commands.add("atom-workspace", {
            "codesidestory:repo-settings": function codesidestoryRepoSettings() {
              return _this.init(userTeam, true);
            }
          }));
        });
        _this.loginsubs.add(atom.commands.add("atom-workspace", {
          "codesidestory:logout": function codesidestoryLogout() {
            return firebase.auth().signOut();
          }
        }));
      } else {
        _this.loginsubs.dispose();

        _this.logoutsubs.add(atom.commands.add("atom-workspace", {
          "codesidestory:login": function codesidestoryLogin() {
            return _this.login();
          }
        }));

        _this.auth();
      }
    });
  },
  init: function init(user, showRepoSetting) {
    var _this2 = this;

    var team_id = user.team_id;

    this.teamRef = firebase.database().ref("teams/" + team_id);

    this.getRepos().then(function (repos) {
      // all projects have repo id and repo channel.
      var uninitialiedRepos = repos.find(function (repo) {
        return !repo || !repo.id || !repo.channel;
      });
      if (uninitialiedRepos || showRepoSetting) {
        _this2.initRepoSettingsView(repos);
      } else {
        _this2.modalPanel = atom.workspace.addModalPanel({
          item: _etch2.default.render($.div({
            className: "block",
            onClick: function onClick() {
              return _this2.modalPanel.destroy();
            }
          }, $.div({ className: "css-close icon icon-x pull-right" }), 'Plugin initialized! Use "Codesidestory:Start Conversation" in Command Palette to start a conversation')),
          visible: true
        });
      }
    }).catch(console.error);

    this.loginsubs.add(atom.workspace.observeActiveTextEditor(this.onEditorActive.bind(this)));
  },
  onEditorActive: function onEditorActive(editor) {
    var _this3 = this;

    if (!editor) {
      return;
    }

    var _atom$project$relativ = atom.project.relativizePath(editor.getPath()),
        _atom$project$relativ2 = _slicedToArray(_atom$project$relativ, 2),
        projectPath = _atom$project$relativ2[0],
        filePath = _atom$project$relativ2[1];

    var repoId = (0, _helpers.repoIdForPath)(editor.getPath(), this.state.repos);
    if (!repoId) {
      console.warn("Not able to find repo for file: ", filePath);
      return;
    }
    var fileRef = this.teamRef.child("repos/" + repoId + "/files/" + (0, _helpers.fbKeyEncode)(filePath));

    if (this.gutter) {
      this.gutter.destroy();
    }

    this.teamRef.child("repoIds/" + repoId + "/channel/id").once("value").then(function (snap) {
      var channelId = snap.val();
      if (!channelId) {
        // TODO: Prompt user to add channel.
        console.warn("No channles setup for repo");
        return;
      }
      _this3.gutter = new _conversationsGutter2.default({ editor: editor, fileRef: fileRef, channelId: channelId });
      _this3.loginsubs.add(new _atom.Disposable(function () {
        return _this3.gutter && _this3.gutter.destroy();
      }));
    });
  },
  getRepos: function getRepos() {
    var _this4 = this;

    var savedRepos = this.state.repos || {};
    return Promise.all(atom.project.getRepositories().map(function (repo, idx) {
      return repo ? repo.getOriginURL() : savedRepos[idx];
    }).map(function (url) {
      return url ? _this4.teamRef.child("repoIds/" + (0, _helpers.fbKeyEncode)(url)).once("value").then(function (snap) {
        return snap.val() || { id: (0, _helpers.fbKeyEncode)(url), url: url };
      }) : Promise.resolve({});
    }));
  },
  showRepoSettings: function showRepoSettings(repos, channels) {
    var _this5 = this;

    if (this.repoSettingsView) {
      this.repoSettingsView.destroy();
    }
    this.teamRef.child("repoIds").once("value").then(function (snap) {
      var repoIds = snap.val() || {};
      _this5.repoSettingsView = new _repoSettingsView2.default({
        repos: repos,
        channels: channels,
        repoIds: Object.keys(repoIds).map(function (key) {
          return repoIds[key];
        }),
        onSave: _this5.onSave.bind(_this5)
      });
    }).catch(function (err) {
      console.error(err);
      _this5.repoSettingsView = new _repoSettingsView2.default({
        repos: repos,
        channels: channels,
        repoIds: [],
        onSave: _this5.onSave.bind(_this5)
      });
    });
  },
  onSave: function onSave(_ref2) {
    var _this6 = this;

    var repos = _ref2.repos;

    repos.forEach(function (repo) {
      return _this6.teamRef.child("repoIds/" + repo.id).update(repo);
    });
    var paths = atom.project.getPaths();
    this.state.repos = repos.map(function (repo) {
      return repo.url;
    });
    this.onEditorActive(atom.workspace.getActiveTextEditor());
  },
  initRepoSettingsView: function initRepoSettingsView(repos) {
    var _this7 = this;

    this.teamRef.child("channels").once("value").then(function (snap) {
      var val = snap.val() || {};
      return Object.keys(val).map(function (key) {
        return val[key];
      });
    }).then(function (channels) {
      return _this7.showRepoSettings(repos, channels);
    }).catch(console.error);
  },
  auth: function auth() {
    var win = new BrowserWindow({
      toolbar: true,
      //    width: 800,
      //    height: 550,
      show: false,
      "node-integration": false,
      "web-preferences": { javascript: true }
    });
    var siteUrl = (0, _helpers.getSiteUrl)();
    var successUrl = siteUrl + "/login/success";
    var signInUrl = siteUrl + "/login/atom";
    win.loadURL(signInUrl);
    win.once("ready-to-show", function () {
      return win.show();
    });

    win.webContents.on("did-get-redirect-request", function (event, oldUrl, url) {
      if (url.indexOf(successUrl) === 0) {
        var token = url.substring(successUrl.length + 1); // +1 for slash
        firebase.auth().signInWithCustomToken(token).catch(console.error);
      }
    });
    win.webContents.on("did-finish-load", function () {
      win.webContents.executeJavaScript("window.isInsideAtom=true;");
    });
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("remote");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64_url_decode = __webpack_require__(23);

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

module.exports = function (token,options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

module.exports.InvalidTokenError = InvalidTokenError;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var atob = __webpack_require__(24);

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

module.exports = function(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try{
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill (input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}


module.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = __webpack_require__(26);
var RequestBase = __webpack_require__(27);
var isObject = __webpack_require__(5);
var isFunction = __webpack_require__(28);
var ResponseBase = __webpack_require__(29);
var shouldRetry = __webpack_require__(31);

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only verison of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
      
    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
    break;  
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */

Request.prototype._appendQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if (isFunction(this._sort)) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._appendQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = __webpack_require__(5);

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, read, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Check if `fn` is a function.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api private
 */
var isObject = __webpack_require__(5);

function isFunction(fn) {
  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
  return tag === '[object Function]';
}

module.exports = isFunction;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var utils = __webpack_require__(30);

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


exports.createFirebaseNamespace = createFirebaseNamespace;

var _subscribe = __webpack_require__(33);

var _errors = __webpack_require__(35);

var _shared_promise = __webpack_require__(10);

var _deep_copy = __webpack_require__(36);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var contains = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
var LocalPromise = _shared_promise.local.Promise;
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
// An array to capture listeners before the true auth functions
// exist
var tokenListeners = [];
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */

var FirebaseAppImpl = function () {
    function FirebaseAppImpl(options, name, firebase_) {
        _classCallCheck(this, FirebaseAppImpl);

        this.firebase_ = firebase_;
        this.isDeleted_ = false;
        this.services_ = {};
        this.name_ = name;
        this.options_ = (0, _deep_copy.deepCopy)(options);
        this.INTERNAL = {
            'getUid': function getUid() {
                return null;
            },
            'getToken': function getToken() {
                return LocalPromise.resolve(null);
            },
            'addAuthTokenListener': function addAuthTokenListener(callback) {
                tokenListeners.push(callback);
                // Make sure callback is called, asynchronously, in the absence of the auth module
                setTimeout(function () {
                    return callback(null);
                }, 0);
            },
            'removeAuthTokenListener': function removeAuthTokenListener(callback) {
                tokenListeners = tokenListeners.filter(function (listener) {
                    return listener !== callback;
                });
            }
        };
    }

    _createClass(FirebaseAppImpl, [{
        key: 'delete',
        value: function _delete() {
            var _this = this;

            return new LocalPromise(function (resolve) {
                _this.checkDestroyed_();
                resolve();
            }).then(function () {
                _this.firebase_.INTERNAL.removeApp(_this.name_);
                var services = [];
                Object.keys(_this.services_).forEach(function (serviceKey) {
                    Object.keys(_this.services_[serviceKey]).forEach(function (instanceKey) {
                        services.push(_this.services_[serviceKey][instanceKey]);
                    });
                });
                return LocalPromise.all(services.map(function (service) {
                    return service.INTERNAL.delete();
                }));
            }).then(function () {
                _this.isDeleted_ = true;
                _this.services_ = {};
            });
        }
        /**
         * Return a service instance associated with this app (creating it
         * on demand), identified by the passed instanceIdentifier.
         *
         * NOTE: Currently storage is the only one that is leveraging this
         * functionality. They invoke it by calling:
         *
         * ```javascript
         * firebase.app().storage('STORAGE BUCKET ID')
         * ```
         *
         * The service name is passed to this already
         * @internal
         */

    }, {
        key: '_getService',
        value: function _getService(name) {
            var instanceIdentifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ENTRY_NAME;

            this.checkDestroyed_();
            if (!this.services_[name]) {
                this.services_[name] = {};
            }
            if (!this.services_[name][instanceIdentifier]) {
                /**
                 * If a custom instance has been defined (i.e. not '[DEFAULT]')
                 * then we will pass that instance on, otherwise we pass `null`
                 */
                var instanceSpecifier = instanceIdentifier !== DEFAULT_ENTRY_NAME ? instanceIdentifier : undefined;
                var service = this.firebase_.INTERNAL.factories[name](this, this.extendApp.bind(this), instanceSpecifier);
                this.services_[name][instanceIdentifier] = service;
            }
            return this.services_[name][instanceIdentifier];
        }
        /**
         * Callback function used to extend an App instance at the time
         * of service instance creation.
         */

    }, {
        key: 'extendApp',
        value: function extendApp(props) {
            var _this2 = this;

            // Copy the object onto the FirebaseAppImpl prototype
            (0, _deep_copy.deepExtend)(this, props);
            /**
             * If the app has overwritten the addAuthTokenListener stub, forward
             * the active token listeners on to the true fxn.
             *
             * TODO: This function is required due to our current module
             * structure. Once we are able to rely strictly upon a single module
             * implementation, this code should be refactored and Auth should
             * provide these stubs and the upgrade logic
             */
            if (props.INTERNAL && props.INTERNAL.addAuthTokenListener) {
                tokenListeners.forEach(function (listener) {
                    _this2.INTERNAL.addAuthTokenListener(listener);
                });
                tokenListeners = [];
            }
        }
        /**
         * This function will throw an Error if the App has already been deleted -
         * use before performing API actions on the App.
         */

    }, {
        key: 'checkDestroyed_',
        value: function checkDestroyed_() {
            if (this.isDeleted_) {
                error('app-deleted', { 'name': this.name_ });
            }
        }
    }, {
        key: 'name',
        get: function get() {
            this.checkDestroyed_();
            return this.name_;
        }
    }, {
        key: 'options',
        get: function get() {
            this.checkDestroyed_();
            return this.options_;
        }
    }]);

    return FirebaseAppImpl;
}();

// Prevent dead-code elimination of these methods w/o invalid property
// copying.
FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options || FirebaseAppImpl.prototype.delete || console.log("dc");
/**
 * Return a firebase namespace object.
 *
 * In production, this will be called exactly once and the result
 * assigned to the 'firebase' global.  It may be called multiple times
 * in unit tests.
 */
function createFirebaseNamespace() {
    var apps_ = {};
    var factories = {};
    var appHooks = {};
    // A namespace is a plain JavaScript Object.
    var namespace = {
        // Hack to prevent Babel from modifying the object returned
        // as the firebase namespace.
        '__esModule': true,
        'initializeApp':
        /**
         * Create a new App instance (name must be unique).
         */
        function (options, name) {
            if (name === undefined) {
                name = DEFAULT_ENTRY_NAME;
            } else {
                if (typeof name !== 'string' || name === '') {
                    error('bad-app-name', { 'name': name + '' });
                }
            }
            if (contains(apps_, name)) {
                error('duplicate-app', { 'name': name });
            }
            var app = new FirebaseAppImpl(options, name, namespace);
            apps_[name] = app;
            callAppHooks(app, 'create');
            return app;
        }
        /*
         * Return an array of all the non-deleted FirebaseApps.
         */
        ,
        'app': app,
        'apps': null,
        'Promise': LocalPromise,
        'SDK_VERSION': '4.1.3',
        'INTERNAL': {
            'registerService':
            /*
             * Register a Firebase Service.
             *
             * firebase.INTERNAL.registerService()
             *
             * TODO: Implement serviceProperties.
             */
            function (name, createService, serviceProperties, appHook, allowMultipleInstances) {
                // Cannot re-register a service that already exists
                if (factories[name]) {
                    error('duplicate-service', { 'name': name });
                }
                // Capture the service factory for later service instantiation
                factories[name] = createService;
                // Capture the appHook, if passed
                if (appHook) {
                    appHooks[name] = appHook;
                    // Run the **new** app hook on all existing apps
                    getApps().forEach(function (app) {
                        appHook('create', app);
                    });
                }
                // The Service namespace is an accessor function ...
                var serviceNamespace = function () {
                    var appArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : app();

                    if (typeof appArg[name] !== 'function') {
                        // Invalid argument.
                        // This happens in the following case: firebase.storage('gs:/')
                        error('invalid-app-argument', { 'name': name });
                    }
                    // Forward service instance lookup to the FirebaseApp.
                    return appArg[name]();
                };
                // ... and a container for service-level properties.
                if (serviceProperties !== undefined) {
                    (0, _deep_copy.deepExtend)(serviceNamespace, serviceProperties);
                }
                // Monkey-patch the serviceNamespace onto the firebase namespace
                namespace[name] = serviceNamespace;
                // Patch the FirebaseAppImpl prototype
                FirebaseAppImpl.prototype[name] = function () {
                    var serviceFxn = this._getService.bind(this, name);

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return serviceFxn.apply(this, allowMultipleInstances ? args : []);
                };
                return serviceNamespace;
            }
            /**
             * Patch the top-level firebase namespace with additional properties.
             *
             * firebase.INTERNAL.extendNamespace()
             */
            ,
            'createFirebaseNamespace': createFirebaseNamespace,
            'extendNamespace': function (props) {
                (0, _deep_copy.deepExtend)(namespace, props);
            },
            'createSubscribe': _subscribe.createSubscribe,
            'ErrorFactory': _errors.ErrorFactory,
            'removeApp':
            /**
             * Called by App.delete() - but before any services associated with the App
             * are deleted.
             */
            function (name) {
                var app = apps_[name];
                callAppHooks(app, 'delete');
                delete apps_[name];
            }
            /**
             * Get the App object for a given name (or DEFAULT).
             */
            ,
            'factories': factories,
            'useAsService': useAsService,
            'Promise': _shared_promise.local.GoogPromise,
            'deepExtend': _deep_copy.deepExtend
        }
    };
    // Inject a circular default export to allow Babel users who were previously
    // using:
    //
    //   import firebase from 'firebase';
    //   which becomes: var firebase = require('firebase').default;
    //
    // instead of
    //
    //   import * as firebase from 'firebase';
    //   which becomes: var firebase = require('firebase');
    (0, _deep_copy.patchProperty)(namespace, 'default', namespace);
    // firebase.apps is a read-only getter.
    Object.defineProperty(namespace, 'apps', {
        get: getApps
    });function app(name) {
        name = name || DEFAULT_ENTRY_NAME;
        if (!contains(apps_, name)) {
            error('no-app', { 'name': name });
        }
        return apps_[name];
    }
    (0, _deep_copy.patchProperty)(app, 'App', FirebaseAppImpl);function getApps() {
        // Make a copy so caller cannot mutate the apps list.
        return Object.keys(apps_).map(function (name) {
            return apps_[name];
        });
    }
    function callAppHooks(app, eventName) {
        Object.keys(factories).forEach(function (serviceName) {
            // Ignore virtual services
            var factoryName = useAsService(app, serviceName);
            if (factoryName === null) {
                return;
            }
            if (appHooks[factoryName]) {
                appHooks[factoryName](eventName, app);
            }
        });
    }
    // Map the requested service to a registered service name
    // (used to map auth to serverAuth service when needed).
    function useAsService(app, name) {
        if (name === 'serverAuth') {
            return null;
        }
        app.options;

        return name;
    }
    return namespace;
}
function error(code, args) {
    throw appErrors.create(code, args);
}
// TypeScript does not support non-string indexes!
// let errors: {[code: AppError: string} = {
var errors = {
    'no-app': 'No Firebase App \'{$name}\' has been created - ' + 'call Firebase App.initializeApp()',
    'bad-app-name': 'Illegal App name: \'{$name}',
    'duplicate-app': 'Firebase App named \'{$name}\' already exists',
    'app-deleted': 'Firebase App named \'{$name}\' already deleted',
    'duplicate-service': 'Firebase service named \'{$name}\' already registered',
    'sa-not-supported': 'Initializing the Firebase SDK with a service ' + 'account is only allowed in a Node.js environment. On client ' + 'devices, you should instead initialize the SDK with an api key and ' + 'auth domain',
    'invalid-app-argument': 'firebase.{$name}() takes either no argument or a ' + 'Firebase App instance.'
};
var appErrors = new _errors.ErrorFactory('app', 'Firebase', errors);
//# sourceMappingURL=firebase_app.js.map


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createSubscribe = createSubscribe;
exports.async = async;

var _shared_promise = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalPromise = _shared_promise.local.Promise;
/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    var proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */

var ObserverProxy = function () {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function ObserverProxy(executor, onNoObservers) {
        var _this = this;

        _classCallCheck(this, ObserverProxy);

        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = LocalPromise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task.then(function () {
            executor(_this);
        }).catch(function (e) {
            _this.error(e);
        });
    }

    _createClass(ObserverProxy, [{
        key: 'next',
        value: function next(value) {
            this.forEachObserver(function (observer) {
                observer.next(value);
            });
        }
    }, {
        key: 'error',
        value: function error(_error) {
            this.forEachObserver(function (observer) {
                observer.error(_error);
            });
            this.close(_error);
        }
    }, {
        key: 'complete',
        value: function complete() {
            this.forEachObserver(function (observer) {
                observer.complete();
            });
            this.close();
        }
        /**
         * Subscribe function that can be used to add an Observer to the fan-out list.
         *
         * - We require that no event is sent to a subscriber sychronously to their
         *   call to subscribe().
         */

    }, {
        key: 'subscribe',
        value: function subscribe(nextOrObserver, error, complete) {
            var _this2 = this;

            var observer = void 0;
            if (nextOrObserver === undefined && error === undefined && complete === undefined) {
                throw new Error("Missing Observer.");
            }
            // Assemble an Observer object when passed as callback functions.
            if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
                observer = nextOrObserver;
            } else {
                observer = {
                    next: nextOrObserver,
                    error: error,
                    complete: complete
                };
            }
            if (observer.next === undefined) {
                observer.next = noop;
            }
            if (observer.error === undefined) {
                observer.error = noop;
            }
            if (observer.complete === undefined) {
                observer.complete = noop;
            }
            var unsub = this.unsubscribeOne.bind(this, this.observers.length);
            // Attempt to subscribe to a terminated Observable - we
            // just respond to the Observer with the final error or complete
            // event.
            if (this.finalized) {
                this.task.then(function () {
                    try {
                        if (_this2.finalError) {
                            observer.error(_this2.finalError);
                        } else {
                            observer.complete();
                        }
                    } catch (e) {
                        // nothing
                    }
                });
            }
            this.observers.push(observer);
            return unsub;
        }
        // Unsubscribe is synchronous - we guarantee that no events are sent to
        // any unsubscribed Observer.

    }, {
        key: 'unsubscribeOne',
        value: function unsubscribeOne(i) {
            if (this.observers === undefined || this.observers[i] === undefined) {
                return;
            }
            delete this.observers[i];
            this.observerCount -= 1;
            if (this.observerCount === 0 && this.onNoObservers !== undefined) {
                this.onNoObservers(this);
            }
        }
    }, {
        key: 'forEachObserver',
        value: function forEachObserver(fn) {
            if (this.finalized) {
                // Already closed by previous event....just eat the additional values.
                return;
            }
            // Since sendOne calls asynchronously - there is no chance that
            // this.observers will become undefined.
            for (var i = 0; i < this.observers.length; i++) {
                this.sendOne(i, fn);
            }
        }
        // Call the Observer via one of it's callback function. We are careful to
        // confirm that the observe has not been unsubscribed since this asynchronous
        // function had been queued.

    }, {
        key: 'sendOne',
        value: function sendOne(i, fn) {
            var _this3 = this;

            // Execute the callback asynchronously
            this.task.then(function () {
                if (_this3.observers !== undefined && _this3.observers[i] !== undefined) {
                    try {
                        fn(_this3.observers[i]);
                    } catch (e) {
                        // Ignore exceptions raised in Observers or missing methods of an
                        // Observer.
                        // Log error to console. b/31404806
                        if (typeof console !== "undefined" && console.error) {
                            console.error(e);
                        }
                    }
                }
            });
        }
    }, {
        key: 'close',
        value: function close(err) {
            var _this4 = this;

            if (this.finalized) {
                return;
            }
            this.finalized = true;
            if (err !== undefined) {
                this.finalError = err;
            }
            // Proxy is no longer needed - garbage collect references
            this.task.then(function () {
                _this4.observers = undefined;
                _this4.onNoObservers = undefined;
            });
        }
    }]);

    return ObserverProxy;
}();
/** Turn synchronous function into one called asynchronously. */


function async(fn, onError) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        LocalPromise.resolve(true).then(function () {
            fn.apply(undefined, args);
        }).catch(function (error) {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
        return false;
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var method = _step.value;

            if (method in obj && typeof obj[method] === 'function') {
                return true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return false;
}
function noop() {
    // do nothing
}
//# sourceMappingURL=subscribe.js.map


/***/ }),
/* 34 */
/***/ (function(module, exports) {

(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.patchCapture = patchCapture;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERROR_NAME = 'FirebaseError';
var captureStackTrace = Error.captureStackTrace;
// Export for faking in tests
function patchCapture(captureFake) {
    var result = captureStackTrace;
    captureStackTrace = captureFake;
    return result;
}

var FirebaseError = exports.FirebaseError = function FirebaseError(code, message) {
    _classCallCheck(this, FirebaseError);

    this.code = code;
    this.message = message;

    // We want the stack value, if implemented by Error
    if (captureStackTrace) {
        // Patches this.stack, omitted calls above ErrorFactory#create
        captureStackTrace(this, ErrorFactory.prototype.create);
    } else {
        var err = Error.apply(this, arguments);
        this.name = ERROR_NAME;
        // Make non-enumerable getter for the property.
        Object.defineProperty(this, 'stack', {
            get: function get() {
                return err.stack;
            }
        });
    }
};
// Back-door inheritance


FirebaseError.prototype = Object.create(Error.prototype);
FirebaseError.prototype.constructor = FirebaseError;
FirebaseError.prototype.name = ERROR_NAME;

var ErrorFactory = exports.ErrorFactory = function () {
    function ErrorFactory(service, serviceName, errors) {
        _classCallCheck(this, ErrorFactory);

        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
        // Matches {$name}, by default.
        this.pattern = /\{\$([^}]+)}/g;
        // empty
    }

    _createClass(ErrorFactory, [{
        key: 'create',
        value: function create(code, data) {
            if (data === undefined) {
                data = {};
            }
            var template = this.errors[code];
            var fullCode = this.service + '/' + code;
            var message = void 0;
            if (template === undefined) {
                message = "Error";
            } else {
                message = template.replace(this.pattern, function (match, key) {
                    var value = data[key];
                    return value !== undefined ? value.toString() : '<' + key + '?>';
                });
            }
            // Service: Error message (service/code).
            message = this.serviceName + ': ' + message + ' (' + fullCode + ').';
            var err = new FirebaseError(fullCode, message);
            // Populate the Error object with message parts for programmatic
            // accesses (e.g., e.file).
            for (var prop in data) {
                if (!data.hasOwnProperty(prop) || prop.slice(-1) === '_') {
                    continue;
                }
                err[prop] = data[prop];
            }
            return err;
        }
    }]);

    return ErrorFactory;
}();
//# sourceMappingURL=errors.js.map


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/ */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deepCopy = deepCopy;
exports.deepExtend = deepExtend;
exports.patchProperty = patchProperty;
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
/**
* Copyright 2017 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            return new Date(source.getTime());
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!

        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}
// TODO: Really needed (for JSCompiler type checking)?
function patchProperty(obj, prop, value) {
    obj[prop] = value;
}
//# sourceMappingURL=deep_copy.js.map


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _atom = __webpack_require__(0);

var _etch = __webpack_require__(2);

var _etch2 = _interopRequireDefault(_etch);

var _atomSelectList = __webpack_require__(43);

var _atomSelectList2 = _interopRequireDefault(_atomSelectList);

var _helpers = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = _etch2.default.dom;

var RepoSettingsView = function RepoSettingsView(props) {
  var _this = this;

  _classCallCheck(this, RepoSettingsView);

  Object.defineProperty(this, "attachEvents", {
    enumerable: true,
    writable: true,
    value: function value() {
      _this.refs.close.addEventListener("click", _this.destroy);
      _this.refs.cancel.addEventListener("click", _this.destroy);
      _this.refs.save.addEventListener("click", _this.onSave);
      _this.uidisposables.add(new _atom.Disposable(function () {
        _this.refs.close.removeEventListener("click", _this.destroy);
        _this.refs.cancel.removeEventListener("click", _this.destroy);
        _this.refs.save.removeEventListener("click", _this.onSave);
      }));
    }
  });
  Object.defineProperty(this, "onClose", {
    enumerable: true,
    writable: true,
    value: function value() {
      _this.getModalPanel().hide();
    }
  });
  Object.defineProperty(this, "onSave", {
    enumerable: true,
    writable: true,
    value: function value() {
      if (_this.refs.save.classList.contains("disabled")) {
        return;
      }
      if (_this.props.onSave) {
        var _props = _this.props,
            repos = _props.repos,
            channels = _props.channels;

        _this.props.onSave({ repos: repos, channels: channels });
      }
      _this.destroy();
    }
  });
  Object.defineProperty(this, "update", {
    enumerable: true,
    writable: true,
    value: function value() {
      _this.uidisposables.dispose();
      return _etch2.default.update(_this);
    }
  });
  Object.defineProperty(this, "render", {
    enumerable: true,
    writable: true,
    value: function value() {
      return $.div({}, _this.renderModalHeader(), _this.renderRepos(), _this.renderAction());
    }
  });
  Object.defineProperty(this, "renderChannelList", {
    enumerable: true,
    writable: true,
    value: function value(idx) {
      return $(_atomSelectList2.default, {
        emptyMessage: "No channels setup. See https://codesidestory/setup",
        ref: "list" + idx,
        items: _this.props.channels,
        filterKeyForItem: function filterKeyForItem(channel) {
          return [channel.name, channel.purpose.value].join(" ");
        },
        elementForItem: function elementForItem(channel) {
          return _etch2.default.render($.li({ className: "two-lines" }, $.div({ className: "text-highlight" }, channel.name), $.div({ className: "text-subtle" }, channel.purpose.value)));
        },
        didConfirmSelection: function didConfirmSelection(channel) {
          _this.props.repos = _this.props.repos.map(function (repo, i) {
            return i === idx ? _extends({}, repo, { channel: channel }) : repo;
          });
          _this.showList = false;
          _this.update();
        }
      });
    }
  });
  Object.defineProperty(this, "renderModalHeader", {
    enumerable: true,
    writable: true,
    value: function value() {
      return $.div({ className: "css-header" }, $.h1({}, "Repo Settings"), $.div({ className: "icon icon-x css-close", ref: "close" }));
    }
  });
  Object.defineProperty(this, "renderChannel", {
    enumerable: true,
    writable: true,
    value: function value(channel, idx) {
      if (!channel) {
        return $.span({ className: "text-warning" }, "None selected");
      }
      return $.span({ className: "text-success" }, "#" + channel.name);
    }
  });
  Object.defineProperty(this, "writeAfterUpdate", {
    enumerable: true,
    writable: true,
    value: function value() {
      var repos = _this.props.repos;

      _this.uidisposables = new _atom.CompositeDisposable();
      _this.disposables.add(_this.uidisposables);

      _this.attachEvents();

      repos.forEach(function (repo, idx) {
        var repoInput = _this.refs["repo" + idx];
        var list = _this.refs["list" + idx];
        if (repoInput) {
          if (repo.url) {
            repoInput.setText(repo.url);
          }
          _this.uidisposables.add(repoInput.onDidStopChanging(function (e) {
            repo.url = repoInput.getText();
            repo.id = (0, _helpers.fbKeyEncode)(repoInput.getText());
            _this.update();
          }));
        }
        if (!repo.channel || !_this.refs["list" + idx]) {
          return;
        }
        var chIdx = _this.props.channels.findIndex(function (ch) {
          return ch.id === repo.channel.id;
        });
        if (chIdx === -1) {
          return;
        }
        _this.refs["list" + idx] && _this.refs["list" + idx].selectIndex(chIdx);
      });
    }
  });
  Object.defineProperty(this, "renderRepoList", {
    enumerable: true,
    writable: true,
    value: function value(idx) {
      return $(_atomSelectList2.default, {
        ref: "repoList" + idx,
        items: _this.props.repoIds,
        filterKeyForItem: function filterKeyForItem(repo) {
          return repo.url;
        },
        elementForItem: function elementForItem(repo) {
          return _etch2.default.render($.li({ className: "two-lines" }, $.div({ className: "text-highlight" }, repo.url), $.div({ className: "text-subtle" }, repo.channel ? "Channel: #" + repo.channel.name : "")));
        },
        didConfirmSelection: function didConfirmSelection(repo) {
          var inp = _this.refs["repo" + idx];
          _this.props.repos[idx] = repo;
          if (inp) {
            inp.setText(repo.url);
          }
          _this.showRepoList[idx] = false;
          _this.update();
        }
      });
    }
  });
  Object.defineProperty(this, "renderRepo", {
    enumerable: true,
    writable: true,
    value: function value(repo, idx) {
      var showList = !repo.channel || _this.showList;
      var showRepoList = _this.showRepoList[idx] && _this.props.repoIds.length > 0;

      return $.li({ className: "list-item padded css-item" }, $.div({ className: "css-block" }, $.h4({}, "Project: " + _this.rootPaths[idx]), _this.showRepoList[idx] ? $(_atom.TextEditor, {
        mini: true,
        ref: "repo" + idx,
        placeholderText: "Enter new repo url or select from list below"
      }) : $.div({ className: "css-line-item" }, $.span({}, "Repo : "), $.span({ className: "text-success" }, repo.url), !showRepoList ? $.a({
        className: "css-link",
        onClick: function onClick(e) {
          e.preventDefault();
          _this.showRepoList[idx] = true;
          _this.update();
        }
      }, "Change") : null), showRepoList ? _this.renderRepoList(idx) : null), $.div({ className: "css-block" }, $.div({ className: "css-line-item" }, "Slack channel for repo: ", _this.renderChannel(repo.channel, idx), repo.channel && !showList ? $.a({
        className: "css-link",
        onClick: function onClick(e) {
          e.preventDefault();
          _this.showList = true;
          _this.update();
        }
      }, "Change") : null), showList ? _this.renderChannelList(idx) : null));
    }
  });
  Object.defineProperty(this, "renderRepos", {
    enumerable: true,
    writable: true,
    value: function value() {
      return $.ul.apply($, [{ className: "list-group css-repo-list" }].concat(_toConsumableArray(_this.props.repos.map(_this.renderRepo))));
    }
  });
  Object.defineProperty(this, "renderAction", {
    enumerable: true,
    writable: true,
    value: function value() {
      var disabled = !!_this.props.repos.find(function (repo, idx) {
        return !repo.channel || !repo.url;
      });
      return $.div({ className: "css-action" }, $.button({
        className: "btn css-margin-right",
        ref: "cancel"
      }, "Cancel"), $.button({
        className: "btn btn-primary " + (disabled ? "disabled" : ""),
        ref: "save"
      }, "Save"));
    }
  });
  Object.defineProperty(this, "getModalPanel", {
    enumerable: true,
    writable: true,
    value: function value() {
      if (!_this.modalPanel) {
        _this.modalPanel = atom.workspace.addModalPanel({ item: _this.element });
        _this.disposables.add(new _atom.Disposable(function () {
          return _this.modalPanel.destroy();
        }));
      }
      return _this.modalPanel;
    }
  });
  Object.defineProperty(this, "destroy", {
    enumerable: true,
    writable: true,
    value: function value() {
      return _this.disposables.dispose();
    }
  });

  this.props = props;

  this.disposables = new _atom.CompositeDisposable();

  this.showRepoList = this.props.repos.map(function (repo) {
    return !repo.url;
  });
  this.rootPaths = atom.project.getPaths();

  _etch2.default.initialize(this);
  this.disposables.add(new _atom.Disposable(function () {
    return _etch2.default.destroy(_this);
  }));

  this.writeAfterUpdate();
  this.getModalPanel().show();
};

exports.default = RepoSettingsView;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

const EVENT_LISTENER_PROPS = __webpack_require__(12)
const SVG_TAGS = __webpack_require__(6)

function dom (tag, props, ...children) {
  for (let i = 0; i < children.length;) {
    const child = children[i]
    switch (typeof child) {
      case 'string':
      case 'number':
        children[i] = {text: child}
        i++
        break;

      case 'object':
        if (Array.isArray(child)) {
          children.splice(i, 1, ...child)
        } else if (!child) {
          children.splice(i, 1)
        } else {
          i++
        }
        break;

      default:
        throw new Error(`Invalid child node: ${child}`)
    }
  }

  if (props) {
    for (const propName in props) {
      const eventName = EVENT_LISTENER_PROPS[propName]
      if (eventName) {
        if (!props.on) props.on = {}
        props.on[eventName] = props[propName]
      }
    }

    if (props.class) {
      props.className = props.class
    }
  }

  return {tag, props, children}
}

const HTML_TAGS = [
  'a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo',
  'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code',
  'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl',
  'dt', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html', 'i', 'iframe', 'ins', 'kbd',
  'label', 'legend', 'li', 'main', 'map', 'mark', 'menu', 'meter', 'nav',
  'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'pre',
  'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section',
  'select', 'small', 'span', 'strong', 'style', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title',
  'tr', 'u', 'ul', 'var', 'video', 'area', 'base', 'br', 'col', 'command',
  'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source',
  'track', 'wbr'
]

for (const tagName of HTML_TAGS) {
  dom[tagName] = (props, ...children) => {
    return dom(tagName, props, ...children)
  }
}

for (const tagName of SVG_TAGS) {
  dom[tagName] = (props, ...children) => {
    return dom(tagName, props, ...children)
  }
}


module.exports = dom


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// Based on https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
module.exports = new Map([
  ['accentHeight', 'accent-height'],
  ['alignmentBaseline', 'alignment-baseline'],
  ['arabicForm', 'arabic-form'],
  ['baselineShift', 'baseline-shift'],
  ['capHeight', 'cap-height'],
  ['className', 'class'],
  ['clipPath', 'clip-path'],
  ['clipRule', 'clip-rule'],
  ['colorInterpolation', 'color-interpolation'],
  ['colorInterpolationFilters', 'color-interpolation-filters'],
  ['colorProfile', 'color-profile'],
  ['colorRendering', 'color-rendering'],
  ['dominantBaseline', 'dominant-baseline'],
  ['enableBackground', 'enable-background'],
  ['fillOpacity', 'fill-opacity'],
  ['fillRule', 'fill-rule'],
  ['floodColor', 'flood-color'],
  ['floodOpacity', 'flood-opacity'],
  ['fontFamily', 'font-family'],
  ['fontSize', 'font-size'],
  ['fontSizeAdjust', 'font-size-adjust'],
  ['fontStretch', 'font-stretch'],
  ['fontStyle', 'font-style'],
  ['fontVariant', 'font-variant'],
  ['fontWeight', 'font-weight'],
  ['glyphName', 'glyph-name'],
  ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
  ['glyphOrientationVertical', 'glyph-orientation-vertical'],
  ['horizAdvX', 'horiz-adv-x'],
  ['horizOriginX', 'horiz-origin-x'],
  ['letterSpacing', 'letter-spacing'],
  ['lightingColor', 'lighting-color'],
  ['markerEnd', 'marker-end'],
  ['markerMid', 'marker-mid'],
  ['markerStart', 'marker-start'],
  ['overlinePosition', 'overline-position'],
  ['overlineThickness', 'overline-thickness'],
  ['panose1', 'panose-1'],
  ['paintOrder', 'paint-order'],
  ['pointerEvents', 'pointer-events'],
  ['renderingIntent', 'rendering-intent'],
  ['shapeRendering', 'shape-rendering'],
  ['stopColor', 'stop-color'],
  ['stopOpacity', 'stop-opacity'],
  ['strikethroughPosition', 'strikethrough-position'],
  ['strikethroughThickness', 'strikethrough-thickness'],
  ['strokeDasharray', 'stroke-dasharray'],
  ['strokeDashoffset', 'stroke-dashoffset'],
  ['strokeLinecap', 'stroke-linecap'],
  ['strokeLinejoin', 'stroke-linejoin'],
  ['strokeMiterlimit', 'stroke-miterlimit'],
  ['strokeOpacity', 'stroke-opacity'],
  ['strokeWidth', 'stroke-width'],
  ['textAnchor', 'text-anchor'],
  ['textDecoration', 'text-decoration'],
  ['textRendering', 'text-rendering'],
  ['underlinePosition', 'underline-position'],
  ['underlineThickness', 'underline-thickness'],
  ['unicodeBidi', 'unicode-bidi'],
  ['unicodeRange', 'unicode-range'],
  ['unitsPerEm', 'units-per-em'],
  ['vAlphabetic', 'v-alphabetic'],
  ['vHanging', 'v-hanging'],
  ['vIdeographic', 'v-ideographic'],
  ['vMathematical', 'v-mathematical'],
  ['vertAdvY', 'vert-adv-y'],
  ['vertOriginX', 'vert-origin-x'],
  ['vertOriginY', 'vert-origin-y'],
  ['wordSpacing', 'word-spacing'],
  ['writingMode', 'writing-mode'],
  ['xHeight', 'x-height'],
])


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(7)
const patch = __webpack_require__(41)
const {getScheduler} = __webpack_require__(14)

const componentsWithPendingUpdates = new WeakSet()
let syncUpdatesInProgressCounter = 0
let syncDestructionsInProgressCounter = 0

function isValidVirtualNode (virtualNode) {
  return virtualNode != null && virtualNode !== false
}

// This function associates a component object with a DOM element by calling
// the components `render` method, assigning an `.element` property on the
// object and also returning the element.
//
// It also assigns a `virtualNode` property based on the return value of the
// `render` method. This will be used later by `performElementUpdate` to diff
// the new results of `render` with the previous results when updating the
// component's element.
//
// Finally, this function also associates the component with a `refs` object,
// which is populated with references to elements based on `ref` properties on
// nodes of the `virtual-dom` tree. Before calling into `virtual-dom` to create
// the DOM tree, it pushes this `refs` object to a shared stack so it can be
// accessed by hooks during the creation of individual elements.
function initialize(component) {
  if (typeof component.update !== 'function') {
    throw new Error('Etch components must implement `update(props, children)`.')
  }

  let virtualNode = component.render()
  if (!isValidVirtualNode(virtualNode)) {
    let namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : ''
    throw new Error('invalid falsy value ' + virtualNode + ' returned from render()' + namePart)
  }

  component.refs = {}
  component.virtualNode = virtualNode
  component.element = render(component.virtualNode, {
    refs: component.refs, listenerContext: component
  })
}

// This function receives a component that has already been associated with an
// element via a previous call to `initialize` and updates this element by
// calling `render` on the component.
//
// When called in normal circumstances, it uses the scheduler to defer this
// update until the next animation frame, and will only perform one update of a
// given component in a given frame. This means you can call `update`
// repeatedly in a given tick without causing redundant updates.
//
// If this function called during another synchronous update (for example, as a
// result of a call to `update` on a child component), the update is performed
// synchronously.
//
// Returns a promise that will resolve when the requested update has been
// completed.
function update (component, replaceNode=true) {
  if (syncUpdatesInProgressCounter > 0) {
    updateSync(component, replaceNode)
    return Promise.resolve()
  }

  let scheduler = getScheduler()

  if (!componentsWithPendingUpdates.has(component)) {
    componentsWithPendingUpdates.add(component)
    scheduler.updateDocument(function () {
      componentsWithPendingUpdates.delete(component)
      updateSync(component, replaceNode)
    })
  }

  return scheduler.getNextUpdatePromise()
}

// Synchronsly updates the DOM element associated with a component object. .
// This method assumes the presence of `.element` and `.virtualNode`
// properties on the component, which are assigned in the `initialize`
// function.
//
// It calls `render` on the component to obtain the desired state of the DOM,
// then `diff`s it with the previous state and `patch`es the element based on
// the resulting diff. During the patch operation, it pushes the component's
// `refs` object to a shared stack so that references to DOM elements can be
// updated.
//
// If `update` is called during the invocation of `updateSync`,
// the requests are processed synchronously as well. We track whether this is
// the case by incrementing and decrementing `syncUpdatesInProgressCounter`
// around the call.
//
// For now, etch does not allow the root tag of the `render` method to change
// between invocations, because we want to preserve a one-to-one relationship
// between component objects and DOM elements for simplicity.
function updateSync (component, replaceNode=true) {
  let newVirtualNode = component.render()
  if (!isValidVirtualNode(newVirtualNode)) {
    let namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : ''
    throw new Error('invalid falsy value ' + newVirtualNode + ' returned from render()' + namePart)
  }

  syncUpdatesInProgressCounter++
  let oldVirtualNode = component.virtualNode
  let oldDomNode = component.element
  let newDomNode = patch(oldVirtualNode, newVirtualNode, {
    refs: component.refs,
    listenerContext: component
  })
  component.virtualNode = newVirtualNode
  if (newDomNode !== oldDomNode && !replaceNode) {
    throw new Error('The root node type changed on update, but the update was performed with the replaceNode option set to false')
  } else {
    component.element = newDomNode
  }

  // We can safely perform additional writes after a DOM update synchronously,
  // but any reads need to be deferred until all writes are completed to avoid
  // DOM thrashing. Requested reads occur at the end of the the current frame
  // if this method was invoked via the scheduler. Otherwise, if `updateSync`
  // was invoked outside of the scheduler, the default scheduler will defer
  // reads until the next animation frame.
  if (typeof component.writeAfterUpdate === 'function') {
    component.writeAfterUpdate()
  }
  if (typeof component.readAfterUpdate === 'function') {
    getScheduler().readDocument(function () {
      component.readAfterUpdate()
    })
  }

  syncUpdatesInProgressCounter--
}

// Removes the component's associated element and calls `destroy` on any child
// components. Normally, this function is asynchronous and will perform the
// destruction on the next animation frame. If called as the result of another
// update or destruction, it calls `destroy` on child components synchronously.
// If called as the result of destroying a component higher in the DOM, the
// element is not removed to avoid redundant DOM manipulation. Returns a promise
// that resolves when the destruction is completed.
function destroy (component, removeNode=true) {
  if (syncUpdatesInProgressCounter > 0 || syncDestructionsInProgressCounter > 0) {
    destroySync(component, removeNode)
    return Promise.resolve()
  }

  let scheduler = getScheduler()
  scheduler.updateDocument(function () {
    destroySync(component, removeNode)
  })
  return scheduler.getNextUpdatePromise()
}

// A synchronous version of `destroy`.
//
// Note that we track whether `destroy` calls are in progress and only remove
// the element if we are not a nested call.
function destroySync (component, removeNode=true) {
  syncDestructionsInProgressCounter++
  destroyChildComponents(component.virtualNode)
  if (syncDestructionsInProgressCounter === 1 && removeNode) component.element.remove()
  syncDestructionsInProgressCounter--
}

function destroyChildComponents(virtualNode) {
  if (virtualNode.component && typeof virtualNode.component.destroy === 'function') {
    virtualNode.component.destroy()
  } else if (virtualNode.children) {
    virtualNode.children.forEach(destroyChildComponents)
  }
}

module.exports = {
  initialize,
  update, updateSync,
  destroy, destroySync
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(7)
const updateProps = __webpack_require__(13)

function patch (oldVirtualNode, newVirtualNode, options) {
  const oldNode = oldVirtualNode.domNode

  if (newVirtualNode === oldVirtualNode) return oldNode

  if (virtualNodesAreEqual(oldVirtualNode, newVirtualNode)) {
    let newNode
    if (newVirtualNode.text != null) {
      oldNode.nodeValue = newVirtualNode.text
      newNode = oldNode
    } else {
      if (typeof newVirtualNode.tag === 'function') {
        newNode = updateComponent(oldVirtualNode, newVirtualNode, options)
      } else {
        updateChildren(oldNode, oldVirtualNode.children, newVirtualNode.children, options)
        updateProps(oldNode, oldVirtualNode, newVirtualNode, options)
        newNode = oldNode
      }
    }
    newVirtualNode.domNode = newNode
    if (newNode !== oldNode && oldNode.parentNode) {
      oldNode.parentNode.replaceChild(newNode, oldNode)
    }
    return newNode
  } else {
    const parentNode = oldNode.parentNode
    const nextSibling = oldNode.nextSibling
    removeVirtualNode(oldVirtualNode, options && options.refs)
    const newNode = render(newVirtualNode, options)
    if (parentNode) parentNode.insertBefore(newNode, nextSibling)
    newVirtualNode.domNode = newNode
    return newNode
  }
}

function updateComponent (oldVirtualNode, newVirtualNode, options) {
  const {component, props: oldProps} = oldVirtualNode
  let {props: newProps, children: newChildren} = newVirtualNode
  newVirtualNode.component = component
  if (options && options.refs) {
    const refs = options.refs
    const oldRefName = oldProps && oldProps.ref
    const newRefName = newProps && newProps.ref
    if (newRefName !== oldRefName) {
      if (oldRefName && refs[oldRefName] === component) delete refs[oldRefName]
      if (newRefName) refs[newRefName] = component
    }
  }
  component.update(newProps || {}, newChildren)
  return component.element
}

let mapPool = [new Map(), new Map(), new Map(), new Map()]

function updateChildren (parentElement, oldChildren, newChildren, options) {
  var oldStartIndex = 0
  var oldEndIndex = oldChildren.length - 1
  var oldStartChild = oldChildren[0]
  var oldEndChild = oldChildren[oldEndIndex]

  var newStartIndex = 0
  var newEndIndex = newChildren.length - 1
  var newStartChild = newChildren[0]
  var newEndChild = newChildren[newEndIndex]

  var oldIndicesByKey

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartChild) {
      oldStartChild = oldChildren[++oldStartIndex]
    } else if (!oldEndChild) {
      oldEndChild = oldChildren[--oldEndIndex]
    } else if (virtualNodesAreEqual(oldStartChild, newStartChild)) {
      patch(oldStartChild, newStartChild, options)
      oldStartChild = oldChildren[++oldStartIndex]
      newStartChild = newChildren[++newStartIndex]
    } else if (virtualNodesAreEqual(oldEndChild, newEndChild)) {
      patch(oldEndChild, newEndChild, options)
      oldEndChild = oldChildren[--oldEndIndex]
      newEndChild = newChildren[--newEndIndex]
    } else if (virtualNodesAreEqual(oldStartChild, newEndChild)) {
      patch(oldStartChild, newEndChild, options)
      parentElement.insertBefore(oldStartChild.domNode, oldEndChild.domNode.nextSibling)
      oldStartChild = oldChildren[++oldStartIndex]
      newEndChild = newChildren[--newEndIndex]
    } else if (virtualNodesAreEqual(oldEndChild, newStartChild)) {
      patch(oldEndChild, newStartChild, options)
      parentElement.insertBefore(oldEndChild.domNode, oldStartChild.domNode);
      oldEndChild = oldChildren[--oldEndIndex]
      newStartChild = newChildren[++newStartIndex]
    } else {
      if (!oldIndicesByKey) {
        if (mapPool.length > 0) {
          oldIndicesByKey = mapPool.pop()
          oldIndicesByKey.clear()
        } else {
          oldIndicesByKey = new Map()
        }
        mapOldKeysToIndices(oldIndicesByKey, oldChildren, oldStartIndex, oldEndIndex)
      }

      var key = getKey(newStartChild)
      var oldIndex = key ? oldIndicesByKey.get(key) : null
      if (oldIndex == null) {
        parentElement.insertBefore(render(newStartChild, options), oldStartChild.domNode)
        newStartChild = newChildren[++newStartIndex]
      } else {
        var oldChildToMove = oldChildren[oldIndex]
        patch(oldChildToMove, newStartChild, options)
        oldChildren[oldIndex] = undefined
        parentElement.insertBefore(oldChildToMove.domNode, oldStartChild.domNode)
        newStartChild = newChildren[++newStartIndex]
      }
    }
  }

  if (oldStartIndex > oldEndIndex) {
    var subsequentElement = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].domNode : null
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parentElement.insertBefore(render(newChildren[i], options), subsequentElement)
    }
  } else if (newStartIndex > newEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      var child = oldChildren[i]
      if (child) removeVirtualNode(child, options && options.refs)
    }
  }

  if (oldIndicesByKey) mapPool.push(oldIndicesByKey)
}

function removeVirtualNode (virtualNode, refs, removeDOMNode = true) {
  const {domNode, props, children, component} = virtualNode
  const ref = props && props.ref
  if (component) {
    if (refs && ref && refs[ref] === component) delete refs[ref]
    if (component.destroy) component.destroy()
  } else {
    if (refs && ref && refs[ref] === domNode) delete refs[ref]
    if (children) {
      for (let i = 0; i < children.length; i++) {
        removeVirtualNode(children[i], refs, false)
      }
    }
  }

  if (removeDOMNode) domNode.remove()
}

function virtualNodesAreEqual (oldVirtualNode, newVirtualNode) {
  return (
    getKey(oldVirtualNode) === getKey(newVirtualNode)
      && oldVirtualNode.tag === newVirtualNode.tag
  )
}

function getKey (virtualNode) {
  return virtualNode.props ? virtualNode.props.key : undefined
}

function mapOldKeysToIndices (oldIndicesByKey, children, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    const key = getKey(children[i])
    if (key) oldIndicesByKey.set(key, i)
  }
  return oldIndicesByKey
}

module.exports = patch


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// If the scheduler is not customized via `etch.setScheduler`, an instance of
// this class will be used to schedule updates to the document. The
// `updateDocument` method accepts functions to be run at some point in the
// future, then runs them on the next animation frame.
module.exports = class DefaultScheduler {
  constructor () {
    this.updateRequests = []
    this.readRequests = []
    this.pendingAnimationFrame = null
    this.performUpdates = this.performUpdates.bind(this)
    this.performingUpdates = false
  }

  // Enqueues functions that write to the DOM to be performed on the next
  // animation frame. Functions passed to this method should *never* read from
  // the DOM, because that could cause synchronous reflows.
  updateDocument (fn) {
    this.updateRequests.push(fn)
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates)
    }
  }

  readDocument (fn) {
    this.readRequests.push(fn)
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates)
    }
  }

  // Returns a promise that will resolve at the end of the next update cycle,
  // after all the functions passed to `updateDocument` and `updateDocumentSync`
  // have been run.
  getNextUpdatePromise () {
    if (!this.nextUpdatePromise) {
      this.nextUpdatePromise = new Promise(resolve => {
        this.resolveNextUpdatePromise = resolve
      })
    }
    return this.nextUpdatePromise
  }

  // Performs all the pending document updates. If running these update
  // functions causes *more* updates to be enqueued, they are run synchronously
  // in this update cycle without waiting for another frame.
  performUpdates () {
    while (this.updateRequests.length > 0) {
      this.updateRequests.shift()()
    }

    // We don't clear the pending frame until all update requests are processed.
    // This ensures updates requested within other updates are processed in the
    // current frame.
    this.pendingAnimationFrame = null

    // Now that updates are processed, we can perform all pending document reads
    // without the risk of interleaving them with writes and causing layout
    // thrashing.
    while (this.readRequests.length > 0) {
      this.readRequests.shift()()
    }

    if (this.nextUpdatePromise) {
      let resolveNextUpdatePromise = this.resolveNextUpdatePromise
      this.nextUpdatePromise = null
      this.resolveNextUpdatePromise = null
      resolveNextUpdatePromise()
    }
  }
}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

const {Disposable, CompositeDisposable, TextEditor} = __webpack_require__(0)
const etch = __webpack_require__(44)
const $ = etch.dom
const fuzzaldrin = __webpack_require__(50)
const path = __webpack_require__(3)

module.exports = class SelectListView {
  constructor (props) {
    this.props = props
    this.computeItems(false)
    this.disposables = new CompositeDisposable()
    etch.initialize(this)
    this.element.classList.add('select-list')
    this.disposables.add(this.refs.queryEditor.onDidChange(this.didChangeQuery.bind(this)))
    if (!props.skipCommandsRegistration) {
      this.disposables.add(this.registerAtomCommands())
    }
    const editorElement = this.refs.queryEditor.element
    const didLoseFocus = this.didLoseFocus.bind(this)
    editorElement.addEventListener('blur', didLoseFocus)
    this.disposables.add(new Disposable(() => { editorElement.removeEventListener('blur', didLoseFocus) }))
  }

  focus () {
    this.refs.queryEditor.element.focus()
  }

  didLoseFocus (event) {
    if (this.element.contains(event.relatedTarget)) {
      this.refs.queryEditor.element.focus()
    } else if (document.hasFocus()) {
      this.cancelSelection()
    }
  }

  reset () {
    this.refs.queryEditor.setText('')
  }

  destroy () {
    this.disposables.dispose()
    return etch.destroy(this)
  }

  registerAtomCommands () {
    return global.atom.commands.add(this.element, {
      'core:move-up': (event) => {
        this.selectPrevious()
        event.stopPropagation()
      },
      'core:move-down': (event) => {
        this.selectNext()
        event.stopPropagation()
      },
      'core:move-to-top': (event) => {
        this.selectFirst()
        event.stopPropagation()
      },
      'core:move-to-bottom': (event) => {
        this.selectLast()
        event.stopPropagation()
      },
      'core:confirm': (event) => {
        this.confirmSelection()
        event.stopPropagation()
      },
      'core:cancel': (event) => {
        this.cancelSelection()
        event.stopPropagation()
      }
    })
  }

  update (props = {}) {
    let shouldComputeItems = false

    if (props.hasOwnProperty('items')) {
      this.props.items = props.items
      shouldComputeItems = true
    }

    if (props.hasOwnProperty('maxResults')) {
      this.props.maxResults = props.maxResults
      shouldComputeItems = true
    }

    if (props.hasOwnProperty('filter')) {
      this.props.filter = props.filter
      shouldComputeItems = true
    }

    if (props.hasOwnProperty('filterQuery')) {
      this.props.filterQuery = props.filterQuery
      shouldComputeItems = true
    }

    if (props.hasOwnProperty('query')) {
      // Items will be recomputed as part of the change event handler, so we
      // don't need to recompute them again at the end of this function.
      this.refs.queryEditor.setText(props.query)
      shouldComputeItems = false
    }

    if (props.hasOwnProperty('order')) {
      this.props.order = props.order
    }

    if (props.hasOwnProperty('emptyMessage')) {
      this.props.emptyMessage = props.emptyMessage
    }

    if (props.hasOwnProperty('errorMessage')) {
      this.props.errorMessage = props.errorMessage
    }

    if (props.hasOwnProperty('infoMessage')) {
      this.props.infoMessage = props.infoMessage
    }

    if (props.hasOwnProperty('loadingMessage')) {
      this.props.loadingMessage = props.loadingMessage
    }

    if (props.hasOwnProperty('loadingBadge')) {
      this.props.loadingBadge = props.loadingBadge
    }

    if (props.hasOwnProperty('itemsClassList')) {
      this.props.itemsClassList = props.itemsClassList
    }

    if (shouldComputeItems) {
      this.computeItems()
    }

    return etch.update(this)
  }

  render () {
    return $.div(
      {},
      $(TextEditor, {ref: 'queryEditor', mini: true}),
      this.renderLoadingMessage(),
      this.renderInfoMessage(),
      this.renderErrorMessage(),
      this.renderItems()
    )
  }

  renderItems () {
    if (this.items.length > 0) {
      const className = ['list-group'].concat(this.props.itemsClassList || []).join(' ')
      return $.ol(
        {className, ref: 'items'},
        ...this.items.map((item, index) => $(ListItemView, {
          element: this.props.elementForItem(item),
          selected: this.getSelectedItem() === item,
          onclick: () => this.didClickItem(index)
        }))
      )
    } else if (!this.props.loadingMessage && this.props.emptyMessage) {
      return $.span({ref: 'emptyMessage'}, this.props.emptyMessage)
    } else {
      return ""
    }
  }

  renderErrorMessage () {
    if (this.props.errorMessage) {
      return $.span({ref: 'errorMessage'}, this.props.errorMessage)
    } else {
      return ''
    }
  }

  renderInfoMessage () {
    if (this.props.infoMessage) {
      return $.span({ref: 'infoMessage'}, this.props.infoMessage)
    } else {
      return ''
    }
  }

  renderLoadingMessage () {
    if (this.props.loadingMessage) {
      return $.div(
        {className: 'loading'},
        $.span({ref: 'loadingMessage', className: 'loading-message'}, this.props.loadingMessage),
        this.props.loadingBadge ? $.span({ref: 'loadingBadge', className: 'badge'}, this.props.loadingBadge) : ''
      )
    } else {
      return ''
    }
  }

  getQuery () {
    if (this.refs && this.refs.queryEditor) {
      return this.refs.queryEditor.getText()
    } else {
      return ''
    }
  }

  getFilterQuery () {
    return this.props.filterQuery ? this.props.filterQuery(this.getQuery()) : this.getQuery()
  }

  didChangeQuery () {
    if (this.props.didChangeQuery) {
      this.props.didChangeQuery(this.getFilterQuery())
    }

    this.computeItems()
  }

  didClickItem (itemIndex) {
    this.selectIndex(itemIndex)
    this.confirmSelection()
  }

  computeItems (updateComponent) {
    const filterFn = this.props.filter || this.fuzzyFilter.bind(this)
    this.items = filterFn(this.props.items.slice(), this.getFilterQuery())
    if (this.props.order) {
      this.items.sort(this.props.order)
    }
    if (this.props.maxResults) {
      this.items.splice(this.props.maxResults, this.items.length - this.props.maxResults)
    }

    this.selectIndex(0, updateComponent)
  }

  fuzzyFilter (items, query) {
    if (query.length === 0) {
      return items
    } else {
      const scoredItems = []
      for (const item of items) {
        const string = this.props.filterKeyForItem ? this.props.filterKeyForItem(item) : item
        let score = fuzzaldrin.score(string, query)
        if (score > 0) {
          scoredItems.push({item, score})
        }
      }
      scoredItems.sort((a, b) => b.score - a.score)
      return scoredItems.map((i) => i.item)
    }
  }

  getSelectedItem () {
    return this.items[this.selectionIndex]
  }

  selectPrevious () {
    return this.selectIndex(this.selectionIndex - 1)
  }

  selectNext () {
    return this.selectIndex(this.selectionIndex + 1)
  }

  selectFirst () {
    return this.selectIndex(0)
  }

  selectLast () {
    return this.selectIndex(this.items.length - 1)
  }

  selectIndex (index, updateComponent = true) {
    if (index >= this.items.length) {
      index = 0
    } else if (index < 0) {
      index = this.items.length - 1
    }

    this.selectionIndex = index
    if (this.props.didChangeSelection) {
      this.props.didChangeSelection(this.getSelectedItem())
    }

    if (updateComponent) {
      return etch.update(this)
    } else {
      return Promise.resolve()
    }
  }

  selectItem (item) {
    const index = this.items.indexOf(item)
    if (index === -1) {
      throw new Error('Cannot select the specified item because it does not exist.')
    } else {
      return this.selectIndex(index)
    }
  }

  confirmSelection () {
    const selectedItem = this.getSelectedItem()
    if (selectedItem != null) {
      if (this.props.didConfirmSelection) {
        this.props.didConfirmSelection(selectedItem)
      }
    } else {
      if (this.props.didConfirmEmptySelection) {
        this.props.didConfirmEmptySelection()
      }
    }
  }

  cancelSelection () {
    if (this.props.didCancelSelection) {
      this.props.didCancelSelection()
    }
  }
}

class ListItemView {
  constructor (props) {
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.didClick = this.didClick.bind(this)
    this.selected = props.selected
    this.onclick = props.onclick
    this.element = props.element
    this.element.addEventListener('mousedown', this.mouseDown)
    this.element.addEventListener('mouseup', this.mouseUp)
    this.element.addEventListener('click', this.didClick)
    if (this.selected) {
      this.element.classList.add('selected')
    }
    this.domEventsDisposable = new Disposable(() => {
      this.element.removeEventListener('mousedown', this.mouseDown)
      this.element.removeEventListener('mouseup', this.mouseUp)
      this.element.removeEventListener('click', this.didClick)
    })
    etch.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this))
  }

  mouseDown (event) {
    event.preventDefault()
  }

  mouseUp () {
    event.preventDefault()
  }

  didClick (event) {
    event.preventDefault()
    this.onclick()
  }

  destroy () {
    this.element.remove()
    this.domEventsDisposable.dispose()
  }

  update (props) {
    this.element.removeEventListener('mousedown', this.mouseDown)
    this.element.removeEventListener('mouseup', this.mouseUp)
    this.element.removeEventListener('click', this.didClick)

    this.element.parentNode.replaceChild(props.element, this.element)
    this.element = props.element
    this.element.addEventListener('mousedown', this.mouseDown)
    this.element.addEventListener('mouseup', this.mouseUp)
    this.element.addEventListener('click', this.didClick)
    if (props.selected) {
      this.element.classList.add('selected')
    }

    this.selected = props.selected
    this.onclick = props.onclick
    etch.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this))
  }

  scrollIntoViewIfNeeded () {
    if (this.selected) {
      this.element.scrollIntoViewIfNeeded()
    }
  }
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

const dom = __webpack_require__(45)
const render = __webpack_require__(9)
const {initialize, update, updateSync, destroy, destroySync} = __webpack_require__(47)
const {setScheduler, getScheduler} = __webpack_require__(17)

module.exports = {
  dom, render,
  initialize, update, updateSync, destroy, destroySync,
  setScheduler, getScheduler
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

const EVENT_LISTENER_PROPS = __webpack_require__(15)
const SVG_TAGS = __webpack_require__(8)

function dom (tag, props, ...children) {
  for (let i = 0; i < children.length;) {
    const child = children[i]
    switch (typeof child) {
      case 'string':
      case 'number':
        children[i] = {text: child}
        i++
        break;

      case 'object':
        if (Array.isArray(child)) {
          children.splice(i, 1, ...child)
        } else if (!child) {
          children.splice(i, 1)
        } else {
          i++
        }
        break;

      default:
        throw new Error(`Invalid child node: ${child}`)
    }
  }

  if (props) {
    for (const propName in props) {
      const eventName = EVENT_LISTENER_PROPS[propName]
      if (eventName) {
        if (!props.on) props.on = {}
        props.on[eventName] = props[propName]
      }
    }

    if (props.class) {
      props.className = props.class
    }
  }

  return {tag, props, children}
}

const HTML_TAGS = [
  'a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo',
  'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code',
  'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl',
  'dt', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html', 'i', 'iframe', 'ins', 'kbd',
  'label', 'legend', 'li', 'main', 'map', 'mark', 'menu', 'meter', 'nav',
  'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'pre',
  'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section',
  'select', 'small', 'span', 'strong', 'style', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title',
  'tr', 'u', 'ul', 'var', 'video', 'area', 'base', 'br', 'col', 'command',
  'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source',
  'track', 'wbr'
]

for (const tagName of HTML_TAGS) {
  dom[tagName] = (props, ...children) => {
    return dom(tagName, props, ...children)
  }
}

for (const tagName of SVG_TAGS) {
  dom[tagName] = (props, ...children) => {
    return dom(tagName, props, ...children)
  }
}


module.exports = dom


/***/ }),
/* 46 */
/***/ (function(module, exports) {

// Based on https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
module.exports = new Map([
  ['accentHeight', 'accent-height'],
  ['alignmentBaseline', 'alignment-baseline'],
  ['arabicForm', 'arabic-form'],
  ['baselineShift', 'baseline-shift'],
  ['capHeight', 'cap-height'],
  ['className', 'class'],
  ['clipPath', 'clip-path'],
  ['clipRule', 'clip-rule'],
  ['colorInterpolation', 'color-interpolation'],
  ['colorInterpolationFilters', 'color-interpolation-filters'],
  ['colorProfile', 'color-profile'],
  ['colorRendering', 'color-rendering'],
  ['dominantBaseline', 'dominant-baseline'],
  ['enableBackground', 'enable-background'],
  ['fillOpacity', 'fill-opacity'],
  ['fillRule', 'fill-rule'],
  ['floodColor', 'flood-color'],
  ['floodOpacity', 'flood-opacity'],
  ['fontFamily', 'font-family'],
  ['fontSize', 'font-size'],
  ['fontSizeAdjust', 'font-size-adjust'],
  ['fontStretch', 'font-stretch'],
  ['fontStyle', 'font-style'],
  ['fontVariant', 'font-variant'],
  ['fontWeight', 'font-weight'],
  ['glyphName', 'glyph-name'],
  ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
  ['glyphOrientationVertical', 'glyph-orientation-vertical'],
  ['horizAdvX', 'horiz-adv-x'],
  ['horizOriginX', 'horiz-origin-x'],
  ['letterSpacing', 'letter-spacing'],
  ['lightingColor', 'lighting-color'],
  ['markerEnd', 'marker-end'],
  ['markerMid', 'marker-mid'],
  ['markerStart', 'marker-start'],
  ['overlinePosition', 'overline-position'],
  ['overlineThickness', 'overline-thickness'],
  ['panose1', 'panose-1'],
  ['paintOrder', 'paint-order'],
  ['pointerEvents', 'pointer-events'],
  ['renderingIntent', 'rendering-intent'],
  ['shapeRendering', 'shape-rendering'],
  ['stopColor', 'stop-color'],
  ['stopOpacity', 'stop-opacity'],
  ['strikethroughPosition', 'strikethrough-position'],
  ['strikethroughThickness', 'strikethrough-thickness'],
  ['strokeDasharray', 'stroke-dasharray'],
  ['strokeDashoffset', 'stroke-dashoffset'],
  ['strokeLinecap', 'stroke-linecap'],
  ['strokeLinejoin', 'stroke-linejoin'],
  ['strokeMiterlimit', 'stroke-miterlimit'],
  ['strokeOpacity', 'stroke-opacity'],
  ['strokeWidth', 'stroke-width'],
  ['textAnchor', 'text-anchor'],
  ['textDecoration', 'text-decoration'],
  ['textRendering', 'text-rendering'],
  ['underlinePosition', 'underline-position'],
  ['underlineThickness', 'underline-thickness'],
  ['unicodeBidi', 'unicode-bidi'],
  ['unicodeRange', 'unicode-range'],
  ['unitsPerEm', 'units-per-em'],
  ['vAlphabetic', 'v-alphabetic'],
  ['vHanging', 'v-hanging'],
  ['vIdeographic', 'v-ideographic'],
  ['vMathematical', 'v-mathematical'],
  ['vertAdvY', 'vert-adv-y'],
  ['vertOriginX', 'vert-origin-x'],
  ['vertOriginY', 'vert-origin-y'],
  ['wordSpacing', 'word-spacing'],
  ['writingMode', 'writing-mode'],
  ['xHeight', 'x-height'],
])


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(9)
const patch = __webpack_require__(48)
const {getScheduler} = __webpack_require__(17)

const componentsWithPendingUpdates = new WeakSet()
let syncUpdatesInProgressCounter = 0
let syncDestructionsInProgressCounter = 0

function isValidVirtualNode (virtualNode) {
  return virtualNode != null && virtualNode !== false
}

// This function associates a component object with a DOM element by calling
// the components `render` method, assigning an `.element` property on the
// object and also returning the element.
//
// It also assigns a `virtualNode` property based on the return value of the
// `render` method. This will be used later by `performElementUpdate` to diff
// the new results of `render` with the previous results when updating the
// component's element.
//
// Finally, this function also associates the component with a `refs` object,
// which is populated with references to elements based on `ref` properties on
// nodes of the `virtual-dom` tree. Before calling into `virtual-dom` to create
// the DOM tree, it pushes this `refs` object to a shared stack so it can be
// accessed by hooks during the creation of individual elements.
function initialize(component) {
  if (typeof component.update !== 'function') {
    throw new Error('Etch components must implement `update(props, children)`.')
  }

  let virtualNode = component.render()
  if (!isValidVirtualNode(virtualNode)) {
    let namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : ''
    throw new Error('invalid falsy value ' + virtualNode + ' returned from render()' + namePart)
  }

  component.refs = {}
  component.virtualNode = virtualNode
  component.element = render(component.virtualNode, {
    refs: component.refs, listenerContext: component
  })
}

// This function receives a component that has already been associated with an
// element via a previous call to `initialize` and updates this element by
// calling `render` on the component.
//
// When called in normal circumstances, it uses the scheduler to defer this
// update until the next animation frame, and will only perform one update of a
// given component in a given frame. This means you can call `update`
// repeatedly in a given tick without causing redundant updates.
//
// If this function called during another synchronous update (for example, as a
// result of a call to `update` on a child component), the update is performed
// synchronously.
//
// Returns a promise that will resolve when the requested update has been
// completed.
function update (component, replaceNode=true) {
  if (syncUpdatesInProgressCounter > 0) {
    updateSync(component, replaceNode)
    return Promise.resolve()
  }

  let scheduler = getScheduler()

  if (!componentsWithPendingUpdates.has(component)) {
    componentsWithPendingUpdates.add(component)
    scheduler.updateDocument(function () {
      componentsWithPendingUpdates.delete(component)
      updateSync(component, replaceNode)
    })
  }

  return scheduler.getNextUpdatePromise()
}

// Synchronsly updates the DOM element associated with a component object. .
// This method assumes the presence of `.element` and `.virtualNode`
// properties on the component, which are assigned in the `initialize`
// function.
//
// It calls `render` on the component to obtain the desired state of the DOM,
// then `diff`s it with the previous state and `patch`es the element based on
// the resulting diff. During the patch operation, it pushes the component's
// `refs` object to a shared stack so that references to DOM elements can be
// updated.
//
// If `update` is called during the invocation of `updateSync`,
// the requests are processed synchronously as well. We track whether this is
// the case by incrementing and decrementing `syncUpdatesInProgressCounter`
// around the call.
//
// For now, etch does not allow the root tag of the `render` method to change
// between invocations, because we want to preserve a one-to-one relationship
// between component objects and DOM elements for simplicity.
function updateSync (component, replaceNode=true) {
  let newVirtualNode = component.render()
  if (!isValidVirtualNode(newVirtualNode)) {
    let namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : ''
    throw new Error('invalid falsy value ' + newVirtualNode + ' returned from render()' + namePart)
  }

  syncUpdatesInProgressCounter++
  let oldVirtualNode = component.virtualNode
  let oldDomNode = component.element
  let newDomNode = patch(oldVirtualNode, newVirtualNode, {
    refs: component.refs,
    listenerContext: component
  })
  component.virtualNode = newVirtualNode
  if (newDomNode !== oldDomNode && !replaceNode) {
    throw new Error('The root node type changed on update, but the update was performed with the replaceNode option set to false')
  } else {
    component.element = newDomNode
  }

  // We can safely perform additional writes after a DOM update synchronously,
  // but any reads need to be deferred until all writes are completed to avoid
  // DOM thrashing. Requested reads occur at the end of the the current frame
  // if this method was invoked via the scheduler. Otherwise, if `updateSync`
  // was invoked outside of the scheduler, the default scheduler will defer
  // reads until the next animation frame.
  if (typeof component.writeAfterUpdate === 'function') {
    component.writeAfterUpdate()
  }
  if (typeof component.readAfterUpdate === 'function') {
    getScheduler().readDocument(function () {
      component.readAfterUpdate()
    })
  }

  syncUpdatesInProgressCounter--
}

// Removes the component's associated element and calls `destroy` on any child
// components. Normally, this function is asynchronous and will perform the
// destruction on the next animation frame. If called as the result of another
// update or destruction, it calls `destroy` on child components synchronously.
// If called as the result of destroying a component higher in the DOM, the
// element is not removed to avoid redundant DOM manipulation. Returns a promise
// that resolves when the destruction is completed.
function destroy (component, removeNode=true) {
  if (syncUpdatesInProgressCounter > 0 || syncDestructionsInProgressCounter > 0) {
    destroySync(component, removeNode)
    return Promise.resolve()
  }

  let scheduler = getScheduler()
  scheduler.updateDocument(function () {
    destroySync(component, removeNode)
  })
  return scheduler.getNextUpdatePromise()
}

// A synchronous version of `destroy`.
//
// Note that we track whether `destroy` calls are in progress and only remove
// the element if we are not a nested call.
function destroySync (component, removeNode=true) {
  syncDestructionsInProgressCounter++
  destroyChildComponents(component.virtualNode)
  if (syncDestructionsInProgressCounter === 1 && removeNode) component.element.remove()
  syncDestructionsInProgressCounter--
}

function destroyChildComponents(virtualNode) {
  if (virtualNode.component && typeof virtualNode.component.destroy === 'function') {
    virtualNode.component.destroy()
  } else if (virtualNode.children) {
    virtualNode.children.forEach(destroyChildComponents)
  }
}

module.exports = {
  initialize,
  update, updateSync,
  destroy, destroySync
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

const render = __webpack_require__(9)
const updateProps = __webpack_require__(16)

function patch (oldVirtualNode, newVirtualNode, options) {
  const oldNode = oldVirtualNode.domNode
  if (virtualNodesAreEqual(oldVirtualNode, newVirtualNode)) {
    let newNode
    if (newVirtualNode.text != null) {
      oldNode.nodeValue = newVirtualNode.text
      newNode = oldNode
    } else {
      if (typeof newVirtualNode.tag === 'function') {
        newNode = updateComponent(oldVirtualNode, newVirtualNode, options)
      } else {
        updateChildren(oldNode, oldVirtualNode.children, newVirtualNode.children, options)
        updateProps(oldNode, oldVirtualNode, newVirtualNode, options)
        newNode = oldNode
      }
    }
    newVirtualNode.domNode = newNode
    if (newNode !== oldNode && oldNode.parentNode) {
      oldNode.parentNode.replaceChild(newNode, oldNode)
    }
    return newNode
  } else {
    const parentNode = oldNode.parentNode
    const nextSibling = oldNode.nextSibling
    removeVirtualNode(oldVirtualNode, options && options.refs)
    const newNode = render(newVirtualNode, options)
    if (parentNode) parentNode.insertBefore(newNode, nextSibling)
    newVirtualNode.domNode = newNode
    return newNode
  }
}

function updateComponent (oldVirtualNode, newVirtualNode, options) {
  const {component, props: oldProps} = oldVirtualNode
  let {props: newProps, children: newChildren} = newVirtualNode
  newVirtualNode.component = component
  if (options && options.refs) {
    const refs = options.refs
    const oldRefName = oldProps && oldProps.ref
    const newRefName = newProps && newProps.ref
    if (newRefName !== oldRefName) {
      if (oldRefName && refs[oldRefName] === component) delete refs[oldRefName]
      if (newRefName) refs[newRefName] = component
    }
  }
  component.update(newProps || {}, newChildren)
  return component.element
}

function updateChildren (parentElement, oldChildren, newChildren, options) {
  let oldStartIndex = 0
  let oldEndIndex = oldChildren.length - 1
  let oldStartChild = oldChildren[0]
  let oldEndChild = oldChildren[oldEndIndex]

  let newStartIndex = 0
  let newEndIndex = newChildren.length - 1
  let newStartChild = newChildren[0]
  let newEndChild = newChildren[newEndIndex]

  let oldIndicesByKey

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartChild) {
      oldStartChild = oldChildren[++oldStartIndex]
    } else if (!oldEndChild) {
      oldEndChild = oldChildren[--oldEndIndex]
    } else if (virtualNodesAreEqual(oldStartChild, newStartChild)) {
      patch(oldStartChild, newStartChild, options)
      oldStartChild = oldChildren[++oldStartIndex]
      newStartChild = newChildren[++newStartIndex]
    } else if (virtualNodesAreEqual(oldEndChild, newEndChild)) {
      patch(oldEndChild, newEndChild, options)
      oldEndChild = oldChildren[--oldEndIndex]
      newEndChild = newChildren[--newEndIndex]
    } else if (virtualNodesAreEqual(oldStartChild, newEndChild)) {
      patch(oldStartChild, newEndChild, options)
      parentElement.insertBefore(oldStartChild.domNode, oldEndChild.domNode.nextSibling)
      oldStartChild = oldChildren[++oldStartIndex]
      newEndChild = newChildren[--newEndIndex]
    } else if (virtualNodesAreEqual(oldEndChild, newStartChild)) {
      patch(oldEndChild, newStartChild, options)
      parentElement.insertBefore(oldEndChild.domNode, oldStartChild.domNode);
      oldEndChild = oldChildren[--oldEndIndex]
      newStartChild = newChildren[++newStartIndex]
    } else {
      if (!oldIndicesByKey) oldIndicesByKey = mapOldKeysToIndices(oldChildren, oldStartIndex, oldEndIndex)
      const key = getKey(newStartChild)
      const oldIndex = key ? oldIndicesByKey[key] : null
      if (oldIndex == null) {
        parentElement.insertBefore(render(newStartChild, options), oldStartChild.domNode)
        newStartChild = newChildren[++newStartIndex]
      } else {
        const oldChildToMove = oldChildren[oldIndex]
        patch(oldChildToMove, newStartChild, options)
        oldChildren[oldIndex] = undefined
        parentElement.insertBefore(oldChildToMove.domNode, oldStartChild.domNode)
        newStartChild = newChildren[++newStartIndex]
      }
    }
  }

  if (oldStartIndex > oldEndIndex) {
    const subsequentElement = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].domNode : null
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parentElement.insertBefore(render(newChildren[i], options), subsequentElement)
    }
  } else if (newStartIndex > newEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      const child = oldChildren[i]
      if (child) removeVirtualNode(child, options && options.refs)
    }
  }
}

function removeVirtualNode (virtualNode, refs, removeDOMNode = true) {
  const {domNode, props, children, component} = virtualNode
  const ref = props && props.ref
  if (component) {
    if (refs && ref && refs[ref] === component) delete refs[ref]
    if (typeof component.destroy === 'function') component.destroy()
  } else {
    if (refs && ref && refs[ref] === domNode) delete refs[ref]
    if (children) {
      for (let i = 0; i < children.length; i++) {
        removeVirtualNode(children[i], refs, false)
      }
    }
  }

  if (removeDOMNode) domNode.remove()
}

function virtualNodesAreEqual (oldVirtualNode, newVirtualNode) {
  return (
    getKey(oldVirtualNode) === getKey(newVirtualNode)
      && oldVirtualNode.tag === newVirtualNode.tag
  )
}

function getKey (virtualNode) {
  return virtualNode.props ? virtualNode.props.key : undefined
}

function mapOldKeysToIndices (children, startIndex, endIndex) {
  let oldIndicesByKey = {}
  for (let i = startIndex; i <= endIndex; i++) {
    const key = getKey(children[i])
    if (key) oldIndicesByKey[key] = i
  }
  return oldIndicesByKey;
}

module.exports = patch


/***/ }),
/* 49 */
/***/ (function(module, exports) {

// If the scheduler is not customized via `etch.setScheduler`, an instance of
// this class will be used to schedule updates to the document. The
// `updateDocument` method accepts functions to be run at some point in the
// future, then runs them on the next animation frame.
module.exports = class DefaultScheduler {
  constructor () {
    this.updateRequests = []
    this.readRequests = []
    this.pendingAnimationFrame = null
    this.performUpdates = this.performUpdates.bind(this)
    this.performingUpdates = false
  }

  // Enqueues functions that write to the DOM to be performed on the next
  // animation frame. Functions passed to this method should *never* read from
  // the DOM, because that could cause synchronous reflows.
  updateDocument (fn) {
    this.updateRequests.push(fn)
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates)
    }
  }

  readDocument (fn) {
    this.readRequests.push(fn)
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates)
    }
  }

  // Returns a promise that will resolve at the end of the next update cycle,
  // after all the functions passed to `updateDocument` and `updateDocumentSync`
  // have been run.
  getNextUpdatePromise () {
    if (!this.nextUpdatePromise) {
      this.nextUpdatePromise = new Promise(resolve => {
        this.resolveNextUpdatePromise = resolve
      })
    }
    return this.nextUpdatePromise
  }

  // Performs all the pending document updates. If running these update
  // functions causes *more* updates to be enqueued, they are run synchronously
  // in this update cycle without waiting for another frame.
  performUpdates () {
    while (this.updateRequests.length > 0) {
      this.updateRequests.shift()()
    }

    // We don't clear the pending frame until all update requests are processed.
    // This ensures updates requested within other updates are processed in the
    // current frame.
    this.pendingAnimationFrame = null

    // Now that updates are processed, we can perform all pending document reads
    // without the risk of interleaving them with writes and causing layout
    // thrashing.
    while (this.readRequests.length > 0) {
      this.readRequests.shift()()
    }

    if (this.nextUpdatePromise) {
      let resolveNextUpdatePromise = this.resolveNextUpdatePromise
      this.nextUpdatePromise = null
      this.resolveNextUpdatePromise = null
      resolveNextUpdatePromise()
    }
  }
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var PathSeparator, SpaceRegex, filter, matcher, scorer;

  scorer = __webpack_require__(18);

  filter = __webpack_require__(51);

  matcher = __webpack_require__(52);

  PathSeparator = __webpack_require__(3).sep;

  SpaceRegex = /\ /g;

  module.exports = {
    filter: function(candidates, query, options) {
      var queryHasSlashes;
      if (query) {
        queryHasSlashes = query.indexOf(PathSeparator) !== -1;
        query = query.replace(SpaceRegex, '');
      }
      return filter(candidates, query, queryHasSlashes, options);
    },
    score: function(string, query) {
      var queryHasSlashes, score;
      if (!string) {
        return 0;
      }
      if (!query) {
        return 0;
      }
      if (string === query) {
        return 2;
      }
      queryHasSlashes = query.indexOf(PathSeparator) !== -1;
      query = query.replace(SpaceRegex, '');
      score = scorer.score(string, query);
      if (!queryHasSlashes) {
        score = scorer.basenameScore(string, query, score);
      }
      return score;
    },
    match: function(string, query) {
      var baseMatches, index, matches, queryHasSlashes, seen, _i, _ref, _results;
      if (!string) {
        return [];
      }
      if (!query) {
        return [];
      }
      if (string === query) {
        return (function() {
          _results = [];
          for (var _i = 0, _ref = string.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
      }
      queryHasSlashes = query.indexOf(PathSeparator) !== -1;
      query = query.replace(SpaceRegex, '');
      matches = matcher.match(string, query);
      if (!queryHasSlashes) {
        baseMatches = matcher.basenameMatch(string, query);
        matches = matches.concat(baseMatches).sort(function(a, b) {
          return a - b;
        });
        seen = null;
        index = 0;
        while (index < matches.length) {
          if (index && seen === matches[index]) {
            matches.splice(index, 1);
          } else {
            seen = matches[index];
            index++;
          }
        }
      }
      return matches;
    }
  };

}).call(this);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var pluckCandidates, scorer, sortCandidates;

  scorer = __webpack_require__(18);

  pluckCandidates = function(a) {
    return a.candidate;
  };

  sortCandidates = function(a, b) {
    return b.score - a.score;
  };

  module.exports = function(candidates, query, queryHasSlashes, _arg) {
    var candidate, key, maxResults, score, scoredCandidates, string, _i, _len, _ref;
    _ref = _arg != null ? _arg : {}, key = _ref.key, maxResults = _ref.maxResults;
    if (query) {
      scoredCandidates = [];
      for (_i = 0, _len = candidates.length; _i < _len; _i++) {
        candidate = candidates[_i];
        string = key != null ? candidate[key] : candidate;
        if (!string) {
          continue;
        }
        score = scorer.score(string, query, queryHasSlashes);
        if (!queryHasSlashes) {
          score = scorer.basenameScore(string, query, score);
        }
        if (score > 0) {
          scoredCandidates.push({
            candidate: candidate,
            score: score
          });
        }
      }
      scoredCandidates.sort(sortCandidates);
      candidates = scoredCandidates.map(pluckCandidates);
    }
    if (maxResults != null) {
      candidates = candidates.slice(0, maxResults);
    }
    return candidates;
  };

}).call(this);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var PathSeparator;

  PathSeparator = __webpack_require__(3).sep;

  exports.basenameMatch = function(string, query) {
    var base, index, lastCharacter, slashCount;
    index = string.length - 1;
    while (string[index] === PathSeparator) {
      index--;
    }
    slashCount = 0;
    lastCharacter = index;
    base = null;
    while (index >= 0) {
      if (string[index] === PathSeparator) {
        slashCount++;
        if (base == null) {
          base = string.substring(index + 1, lastCharacter + 1);
        }
      } else if (index === 0) {
        if (lastCharacter < string.length - 1) {
          if (base == null) {
            base = string.substring(0, lastCharacter + 1);
          }
        } else {
          if (base == null) {
            base = string;
          }
        }
      }
      index--;
    }
    return exports.match(base, query, string.length - base.length);
  };

  exports.match = function(string, query, stringOffset) {
    var character, indexInQuery, indexInString, lowerCaseIndex, matches, minIndex, queryLength, stringLength, upperCaseIndex, _i, _ref, _results;
    if (stringOffset == null) {
      stringOffset = 0;
    }
    if (string === query) {
      return (function() {
        _results = [];
        for (var _i = stringOffset, _ref = stringOffset + string.length; stringOffset <= _ref ? _i < _ref : _i > _ref; stringOffset <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
    }
    queryLength = query.length;
    stringLength = string.length;
    indexInQuery = 0;
    indexInString = 0;
    matches = [];
    while (indexInQuery < queryLength) {
      character = query[indexInQuery++];
      lowerCaseIndex = string.indexOf(character.toLowerCase());
      upperCaseIndex = string.indexOf(character.toUpperCase());
      minIndex = Math.min(lowerCaseIndex, upperCaseIndex);
      if (minIndex === -1) {
        minIndex = Math.max(lowerCaseIndex, upperCaseIndex);
      }
      indexInString = minIndex;
      if (indexInString === -1) {
        return [];
      }
      matches.push(stringOffset + indexInString);
      stringOffset += indexInString + 1;
      string = string.substring(indexInString + 1, stringLength);
    }
    return matches;
  };

}).call(this);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _atom = __webpack_require__(0);

var _etch = __webpack_require__(2);

var _etch2 = _interopRequireDefault(_etch);

var _conversation = __webpack_require__(54);

var _conversation2 = _interopRequireDefault(_conversation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = _etch2.default.dom;
var GUTTER_ID = "codesidestory.gutter";

var ConversationsGutter = function () {
  function ConversationsGutter(_ref) {
    var _this = this;

    var editor = _ref.editor,
        fileRef = _ref.fileRef,
        channelId = _ref.channelId;

    _classCallCheck(this, ConversationsGutter);

    _initialiseProps.call(this);

    this.editor = editor;
    this.fileRef = fileRef;
    this.channelId = channelId;

    this.disposables = new _atom.CompositeDisposable();

    // Keep marker disposables separate to delete and recreate on state update.
    this.markerdisps = new _atom.CompositeDisposable();
    this.disposables.add(new _atom.Disposable(function () {
      return _this.markerdisps.dispose();
    }));
    this.disposables.add(atom.commands.add(atom.views.getView(this.editor), {
      "codesidestory:start-conversation": this.startConvo.bind(this)
    }));

    var linesRef = this.fileRef.child("lines");
    linesRef.on("child_added", this.onConversationAdded.bind(this));
    this.disposables.add(new _atom.Disposable(function () {
      return linesRef.off();
    }));
  }

  _createClass(ConversationsGutter, [{
    key: "addMarker",
    value: function addMarker(codeLineNo, visible) {
      var editor = this.editor,
          channelId = this.channelId;

      var markers = editor.findMarkers({ GUTTER_ID: GUTTER_ID, codeLineNo: codeLineNo });
      markers.forEach(function (m) {
        return m.destroy();
      });

      var codeLineRef = this.fileRef.child("lines/" + codeLineNo);
      var item = new _conversation2.default({
        editor: editor,
        codeLineNo: codeLineNo,
        codeLineRef: codeLineRef,
        channelId: channelId,
        visible: visible
      });

      var marker = editor.markScreenPosition([codeLineNo, 0]);
      marker.setProperties({ GUTTER_ID: GUTTER_ID, codeLineNo: codeLineNo });

      this.gutter().decorateMarker(marker, { type: "block", position: "after", item: item }).onDidDestroy(function () {
        return item.destroy();
      });

      this.markerdisps.add(new _atom.Disposable(function () {
        return marker.destroy();
      }));
    }
  }]);

  return ConversationsGutter;
}();

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  Object.defineProperty(this, "onConversationAdded", {
    enumerable: true,
    writable: true,
    value: function value(snap) {
      var convoData = snap.val();
      if (!convoData) {
        return;
      }
      var codeLineNo = convoData.codeLineNo,
          convos = convoData.convos;

      if (codeLineNo !== 0 && !codeLineNo) {
        codeLineNo = parseInt(snap.key, 10);
      }
      if (isNaN(codeLineNo)) {
        console.error("Not updating marker. No codeLineNo found", convoData);
        return;
      }
      _this2.addMarker(codeLineNo, !convos); // !convos implies first message
    }
  });
  Object.defineProperty(this, "startConvo", {
    enumerable: true,
    writable: true,
    value: function value() {
      var range = _this2.editor.getSelectedBufferRange();
      var lineNo = range.end.row;

      _this2.addMarker(lineNo, true);
    }
  });
  Object.defineProperty(this, "gutter", {
    enumerable: true,
    writable: true,
    value: function value() {
      var editor = _this2.editor;

      var gutter = editor.gutterWithName(GUTTER_ID);
      if (gutter) {
        return gutter;
      }
      gutter = editor.addGutter({ name: GUTTER_ID, priority: 10 });
      _this2.disposables.add(new _atom.Disposable(function () {
        try {
          gutter.destroy();
        } catch (err) {
          console.error(err);
        }
      }));
      return gutter;
    }
  });
  Object.defineProperty(this, "destroy", {
    enumerable: true,
    writable: true,
    value: function value() {
      _this2.markerdisps.dispose();
      _this2.disposables.dispose();
    }
  });
  Object.defineProperty(this, "serialize", {
    enumerable: true,
    writable: true,
    value: function value() {
      return {};
    }
  });
};

exports.default = ConversationsGutter;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _atom = __webpack_require__(0);

var _etch = __webpack_require__(2);

var _etch2 = _interopRequireDefault(_etch);

var _helpers = __webpack_require__(4);

var _leftPad = __webpack_require__(55);

var _leftPad2 = _interopRequireDefault(_leftPad);

var _lightMarkdown = __webpack_require__(56);

var _lightMarkdown2 = _interopRequireDefault(_lightMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = _etch2.default.dom;
var CONVERSATION_ID = "codesidestory.conversation";
var KEY_ENTER = 13;

var Convo = function Convo(_ref) {
  var _this = this;

  var lines = _ref.lines,
      onSend = _ref.onSend,
      onHide = _ref.onHide;

  _classCallCheck(this, Convo);

  _initialiseProps.call(this);

  this.lines = lines;
  this.disposables = new _atom.CompositeDisposable();
  this.onSend = onSend;
  this.onHide = onHide;

  _etch2.default.initialize(this);
  this.disposables.add(new _atom.Disposable(function () {
    return _etch2.default.destroy(_this);
  }));

  var inputView = atom.views.getView(this.refs.input);

  this.disposables.add(atom.commands.add(inputView, {
    "codesidestory:post-comment": this.postConvo.bind(this)
  }));
  this.disposables.add(atom.commands.add(inputView, {
    "codesidestory:hide-comment": onHide
  }));

  setTimeout(function () {
    return _etch2.default.update(_this);
  }, 300);
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  Object.defineProperty(this, "focus", {
    enumerable: true,
    writable: true,
    value: function value() {
      return _this4.refs.input.element.focus();
    }
  });
  Object.defineProperty(this, "scrollToBottom", {
    enumerable: true,
    writable: true,
    value: function value() {
      return _this4.refs.container.scrollTop = _this4.refs.container.scrollHeight;
    }
  });
  Object.defineProperty(this, "writeAfterUpdate", {
    enumerable: true,
    writable: true,
    value: function value() {
      _this4.scrollToBottom();
      _this4.focus();
    }
  });
  Object.defineProperty(this, "update", {
    enumerable: true,
    writable: true,
    value: function value(lines) {
      _this4.lines = lines;
      var updateRet = _etch2.default.update(_this4);
      _this4.scrollToBottom();
      return updateRet;
    }
  });
  Object.defineProperty(this, "renderLine", {
    enumerable: true,
    writable: true,
    value: function value(line) {
      return $.div({
        className: "css-convo-line",
        innerHTML: _lightMarkdown2.default.toHtml(line.text)
      });
    }
  });
  Object.defineProperty(this, "postConvo", {
    enumerable: true,
    writable: true,
    value: function value(event) {
      _this4.onSend(_this4.refs.input.getText());
      _this4.refs.input.setText("");
    }
  });
  Object.defineProperty(this, "render", {
    enumerable: true,
    writable: true,
    value: function value() {
      return $.div({ className: "css-convo inline-block" }, $.div({ className: "css-close-chat", onClick: function onClick() {
          return _this4.onHide();
        } }, $.i({ className: "icon icon-x" })), $.div.apply($, [{ className: "css-lines-wrapper", ref: "container" }].concat(_toConsumableArray(_this4.lines.map(_this4.renderLine)))), $.div({ className: "css-input-wrapper" }, $(_atom.TextEditor, {
        ref: "input",
        mini: true
      })));
    }
  });
  Object.defineProperty(this, "destroy", {
    enumerable: true,
    writable: true,
    value: function value() {
      return _this4.disposables.dispose();
    }
  });
};

var Conversation = function () {
  function Conversation(_ref2) {
    var _this2 = this;

    var editor = _ref2.editor,
        codeLineNo = _ref2.codeLineNo,
        codeLineRef = _ref2.codeLineRef,
        channelId = _ref2.channelId,
        visible = _ref2.visible;

    _classCallCheck(this, Conversation);

    _initialiseProps2.call(this);

    this.editor = editor;
    this.codeLineRef = codeLineRef;
    this.codeLineNo = codeLineNo;
    this.channelId = channelId;

    this.lines = [];

    this.disposables = new _atom.CompositeDisposable();

    _etch2.default.initialize(this);
    this.disposables.add(new _atom.Disposable(function () {
      return _etch2.default.destroy(_this2);
    }));

    this.toggleConvo = this.toggleConvo.bind(this);
    this.refs.convo.addEventListener("click", this.toggleConvo);
    this.disposables.add(new _atom.Disposable(function () {
      return _this2.refs.convo.removeEventListener("click", _this2.toggleConvo);
    }));

    var convosRef = this.codeLineRef.child("convos");
    convosRef.on("child_added", this.onLineAdded.bind(this));
    this.disposables.add(new _atom.Disposable(function () {
      return convosRef.off();
    }));

    if (visible) {
      this.visible = false;
      this.toggleConvo();
    }
  }

  _createClass(Conversation, [{
    key: "render",
    value: function render() {
      return $.div({
        className: "icon icon-comment-discussion css-convo-icon",
        ref: "convo"
      });
    }
  }]);

  return Conversation;
}();

var _initialiseProps2 = function _initialiseProps2() {
  var _this3 = this;

  Object.defineProperty(this, "update", {
    enumerable: true,
    writable: true,
    value: function value() {
      return _etch2.default.update(_this3);
    }
  });
  Object.defineProperty(this, "onLineAdded", {
    enumerable: true,
    writable: true,
    value: function value(lineSnap) {
      var lineObj = lineSnap.val();
      if (!lineObj) {
        return;
      }
      _this3.lines.push(lineObj);
      _this3.thread_ts = lineObj.thread_ts;

      if (_this3.visible) {
        _this3.update();
        if (_this3.convo) {
          _this3.convo.update(_this3.lines);
        }
      }
    }
  });
  Object.defineProperty(this, "toggleConvo", {
    enumerable: true,
    writable: true,
    value: function value() {
      var editor = _this3.editor,
          codeLineNo = _this3.codeLineNo,
          lines = _this3.lines;

      var markers = _this3.editor.findMarkers({ CONVERSATION_ID: CONVERSATION_ID, codeLineNo: codeLineNo });
      if (markers.length > 0) {
        _this3.visible = false;
        markers.map(function (marker) {
          return marker.destroy();
        }); // this.convo should be destroyed here.
        _this3.convo = null;
      } else {
        _this3.visible = true;
        var item = new Convo({
          lines: lines,
          onSend: _this3.onSend.bind(_this3),
          onHide: _this3.toggleConvo.bind(_this3)
        });
        _this3.convo = item;
        var marker = editor.markScreenPosition([codeLineNo, 0]);
        marker.setProperties({ CONVERSATION_ID: CONVERSATION_ID, codeLineNo: codeLineNo });

        editor.decorateMarker(marker, { type: "overlay", position: "after", item: item }).onDidDestroy(function () {
          return item.destroy();
        });

        _this3.disposables.add(new _atom.Disposable(function () {
          return marker.destroy();
        }));
      }
    }
  });
  Object.defineProperty(this, "getChatData", {
    enumerable: true,
    writable: true,
    value: function value() {
      var codeLineNo = _this3.codeLineNo,
          data = _this3.data;

      if (data) {
        return Promise.resolve(data);
      }
      return _this3.codeLineRef.once("value").then(function (snap) {
        _this3.data = snap.val() ? snap.val() : { codeLineNo: codeLineNo };
        return _this3.data;
      });
    }
  });
  Object.defineProperty(this, "getTextWithCode", {
    enumerable: true,
    writable: true,
    value: function value() {
      var _editor$getCurrentPar = _this3.editor.getCurrentParagraphBufferRange(),
          start = _editor$getCurrentPar.start,
          end = _editor$getCurrentPar.end;

      var padLen = String(end.row).length + 2; // +2 for ">>"

      var _atom$project$relativ = atom.project.relativizePath(_this3.editor.getPath()),
          _atom$project$relativ2 = _slicedToArray(_atom$project$relativ, 2),
          filePath = _atom$project$relativ2[1];

      var lines = [];
      for (var i = start.row; i <= end.row; i++) {
        var line = _this3.editor.lineTextForBufferRow(i);
        var lineNo = (0, _leftPad2.default)(i, padLen);
        if (_this3.codeLineNo === i) {
          lineNo = ">>" + lineNo.substring(2);
        }
        lines.push(lineNo + " " + line);
      }
      return ">" + filePath + "\n" + "```" + lines.join("\n") + "```\n";
    }
  });
  Object.defineProperty(this, "onSend", {
    enumerable: true,
    writable: true,
    value: function value(text) {
      var code = void 0;
      if (!_this3.thread_ts) {
        // start of thread. post code.
        code = _this3.getTextWithCode();
      }
      (0, _helpers.postConversation)({
        ref: _this3.codeLineRef.toString(),
        event: {
          text: text,
          code: code,
          channel: _this3.channelId,
          thread_ts: _this3.thread_ts
        }
      });
    }
  });
  Object.defineProperty(this, "destroy", {
    enumerable: true,
    writable: true,
    value: function value() {
      return _this3.disposables.dispose();
    }
  });
};

exports.default = Conversation;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* This program is free software. It comes without any warranty, to
     * the extent permitted by applicable law. You can redistribute it
     * and/or modify it under the terms of the Do What The Fuck You Want
     * To Public License, Version 2, as published by Sam Hocevar. See
     * http://www.wtfpl.net/ for more details. */

module.exports = leftPad;

var cache = [
  '',
  ' ',
  '  ',
  '   ',
  '    ',
  '     ',
  '      ',
  '       ',
  '        ',
  '         '
];

function leftPad (str, len, ch) {
  // convert `str` to `string`
  str = str + '';
  // `len` is the `pad`'s length now
  len = len - str.length;
  // doesn't need to pad
  if (len <= 0) return str;
  // `ch` defaults to `' '`
  if (!ch && ch !== 0) ch = ' ';
  // convert `ch` to `string`
  ch = ch + '';
  // cache common use cases
  if (ch === ' ' && len < 10) return cache[len] + str;
  // `pad` starts with an empty string
  var pad = '';
  // loop
  while (true) {
    // add `ch` to `pad` if `len` is odd
    if (len & 1) pad += ch;
    // divide `len` by 2, ditch the remainder
    len >>= 1;
    // "double" the `ch` so this operation count grows logarithmically on `len`
    // each time `ch` is "doubled", the `len` would need to be "doubled" too
    // similar to finding a value in binary search tree, hence O(log(n))
    if (len) ch += ch;
    // `len` is 0, exit the loop
    else break;
  }
  // pad `str`!
  return pad + str;
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;/*! light-markdown 10-01-2016 */
(function(){
/**
 * Created by ShaLi on 07/01/2016.
 */
'use strict';

var lightMarkdown = {},
    tokens = getTokens(),
    regex = getRegex(tokens),
    plainToken = '₪₪PLaiN₪₪',
    options = {},
    flavors = {
        slack: {
            bold: true,
            italics: true,
            strikethrough: true,
            pre: true,
            code: true,
            longQuote: true,
            quote: true,
            autoLink: true,
            paragraph: true,
            lineBreaks: true
        },
        skype: {
            bold: true,
            italics: true,
            strikethrough: true,
            pre: false,
            code: false,
            longQuote: false,
            quote: false,
            autoLink: true,
            paragraph: false,
            lineBreaks: true
        }
    };

/**
 * Set a global option
 * @static
 * @param {string} key
 * @param {*} value
 * @returns {lightMarkdown}
 */
lightMarkdown.setOption = function (key, value) {
    options[key] = !!value;
    return this;
};

/**
 * Get a global option
 * @static
 * @param {string} key
 * @returns {*}
 */
lightMarkdown.getOption = function (key) {
    return options[key];
};


lightMarkdown.setFlavor = function (flavorName) {
    var flavor = flavors[flavorName];
    if (flavor) {
        for (var option in flavor) {
            if (flavor.hasOwnProperty(option)) {
                options[option] = flavor[option];
            }
        }
    }
    return this;
};


lightMarkdown.toHtml = function (md) {
    md = escapeHtml(md);
    var plains = [];

    // Replace all tokens
    tokens.forEach(function (t) {
        if (options[t.name]) {
            md = md.replace(t.regex, function (match, g1, g2) {
                if (!g2 ||
                    t.requireNonTokens && !regex.nonTokensChars.test(g2) ||
                    (t.token.length === 1 && (g2[0] === t.token || g2.slice(-1) === t.token)) ||
                    t.spaceWrapIgnored && g2[0] === ' ' && g2.slice(-1) === ' ')
                    return match;

                if (typeof t.processContent === 'function') {
                    g2 = t.processContent(g2);
                }
                if (t.plainContent) {
                    var plainIndex = plains.push(g2) - 1;
                    g2 = plainToken + plainIndex;
                }
                return g1 + '<' + t.elementName + '>' + g2 + '</' + t.elementName + '>';
            });
        }
    });

    if (options.longQuote) {
        md = md.replace(regex.multilineQuote, function (match, g1, g2) {
            if (match === '&gt;&gt;&gt;')
                return match;

            // trim start unless there are more '>' ahead
            g2 = g2.replace(/^([\s]*)(&gt;)*/, function (m, gg1, gg2) {
                return gg2 ? m : '';
            });
            return '<blockquote>' + g2 + '</blockquote>';
        });
    }

    if (options.quote) {
        md = md.replace(regex.singleLineQuote, function (match, g1, g2) {
            if (match === '&gt;')
                return match;
            g2 = g2.replace(/\n&gt;/g, '\n');
            return '<blockquote>' + g2 + '</blockquote>';
        });
    }

    if (options.autoLink) {
        // Replace links
        md = md.replace(regex.url, function (match, g1, g2) {
            return g1 + '<a href="' + g2 + '" target="_blank">' + g2 + '</a>';
        });
    }

    if (options.paragraph) {


        // Create paragraphs
        var m;
        var doubleLineIndexes = [];
        while ((m = regex.doubleLineBreak.exec(md))) {
            doubleLineIndexes.push({
                start: m.index,
                length: m[0].length
            });
        }
        while ((m = regex.blockquoteTags.exec(md))) {
            doubleLineIndexes.push({
                start: m.index,
                length: m[0].length,
                suffix: m[0]
            });
        }
        doubleLineIndexes.push({
            start: md.length,
            length: 0
        });

        doubleLineIndexes.sort(function (a, b) {
            return a.start - b.start;
        });

        var withParagraphs = '';
        var startIndex = 0;
        doubleLineIndexes.forEach(function (doubleLine) {
            var paragraph = '';
            var paragraphContent = md.substring(startIndex, doubleLine.start);
            if (paragraphContent) {
                paragraph = '<p>' + paragraphContent + '</p>';
            }
            if (doubleLine.suffix) {
                paragraph += doubleLine.suffix;
            }
            withParagraphs += paragraph;
            startIndex = doubleLine.start + doubleLine.length;
        });
        md = withParagraphs;
    }

    if (options.lineBreaks) {
        // Create line breaks
        md = md.replace(regex.singleLineBreak, '<br/>');
    }
    // Restore plain parts
    plains.forEach(function (p, plainIndex) {
        md = md.replace(plainToken + plainIndex, p);
    });

    return md;
};


function escapeHtml(content) {
    if (content) {
        content = content.replace(/>/g, '&gt;');
        content = content.replace(/</g, '&lt;');
    }
    return content;
}

function getRegex(tokens) {
    var allTokenChars = tokens.map(function (t) {
        return t.token.length === 1 ? t.token : '';
    }).join();

    var nonTokensCharsRegex = new RegExp('[^' + allTokenChars + ']');

    // Multiline quote >>>
    var multilineQuoteRegex = /(^|\n)&gt;&gt;&gt;([\s\S]*$)/;

    // Single line quote > or sequential lines that start with >.
    var singleLineQuoteRegex = /(^|\n)&gt;(([^\n]*)(\n&gt;[^\n]*)*)/g;

    // Two new lines in a row
    var doubleLineBreakRegex = /\r?\n\r?\n\r?/g;

    // Single line break
    var singleLineBreakRegex = /\r?\n\r?/g;

    // From https://gist.github.com/dperini/729294
    var urlRegex = /(^|\s)((?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?)/gi;

    return {
        nonTokensChars: nonTokensCharsRegex,
        multilineQuote: multilineQuoteRegex,
        singleLineQuote: singleLineQuoteRegex,
        blockquoteTags: /<\/?blockquote>/ig,
        doubleLineBreak: doubleLineBreakRegex,
        singleLineBreak: singleLineBreakRegex,
        url: urlRegex
    };
}

// From http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function getTokens() {
    var tokens = [
        {name: 'pre', token: '```', elementName: 'pre', multiline: true, plainContent: true},
        {name: 'code', token: '`', elementName: 'code', ignoreAfter: true, plainContent: true},
        {name: 'bold', token: '*', elementName: 'b', requireNonTokens: true, spaceWrapIgnored: true},
        {name: 'italics', token: '_', elementName: 'i', requireNonTokens: true},
        {name: 'strikethrough', token: '~', elementName: 's', requireNonTokens: true, spaceWrapIgnored: true}
    ];
    tokens.forEach(function (t) {
        if (!t.regex) {
            var before = '(^|[\\s\\?\\.,\\-!\\^;:{(\\[%$#+="])';
            var content = t.multiline ? '([\\s\\S]*?)?' : '(.*?\\S *)?';
            var after = t.ignoreAfter ? '' : '(?=$|\\s|[\\?\\.,\'\\-!\\^;:})\\]%$~{\\[<#+="])';
            var token = escapeRegExp(t.token);
            var pattern = before + token + content + token + after;
            t.regex = new RegExp(pattern, 'g');
        }
    });
    return tokens;
}

lightMarkdown.setFlavor('slack');
var root = this;

// CommonJS/nodeJS Loader
if (typeof module !== 'undefined' && module.exports) {
    module.exports = lightMarkdown;

// AMD Loader
} else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
        'use strict';
        return lightMarkdown;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

// Regular Browser loader
} else {
    root.lightMarkdown = lightMarkdown;
}
}).call(this);

//# sourceMappingURL=light-markdown.js.map


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/*! @license Firebase v4.1.3
Build: rev-1234895
Terms: https://firebase.google.com/terms/

---

typedarray.js
Copyright (c) 2010, Linden Research, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

(function() {
            var firebase = __webpack_require__(1);
            var g,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.Vb=function(){return a.Ye?a.Ye:a.Ye=new a}}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}
function la(a,b){function c(){}c.prototype=b.prototype;a.wg=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.sg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function ma(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function na(){this.Fd=void 0}
function oa(a,b,c){switch(typeof b){case "string":pa(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],oa(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),pa(f,c),
c.push(":"),oa(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var qa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},ra=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function pa(a,b){b.push('"',a.replace(ra,function(a){if(a in qa)return qa[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return qa[a]=e+b.toString(16)}),'"')};function sa(){this.Wa=-1};function ta(){this.Wa=-1;this.Wa=64;this.M=[];this.Wd=[];this.Af=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Wa;++a)this.zd[a]=0;this.Pd=this.$b=0;this.reset()}la(ta,sa);ta.prototype.reset=function(){this.M[0]=1732584193;this.M[1]=4023233417;this.M[2]=2562383102;this.M[3]=271733878;this.M[4]=3285377520;this.Pd=this.$b=0};
function ua(a,b,c){c||(c=0);var d=a.Af;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.M[0];c=a.M[1];for(var h=a.M[2],k=a.M[3],m=a.M[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),l=1518500249):(f=c^h^k,l=1859775393):60>e?(f=c&h|k&(c|h),l=2400959708):(f=c^h^k,l=3395469782),f=(b<<
5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.M[0]=a.M[0]+b&4294967295;a.M[1]=a.M[1]+c&4294967295;a.M[2]=a.M[2]+h&4294967295;a.M[3]=a.M[3]+k&4294967295;a.M[4]=a.M[4]+m&4294967295}
ta.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Wa,d=0,e=this.Wd,f=this.$b;d<b;){if(0==f)for(;d<=c;)ua(this,a,d),d+=this.Wa;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Wa){ua(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Wa){ua(this,e);f=0;break}}this.$b=f;this.Pd+=b}};var r;a:{var va=aa.navigator;if(va){var wa=va.userAgent;if(wa){r=wa;break a}}r=""};var t=Array.prototype,xa=t.indexOf?function(a,b,c){return t.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ya=t.forEach?function(a,b,c){t.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},za=t.filter?function(a,b,c){return t.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=p(a)?
a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},Aa=t.map?function(a,b,c){return t.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ba=t.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return t.reduce.apply(a,e)}:function(a,b,c,d){var e=c;ya(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Ca=t.every?function(a,b,
c){return t.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Da(a,b){var c=Ea(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ea(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Fa(a,b){var c=xa(a,b);0<=c&&t.splice.call(a,c,1)}function Ga(a,b,c){return 2>=arguments.length?t.slice.call(a,b):t.slice.call(a,b,c)}
function Ha(a,b){a.sort(b||Ia)}function Ia(a,b){return a>b?1:a<b?-1:0};function v(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function Ja(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function Ka(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function La(a){var b=0,c;for(c in a)b++;return b}function Ma(a){for(var b in a)return b}function Na(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function Oa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function Pa(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function Qa(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function Ra(a,b){var c=Qa(a,b,void 0);return c&&a[c]}function Sa(a){for(var b in a)return!1;return!0}function Ta(a){var b={},c;for(c in a)b[c]=a[c];return b};var Ua=-1!=r.indexOf("Opera")||-1!=r.indexOf("OPR"),Va=-1!=r.indexOf("Trident")||-1!=r.indexOf("MSIE"),Wa=-1!=r.indexOf("Gecko")&&-1==r.toLowerCase().indexOf("webkit")&&!(-1!=r.indexOf("Trident")||-1!=r.indexOf("MSIE")),Xa=-1!=r.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(Ua&&aa.opera)return a=aa.opera.version,ha(a)?a():a;Wa?b=/rv\:([^\);]+)(\)|;)/:Va?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Xa&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(r))?a[1]:"");return Va&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var Ya=null,Za=null,$a=null;function ab(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");bb();for(var c=b?Za:Ya,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,h||(k=64));d.push(c[u],c[f],c[k],c[l])}return d.join("")}
function bb(){if(!Ya){Ya={};Za={};$a={};for(var a=0;65>a;a++)Ya[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),Za[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),$a[Za[a]]=a,62<=a&&($a["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function cb(a,b){if(!a)throw db(b);}function db(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function eb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function fb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function gb(a){var b=[];fb(a,function(a,d){ea(d)?ya(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};var hb=firebase.Promise;function ib(){var a=this;this.reject=this.resolve=null;this.ra=new hb(function(b,c){a.resolve=b;a.reject=c})}function jb(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ha(b)&&(kb(a.ra),1===b.length?b(c):b(c,d))}}function kb(a){a.then(void 0,ba)};function lb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):ma(a)}function x(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];oa(new na,a,b);a=b.join("")}return a};function mb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,cb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function nb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function y(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function A(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function B(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(A(a,b,d)+"must be a valid function.");}function ob(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(A(a,b,!0)+"must be a valid context object.");};function pb(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")};function C(a,b){this.name=a;this.R=b}function qb(a,b){return new C(a,b)};function rb(a,b){return sb(a.name,b.name)}function tb(a,b){return sb(a,b)};function ub(a){this.uc=a;this.Cd="firebase:"}g=ub.prototype;g.set=function(a,b){null==b?this.uc.removeItem(this.Cd+a):this.uc.setItem(this.Cd+a,x(b))};g.get=function(a){a=this.uc.getItem(this.Cd+a);return null==a?null:lb(a)};g.remove=function(a){this.uc.removeItem(this.Cd+a)};g.Ze=!1;g.toString=function(){return this.uc.toString()};function vb(){this.pc={}}vb.prototype.set=function(a,b){null==b?delete this.pc[a]:this.pc[a]=b};vb.prototype.get=function(a){return eb(this.pc,a)?this.pc[a]:null};vb.prototype.remove=function(a){delete this.pc[a]};vb.prototype.Ze=!0;function wb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new ub(b)}}catch(c){}return new vb}var xb=wb("localStorage"),yb=wb("sessionStorage");function zb(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.pe=c;this.qg=d;this.gf=e||"";this.$a=xb.get("host:"+a)||this.host}function Ab(a,b){b!==a.$a&&(a.$a=b,"s-"===a.$a.substr(0,2)&&xb.set("host:"+a.host,a.$a))}
function Bb(a,b,c){D("string"===typeof b,"typeof type must == string");D("object"===typeof c,"typeof params must == object");if(b===Cb)b=(a.Sc?"wss://":"ws://")+a.$a+"/.ws?";else if(b===Db)b=(a.Sc?"https://":"http://")+a.$a+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.$a&&(c.ns=a.pe);var d=[];v(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}zb.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.gf&&(a+="<"+this.gf+">");return a};function Eb(a,b){return a&&"object"===typeof a?(D(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Fb(a,b){var c=new Gb;Hb(a,new E(""),function(a,e){Ib(c,a,Jb(e,b))});return c}function Jb(a,b){var c=a.C().H(),c=Eb(c,b),d;if(a.J()){var e=Eb(a.Ca(),b);return e!==a.Ca()||c!==a.C().H()?new Kb(e,G(c)):a}d=a;c!==a.C().H()&&(d=d.fa(new Kb(c)));a.O(H,function(a,c){var e=Jb(c,b);e!==c&&(d=d.T(a,e))});return d};var Lb=function(){var a=1;return function(){return a++}}(),D=cb,Mb=db;
function Nb(a){try{var b;bb();for(var c=$a,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==m)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ga(d,c,c+8192));b=a}return b}catch(l){I("base64Decode failed: ",
l)}return null}function Ob(a){var b=mb(a);a=new ta;a.update(b);var b=[],c=8*a.Pd;56>a.$b?a.update(a.zd,56-a.$b):a.update(a.zd,a.Wa-(a.$b-56));for(var d=a.Wa-1;56<=d;d--)a.Wd[d]=c&255,c/=256;ua(a,a.Wd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.M[d]>>e&255,++c;return ab(b)}function Pb(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Pb.apply(null,arguments[c]):"object"===typeof arguments[c]?b+x(arguments[c]):b+arguments[c],b+=" ";return b}var Qb=null,Rb=!0;
function Sb(a,b){cb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Qb=q(console.log,console):"object"===typeof console.log&&(Qb=function(a){console.log(a)})),b&&yb.set("logging_enabled",!0)):ha(a)?Qb=a:(Qb=null,yb.remove("logging_enabled"))}function I(a){!0===Rb&&(Rb=!1,null===Qb&&!0===yb.get("logging_enabled")&&Sb(!0));if(Qb){var b=Pb.apply(null,arguments);Qb(b)}}
function Tb(a){return function(){I(a,arguments)}}function Ub(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Pb.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Vb(a){var b=Pb.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function J(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Pb.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function Wb(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(p(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var m=h[k];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(l){}f+="/"+m}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&Vb(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
c&&"undefined"!=c||Vb("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&J("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{jc:new zb(b,d,c,"ws"===e||"wss"===e),path:new E(f)}}function Xb(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function Yb(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function sb(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Zb(a),d=Zb(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function $b(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+x(b));}
function ac(a){if("object"!==typeof a||null===a)return x(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=x(b[d]),c+=":",c+=ac(a[b[d]]);return c+"}"}function bc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function cc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else v(a,b)}
function dc(a){D(!Xb(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var ec=/^-?\d{1,10}$/;function Zb(a){return ec.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function fc(a){try{a()}catch(b){setTimeout(function(){J("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function gc(a,b,c){Object.defineProperty(a,b,{get:c})}function hc(a,b){var c=setTimeout(a,b);"object"===typeof c&&c.unref&&c.unref();return c};function ic(a){var b={},c={},d={},e="";try{var f=a.split("."),b=lb(Nb(f[0])||""),c=lb(Nb(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{tg:b,Je:c,data:d,mg:e}}function jc(a){a=ic(a);var b=a.Je;return!!a.mg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")}function kc(a){a=ic(a).Je;return"object"===typeof a&&!0===w(a,"admin")};function lc(){}var mc={};function nc(a){return q(a.compare,a)}lc.prototype.nd=function(a,b){return 0!==this.compare(new C("[MIN_NAME]",a),new C("[MIN_NAME]",b))};lc.prototype.Hc=function(){return oc};function pc(a){D(!a.e()&&".priority"!==K(a),"Can't create PathIndex with empty path or .priority key");this.bc=a}la(pc,lc);g=pc.prototype;g.xc=function(a){return!a.P(this.bc).e()};g.compare=function(a,b){var c=a.R.P(this.bc),d=b.R.P(this.bc),c=c.sc(d);return 0===c?sb(a.name,b.name):c};
g.Ec=function(a,b){var c=G(a),c=L.F(this.bc,c);return new C(b,c)};g.Fc=function(){var a=L.F(this.bc,qc);return new C("[MAX_NAME]",a)};g.toString=function(){return this.bc.slice().join("/")};function rc(){}la(rc,lc);g=rc.prototype;g.compare=function(a,b){var c=a.R.C(),d=b.R.C(),c=c.sc(d);return 0===c?sb(a.name,b.name):c};g.xc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().Z(b.C())};g.Hc=function(){return oc};g.Fc=function(){return new C("[MAX_NAME]",new Kb("[PRIORITY-POST]",qc))};
g.Ec=function(a,b){var c=G(a);return new C(b,new Kb("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var H=new rc;function sc(){}la(sc,lc);g=sc.prototype;g.compare=function(a,b){return sb(a.name,b.name)};g.xc=function(){throw Mb("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Hc=function(){return oc};g.Fc=function(){return new C("[MAX_NAME]",L)};g.Ec=function(a){D(p(a),"KeyIndex indexValue must always be a string.");return new C(a,L)};g.toString=function(){return".key"};
var tc=new sc;function uc(){}la(uc,lc);g=uc.prototype;g.compare=function(a,b){var c=a.R.sc(b.R);return 0===c?sb(a.name,b.name):c};g.xc=function(){return!0};g.nd=function(a,b){return!a.Z(b)};g.Hc=function(){return oc};g.Fc=function(){return vc};g.Ec=function(a,b){var c=G(a);return new C(b,c)};g.toString=function(){return".value"};var wc=new uc;function xc(a,b){this.od=a;this.cc=b}xc.prototype.get=function(a){var b=w(this.od,a);if(!b)throw Error("No index defined for "+a);return b===mc?null:b};function yc(a,b,c){var d=Ja(a.od,function(d,f){var h=w(a.cc,f);D(h,"Missing index implementation for "+f);if(d===mc){if(h.xc(b.R)){for(var k=[],m=c.Wb(qb),l=M(m);l;)l.name!=b.name&&k.push(l),l=M(m);k.push(b);return zc(k,nc(h))}return mc}h=c.get(b.name);k=d;h&&(k=k.remove(new C(b.name,h)));return k.Oa(b,b.R)});return new xc(d,a.cc)}
function Ac(a,b,c){var d=Ja(a.od,function(a){if(a===mc)return a;var d=c.get(b.name);return d?a.remove(new C(b.name,d)):a});return new xc(d,a.cc)}var Bc=new xc({".priority":mc},{".priority":H});function Kb(a,b){this.B=a;D(n(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||L;Cc(this.aa);this.Db=null}var Dc=["object","boolean","number","string"];g=Kb.prototype;g.J=function(){return!0};g.C=function(){return this.aa};g.fa=function(a){return new Kb(this.B,a)};g.Q=function(a){return".priority"===a?this.aa:L};g.P=function(a){return a.e()?this:".priority"===K(a)?this.aa:L};g.Da=function(){return!1};g.Ve=function(){return null};
g.T=function(a,b){return".priority"===a?this.fa(b):b.e()&&".priority"!==a?this:L.T(a,b).fa(this.aa)};g.F=function(a,b){var c=K(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;D(".priority"!==c||1===Ec(a),".priority must be the last token in a path");return this.T(c,L.F(N(a),b))};g.e=function(){return!1};g.Eb=function(){return 0};g.O=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ca(),".priority":this.C().H()}:this.Ca()};
g.hash=function(){if(null===this.Db){var a="";this.aa.e()||(a+="priority:"+Fc(this.aa.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+dc(this.B):a+this.B;this.Db=Ob(a)}return this.Db};g.Ca=function(){return this.B};g.sc=function(a){if(a===L)return 1;if(a instanceof O)return-1;D(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=xa(Dc,b),e=xa(Dc,c);D(0<=d,"Unknown leaf type: "+b);D(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
g.nb=function(){return this};g.yc=function(){return!0};g.Z=function(a){return a===this?!0:a.J()?this.B===a.B&&this.aa.Z(a.aa):!1};g.toString=function(){return x(this.H(!0))};function Gc(){this.set={}}g=Gc.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return eb(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return Sa(this.set)};g.count=function(){return La(this.set)};function Hc(a,b){v(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];v(this.set,function(b,c){a.push(c)});return a};function Ic(a){D(ea(a)&&0<a.length,"Requires a non-empty array");this.Bf=a;this.Dc={}}Ic.prototype.Ge=function(a,b){var c;c=this.Dc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Ie.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};Ic.prototype.gc=function(a,b,c){Jc(this,a);this.Dc[a]=this.Dc[a]||[];this.Dc[a].push({Ie:b,Ma:c});(a=this.Ue(a))&&b.apply(c,a)};
Ic.prototype.Ic=function(a,b,c){Jc(this,a);a=this.Dc[a]||[];for(var d=0;d<a.length;d++)if(a[d].Ie===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};function Jc(a,b){D(Da(a.Bf,function(a){return a===b}),"Unknown event: "+b)};var Kc=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);D(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);D(20===c.length,"nextPushId: Length should be 20.");
return c}}();function Lc(){Ic.call(this,["online"]);this.hc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener&&!pb()){var a=this;window.addEventListener("online",function(){a.hc||(a.hc=!0,a.Ge("online",!0))},!1);window.addEventListener("offline",function(){a.hc&&(a.hc=!1,a.Ge("online",!1))},!1)}}la(Lc,Ic);Lc.prototype.Ue=function(a){D("online"===a,"Unknown event type: "+a);return[this.hc]};ca(Lc);function Mc(){Ic.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Mb=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.Mb&&(c.Mb=b,c.Ge("visible",b))},!1)}}la(Mc,Ic);Mc.prototype.Ue=function(a){D("visible"===a,"Unknown event type: "+a);return[this.Mb]};ca(Mc);function E(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Y=0}else this.o=a,this.Y=b}function P(a,b){var c=K(a);if(null===c)return b;if(c===K(b))return P(N(a),N(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
function Nc(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=sb(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function K(a){return a.Y>=a.o.length?null:a.o[a.Y]}function Ec(a){return a.o.length-a.Y}function N(a){var b=a.Y;b<a.o.length&&b++;return new E(a.o,b)}function Oc(a){return a.Y<a.o.length?a.o[a.o.length-1]:null}g=E.prototype;
g.toString=function(){for(var a="",b=this.Y;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Y+(a||0))};g.parent=function(){if(this.Y>=this.o.length)return null;for(var a=[],b=this.Y;b<this.o.length-1;b++)a.push(this.o[b]);return new E(a,0)};
g.n=function(a){for(var b=[],c=this.Y;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof E)for(c=a.Y;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new E(b,0)};g.e=function(){return this.Y>=this.o.length};g.Z=function(a){if(Ec(this)!==Ec(a))return!1;for(var b=this.Y,c=a.Y;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
g.contains=function(a){var b=this.Y,c=a.Y;if(Ec(this)>Ec(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var Q=new E("");function Pc(a,b){this.Qa=a.slice();this.Ha=Math.max(1,this.Qa.length);this.Qe=b;for(var c=0;c<this.Qa.length;c++)this.Ha+=nb(this.Qa[c]);Qc(this)}Pc.prototype.push=function(a){0<this.Qa.length&&(this.Ha+=1);this.Qa.push(a);this.Ha+=nb(a);Qc(this)};Pc.prototype.pop=function(){var a=this.Qa.pop();this.Ha-=nb(a);0<this.Qa.length&&--this.Ha};
function Qc(a){if(768<a.Ha)throw Error(a.Qe+"has a key path longer than 768 bytes ("+a.Ha+").");if(32<a.Qa.length)throw Error(a.Qe+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Rc(a));}function Rc(a){return 0==a.Qa.length?"":"in property '"+a.Qa.join(".")+"'"};function Sc(){this.children={};this.bd=0;this.value=null}function Tc(a,b,c){this.ud=a?a:"";this.Pc=b?b:null;this.A=c?c:new Sc}function Uc(a,b){for(var c=b instanceof E?b:new E(b),d=a,e;null!==(e=K(c));)d=new Tc(e,d,w(d.A.children,e)||new Sc),c=N(c);return d}g=Tc.prototype;g.Ca=function(){return this.A.value};function Vc(a,b){D("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;Wc(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.bd=0;Wc(this)};
g.kd=function(){return 0<this.A.bd};g.e=function(){return null===this.Ca()&&!this.kd()};g.O=function(a){var b=this;v(this.A.children,function(c,d){a(new Tc(d,b,c))})};function Xc(a,b,c,d){c&&!d&&b(a);a.O(function(a){Xc(a,b,!0,d)});c&&d&&b(a)}function Yc(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new E(null===this.Pc?this.ud:this.Pc.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Pc};
function Wc(a){if(null!==a.Pc){var b=a.Pc,c=a.ud,d=a.e(),e=eb(b.A.children,c);d&&e?(delete b.A.children[c],b.A.bd--,Wc(b)):d||e||(b.A.children[c]=a.A,b.A.bd++,Wc(b))}};function Zc(a,b){this.La=a;this.ba=b?b:$c}g=Zc.prototype;g.Oa=function(a,b){return new Zc(this.La,this.ba.Oa(a,b,this.La).X(null,null,!1,null,null))};g.remove=function(a){return new Zc(this.La,this.ba.remove(a,this.La).X(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ba;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function ad(a,b){for(var c,d=a.ba,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ba.e()};g.count=function(){return this.ba.count()};g.Gc=function(){return this.ba.Gc()};g.ec=function(){return this.ba.ec()};g.ha=function(a){return this.ba.ha(a)};
g.Wb=function(a){return new bd(this.ba,null,this.La,!1,a)};g.Xb=function(a,b){return new bd(this.ba,a,this.La,!1,b)};g.Zb=function(a,b){return new bd(this.ba,a,this.La,!0,b)};g.We=function(a){return new bd(this.ba,null,this.La,!0,a)};function bd(a,b,c,d,e){this.Hd=e||null;this.le=d;this.Pa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.le?a.left:a.right;else if(0===e){this.Pa.push(a);break}else this.Pa.push(a),a=this.le?a.right:a.left}
function M(a){if(0===a.Pa.length)return null;var b=a.Pa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.le)for(b=b.left;!b.e();)a.Pa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Pa.push(b),b=b.left;return c}function cd(a){if(0===a.Pa.length)return null;var b;b=a.Pa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function dd(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:$c;this.right=null!=e?e:$c}g=dd.prototype;
g.X=function(a,b,c,d,e){return new dd(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ha=function(a){return this.left.ha(a)||a(this.key,this.value)||this.right.ha(a)};function ed(a){return a.left.e()?a:ed(a.left)}g.Gc=function(){return ed(this).key};g.ec=function(){return this.right.e()?this.key:this.right.ec()};
g.Oa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.X(null,null,null,e.left.Oa(a,b,c),null):0===d?e.X(null,b,null,null,null):e.X(null,null,null,null,e.right.Oa(a,b,c));return gd(e)};function hd(a){if(a.left.e())return $c;a.left.ea()||a.left.left.ea()||(a=id(a));a=a.X(null,null,null,hd(a.left),null);return gd(a)}
g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.ea()||c.left.left.ea()||(c=id(c)),c=c.X(null,null,null,c.left.remove(a,b),null);else{c.left.ea()&&(c=jd(c));c.right.e()||c.right.ea()||c.right.left.ea()||(c=kd(c),c.left.left.ea()&&(c=jd(c),c=kd(c)));if(0===b(a,c.key)){if(c.right.e())return $c;d=ed(c.right);c=c.X(d.key,d.value,null,null,hd(c.right))}c=c.X(null,null,null,null,c.right.remove(a,b))}return gd(c)};g.ea=function(){return this.color};
function gd(a){a.right.ea()&&!a.left.ea()&&(a=ld(a));a.left.ea()&&a.left.left.ea()&&(a=jd(a));a.left.ea()&&a.right.ea()&&(a=kd(a));return a}function id(a){a=kd(a);a.right.left.ea()&&(a=a.X(null,null,null,null,jd(a.right)),a=ld(a),a=kd(a));return a}function ld(a){return a.right.X(null,null,a.color,a.X(null,null,!0,null,a.right.left),null)}function jd(a){return a.left.X(null,null,a.color,null,a.X(null,null,!0,a.left.right,null))}
function kd(a){return a.X(null,null,!a.color,a.left.X(null,null,!a.left.color,null,null),a.right.X(null,null,!a.right.color,null,null))}function md(){}g=md.prototype;g.X=function(){return this};g.Oa=function(a,b){return new dd(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ha=function(){return!1};g.Gc=function(){return null};g.ec=function(){return null};g.ea=function(){return!1};var $c=new md;function O(a,b,c){this.k=a;(this.aa=b)&&Cc(this.aa);a.e()&&D(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.yb=c;this.Db=null}g=O.prototype;g.J=function(){return!1};g.C=function(){return this.aa||L};g.fa=function(a){return this.k.e()?this:new O(this.k,a,this.yb)};g.Q=function(a){if(".priority"===a)return this.C();a=this.k.get(a);return null===a?L:a};g.P=function(a){var b=K(a);return null===b?this:this.Q(b).P(N(a))};g.Da=function(a){return null!==this.k.get(a)};
g.T=function(a,b){D(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.fa(b);var c=new C(a,b),d,e;b.e()?(d=this.k.remove(a),c=Ac(this.yb,c,this.k)):(d=this.k.Oa(a,b),c=yc(this.yb,c,this.k));e=d.e()?L:this.aa;return new O(d,e,c)};g.F=function(a,b){var c=K(a);if(null===c)return b;D(".priority"!==K(a)||1===Ec(a),".priority must be the last token in a path");var d=this.Q(c).F(N(a),b);return this.T(c,d)};g.e=function(){return this.k.e()};g.Eb=function(){return this.k.count()};
var nd=/^(0|[1-9]\d*)$/;g=O.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.O(H,function(f,h){b[f]=h.H(a);c++;e&&nd.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Db){var a="";this.C().e()||(a+="priority:"+Fc(this.C().H())+":");this.O(H,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Db=""===a?"":Ob(a)}return this.Db};
g.Ve=function(a,b,c){return(c=od(this,c))?(a=ad(c,new C(a,b)))?a.name:null:ad(this.k,a)};function pd(a,b){var c;c=(c=od(a,b))?(c=c.Gc())&&c.name:a.k.Gc();return c?new C(c,a.k.get(c)):null}function qd(a,b){var c;c=(c=od(a,b))?(c=c.ec())&&c.name:a.k.ec();return c?new C(c,a.k.get(c)):null}g.O=function(a,b){var c=od(this,a);return c?c.ha(function(a){return b(a.name,a.R)}):this.k.ha(b)};g.Wb=function(a){return this.Xb(a.Hc(),a)};
g.Xb=function(a,b){var c=od(this,b);if(c)return c.Xb(a,function(a){return a});for(var c=this.k.Xb(a.name,qb),d=cd(c);null!=d&&0>b.compare(d,a);)M(c),d=cd(c);return c};g.We=function(a){return this.Zb(a.Fc(),a)};g.Zb=function(a,b){var c=od(this,b);if(c)return c.Zb(a,function(a){return a});for(var c=this.k.Zb(a.name,qb),d=cd(c);null!=d&&0<b.compare(d,a);)M(c),d=cd(c);return c};g.sc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===qc?-1:0};
g.nb=function(a){if(a===tc||Pa(this.yb.cc,a.toString()))return this;var b=this.yb,c=this.k;D(a!==tc,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Wb(qb),f=M(c);f;)e=e||a.xc(f.R),d.push(f),f=M(c);d=e?zc(d,nc(a)):mc;e=a.toString();c=Ta(b.cc);c[e]=a;a=Ta(b.od);a[e]=d;return new O(this.k,this.aa,new xc(a,c))};g.yc=function(a){return a===tc||Pa(this.yb.cc,a.toString())};
g.Z=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().Z(a.C())&&this.k.count()===a.k.count()){var b=this.Wb(H);a=a.Wb(H);for(var c=M(b),d=M(a);c&&d;){if(c.name!==d.name||!c.R.Z(d.R))return!1;c=M(b);d=M(a)}return null===c&&null===d}return!1};function od(a,b){return b===tc?null:a.yb.get(b.toString())}g.toString=function(){return x(this.H(!0))};function G(a,b){if(null===a)return L;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);D(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Kb(a,G(c));if(a instanceof Array){var d=L,e=a;v(e,function(a,b){if(eb(e,b)&&"."!==b.substring(0,1)){var c=G(a);if(c.J()||!c.e())d=
d.T(b,c)}});return d.fa(G(c))}var f=[],h=!1,k=a;fb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=G(k[a]);b.e()||(h=h||!b.C().e(),f.push(new C(a,b)))}});if(0==f.length)return L;var m=zc(f,rb,function(a){return a.name},tb);if(h){var l=zc(f,nc(H));return new O(m,G(c),new xc({".priority":l},{".priority":H}))}return new O(m,G(c),Bc)}var rd=Math.log(2);
function sd(a){this.count=parseInt(Math.log(a+1)/rd,10);this.Oe=this.count-1;this.Cf=a+1&parseInt(Array(this.count+1).join("1"),2)}function td(a){var b=!(a.Cf&1<<a.Oe);a.Oe--;return b}
function zc(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],u=c?c(l):l;return new dd(u,l.R,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),z=e(l+1,d),l=a[l],u=c?c(l):l;return new dd(u,l.R,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],F=c?c(k):k,z=new dd(F,k.R,h,null,z);f?f.left=z:l=z;f=z}for(var f=null,l=null,u=a.length,z=0;z<b.count;++z){var F=td(b),fd=Math.pow(2,b.count-(z+1));F?d(fd,!1):(d(fd,!1),d(fd,!0))}return l}(new sd(a.length));
return null!==f?new Zc(d||b,f):new Zc(d||b)}function Fc(a){return"number"===typeof a?"number:"+dc(a):"string:"+a}function Cc(a){if(a.J()){var b=a.H();D("string"===typeof b||"number"===typeof b||"object"===typeof b&&eb(b,".sv"),"Priority must be a string or number.")}else D(a===qc||a.e(),"priority of unexpected type.");D(a===qc||a.C().e(),"Priority nodes can't have a priority of their own.")}var L=new O(new Zc(tb),null,Bc);function ud(){O.call(this,new Zc(tb),L,Bc)}la(ud,O);g=ud.prototype;
g.sc=function(a){return a===this?0:1};g.Z=function(a){return a===this};g.C=function(){return this};g.Q=function(){return L};g.e=function(){return!1};var qc=new ud,oc=new C("[MIN_NAME]",L),vc=new C("[MAX_NAME]",qc);function vd(a,b){this.value=a;this.children=b||wd}var wd=new Zc(function(a,b){return a===b?0:a<b?-1:1});function xd(a){var b=R;v(a,function(a,d){b=b.set(new E(d),a)});return b}g=vd.prototype;g.e=function(){return null===this.value&&this.children.e()};function yd(a,b,c){if(null!=a.value&&c(a.value))return{path:Q,value:a.value};if(b.e())return null;var d=K(b);a=a.children.get(d);return null!==a?(b=yd(a,N(b),c),null!=b?{path:(new E(d)).n(b.path),value:b.value}:null):null}
function zd(a,b){return yd(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(K(a));return null!==b?b.subtree(N(a)):R};g.set=function(a,b){if(a.e())return new vd(b,this.children);var c=K(a),d=(this.children.get(c)||R).set(N(a),b),c=this.children.Oa(c,d);return new vd(this.value,c)};
g.remove=function(a){if(a.e())return this.children.e()?R:new vd(null,this.children);var b=K(a),c=this.children.get(b);return c?(a=c.remove(N(a)),b=a.e()?this.children.remove(b):this.children.Oa(b,a),null===this.value&&b.e()?R:new vd(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(K(a));return b?b.get(N(a)):null};
function Ad(a,b,c){if(b.e())return c;var d=K(b);b=Ad(a.children.get(d)||R,N(b),c);d=b.e()?a.children.remove(d):a.children.Oa(d,b);return new vd(a.value,d)}function Bd(a,b){return Cd(a,Q,b)}function Cd(a,b,c){var d={};a.children.ha(function(a,f){d[a]=Cd(f,b.n(a),c)});return c(b,a.value,d)}function Dd(a,b,c){return Ed(a,b,Q,c)}function Ed(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=K(b);return(a=a.children.get(e))?Ed(a,N(b),c.n(e),d):null}
function Fd(a,b,c){Gd(a,b,Q,c)}function Gd(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=K(b);return(a=a.children.get(e))?Gd(a,N(b),c.n(e),d):R}function Hd(a,b){Id(a,Q,b)}function Id(a,b,c){a.children.ha(function(a,e){Id(e,b.n(a),c)});a.value&&c(b,a.value)}function Jd(a,b){a.children.ha(function(a,d){d.value&&b(a,d.value)})}var R=new vd(null);vd.prototype.toString=function(){var a={};Hd(this,function(b,c){a[b.toString()]=c.toString()});return x(a)};var Kd=/[\[\].#$\/\u0000-\u001F\u007F]/,Ld=/[\[\].#$\u0000-\u001F\u007F]/;function Md(a){return p(a)&&0!==a.length&&!Kd.test(a)}function Nd(a){return null===a||p(a)||ga(a)&&!Xb(a)||ia(a)&&eb(a,".sv")}function Od(a,b,c,d){d&&!n(b)||Pd(A(a,1,d),b,c)}
function Pd(a,b,c){c instanceof E&&(c=new Pc(c,a));if(!n(b))throw Error(a+"contains undefined "+Rc(c));if(ha(b))throw Error(a+"contains a function "+Rc(c)+" with contents: "+b.toString());if(Xb(b))throw Error(a+"contains "+b.toString()+" "+Rc(c));if(p(b)&&b.length>10485760/3&&10485760<nb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Rc(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;fb(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!Md(b)))throw Error(a+" contains an invalid key ("+b+") "+Rc(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Pd(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Rc(c)+" in addition to actual children.");}}
function Qd(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!Md(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(Nc);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
function Rd(a,b,c){var d=A(a,1,!1);if(!ia(b)||ea(b))throw Error(d+" must be an object containing the children to replace.");var e=[];fb(b,function(a,b){var k=new E(a);Pd(d,b,c.n(k));if(".priority"===Oc(k)&&!Nd(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});Qd(d,e)}
function Sd(a,b,c){if(Xb(c))throw Error(A(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Nd(c))throw Error(A(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function Td(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(A(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function Ud(a,b){if(n(b)&&!Md(b))throw Error(A(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function Vd(a,b){if(!p(b)||0===b.length||Ld.test(b))throw Error(A(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function Wd(a,b){if(".info"===K(b))throw Error(a+" failed: Can't modify data under /.info/");}
function Xd(a,b){var c=b.path.toString(),d;!(d=!p(b.jc.host)||0===b.jc.host.length||!Md(b.jc.pe))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(p(c)&&0!==c.length&&!Ld.test(c)));if(d)throw Error(A(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function Gb(){this.k=this.B=null}Gb.prototype.find=function(a){if(null!=this.B)return this.B.P(a);if(a.e()||null==this.k)return null;var b=K(a);a=N(a);return this.k.contains(b)?this.k.get(b).find(a):null};function Ib(a,b,c){if(b.e())a.B=c,a.k=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.k&&(a.k=new Gc);var d=K(b);a.k.contains(d)||a.k.add(d,new Gb);a=a.k.get(d);b=N(b);Ib(a,b,c)}}
function Yd(a,b){if(b.e())return a.B=null,a.k=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.O(H,function(b,c){Ib(a,new E(b),c)});return Yd(a,b)}return null!==a.k?(c=K(b),b=N(b),a.k.contains(c)&&Yd(a.k.get(c),b)&&a.k.remove(c),a.k.e()?(a.k=null,!0):!1):!0}function Hb(a,b,c){null!==a.B?c(b,a.B):a.O(function(a,e){var f=new E(b.toString()+"/"+a);Hb(e,f,c)})}Gb.prototype.O=function(a){null!==this.k&&Hc(this.k,function(b,c){a(b,c)})};function Zd(a,b){this.type=$d;this.source=a;this.path=b}Zd.prototype.Mc=function(){return this.path.e()?new Zd(this.source,Q):new Zd(this.source,N(this.path))};Zd.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function ae(a,b,c){this.type=be;this.source=a;this.path=b;this.children=c}ae.prototype.Mc=function(a){if(this.path.e())return a=this.children.subtree(new E(a)),a.e()?null:a.value?new ce(this.source,Q,a.value):new ae(this.source,Q,a);D(K(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new ae(this.source,N(this.path),this.children)};ae.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function de(a,b,c){this.type=ee;this.source=fe;this.path=a;this.Ob=b;this.Id=c}de.prototype.Mc=function(a){if(this.path.e()){if(null!=this.Ob.value)return D(this.Ob.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Ob.subtree(new E(a));return new de(Q,a,this.Id)}D(K(this.path)===a,"operationForChild called for unrelated child.");return new de(N(this.path),this.Ob,this.Id)};
de.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Ob+")"};function ce(a,b,c){this.type=ge;this.source=a;this.path=b;this.Ga=c}ce.prototype.Mc=function(a){return this.path.e()?new ce(this.source,Q,this.Ga.Q(a)):new ce(this.source,N(this.path),this.Ga)};ce.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ga.toString()+")"};var ge=0,be=1,ee=2,$d=3;function he(a,b,c,d){this.ee=a;this.Se=b;this.Hb=c;this.Ee=d;D(!d||b,"Tagged queries must be from server.")}var fe=new he(!0,!1,null,!1),ie=new he(!1,!0,null,!1);he.prototype.toString=function(){return this.ee?"user":this.Ee?"server(queryID="+this.Hb+")":"server"};function je(a,b,c){this.A=a;this.da=b;this.Sb=c}function ke(a){return a.da}function le(a){return a.Sb}function me(a,b){return b.e()?a.da&&!a.Sb:ne(a,K(b))}function ne(a,b){return a.da&&!a.Sb||a.A.Da(b)}je.prototype.j=function(){return this.A};function oe(a,b){this.N=a;this.Ld=b}function pe(a,b,c,d){return new oe(new je(b,c,d),a.Ld)}function qe(a){return a.N.da?a.N.j():null}oe.prototype.w=function(){return this.Ld};function re(a){return a.Ld.da?a.Ld.j():null};function se(){}se.prototype.Te=function(){return null};se.prototype.fe=function(){return null};var te=new se;function ue(a,b,c){this.xf=a;this.Ka=b;this.yd=c}ue.prototype.Te=function(a){var b=this.Ka.N;if(ne(b,a))return b.j().Q(a);b=null!=this.yd?new je(this.yd,!0,!1):this.Ka.w();return this.xf.qc(a,b)};ue.prototype.fe=function(a,b,c){var d=null!=this.yd?this.yd:re(this.Ka);a=this.xf.Xd(d,b,1,c,a);return 0===a.length?null:a[0]};function ve(a,b){this.Sd=a;this.Df=b}function we(a){this.U=a}
we.prototype.eb=function(a,b,c,d){var e=new xe,f;if(b.type===ge)b.source.ee?c=ye(this,a,b.path,b.Ga,c,d,e):(D(b.source.Se,"Unknown source."),f=b.source.Ee||le(a.w())&&!b.path.e(),c=ze(this,a,b.path,b.Ga,c,d,f,e));else if(b.type===be)b.source.ee?c=Ae(this,a,b.path,b.children,c,d,e):(D(b.source.Se,"Unknown source."),f=b.source.Ee||le(a.w()),c=Be(this,a,b.path,b.children,c,d,f,e));else if(b.type===ee)if(b.Id)if(b=b.path,null!=c.lc(b))c=a;else{f=new ue(c,a,d);d=a.N.j();if(b.e()||".priority"===K(b))ke(a.w())?
b=c.Aa(re(a)):(b=a.w().j(),D(b instanceof O,"serverChildren would be complete if leaf node"),b=c.rc(b)),b=this.U.ya(d,b,e);else{var h=K(b),k=c.qc(h,a.w());null==k&&ne(a.w(),h)&&(k=d.Q(h));b=null!=k?this.U.F(d,h,k,N(b),f,e):a.N.j().Da(h)?this.U.F(d,h,L,N(b),f,e):d;b.e()&&ke(a.w())&&(d=c.Aa(re(a)),d.J()&&(b=this.U.ya(b,d,e)))}d=ke(a.w())||null!=c.lc(Q);c=pe(a,b,d,this.U.Na())}else c=Ce(this,a,b.path,b.Ob,c,d,e);else if(b.type===$d)d=b.path,b=a.w(),f=b.j(),h=b.da||d.e(),c=De(this,new oe(a.N,new je(f,
h,b.Sb)),d,c,te,e);else throw Mb("Unknown operation type: "+b.type);e=Na(e.fb);d=c;b=d.N;b.da&&(f=b.j().J()||b.j().e(),h=qe(a),(0<e.length||!a.N.da||f&&!b.j().Z(h)||!b.j().C().Z(h.C()))&&e.push(Ee(qe(d))));return new ve(c,e)};
function De(a,b,c,d,e,f){var h=b.N;if(null!=d.lc(c))return b;var k;if(c.e())D(ke(b.w()),"If change path is empty, we must have complete server data"),le(b.w())?(e=re(b),d=d.rc(e instanceof O?e:L)):d=d.Aa(re(b)),f=a.U.ya(b.N.j(),d,f);else{var m=K(c);if(".priority"==m)D(1==Ec(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.ad(c,f,k),f=null!=d?a.U.fa(f,d):h.j();else{var l=N(c);ne(h,m)?(k=b.w().j(),d=d.ad(c,h.j(),k),d=null!=d?h.j().Q(m).F(l,d):h.j().Q(m)):d=d.qc(m,
b.w());f=null!=d?a.U.F(h.j(),m,d,l,e,f):h.j()}}return pe(b,f,h.da||c.e(),a.U.Na())}function ze(a,b,c,d,e,f,h,k){var m=b.w();h=h?a.U:a.U.Ub();if(c.e())d=h.ya(m.j(),d,null);else if(h.Na()&&!m.Sb)d=m.j().F(c,d),d=h.ya(m.j(),d,null);else{var l=K(c);if(!me(m,c)&&1<Ec(c))return b;var u=N(c);d=m.j().Q(l).F(u,d);d=".priority"==l?h.fa(m.j(),d):h.F(m.j(),l,d,u,te,null)}m=m.da||c.e();b=new oe(b.N,new je(d,m,h.Na()));return De(a,b,c,e,new ue(e,b,f),k)}
function ye(a,b,c,d,e,f,h){var k=b.N;e=new ue(e,b,f);if(c.e())h=a.U.ya(b.N.j(),d,h),a=pe(b,h,!0,a.U.Na());else if(f=K(c),".priority"===f)h=a.U.fa(b.N.j(),d),a=pe(b,h,k.da,k.Sb);else{c=N(c);var m=k.j().Q(f);if(!c.e()){var l=e.Te(f);d=null!=l?".priority"===Oc(c)&&l.P(c.parent()).e()?l:l.F(c,d):L}m.Z(d)?a=b:(h=a.U.F(k.j(),f,d,c,e,h),a=pe(b,h,k.da,a.U.Na()))}return a}
function Ae(a,b,c,d,e,f,h){var k=b;Hd(d,function(d,l){var u=c.n(d);ne(b.N,K(u))&&(k=ye(a,k,u,l,e,f,h))});Hd(d,function(d,l){var u=c.n(d);ne(b.N,K(u))||(k=ye(a,k,u,l,e,f,h))});return k}function Fe(a,b){Hd(b,function(b,d){a=a.F(b,d)});return a}
function Be(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!ke(b.w()))return b;var m=b;c=c.e()?d:Ad(R,c,d);var l=b.w().j();c.children.ha(function(c,d){if(l.Da(c)){var F=b.w().j().Q(c),F=Fe(F,d);m=ze(a,m,new E(c),F,e,f,h,k)}});c.children.ha(function(c,d){var F=!ne(b.w(),c)&&null==d.value;l.Da(c)||F||(F=b.w().j().Q(c),F=Fe(F,d),m=ze(a,m,new E(c),F,e,f,h,k))});return m}
function Ce(a,b,c,d,e,f,h){if(null!=e.lc(c))return b;var k=le(b.w()),m=b.w();if(null!=d.value){if(c.e()&&m.da||me(m,c))return ze(a,b,c,m.j().P(c),e,f,k,h);if(c.e()){var l=R;m.j().O(tc,function(a,b){l=l.set(new E(a),b)});return Be(a,b,c,l,e,f,k,h)}return b}l=R;Hd(d,function(a){var b=c.n(a);me(m,b)&&(l=l.set(a,m.j().P(b)))});return Be(a,b,c,l,e,f,k,h)};function Ge(a){this.V=a;this.g=a.m.g}function He(a,b,c,d){var e=[],f=[];ya(b,function(b){b.type===Ie&&a.g.nd(b.qe,b.Ja)&&f.push(new S(Je,b.Ja,b.Xa))});Ke(a,e,Le,b,d,c);Ke(a,e,Me,b,d,c);Ke(a,e,Je,f,d,c);Ke(a,e,Ie,b,d,c);Ke(a,e,Ne,b,d,c);return e}function Ke(a,b,c,d,e,f){d=za(d,function(a){return a.type===c});Ha(d,q(a.Ff,a));ya(d,function(c){var d=Oe(a,c,f);ya(e,function(e){e.nf(c.type)&&b.push(e.createEvent(d,a.V))})})}
function Oe(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Ve(b.Xa,b.Ja,a.g));return b}Ge.prototype.Ff=function(a,b){if(null==a.Xa||null==b.Xa)throw Mb("Should only compare child_ events.");return this.g.compare(new C(a.Xa,a.Ja),new C(b.Xa,b.Ja))};function Pe(a,b){this.V=a;var c=a.m,d=new Qe(c.g),c=T(c)?new Qe(c.g):c.xa?new Re(c):new Se(c);this.hf=new we(c);var e=b.w(),f=b.N,h=d.ya(L,e.j(),null),k=c.ya(L,f.j(),null);this.Ka=new oe(new je(k,f.da,c.Na()),new je(h,e.da,d.Na()));this.Za=[];this.Jf=new Ge(a)}function Te(a){return a.V}g=Pe.prototype;g.w=function(){return this.Ka.w().j()};g.hb=function(a){var b=re(this.Ka);return b&&(T(this.V.m)||!a.e()&&!b.Q(K(a)).e())?b.P(a):null};g.e=function(){return 0===this.Za.length};g.Nb=function(a){this.Za.push(a)};
g.kb=function(a,b){var c=[];if(b){D(null==a,"A cancel should cancel all event registrations.");var d=this.V.path;ya(this.Za,function(a){(a=a.Me(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Za.length;++f){var h=this.Za[f];if(!h.matches(a))e.push(h);else if(a.Xe()){e=e.concat(this.Za.slice(f+1));break}}this.Za=e}else this.Za=[];return c};
g.eb=function(a,b,c){a.type===be&&null!==a.source.Hb&&(D(re(this.Ka),"We should always have a full cache before handling merges"),D(qe(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.hf.eb(d,a,b,c);b=this.hf;c=a.Sd;D(c.N.j().yc(b.U.g),"Event snap not indexed");D(c.w().j().yc(b.U.g),"Server snap not indexed");D(ke(a.Sd.w())||!ke(d.w()),"Once a server snap is complete, it should never go back");this.Ka=a.Sd;return Ue(this,a.Df,a.Sd.N.j(),null)};
function Ve(a,b){var c=a.Ka.N,d=[];c.j().J()||c.j().O(H,function(a,b){d.push(new S(Me,b,a))});c.da&&d.push(Ee(c.j()));return Ue(a,d,c.j(),b)}function Ue(a,b,c,d){return He(a.Jf,b,c,d?[d]:a.Za)};function We(a,b,c,d){this.ae=b;this.Md=c;this.Dd=d;this.hd=a}We.prototype.Yb=function(){var a=this.Md.wb();return"value"===this.hd?a.path:a.getParent().path};We.prototype.ge=function(){return this.hd};We.prototype.Tb=function(){return this.ae.Tb(this)};We.prototype.toString=function(){return this.Yb().toString()+":"+this.hd+":"+x(this.Md.be())};function Xe(a,b,c){this.ae=a;this.error=b;this.path=c}Xe.prototype.Yb=function(){return this.path};Xe.prototype.ge=function(){return"cancel"};
Xe.prototype.Tb=function(){return this.ae.Tb(this)};Xe.prototype.toString=function(){return this.path.toString()+":cancel"};function Ye(){this.vb=[]}function Ze(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Yb();null===c||f.Z(c.Yb())||(a.vb.push(c),c=null);null===c&&(c=new $e(f));c.add(e)}c&&a.vb.push(c)}function af(a,b,c){Ze(a,c);bf(a,function(a){return a.Z(b)})}function cf(a,b,c){Ze(a,c);bf(a,function(a){return a.contains(b)||b.contains(a)})}
function bf(a,b){for(var c=!0,d=0;d<a.vb.length;d++){var e=a.vb[d];if(e)if(e=e.Yb(),b(e)){for(var e=a.vb[d],f=0;f<e.jd.length;f++){var h=e.jd[f];if(null!==h){e.jd[f]=null;var k=h.Tb();Qb&&I("event: "+h.toString());fc(k)}}a.vb[d]=null}else c=!1}c&&(a.vb=[])}function $e(a){this.qa=a;this.jd=[]}$e.prototype.add=function(a){this.jd.push(a)};$e.prototype.Yb=function(){return this.qa};function Qe(a){this.g=a}g=Qe.prototype;g.F=function(a,b,c,d,e,f){D(a.yc(this.g),"A node must be indexed if only a child is updated");e=a.Q(b);if(e.P(d).Z(c.P(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Da(b)?df(f,new S(Le,e,b)):D(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?df(f,new S(Me,c,b)):df(f,new S(Ie,c,b,e)));return a.J()&&c.e()?a:a.T(b,c).nb(this.g)};
g.ya=function(a,b,c){null!=c&&(a.J()||a.O(H,function(a,e){b.Da(a)||df(c,new S(Le,e,a))}),b.J()||b.O(H,function(b,e){if(a.Da(b)){var f=a.Q(b);f.Z(e)||df(c,new S(Ie,e,b,f))}else df(c,new S(Me,e,b))}));return b.nb(this.g)};g.fa=function(a,b){return a.e()?L:a.fa(b)};g.Na=function(){return!1};g.Ub=function(){return this};function Se(a){this.he=new Qe(a.g);this.g=a.g;var b;a.ka?(b=ef(a),b=a.g.Ec(ff(a),b)):b=a.g.Hc();this.Uc=b;a.na?(b=gf(a),a=a.g.Ec(hf(a),b)):a=a.g.Fc();this.vc=a}g=Se.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.vc)};g.F=function(a,b,c,d,e,f){this.matches(new C(b,c))||(c=L);return this.he.F(a,b,c,d,e,f)};
g.ya=function(a,b,c){b.J()&&(b=L);var d=b.nb(this.g),d=d.fa(L),e=this;b.O(H,function(a,b){e.matches(new C(a,b))||(d=d.T(a,L))});return this.he.ya(a,d,c)};g.fa=function(a){return a};g.Na=function(){return!0};g.Ub=function(){return this.he};function Re(a){this.sa=new Se(a);this.g=a.g;D(a.xa,"Only valid if limit has been set");this.oa=a.oa;this.Ib=!jf(a)}g=Re.prototype;g.F=function(a,b,c,d,e,f){this.sa.matches(new C(b,c))||(c=L);return a.Q(b).Z(c)?a:a.Eb()<this.oa?this.sa.Ub().F(a,b,c,d,e,f):kf(this,a,b,c,e,f)};
g.ya=function(a,b,c){var d;if(b.J()||b.e())d=L.nb(this.g);else if(2*this.oa<b.Eb()&&b.yc(this.g)){d=L.nb(this.g);b=this.Ib?b.Zb(this.sa.vc,this.g):b.Xb(this.sa.Uc,this.g);for(var e=0;0<b.Pa.length&&e<this.oa;){var f=M(b),h;if(h=this.Ib?0>=this.g.compare(this.sa.Uc,f):0>=this.g.compare(f,this.sa.vc))d=d.T(f.name,f.R),e++;else break}}else{d=b.nb(this.g);d=d.fa(L);var k,m,l;if(this.Ib){b=d.We(this.g);k=this.sa.vc;m=this.sa.Uc;var u=nc(this.g);l=function(a,b){return u(b,a)}}else b=d.Wb(this.g),k=this.sa.Uc,
m=this.sa.vc,l=nc(this.g);for(var e=0,z=!1;0<b.Pa.length;)f=M(b),!z&&0>=l(k,f)&&(z=!0),(h=z&&e<this.oa&&0>=l(f,m))?e++:d=d.T(f.name,L)}return this.sa.Ub().ya(a,d,c)};g.fa=function(a){return a};g.Na=function(){return!0};g.Ub=function(){return this.sa.Ub()};
function kf(a,b,c,d,e,f){var h;if(a.Ib){var k=nc(a.g);h=function(a,b){return k(b,a)}}else h=nc(a.g);D(b.Eb()==a.oa,"");var m=new C(c,d),l=a.Ib?pd(b,a.g):qd(b,a.g),u=a.sa.matches(m);if(b.Da(c)){for(var z=b.Q(c),l=e.fe(a.g,l,a.Ib);null!=l&&(l.name==c||b.Da(l.name));)l=e.fe(a.g,l,a.Ib);e=null==l?1:h(l,m);if(u&&!d.e()&&0<=e)return null!=f&&df(f,new S(Ie,d,c,z)),b.T(c,d);null!=f&&df(f,new S(Le,z,c));b=b.T(c,L);return null!=l&&a.sa.matches(l)?(null!=f&&df(f,new S(Me,l.R,l.name)),b.T(l.name,l.R)):b}return d.e()?
b:u&&0<=h(l,m)?(null!=f&&(df(f,new S(Le,l.R,l.name)),df(f,new S(Me,d,c))),b.T(c,d).T(l.name,L)):b};function S(a,b,c,d){this.type=a;this.Ja=b;this.Xa=c;this.qe=d;this.Dd=void 0}function Ee(a){return new S(Ne,a)}var Me="child_added",Le="child_removed",Ie="child_changed",Je="child_moved",Ne="value";function xe(){this.fb={}}
function df(a,b){var c=b.type,d=b.Xa;D(c==Me||c==Ie||c==Le,"Only child changes supported for tracking");D(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.fb,d);if(e){var f=e.type;if(c==Me&&f==Le)a.fb[d]=new S(Ie,b.Ja,d,e.Ja);else if(c==Le&&f==Me)delete a.fb[d];else if(c==Le&&f==Ie)a.fb[d]=new S(Le,e.qe,d);else if(c==Ie&&f==Me)a.fb[d]=new S(Me,b.Ja,d);else if(c==Ie&&f==Ie)a.fb[d]=new S(Ie,b.Ja,d,e.qe);else throw Mb("Illegal combination of changes: "+b+" occurred after "+
e);}else a.fb[d]=b};function lf(){this.Rb=this.na=this.Kb=this.ka=this.xa=!1;this.oa=0;this.mb="";this.dc=null;this.zb="";this.ac=null;this.xb="";this.g=H}var mf=new lf;function jf(a){return""===a.mb?a.ka:"l"===a.mb}function ff(a){D(a.ka,"Only valid if start has been set");return a.dc}function ef(a){D(a.ka,"Only valid if start has been set");return a.Kb?a.zb:"[MIN_NAME]"}function hf(a){D(a.na,"Only valid if end has been set");return a.ac}
function gf(a){D(a.na,"Only valid if end has been set");return a.Rb?a.xb:"[MAX_NAME]"}function nf(a){var b=new lf;b.xa=a.xa;b.oa=a.oa;b.ka=a.ka;b.dc=a.dc;b.Kb=a.Kb;b.zb=a.zb;b.na=a.na;b.ac=a.ac;b.Rb=a.Rb;b.xb=a.xb;b.g=a.g;b.mb=a.mb;return b}g=lf.prototype;g.ne=function(a){var b=nf(this);b.xa=!0;b.oa=a;b.mb="l";return b};g.oe=function(a){var b=nf(this);b.xa=!0;b.oa=a;b.mb="r";return b};g.Nd=function(a,b){var c=nf(this);c.ka=!0;n(a)||(a=null);c.dc=a;null!=b?(c.Kb=!0,c.zb=b):(c.Kb=!1,c.zb="");return c};
g.gd=function(a,b){var c=nf(this);c.na=!0;n(a)||(a=null);c.ac=a;n(b)?(c.Rb=!0,c.xb=b):(c.vg=!1,c.xb="");return c};function of(a,b){var c=nf(a);c.g=b;return c}function pf(a){var b={};a.ka&&(b.sp=a.dc,a.Kb&&(b.sn=a.zb));a.na&&(b.ep=a.ac,a.Rb&&(b.en=a.xb));if(a.xa){b.l=a.oa;var c=a.mb;""===c&&(c=jf(a)?"l":"r");b.vf=c}a.g!==H&&(b.i=a.g.toString());return b}function T(a){return!(a.ka||a.na||a.xa)}function qf(a){return T(a)&&a.g==H}
function rf(a){var b={};if(qf(a))return b;var c;a.g===H?c="$priority":a.g===wc?c="$value":a.g===tc?c="$key":(D(a.g instanceof pc,"Unrecognized index type!"),c=a.g.toString());b.orderBy=x(c);a.ka&&(b.startAt=x(a.dc),a.Kb&&(b.startAt+=","+x(a.zb)));a.na&&(b.endAt=x(a.ac),a.Rb&&(b.endAt+=","+x(a.xb)));a.xa&&(jf(a)?b.limitToFirst=a.oa:b.limitToLast=a.oa);return b}g.toString=function(){return x(pf(this))};function sf(a){this.W=a}var tf=new sf(new vd(null));function uf(a,b,c){if(b.e())return new sf(new vd(c));var d=zd(a.W,b);if(null!=d){var e=d.path,d=d.value;b=P(e,b);d=d.F(b,c);return new sf(a.W.set(e,d))}a=Ad(a.W,b,new vd(c));return new sf(a)}function vf(a,b,c){var d=a;fb(c,function(a,c){d=uf(d,b.n(a),c)});return d}sf.prototype.Ed=function(a){if(a.e())return tf;a=Ad(this.W,a,R);return new sf(a)};function wf(a,b){var c=zd(a.W,b);return null!=c?a.W.get(c.path).P(P(c.path,b)):null}
function xf(a){var b=[],c=a.W.value;null!=c?c.J()||c.O(H,function(a,c){b.push(new C(a,c))}):a.W.children.ha(function(a,c){null!=c.value&&b.push(new C(a,c.value))});return b}function yf(a,b){if(b.e())return a;var c=wf(a,b);return null!=c?new sf(new vd(c)):new sf(a.W.subtree(b))}sf.prototype.e=function(){return this.W.e()};sf.prototype.apply=function(a){return zf(Q,this.W,a)};
function zf(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ha(function(b,f){".priority"===b?(D(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=zf(a.n(b),f,c)});c.P(a).e()||null===d||(c=c.F(a.n(".priority"),d));return c};function Af(){this.Jd=L}Af.prototype.j=function(a){return this.Jd.P(a)};Af.prototype.toString=function(){return this.Jd.toString()};function Bf(a){this.oc=a}Bf.prototype.getToken=function(a){return this.oc.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(I("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function Cf(a,b){a.oc.INTERNAL.addAuthTokenListener(b)};function Df(){this.S=tf;this.la=[];this.Bc=-1}function Ef(a,b){for(var c=0;c<a.la.length;c++){var d=a.la[c];if(d.Zc===b)return d}return null}g=Df.prototype;
g.Ed=function(a){var b=Ea(this.la,function(b){return b.Zc===a});D(0<=b,"removeWrite called with nonexistent writeId.");var c=this.la[b];this.la.splice(b,1);for(var d=c.visible,e=!1,f=this.la.length-1;d&&0<=f;){var h=this.la[f];h.visible&&(f>=b&&Ff(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.S=Gf(this.la,Hf,Q),this.Bc=0<this.la.length?this.la[this.la.length-1].Zc:-1;else if(c.Ga)this.S=this.S.Ed(c.path);else{var k=this;v(c.children,function(a,b){k.S=k.S.Ed(c.path.n(b))})}return!0}return!1};
g.Aa=function(a,b,c,d){if(c||d){var e=yf(this.S,a);return!d&&e.e()?b:d||null!=b||null!=wf(e,Q)?(e=Gf(this.la,function(b){return(b.visible||d)&&(!c||!(0<=xa(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||L,e.apply(b)):null}e=wf(this.S,a);if(null!=e)return e;e=yf(this.S,a);return e.e()?b:null!=b||null!=wf(e,Q)?(b=b||L,e.apply(b)):null};
g.rc=function(a,b){var c=L,d=wf(this.S,a);if(d)d.J()||d.O(H,function(a,b){c=c.T(a,b)});else if(b){var e=yf(this.S,a);b.O(H,function(a,b){var d=yf(e,new E(a)).apply(b);c=c.T(a,d)});ya(xf(e),function(a){c=c.T(a.name,a.R)})}else e=yf(this.S,a),ya(xf(e),function(a){c=c.T(a.name,a.R)});return c};g.ad=function(a,b,c,d){D(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.n(b);if(null!=wf(this.S,a))return null;a=yf(this.S,a);return a.e()?d.P(b):a.apply(d.P(b))};
g.qc=function(a,b,c){a=a.n(b);var d=wf(this.S,a);return null!=d?d:ne(c,b)?yf(this.S,a).apply(c.j().Q(b)):null};g.lc=function(a){return wf(this.S,a)};g.Xd=function(a,b,c,d,e,f){var h;a=yf(this.S,a);h=wf(a,Q);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.nb(f);if(h.e()||h.J())return[];b=[];a=nc(f);e=e?h.Zb(c,f):h.Xb(c,f);for(f=M(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=M(e);return b};
function Ff(a,b){return a.Ga?a.path.contains(b):!!Qa(a.children,function(c,d){return a.path.n(d).contains(b)})}function Hf(a){return a.visible}
function Gf(a,b,c){for(var d=tf,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ga)c.contains(h)?(h=P(c,h),d=uf(d,h,f.Ga)):h.contains(c)&&(h=P(h,c),d=uf(d,Q,f.Ga.P(h)));else if(f.children)if(c.contains(h))h=P(c,h),d=vf(d,h,f.children);else{if(h.contains(c))if(h=P(h,c),h.e())d=vf(d,Q,f.children);else if(f=w(f.children,K(h)))f=f.P(N(h)),d=uf(d,Q,f)}else throw Mb("WriteRecord should have .snap or .children");}}return d}function If(a,b){this.Lb=a;this.W=b}g=If.prototype;
g.Aa=function(a,b,c){return this.W.Aa(this.Lb,a,b,c)};g.rc=function(a){return this.W.rc(this.Lb,a)};g.ad=function(a,b,c){return this.W.ad(this.Lb,a,b,c)};g.lc=function(a){return this.W.lc(this.Lb.n(a))};g.Xd=function(a,b,c,d,e){return this.W.Xd(this.Lb,a,b,c,d,e)};g.qc=function(a,b){return this.W.qc(this.Lb,a,b)};g.n=function(a){return new If(this.Lb.n(a),this.W)};function Jf(a,b){this.rf={};this.Vc=new Kf(a);this.va=b;var c=1E4+2E4*Math.random();hc(q(this.lf,this),Math.floor(c))}Jf.prototype.lf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&eb(this.rf,d)&&(b[d]=a[d],c=!0);c&&this.va.ye(b);hc(q(this.lf,this),Math.floor(6E5*Math.random()))};function Lf(){this.tc={}}function Mf(a,b,c){n(c)||(c=1);eb(a.tc,b)||(a.tc[b]=0);a.tc[b]+=c}Lf.prototype.get=function(){return Ta(this.tc)};function Kf(a){this.Ef=a;this.rd=null}Kf.prototype.get=function(){var a=this.Ef.get(),b=Ta(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};var Nf={},Of={};function Pf(a){a=a.toString();Nf[a]||(Nf[a]=new Lf);return Nf[a]}function Qf(a,b){var c=a.toString();Of[c]||(Of[c]=b());return Of[c]};function Rf(a,b,c){this.f=Tb("p:rest:");this.L=a;this.Gb=b;this.$c=c;this.$={}}function Sf(a,b){if(n(b))return"tag$"+b;D(qf(a.m),"should have a tag if it's not a default query.");return a.path.toString()}g=Rf.prototype;
g.$e=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ja());var f=Sf(a,c),h={};this.$[f]=h;a=rf(a.m);var k=this;Tf(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Gb(e,u,!1,c);w(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.uf=function(a,b){var c=Sf(a,b);delete this.$[c]};g.kf=function(){};g.re=function(){};g.cf=function(){};g.xd=function(){};g.put=function(){};g.af=function(){};g.ye=function(){};
function Tf(a,b,c,d){c=c||{};c.format="export";a.$c.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.L.Sc?"https://":"http://")+a.L.host+b+"?"+gb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=lb(h.responseText)}catch(c){J("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
b)}else 401!==h.status&&404!==h.status&&J("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function Uf(a){this.te=a;this.Bd=[];this.Qb=0;this.Yd=-1;this.Fb=null}function Vf(a,b,c){a.Yd=b;a.Fb=c;a.Yd<a.Qb&&(a.Fb(),a.Fb=null)}function Wf(a,b,c){for(a.Bd[b]=c;a.Bd[a.Qb];){var d=a.Bd[a.Qb];delete a.Bd[a.Qb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;fc(function(){f.te(d[e])})}if(a.Qb===a.Yd){a.Fb&&(clearTimeout(a.Fb),a.Fb(),a.Fb=null);break}a.Qb++}};var Cb="websocket",Db="long_polling";var Xf=null;"undefined"!==typeof MozWebSocket?Xf=MozWebSocket:"undefined"!==typeof WebSocket&&(Xf=WebSocket);function Yf(a,b,c,d){this.Zd=a;this.f=Tb(this.Zd);this.frames=this.zc=null;this.pb=this.qb=this.Fe=0;this.Va=Pf(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Ke=Bb(b,Cb,a)}var Zf;
Yf.prototype.open=function(a,b){this.ib=b;this.Xf=a;this.f("Websocket connecting to "+this.Ke);this.wc=!1;xb.set("previous_websocket_failure",!0);try{this.Ia=new Xf(this.Ke)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.bb();return}var e=this;this.Ia.onopen=function(){e.f("Websocket connected.");e.wc=!0};this.Ia.onclose=function(){e.f("Websocket connection was disconnected.");e.Ia=null;e.bb()};this.Ia.onmessage=function(a){if(null!==e.Ia)if(a=a.data,e.pb+=
a.length,Mf(e.Va,"bytes_received",a.length),$f(e),null!==e.frames)ag(e,a);else{a:{D(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.Fe=b;e.frames=[];a=null;break a}}e.Fe=1;e.frames=[]}null!==a&&ag(e,a)}};this.Ia.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.bb()}};Yf.prototype.start=function(){};
Yf.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==Xf&&!Zf};Yf.responsesRequiredToBeHealthy=2;Yf.healthyTimeout=3E4;g=Yf.prototype;g.sd=function(){xb.remove("previous_websocket_failure")};function ag(a,b){a.frames.push(b);if(a.frames.length==a.Fe){var c=a.frames.join("");a.frames=null;c=lb(c);a.Xf(c)}}
g.send=function(a){$f(this);a=x(a);this.qb+=a.length;Mf(this.Va,"bytes_sent",a.length);a=bc(a,16384);1<a.length&&bg(this,String(a.length));for(var b=0;b<a.length;b++)bg(this,a[b])};g.Tc=function(){this.Ab=!0;this.zc&&(clearInterval(this.zc),this.zc=null);this.Ia&&(this.Ia.close(),this.Ia=null)};g.bb=function(){this.Ab||(this.f("WebSocket is closing itself"),this.Tc(),this.ib&&(this.ib(this.wc),this.ib=null))};g.close=function(){this.Ab||(this.f("WebSocket is being closed"),this.Tc())};
function $f(a){clearInterval(a.zc);a.zc=setInterval(function(){a.Ia&&bg(a,"0");$f(a)},Math.floor(45E3))}function bg(a,b){try{a.Ia.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(q(a.bb,a),0)}};function cg(a,b,c,d){this.Zd=a;this.f=Tb(a);this.jc=b;this.pb=this.qb=0;this.Va=Pf(b);this.tf=c;this.wc=!1;this.Cb=d;this.Yc=function(a){return Bb(b,Db,a)}}var dg,eg;
cg.prototype.open=function(a,b){this.Ne=0;this.ia=b;this.bf=new Uf(a);this.Ab=!1;var c=this;this.sb=setTimeout(function(){c.f("Timed out trying to connect.");c.bb();c.sb=null},Math.floor(3E4));Yb(function(){if(!c.Ab){c.Ta=new fg(function(a,b,d,k,m){gg(c,arguments);if(c.Ta)if(c.sb&&(clearTimeout(c.sb),c.sb=null),c.wc=!0,"start"==a)c.id=b,c.ff=d;else if("close"===a)b?(c.Ta.Kd=!1,Vf(c.bf,b,function(){c.bb()})):c.bb();else throw Error("Unrecognized command received: "+a);},function(a,b){gg(c,arguments);
Wf(c.bf,a,b)},function(){c.bb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Ta.Qd&&(a.cb=c.Ta.Qd);a.v="5";c.tf&&(a.s=c.tf);c.Cb&&(a.ls=c.Cb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);hg(c.Ta,a,function(){})}})};
cg.prototype.start=function(){var a=this.Ta,b=this.ff;a.Vf=this.id;a.Wf=b;for(a.Ud=!0;ig(a););a=this.id;b=this.ff;this.fc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.fc.src=this.Yc(c);this.fc.style.display="none";document.body.appendChild(this.fc)};
cg.isAvailable=function(){return dg||!eg&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.rg)&&!0};g=cg.prototype;g.sd=function(){};g.Tc=function(){this.Ab=!0;this.Ta&&(this.Ta.close(),this.Ta=null);this.fc&&(document.body.removeChild(this.fc),this.fc=null);this.sb&&(clearTimeout(this.sb),this.sb=null)};
g.bb=function(){this.Ab||(this.f("Longpoll is closing itself"),this.Tc(),this.ia&&(this.ia(this.wc),this.ia=null))};g.close=function(){this.Ab||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=x(a);this.qb+=a.length;Mf(this.Va,"bytes_sent",a.length);a=mb(a);a=ab(a,!0);a=bc(a,1840);for(var b=0;b<a.length;b++){var c=this.Ta;c.Qc.push({jg:this.Ne,pg:a.length,Pe:a[b]});c.Ud&&ig(c);this.Ne++}};function gg(a,b){var c=x(b).length;a.pb+=c;Mf(a.Va,"bytes_received",c)}
function fg(a,b,c,d){this.Yc=d;this.ib=c;this.ve=new Gc;this.Qc=[];this.$d=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=Lb();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||I("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.gb=a.contentDocument:a.contentWindow?a.gb=a.contentWindow.document:a.document&&(a.gb=a.document);this.Ea=a;a="";this.Ea.src&&"javascript:"===this.Ea.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ea.gb.open(),this.Ea.gb.write(a),this.Ea.gb.close()}catch(f){I("frame writing exception"),f.stack&&I(f.stack),I(f)}}
fg.prototype.close=function(){this.Ud=!1;if(this.Ea){this.Ea.gb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ea&&(document.body.removeChild(a.Ea),a.Ea=null)},Math.floor(0))}var b=this.ib;b&&(this.ib=null,b())};
function ig(a){if(a.Ud&&a.Kd&&a.ve.count()<(0<a.Qc.length?2:1)){a.$d++;var b={};b.id=a.Vf;b.pw=a.Wf;b.ser=a.$d;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Pe.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.jg+"&ts"+d+"="+e.pg+"&d"+d+"="+e.Pe;d++}else break;jg(a,b+c,a.$d);return!0}return!1}function jg(a,b,c){function d(){a.ve.remove(c);ig(a)}a.ve.add(c,1);var e=setTimeout(d,Math.floor(25E3));hg(a,b,function(){clearTimeout(e);d()})}
function hg(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ea.gb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){I("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ea.gb.body.appendChild(d)}}catch(e){}},Math.floor(1))};function kg(a){lg(this,a)}var mg=[cg,Yf];function lg(a,b){var c=Yf&&Yf.isAvailable(),d=c&&!(xb.Ze||!0===xb.get("previous_websocket_failure"));b.qg&&(c||J("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[Yf];else{var e=a.Wc=[];cc(mg,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function ng(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function og(a,b,c,d,e,f,h){this.id=a;this.f=Tb("c:"+this.id+":");this.te=c;this.Lc=d;this.ia=e;this.se=f;this.L=b;this.Ad=[];this.Le=0;this.sf=new kg(b);this.Ua=0;this.Cb=h;this.f("Connection created");pg(this)}
function pg(a){var b=ng(a.sf);a.I=new b("c:"+a.id+":"+a.Le++,a.L,void 0,a.Cb);a.xe=b.responsesRequiredToBeHealthy||0;var c=qg(a,a.I),d=rg(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Bb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=hc(function(){a.md=null;a.Bb||(a.I&&102400<a.I.pb?(a.f("Connection exceeded healthy timeout but has received "+a.I.pb+" bytes.  Marking connection healthy."),a.Bb=!0,a.I.sd()):a.I&&10240<a.I.qb?a.f("Connection exceeded healthy timeout but has sent "+
a.I.qb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function rg(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.Ua?1===a.Ua&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.L.$a.substr(0,2)&&(xb.remove("host:"+a.L.host),a.L.$a=a.L.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
function qg(a,b){return function(c){if(2!=a.Ua)if(b===a.Rc){var d=$b("t",c);c=$b("d",c);if("c"==d){if(d=$b("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.qf=c.s;Ab(a.L,f);0==a.Ua&&(a.I.start(),sg(a,a.I,d),"5"!==e&&J("Protocol version mismatch detected"),c=a.sf,(c=1<c.Wc.length?c.Wc[1]:null)&&tg(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];ug(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.se&&(a.se(c),a.se=null),a.ia=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Ab(a.L,c),1===a.Ua?a.close():(vg(a),pg(a))):"e"===d?Ub("Server Error: "+c):"o"===d?(a.f("got pong on primary."),wg(a),xg(a)):Ub("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=$b("t",c),c=$b("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?yg(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.pf--,yg(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}og.prototype.ua=function(a){zg(this,{t:"d",d:a})};function ug(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Zd),a.I=a.D,a.D=null)}
function yg(a){0>=a.pf?(a.f("Secondary connection is healthy."),a.Bb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,ug(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}og.prototype.wd=function(a){wg(this);this.te(a)};function wg(a){a.Bb||(a.xe--,0>=a.xe&&(a.f("Primary connection is healthy."),a.Bb=!0,a.I.sd()))}
function tg(a,b){a.D=new b("c:"+a.id+":"+a.Le++,a.L,a.qf);a.pf=b.responsesRequiredToBeHealthy||0;a.D.open(qg(a,a.D),rg(a,a.D));hc(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function sg(a,b,c){a.f("Realtime connection established.");a.I=b;a.Ua=1;a.Lc&&(a.Lc(c,a.qf),a.Lc=null);0===a.xe?(a.f("Primary connection is healthy."),a.Bb=!0):hc(function(){xg(a)},Math.floor(5E3))}
function xg(a){a.Bb||1!==a.Ua||(a.f("sending ping on primary."),zg(a,{t:"c",d:{t:"p",d:{}}}))}function zg(a,b){if(1!==a.Ua)throw"Connection is not connected";a.Xc.send(b)}og.prototype.close=function(){2!==this.Ua&&(this.f("Closing realtime connection."),this.Ua=2,vg(this),this.ia&&(this.ia(),this.ia=null))};function vg(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function Ag(a,b,c,d,e,f){this.id=Bg++;this.f=Tb("p:"+this.id+":");this.qd={};this.$={};this.pa=[];this.Oc=0;this.Kc=[];this.ma=!1;this.Sa=1E3;this.td=3E5;this.Gb=b;this.Jc=c;this.ue=d;this.L=a;this.ob=this.Fa=this.Cb=this.ze=null;this.$c=e;this.de=!1;this.ke=0;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Vd=f;this.ub=null;this.Mb=!1;this.Gd={};this.ig=0;this.Re=!0;this.Ac=this.me=null;Cg(this,0);Mc.Vb().gc("visible",this.Zf,this);-1===a.host.indexOf("fblocal")&&
Lc.Vb().gc("online",this.Yf,this)}var Bg=0,Dg=0;g=Ag.prototype;g.ua=function(a,b,c){var d=++this.ig;a={r:d,a:a,b:b};this.f(x(a));D(this.ma,"sendRequest call when we're not connected not allowed.");this.Fa.ua(a);c&&(this.Gd[d]=c)};
g.$e=function(a,b,c,d){var e=a.ja(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};D(qf(a.m)||!T(a.m),"listen() called for non-default but complete query");D(!this.$[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,eg:a,tag:c};this.$[f][e]=a;this.ma&&Eg(this,a)};
function Eg(a,b){var c=b.eg,d=c.path.toString(),e=c.ja();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=pf(c.m),f.t=b.tag);f.h=b.ld();a.ua("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&eb(k,"w")){var l=w(k,"w");ea(l)&&0<=xa(l,"no_index")&&J("Using an unspecified index. Consider adding "+('".indexOn": "'+c.m.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==m&&Fg(a,d,e),b.G&&b.G(m,
k))})}g.kf=function(a){this.ob=a;this.f("Auth token refreshed");this.ob?Gg(this):this.ma&&this.ua("unauth",{},function(){});if(a&&40===a.length||kc(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function Gg(a){if(a.ma&&a.ob){var b=a.ob,c=jc(b)?"auth":"gauth",d={cred:b};null===a.Vd?d.noauth=!0:"object"===typeof a.Vd&&(d.authvar=a.Vd);a.ua(c,d,function(c){var d=c.s;c=c.d||"error";a.ob===b&&("ok"===d?a.ke=0:Hg(a,d,c))})}}
g.uf=function(a,b){var c=a.path.toString(),d=a.ja();this.f("Unlisten called for "+c+" "+d);D(qf(a.m)||!T(a.m),"unlisten() called for non-default but complete query");if(Fg(this,c,d)&&this.ma){var e=pf(a.m);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.ua("n",c)}};g.re=function(a,b,c){this.ma?Ig(this,"o",a,b,c):this.Kc.push({we:a,action:"o",data:b,G:c})};g.cf=function(a,b,c){this.ma?Ig(this,"om",a,b,c):this.Kc.push({we:a,action:"om",data:b,G:c})};
g.xd=function(a,b){this.ma?Ig(this,"oc",a,null,b):this.Kc.push({we:a,action:"oc",data:null,G:b})};function Ig(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.ua(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Jg(this,"p",a,b,c,d)};g.af=function(a,b,c,d){Jg(this,"m",a,b,c,d)};function Jg(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.pa.push({action:b,mf:d,G:e});a.Oc++;b=a.pa.length-1;a.ma?Kg(a,b):a.f("Buffering put: "+c)}
function Kg(a,b){var c=a.pa[b].action,d=a.pa[b].mf,e=a.pa[b].G;a.pa[b].fg=a.ma;a.ua(c,d,function(d){a.f(c+" response",d);delete a.pa[b];a.Oc--;0===a.Oc&&(a.pa=[]);e&&e(d.s,d.d)})}g.ye=function(a){this.ma&&(a={c:a},this.f("reportStats",a),this.ua("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
g.wd=function(a){if("r"in a){this.f("from server: "+x(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Gb(a.p,a.d,!1,a.t):"m"===b?this.Gb(a.p,a.d,!0,a.t):"c"===b?Lg(this,a.p,a.q):"ac"===b?Hg(this,a.s,a.d):"sd"===b?this.ze?this.ze(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):Ub("Unrecognized action received from server: "+
x(b)+"\nAre you using the latest client?"))}};g.Lc=function(a,b){this.f("connection ready");this.ma=!0;this.Ac=(new Date).getTime();this.ue({serverTimeOffset:a-(new Date).getTime()});this.Cb=b;if(this.Re){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;pb()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.ye(c)}Mg(this);this.Re=!1;this.Jc(!0)};
function Cg(a,b){D(!a.Fa,"Scheduling a connect when we're already connected/ing?");a.ub&&clearTimeout(a.ub);a.ub=setTimeout(function(){a.ub=null;Ng(a)},Math.floor(b))}g.Zf=function(a){a&&!this.Mb&&this.Sa===this.td&&(this.f("Window became visible.  Reducing delay."),this.Sa=1E3,this.Fa||Cg(this,0));this.Mb=a};g.Yf=function(a){a?(this.f("Browser went online."),this.Sa=1E3,this.Fa||Cg(this,0)):(this.f("Browser went offline.  Killing connection."),this.Fa&&this.Fa.close())};
g.df=function(){this.f("data client disconnected");this.ma=!1;this.Fa=null;for(var a=0;a<this.pa.length;a++){var b=this.pa[a];b&&"h"in b.mf&&b.fg&&(b.G&&b.G("disconnect"),delete this.pa[a],this.Oc--)}0===this.Oc&&(this.pa=[]);this.Gd={};Og(this)&&(this.Mb?this.Ac&&(3E4<(new Date).getTime()-this.Ac&&(this.Sa=1E3),this.Ac=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Sa=this.td,this.me=(new Date).getTime()),a=Math.max(0,this.Sa-((new Date).getTime()-this.me)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),Cg(this,a),this.Sa=Math.min(this.td,1.3*this.Sa));this.Jc(!1)};
function Ng(a){if(Og(a)){a.f("Making a connection attempt");a.me=(new Date).getTime();a.Ac=null;var b=q(a.wd,a),c=q(a.Lc,a),d=q(a.df,a),e=a.id+":"+Dg++,f=a.Cb,h=!1,k=null,m=function(){k?k.close():(h=!0,d())};a.Fa={close:m,ua:function(a){D(k,"sendRequest call when we're not connected not allowed.");k.ua(a)}};var l=a.de;a.de=!1;a.$c.getToken(l).then(function(l){h?I("getToken() completed but was canceled"):(I("getToken() completed. Creating connection."),a.ob=l&&l.accessToken,k=new og(e,a.L,b,c,d,function(b){J(b+
" ("+a.L.toString()+")");a.ab("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||m()})}}g.ab=function(a){I("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Fa?this.Fa.close():(this.ub&&(clearTimeout(this.ub),this.ub=null),this.ma&&this.df())};g.kc=function(a){I("Resuming connection for reason: "+a);delete this.qd[a];Sa(this.qd)&&(this.Sa=1E3,this.Fa||Cg(this,0))};
function Lg(a,b,c){c=c?Aa(c,function(a){return ac(a)}).join("$"):"default";(a=Fg(a,b,c))&&a.G&&a.G("permission_denied")}function Fg(a,b,c){b=(new E(b)).toString();var d;n(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===La(a.$[b])&&delete a.$[b]):d=void 0;return d}
function Hg(a,b,c){I("Auth token revoked: "+b+"/"+c);a.ob=null;a.de=!0;a.Fa.close();if("invalid_token"===b||"permission_denied"===b)a.ke++,3<=a.ke&&(a.Sa=3E4,a=a.$c,b='Provided authentication credentials for the app named "'+a.oc.name+'" are invalid. This usually indicates your app was not initialized correctly. ',b="credential"in a.oc.options?b+'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in
a.oc.options?b+'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':b+'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',J(b))}
function Mg(a){Gg(a);v(a.$,function(b){v(b,function(b){Eg(a,b)})});for(var b=0;b<a.pa.length;b++)a.pa[b]&&Kg(a,b);for(;a.Kc.length;)b=a.Kc.shift(),Ig(a,b.action,b.we,b.data,b.G)}function Og(a){var b;b=Lc.Vb().hc;return Sa(a.qd)&&b};function Pg(a){a instanceof Qg||Vb("Don't call new Database() directly - please use firebase.database().");this.ta=a;this.ba=new U(a,Q);this.INTERNAL=new Rg(this)}var Sg={TIMESTAMP:{".sv":"timestamp"}};g=Pg.prototype;g.app=null;g.jf=function(a){Tg(this,"ref");y("database.ref",0,1,arguments.length);return n(a)?this.ba.n(a):this.ba};
g.gg=function(a){Tg(this,"database.refFromURL");y("database.refFromURL",1,1,arguments.length);var b=Wb(a);Xd("database.refFromURL",b);var c=b.jc;c.host!==this.ta.L.host&&Vb("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ta.L.host+")");return this.jf(b.path.toString())};function Tg(a,b){null===a.ta&&Vb("Cannot call "+b+" on a deleted database.")}g.Pf=function(){y("database.goOffline",0,0,arguments.length);Tg(this,"goOffline");this.ta.ab()};
g.Qf=function(){y("database.goOnline",0,0,arguments.length);Tg(this,"goOnline");this.ta.kc()};Object.defineProperty(Pg.prototype,"app",{get:function(){return this.ta.app}});function Rg(a){this.Ya=a}Rg.prototype.delete=function(){Tg(this.Ya,"delete");var a=Ug.Vb(),b=this.Ya.ta;w(a.lb,b.app.name)!==b&&Vb("Database "+b.app.name+" has already been deleted.");b.ab();delete a.lb[b.app.name];this.Ya.ta=null;this.Ya.ba=null;this.Ya=this.Ya.INTERNAL=null;return firebase.Promise.resolve()};
Pg.prototype.ref=Pg.prototype.jf;Pg.prototype.refFromURL=Pg.prototype.gg;Pg.prototype.goOnline=Pg.prototype.Qf;Pg.prototype.goOffline=Pg.prototype.Pf;Rg.prototype["delete"]=Rg.prototype.delete;function V(a,b,c){this.A=a;this.V=b;this.g=c}V.prototype.H=function(){y("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};V.prototype.val=V.prototype.H;V.prototype.be=function(){y("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};V.prototype.exportVal=V.prototype.be;V.prototype.toJSON=function(){y("Firebase.DataSnapshot.toJSON",0,1,arguments.length);return this.be()};V.prototype.toJSON=V.prototype.toJSON;
V.prototype.Lf=function(){y("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};V.prototype.exists=V.prototype.Lf;V.prototype.n=function(a){y("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));Vd("Firebase.DataSnapshot.child",a);var b=new E(a),c=this.V.n(b);return new V(this.A.P(b),c,H)};V.prototype.child=V.prototype.n;
V.prototype.Da=function(a){y("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Vd("Firebase.DataSnapshot.hasChild",a);var b=new E(a);return!this.A.P(b).e()};V.prototype.hasChild=V.prototype.Da;V.prototype.C=function(){y("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};V.prototype.getPriority=V.prototype.C;
V.prototype.forEach=function(a){y("Firebase.DataSnapshot.forEach",1,1,arguments.length);B("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.O(this.g,function(c,d){return a(new V(d,b.V.n(c),H))})};V.prototype.forEach=V.prototype.forEach;V.prototype.kd=function(){y("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};V.prototype.hasChildren=V.prototype.kd;
V.prototype.getKey=function(){y("Firebase.DataSnapshot.key",0,0,arguments.length);return this.V.getKey()};gc(V.prototype,"key",V.prototype.getKey);V.prototype.Eb=function(){y("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Eb()};V.prototype.numChildren=V.prototype.Eb;V.prototype.wb=function(){y("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.V};gc(V.prototype,"ref",V.prototype.wb);function Vg(a,b,c){this.Pb=a;this.rb=b;this.tb=c||null}g=Vg.prototype;g.nf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.m.g;return new We("value",this,new V(a.Ja,b.wb(),c))};g.Tb=function(a){var b=this.tb;if("cancel"===a.ge()){D(this.rb,"Raising a cancel event on a listener with no cancel callback");var c=this.rb;return function(){c.call(b,a.error)}}var d=this.Pb;return function(){d.call(b,a.Md)}};g.Me=function(a,b){return this.rb?new Xe(this,a,b):null};
g.matches=function(a){return a instanceof Vg?a.Pb&&this.Pb?a.Pb===this.Pb&&a.tb===this.tb:!0:!1};g.Xe=function(){return null!==this.Pb};function Wg(a,b,c){this.ga=a;this.rb=b;this.tb=c}g=Wg.prototype;g.nf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ga};g.Me=function(a,b){return this.rb?new Xe(this,a,b):null};
g.createEvent=function(a,b){D(null!=a.Xa,"Child events should have a childName.");var c=b.wb().n(a.Xa);return new We(a.type,this,new V(a.Ja,c,b.m.g),a.Dd)};g.Tb=function(a){var b=this.tb;if("cancel"===a.ge()){D(this.rb,"Raising a cancel event on a listener with no cancel callback");var c=this.rb;return function(){c.call(b,a.error)}}var d=this.ga[a.hd];return function(){d.call(b,a.Md,a.Dd)}};
g.matches=function(a){if(a instanceof Wg){if(!this.ga||!a.ga)return!0;if(this.tb===a.tb){var b=La(a.ga);if(b===La(this.ga)){if(1===b){var b=Ma(a.ga),c=Ma(this.ga);return c===b&&(!a.ga[b]||!this.ga[c]||a.ga[b]===this.ga[c])}return Ka(this.ga,function(b,c){return a.ga[c]===b})}}}return!1};g.Xe=function(){return null!==this.ga};function Xg(){this.za={}}g=Xg.prototype;g.e=function(){return Sa(this.za)};g.eb=function(a,b,c){var d=a.source.Hb;if(null!==d)return d=w(this.za,d),D(null!=d,"SyncTree gave us an op for an invalid query."),d.eb(a,b,c);var e=[];v(this.za,function(d){e=e.concat(d.eb(a,b,c))});return e};g.Nb=function(a,b,c,d,e){var f=a.ja(),h=w(this.za,f);if(!h){var h=c.Aa(e?d:null),k=!1;h?k=!0:(h=d instanceof O?c.rc(d):L,k=!1);h=new Pe(a,new oe(new je(h,k,!1),new je(d,e,!1)));this.za[f]=h}h.Nb(b);return Ve(h,b)};
g.kb=function(a,b,c){var d=a.ja(),e=[],f=[],h=null!=Yg(this);if("default"===d){var k=this;v(this.za,function(a,d){f=f.concat(a.kb(b,c));a.e()&&(delete k.za[d],T(a.V.m)||e.push(a.V))})}else{var m=w(this.za,d);m&&(f=f.concat(m.kb(b,c)),m.e()&&(delete this.za[d],T(m.V.m)||e.push(m.V)))}h&&null==Yg(this)&&e.push(new U(a.u,a.path));return{hg:e,Kf:f}};function Zg(a){return za(Na(a.za),function(a){return!T(a.V.m)})}g.hb=function(a){var b=null;v(this.za,function(c){b=b||c.hb(a)});return b};
function $g(a,b){if(T(b.m))return Yg(a);var c=b.ja();return w(a.za,c)}function Yg(a){return Ra(a.za,function(a){return T(a.V.m)})||null};function ah(a){this.wa=R;this.jb=new Df;this.De={};this.ic={};this.Cc=a}function bh(a,b,c,d,e){var f=a.jb,h=e;D(d>f.Bc,"Stacking an older write on top of newer ones");n(h)||(h=!0);f.la.push({path:b,Ga:c,Zc:d,visible:h});h&&(f.S=uf(f.S,b,c));f.Bc=d;return e?ch(a,new ce(fe,b,c)):[]}function dh(a,b,c,d){var e=a.jb;D(d>e.Bc,"Stacking an older merge on top of newer ones");e.la.push({path:b,children:c,Zc:d,visible:!0});e.S=vf(e.S,b,c);e.Bc=d;c=xd(c);return ch(a,new ae(fe,b,c))}
function eh(a,b,c){c=c||!1;var d=Ef(a.jb,b);if(a.jb.Ed(b)){var e=R;null!=d.Ga?e=e.set(Q,!0):fb(d.children,function(a,b){e=e.set(new E(a),b)});return ch(a,new de(d.path,e,c))}return[]}function fh(a,b,c){c=xd(c);return ch(a,new ae(ie,b,c))}function gh(a,b,c,d){d=hh(a,d);if(null!=d){var e=ih(d);d=e.path;e=e.Hb;b=P(d,b);c=new ce(new he(!1,!0,e,!0),b,c);return jh(a,d,c)}return[]}
function kh(a,b,c,d){if(d=hh(a,d)){var e=ih(d);d=e.path;e=e.Hb;b=P(d,b);c=xd(c);c=new ae(new he(!1,!0,e,!0),b,c);return jh(a,d,c)}return[]}
ah.prototype.Nb=function(a,b){var c=a.path,d=null,e=!1;Fd(this.wa,c,function(a,b){var f=P(a,c);d=d||b.hb(f);e=e||null!=Yg(b)});var f=this.wa.get(c);f?(e=e||null!=Yg(f),d=d||f.hb(Q)):(f=new Xg,this.wa=this.wa.set(c,f));var h;null!=d?h=!0:(h=!1,d=L,Jd(this.wa.subtree(c),function(a,b){var c=b.hb(Q);c&&(d=d.T(a,c))}));var k=null!=$g(f,a);if(!k&&!T(a.m)){var m=lh(a);D(!(m in this.ic),"View does not exist, but we have a tag");var l=mh++;this.ic[m]=l;this.De["_"+l]=m}h=f.Nb(a,b,new If(c,this.jb),d,h);k||
e||(f=$g(f,a),h=h.concat(nh(this,a,f)));return h};
ah.prototype.kb=function(a,b,c){var d=a.path,e=this.wa.get(d),f=[];if(e&&("default"===a.ja()||null!=$g(e,a))){f=e.kb(a,b,c);e.e()&&(this.wa=this.wa.remove(d));e=f.hg;f=f.Kf;b=-1!==Ea(e,function(a){return T(a.m)});var h=Dd(this.wa,d,function(a,b){return null!=Yg(b)});if(b&&!h&&(d=this.wa.subtree(d),!d.e()))for(var d=oh(d),k=0;k<d.length;++k){var m=d[k],l=m.V,m=ph(this,m);this.Cc.Ae(qh(l),rh(this,l),m.ld,m.G)}if(!h&&0<e.length&&!c)if(b)this.Cc.Od(qh(a),null);else{var u=this;ya(e,function(a){a.ja();
var b=u.ic[lh(a)];u.Cc.Od(qh(a),b)})}sh(this,e)}return f};ah.prototype.Aa=function(a,b){var c=this.jb,d=Dd(this.wa,a,function(b,c){var d=P(b,a);if(d=c.hb(d))return d});return c.Aa(a,d,b,!0)};function oh(a){return Bd(a,function(a,c,d){if(c&&null!=Yg(c))return[Yg(c)];var e=[];c&&(e=Zg(c));v(d,function(a){e=e.concat(a)});return e})}function sh(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!T(d.m)){var d=lh(d),e=a.ic[d];delete a.ic[d];delete a.De["_"+e]}}}
function qh(a){return T(a.m)&&!qf(a.m)?a.wb():a}function nh(a,b,c){var d=b.path,e=rh(a,b);c=ph(a,c);b=a.Cc.Ae(qh(b),e,c.ld,c.G);d=a.wa.subtree(d);if(e)D(null==Yg(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Bd(d,function(a,b,c){if(!a.e()&&b&&null!=Yg(b))return[Te(Yg(b))];var d=[];b&&(d=d.concat(Aa(Zg(b),function(a){return a.V})));v(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Cc.Od(qh(c),rh(a,c));return b}
function ph(a,b){var c=b.V,d=rh(a,c);return{ld:function(){return(b.w()||L).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=hh(a,d)){var h=ih(b);b=h.path;h=h.Hb;f=P(b,f);f=new Zd(new he(!1,!0,h,!0),f);b=jh(a,b,f)}else b=[]}else b=ch(a,new Zd(ie,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.kb(c,null,f)}}}function lh(a){return a.path.toString()+"$"+a.ja()}function ih(a){var b=a.indexOf("$");D(-1!==b&&b<a.length-1,"Bad queryKey.");return{Hb:a.substr(b+1),path:new E(a.substr(0,b))}}function hh(a,b){var c=a.De,d="_"+b;return d in c?c[d]:void 0}function rh(a,b){var c=lh(b);return w(a.ic,c)}var mh=1;
function jh(a,b,c){var d=a.wa.get(b);D(d,"Missing sync point for query tag that we're tracking");return d.eb(c,new If(b,a.jb),null)}function ch(a,b){return th(a,b,a.wa,null,new If(Q,a.jb))}function th(a,b,c,d,e){if(b.path.e())return uh(a,b,c,d,e);var f=c.get(Q);null==d&&null!=f&&(d=f.hb(Q));var h=[],k=K(b.path),m=b.Mc(k);if((c=c.children.get(k))&&m)var l=d?d.Q(k):null,k=e.n(k),h=h.concat(th(a,m,c,l,k));f&&(h=h.concat(f.eb(b,e,d)));return h}
function uh(a,b,c,d,e){var f=c.get(Q);null==d&&null!=f&&(d=f.hb(Q));var h=[];c.children.ha(function(c,f){var l=d?d.Q(c):null,u=e.n(c),z=b.Mc(c);z&&(h=h.concat(uh(a,z,f,l,u)))});f&&(h=h.concat(f.eb(b,e,d)));return h};function Qg(a,b,c){this.app=c;var d=new Bf(c);this.L=a;this.Va=Pf(a);this.Vc=null;this.ca=new Ye;this.vd=1;this.Ra=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.va=new Rf(this.L,q(this.Gb,this),d),setTimeout(q(this.Jc,this,!0),0);else{b=c.options.databaseAuthVariableOverride;if("undefined"!==da(b)&&null!==b){if("object"!==da(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
try{x(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.va=this.Ra=new Ag(this.L,q(this.Gb,this),q(this.Jc,this),q(this.ue,this),d,b)}var f=this;Cf(d,function(a){f.va.kf(a)});this.og=Qf(a,q(function(){return new Jf(this.Va,this.va)},this));this.mc=new Tc;this.ie=new Af;this.pd=new ah({Ae:function(a,b,c,d){b=[];c=f.ie.j(a.path);c.e()||(b=ch(f.pd,new ce(ie,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:ba});vh(this,"connected",!1);this.ia=new Gb;this.Ya=new Pg(this);this.fd=
0;this.je=null;this.K=new ah({Ae:function(a,b,c,d){f.va.$e(a,c,b,function(b,c){var e=d(b,c);cf(f.ca,a.path,e)});return[]},Od:function(a,b){f.va.uf(a,b)}})}g=Qg.prototype;g.toString=function(){return(this.L.Sc?"https://":"http://")+this.L.host};g.name=function(){return this.L.pe};function wh(a){a=a.ie.j(new E(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function xh(a){a=a={timestamp:wh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
g.Gb=function(a,b,c,d){this.fd++;var e=new E(a);b=this.je?this.je(a,b):b;a=[];d?c?(b=Ja(b,function(a){return G(a)}),a=kh(this.K,e,b,d)):(b=G(b),a=gh(this.K,e,b,d)):c?(d=Ja(b,function(a){return G(a)}),a=fh(this.K,e,d)):(d=G(b),a=ch(this.K,new ce(ie,e,d)));d=e;0<a.length&&(d=yh(this,e));cf(this.ca,d,a)};g.Jc=function(a){vh(this,"connected",a);!1===a&&zh(this)};g.ue=function(a){var b=this;cc(a,function(a,d){vh(b,d,a)})};
function vh(a,b,c){b=new E("/.info/"+b);c=G(c);var d=a.ie;d.Jd=d.Jd.F(b,c);c=ch(a.pd,new ce(ie,b,c));cf(a.ca,b,c)}g.Jb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,ug:c});var e=xh(this);b=G(b,c);var e=Jb(b,e),f=this.vd++,e=bh(this.K,a,e,f,!0);Ze(this.ca,e);var h=this;this.va.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||J("set at "+a+" failed: "+b);e=eh(h.K,f,!e);cf(h.ca,a,e);Ah(d,b,c)});e=Bh(this,a);yh(this,e);cf(this.ca,e,[])};
g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=xh(this),f={};v(b,function(a,b){d=!1;var c=G(a);f[b]=Jb(c,e)});if(d)I("update() called with empty data.  Don't do anything."),Ah(c,"ok");else{var h=this.vd++,k=dh(this.K,a,f,h);Ze(this.ca,k);var m=this;this.va.af(a.toString(),b,function(b,d){var e="ok"===b;e||J("update at "+a+" failed: "+b);var e=eh(m.K,h,!e),f=a;0<e.length&&(f=yh(m,a));cf(m.ca,f,e);Ah(c,b,d)});v(b,function(b,c){var d=Bh(m,a.n(c));yh(m,d)});cf(this.ca,
a,[])}};function zh(a){a.f("onDisconnectEvents");var b=xh(a),c=[];Hb(Fb(a.ia,b),Q,function(b,e){c=c.concat(ch(a.K,new ce(ie,b,e)));var f=Bh(a,b);yh(a,f)});a.ia=new Gb;cf(a.ca,Q,c)}g.xd=function(a,b){var c=this;this.va.xd(a.toString(),function(d,e){"ok"===d&&Yd(c.ia,a);Ah(b,d,e)})};function Ch(a,b,c,d){var e=G(c);a.va.re(b.toString(),e.H(!0),function(c,h){"ok"===c&&Ib(a.ia,b,e);Ah(d,c,h)})}
function Dh(a,b,c,d,e){var f=G(c,d);a.va.re(b.toString(),f.H(!0),function(c,d){"ok"===c&&Ib(a.ia,b,f);Ah(e,c,d)})}function Eh(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(I("onDisconnect().update() called with empty data.  Don't do anything."),Ah(d,"ok")):a.va.cf(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=G(c[m]);Ib(a.ia,b.n(m),l)}Ah(d,e,f)})}function Fh(a,b,c){c=".info"===K(b.path)?a.pd.Nb(b,c):a.K.Nb(b,c);af(a.ca,b.path,c)}g.ab=function(){this.Ra&&this.Ra.ab("repo_interrupt")};
g.kc=function(){this.Ra&&this.Ra.kc("repo_interrupt")};g.Be=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new Kf(this.Va)),a=this.Vc.get()):a=this.Va.get();var b=Ba(Oa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ce=function(a){Mf(this.Va,a);this.og.rf[a]=!0};g.f=function(a){var b="";this.Ra&&(b=this.Ra.id+":");I(b,arguments)};
function Ah(a,b,c){a&&fc(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Gh(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.gc("value",f);c={path:b,update:c,G:d,status:null,ef:Lb(),He:e,of:0,Rd:function(){h.Ic("value",f)},Td:null,Ba:null,cd:null,dd:null,ed:null};d=a.K.Aa(b,void 0)||L;c.cd=d;d=c.update(d.H());if(n(d)){Pd("transaction failed: Data returned ",d,c.path);c.status=1;e=Uc(a.mc,b);var k=e.Ca()||[];k.push(c);Vc(e,k);"object"===typeof d&&null!==d&&eb(d,".priority")?(k=w(d,".priority"),D(Nd(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.K.Aa(b)||L).C().H();e=xh(a);d=G(d,k);e=Jb(d,e);c.dd=d;c.ed=e;c.Ba=a.vd++;c=bh(a.K,b,e,c.Ba,c.He);cf(a.ca,b,c);Hh(a)}else c.Rd(),c.dd=null,c.ed=null,c.G&&(a=new V(c.cd,new U(a,c.path),H),c.G(null,!1,a))}function Hh(a,b){var c=b||a.mc;b||Ih(a,c);if(null!==c.Ca()){var d=Jh(a,c);D(0<d.length,"Sending zero length transaction queue");Ca(d,function(a){return 1===a.status})&&Kh(a,c.path(),d)}else c.kd()&&c.O(function(b){Hh(a,b)})}
function Kh(a,b,c){for(var d=Aa(c,function(a){return a.Ba}),e=a.K.Aa(b,d)||L,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];D(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.of++;var k=P(b,h.path),d=d.F(k,h.dd)}d=d.H(!0);a.va.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(eh(a.K,c[f].Ba));if(c[f].G){var h=c[f].ed,k=new U(a,c[f].path);d.push(q(c[f].G,
null,null,!0,new V(h,k,H)))}c[f].Rd()}Ih(a,Uc(a.mc,b));Hh(a);cf(a.ca,b,e);for(f=0;f<d.length;f++)fc(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(J("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;yh(a,b)}},e)}function yh(a,b){var c=Lh(a,b),d=c.path(),c=Jh(a,c);Mh(a,c,d);return d}
function Mh(a,b,c){if(0!==b.length){for(var d=[],e=[],f=za(b,function(a){return 1===a.status}),f=Aa(f,function(a){return a.Ba}),h=0;h<b.length;h++){var k=b[h],m=P(c,k.path),l=!1,u;D(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,u=k.Td,e=e.concat(eh(a.K,k.Ba,!0));else if(1===k.status)if(25<=k.of)l=!0,u="maxretry",e=e.concat(eh(a.K,k.Ba,!0));else{var z=a.K.Aa(k.path,f)||L;k.cd=z;var F=b[h].update(z.H());n(F)?(Pd("transaction failed: Data returned ",F,
k.path),m=G(F),"object"===typeof F&&null!=F&&eb(F,".priority")||(m=m.fa(z.C())),z=k.Ba,F=xh(a),F=Jb(m,F),k.dd=m,k.ed=F,k.Ba=a.vd++,Fa(f,z),e=e.concat(bh(a.K,k.path,F,k.Ba,k.He)),e=e.concat(eh(a.K,z,!0))):(l=!0,u="nodata",e=e.concat(eh(a.K,k.Ba,!0)))}cf(a.ca,c,e);e=[];l&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new U(a,b[h].path),d.push(q(b[h].G,null,null,!1,new V(b[h].cd,k,H)))):d.push(q(b[h].G,null,Error(u),!1,null))))}Ih(a,a.mc);for(h=0;h<d.length;h++)fc(d[h]);Hh(a)}}
function Lh(a,b){for(var c,d=a.mc;null!==(c=K(b))&&null===d.Ca();)d=Uc(d,c),b=N(b);return d}function Jh(a,b){var c=[];Nh(a,b,c);c.sort(function(a,b){return a.ef-b.ef});return c}function Nh(a,b,c){var d=b.Ca();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.O(function(b){Nh(a,b,c)})}function Ih(a,b){var c=b.Ca();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Vc(b,0<c.length?c:null)}b.O(function(b){Ih(a,b)})}
function Bh(a,b){var c=Lh(a,b).path(),d=Uc(a.mc,b);Yc(d,function(b){Oh(a,b)});Oh(a,d);Xc(d,function(b){Oh(a,b)});return c}
function Oh(a,b){var c=b.Ca();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(D(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(D(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(eh(a.K,c[h].Ba,!0)),c[h].G&&d.push(q(c[h].G,null,Error("set"),!1,null))));-1===f?Vc(b,null):c.length=f+1;cf(a.ca,b.path(),e);for(h=0;h<d.length;h++)fc(d[h])}};function Ug(){this.lb={};this.wf=!1}Ug.prototype.ab=function(){for(var a in this.lb)this.lb[a].ab()};Ug.prototype.kc=function(){for(var a in this.lb)this.lb[a].kc()};Ug.prototype.ce=function(a){this.wf=a};ca(Ug);Ug.prototype.interrupt=Ug.prototype.ab;Ug.prototype.resume=Ug.prototype.kc;var W={};W.nc=Ag;W.DataConnection=W.nc;Ag.prototype.ng=function(a,b){this.ua("q",{p:a},b)};W.nc.prototype.simpleListen=W.nc.prototype.ng;Ag.prototype.Hf=function(a,b){this.ua("echo",{d:a},b)};W.nc.prototype.echo=W.nc.prototype.Hf;Ag.prototype.interrupt=Ag.prototype.ab;W.zf=og;W.RealTimeConnection=W.zf;og.prototype.sendRequest=og.prototype.ua;og.prototype.close=og.prototype.close;
W.Rf=function(a){var b=Ag.prototype.put;Ag.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Ag.prototype.put=b}};W.hijackHash=W.Rf;W.yf=zb;W.ConnectionTarget=W.yf;W.ja=function(a){return a.ja()};W.queryIdentifier=W.ja;W.Uf=function(a){return a.u.Ra.$};W.listens=W.Uf;W.ce=function(a){Ug.Vb().ce(a)};W.forceRestClient=W.ce;W.Context=Ug;function Ph(a,b){this.committed=a;this.snapshot=b};function X(a,b,c,d){this.u=a;this.path=b;this.m=c;this.Nc=d}
function Qh(a){var b=null,c=null;a.ka&&(b=ff(a));a.na&&(c=hf(a));if(a.g===tc){if(a.ka){if("[MIN_NAME]"!=ef(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.na){if("[MAX_NAME]"!=gf(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===H){if(null!=b&&!Nd(b)||null!=c&&!Nd(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(D(a.g instanceof pc||a.g===wc,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function Rh(a){if(a.ka&&a.na&&a.xa&&(!a.xa||""===a.mb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function Sh(a,b){if(!0===a.Nc)throw Error(b+": You can't combine multiple orderBy calls.");}g=X.prototype;g.wb=function(){y("Query.ref",0,0,arguments.length);return new U(this.u,this.path)};
g.gc=function(a,b,c,d){y("Query.on",2,4,arguments.length);Td("Query.on",a,!1);B("Query.on",2,b,!1);var e=Th("Query.on",c,d);if("value"===a)Fh(this.u,this,new Vg(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;Fh(this.u,this,new Wg(f,e.cancel,e.Ma))}return b};
g.Ic=function(a,b,c){y("Query.off",0,3,arguments.length);Td("Query.off",a,!0);B("Query.off",2,b,!0);ob("Query.off",3,c);var d=null,e=null;"value"===a?d=new Vg(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new Wg(e,null,c||null));e=this.u;d=".info"===K(this.path)?e.pd.kb(this,d):e.K.kb(this,d);af(e.ca,this.path,d)};
g.$f=function(a,b){function c(k){f&&(f=!1,e.Ic(a,c),b&&b.call(d.Ma,k),h.resolve(k))}y("Query.once",1,4,arguments.length);Td("Query.once",a,!1);B("Query.once",2,b,!0);var d=Th("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new ib;kb(h.ra);this.gc(a,c,function(b){e.Ic(a,c);d.cancel&&d.cancel.call(d.Ma,b);h.reject(b)});return h.ra};
g.ne=function(a){y("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.m.xa)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.m.ne(a),this.Nc)};
g.oe=function(a){y("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.m.xa)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.m.oe(a),this.Nc)};
g.ag=function(a){y("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Vd("Query.orderByChild",a);Sh(this,"Query.orderByChild");var b=new E(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
b=new pc(b);b=of(this.m,b);Qh(b);return new X(this.u,this.path,b,!0)};g.bg=function(){y("Query.orderByKey",0,0,arguments.length);Sh(this,"Query.orderByKey");var a=of(this.m,tc);Qh(a);return new X(this.u,this.path,a,!0)};g.cg=function(){y("Query.orderByPriority",0,0,arguments.length);Sh(this,"Query.orderByPriority");var a=of(this.m,H);Qh(a);return new X(this.u,this.path,a,!0)};
g.dg=function(){y("Query.orderByValue",0,0,arguments.length);Sh(this,"Query.orderByValue");var a=of(this.m,wc);Qh(a);return new X(this.u,this.path,a,!0)};g.Nd=function(a,b){y("Query.startAt",0,2,arguments.length);Od("Query.startAt",a,this.path,!0);Ud("Query.startAt",b);var c=this.m.Nd(a,b);Rh(c);Qh(c);if(this.m.ka)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new X(this.u,this.path,c,this.Nc)};
g.gd=function(a,b){y("Query.endAt",0,2,arguments.length);Od("Query.endAt",a,this.path,!0);Ud("Query.endAt",b);var c=this.m.gd(a,b);Rh(c);Qh(c);if(this.m.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new X(this.u,this.path,c,this.Nc)};
g.If=function(a,b){y("Query.equalTo",1,2,arguments.length);Od("Query.equalTo",a,this.path,!1);Ud("Query.equalTo",b);if(this.m.ka)throw Error("Query.equalTo: Starting point was already set (by another call to startAt or equalTo).");if(this.m.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).gd(a,b)};
g.toString=function(){y("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Y;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.u.toString()+(b||"/")};g.toJSON=function(){y("Query.toJSON",0,1,arguments.length);return this.toString()};g.ja=function(){var a=ac(pf(this.m));return"{}"===a?"default":a};
g.isEqual=function(a){y("Query.isEqual",1,1,arguments.length);if(!(a instanceof X))throw Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");var b=this.u===a.u,c=this.path.Z(a.path),d=this.ja()===a.ja();return b&&c&&d};
function Th(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,B(a,3,d.cancel,!0),d.Ma=c,ob(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(A(a,3,!0)+" must either be a cancel callback or a context object.");return d}X.prototype.on=X.prototype.gc;X.prototype.off=X.prototype.Ic;X.prototype.once=X.prototype.$f;X.prototype.limitToFirst=X.prototype.ne;X.prototype.limitToLast=X.prototype.oe;X.prototype.orderByChild=X.prototype.ag;
X.prototype.orderByKey=X.prototype.bg;X.prototype.orderByPriority=X.prototype.cg;X.prototype.orderByValue=X.prototype.dg;X.prototype.startAt=X.prototype.Nd;X.prototype.endAt=X.prototype.gd;X.prototype.equalTo=X.prototype.If;X.prototype.toString=X.prototype.toString;X.prototype.isEqual=X.prototype.isEqual;gc(X.prototype,"ref",X.prototype.wb);function Y(a,b){this.ta=a;this.qa=b}Y.prototype.cancel=function(a){y("Firebase.onDisconnect().cancel",0,1,arguments.length);B("Firebase.onDisconnect().cancel",1,a,!0);var b=new ib;this.ta.xd(this.qa,jb(b,a));return b.ra};Y.prototype.cancel=Y.prototype.cancel;Y.prototype.remove=function(a){y("Firebase.onDisconnect().remove",0,1,arguments.length);Wd("Firebase.onDisconnect().remove",this.qa);B("Firebase.onDisconnect().remove",1,a,!0);var b=new ib;Ch(this.ta,this.qa,null,jb(b,a));return b.ra};
Y.prototype.remove=Y.prototype.remove;Y.prototype.set=function(a,b){y("Firebase.onDisconnect().set",1,2,arguments.length);Wd("Firebase.onDisconnect().set",this.qa);Od("Firebase.onDisconnect().set",a,this.qa,!1);B("Firebase.onDisconnect().set",2,b,!0);var c=new ib;Ch(this.ta,this.qa,a,jb(c,b));return c.ra};Y.prototype.set=Y.prototype.set;
Y.prototype.Jb=function(a,b,c){y("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);Wd("Firebase.onDisconnect().setWithPriority",this.qa);Od("Firebase.onDisconnect().setWithPriority",a,this.qa,!1);Sd("Firebase.onDisconnect().setWithPriority",2,b);B("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new ib;Dh(this.ta,this.qa,a,b,jb(d,c));return d.ra};Y.prototype.setWithPriority=Y.prototype.Jb;
Y.prototype.update=function(a,b){y("Firebase.onDisconnect().update",1,2,arguments.length);Wd("Firebase.onDisconnect().update",this.qa);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;J("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Rd("Firebase.onDisconnect().update",a,this.qa);B("Firebase.onDisconnect().update",2,b,!0);
c=new ib;Eh(this.ta,this.qa,a,jb(c,b));return c.ra};Y.prototype.update=Y.prototype.update;var Z={Mf:function(){dg=Zf=!0}};Z.forceLongPolling=Z.Mf;Z.Nf=function(){eg=!0};Z.forceWebSockets=Z.Nf;Z.Tf=function(){return Yf.isAvailable()};Z.isWebSocketsAvailable=Z.Tf;Z.lg=function(a,b){a.u.Ra.ze=b};Z.setSecurityDebugCallback=Z.lg;Z.Be=function(a,b){a.u.Be(b)};Z.stats=Z.Be;Z.Ce=function(a,b){a.u.Ce(b)};Z.statsIncrementCounter=Z.Ce;Z.fd=function(a){return a.u.fd};Z.dataUpdateCount=Z.fd;Z.Sf=function(a,b){a.u.je=b};Z.interceptServerData=Z.Sf;function U(a,b){if(!(a instanceof Qg))throw Error("new Firebase() no longer supported - use app.database().");X.call(this,a,b,mf,!1);this.then=void 0;this["catch"]=void 0}la(U,X);g=U.prototype;g.getKey=function(){y("Firebase.key",0,0,arguments.length);return this.path.e()?null:Oc(this.path)};
g.n=function(a){y("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof E))if(null===K(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Vd("Firebase.child",b)}else Vd("Firebase.child",a);return new U(this.u,this.path.n(a))};g.getParent=function(){y("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.u,a)};
g.Of=function(){y("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Gf=function(){return this.u.Ya};g.set=function(a,b){y("Firebase.set",1,2,arguments.length);Wd("Firebase.set",this.path);Od("Firebase.set",a,this.path,!1);B("Firebase.set",2,b,!0);var c=new ib;this.u.Jb(this.path,a,null,jb(c,b));return c.ra};
g.update=function(a,b){y("Firebase.update",1,2,arguments.length);Wd("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;J("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Rd("Firebase.update",a,this.path);B("Firebase.update",2,b,!0);c=new ib;this.u.update(this.path,a,jb(c,b));return c.ra};
g.Jb=function(a,b,c){y("Firebase.setWithPriority",2,3,arguments.length);Wd("Firebase.setWithPriority",this.path);Od("Firebase.setWithPriority",a,this.path,!1);Sd("Firebase.setWithPriority",2,b);B("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new ib;this.u.Jb(this.path,a,b,jb(d,c));return d.ra};
g.remove=function(a){y("Firebase.remove",0,1,arguments.length);Wd("Firebase.remove",this.path);B("Firebase.remove",1,a,!0);return this.set(null,a)};
g.transaction=function(a,b,c){y("Firebase.transaction",1,3,arguments.length);Wd("Firebase.transaction",this.path);B("Firebase.transaction",1,a,!1);B("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(A("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new ib;ha(b)&&kb(d.ra);Gh(this.u,this.path,a,function(a,c,h){a?
d.reject(a):d.resolve(new Ph(c,h));ha(b)&&b(a,c,h)},c);return d.ra};g.kg=function(a,b){y("Firebase.setPriority",1,2,arguments.length);Wd("Firebase.setPriority",this.path);Sd("Firebase.setPriority",1,a);B("Firebase.setPriority",2,b,!0);var c=new ib;this.u.Jb(this.path.n(".priority"),a,null,jb(c,b));return c.ra};
g.push=function(a,b){y("Firebase.push",0,2,arguments.length);Wd("Firebase.push",this.path);Od("Firebase.push",a,this.path,!0);B("Firebase.push",2,b,!0);var c=wh(this.u),d=Kc(c),c=this.n(d),e=this.n(d),d=null!=a?c.set(a,b).then(function(){return e}):hb.resolve(e);c.then=q(d.then,d);c["catch"]=q(d.then,d,void 0);ha(b)&&kb(d);return c};g.ib=function(){Wd("Firebase.onDisconnect",this.path);return new Y(this.u,this.path)};U.prototype.child=U.prototype.n;U.prototype.set=U.prototype.set;
U.prototype.update=U.prototype.update;U.prototype.setWithPriority=U.prototype.Jb;U.prototype.remove=U.prototype.remove;U.prototype.transaction=U.prototype.transaction;U.prototype.setPriority=U.prototype.kg;U.prototype.push=U.prototype.push;U.prototype.onDisconnect=U.prototype.ib;gc(U.prototype,"database",U.prototype.Gf);gc(U.prototype,"key",U.prototype.getKey);gc(U.prototype,"parent",U.prototype.getParent);gc(U.prototype,"root",U.prototype.Of);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
try{firebase.INTERNAL.registerService("database",function(a){var b=Ug.Vb(),c=a.options.databaseURL;n(c)||Vb("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=Wb(c),c=d.jc;Xd("Invalid Firebase Database URL",d);d.path.e()||Vb("Database URL must point to the root of a Firebase Database (not including a child path).");(d=w(b.lb,a.name))&&Vb("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new Qg(c,b.wf,a);b.lb[a.name]=
d;return d.Ya},{Reference:U,Query:X,Database:Pg,enableLogging:Sb,INTERNAL:Z,TEST_ACCESS:W,ServerValue:Sg})}catch(Uh){Vb("Failed to register the Firebase Database Service ("+Uh+")")};
            module.exports = firebase.database;
          })();
          //# sourceMappingURL=database.js.map
          


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map