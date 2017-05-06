(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxCableCar"] = factory();
	else
		root["ReduxCableCar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});exports.connect=connect;exports.






disconnect=disconnect;exports.






subscribe=subscribe;exports.






unsubscribe=unsubscribe;exports.






send=send;function connect(ActionCable,url){return{type:'CABLE_CONNECT',cable:{ActionCable:ActionCable,url:url}};}function disconnect(){return{type:'CABLE_DISCONNECT',cable:{}};}function subscribe(channel,params){return{type:'CABLE_SUBSCRIBE',cable:{channel:channel,params:params}};}function unsubscribe(channel,params){return{type:'CABLE_UNSUBSCRIBE',cable:{channel:channel,params:params}};}function send(channel,params,payload){
return{
type:'CABLE_SEND',
cable:{channel:channel,params:params},
payload:payload};

}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});var _cableCar=__webpack_require__(2);var _cableCar2=_interopRequireDefault(_cableCar);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var car=void 0;

var middleware=function middleware(store){return function(next){return function(action){

switch(action.type){
case'CABLE_CONNECT':var _action$cable=
action.cable,ActionCable=_action$cable.ActionCable,url=_action$cable.url;
new _cableCar2.default(ActionCable,url,store);
break;
case'CABLE_SUBSCRIBE':
car.subscribe(action.cable.channel,action.cable.params);
break;
case'CABLE_UNSUBSCRIBE':
car.unsubscribe(action.cable.channel,action.cable.params);
break;
case'CABLE_DISCONNECT':
car.disconnect();
car=null;
break;
case'CABLE_SEND':
car.send(action.cable.channel,action.cable.params,action.payload);
default:
break;}


var newState=next(action);

switch(action.type){
case'CABLE_CONNECTED':
car=action.cable.car;
break;
default:
break;}


return newState;
};};};

middleware.connect=function(url,store){return new _cableCar2.default(url,store);};exports.default=

middleware;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var CableCar=function(){

function CableCar(ActionCable,url,store){_classCallCheck(this,CableCar);
this.store=store;
this.consumer=ActionCable.createConsumer(url);
this.store.dispatch({type:'CABLE_CONNECTED',cable:{car:this}});
}_createClass(CableCar,[{key:'dispatch',value:function dispatch(

type,cable){var payload=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};
var action={
type:'CABLE_'+type,
cable:cable,
payload:payload};

this.store.dispatch(action);
}},{key:'subscribe',value:function subscribe(

channel,params){var _this=this;
var options=_extends({channel:channel},params);
var prefix=channel.toUpperCase();
this.subscription=this.consumer.subscriptions.create(options,{
initialized:function initialized(){return _this.dispatch(prefix+'_INITIALIZED',options);},
connected:function connected(){return _this.dispatch(prefix+'_CONNECTED',options);},
disconnected:function disconnected(){return _this.dispatch(prefix+'_DISCONNECTED',options);},
received:function received(data){return _this.dispatch(prefix+'_RECEIVED',options,data);},
rejected:function rejected(){
_this.dispatch(prefix+'_REJECTED',options);
throw new Error('ActionCable: Attempt to subscribe was rejected. ('+JSON.stringify(options)+')');
}});

}},{key:'send',value:function send(

channel,params,payload){
var options=_extends({channel:channel},params);
var identifier=JSON.stringify(options);
var subscriptions=this.consumer.subscriptions.findAll(identifier);
subscriptions.map(function(item){return item.send(payload);});
}},{key:'unsubscribe',value:function unsubscribe(

channel,params){
var options=_extends({channel:channel},params);
var identifier=JSON.stringify(options);
var subscriptions=this.consumer.subscriptions.findAll(identifier);
subscriptions.map(function(x){return x.unsubscribe();});
}},{key:'disconnect',value:function disconnect()

{
this.consumer.disconnect();
this.store.dispatch({type:'CABLE_DISCONNECTED'});
}}]);return CableCar;}();exports.default=


CableCar;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports,"__esModule",{value:true});exports.middleware=exports.actions=undefined;var _actions=__webpack_require__(0);var actions=_interopRequireWildcard(_actions);
var _middleware=__webpack_require__(1);var _middleware2=_interopRequireDefault(_middleware);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}exports.

actions=actions;exports.middleware=_middleware2.default;exports.default=
{actions:actions,middleware:_middleware2.default};

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map