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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/idb.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/idb.js":
/*!**************************!*\
  !*** ./public/js/idb.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let db\r\n\r\nconst request = indexedDB.open('budget', 1)\r\n\r\nrequest.onupgradeneeded = function (event) {\r\n    const db = event.target.result\r\n    db.createObjectStore('transaction', { autoIncrement: true })\r\n}\r\n\r\nrequest.onsuccess = function (event) {\r\n    db = event.target.result\r\n\r\n    if (navigator.onLine) {\r\n        uploadTransaction()\r\n    }\r\n}\r\n\r\nrequest.onerror = function (event) {\r\n    console.log('IndexedDB Error' + event.target.errorCode)\r\n}\r\n\r\nfunction saveRecord(record) {\r\n    const transaction = db.transaction(['transaction'], 'readwrite')\r\n\r\n    const transactionObjectStore = transaction.objectStore('transaction')\r\n\r\n    transactionObjectStore.add(record)\r\n}\r\n\r\nfunction uploadTransaction() {\r\n    const transaction = db.transaction(['transaction'], 'readwrite')\r\n\r\n    const transactionObjectStore = transaction.objectStore('transaction')\r\n\r\n    const getAll = transactionObjectStore.getAll()\r\n\r\n    getAll.onsuccess = function () {\r\n        // if there was data in indexedDb's store, let's send it to the api server\r\n        if (getAll.result.length > 0) {\r\n            fetch('/api/transaction/bulk', {\r\n                method: 'POST',\r\n                body: JSON.stringify(getAll.result),\r\n                headers: {\r\n                    Accept: 'application/json, text/plain, */*',\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            })\r\n                .then((response) => response.json())\r\n                .then((serverResponse) => {\r\n                    if (serverResponse.message) {\r\n                        throw new Error(serverResponse)\r\n                    }\r\n                    // open one more transaction\r\n                    const transaction = db.transaction(\r\n                        ['transaction'],\r\n                        'readwrite'\r\n                    )\r\n                    // access the new_pizza object store\r\n                    const transactionObjectStore =\r\n                        transaction.objectStore('transaction')\r\n                    // clear all items in your store\r\n                    transactionObjectStore.clear()\r\n\r\n                    alert('All saved transactions have been submitted!')\r\n                })\r\n                .catch((err) => {\r\n                    console.log(err)\r\n                })\r\n        }\r\n    }\r\n}\r\n\r\nwindow.addEventListener('online', uploadTransaction)\r\n\n\n//# sourceURL=webpack:///./public/js/idb.js?");

/***/ })

/******/ });