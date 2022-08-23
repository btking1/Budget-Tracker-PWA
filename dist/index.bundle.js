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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let transactions = [];\r\nlet myChart;\r\n\r\n\r\nfetch(\"/api/transaction\")\r\n  .then(response => {\r\n    return response.json();\r\n  })\r\n  .then(data => {\r\n    // save db data on global variable\r\n    transactions = data;\r\n\r\n    populateTotal();\r\n    populateTable();\r\n    populateChart();\r\n  });\r\n\r\nfunction populateTotal() {\r\n  // reduce transaction amounts to a single total value\r\n  let total = transactions.reduce((total, t) => {\r\n    return total + parseInt(t.value);\r\n  }, 0);\r\n\r\n  let totalEl = document.querySelector(\"#total\");\r\n  totalEl.textContent = total;\r\n}\r\n\r\nfunction populateTable() {\r\n  let tbody = document.querySelector(\"#tbody\");\r\n  tbody.innerHTML = \"\";\r\n\r\n  transactions.forEach(transaction => {\r\n    // create and populate a table row\r\n    let tr = document.createElement(\"tr\");\r\n    tr.innerHTML = `\r\n      <td>${transaction.name}</td>\r\n      <td>${transaction.value}</td>\r\n    `;\r\n\r\n    tbody.appendChild(tr);\r\n  });\r\n}\r\n\r\nfunction populateChart() {\r\n  // copy array and reverse it\r\n  let reversed = transactions.slice().reverse();\r\n  let sum = 0;\r\n\r\n  // create date labels for chart\r\n  let labels = reversed.map(t => {\r\n    let date = new Date(t.date);\r\n    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;\r\n  });\r\n\r\n  // create incremental values for chart\r\n  let data = reversed.map(t => {\r\n    sum += parseInt(t.value);\r\n    return sum;\r\n  });\r\n\r\n  // remove old chart if it exists\r\n  if (myChart) {\r\n    myChart.destroy();\r\n  }\r\n\r\n  let ctx = document.getElementById(\"myChart\").getContext(\"2d\");\r\n\r\n  myChart = new Chart(ctx, {\r\n    type: 'line',\r\n      data: {\r\n        labels,\r\n        datasets: [{\r\n            label: \"Total Over Time\",\r\n            fill: true,\r\n            backgroundColor: \"#6666ff\",\r\n            data\r\n        }]\r\n    }\r\n  });\r\n}\r\n\r\nfunction sendTransaction(isAdding) {\r\n  let nameEl = document.querySelector(\"#t-name\");\r\n  let amountEl = document.querySelector(\"#t-amount\");\r\n  let errorEl = document.querySelector(\".form .error\");\r\n\r\n  // validate form\r\n  if (nameEl.value === \"\" || amountEl.value === \"\") {\r\n    errorEl.textContent = \"Missing Information\";\r\n    return;\r\n  }\r\n  else {\r\n    errorEl.textContent = \"\";\r\n  }\r\n\r\n  // create record\r\n  let transaction = {\r\n    name: nameEl.value,\r\n    value: amountEl.value,\r\n    date: new Date().toISOString()\r\n  };\r\n\r\n  // if subtracting funds, convert amount to negative number\r\n  if (!isAdding) {\r\n    transaction.value *= -1;\r\n  }\r\n\r\n  // add to beginning of current array of data\r\n  transactions.unshift(transaction);\r\n\r\n  // re-run logic to populate ui with new record\r\n  populateChart();\r\n  populateTable();\r\n  populateTotal();\r\n  \r\n  // also send to server\r\n  fetch(\"/api/transaction\", {\r\n    method: \"POST\",\r\n    body: JSON.stringify(transaction),\r\n    headers: {\r\n      Accept: \"application/json, text/plain, */*\",\r\n      \"Content-Type\": \"application/json\"\r\n    }\r\n  })\r\n  .then(response => {    \r\n    return response.json();\r\n  })\r\n  .then(data => {\r\n    if (data.errors) {\r\n      errorEl.textContent = \"Missing Information\";\r\n    }\r\n    else {\r\n      // clear form\r\n      nameEl.value = \"\";\r\n      amountEl.value = \"\";\r\n    }\r\n  })\r\n  .catch(err => {\r\n    // fetch failed, so save in indexed db\r\n    saveRecord(transaction);\r\n    console.log(err)\r\n\r\n    // clear form\r\n    nameEl.value = \"\";\r\n    amountEl.value = \"\";\r\n  });\r\n}\r\n\r\ndocument.querySelector(\"#add-btn\").onclick = function() {\r\n  sendTransaction(true);\r\n};\r\n\r\ndocument.querySelector(\"#sub-btn\").onclick = function() {\r\n  sendTransaction(false);\r\n};\r\n\n\n//# sourceURL=webpack:///./public/js/index.js?");

/***/ })

/******/ });