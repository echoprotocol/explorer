module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		7: 0
/******/ 	};
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("../../../../" + ({}[chunkId]||chunkId) + "." + {"18":"81b4eb461f079ab16d89"}[chunkId] + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+xE3":
/***/ (function(module, exports) {

module.exports = require("echojs-ping");

/***/ }),

/***/ "/T1H":
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

/***/ }),

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string


const TEST_ROUTE = /\/\[[^\/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("KI45");

exports.__esModule = true;
exports.default = withRouter;

var _extends2 = _interopRequireDefault(__webpack_require__("htGi"));

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _propTypes = _interopRequireDefault(__webpack_require__("rf6O"));

function withRouter(ComposedComponent) {
  class WithRouteWrapper extends _react.default.Component {
    constructor() {
      super(...arguments);
      this.context = void 0;
    }

    render() {
      return _react.default.createElement(ComposedComponent, (0, _extends2.default)({
        router: this.context.router
      }, this.props));
    }

  }

  WithRouteWrapper.displayName = void 0;
  WithRouteWrapper.getInitialProps = void 0;
  WithRouteWrapper.contextTypes = {
    router: _propTypes.default.object
  };
  WithRouteWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouteWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouteWrapper;
}

/***/ }),

/***/ "0pkP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rE0f");
/* harmony import */ var _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("tKMe");






const DEFAULT_FIELDS = new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"]({
  loading: false,
  loadingMoreHistory: false,
  id: null,
  balances: new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"]({}),
  tokens: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]([]),
  history: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]([]),
  echoAccountInfo: null,
  totalAccountHistory: 0
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'account',
  initialState: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(DEFAULT_FIELDS)), {
    update: {
      reducer: (state, {
        payload
      }) => {
        let list = state.get(payload.field);

        if (list.size >= _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* DEFAULT_ROWS_COUNT */ "c"] && !state.get('isFullHistory')) {
          list = list.slice(0, list.size - payload.value.size);
        }

        if (list.size < _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* DEFAULT_ROWS_COUNT */ "c"] && list.size + payload.value.size > _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* DEFAULT_ROWS_COUNT */ "c"]) {
          const diff = list.size + payload.value.size - _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* DEFAULT_ROWS_COUNT */ "c"];
          list = list.slice(0, list.size - diff);
          state = state.set('isFullHistory', false);
        }

        state = state.set(payload.field, payload.value.concat(list));
        return state;
      }
    },
    concat: {
      reducer: (state, {
        payload
      }) => {
        state = state.set(payload.field, state.get(payload.field).concat(payload.value));
        return state;
      }
    }
  })
}));

/***/ }),

/***/ "0xcs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rE0f");





const DEFAULT_FIELDS = Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Map"])({
  error: '',
  producers: 0,
  stepProgress: '',
  readyProducers: 0,
  preparingBlock: 0,
  latestBlock: 0,
  blockTime: 0,
  blockReward: 0
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'round',
  initialState: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(DEFAULT_FIELDS)), {
    set: {
      reducer: (state, {
        payload
      }) => {
        state = state.set(payload.field, payload.value);
        return state;
      }
    },
    increment: {
      reducer: (state, {
        payload
      }) => {
        let count = state.get(payload.field);
        state = state.set(payload.field, count += 1);
        return state;
      }
    }
  })
}));

/***/ }),

/***/ "1qHI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("qNsG");
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("moMR");
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(echojs_lib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Lc87");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Z2WM");
/* harmony import */ var _config_chain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ggud");







class URLHelper {
  /**
      *
      * @param {String} round
      * @return {String}
      */
  static createBlockUrl(round) {
    return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* BLOCK_INFORMATION_PATH */ "c"].replace(/:round/, round);
  }
  /**
   *
   * @param {String} objectId
   * @return {String}
   */


  static createObjectsUrl(objectId) {
    return `/objects?id=${objectId}`;
  }
  /**
   *
   * @return {String}
   * @param block
   * @param trNum
   * @param opNum
   */


  static createOperationObjectsUrl(block, trNum, opNum) {
    return `/objects?opId=${block}-${trNum}-${opNum}`;
  }
  /**
   *
   * @param currentUrl
   * @param op
   * @returns {string}
   */


  static createTransactionOperationUrl(currentUrl, op) {
    return `${currentUrl}?op=${op}`;
  }
  /**
   *
   * @param {String} accountId
   * @return {String}
   */


  static createAccountUrl(accountId) {
    return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* ACCOUNTS_PATH */ "a"].replace(/:id/, accountId);
  }
  /**
   *
   * @param {String} accountName
   * @return {String}
   */


  static createAccountUrlByName(accountName) {
    return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* ACCOUNTS_PATH */ "a"].replace(/:id/, accountName);
  }
  /**
      *
      * @param {String} assetId
      * @return {String}
      */


  static createAssetUrl(assetId) {
    return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* ASSET_PATH */ "b"].replace(/:id/, assetId);
  }
  /**
   * @param contractId
   * @param detail
   * @returns {string}
   */


  static createContractUrl(contractId, detail = '') {
    return `${_constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* CONTRACT_PATH */ "h"].replace(/:id/, contractId)}${`${detail}` || ''}`;
  }
  /**
   * @param contractId
   * @returns {string}
   */


  static createVerifyContractUrl(contractId) {
    return `${_constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* VERIFY_CONTRACT_PATH */ "B"].replace(/:id/, contractId)}`;
  }
  /**
   *
   * @param contractId
   * @returns {string}
   */


  static createUploadAbiUrl(contractId) {
    return `${_constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* UPLOAD_ABI_PATH */ "A"].replace(/:id/, contractId)}`;
  }
  /**
   *
   * @param {String} id
   */


  static createUrlById(id) {
    let url;

    if (echojs_lib__WEBPACK_IMPORTED_MODULE_2__["validators"].isAccountName(id)) {
      url = URLHelper.createAccountUrlByName(id);
    } else if (echojs_lib__WEBPACK_IMPORTED_MODULE_2__["validators"].isAccountId(id)) {
      url = URLHelper.createAccountUrl(id);
    } else if (echojs_lib__WEBPACK_IMPORTED_MODULE_2__["validators"].isContractId(id)) {
      url = URLHelper.createContractUrl(id);
    } else if (echojs_lib__WEBPACK_IMPORTED_MODULE_2__["validators"].isAssetId(id)) {
      url = URLHelper.createAssetUrl(id);
    } else {
      url = URLHelper.createObjectsUrl(id);
    }

    return url;
  }
  /**
   * method getUrlAccountIcon
   * @param {string} accountName
   * @returns {string}
   */


  static getUrlAccountIcon(accountName) {
    return `${_config_chain__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].SERVER_URL}/api/accounts/${accountName}/avatar.png`;
  }
  /**
   *
   * @param icon
   * @returns {string}
   */


  static getUrlContractIcon(icon) {
    return `${_config_chain__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].SERVER_URL}${icon}`;
  }
  /**
   *
   * @param contractId
   * @returns {string}
   */


  static createManageContractUrl(contractId) {
    return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* MANAGE_CONTRACT_PATH */ "l"].replace(/:id/, contractId);
  }
  /**
   *
   * @param round
   * @param index
   * @returns {string}
   */


  static createTransactionUrl(round, index) {
    return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_4__[/* TRANSACTION_INFORMATION_PATH */ "z"].replace(/:round/, round).replace(/:index/, index);
  }
  /**
   * @method createOperationUrlByFilter
   * @param {string} pathname
   * @param {object} passQuery
   * @param {object} newProps
   * @return {string}
   */


  static createOperationUrlByFilter(pathname, passQuery, newProps) {
    const {
      id,
      round
    } = passQuery,
          query = Object(_babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(passQuery, ["id", "round"]);

    let transformPathname = pathname.replace(/\[id\]/, id);

    if (round) {
      transformPathname = pathname.replace(/\[round\]/, round);
    }

    return `${transformPathname}?${query_string__WEBPACK_IMPORTED_MODULE_3___default.a.stringify(Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, query, newProps))}`;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (URLHelper);

/***/ }),

/***/ "2k9L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rf6O");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("K2gz");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_BackwardLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("5vFe");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const InnerHeader = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({
  children,
  title,
  className,
  returnFunction
}) => __jsx("div", {
  className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('inner-header', className)
}, children && __jsx("div", {
  className: "inner-header-line"
}, children), __jsx("div", {
  className: "inner-header-line"
}, returnFunction && __jsx(_components_BackwardLink__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
  returnFunction: returnFunction
}), __jsx("div", {
  className: "inner-header-title"
}, title))));
InnerHeader.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  returnFunction: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
InnerHeader.defaultProps = {
  children: null,
  className: '',
  returnFunction: null
};
/* harmony default export */ __webpack_exports__["a"] = (InnerHeader);

/***/ }),

/***/ "2wwy":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Loka");

/***/ }),

/***/ "4LdG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getContractInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getTotalHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getContractBySymbol; });
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("txk1");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GraphqlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("xoST");


const getContractInfo = async contractId => {
  const query = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
		query getContract($contractId: ContractId!) {
			getContract(id: $contractId) {
				id,
				registrar {
					name
				}
				block {
          			round
          			timestamp
		        }
		        callers { accounts { id } }
        		type,
        		supported_asset_id
        		eth_accuracy
        		token {
        			name,
					symbol,
					type,
					decimals,
					total_supply
        		}
			}
			getHistory(contracts: [$contractId], operations:[CONTRACT_CREATE]) {
				items {
					body
				}
			}
			getTransferHistory(contracts: [$contractId]) {
				total
			}
		}
	`;
  return _GraphqlService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getClient().query({
    query,
    variables: {
      contractId
    }
  }).then(({
    data
  }) => ({
    history: data.getHistory,
    contractInfo: data.getContract,
    transferHistory: data.getTransferHistory
  }));
};
const getTotalHistory = async contracts => {
  const query = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
		query getHistory($contracts: [ContractId!]) {
			getHistory(contracts: $contracts) {
				total
			}
		}
	`;
  return _GraphqlService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getClient().query({
    query,
    variables: {
      contracts
    }
  }).then(({
    data
  }) => data.getHistory);
};
const getToken = async id => {
  const query = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
		query getContract($id: ContractId!) {
			getContract(id: $id) {
				type
				token {
					symbol
				}
			}
		}
	`;
  return _GraphqlService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getClient().query({
    query,
    variables: {
      id
    }
  }).then(({
    data
  }) => data.getContract);
};
const getContractBySymbol = (name, count) => {
  const query = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
		query getTokens($count: Int, $name: String) {
			getTokens(count: $count, name: $name, symbol: $name) {
				items {
					symbol
					contract {
            			id
          			}
          		}
			}
		}
	`;
  return _GraphqlService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getClient().query({
    query,
    variables: {
      count,
      name
    }
  }).then(({
    data
  }) => data.getTokens);
};

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "4mXO":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("k1wZ");

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("o7ok");


/***/ }),

/***/ "55jf":
/***/ (function(module, exports) {

module.exports = require("redux-batched-actions");

/***/ }),

/***/ "59hC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return accountOperations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return assetOperations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return contractOperations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return committeeOperations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return proposalOperations; });
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("moMR");
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(echojs_lib__WEBPACK_IMPORTED_MODULE_0__);

const Operations = {
  transfer: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].TRANSFER,
    name: 'Transfer',
    options: {
      from: 'from',
      subject: ['to', 'name'],
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  transfer_to_address: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].TRANSFER_TO_ADDRESS,
    name: 'Transfer to address',
    options: {
      from: 'from',
      subject: ['to'],
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  override_transfer: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].OVERRIDE_TRANSFER,
    name: 'Override transfer',
    options: {
      from: 'from',
      subject: ['to', 'name'],
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  account_create: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ACCOUNT_CREATE,
    name: 'Create account',
    options: {
      from: 'registrar',
      subject: ['name', null],
      value: null,
      asset: null
    }
  },
  account_update: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ACCOUNT_UPDATE,
    name: 'Update account',
    options: {
      from: 'account',
      subject: null,
      value: null,
      asset: null
    }
  },
  account_whitelist: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ACCOUNT_WHITELIST,
    name: 'Account whitelist',
    options: {
      from: 'authorizing_account',
      subject: ['account_to_list', 'name'],
      value: null,
      asset: null
    }
  },
  account_address_create: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ACCOUNT_ADDRESS_CREATE,
    name: 'Account address create',
    options: {
      from: 'owner',
      subject: ['label'],
      value: null,
      asset: null
    }
  },
  asset_create: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_CREATE,
    name: 'Create asset',
    options: {
      from: 'issuer',
      subject: ['symbol', null],
      value: null,
      asset: null
    }
  },
  asset_update: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_UPDATE,
    name: 'Update asset',
    options: {
      from: 'issuer',
      subject: ['asset_to_update', 'symbol'],
      value: null,
      asset: null
    }
  },
  asset_update_bitasset: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_UPDATE_BITASSET,
    name: 'Update SmartCoin',
    options: {
      from: 'issuer',
      subject: ['asset_to_update', 'symbol'],
      value: null,
      asset: null
    }
  },
  asset_update_feed_producers: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_UPDATE_FEED_PRODUCERS,
    name: 'Update asset feed producers',
    options: {
      from: 'issuer',
      subject: ['asset_to_update', 'symbol'],
      value: null,
      asset: null
    }
  },
  asset_issue: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_ISSUE,
    name: 'Issue asset',
    options: {
      from: 'issuer',
      subject: ['issue_to_account', 'name'],
      value: 'asset_to_issue.amount',
      asset: 'asset_to_issue.asset_id'
    }
  },
  asset_reserve: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_RESERVE,
    name: 'Burn asset',
    options: {
      from: 'payer',
      subject: null,
      value: 'amount_to_reserve.amount',
      asset: 'amount_to_reserve.asset_id'
    }
  },
  asset_fund_fee_pool: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_FUND_FEE_POOL,
    name: 'Fund asset fee pool',
    options: {
      from: 'from_account',
      subject: null,
      value: 'amount',
      asset: 'asset_id'
    }
  },
  asset_publish_feed: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_PUBLISH_FEED,
    name: 'Publish feed',
    options: {
      from: 'publisher',
      subject: ['asset_id', 'symbol'],
      value: 'feed',
      asset: 'asset_id'
    }
  },
  asset_claim_fees: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].ASSET_CLAIM_FEES,
    name: 'Claim asset fees',
    options: {
      from: 'issuer',
      subject: null,
      value: 'amount_to_claim.amount',
      asset: 'amount_to_claim.asset_id'
    }
  },
  proposal_create: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].PROPOSAL_CREATE,
    name: 'Create proposal',
    options: {
      from: 'fee_paying_account',
      subject: null,
      value: null,
      asset: null
    }
  },
  proposal_update: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].PROPOSAL_UPDATE,
    name: 'Update proposal',
    options: {
      from: 'fee_paying_account',
      subject: null,
      value: null,
      asset: null
    }
  },
  proposal_delete: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].PROPOSAL_DELETE,
    name: 'Delete proposal',
    options: {
      from: 'fee_paying_account',
      subject: null,
      value: null,
      asset: null
    }
  },
  committee_member_create: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].COMMITTEE_MEMBER_CREATE,
    name: 'Create committee member',
    options: {
      from: 'committee_member_account',
      subject: null,
      value: 'deposit.amount',
      asset: 'deposit.asset_id'
    }
  },
  committee_member_update: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].COMMITTEE_MEMBER_UPDATE,
    name: 'Update committee member',
    options: {
      from: 'committee_member_account',
      subject: null,
      value: null,
      asset: null
    }
  },
  committee_member_update_global_parameters: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS,
    name: 'Global parameters update',
    options: {
      from: null,
      subject: null,
      value: null,
      asset: null
    }
  },
  committee_member_activate: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].COMMITTEE_MEMBER_ACTIVATE,
    name: 'Activate committee member',
    options: {
      from: null,
      subject: ['committee_to_activate', 'name'],
      value: null,
      asset: null
    }
  },
  committee_member_deactivate: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].COMMITTEE_MEMBER_DEACTIVATE,
    name: 'Deactivate committee member',
    options: {
      from: null,
      subject: ['committee_to_deactivate', 'name'],
      value: null,
      asset: null
    }
  },
  committee_frozen_balance_deposit: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].COMMITTEE_FROZEN_BALANCE_DEPOSIT,
    name: 'Committee frozen balance deposit',
    options: {
      from: null,
      subject: ['committee_member_account', 'name'],
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  committee_frozen_balance_withdraw: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].COMMITTEE_FROZEN_BALANCE_WITHDRAW,
    name: 'Committee frozen balance withdraw',
    options: {
      from: null,
      subject: ['committee_member_account', 'name'],
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  vesting_balance_create: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].VESTING_BALANCE_CREATE,
    name: 'Create vesting balance',
    options: {
      from: 'creator',
      subject: ['owner', 'name'],
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  vesting_balance_withdraw: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].VESTING_BALANCE_WITHDRAW,
    name: 'Withdraw vesting balance',
    options: {
      from: 'owner',
      subject: null,
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  balance_claim: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].BALANCE_CLAIM,
    name: 'Claim balance',
    options: {
      from: null,
      subject: ['deposit_to_account', 'name'],
      value: 'total_claimed.amount',
      asset: 'total_claimed.asset_id'
    }
  },
  balance_freeze: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].BALANCE_FREEZE,
    name: 'Balance freeze',
    options: {
      from: 'account',
      subject: null,
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  balance_unfreeze: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].BALANCE_UNFREEZE,
    name: 'Balance unfreeze',
    options: {
      from: 'account',
      subject: null,
      value: 'amount.amount',
      asset: 'amount.asset_id'
    }
  },
  contract_create: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].CONTRACT_CREATE,
    name: 'Contract create',
    options: {
      from: 'registrar',
      subject: null,
      value: 'value.amount',
      asset: 'value.asset_id'
    }
  },
  contract_call: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].CONTRACT_CALL,
    name: 'Contract call',
    options: {
      from: 'registrar',
      subject: ['callee'],
      value: 'value.amount',
      asset: 'value.asset_id'
    }
  },
  contract_internal_create: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].CONTRACT_INTERNAL_CREATE,
    name: 'Contract internal create',
    options: {
      from: ['caller'],
      subject: null,
      value: 'value.amount',
      asset: 'value.asset_id'
    }
  },
  contract_internal_call: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].CONTRACT_INTERNAL_CALL,
    name: 'Contract internal call',
    options: {
      from: 'caller',
      subject: ['callee'],
      value: 'value.amount',
      asset: 'value.asset_id'
    }
  },
  contract_selfdestruct: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].CONTRACT_SELFDESTRUCT,
    name: 'Contract selfdestruct',
    options: {
      from: ['contract'],
      subject: ['recipient'],
      value: null,
      asset: null
    }
  },
  contract_update: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].CONTRACT_UPDATE,
    name: 'Contract update',
    options: {
      from: 'sender',
      subject: ['contract'],
      amount: null,
      asset: null
    }
  },
  contract_fund_pool: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].CONTRACT_FUND_POOL,
    name: 'Contract fund pool',
    options: {
      from: 'sender',
      subject: ['contract'],
      amount: 'value.amount',
      asset: 'value.asset_id'
    }
  },
  contract_whitelist: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].CONTRACT_WHITELIST,
    name: 'Contract whitelist',
    options: {
      from: 'sender',
      subject: ['contract'],
      amount: null,
      asset: null
    }
  },
  sidechain_eth_create_address: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ETH_CREATE_ADDRESS,
    name: 'Create eth address',
    options: {
      from: 'account',
      subject: null,
      value: null,
      asset: null
    }
  },
  sidechain_eth_approve_address: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ETH_APPROVE_ADDRESS,
    name: 'Approve eth address',
    options: {
      from: 'committee_member_id',
      subject: ['account', 'name'],
      value: null,
      asset: null
    }
  },
  deposit_eth: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ETH_DEPOSIT,
    name: 'Deposit eth',
    options: {
      from: 'committee_member_id',
      subject: ['account', 'name'],
      value: 'value',
      asset: null
    }
  },
  eth_send_deposit: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ETH_SEND_DEPOSIT,
    name: 'Eth send deposit',
    options: {
      from: ['committee_member_id', 'name'],
      subject: ['deposit_id'],
      value: null,
      asset: null
    }
  },
  withdraw_eth: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ETH_WITHDRAW,
    name: 'Withdraw eth',
    options: {
      from: 'account',
      subject: null,
      value: 'value',
      asset: null
    }
  },
  eth_send_withdraw: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ETH_SEND_WITHDRAW,
    name: 'Eth send withdraw',
    options: {
      from: ['committee_member_id', 'name'],
      subject: ['withdraw_id'],
      value: null,
      asset: null
    }
  },
  approve_withdraw_eth: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ETH_APPROVE_WITHDRAW,
    name: 'Approve withdraw eth',
    options: {
      from: ['committee_member_id', 'name'],
      subject: ['withdraw_id'],
      value: null,
      asset: null
    }
  },
  eth_update_contract_address: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ETH_UPDATE_CONTRACT_ADDRESS,
    name: 'Eth update contract address',
    options: {
      from: null,
      subject: ['new_addr'],
      value: null,
      asset: null
    }
  },
  sidechain_issue: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ISSUE,
    name: 'Sidechain issue',
    options: {
      from: 'account',
      subject: ['deposit_id'],
      amount: 'value.amount',
      asset: 'value.asset_id'
    }
  },
  sidechain_burn: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_BURN,
    name: 'Sidechain burn',
    options: {
      from: 'account',
      subject: ['withdraw_id'],
      amount: 'amount.value',
      asset: 'fee.asset_id'
    }
  },
  register_erc20_token: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ERC20_REGISTER_TOKEN,
    name: 'Register erc20 token',
    options: {
      from: 'account',
      subject: ['eth_addr'],
      amount: null,
      asset: null
    }
  },
  deposit_erc20_token: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ERC20_DEPOSIT_TOKEN,
    name: 'Deposit erc20 token',
    options: {
      from: 'account',
      subject: ['erc20_token_addr'],
      amount: 'value',
      asset: null
    }
  },
  erc20_send_deposit: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ERC20_SEND_DEPOSIT_TOKEN,
    name: 'Erc20 send deposit',
    options: {
      from: ['committee_member_id', 'name'],
      subject: ['deposit_id'],
      amount: null,
      asset: null
    }
  },
  withdraw_erc20_token: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ERC20_WITHDRAW_TOKEN,
    name: 'Withdraw erc20 token',
    options: {
      from: 'account',
      subject: ['to'],
      amount: 'value',
      asset: null
    }
  },
  erc20_send_withdraw: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ERC20_SEND_WITHDRAW_TOKEN,
    name: 'Erc20 send withdraw',
    options: {
      from: ['committee_member_id', 'name'],
      subject: ['withdraw_id'],
      amount: null,
      asset: null
    }
  },
  approve_erc20_token_withdraw: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ERC20_APPROVE_TOKEN_WITHDRAW,
    name: 'Approve erc20 token withdraw',
    options: {
      from: 'committee_member_id',
      subject: ['withdraw_id'],
      amount: null,
      asset: null
    }
  },
  sidechain_erc20_issue: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ERC20_ISSUE,
    name: 'Erc20 issue',
    options: {
      from: 'account',
      ubject: ['token'],
      amount: 'amount',
      asset: null
    }
  },
  sidechain_erc20_burn: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_ERC20_BURN,
    name: 'Erc20 burn operation',
    options: {
      from: 'account',
      subject: ['token'],
      amount: 'amount',
      asset: null
    }
  },
  sidechain_btc_create_address: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_BTC_CREATE_ADDRESS,
    name: 'BTC create address',
    options: {
      from: 'account',
      subject: null,
      amount: null,
      asset: null
    }
  },
  sidechain_btc_create_intermediate_deposit: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_BTC_CREATE_INTERMEDIATE_DEPOSIT,
    name: 'BTC create intermediate deposit',
    options: {
      from: 'account',
      subject: null,
      amount: null,
      asset: null
    }
  },
  sidechain_btc_intermediate_deposit: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_BTC_INTERMEDIATE_DEPOSIT,
    name: 'BTC intermediate deposit',
    options: {
      from: 'committee_member_id',
      subject: ['intermediate_address_id'],
      amount: null,
      asset: null
    }
  },
  sidechain_btc_deposit: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_BTC_DEPOSIT,
    name: 'BTC deposit',
    options: {
      from: 'account',
      subject: ['intermediate_deposit_id'],
      amount: null,
      asset: null
    }
  },
  sidechain_btc_withdraw: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_BTC_WITHDRAW,
    name: 'BTC withdraw',
    options: {
      from: 'account',
      subject: ['btc_addr'],
      amount: 'value',
      asset: null
    }
  },
  sidechain_btc_aggregate: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_BTC_AGGREGATE,
    name: 'BTC aggregate',
    options: {
      from: 'committee_member_id',
      subject: ['transaction_id'],
      amount: 'aggregation_out_value',
      asset: null
    }
  },
  sidechain_btc_approve_aggregate: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].SIDECHAIN_BTC_APPROVE_AGGREGATE,
    name: 'BTC approve aggregate',
    options: {
      from: 'committee_member_id',
      subject: ['transaction_id'],
      amount: null,
      asset: null
    }
  },
  block_reward: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].BLOCK_REWARD,
    name: 'Block reward',
    options: {
      from: null,
      subject: ['receiver', 'name'],
      value: 'assets[0].amount',
      asset: null
    }
  },
  evm_address_register: {
    value: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["OPERATIONS_IDS"].EVM_ADDRESS_REGISTER,
    name: 'Evm address register',
    options: {
      from: 'owner',
      subject: ['evm_address'],
      value: 'amount',
      asset: null
    }
  }
};
const accountOperations = [Operations.account_create.name, Operations.account_update.name, Operations.account_whitelist.name, Operations.account_address_create.name];
const assetOperations = [Operations.asset_create.name, Operations.asset_update.name, Operations.asset_update_bitasset.name, Operations.asset_update_feed_producers.name, Operations.asset_issue.name, Operations.asset_reserve.name, Operations.asset_fund_fee_pool.name, Operations.asset_publish_feed.name];
const contractOperations = [Operations.contract_create.name, Operations.contract_call.name, Operations.contract_internal_create.name, Operations.contract_internal_call.name, Operations.contract_selfdestruct.name, Operations.contract_update.name, Operations.contract_fund_pool.name, Operations.contract_whitelist.name];
const committeeOperations = [Operations.committee_member_create.name, Operations.committee_member_update.name, Operations.committee_member_update_global_parameters.name, Operations.committee_member_activate.name, Operations.committee_member_deactivate.name, Operations.committee_frozen_balance_deposit.name, Operations.committee_frozen_balance_withdraw.name];
const proposalOperations = [Operations.proposal_create.name, Operations.proposal_update.name, Operations.proposal_delete.name];
/* harmony default export */ __webpack_exports__["e"] = (Operations);

/***/ }),

/***/ "5Uuq":
/***/ (function(module, exports, __webpack_require__) {

var _Object$getOwnPropertyDescriptor = __webpack_require__("Jo+v");

var _Object$defineProperty = __webpack_require__("hfKm");

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = _Object$defineProperty && _Object$getOwnPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            _Object$defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "5vFe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rf6O");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BackwardIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("620N");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const BackwardLink = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({
  returnFunction
}) => __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("a", {
  href: "",
  className: "backwards-link",
  onClick: e => {
    e.preventDefault();
    returnFunction(false);
  }
}, __jsx(_BackwardIcon__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null))));
BackwardLink.propTypes = {
  returnFunction: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
BackwardLink.defaultProps = {
  returnFunction: () => {}
};
/* harmony default export */ __webpack_exports__["a"] = (BackwardLink);

/***/ }),

/***/ "620N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const Backward = () => __jsx("svg", {
  width: "17",
  height: "20",
  viewBox: "0 0 17 20",
  xmlns: "http://www.w3.org/2000/svg"
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M16 9H3.3L10.1 1.8C10.5 1.4 10.5 0.7 10.1 0.3C9.7 -0.1 9.1 -0.1 8.7 0.3L0.3 9.2C-0.1 9.6 -0.1 10.3 0.3 10.7L8.8 19.6C9.2 20 9.8 20 10.2 19.6C10.6 19.2 10.6 18.5 10.2 18.1L3.4 11H16C16.6 11 17 10.6 17 10C17 9.4 16.6 9 16 9Z",
  fill: "black"
}));

/* harmony default export */ __webpack_exports__["a"] = (Backward);

/***/ }),

/***/ "6BQ9":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("wa65");

/***/ }),

/***/ "9B1q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2wwy");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("tKMe");
/* harmony import */ var _constants_TypeConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("PK5G");




class TypesHelper {
  /**
   *
      * @param {String} scriptHex
      * @returns {boolean}
      */
  static isErc20Contract(scriptHex) {
    if (scriptHex) {
      const hashes = _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_0___default()(_constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_1__[/* ERC20_REQIURED_HASHES */ "h"]);

      return hashes.every(hash => scriptHex.includes(hash.toString()));
    }

    return false;
  }
  /**
   *
      * @param {String} hex
      * @returns {boolean}
      */


  static isTransferEvent(hex) {
    return hex.indexOf(_constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_1__[/* ERC20_HASHES */ "g"]['Transfer(address,address,uint256)']) !== -1;
  }
  /**
      *
      * @param {String} str
      */


  static isStringNumber(str) {
    return _constants_TypeConstants__WEBPACK_IMPORTED_MODULE_2__[/* stringNumberRegEx */ "d"].test(str);
  }
  /**
   *
   * @param {String} str
   */


  static isCommaNumberRepresentation(str) {
    return _constants_TypeConstants__WEBPACK_IMPORTED_MODULE_2__[/* commaNumberRepresentationRegEx */ "a"].test(str);
  }
  /**
      *
      * @param {String} str
      */


  static isStartWithLetter(str) {
    return _constants_TypeConstants__WEBPACK_IMPORTED_MODULE_2__[/* startWithLetterRegEx */ "c"].test(str);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (TypesHelper);

/***/ }),

/***/ "9Jkg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("fozc");

/***/ }),

/***/ "9eFo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("K2gz");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Loader = ({
  global,
  text
}) => __jsx("div", {
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
    'app-loader': global
  })
}, __jsx("div", {
  className: "f-h-loader"
}, __jsx("div", {
  className: "spin"
}), __jsx("div", {
  className: "text"
}, text)));

Loader.defaultProps = {
  text: 'Please wait while data is loading',
  global: false
};
/* harmony default export */ __webpack_exports__["a"] = (Loader);

/***/ }),

/***/ "9s6j":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js + 1 modules
var objectSpread = __webpack_require__("zrwo");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js
var parse_int = __webpack_require__("6BQ9");
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-perfect-scrollbar"
var external_react_perfect_scrollbar_ = __webpack_require__("RfFk");
var external_react_perfect_scrollbar_default = /*#__PURE__*/__webpack_require__.n(external_react_perfect_scrollbar_);

// EXTERNAL MODULE: external "query-string"
var external_query_string_ = __webpack_require__("Lc87");
var external_query_string_default = /*#__PURE__*/__webpack_require__.n(external_query_string_);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: ./src/helpers/URLHelper.js
var URLHelper = __webpack_require__("1qHI");

// EXTERNAL MODULE: ./src/components/TableLabel/index.jsx
var TableLabel = __webpack_require__("AGvI");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js
var esm_extends = __webpack_require__("kOwS");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js
var object_assign = __webpack_require__("UXZV");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./src/components/FilterBtn/index.jsx


var __jsx = external_react_default.a.createElement;

const FilterBtn = external_react_default.a.memo((_ref) => {
  let props = assign_default()({}, _ref);

  return __jsx("button", Object(esm_extends["a" /* default */])({
    className: "filter-btn"
  }, props), __jsx("svg", {
    width: "10",
    height: "9",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, __jsx("path", {
    d: "M3.4 4.3l.1.3v4.1c0 .2.2.3.3.3l2.3-1 .1-.2V4.6l.1-.3L9.7.5c.2-.2 0-.5-.3-.5h-9C0 0-.2.3 0 .5l3.3 3.8z"
  })), __jsx("span", {
    className: "caption"
  }, "Filter"));
});
/* harmony default export */ var components_FilterBtn = (FilterBtn);
// EXTERNAL MODULE: ./src/constants/Operations.js
var Operations = __webpack_require__("59hC");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__("qNsG");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__("K2gz");
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// EXTERNAL MODULE: external "rc-tooltip"
var external_rc_tooltip_ = __webpack_require__("FMsK");
var external_rc_tooltip_default = /*#__PURE__*/__webpack_require__.n(external_rc_tooltip_);

// EXTERNAL MODULE: external "echojs-lib"
var external_echojs_lib_ = __webpack_require__("moMR");

// EXTERNAL MODULE: ./src/public/images/icons/curret-sm.svg
var curret_sm = __webpack_require__("d2d3");
var curret_sm_default = /*#__PURE__*/__webpack_require__.n(curret_sm);

// EXTERNAL MODULE: ./src/components/Avatar/index.jsx
var Avatar = __webpack_require__("aBjG");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/entries.js
var entries = __webpack_require__("LR/J");
var entries_default = /*#__PURE__*/__webpack_require__.n(entries);

// EXTERNAL MODULE: external "react-media"
var external_react_media_ = __webpack_require__("PnyD");
var external_react_media_default = /*#__PURE__*/__webpack_require__.n(external_react_media_);

// EXTERNAL MODULE: external "copy-to-clipboard"
var external_copy_to_clipboard_ = __webpack_require__("oLBY");
var external_copy_to_clipboard_default = /*#__PURE__*/__webpack_require__.n(external_copy_to_clipboard_);

// EXTERNAL MODULE: external "bignumber.js"
var external_bignumber_js_ = __webpack_require__("d/Cm");
var external_bignumber_js_default = /*#__PURE__*/__webpack_require__.n(external_bignumber_js_);

// EXTERNAL MODULE: ./src/public/images/icons/direction-icon.svg
var direction_icon = __webpack_require__("whx4");
var direction_icon_default = /*#__PURE__*/__webpack_require__.n(direction_icon);

// EXTERNAL MODULE: ./src/helpers/FormatHelper.js
var FormatHelper = __webpack_require__("bXzB");

// EXTERNAL MODULE: ./src/constants/RouterConstants.js
var RouterConstants = __webpack_require__("Z2WM");

// EXTERNAL MODULE: ./src/constants/GlobalConstants.js
var GlobalConstants = __webpack_require__("tKMe");

// EXTERNAL MODULE: ./src/helpers/SsrHrefHelper.js
var SsrHrefHelper = __webpack_require__("Q5ih");

// CONCATENATED MODULE: ./src/components/TransactionInfo/OperationInfo.jsx

var OperationInfo_jsx = external_react_default.a.createElement;
















class OperationInfo_OperationInfo extends external_react_default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMore: [],
      showLogs: false
    };
  }

  onToggleLoadMore(index, e) {
    e.preventDefault();
    const {
      loadMore
    } = this.state;
    loadMore[index] = !loadMore[index];
    this.setState({
      loadMore
    });
  }

  renderSingleInternal(op, index) {
    const {
      precision,
      amount: amountData
    } = op.value;
    const amount = new external_bignumber_js_default.a(amountData).div(10 ** precision).toString(10);
    return OperationInfo_jsx("div", {
      className: "tt-row token-transfer-table",
      key: index.toString()
    }, OperationInfo_jsx("div", {
      className: "tt-col amount"
    }, OperationInfo_jsx("span", {
      className: "value"
    }, OperationInfo_jsx(external_rc_tooltip_default.a, {
      placement: "top",
      overlayClassName: "verify-contract-tooltip",
      trigger: ['hover'],
      overlay: amount
    }, OperationInfo_jsx("span", {
      className: "txt"
    }, amount))), OperationInfo_jsx("span", {
      className: "currency"
    }, op.value.symbol)), OperationInfo_jsx("div", {
      className: "tt-col"
    }, OperationInfo_jsx("div", {
      className: "transfer-direction"
    }, OperationInfo_jsx(link_default.a, {
      href: SsrHrefHelper["a" /* default */].getHrefByObjectId(op.from.id),
      as: URLHelper["a" /* default */].createUrlById(op.from.id)
    }, OperationInfo_jsx("div", {
      className: "avatar-wrap link"
    }, op.from.name && OperationInfo_jsx(Avatar["a" /* default */], {
      accountName: op.from.name
    }), OperationInfo_jsx("span", {
      className: "blue"
    }, op.from.name || op.from.id))), (op.subject.name || op.subject.id) && OperationInfo_jsx("img", {
      src: direction_icon_default.a,
      alt: "",
      className: "direction"
    }), OperationInfo_jsx(link_default.a, {
      href: SsrHrefHelper["a" /* default */].getHrefByObjectId(op.subject.id),
      as: URLHelper["a" /* default */].createUrlById(op.subject.id)
    }, OperationInfo_jsx("div", {
      className: "avatar-wrap link"
    }, op.subject.name && OperationInfo_jsx(Avatar["a" /* default */], {
      accountName: op.subject.name
    }), OperationInfo_jsx("span", {
      className: "blue"
    }, op.subject.name || op.subject.id))))));
  }

  renderContractLogs(logs) {
    const {
      showLogs
    } = this.state;
    const formattedLogs = logs.map((log, index) => OperationInfo_jsx("div", {
      className: "mono",
      key: log.data
    }, OperationInfo_jsx("div", {
      className: "mono-bold"
    }, "Log [", index, "]:"), OperationInfo_jsx("div", {
      className: "mono-bold"
    }, "Contract: ", OperationInfo_jsx(link_default.a, {
      href: RouterConstants["u" /* SSR_CONTRACT_PATH */],
      as: URLHelper["a" /* default */].createUrlById(log.contract)
    }, OperationInfo_jsx("a", null, log.contract))), OperationInfo_jsx("div", {
      className: "mono-bold"
    }, "Topics:"), log.topics.map((topic, i) => OperationInfo_jsx("div", {
      key: topic
    }, "[", i, "]:", topic)), OperationInfo_jsx("div", {
      className: "mono-bold"
    }, "Data:"), OperationInfo_jsx("div", null, log.data)));
    return OperationInfo_jsx(external_react_default.a.Fragment, null, formattedLogs.length > 1 && !showLogs ? formattedLogs[0] : formattedLogs, formattedLogs.length > 1 && !showLogs && OperationInfo_jsx("button", {
      className: "text-button",
      onClick: () => this.setState({
        showLogs: true
      })
    }, "View full log"));
  }

  renderOperationRowKey(key, value, index, type) {
    return OperationInfo_jsx(external_react_default.a.Fragment, null, key === 'registrar' && type === 'Contract call' ? 'tx sender' : key, ":");
  }

  renderOperationRowValue(key, value, index) {
    const {
      objId,
      isMobile
    } = this.props;
    const valueAmount = FormatHelper["a" /* default */].formatAmount(value.amount, value.precision, value.symbol);
    const [amount, amountName] = valueAmount.split(' ');

    if (typeof value === 'object' && key !== 'logs') {
      if (!value.link) {
        value = OperationInfo_jsx(external_react_media_default.a, {
          query: "(max-width: 300px)",
          defaultMatches: isMobile
        }, matches => matches ? OperationInfo_jsx(external_rc_tooltip_default.a, {
          placement: "top",
          overlayClassName: "verify-contract-tooltip",
          trigger: ['hover'],
          overlay: valueAmount
        }, OperationInfo_jsx("div", {
          className: "val"
        }, OperationInfo_jsx("div", {
          className: "txt"
        }, amount, "\xA0"), OperationInfo_jsx("div", {
          className: "txt2"
        }, amountName))) : OperationInfo_jsx("span", null, valueAmount));
      } else {
        const isAccount = external_echojs_lib_["validators"].isAccountId(value.link);
        value = OperationInfo_jsx(link_default.a, {
          href: SsrHrefHelper["a" /* default */].getHrefByObjectId(value.link),
          as: URLHelper["a" /* default */].createUrlById(value.link)
        }, OperationInfo_jsx("div", {
          className: external_classnames_default()('link', {
            'avatar-wrap': isAccount
          })
        }, external_echojs_lib_["validators"].isAccountId(value.link) && OperationInfo_jsx(Avatar["a" /* default */], {
          accountName: value.value
        }), OperationInfo_jsx("span", {
          className: "blue"
        }, value.value)));
      }
    }

    if (key === 'block') {
      value = OperationInfo_jsx(link_default.a, {
        href: RouterConstants["s" /* SSR_BLOCK_INFORMATION_PATH */],
        as: RouterConstants["c" /* BLOCK_INFORMATION_PATH */].replace(/:round/, value)
      }, OperationInfo_jsx("a", {
        className: "blue"
      }, FormatHelper["a" /* default */].formatAmount(value, 0)));
    }

    if (typeof value === 'number') {
      value = FormatHelper["a" /* default */].formatAmount(value, 0);
    }

    if (key === 'logs') {
      return this.renderContractLogs(value);
    }

    if (key === 'symbol') {
      return OperationInfo_jsx(link_default.a, {
        href: RouterConstants["r" /* SSR_ASSET_PATH */],
        as: URLHelper["a" /* default */].createUrlById(objId)
      }, OperationInfo_jsx("a", null, value));
    }

    if (key === 'asset_to_issue') {
      return OperationInfo_jsx(external_react_default.a.Fragment, null, amount, "\xA0", OperationInfo_jsx(link_default.a, {
        href: RouterConstants["r" /* SSR_ASSET_PATH */],
        as: URLHelper["a" /* default */].createUrlById(objId)
      }, OperationInfo_jsx("a", null, amountName)));
    }

    if (key.toLowerCase() !== 'bytecode') {
      return value;
    }

    const {
      loadMore
    } = this.state;
    const bytecode = value.length > GlobalConstants["a" /* BYTECODE_SYMBOLS_LENGTH */] && !loadMore[index] ? value.slice(0, GlobalConstants["a" /* BYTECODE_SYMBOLS_LENGTH */] - 3).concat('...') : value;
    return OperationInfo_jsx(external_react_default.a.Fragment, null, OperationInfo_jsx("div", {
      className: "mono"
    }, bytecode), value.length > GlobalConstants["a" /* BYTECODE_SYMBOLS_LENGTH */] && !loadMore[index] && OperationInfo_jsx("button", {
      className: "text-button",
      onClick: e => this.onToggleLoadMore(index, e)
    }, "Expand"), OperationInfo_jsx("button", {
      className: "copy-bytecode",
      onClick: () => external_copy_to_clipboard_default()(value)
    }, "Copy code"));
  }

  renderInfo() {
    const {
      details,
      index,
      block,
      transaction,
      opIndex
    } = this.props;
    const {
      type
    } = details;
    const opKey = `${type}_${index}`;
    const transactionUrl = URLHelper["a" /* default */].createTransactionUrl(block, transaction + 1);
    const operationUrl = URLHelper["a" /* default */].createTransactionOperationUrl(transactionUrl, opIndex + 1);
    return OperationInfo_jsx(external_react_default.a.Fragment, null, entries_default()(details).map(([key, value]) => {
      if (key === 'Fee') {
        return OperationInfo_jsx(external_react_default.a.Fragment, {
          key: `${opKey}_${key}_media`
        }, OperationInfo_jsx("div", {
          className: "od-row",
          key: `${opKey}_${key}`
        }, OperationInfo_jsx("div", {
          className: "od-col"
        }, key, ":"), OperationInfo_jsx("div", {
          className: "od-col"
        }, this.renderOperationRowValue(key, value, index))));
      } else if (key === 'token transfers') {
        return value.map((op, internalOpIndex) => OperationInfo_jsx("div", {
          className: "od-row",
          key: `${opKey}_${key}_${internalOpIndex.toString()}`
        }, OperationInfo_jsx("div", {
          className: "od-col"
        }, OperationInfo_jsx("div", {
          className: "tt-row",
          key: index.toString()
        }, op.label && `${op.label}:`)), OperationInfo_jsx("div", {
          className: "od-col"
        }, this.renderSingleInternal(op, index))));
      }

      return OperationInfo_jsx("div", {
        className: "od-row",
        key: `${opKey}_${key}`
      }, OperationInfo_jsx("div", {
        className: "od-col"
      }, this.renderOperationRowKey(key, value, index, type)), OperationInfo_jsx("div", {
        className: "od-col"
      }, this.renderOperationRowValue(key, value, index)));
    }), OperationInfo_jsx("div", {
      className: "od-row"
    }, OperationInfo_jsx("div", {
      className: "od-col"
    }, "OPERATION:"), OperationInfo_jsx("div", {
      className: "od-col"
    }, OperationInfo_jsx(link_default.a, {
      href: RouterConstants["w" /* SSR_TRANSACTION_INFORMATION_PATH */],
      as: operationUrl
    }, OperationInfo_jsx("a", null, `${window.location.origin}${operationUrl}`)))));
  }

  render() {
    return OperationInfo_jsx("div", {
      className: "fold-operation-info"
    }, OperationInfo_jsx("div", {
      className: "fold-title"
    }, "Operation info"), OperationInfo_jsx("div", {
      className: "operation-detail-table"
    }, this.renderInfo()));
  }

}

OperationInfo_OperationInfo.defaultProps = {
  objId: ''
};
/* harmony default export */ var TransactionInfo_OperationInfo = (OperationInfo_OperationInfo);
// CONCATENATED MODULE: ./src/components/TransactionInfo/ObjectInfo.jsx
var ObjectInfo_jsx = external_react_default.a.createElement;










class ObjectInfo_ObjectInfo extends external_react_default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  toggleBytecode() {
    const {
      isExpanded
    } = this.state;
    this.setState({
      isExpanded: !isExpanded
    });
  }

  renderProposalObject() {
    const {
      object
    } = this.props;
    const operations = object.get('operations');
    return ObjectInfo_jsx(external_react_default.a.Fragment, null, ObjectInfo_jsx("div", {
      className: "fold-title"
    }, "Object: proposal"), ObjectInfo_jsx("div", {
      className: "operation-detail-table"
    }, ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "ID:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["o" /* OBJECTS_PATH */],
      as: URLHelper["a" /* default */].createUrlById(object.get('id'))
    }, ObjectInfo_jsx("a", null, object.get('id'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Expiration time:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('expirationTime'))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Types:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, operations && operations.join && operations.join(', ')))));
  }

  renderCommitteeObject() {
    const {
      object
    } = this.props;
    return ObjectInfo_jsx(external_react_default.a.Fragment, null, ObjectInfo_jsx("div", {
      className: "fold-title"
    }, "Object: committee"), ObjectInfo_jsx("div", {
      className: "operation-detail-table"
    }, ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "ID:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: SsrHrefHelper["a" /* default */].getHrefByObjectId(object.get('id')),
      as: URLHelper["a" /* default */].createUrlById(object.get('id'))
    }, ObjectInfo_jsx("a", null, object.get('id'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Committee member account:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */],
      as: URLHelper["a" /* default */].createUrlById(object.get('account'))
    }, ObjectInfo_jsx("a", null, object.get('account'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Type:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('votes'))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Price to ECHO:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('url')))));
  }

  renderAssetObject() {
    const {
      object
    } = this.props;
    return ObjectInfo_jsx(external_react_default.a.Fragment, null, ObjectInfo_jsx("div", {
      className: "fold-title"
    }, "Object: asset"), ObjectInfo_jsx("div", {
      className: "operation-detail-table"
    }, ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "ID:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["r" /* SSR_ASSET_PATH */],
      as: URLHelper["a" /* default */].createUrlById(object.get('id'))
    }, ObjectInfo_jsx("a", null, object.get('id'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Name:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["r" /* SSR_ASSET_PATH */],
      as: URLHelper["a" /* default */].createUrlById(object.get('name'))
    }, ObjectInfo_jsx("a", null, object.get('name'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Type:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('type'))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Price to ECHO:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('price'))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Issuer account:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */],
      as: URLHelper["a" /* default */].createAccountUrl(object.get('issuer'))
    }, ObjectInfo_jsx("a", null, object.get('issuer'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Precision:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('precision'))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Total supply:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('totalSupply'))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Max supply:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('maxSupply')))));
  }

  renderAccountObject() {
    const {
      object
    } = this.props;
    return ObjectInfo_jsx(external_react_default.a.Fragment, null, ObjectInfo_jsx("div", {
      className: "fold-title"
    }, "Object: account"), ObjectInfo_jsx("div", {
      className: "operation-detail-table"
    }, ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "ID:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */],
      as: URLHelper["a" /* default */].createUrlById(object.get('id'))
    }, ObjectInfo_jsx("a", null, object.get('id'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Name:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */],
      as: URLHelper["a" /* default */].createUrlById(object.get('name'))
    }, ObjectInfo_jsx("a", null, object.get('name'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Echorand Key:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('echorandKey'))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('activeKeys').length > 1 ? 'Authority keys:' : 'Authority key:'), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx("div", {
      className: "authority"
    }, object.get('activeAccounts').length ? ObjectInfo_jsx(external_react_default.a.Fragment, null, ObjectInfo_jsx("div", {
      className: "title"
    }, "Accounts:"), ObjectInfo_jsx("ul", {
      className: "accounts"
    }, object.get('activeAccounts').map(name => ObjectInfo_jsx("li", {
      key: name
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */],
      as: URLHelper["a" /* default */].createAccountUrl(name)
    }, ObjectInfo_jsx("a", {
      className: "avatar-wrap"
    }, ObjectInfo_jsx(Avatar["a" /* default */], {
      accountName: name
    }), ObjectInfo_jsx("span", null, name))))))) : null, ObjectInfo_jsx("ul", {
      className: "keys"
    }, object.get('activeKeys').map(key => ObjectInfo_jsx("li", {
      key: key
    }, key)))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Registrar:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */],
      as: URLHelper["a" /* default */].createAccountUrl(object.get('registrar'))
    }, ObjectInfo_jsx("a", null, object.get('registrar'))))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Delegating Account:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */],
      as: URLHelper["a" /* default */].createAccountUrl(object.get('delegating'))
    }, ObjectInfo_jsx("a", null, object.get('delegating')))))));
  }

  renderContractObject() {
    const {
      isExpanded
    } = this.state;
    const {
      details,
      object
    } = this.props;
    const contractId = details['contract id'] ? details['contract id'].value : details['new contract id'].value;
    return ObjectInfo_jsx(external_react_default.a.Fragment, null, ObjectInfo_jsx("div", {
      className: "fold-title"
    }, "Object: contract"), ObjectInfo_jsx("div", {
      className: "operation-detail-table"
    }, ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "ID:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx(link_default.a, {
      href: RouterConstants["u" /* SSR_CONTRACT_PATH */],
      as: URLHelper["a" /* default */].createUrlById(contractId)
    }, ObjectInfo_jsx("a", null, contractId)))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Contract type:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('type') || object.get('erc20') === 'Yes' ? 'ERC20' : '—')), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Supported asset:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('supportedAsset') || 'None')), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Eth Accuracy:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('ethAccuracy'))), ObjectInfo_jsx("div", {
      className: "od-row"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "ERC20:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, object.get('erc20'))), ObjectInfo_jsx("div", {
      className: "od-row bytecode"
    }, ObjectInfo_jsx("div", {
      className: "od-col"
    }, "Bytecode:"), ObjectInfo_jsx("div", {
      className: "od-col"
    }, ObjectInfo_jsx("div", {
      className: "mono"
    }, object.get('bytecode').length > GlobalConstants["a" /* BYTECODE_SYMBOLS_LENGTH */] && !isExpanded ? `${object.get('bytecode').slice(0, GlobalConstants["a" /* BYTECODE_SYMBOLS_LENGTH */] - 2)}..` : object.get('bytecode')), object.get('bytecode').length > GlobalConstants["a" /* BYTECODE_SYMBOLS_LENGTH */] && !isExpanded ? ObjectInfo_jsx("button", {
      className: "text-button",
      onClick: () => this.toggleBytecode()
    }, "Expand") : null, ObjectInfo_jsx("button", {
      className: "copy-bytecode",
      onClick: () => external_copy_to_clipboard_default()(object.get('bytecode'))
    }, "Copy code")))));
  }

  renderObjectInfo() {
    const {
      details,
      object
    } = this.props;

    if (!object) {
      return null;
    }

    if (!object.size) {
      return null;
    }

    if (Operations["a" /* accountOperations */].includes(details.type)) {
      return this.renderAccountObject();
    }

    if (Operations["b" /* assetOperations */].includes(details.type)) {
      return this.renderAssetObject();
    }

    if (Operations["d" /* contractOperations */].includes(details.type)) {
      return this.renderContractObject();
    }

    if (Operations["c" /* committeeOperations */].includes(details.type)) {
      return this.renderCommitteeObject();
    }

    if (Operations["f" /* proposalOperations */].includes(details.type)) {
      return this.renderProposalObject();
    }

    return null;
  }

  render() {
    return ObjectInfo_jsx("div", {
      className: "fold-operation-info"
    }, this.renderObjectInfo());
  }

}

ObjectInfo_ObjectInfo.defaultProps = {
  object: null
};
/* harmony default export */ var TransactionInfo_ObjectInfo = (ObjectInfo_ObjectInfo);
// CONCATENATED MODULE: ./src/components/OperationsTable/Row.jsx

var Row_jsx = external_react_default.a.createElement;














const OperationsRow = external_react_default.a.memo((_ref) => {
  let {
    operation: {
      id,
      mainInfo,
      objectInfo,
      blockNumber: block,
      trIndex: transactionNum,
      opIndex,
      number,
      blockTimestamp
    },
    isASCOps,
    index,
    active,
    air,
    isTransaction,
    toggleOperationDetails,
    tableRefs,
    currentPage,
    sizePerPage,
    totalDataSize,
    isMobile
  } = _ref,
      detailInfo = Object(objectWithoutProperties["a" /* default */])(_ref.operation, ["id", "mainInfo", "objectInfo", "blockNumber", "trIndex", "opIndex", "number", "blockTimestamp"]);

  const goToBlock = e => {
    e.preventDefault();
    e.stopPropagation();
    router_default.a.push(RouterConstants["s" /* SSR_BLOCK_INFORMATION_PATH */], RouterConstants["c" /* BLOCK_INFORMATION_PATH */].replace(/:round/, block));
  };

  const getSenderLink = () => !mainInfo.from.name && external_echojs_lib_["validators"].isContractId(mainInfo.from.id) ? URLHelper["a" /* default */].createContractUrl(mainInfo.from.id) : URLHelper["a" /* default */].createAccountUrl(mainInfo.from.name);

  const goToLink = (e, href, objectId) => {
    e.preventDefault();
    e.stopPropagation();
    router_default.a.push(SsrHrefHelper["a" /* default */].getHrefByObjectId(objectId), href);
  };

  const renderSubject = subject => {
    if (!subject) return Row_jsx("div", {
      className: "td-in"
    }, "\u2014");
    if (external_echojs_lib_["validators"].isHex(subject) && subject.length === 40) return Row_jsx("span", {
      className: "td-in"
    }, Row_jsx("span", null, subject));
    return Row_jsx(link_default.a, {
      href: SsrHrefHelper["a" /* default */].getHrefByObjectId(subject)
    }, Row_jsx("a", {
      href: "",
      className: "td-in avatar-wrap",
      onClick: e => goToLink(e, URLHelper["a" /* default */].createUrlById(subject), subject)
    }, mainInfo.subject.name && Row_jsx(Avatar["a" /* default */], {
      accountName: subject
    }), Row_jsx("span", null, subject)));
  };

  const renderAmount = () => {
    if (!mainInfo.value.amount) return Row_jsx("div", {
      className: "td-in"
    }, "\u2014");
    const assetAmount = FormatHelper["a" /* default */].formatAmount(mainInfo.value.amount, mainInfo.value.precision);
    return Row_jsx("div", {
      className: "td-in"
    }, Row_jsx(external_rc_tooltip_default.a, {
      placement: "top",
      overlayClassName: "verify-contract-tooltip",
      trigger: ['hover'],
      overlay: assetAmount
    }, Row_jsx("span", {
      className: "value"
    }, assetAmount)), Row_jsx("span", {
      className: "currency"
    }, mainInfo.value.symbol));
  };

  const objectId = objectInfo ? objectInfo.get('id') : null;
  tableRefs[index] = external_react_default.a.createRef();
  const subjectValue = mainInfo.subject && (mainInfo.subject.name || mainInfo.subject.id);
  const numberOperationInPage = (currentPage - 1) * sizePerPage + index;
  let numberOperation = null;

  if (number !== '') {
    numberOperation = isASCOps ? numberOperationInPage + 1 : totalDataSize - numberOperationInPage;
  }

  if (numberOperation < 1) {
    return null;
  }

  return Row_jsx(external_react_default.a.Fragment, null, Row_jsx("tr", {
    className: external_classnames_default()('view', {
      active
    }),
    onClick: () => toggleOperationDetails(index),
    ref: tableRefs[index]
  }, Row_jsx("td", null), Row_jsx("td", {
    className: "number"
  }, Row_jsx("div", {
    className: "td-in"
  }, numberOperation, ".")), Row_jsx("td", {
    className: "type"
  }, Row_jsx("div", {
    className: "td-in"
  }, detailInfo.type)), Row_jsx("td", {
    className: "time",
    onClick: e => goToBlock(e)
  }, Row_jsx("div", {
    className: "td-in"
  }, Row_jsx("span", null, FormatHelper["a" /* default */].timestampToOperationRowTime(blockTimestamp)))), Row_jsx("td", {
    className: "sender"
  }, mainInfo.from.id ? Row_jsx(link_default.a, {
    href: SsrHrefHelper["a" /* default */].getHrefByObjectId(mainInfo.from.id)
  }, Row_jsx("a", {
    href: "",
    className: "td-in avatar-wrap",
    onClick: e => goToLink(e, getSenderLink(), mainInfo.from.id)
  }, mainInfo.from.name ? Row_jsx(Avatar["a" /* default */], {
    accountName: mainInfo.from.name
  }) : null, Row_jsx("span", null, mainInfo.from.name ? mainInfo.from.name : mainInfo.from.id))) : Row_jsx("div", {
    className: "td-in"
  }, "\u2014")), Row_jsx("td", {
    className: "reciever"
  }, renderSubject(subjectValue, mainInfo)), Row_jsx("td", {
    className: "amount"
  }, renderAmount()), Row_jsx("td", {
    className: "fee"
  }, Row_jsx("div", {
    className: "td-in"
  }, detailInfo.fee ? Row_jsx(external_react_default.a.Fragment, null, Row_jsx(external_rc_tooltip_default.a, {
    placement: "top",
    overlayClassName: "verify-contract-tooltip",
    trigger: ['hover'],
    overlay: FormatHelper["a" /* default */].formatAmount(detailInfo.fee.amount, detailInfo.fee.precision)
  }, Row_jsx("span", {
    className: "value"
  }, FormatHelper["a" /* default */].formatAmount(detailInfo.fee.amount, detailInfo.fee.precision))), Row_jsx("span", {
    className: "currency"
  }, detailInfo.fee.symbol)) : '-')), isTransaction && Row_jsx("td", {
    className: "dd"
  }, Row_jsx("div", {
    className: "td-in"
  }, Row_jsx("img", {
    src: curret_sm_default.a,
    alt: ""
  }))), Row_jsx("td", null)), active && Row_jsx("tr", {
    className: "fold"
  }, Row_jsx("td", null), Row_jsx("td", {
    colSpan: "8"
  }, Row_jsx(TransactionInfo_OperationInfo, {
    isMobile: isMobile,
    details: detailInfo,
    index: index,
    block: block,
    transaction: transactionNum,
    opIndex: opIndex,
    objId: objectId
  }), Row_jsx(TransactionInfo_ObjectInfo, {
    details: detailInfo,
    object: objectInfo
  })), Row_jsx("td", null)), air && Row_jsx("tr", {
    className: "air"
  }, Row_jsx("td", null)));
});
OperationsRow.defaultProps = {
  isTransaction: false
};
/* harmony default export */ var Row = (OperationsRow);
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__("rf6O");
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// CONCATENATED MODULE: ./src/components/OperationsTable/Thead.jsx
var Thead_jsx = external_react_default.a.createElement;


const OperationsThead = Object(external_react_["memo"])(({
  isTransaction
}) => Thead_jsx("thead", null, Thead_jsx("tr", null, Thead_jsx("td", null), Thead_jsx("td", {
  className: "number"
}, Thead_jsx("div", {
  className: "td-in"
}, "#")), Thead_jsx("td", {
  className: "type"
}, Thead_jsx("div", {
  className: "td-in"
}, "Operation")), Thead_jsx("td", {
  className: "date"
}, Thead_jsx("div", {
  className: "td-in"
}, "Date, Time")), Thead_jsx("td", {
  className: "sender"
}, Thead_jsx("div", {
  className: "td-in"
}, "Sender")), Thead_jsx("td", {
  className: "reciever"
}, Thead_jsx("div", {
  className: "td-in"
}, "Receiver")), Thead_jsx("td", {
  className: "amount"
}, Thead_jsx("div", {
  className: "td-in"
}, "Amount")), Thead_jsx("td", {
  className: "fee"
}, Thead_jsx("div", {
  className: "td-in"
}, "Fee")), isTransaction && Thead_jsx("td", null), Thead_jsx("td", null))));
OperationsThead.propTypes = {
  isTransaction: external_prop_types_default.a.bool
};
OperationsThead.defaultProps = {
  isTransaction: false
};
/* harmony default export */ var Thead = (OperationsThead);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/set.js
var set = __webpack_require__("ttDY");
var set_default = /*#__PURE__*/__webpack_require__.n(set);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var array_from = __webpack_require__("d04V");
var from_default = /*#__PURE__*/__webpack_require__.n(array_from);

// EXTERNAL MODULE: ./src/constants/TableConstants.js
var TableConstants = __webpack_require__("hgd8");

// CONCATENATED MODULE: ./src/components/Input/ClearBtn.jsx


var ClearBtn_jsx = external_react_default.a.createElement;


const ClearBtn = external_react_default.a.memo((_ref) => {
  let {
    onClearFocus,
    onClearBlur
  } = _ref,
      props = Object(objectWithoutProperties["a" /* default */])(_ref, ["onClearFocus", "onClearBlur"]);

  return ClearBtn_jsx("button", Object(esm_extends["a" /* default */])({}, props, {
    onFocus: onClearFocus,
    onBlur: onClearBlur,
    className: "clear-btn"
  }), ClearBtn_jsx("div", {
    className: "cear-btn-contnet"
  }, ClearBtn_jsx("svg", {
    width: "16",
    height: "15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, ClearBtn_jsx("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.37 0C4.27 0 .87 3.4.87 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5S12.47 0 8.37 0zm4.2 10.3l-1.4 1.4-2.8-2.8-2.8 2.8-1.4-1.4 2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8z"
  }))));
});
ClearBtn.propTypes = {
  onClearFocus: external_prop_types_default.a.func.isRequired,
  onClearBlur: external_prop_types_default.a.func.isRequired
};
/* harmony default export */ var Input_ClearBtn = (ClearBtn);
// CONCATENATED MODULE: ./src/components/Input/index.jsx


var Input_jsx = external_react_default.a.createElement;




const Input = (_ref) => {
  let {
    hundleClear,
    className,
    value,
    onChange,
    name
  } = _ref,
      props = Object(objectWithoutProperties["a" /* default */])(_ref, ["hundleClear", "className", "value", "onChange", "name"]);

  const {
    0: isFocused,
    1: setFocus
  } = Object(external_react_["useState"])(false);
  const input = Object(external_react_["useRef"])(null);

  const onClear = () => {
    input.current.focus();
    hundleClear(name);
  };

  return Input_jsx("div", {
    className: external_classnames_default()('input-wrapper', className)
  }, Input_jsx("input", Object(esm_extends["a" /* default */])({
    className: external_classnames_default()('input', {
      focus: isFocused,
      clerable: hundleClear,
      filled: value
    }),
    name: name,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    value: value,
    onChange: onChange,
    ref: input
  }, props)), hundleClear && value && Input_jsx(Input_ClearBtn, {
    onClearFocus: () => setFocus(true),
    onClearBlur: () => setFocus(false),
    onClick: () => onClear()
  }));
};

Input.defaultProps = {
  className: '',
  value: '',
  hundleClear: null,
  onChange: () => {}
};
/* harmony default export */ var components_Input = (Input);
// EXTERNAL MODULE: ./src/helpers/TypesHelper.js
var TypesHelper = __webpack_require__("9B1q");

// CONCATENATED MODULE: ./src/components/Button/index.jsx


var Button_jsx = external_react_default.a.createElement;



const Button = (_ref) => {
  let {
    children,
    className
  } = _ref,
      props = Object(objectWithoutProperties["a" /* default */])(_ref, ["children", "className"]);

  return Button_jsx("button", Object(esm_extends["a" /* default */])({}, props, {
    className: external_classnames_default()(className, 'btn')
  }), children);
};

Button.defaultProps = {
  className: 'primary-btn'
};
/* harmony default export */ var components_Button = (Button);
// CONCATENATED MODULE: ./src/components/Button/NextButton.jsx
var NextButton_jsx = external_react_default.a.createElement;

const NextButton = external_react_default.a.memo(() => NextButton_jsx("div", {
  className: "pg-arrow"
}, NextButton_jsx("div", {
  className: "pg-arrow-caption"
}, "Next"), NextButton_jsx("svg", {
  width: "4",
  height: "5",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, NextButton_jsx("path", {
  d: "M4 2.5L0 5V0l4 2.5z"
}))));
// CONCATENATED MODULE: ./src/components/Button/PrevButton.jsx
var PrevButton_jsx = external_react_default.a.createElement;

const PrevButton = external_react_default.a.memo(() => PrevButton_jsx("div", {
  className: "pg-arrow"
}, PrevButton_jsx("svg", {
  width: "4",
  height: "5",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, PrevButton_jsx("path", {
  d: "M4 2.5L0 5V0l4 2.5z"
})), PrevButton_jsx("div", {
  className: "pg-arrow-caption"
}, "Previous")));
// CONCATENATED MODULE: ./src/components/OperationsTable/Pagination.jsx



var Pagination_jsx = external_react_default.a.createElement;














const OperationsPagination = ({
  currentPage,
  totalDataSize,
  sizePerPage,
  router,
  from,
  to
}) => {
  const {
    url: pathname,
    query
  } = external_query_string_default.a.parseUrl(router.asPath);
  const {
    0: inputCurrentPage,
    1: setCurrentPage
  } = Object(external_react_["useState"])(currentPage);
  const {
    0: totalPages,
    1: setTotalPages
  } = Object(external_react_["useState"])(Math.ceil(totalDataSize / sizePerPage));
  const nextPageLink = URLHelper["a" /* default */].createOperationUrlByFilter(pathname, query, {
    p: currentPage + 1,
    from,
    to,
    l: sizePerPage
  });
  const prevPageLink = URLHelper["a" /* default */].createOperationUrlByFilter(pathname, query, {
    p: currentPage - 1,
    from,
    to,
    l: sizePerPage
  });
  const lastPageLink = URLHelper["a" /* default */].createOperationUrlByFilter(pathname, query, {
    p: totalPages,
    from,
    to,
    l: sizePerPage
  });

  const onChangeInputCurrentPage = value => setCurrentPage(value);

  const onKeyPressInputCurrentPage = e => {
    const code = e.keyCode || e.which;
    const {
      value
    } = e.target;

    if (GlobalConstants["j" /* KEY_CODE_ENTER */] !== code) {
      return;
    }

    if (!TypesHelper["a" /* default */].isStringNumber(value)) {
      return;
    }

    const newNumberPage = parse_int_default()(value, 10);

    if (!(newNumberPage > 0 && newNumberPage < totalPages + 1)) {
      return;
    }

    const linkToPage = URLHelper["a" /* default */].createOperationUrlByFilter(router.pathname, router.query, {
      p: newNumberPage,
      from,
      to,
      l: sizePerPage
    });
    router_default.a.push(router.route, linkToPage);
  };

  Object(external_react_["useEffect"])(() => {
    setCurrentPage(currentPage);
  }, [currentPage, sizePerPage]);
  Object(external_react_["useEffect"])(() => {
    setTotalPages(Math.ceil(totalDataSize / sizePerPage));
  }, [totalDataSize, sizePerPage]);

  const sizePerPages = from_default()(new set_default.a([...TableConstants["f" /* SIZES_PER_PAGE */], sizePerPage].sort((a, b) => a - b)));

  const goToPage = (e, link) => {
    e.preventDefault();
    router_default.a.push(router.route, link);
  };

  return Pagination_jsx("div", {
    className: "operations-pagination"
  }, Pagination_jsx("div", {
    className: "pg-nav-1"
  }, Pagination_jsx("div", {
    className: "pg-caption"
  }, "Operations per page:"), sizePerPages.map(size => {
    const link = URLHelper["a" /* default */].createOperationUrlByFilter(pathname, query, {
      l: size,
      p: 1,
      from,
      to
    });
    return Pagination_jsx(link_default.a, {
      key: size,
      href: router.route
    }, Pagination_jsx("a", {
      onClick: e => goToPage(e, link),
      href: link,
      className: external_classnames_default()('pg-page-btn', {
        active: size === sizePerPage
      })
    }, size));
  })), Pagination_jsx("div", {
    className: "pg-nav-2"
  }, Pagination_jsx("div", {
    className: "pg-caption"
  }, "Page:"), Pagination_jsx(components_Input, {
    name: "pg-input",
    className: "pg-input",
    placeholder: "page",
    value: inputCurrentPage.toString(),
    onChange: e => onChangeInputCurrentPage(e.target.value),
    onKeyDown: e => onKeyPressInputCurrentPage(e, totalPages)
  }), Pagination_jsx("div", {
    className: "pg-caption"
  }, "out of", !totalPages ? Pagination_jsx("span", null, " ", totalPages) : Pagination_jsx("a", {
    href: lastPageLink,
    onClick: e => goToPage(e, lastPageLink)
  }, " ", totalPages))), Pagination_jsx("div", {
    className: "pg-nav-3"
  }, !totalPages || currentPage === 1 ? Pagination_jsx(components_Button, {
    className: "primary-btn",
    disabled: true
  }, Pagination_jsx(PrevButton, null)) : Pagination_jsx("a", {
    href: prevPageLink,
    onClick: e => goToPage(e, prevPageLink),
    className: external_classnames_default()('pg-arrow', 'primary-btn')
  }, Pagination_jsx(PrevButton, null)), !totalPages || totalPages === currentPage ? Pagination_jsx(components_Button, {
    className: "primary-btn",
    disabled: true
  }, Pagination_jsx(NextButton, null)) : Pagination_jsx("a", {
    href: nextPageLink,
    onClick: e => goToPage(e, nextPageLink),
    className: external_classnames_default()('pg-arrow', 'primary-btn')
  }, Pagination_jsx(NextButton, null))));
};

OperationsPagination.defaultProps = {
  from: '',
  to: ''
};
/* harmony default export */ var Pagination = (OperationsPagination);
// CONCATENATED MODULE: ./src/components/OperationsTable/Filter.jsx
var Filter_jsx = external_react_default.a.createElement;




const OperationsFilter = external_react_default.a.memo(({
  open,
  onChangeFilter,
  from,
  to,
  onClearFilter
}) => Filter_jsx("div", {
  className: external_classnames_default()('operations-filter', {
    open
  })
}, Filter_jsx("div", {
  className: "operations-filter-wrap"
}, Filter_jsx("div", {
  className: "operations-filter-item"
}, Filter_jsx("span", {
  className: "operations-filter-caption"
}, "Sender"), Filter_jsx(components_Input, {
  name: "from",
  hundleClear: name => onClearFilter(name),
  value: from,
  onChange: e => onChangeFilter(e),
  placeholder: "Sender name"
})), Filter_jsx("div", {
  className: "operations-filter-item"
}, Filter_jsx("span", {
  className: "operations-filter-caption"
}, "Receiver"), Filter_jsx(components_Input, {
  name: "to",
  hundleClear: name => onClearFilter(name),
  value: to,
  onChange: e => onChangeFilter(e),
  placeholder: "Receiver name"
})))));
OperationsFilter.propTypes = {
  from: external_prop_types_default.a.string,
  to: external_prop_types_default.a.string,
  open: external_prop_types_default.a.bool.isRequired,
  onChangeFilter: external_prop_types_default.a.func.isRequired,
  onClearFilter: external_prop_types_default.a.func.isRequired
};
OperationsFilter.defaultProps = {
  from: '',
  to: ''
};
/* harmony default export */ var Filter = (OperationsFilter);
// EXTERNAL MODULE: ./src/components/Loader/index.jsx
var Loader = __webpack_require__("9eFo");

// CONCATENATED MODULE: ./src/components/OperationsTable/index.jsx


var OperationsTable_jsx = external_react_default.a.createElement;

















class OperationsTable_OperationsTable extends external_react_default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      showedOperations: [],
      airRows: [],
      isFilterOpen: false
    };
    this.timeoutSearch = null;
    this.toggleFilter = this.toggleFilter.bind(this);
    this.tableRefs = [];
    this.updateScroll = this.updateScroll.bind(this);
  }

  componentDidMount() {
    const {
      showedOperations
    } = this.state;
    const queryProps = external_query_string_default.a.parse(this.props.router.asPath.split('?')[1]); // eslint-disable-next-line react/no-did-mount-set-state

    this.setState({
      isFilterOpen: !!this.props.filterAndPaginateData.get('filters').from || !!this.props.filterAndPaginateData.get('filters').to,
      from: this.props.filterAndPaginateData.get('filters').from,
      to: this.props.filterAndPaginateData.get('filters').to
    });

    if (!queryProps.op) {
      return;
    }

    if (!TypesHelper["a" /* default */].isStringNumber(queryProps.op)) {
      router_default.a.push(RouterConstants["n" /* NOT_FOUND_PATH */]);
    }

    const op = parse_int_default()(queryProps.op, 10);

    if (!this.tableRefs[op - 1]) {
      return;
    }

    showedOperations.push(op - 1);
    this.setState({
      showedOperations
    }); // eslint-disable-line react/no-did-mount-set-state
  }

  async componentDidUpdate(prevProps) {
    const {
      loading,
      router: {
        asPath
      }
    } = this.props;
    const {
      loading: prevLoading,
      router: {
        asPath: asPrevPath
      }
    } = prevProps;
    const {
      query: search
    } = external_query_string_default.a.parseUrl(asPath);
    const {
      query: prevSearch
    } = external_query_string_default.a.parseUrl(asPrevPath);

    if (prevSearch.l !== search.l || prevSearch.p !== search.p || prevSearch.from !== search.from || prevSearch.to !== search.to) {
      await this.onChangeOperationFilters(search);
      return;
    }

    if (!loading && loading !== prevLoading) {
      if (!search.op || !this.tableRefs[search.op - 1]) {
        return;
      }

      this.tableRefs[search.op - 1].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    if (!search.op && prevSearch.op) {
      this.setState({
        showedOperations: []
      }); // eslint-disable-line react/no-did-update-set-state
    } else if (search.op && !prevSearch.op) {
      const {
        showedOperations
      } = this.state;

      const op = parse_int_default()(search.op, 10);

      showedOperations.push(op - 1); // eslint-disable-next-line react/no-did-update-set-state

      this.setState({
        showedOperations
      });
    }

    window.addEventListener('resize', this.updateScroll);
  }

  componentWillUnmount() {
    if (this.timeoutSearch) {
      clearTimeout(this.timeoutSearch);
    }

    window.removeEventListener('resize', this.updateScroll);
  }

  async onChangeFilter(e) {
    const {
      name,
      value
    } = e.target;
    const {
      filterAndPaginateData,
      router
    } = this.props;
    const {
      filters
    } = filterAndPaginateData.toJS();
    filters[name] = value;

    if (this.timeoutSearch) {
      clearTimeout(this.timeoutSearch);
    }

    this.setState({
      [name]: value
    });
    this.timeoutSearch = setTimeout(() => {
      const {
        url: pathname,
        query
      } = external_query_string_default.a.parseUrl(router.asPath);
      const linkToPage = URLHelper["a" /* default */].createOperationUrlByFilter(pathname, query, {
        from: filters.from.trim(),
        to: filters.to.trim(),
        p: 1
      });
      router_default.a.push(router.route, linkToPage);
    }, TableConstants["d" /* DEBOUNCE_TIMEOUT */]);
  }

  onClearFilter(name) {
    const {
      filterAndPaginateData,
      router
    } = this.props;
    const {
      filters
    } = filterAndPaginateData.toJS();
    filters[name] = '';

    if (this.timeoutSearch) {
      clearTimeout(this.timeoutSearch);
    }

    this.setState({
      [name]: ''
    });
    this.timeoutSearch = setTimeout(() => {
      const {
        url: pathname,
        query
      } = external_query_string_default.a.parseUrl(router.asPath);
      const linkToPage = URLHelper["a" /* default */].createOperationUrlByFilter(pathname, query, {
        from: filters.from,
        to: filters.to,
        p: 1
      });
      router_default.a.push(router.route, linkToPage);
    }, TableConstants["d" /* DEBOUNCE_TIMEOUT */]);
  }

  async onChangeOperationFilters(filters) {
    const {
      totalDataSize
    } = this.props.filterAndPaginateData.toJS();
    await this.props.initData(Object(objectSpread["a" /* default */])({}, filters, {
      totalDataSize
    }));
    this.props.onLoadMoreHistory();
  }

  updateScroll() {
    console.log('updte');

    if (this.scrollBarRef) {
      this.scrollBarRef.updateScroll();
    }
  }

  toggleOperationDetails(index) {
    const {
      operations
    } = this.props;
    const {
      asPath
    } = this.props.router;
    const [pathname, search] = asPath.split('?');
    const {
      showedOperations,
      airRows
    } = this.state;
    const queryProps = external_query_string_default.a.parse(search);
    const v = showedOperations.indexOf(index);

    if (!this.props.changeUrl && operations && operations.size) {
      const {
        blockNumber,
        type
      } = operations.get(index);
      const {
        trIndex,
        opIndex
      } = operations.get(index); // TODO delete in future

      if (Operations["e" /* default */].block_reward.name === type) {
        const transactionUrl = URLHelper["a" /* default */].createTransactionUrl(blockNumber, 1);
        router_default.a.push(RouterConstants["w" /* SSR_TRANSACTION_INFORMATION_PATH */], transactionUrl);
        return;
      }

      const transactionUrl = URLHelper["a" /* default */].createTransactionUrl(blockNumber, trIndex + 1);
      const operationUrl = URLHelper["a" /* default */].createTransactionOperationUrl(transactionUrl, opIndex + 1);
      router_default.a.push(RouterConstants["w" /* SSR_TRANSACTION_INFORMATION_PATH */], operationUrl);
      return;
    }

    if (v !== -1) {
      showedOperations.splice(v, 1);

      if (queryProps.op && parse_int_default()(queryProps.op, 10) - 1 === index) {
        router_default.a.push(RouterConstants["w" /* SSR_TRANSACTION_INFORMATION_PATH */], pathname);
      }

      [index - 1, index].forEach(i => {
        const airIndex = airRows.indexOf(i);

        if (airIndex !== -1) {
          airRows.splice(airIndex, 1);
        }
      });
    } else {
      showedOperations.push(index);
      router_default.a.push(RouterConstants["w" /* SSR_TRANSACTION_INFORMATION_PATH */], URLHelper["a" /* default */].createTransactionOperationUrl(pathname, index + 1));
    }

    if (showedOperations.includes(index) && airRows.indexOf(index - 1) === -1) {
      airRows.push(index - 1);
    }

    if (showedOperations.includes(index) && airRows.indexOf(index) === -1) {
      airRows.push(index);
    }

    this.setState({
      showedOperations,
      airRows
    });
  }

  toggleFilter(e) {
    const {
      isFilterOpen
    } = this.state;
    e.target.blur();
    this.setState({
      isFilterOpen: !isFilterOpen
    });
  }

  renderTable() {
    const {
      from,
      to
    } = this.state;
    const {
      isTransaction,
      label,
      loading,
      router,
      isMobile,
      isASCOps
    } = this.props;
    let {
      filterAndPaginateData
    } = this.props;
    const {
      showedOperations,
      airRows,
      isFilterOpen
    } = this.state;
    filterAndPaginateData = filterAndPaginateData.toJS();
    return OperationsTable_jsx("div", {
      className: "operations-table"
    }, OperationsTable_jsx(TableLabel["a" /* default */], {
      label: label
    }, OperationsTable_jsx(components_FilterBtn, {
      onClick: this.toggleFilter
    })), OperationsTable_jsx(Filter, {
      from: from,
      to: to,
      open: isFilterOpen,
      onChangeFilter: e => this.onChangeFilter(e),
      onClearFilter: name => this.onClearFilter(name)
    }), OperationsTable_jsx(external_react_perfect_scrollbar_default.a, {
      ref: ref => {
        this.scrollBarRef = ref;
      }
    }, OperationsTable_jsx("table", null, OperationsTable_jsx(Thead, {
      isTransaction: isTransaction
    }), OperationsTable_jsx("tbody", null, OperationsTable_jsx("tr", {
      className: "air"
    }, OperationsTable_jsx("td", null)), this.props.operations.map((op, i) => OperationsTable_jsx(Row, {
      isASCOps: isASCOps,
      isMobile: isMobile,
      totalDataSize: filterAndPaginateData.totalDataSize,
      sizePerPage: filterAndPaginateData.sizePerPage,
      currentPage: filterAndPaginateData.currentPage,
      key: i.toString(),
      isTransaction: isTransaction,
      operation: op,
      index: i,
      active: showedOperations.includes(i),
      air: airRows.includes(i),
      tableRefs: this.tableRefs,
      toggleOperationDetails: index => this.toggleOperationDetails(index)
    })))), loading && OperationsTable_jsx(Loader["a" /* default */], null)), !isTransaction && OperationsTable_jsx(Pagination, {
      from: filterAndPaginateData.filters.from,
      to: filterAndPaginateData.filters.to,
      router: router,
      totalDataSize: filterAndPaginateData.totalDataSize,
      currentPage: filterAndPaginateData.currentPage,
      sizePerPage: filterAndPaginateData.sizePerPage
    }));
  }

  render() {
    return this.renderTable();
  }

}

OperationsTable_OperationsTable.defaultProps = {
  label: 'Transactions',
  changeUrl: false,
  loading: false,
  isTransaction: false,
  onLoadMoreHistory: () => {}
};
/* harmony default export */ var components_OperationsTable = (OperationsTable_OperationsTable);
// EXTERNAL MODULE: ./src/actions/GridActions.js
var GridActions = __webpack_require__("Rt/o");

// CONCATENATED MODULE: ./src/containers/OperationsTable/index.jsx



/* harmony default export */ var containers_OperationsTable = __webpack_exports__["a"] = (Object(external_react_redux_["connect"])((state, props) => ({
  filterAndPaginateData: state.grid.get(props.gridName),
  isMobile: state.global.get('isMobile')
}), (dispatch, props) => ({
  initData: params => dispatch(GridActions["a" /* default */].initData(props.gridName, params)),
  onChangeFilter: params => dispatch(GridActions["a" /* default */].setFilter(props.gridName, params))
}))(components_OperationsTable));

/***/ }),

/***/ "A4BX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rE0f");
/* harmony import */ var _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("tKMe");






const DEFAULT_FIELDS = Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Map"])({
  error: '',
  blockInformation: new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"]({}),
  blocks: new immutable__WEBPACK_IMPORTED_MODULE_2__["OrderedMap"]({}),
  blocksCount: _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* PAGE_BLOCKS_COUNT */ "y"],
  loading: false,
  isDistributionRewardOpen: false,
  filteredOperations: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]([]),
  latestOperations: []
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'block',
  initialState: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(DEFAULT_FIELDS)), {
    set: {
      reducer: (state, {
        payload
      }) => {
        state = state.set(payload.field, payload.value);
        return state;
      }
    }
  })
}));

/***/ }),

/***/ "AGvI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("rf6O");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const TableLabel = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({
  label,
  children
}) => __jsx("div", {
  className: "table-label-wrap"
}, __jsx("h3", {
  className: "table-label"
}, label), children));
TableLabel.propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node
};
TableLabel.defaultProps = {
  label: '',
  children: null
};
/* harmony default export */ __webpack_exports__["a"] = (TableLabel);

/***/ }),

/***/ "AqEx":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyAKIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogd2lkdGg9IjVweCIgaGVpZ2h0PSI1cHgiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiICBmaWxsPSJyZ2IoMzEsIDYwLCA3NykiCiBkPSJNMi40OTEsMC45NjkgTDQuOTg2LDQuOTkyIEwtMC4wMDMsNC45OTIgTDIuNDkxLDAuOTY5IFoiLz4KPC9zdmc+"

/***/ }),

/***/ "BGkK":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/number/is-nan");

/***/ }),

/***/ "CAhU":
/***/ (function(module, exports) {

module.exports = require("utf8");

/***/ }),

/***/ "CV+1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rE0f");





const DEFAULT_FIELDS = Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Map"])({
  timeoutId: null,
  show: false,
  connect: false
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'internetPopup',
  initialState: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(DEFAULT_FIELDS)), {
    set: {
      reducer: (state, {
        payload
      }) => {
        state = state.set(payload.field, payload.value);
        return state;
      }
    },
    clearTimeout: {
      reducer: state => {
        clearTimeout(state.timeoutId);
        state = state.set('timeoutId', null);
        return state;
      }
    }
  })
}));

/***/ }),

/***/ "CZ53":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return validateContractName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return validateContractDescription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return validateContractIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkAccessVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isSidechainEthDeposit; });
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6BQ9");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("p0XB");
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_integer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("O+LL");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_integer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_is_integer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("moMR");
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(echojs_lib__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_TypeConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("PK5G");
/* harmony import */ var _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("tKMe");




/* eslint-disable no-underscore-dangle */




class ValidateHelper {
  static _validateInt(value, isUint, size = 256) {
    value = Number(value);
    if (!_babel_runtime_corejs2_core_js_number_is_integer__WEBPACK_IMPORTED_MODULE_2___default()(value)) return 'value should be integer';
    if (isUint && value < 0) return 'value should be unsigned integer';
    if (size % 8 !== 0) return 'various sizes should be in in steps of 8';
    const maxLimit = isUint ? 2 ** size - 1 : 2 ** (size - 1) - 1;
    const minLimit = isUint ? 0 : -(2 ** (size - 1));
    if (value > maxLimit && value < minLimit) return `value should be in ${isUint ? 'u' : ''}int${size} format`;
    return null;
  }

  static _validateString(value) {
    return typeof value === 'string' ? null : 'value should be a string';
  }

  static _validateAddress(value) {
    return echojs_lib__WEBPACK_IMPORTED_MODULE_3__["validators"].isObjectId(value) ? null : 'value should be in object id format';
  }

  static _validateBool(value) {
    return typeof value === 'boolean' ? null : 'value should be a boolean';
  }

  static _validateArray(value) {
    return _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1___default()(value) ? null : 'value should be an array';
  }

  static _validateBytes(value) {
    return typeof value === 'string' && _constants_TypeConstants__WEBPACK_IMPORTED_MODULE_4__[/* objectIdRegEx */ "b"].test(value) ? null : 'value should be a hex string';
  }

  static validateByType(value, type) {
    if (!value) return 'Value should not be empty';
    let method = null;
    let isUint = null;
    let size = null;
    let isBytesArray = false;
    const intMark = type.search('int');

    if (type.search('string') !== -1 || type.search('bytes32') !== -1) {
      method = this._validateString;
    } else if (type.search('address') !== -1) {
      method = this._validateAddress;
    } else if (type.search('bool') !== -1) {
      method = this._validateBool;
    } else if (type.search('byte') !== -1) {
      isBytesArray = type !== 'bytes';
      method = this._validateBytes;
    } else if (intMark !== -1) {
      method = this._validateInt;
      isUint = intMark === 1;
      const match = type.match(/\d+/);
      size = match && match[0];
    } else {
      return 'value could not be validated';
    }

    const arrayMark = type.search('\\[\\]');

    if (type.search('bool') !== -1) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        return `value should be a ${type}`;
      }
    }

    if (arrayMark !== -1 || isBytesArray) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        return `value should be an ${type} array`;
      }

      let error = this._validateArray(value);

      if (error) return error;
      value.some(v => {
        error = method(v, isUint, size);
        return error;
      });
      return error ? `in array ${error}` : error;
    }

    return method(value, isUint, size);
  }

}

/* harmony default export */ __webpack_exports__["b"] = (ValidateHelper);
/**
 * s
 * @param name
 * @returns {string|null}
 */

const validateContractName = name => {
  if (!name) {
    return 'Contract name should not be empty';
  }

  if (name.length < _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* MIN_LENGTH_CONTRACT_NAME */ "s"]) {
    return 'Contract name must be 2 characters or more';
  }

  if (name.length > _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* MAX_LENGTH_CONTRACT_NAME */ "o"]) {
    return 'Contract name must be 16 characters or less';
  }

  if (!name.match(/^[a-zA-Z0-9._ ]+$/)) {
    return 'Invalid symbols';
  }

  return null;
};
/**
 *
 * @param description
 * @returns {string|null}
 */

const validateContractDescription = description => {
  if (description.length > _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* MAX_LENGTH_CONTRACT_DESCRIPTION */ "n"]) {
    return 'Description must be less than 256 symbol.';
  }

  return null;
};
/**
 *
 * @param file
 * @returns {string|null}
 */

const validateContractIcon = file => {
  if (!file) {
    return 'Choose JPG, JPEG or PNG file.';
  }

  const {
    size,
    type
  } = file;

  if (!type.match(/(jpg|jpeg|png)/)) {
    return 'File should be JPG, JPEG or PNG.';
  }

  if (size > _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* KILO_BYTE */ "k"] * _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* MAX_KB_CONTRACT_ICON */ "m"]) {
    return `File should be less than ${_constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* MAX_KB_CONTRACT_ICON */ "m"]}KB`;
  }

  return null;
};
/**
 *
 * @param version
 * @param minAccessVersion
 * @returns {boolean}
 */

const checkAccessVersion = (version, minAccessVersion) => {
  const [major, minor, patch] = [...version.split('.')].map(part => _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(part, 10));
  const [minMajor, minMinor, minPatch] = [...minAccessVersion.split('.')].map(part => _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(part, 10));
  return !(minMajor > major || minMinor > minor || minPatch > patch);
};
/**
 * @method isSidechainEthDeposit
 * @param {string} value
 * @return {boolean}
 */

const isSidechainEthDeposit = value => {
  const regex = new RegExp(`^1\\.${echojs_lib__WEBPACK_IMPORTED_MODULE_3__["constants"].PROTOCOL_OBJECT_TYPE_ID.SIDECHAIN_ETH_DEPOSIT}\\.(0|[1-9]\\d*)$`);
  return regex.test(value);
};

/***/ }),

/***/ "DUps":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECHO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MONITORING_ASSETS; });
const ECHO = {
  ID: '1.3.0',
  SYMBOL: 'ECHO'
};
const MONITORING_ASSETS = [ECHO.ID];

/***/ }),

/***/ "EN0U":
/***/ (function(module, exports) {

module.exports = require("apollo-link-ws");

/***/ }),

/***/ "FMsK":
/***/ (function(module, exports) {

module.exports = require("rc-tooltip");

/***/ }),

/***/ "GBqj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pLtp");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants_ModalConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("j8VQ");
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("rE0f");







const DEFAULT_FIELDS = Object(immutable__WEBPACK_IMPORTED_MODULE_3__["Map"])({
  show: false
});
const INITIAL_STATE = Object(immutable__WEBPACK_IMPORTED_MODULE_3__["Map"])({
  [_constants_ModalConstants__WEBPACK_IMPORTED_MODULE_5__[/* MODAL_SUCCESS */ "e"]]: lodash__WEBPACK_IMPORTED_MODULE_4___default.a.cloneDeep(DEFAULT_FIELDS),
  [_constants_ModalConstants__WEBPACK_IMPORTED_MODULE_5__[/* MODAL_ERROR */ "c"]]: lodash__WEBPACK_IMPORTED_MODULE_4___default.a.cloneDeep(DEFAULT_FIELDS),
  [_constants_ModalConstants__WEBPACK_IMPORTED_MODULE_5__[/* MODAL_EXTENSION_INFO */ "d"]]: lodash__WEBPACK_IMPORTED_MODULE_4___default.a.cloneDeep(DEFAULT_FIELDS)
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_2__["createModule"])({
  name: 'modal',
  initialState: INITIAL_STATE,
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_4___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(DEFAULT_FIELDS)), {
    setIn: {
      reducer: (state, {
        payload
      }) => {
        _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(payload.params).forEach(field => {
          state = state.setIn([payload.type, field], payload.params[field]);
        });

        return state;
      }
    },
    open: {
      reducer: (state, {
        payload
      }) => {
        const {
          type,
          params
        } = payload;
        state = state.setIn([type, 'show'], true);

        _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(params).forEach(key => {
          state = state.setIn([type, key], params[key]);
        });

        return state;
      }
    },
    close: {
      reducer: state => {
        state = INITIAL_STATE;
        return state;
      }
    }
  })
}));

/***/ }),

/***/ "HiqY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getLatestOperationsFromGQL; });
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("txk1");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GraphqlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("xoST");


const getHistory = async ({
  subject,
  offset,
  count,
  operations,
  toFilter,
  fromFilter
}) => {
  const query = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
		query getSubjectOperations($subject: AccountOrContractOrAssetId!, $fromFilter: AccountOrContractOrAssetOrProposalId, $toFilter: AccountOrContractOrAssetOrProposalId, $offset: Int, $count: Int, $operations: [OperationIdEnum!]) {
			getSubjectOperations(subject: $subject, fromFilter: $fromFilter, toFilter: $toFilter, offset: $offset, count: $count, operations: $operations) {
			 	total
				items {
					id
					body
					result
					virtual
					trx_in_block
    				op_in_trx
					block {
						round
					}
					transaction {
						ref_block_num
						block {
							round
						}
					}
				}
			}
		}
	`;
  return _GraphqlService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getClient().query({
    query,
    variables: {
      subject,
      offset,
      count,
      operations,
      toFilter,
      fromFilter
    }
  }).then(({
    data
  }) => data.getSubjectOperations);
};
const getLatestOperationsFromGQL = async () => {
  const query = graphql_tag__WEBPACK_IMPORTED_MODULE_0___default.a`
	query getHistory{
		getHistory(count: 11, offset: 0){
			items {
				id
				body
				result
				virtual
				trx_in_block
				op_in_trx
				block {
					round
				}
				transaction {
					ref_block_num
						block {
							round
						}
					}
				}
			}
		}
	`;
  return _GraphqlService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getClient().query({
    query
  });
};

/***/ }),

/***/ "HxLW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rE0f");





const DEFAULT_FIELDS = new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"]({
  assets: null,
  delegationRate: 0,
  delegationRates: [],
  decentralizationRate: 0,
  decentralizationRates: [],
  operationCountRates: [],
  operationCount: 0,
  averageBlockTime: 0,
  currentFrozenData: {
    committee_freeze_sum: 0,
    accounts_freeze_sum: 0
  },
  frozenData: []
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'statistics',
  initialState: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(DEFAULT_FIELDS)))
}));

/***/ }),

/***/ "Jo+v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Z6Kq");

/***/ }),

/***/ "K073":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eVuF");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_ModalConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("j8VQ");
/* harmony import */ var _reducers_GlobalReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("uE89");
/* harmony import */ var _BaseActionsClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("f3j0");
/* harmony import */ var _ModalActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("OyDG");
/* harmony import */ var _services_BridgeService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Xmgq");
/* harmony import */ var _SocketActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("mOvZ");








class GlobalActionsClass extends _BaseActionsClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"] {
  /** Initialize reducer
   * @constructor
   */
  constructor() {
    super(_reducers_GlobalReducer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
  }
  /**
   *  Actions after init app
   * @returns {function(*): *}
   */


  afterInit() {
    return () => new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
      _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.all([// Load data after start page
      ]).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }
  /**
   * Init app
   * @returns {function(*=): Promise<any>}
   */


  init() {
    return (dispatch, getState) => new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(resolve => {
      const connect = getState().global.get('connectedServer') ? _SocketActions__WEBPACK_IMPORTED_MODULE_6__[/* partialClientConnect */ "c"] : _SocketActions__WEBPACK_IMPORTED_MODULE_6__[/* fullClientInit */ "b"];

      _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.all([dispatch(connect())]).then(data => {
        dispatch(this.afterInit()).then(() => {
          resolve(data);
        });
      }).catch(error => {
        resolve(error);
      });
    });
  }
  /**
   * @method incrementHistoryLength
   * @return {function(...[*]=)}
   */


  incrementHistoryLength() {
    return (dispatch, getState) => {
      dispatch(this.setValue('historyLength', getState().global.get('historyLength') + 1));
    };
  }
  /**
   * @method updateHistoryPath
   * @param {string} newPath
   * @param {string} newRoute
   * @return {function(...[*]=)}
   */


  updateHistoryPath(newPath, newRoute) {
    return dispatch => {
      dispatch(this.setValue('history', {
        path: newPath,
        route: newRoute
      }));
    };
  }
  /**
   * Set title browser tab
   * @param title
   * @returns {Function}
   */


  setTitle(title) {
    return dispatch => {
      dispatch(this.setValue('title', title));
    };
  }
  /**
   * Show not found screen
   * @returns {function(*=): Promise<any>}
   */


  toggleErrorPath(value) {
    return dispatch => {
      dispatch(this.setValue('errorPath', value));
    };
  }
  /**
   * Show error screen
   * @returns {function(*=): Promise<any>}
   */


  toggleErrorScreen(value) {
    return dispatch => {
      dispatch(this.setValue('errorScreen', value));
    };
  }

  checkAccessToBridge() {
    return async dispatch => {
      if (!_services_BridgeService__WEBPACK_IMPORTED_MODULE_5__[/* BridgeService */ "a"].isExist()) {
        dispatch(_ModalActions__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].openModal(_constants_ModalConstants__WEBPACK_IMPORTED_MODULE_1__[/* MODAL_EXTENSION_INFO */ "d"], {}));
        return false;
      }

      const access = await _services_BridgeService__WEBPACK_IMPORTED_MODULE_5__[/* BridgeService */ "a"].getAccess();

      if (!access) {
        dispatch(_ModalActions__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].openModal(_constants_ModalConstants__WEBPACK_IMPORTED_MODULE_1__[/* MODAL_ERROR */ "c"], {
          title: 'No access'
        }));
        return false;
      }

      return true;
    };
  }

}

const GlobalActions = new GlobalActionsClass();
/* harmony default export */ __webpack_exports__["a"] = (GlobalActions);

/***/ }),

/***/ "K2gz":
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "KI45":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "LR/J":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("SWa5");

/***/ }),

/***/ "LX0d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Xql+");

/***/ }),

/***/ "Lc87":
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),

/***/ "Loka":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/values");

/***/ }),

/***/ "O+LL":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("btkE");

/***/ }),

/***/ "Oapj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("pLtp");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js
var parse_int = __webpack_require__("6BQ9");
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/map.js
var map = __webpack_require__("LX0d");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/entries.js
var entries = __webpack_require__("LR/J");
var entries_default = /*#__PURE__*/__webpack_require__.n(entries);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("eVuF");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: external "echojs-lib"
var external_echojs_lib_ = __webpack_require__("moMR");
var external_echojs_lib_default = /*#__PURE__*/__webpack_require__.n(external_echojs_lib_);

// EXTERNAL MODULE: external "immutable"
var external_immutable_ = __webpack_require__("nuGg");
var external_immutable_default = /*#__PURE__*/__webpack_require__.n(external_immutable_);

// EXTERNAL MODULE: external "bignumber.js"
var external_bignumber_js_ = __webpack_require__("d/Cm");
var external_bignumber_js_default = /*#__PURE__*/__webpack_require__.n(external_bignumber_js_);

// EXTERNAL MODULE: ./src/constants/GlobalConstants.js
var GlobalConstants = __webpack_require__("tKMe");

// EXTERNAL MODULE: ./src/constants/ModalConstants.js
var ModalConstants = __webpack_require__("j8VQ");

// EXTERNAL MODULE: ./src/reducers/AccountReducer.js
var AccountReducer = __webpack_require__("0pkP");

// EXTERNAL MODULE: ./src/actions/GlobalActions.js
var GlobalActions = __webpack_require__("K073");

// EXTERNAL MODULE: ./src/actions/BaseActionsClass.js
var BaseActionsClass = __webpack_require__("f3j0");

// EXTERNAL MODULE: ./src/actions/ModalActions.js
var ModalActions = __webpack_require__("OyDG");

// EXTERNAL MODULE: ./src/actions/TransactionActions.js + 2 modules
var TransactionActions = __webpack_require__("St2Q");

// EXTERNAL MODULE: ./src/services/BridgeService.js
var BridgeService = __webpack_require__("Xmgq");

// EXTERNAL MODULE: external "graphql-tag"
var external_graphql_tag_ = __webpack_require__("txk1");
var external_graphql_tag_default = /*#__PURE__*/__webpack_require__.n(external_graphql_tag_);

// EXTERNAL MODULE: ./src/services/GraphqlService.js + 1 modules
var GraphqlService = __webpack_require__("xoST");

// CONCATENATED MODULE: ./src/services/queries/balance.js


const getBalances = async accounts => {
  const query = external_graphql_tag_default.a`
		query getBalances($accounts: [AccountId!]!) {
			getBalances(accounts: $accounts) {
				type
				amount
				account {
					id
				}
				contract {
					id
					type
					token {
						symbol
						decimals
					}
				}
			}
		}
	`;
  return GraphqlService["a" /* default */].getClient().query({
    query,
    variables: {
      accounts
    }
  });
};
// EXTERNAL MODULE: ./src/services/queries/history.js
var queries_history = __webpack_require__("HiqY");

// EXTERNAL MODULE: ./src/constants/TableConstants.js
var TableConstants = __webpack_require__("hgd8");

// EXTERNAL MODULE: ./src/actions/GridActions.js
var GridActions = __webpack_require__("Rt/o");

// CONCATENATED MODULE: ./src/services/queries/account.js


const getTotalAccountHistory = accountId => {
  const query = external_graphql_tag_default.a`
		query getHistory($accountId: AccountId!) {
			getHistory(accounts: [$accountId]) {
				total
			}
		}
	`;
  return GraphqlService["a" /* default */].getClient().query({
    query,
    variables: {
      accountId
    }
  }).then(({
    data
  }) => data.getHistory);
};
// CONCATENATED MODULE: ./src/actions/AccountActions.js






















class AccountActions_AccountActions extends BaseActionsClass["a" /* default */] {
  /** Set reducer
   * @constructor
   */
  constructor() {
    super(AccountReducer["a" /* default */]);
  }
  /**
   * Format account history
   * @param {String} accountId
   * @param {Array} transactions
   * @returns {function}
   */


  async formatAccountHistory(accountId, transactions) {
    await TransactionActions["a" /* default */].fetchTransactionsObjects(transactions);
    let accountHistory = transactions.map(async t => {
      const {
        op: operation,
        result
      } = t;
      const block = await external_echojs_lib_default.a.api.getBlock(t.block_num);
      return TransactionActions["a" /* default */].getOperation(operation, t.block_num, block ? block.timestamp : null, t.trx_in_block, t.op_in_trx, result, null, accountId, t.id);
    });
    accountHistory = await promise_default.a.all(accountHistory);
    return accountHistory.filter(t => t);
  }
  /**
   * Get account info
   * @param {string} id
   * @returns {function}
   */


  getAccountInfo(id) {
    return async dispatch => {
      if (!external_echojs_lib_["validators"].isAccountId(id) && !external_echojs_lib_["validators"].isAccountName(id)) {
        dispatch(GlobalActions["a" /* default */].toggleErrorPath(true));
        return;
      }

      dispatch(this.setValue('loading', true));

      try {
        const [account] = await external_echojs_lib_default.a.api.getFullAccounts([id]);

        if (!account) {
          dispatch(GlobalActions["a" /* default */].toggleErrorPath(true));
          return;
        }

        const objectIds = entries_default()(account.balances).reduce((arr, b) => [...arr, ...b], []);

        let objects = await external_echojs_lib_default.a.api.getObjects(objectIds);
        objects = objects.reduce((result, item) => result.set(item.id, Object(external_immutable_["fromJS"])(item)), new map_default.a());
        const filteredObjects = Object(external_immutable_["fromJS"])(account.balances).reduce((map, s, a) => map.set(a, objects.get(a)).set(s, objects.get(s)), external_immutable_default.a.Map({}));
        const balanceToSave = Object(external_immutable_["fromJS"])(account.balances).mapEntries(([assetId, statsId]) => [assetId, {
          asset: filteredObjects.get(assetId),
          amount: filteredObjects.getIn([statsId, 'balance']),
          id: filteredObjects.getIn([statsId, 'id'])
        }]);
        const {
          total: totalAccountHistory
        } = await getTotalAccountHistory(account.id);
        await dispatch(this.loadAccountHistory(account.id));
        dispatch(GlobalActions["a" /* default */].setTitle(GlobalConstants["z" /* TITLE_TEMPLATES */].ACCOUNT.replace(/name/, account.name)));
        dispatch(this.setMultipleValue({
          id: account.id,
          balances: balanceToSave,
          echoAccountInfo: Object(external_immutable_["fromJS"])(account)
        }));
        const balances = await getBalances([account.id]);
        const tokens = balances.data.getBalances.filter(balanceItem => balanceItem.type === GlobalConstants["A" /* TOKEN_TYPE */] && !new external_bignumber_js_default.a(balanceItem.amount).isEqualTo(0));
        dispatch(this.setMultipleValue({
          tokens,
          totalAccountHistory
        }));
      } catch (e) {
        dispatch(this.setValue('error', e.message));
      } finally {
        dispatch(this.setValue('loading', false));
      }
    };
  }
  /**
   * @method formatHistoryFromEchoDB
   * @param history
   * @return {*}
   */


  formatHistoryFromEchoDB(history) {
    return history.map(data => {
      const operationId = parse_int_default()(data.id, 10);

      return {
        id: operationId,
        op: [operationId, data.body],
        result: [0, data.result],
        block_num: data.transaction ? data.transaction.block.round : data.block.round,
        trx_in_block: data.trx_in_block,
        op_in_trx: data.op_in_trx,
        virtual_op: 0
      };
    });
  }
  /**
   * Load account history
   * @param {string} accountId
   * @returns {function}
   */


  loadAccountHistory(accountId) {
    return async (dispatch, getState) => {
      try {
        const queryData = getState().grid.get(TableConstants["a" /* ACCOUNT_GRID */]).toJS();
        dispatch(this.setValue('loadingMoreHistory', true));
        const subject = accountId;

        const getObjectId = async objectId => {
          if (!objectId) {
            return null;
          }

          if (external_echojs_lib_["validators"].isContractId(objectId)) {
            return objectId;
          }

          let account = null;

          try {
            account = await external_echojs_lib_default.a.api.getAccountByName(objectId.trim());

            if (account) {
              account = account.id;
            } // eslint-disable-next-line no-empty

          } catch (err) {}

          return account;
        };

        const [fromFilter, toFilter] = await promise_default.a.all([getObjectId(queryData.filters.from), getObjectId(queryData.filters.to)]);
        const {
          items,
          total
        } = await Object(queries_history["a" /* getHistory */])({
          subject,
          fromFilter: fromFilter || undefined,
          toFilter: toFilter || undefined,
          offset: (queryData.currentPage - 1) * queryData.sizePerPage,
          count: queryData.sizePerPage,
          operations: keys_default()(external_echojs_lib_["OPERATIONS_IDS"])
        });
        dispatch(GridActions["a" /* default */].setTotalDataSize(TableConstants["a" /* ACCOUNT_GRID */], total));
        let transactions = this.formatHistoryFromEchoDB(items);
        transactions = await this.formatAccountHistory(accountId, transactions);
        dispatch(this.setValue('history', new external_immutable_["List"](transactions)));
      } catch (e) {
        dispatch(this.setValue('error', e.message));
      } finally {
        dispatch(this.setValue('loadingMoreHistory', false));
      }
    };
  }

  loadActiveAccount() {
    return async dispatch => {
      if (!BridgeService["a" /* BridgeService */].isExist()) return;
      const account = BridgeService["a" /* BridgeService */].loadActiveAccount();
      dispatch(this.setActiveAccount(account));
    };
  }

  checkActiveAccount() {
    return async (dispatch, getState) => {
      const activeAccountId = getState().global.getIn(['activeAccount', 'id']);

      if (!activeAccountId) {
        const account = await BridgeService["a" /* BridgeService */].getAccount();

        if (!account) {
          dispatch(ModalActions["a" /* default */].openModal(ModalConstants["c" /* MODAL_ERROR */], {
            title: 'No accounts'
          }));
          return false;
        }

        dispatch(this.setActiveAccount(account));
        return true;
      }

      return true;
    };
  }

  setActiveAccount(account) {
    return dispatch => {
      dispatch(GlobalActions["a" /* default */].setValue('activeAccount', Object(external_immutable_["fromJS"])(account)));
    };
  }

  incTotalAccountHistory() {
    return (dispatch, getState) => {
      const totalAccountHistory = getState().account.get('totalAccountHistory');
      dispatch(this.setValue('totalAccountHistory', totalAccountHistory + 1));
    };
  }

}

/* harmony default export */ var actions_AccountActions = __webpack_exports__["a"] = (new AccountActions_AccountActions());

/***/ }),

/***/ "OyDG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _reducers_ModalReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("GBqj");
/* harmony import */ var _BaseActionsClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("f3j0");



class ModalActionsClass extends _BaseActionsClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"] {
  /** Initialize reducer
   * @constructor
   */
  constructor() {
    super(_reducers_ModalReducer__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
  }
  /**
   * Open modal
   * @param {String} type
   * @param params
   * @param {object} type
   */


  openModal(type, params) {
    return dispatch => {
      dispatch(this.reducer.actions.open({
        type,
        params
      }));
    };
  }
  /**
   * Close modal
   */


  closeModal() {
    return dispatch => {
      dispatch(this.reducer.actions.close());
    };
  }

}

const ModalActions = new ModalActionsClass();
/* harmony default export */ __webpack_exports__["a"] = (ModalActions);

/***/ }),

/***/ "Oyez":
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),

/***/ "P5f7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function rewriteUrlForNextExport(url) {
  const [pathname, hash] = url.split('#'); // tslint:disable-next-line

  let [path, qs] = pathname.split('?');
  path = path.replace(/\/$/, ''); // Append a trailing slash if this path does not have an extension

  if (!/\.[^/]+\/?$/.test(path)) path += `/`;
  if (qs) path += '?' + qs;
  if (hash) path += '#' + hash;
  return path;
}

exports.rewriteUrlForNextExport = rewriteUrlForNextExport;

/***/ }),

/***/ "PK5G":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return commaNumberRepresentationRegEx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return stringNumberRegEx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return startWithLetterRegEx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return objectIdRegEx; });
const commaNumberRepresentationRegEx = /^([1-9]{1}[0-9]{0,2}((,|\.)[0-9]{3})*)$/;
const stringNumberRegEx = /^(0|[1-9]\d*)$/;
const startWithLetterRegEx = /^([a-zA-Z]{1}.*)$/;
const objectIdRegEx = /^[0-9a-fA-F]+$/;

/***/ }),

/***/ "PnyD":
/***/ (function(module, exports) {

module.exports = require("react-media");

/***/ }),

/***/ "Q5ih":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("moMR");
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(echojs_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Z2WM");
/* harmony import */ var _constants_SearchConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("oZ+S");




class SsrHrefHelper {
  /**
   * @method getSsrPathByObjectId
   * @param {string} id
   * @return {string} href
   */
  static getHrefByObjectId(id) {
    let href;

    if (echojs_lib__WEBPACK_IMPORTED_MODULE_0__["validators"].isAccountName(id) || echojs_lib__WEBPACK_IMPORTED_MODULE_0__["validators"].isAccountId(id)) {
      href = _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* SSR_ACCOUNTS_PATH */ "q"];
    } else if (echojs_lib__WEBPACK_IMPORTED_MODULE_0__["validators"].isContractId(id)) {
      href = _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* SSR_CONTRACT_PATH */ "u"];
    } else if (echojs_lib__WEBPACK_IMPORTED_MODULE_0__["validators"].isAssetId(id)) {
      href = _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* SSR_ASSET_PATH */ "r"];
    } else {
      href = _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* OBJECTS_PATH */ "o"];
    }

    return href;
  }
  /**
   * @method getHrefByTypeSection
   * @param {string} section
   * @return {string} href
   */


  static getHrefByTypeSection(section) {
    switch (section) {
      case _constants_SearchConstants__WEBPACK_IMPORTED_MODULE_2__[/* TYPE_SEARCH_SECTION */ "d"].ACCOUNT:
        return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* SSR_ACCOUNTS_PATH */ "q"];

      case _constants_SearchConstants__WEBPACK_IMPORTED_MODULE_2__[/* TYPE_SEARCH_SECTION */ "d"].BLOCK:
        return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* SSR_BLOCK_INFORMATION_PATH */ "s"];

      case _constants_SearchConstants__WEBPACK_IMPORTED_MODULE_2__[/* TYPE_SEARCH_SECTION */ "d"].ASSET:
        return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* SSR_ASSET_PATH */ "r"];

      case _constants_SearchConstants__WEBPACK_IMPORTED_MODULE_2__[/* TYPE_SEARCH_SECTION */ "d"].CONTRACT:
        return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* SSR_CONTRACT_PATH */ "u"];

      case _constants_SearchConstants__WEBPACK_IMPORTED_MODULE_2__[/* TYPE_SEARCH_SECTION */ "d"].ERC_20:
        return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* SSR_CONTRACT_PATH */ "u"];

      default:
        return _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_1__[/* OBJECTS_PATH */ "o"];
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (SsrHrefHelper);

/***/ }),

/***/ "R2Q7":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/array/is-array");

/***/ }),

/***/ "RfFk":
/***/ (function(module, exports) {

module.exports = require("react-perfect-scrollbar");

/***/ }),

/***/ "Rt/o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GridActionsClass */
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6BQ9");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("eVuF");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers_GridReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("wRB0");
/* harmony import */ var _BaseActionsClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("f3j0");
/* harmony import */ var _constants_TableConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("hgd8");
/* harmony import */ var _helpers_TypesHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("9B1q");



/* eslint-disable no-underscore-dangle */




class GridActionsClass extends _BaseActionsClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"] {
  /** Initialize reducer
   * @constructor
   */
  constructor() {
    super(_reducers_GridReducer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
  }

  clearTimeout(gridName) {
    return (dispatch, getState) => {
      const state = getState();
      const loadingTimeout = state.grid.getIn([gridName, 'loadingTimeout']);
      clearTimeout(loadingTimeout);
      dispatch(this.setValue([gridName, 'loadingTimeout'], null));
    };
  }
  /**
   * @method initData
   * @param {String} gridName
   * @param {Object} params
   * @return {function(*, *)}
   */


  initData(gridName, params = {}) {
    return dispatch => new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a(resolve => {
      const sizePerPage = _helpers_TypesHelper__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].isStringNumber(params.l) ? _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(params.l, 10) : _constants_TableConstants__WEBPACK_IMPORTED_MODULE_4__[/* DEFAULT_SIZE_PER_PAGE */ "e"];
      const currentPage = _helpers_TypesHelper__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].isStringNumber(params.p) ? _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(params.p, 10) : 1;
      const transformParams = {
        totalDataSize: params.totalDataSize || 0,
        sizePerPage,
        currentPage,
        filters: {
          from: params.from || '',
          to: params.to || ''
        }
      };
      dispatch(this.reducer.actions.initData({
        gridName,
        params: transformParams
      }));
      resolve();
    });
  }
  /**
   * Set total data size
   * @param {String} gridName
   * @param {Object} totalDataSize
   * @return {function(*, *)}
   */


  setTotalDataSize(gridName, totalDataSize) {
    return dispatch => {
      dispatch(this.reducer.actions.setTotalDataSize({
        gridName,
        totalDataSize
      }));
    };
  }
  /**
   * Set page
   * @param {String} gridName
   * @param {Number} currentPage
   * @return {function(*, *)}
   */


  setPage(gridName, currentPage) {
    return dispatch => {
      dispatch(this.reducer.actions.setPage({
        gridName,
        currentPage
      }));
    };
  }
  /**
   * Set number of row on the page
   * @param {String} gridName
   * @param {Number} value
   * @return {function(*, *)}
   */


  setPageSize(gridName, value) {
    return dispatch => {
      dispatch(this.setValue([gridName, 'sizePerPage'], value));
    };
  }
  /**
   * Set sort
   * @param {String} gridName
   * @param {String} field
   * @param {String} destination asc|desc
   * @return {function(*, *)}
   */


  setSort(gridName, field, destination) {
    return dispatch => {
      dispatch(this.reducer.actions.setSort({
        gridName,
        field,
        destination
      }));
    };
  }
  /**
   * Set filter by field
   * @param {String} gridName
   * @param {Object} params
   * @return {function(*, *)}
   */


  setFilter(gridName, params) {
    return dispatch => new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a(resolve => {
      dispatch(this.reducer.actions.setFilter({
        gridName,
        params
      }));
      resolve();
    });
  }
  /**
   * Get page options
   * @param {String} gridName
   */


  getPageOptions(gridName) {
    return (dispatch, getState) => {
      const state = getState();
      const options = {
        count: state.grid.getIn([gridName, 'sizePerPage']),
        offset: state.grid.getIn([gridName, 'offset'])
      };

      if (state.grid.getIn([gridName, 'currentPage']) !== 1) {
        options.currentPage = state.grid.getIn([gridName, 'currentPage']);
      }

      return options;
    };
  }
  /**
   * Get sort
   * @param {String} gridName
   */


  getSort(gridName) {
    return (dispatch, getState) => {
      const state = getState();
      return {
        sortBy: state.grid.getIn([gridName, 'sort', 'field']),
        sortDestination: state.grid.getIn([gridName, 'sort', 'destination'])
      };
    };
  }
  /**
   * Get filters by state
   * @param {String} gridName
   */


  getFilters(gridName) {
    return (dispatch, getState) => {
      const state = getState();
      return state.grid.getIn([gridName, 'filters']);
    };
  }
  /**
   * Clear by field
   * @param {String} gridName
   */


  clearByField(gridName) {
    return dispatch => {
      dispatch(this.reducer.actions.clearByField({
        gridName
      }));
    };
  }
  /**
   * Clear error by field
   * @param {Array} field
   * @returns {Function}
   */


  clearError(field) {
    return (dispatch, getState) => {
      const state = getState();
      const error = state.grid.getIn(field);

      if (error) {
        dispatch(this.setValue(field, ''));
      }
    };
  }

}
const GridActions = new GridActionsClass();
/* harmony default export */ __webpack_exports__["a"] = (GridActions);

/***/ }),

/***/ "SWa5":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/entries");

/***/ }),

/***/ "SqZg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("o5io");

/***/ }),

/***/ "St2Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/entries.js
var entries = __webpack_require__("LR/J");
var entries_default = /*#__PURE__*/__webpack_require__.n(entries);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js
var object_assign = __webpack_require__("UXZV");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js + 1 modules
var objectSpread = __webpack_require__("zrwo");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("p0XB");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js
var parse_int = __webpack_require__("6BQ9");
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("eVuF");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/values.js
var values = __webpack_require__("2wwy");
var values_default = /*#__PURE__*/__webpack_require__.n(values);

// EXTERNAL MODULE: external "echojs-lib"
var external_echojs_lib_ = __webpack_require__("moMR");
var external_echojs_lib_default = /*#__PURE__*/__webpack_require__.n(external_echojs_lib_);

// EXTERNAL MODULE: external "immutable"
var external_immutable_ = __webpack_require__("nuGg");

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__("YLtl");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: external "bignumber.js"
var external_bignumber_js_ = __webpack_require__("d/Cm");
var external_bignumber_js_default = /*#__PURE__*/__webpack_require__.n(external_bignumber_js_);

// EXTERNAL MODULE: ./src/constants/Operations.js
var Operations = __webpack_require__("59hC");

// CONCATENATED MODULE: ./src/constants/ResultTypeConstants.js
const CONTRACT_RESULT_TYPE_0 = 0;
const CONTRACT_RESULT_TYPE_1 = 1;
// EXTERNAL MODULE: ./src/constants/GlobalConstants.js
var GlobalConstants = __webpack_require__("tKMe");

// EXTERNAL MODULE: ./src/constants/ObjectPrefixesConstants.js
var ObjectPrefixesConstants = __webpack_require__("oOqk");

// CONCATENATED MODULE: ./src/helpers/ConvertHelper.js



class ConvertHelper_ConvertHelper {
  static toContractId(address) {
    return `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.${parse_int_default()(address.substr(-32), 16)}`;
  }

}

/* harmony default export */ var helpers_ConvertHelper = (ConvertHelper_ConvertHelper);
// EXTERNAL MODULE: ./src/helpers/FormatHelper.js
var FormatHelper = __webpack_require__("bXzB");

// EXTERNAL MODULE: ./src/helpers/TypesHelper.js
var TypesHelper = __webpack_require__("9B1q");

// EXTERNAL MODULE: ./src/reducers/TransactionReducer.js
var TransactionReducer = __webpack_require__("oqxO");

// EXTERNAL MODULE: ./src/actions/BaseActionsClass.js
var BaseActionsClass = __webpack_require__("f3j0");

// EXTERNAL MODULE: ./src/actions/GlobalActions.js
var GlobalActions = __webpack_require__("K073");

// EXTERNAL MODULE: ./src/services/queries/contract.js
var queries_contract = __webpack_require__("4LdG");

// EXTERNAL MODULE: ./src/actions/GridActions.js
var GridActions = __webpack_require__("Rt/o");

// EXTERNAL MODULE: ./src/constants/TableConstants.js
var TableConstants = __webpack_require__("hgd8");

// CONCATENATED MODULE: ./src/actions/TransactionActions.js








/* eslint-disable camelcase */


















class TransactionActions_TransactionActionsClass extends BaseActionsClass["a" /* default */] {
  /** Initialize reducer
   * @constructor
   */
  constructor() {
    super(TransactionReducer["a" /* default */]);
  }
  /**
   * Fetch deep transaction object ids for requests optimization
   * @method fetchTransactionsObjects
   * @param transactions
   * @returns {Promise<void>}
   */


  async fetchTransactionsObjects(transactions) {
    const deepExtract = (data, result) => values_default()(data).reduce((ids, id) => {
      if (external_echojs_lib_["validators"].isObjectId(id) && !result.includes(id)) {
        ids.push(id);
        return ids;
      }

      if (typeof id === 'object' && id !== null) {
        ids = ids.concat(deepExtract(id, ids));
      }

      return ids;
    }, []);

    let blocks = [];
    const objectIds = transactions.reduce((resultIds, tx) => {
      const data = tx.op ? tx.op[1] : tx[1];
      blocks.push(tx.block_num);
      const operationIds = deepExtract(data, resultIds).filter(id => !resultIds.includes(id));
      return resultIds.concat(operationIds);
    }, []);
    blocks = blocks.reduce((resultBlocks, b, index, currentBlocks) => {
      const blocksCount = currentBlocks.reduce((count, curBlock) => curBlock === b ? count + 1 : count, 0);

      if (blocksCount !== 1 && !resultBlocks.includes(b)) {
        resultBlocks.push(b);
      }

      return resultBlocks;
    }, []);
    await promise_default.a.all(blocks.map(b => external_echojs_lib_default.a.api.getBlock(b)));
    await external_echojs_lib_default.a.api.getObjects(objectIds);
  }
  /**
   *
   * @param id
   * @returns {function(*, *): Map<string, any>}
   */


  async setContractObject(id) {
    try {
      const {
        contractInfo
      } = await Object(queries_contract["b" /* getContractInfo */])(id);
      const {
        type,
        eth_accuracy: ethAccuracy
      } = contractInfo;
      let {
        supported_asset_id: supportedAsset
      } = contractInfo;

      if (supportedAsset !== null) {
        supportedAsset = (await external_echojs_lib_default.a.api.getObject(supportedAsset)).symbol;
      }

      const chainContract = await external_echojs_lib_default.a.api.getContract(id);
      return new external_immutable_["Map"]({}).set('type', chainContract.type && chainContract.type.toUpperCase()).set('supportedAsset', supportedAsset).set('ethAccuracy', ethAccuracy ? 'Activated' : 'Inactivated').set('erc20', type && type === 'erc20' ? 'Yes' : 'No').set('bytecode', chainContract[1].code);
    } catch (e) {
      return null;
    }
  }
  /**
   * account, asset, committee, proposal
   * @param operation
   * @param options
   * @param from
   * @param subject
   * @returns {Function}
   */


  async setOperationObject(operation, options, from, subject) {
    let object = new external_immutable_["Map"]({});

    try {
      if (Operations["a" /* accountOperations */].includes(operation.name)) {
        let account = await external_echojs_lib_default.a.api.getObject(from.id);

        if (operation.name === Operations["e" /* default */].account_create.name) {
          account = await external_echojs_lib_default.a.api.getObject(subject.id);
        }

        const activeAccounts = await promise_default.a.all(account.active.account_auths.map(async ([id]) => {
          const acc = await external_echojs_lib_default.a.api.getObject(id);
          return acc && acc.name;
        }));
        const accounts = await external_echojs_lib_default.a.api.getObjects([account.registrar, account.options.delegating_account]);
        object = object.set('id', account.id).set('name', account.name).set('echorandKey', account.echorand_key).set('activeAccounts', activeAccounts).set('activeKeys', account.active.key_auths.map(([key]) => key)).set('registrar', accounts[0] && accounts[0].name).set('delegating', accounts[1] && accounts[1].name);
      } else if (Operations["b" /* assetOperations */].includes(operation.name)) {
        let assetId = null;

        if (operation.options.asset) {
          assetId = external_lodash_default.a.get(options, operation.options.asset);
        }

        const asset = await external_echojs_lib_default.a.api.getObject(assetId || subject.id);
        const issuer = await external_echojs_lib_default.a.api.getObject(asset.issuer);
        object = object.set('id', asset.id).set('name', asset.symbol).set('type', 'No').set('price', new external_bignumber_js_default.a(asset.options.core_exchange_rate.quote.amount).div(asset.options.core_exchange_rate.base.amount).toString()).set('issuer', issuer && issuer.name).set('precision', asset.precision).set('totalSupply', asset.dynamic.current_supply).set('maxSupply', asset.options.max_supply);
      } else if (Operations["c" /* committeeOperations */].includes(operation.name)) {
        const committee = await external_echojs_lib_default.a.api.getObject(subject.id);
        const committeeMemberAccount = await external_echojs_lib_default.a.api.getObject(committee.committee_member_account);
        object = object.set('id', committee.id).set('account', committeeMemberAccount && committeeMemberAccount.name).set('votes', committee.total_votes).set('url', committee.url);
      } else if (Operations["f" /* proposalOperations */].includes(operation.name)) {
        const proposal = await external_echojs_lib_default.a.api.getObject(subject.id);
        const operations = options.proposed_ops.map(([opType]) => {
          const op = values_default()(Operations["e" /* default */]).find(i => i.value === opType);

          return op && op.name;
        });
        object = object.set('id', proposal && proposal.id).set('expirationTime', options.expiration_time).set('operations', operations);
      }

      return object;
    } catch (e) {
      return null;
    }
  }
  /**
   *
   * @param {Object} log
   * @param {Object} data
   * @param {String} symbol
   * @returns {Promise.<{from: {id: string}, subject: {id: string}, value: {amount: string, symbol: string}, label: string}>}
   */


  async parseTransferEvent({
    log,
    data
  }, symbol = '', precision = 0, label) {
    const [, hexFrom, hexTo] = log;
    const value = {
      amount: new external_bignumber_js_default.a(data, 16).toString(10),
      symbol,
      precision
    };

    const fromInt = parse_int_default()(hexFrom.slice(26), 16);

    const toInt = parse_int_default()(hexTo.slice(26), 16);

    let from = {
      id: `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.${fromInt}`
    };
    let to = {
      id: `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.${toInt}`
    };

    if (hexFrom[25] === '0') {
      const id = `${ObjectPrefixesConstants["a" /* ACCOUNT_OBJECT_PREFIX */]}.${fromInt}`;
      const {
        name
      } = await external_echojs_lib_default.a.api.getObject(id);
      from = {
        id,
        name
      };
    }

    if (hexTo[25] === '0') {
      const id = `${ObjectPrefixesConstants["a" /* ACCOUNT_OBJECT_PREFIX */]}.${toInt}`;
      const {
        name
      } = await external_echojs_lib_default.a.api.getObject(id);
      to = {
        id,
        name
      };
    }

    return {
      from,
      subject: to,
      value,
      label
    };
  }
  /**
   *
   * @param {Object} log
   * @param {Object} data
   * @param {String} symbol
   * @param {String} contractId
   * @returns {Promise.<{from: {id: string}, subject: {id: string}, value: {amount: string, symbol: string}, label: string}>}
   */


  async parseWithdrawalEvent({
    log,
    data
  }, symbol = '', precision = 0, label, contractId, isReverse) {
    const [, hex] = log;
    const value = {
      amount: new external_bignumber_js_default.a(data, 16).toString(10),
      symbol,
      precision
    };

    const toInt = parse_int_default()(hex.slice(26), 16);

    let account = {
      id: `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.${toInt}`
    };
    const contract = {};
    contract.id = contractId;

    if (hex[25] === '0') {
      const id = `${ObjectPrefixesConstants["a" /* ACCOUNT_OBJECT_PREFIX */]}.${toInt}`;
      const {
        name
      } = await external_echojs_lib_default.a.api.getObject(id);
      account = {
        id,
        name
      };
    }

    const from = isReverse ? account : contract;
    const to = isReverse ? contract : account;
    return {
      from,
      subject: to,
      value,
      label
    };
  }

  async getPrecision(contractId) {
    const rawResult = await external_echojs_lib_default.a.api.callContractNoChangingState(contractId, GlobalConstants["t" /* NATHAN */].ID, {
      asset_id: GlobalConstants["f" /* ECHO_ASSET */].ID,
      amount: 0
    }, GlobalConstants["g" /* ERC20_HASHES */]['decimals()']);
    if (rawResult === '') return 0;
    return parse_int_default()(rawResult, 16);
  }
  /**
   *
   * @param {Array} data
   * @param {String} accountId
   * @param {Number} round
   * @param {Number} trIndex
   * @param {Number} opIndex
   * @param {Array} operationResult
   * @param {String} id
   * @returns {Promise.<{type: *, fee: {amount, precision, symbol}, from: {id: string}, subject: {id: string}, name, value: {}, status: boolean}>}
   */


  async formatOperation(data, accountId = undefined, round = undefined, trIndex = undefined, opIndex = undefined, operationResult = [], id = undefined, timestamp = undefined) {
    const [type, operation] = data;
    const [, resId] = operationResult;

    const {
      name,
      options
    } = values_default()(Operations["e" /* default */]).find(i => i.value === type);

    const result = {
      type,
      from: {
        id: ''
      },
      subject: {
        id: ''
      },
      name,
      value: {},
      status: true,
      round,
      trIndex,
      id,
      timestamp
    };

    if (operation.fee) {
      const feeAsset = await external_echojs_lib_default.a.api.getObject(operation.fee.asset_id);
      result.fee = {
        amount: operation.fee.amount,
        precision: feeAsset.precision,
        symbol: feeAsset.symbol
      };
    }

    if (options.from) {
      if (is_array_default()(options.from)) {
        if (options.from[1]) {
          const request = external_lodash_default.a.get(operation, options.from[0]);

          const response = await external_echojs_lib_default.a.api.getObject(request);
          result.from = {
            id: request,
            name: response[options.from[1]]
          };
        } else {
          result.from = {
            id: operation[options.from[0]]
          };
        }
      } else {
        const request = external_lodash_default.a.get(operation, options.from);

        const response = await external_echojs_lib_default.a.api.getObject(request);
        result.from = {
          id: request
        };

        if (response) {
          result.from.name = response.name;
        }
      }
    }

    if (options.subject) {
      if (options.subject[1]) {
        const request = external_lodash_default.a.get(operation, options.subject[0]);

        const response = await external_echojs_lib_default.a.api.getObject(request);
        result.subject = {
          id: request,
          name: response[options.subject[1]]
        };
      } else if (!external_echojs_lib_["validators"].isObjectId(operation[options.subject[0]])) {
        const request = external_lodash_default.a.get(operation, options.subject[0]);

        let response = null;

        switch (options.subject[0]) {
          case 'name':
            response = await external_echojs_lib_default.a.api.getAccountByName(request);
            break;

          case 'symbol':
            [response] = await external_echojs_lib_default.a.api.lookupAssetSymbols([request]);
            break;

          default:
            response = request;
            break;
        }

        result.subject = {
          id: response.id,
          name: request
        };
      } else {
        result.subject = {
          id: operation[options.subject[0]]
        };
      }
    }

    if (options.value) {
      result.value = Object(objectSpread["a" /* default */])({}, result.value, {
        amount: external_lodash_default.a.get(operation, options.value)
      });
    }

    if (options.asset) {
      const request = external_lodash_default.a.get(operation, options.asset);

      const response = await external_echojs_lib_default.a.api.getObject(request);
      result.value = Object(objectSpread["a" /* default */])({}, result.value, {
        precision: response.precision,
        symbol: response.symbol
      });
    } else {
      result.value.precision = GlobalConstants["f" /* ECHO_ASSET */].PRECISION;
      result.value.symbol = GlobalConstants["f" /* ECHO_ASSET */].SYMBOL;
    } // filter sub-operations by account


    if (accountId && ![result.from.id, result.subject.id].includes(accountId) && !round) {
      return null;
    }

    if (resId && external_echojs_lib_["validators"].isContractResultId(resId) && (type === external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_CREATE || type === external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_CALL)) {
      let contractResult;

      try {
        contractResult = await external_echojs_lib_default.a.api.getContractResult(resId);
      } catch (error) {
        result.status = true;
        return result;
      }

      const [contractResultType, contractResultObject] = contractResult;
      let log;
      let newContractAddress;

      if (contractResultType === CONTRACT_RESULT_TYPE_0) {
        const {
          exec_res: {
            excepted,
            new_address
          }
        } = contractResultObject;
        ({
          log
        } = contractResultObject.tr_receipt);
        result.status = excepted === 'None';

        if (new_address && !result.subject.id) {
          newContractAddress = `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.${parse_int_default()(new_address.slice(2), 16)}`;
        }
      } else {
        result.status = true;
      }

      if ([external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_CALL, external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_CREATE].includes(type) && round) {
        const contractId = newContractAddress || result.subject.id;
        let contractHistory = [];

        try {
          contractHistory = await external_echojs_lib_default.a.api.getContractHistory(contractId);
        } catch (e) {//
        }

        let internalOperations = contractHistory.filter(i => i.block_num === round && i.trx_in_block === trIndex && i.op_in_trx === opIndex && [external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_INTERNAL_CREATE, external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_INTERNAL_CALL].includes(i.op[0])).map(({
          op
        }) => this.formatOperation(op, accountId));
        internalOperations = await promise_default.a.all(internalOperations);
        internalOperations = internalOperations.filter(op => op).filter(op => op.value && op.value.amount && !new external_bignumber_js_default.a(op.value.amount).eq(0)).map((op, i) => Object(objectSpread["a" /* default */])({}, op, {
          name: i === 0 ? 'Asset transfer' : ''
        }));
        let internalTransactions = [...internalOperations];
        let code = '';

        try {
          [, {
            code
          }] = await external_echojs_lib_default.a.api.getContract(contractId);
        } catch (e) {//
        }

        if (log && is_array_default()(log) && TypesHelper["a" /* default */].isErc20Contract(code)) {
          const symbol = FormatHelper["a" /* default */].toUtf8((await external_echojs_lib_default.a.api.callContractNoChangingState(contractId, GlobalConstants["t" /* NATHAN */].ID, {
            asset_id: GlobalConstants["f" /* ECHO_ASSET */].ID,
            amount: 0
          }, GlobalConstants["g" /* ERC20_HASHES */]['symbol()'])).slice(128));
          const precision = await this.getPrecision(contractId);
          let internalTransfers = log.filter(({
            address
          }) => `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.${parse_int_default()(address.slice(2), 16)}` === contractId);
          const internalTransfersTransfer = internalTransfers.filter(({
            log: logs
          }) => logs[0].startsWith(GlobalConstants["g" /* ERC20_HASHES */]['Transfer(address,address,uint256)'])).map((event, i) => this.parseTransferEvent(event, symbol, precision, i === 0 ? 'Token transfer' : ''));
          const internalTransfersApproval = internalTransfers.filter(({
            log: logs
          }) => logs[0].startsWith(GlobalConstants["g" /* ERC20_HASHES */]['Approval(address,address,uint256)'])).map((event, i) => this.parseTransferEvent(event, symbol, precision, i === 0 ? 'Token approval' : ''));
          const internalTransfersWithdrawal = internalTransfers.filter(({
            log: logs
          }) => logs[0].startsWith(GlobalConstants["g" /* ERC20_HASHES */]['Withdrawal(address, uint256)'])).map((event, i) => this.parseWithdrawalEvent(event, symbol, precision, i === 0 ? 'Token withdrawal' : '', contractId, false));
          const internalTransfersDeposit = internalTransfers.filter(({
            log: logs
          }) => logs[0].startsWith(GlobalConstants["g" /* ERC20_HASHES */]['Deposit(address, uint256)'])).map((event, i) => this.parseWithdrawalEvent(event, symbol, precision, i === 0 ? 'Token deposit' : '', contractId, true));
          internalTransfers = [...internalTransfersTransfer, ...internalTransfersApproval, ...internalTransfersWithdrawal, ...internalTransfersDeposit];
          internalTransfers = await promise_default.a.all(internalTransfers);
          internalTransactions = [...internalTransfers, ...internalTransactions];
        }

        result.internal = internalTransactions.map(i => ({
          from: i.from,
          subject: i.subject,
          value: assign_default()({
            amount: 0,
            symbol: GlobalConstants["f" /* ECHO_ASSET */].SYMBOL,
            precision: GlobalConstants["f" /* ECHO_ASSET */].PRECISION
          }, i.value ? i.value : {}),
          label: i.label || i.name
        }));
      }
    }

    if (!result.value && result.internal && result.internal[0] && result.internal[0].value) {
      result.value = result.internal[0].value;
    }

    return result;
  }

  async getOperation([type, options], blockNumber, blockTimestamp, trIndex, opIndex, operationResult, number = null, accountId = null, trId = null) {
    const operation = values_default()(Operations["e" /* default */]).find(i => i.value === type);

    delete options.memo;
    delete options.extensions;
    delete options.gasPrice;
    delete options.eth_accuracy;
    const {
      from,
      subject,
      value: opValue,
      asset: opAsset,
      internal
    } = await this.formatOperation([type, options], accountId, blockNumber, trIndex, opIndex, operationResult);
    let objectInfo = await this.setOperationObject(operation, options, from, subject, opIndex);
    options = entries_default()(options).map(async ([key, value]) => {
      let link = null;

      switch (typeof value) {
        case 'number':
          value = {
            precision: GlobalConstants["f" /* ECHO_ASSET */].PRECISION,
            symbol: GlobalConstants["f" /* ECHO_ASSET */].SYMBOL,
            amount: value
          };
          break;

        case 'string':
          if (value === '') {
            return {};
          }

          if (external_echojs_lib_["validators"].isAccountId(value) || external_echojs_lib_["validators"].isAssetId(value)) {
            const object = await external_echojs_lib_default.a.api.getObject(value);
            link = value;
            value = external_echojs_lib_["validators"].isAccountId(value) ? object.name : object.symbol;
          }

          break;

        case 'object':
          if (external_lodash_default.a.has(value, 'amount') && value.asset_id) {
            const asset = await external_echojs_lib_default.a.api.getObject(value.asset_id);
            delete value.asset_id;
            value.precision = asset.precision;
            value.symbol = asset.symbol;
          } else {
            return {};
          }

          break;

        case 'boolean':
          value = value ? 'Yes' : 'No';
          break;

        default:
          break;
      }

      switch (key) {
        case 'code':
          key = 'bytecode';
          break;

        case 'callee':
          key = 'contract id';
          link = value;
          break;

        default:
          break;
      }

      return {
        [key]: link ? {
          value,
          link
        } : value
      };
    });
    options = await promise_default.a.all(options);
    options = options.reduce((obj, op) => Object(objectSpread["a" /* default */])({}, obj, op), {});

    if ([external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_CREATE, external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_CALL].includes(type)) {
      if (internal) {
        options['token transfers'] = internal;
      }

      try {
        const [, resultId] = operationResult;
        const [contractResultType, result] = await external_echojs_lib_default.a.api.getContractResult(resultId);

        if (contractResultType === CONTRACT_RESULT_TYPE_0) {
          const {
            exec_res: {
              excepted,
              code_deposit,
              new_address
            },
            tr_receipt: {
              log
            }
          } = result;
          options.excepted = external_lodash_default.a.startCase(excepted);
          options['code deposit'] = code_deposit;

          if (parse_int_default()(new_address, 10)) {
            const id = helpers_ConvertHelper.toContractId(new_address);
            options['new contract id'] = {
              value: id,
              link: id
            };
          }

          if (log.length) {
            options.logs = log.map(({
              address,
              data,
              log: topics
            }) => {
              const convertedContract = helpers_ConvertHelper.toContractId(address);
              return {
                topics,
                contract: convertedContract,
                data
              };
            });
          }
        } // eslint-disable-next-line no-empty

      } catch (error) {}
    }

    if (options['new contract id']) {
      objectInfo = await this.setContractObject(options['new contract id'].value, opIndex);
    } else if (options.caller) {
      objectInfo = await this.setContractObject(options.caller);
    } else if (options['contract id']) {
      objectInfo = await this.setContractObject(options['contract id'].value);
    }

    let result = null;

    switch (type) {
      case external_echojs_lib_["OPERATIONS_IDS"].CONTRACT_CREATE:
        if (options['new contract id']) {
          result = options['new contract id'].value;
        } else {
          [, result] = operationResult;
        }

        break;

      case external_echojs_lib_["OPERATIONS_IDS"].ACCOUNT_CREATE:
        result = options.Name;
        break;

      default:
        [, result] = operationResult;
        break;
    }

    return Object(objectSpread["a" /* default */])({
      mainInfo: {
        from,
        subject,
        asset: opAsset,
        value: opValue,
        result
      },
      objectInfo,
      type: operation.name
    }, options, {
      blockNumber,
      id: trId,
      trIndex,
      number,
      blockTimestamp,
      opIndex
    });
  }

  getTransaction(blockNumber, index) {
    return async dispatch => {
      dispatch(this.setValue('loading', true));

      try {
        const block = await external_echojs_lib_default.a.api.getBlock(blockNumber);

        if (!block || !block.transactions[index - 1]) {
          dispatch(GlobalActions["a" /* default */].toggleErrorPath(true));
          return;
        }

        const transaction = block.transactions[index - 1];
        await this.fetchTransactionsObjects(transaction.operations);
        let operations = transaction.operations.map(async (operation, opIndex) => {
          const op = await this.getOperation(operation, parse_int_default()(blockNumber, 10), block.timestamp, index - 1, opIndex, transaction.operation_results[opIndex]);
          return op;
        });
        operations = await promise_default.a.all(operations);
        dispatch(GridActions["a" /* default */].setTotalDataSize(TableConstants["g" /* TRANSACTION_GRID */], operations.length));
        dispatch(this.setValue('operations', new external_immutable_["List"](operations)));
      } catch (err) {
        dispatch(this.setValue('error', FormatHelper["a" /* default */].formatError(err)));
      } finally {
        dispatch(this.setValue('loading', false));
      }
    };
  }

}

/* harmony default export */ var TransactionActions = __webpack_exports__["a"] = (new TransactionActions_TransactionActionsClass());

/***/ }),

/***/ "TG1l":
/***/ (function(module, exports) {

module.exports = require("apollo-link-http");

/***/ }),

/***/ "TUA0":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "UED3":
/***/ (function(module, exports) {

module.exports = require("redux-modules-middleware");

/***/ }),

/***/ "UXZV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("dGr4");

/***/ }),

/***/ "W+0S":
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "WKeQ":
/***/ (function(module, exports) {

module.exports = require("redux-modules");

/***/ }),

/***/ "X8zi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ROUND_STARTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BLOCK_PRODUCED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GC_STARTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BBA_STARTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BLOCK_APPLIED_CALLBACK; });
/* unused harmony export PRODUCING_TIP */
/* unused harmony export GC_TIP */
/* unused harmony export BBA_TIP */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return rounderSteps; });
/* unused harmony export GC_START_DELAY */
/* unused harmony export PRODUCED_DELAY */
/* unused harmony export PROGRESS_STATUS */
/* unused harmony export DONE_STATUS */
const ROUND_STARTED = 'round_started';
const BLOCK_PRODUCED = 'block_produced';
const GC_STARTED = 'gc_started';
const BBA_STARTED = 'bba_started';
const BLOCK_APPLIED_CALLBACK = 'block_applied_callback';
const PRODUCING_TIP = 'On this stage, the system choose accounts who will propose the next block and wait for this block from selected producers';
const GC_TIP = 'This is the first round of consensus - Graded Consensus. Nodes who were chosen by the system for verifying block choose the best candidate';
const BBA_TIP = 'Chosen verifiers should reach an agreement to apply the new block';
const rounderSteps = {
  [ROUND_STARTED]: {
    status: ROUND_STARTED,
    title: 'Waiting for proposals'
  },
  [BLOCK_PRODUCED]: {
    status: BLOCK_PRODUCED,
    title: 'Producing block'
  },
  [GC_STARTED]: {
    status: GC_STARTED,
    title: 'Verifying block: GC'
  },
  [BBA_STARTED]: {
    status: BBA_STARTED,
    title: 'Verifying block: BBA'
  },
  [BLOCK_APPLIED_CALLBACK]: {
    status: BLOCK_APPLIED_CALLBACK,
    title: 'Waiting for txs'
  }
};
const GC_START_DELAY = 800;
const PRODUCED_DELAY = 1000;
const PROGRESS_STATUS = 'progress';
const DONE_STATUS = 'done';

/***/ }),

/***/ "Xmgq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BridgeService; });
class BridgeService {
  static loadActiveAccount() {
    return {
      id: window.echojslib.extension.activeAccount
    };
  }

  static isExist() {
    return !!window.echojslib && !!window.echojslib.extension;
  }

  static subscribeSwitchAccount(cb) {
    if (!BridgeService.isExist()) return;
    window.echojslib.extension.subscribeSwitchAccount(account => {
      if (!account) return;
      cb(account);
    });
  }

  static unsubscribeSwitchAccount() {// if (!BridgeService.isExist()) return;
    // window.echojslib.extension.unscribeSwitchAccount(cb);
  }

  static async getAccount() {
    const {
      activeAccount
    } = window.echojslib.extension;

    if (!activeAccount) {
      const allAccount = await this.getAllAcounts();
      return !allAccount || allAccount.length === 0 ? null : allAccount[0];
    }

    return {
      id: activeAccount
    };
  }

  static getAllAcounts() {
    return window.echojslib.extension.getAccounts();
  }

  static getAccess() {
    return window.echojslib.extension.getAccess();
  }

  static proofOfAuthority(message, activeAccountId) {
    return window.echojslib.extension.proofOfAuthority(message, activeAccountId);
  }

}

/***/ }),

/***/ "Xql+":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/map");

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YLtl":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "YTqd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = (normalizedRoute.replace(/\/$/, '') || '/').replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^\/]+?)\\\](?=\/|$)/g, (_, $1) => (groups[$1 // Un-escape key
  .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1')] = groupIndex++, '/([^/]+?)'));
  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  };
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "Z2WM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return INDEX_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BLOCK_INFORMATION_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return TRANSACTION_INFORMATION_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACCOUNTS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CONTRACT_PATH; });
/* unused harmony export CONTRACT_PATH_DETAIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CONTRACT_BYTECODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CONTRACT_TRANSACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CONTRACT_BALANCES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CONTRACT_ABI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CONTRACT_SOURCE_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return UPLOAD_ABI_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return OBJECTS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ASSET_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return NOT_FOUND_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return VERIFY_CONTRACT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return MANAGE_CONTRACT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return NODE_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return SSR_BLOCK_INFORMATION_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return SSR_ACCOUNTS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return SSR_ASSET_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return SSR_TRANSACTION_INFORMATION_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return SSR_CONTRACT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return SSR_UPLOAD_ABI_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return SSR_VERIFY_CONTRACT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return SSR_MANAGE_CONTRACT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return SSR_CONTRACT_DETAILS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CONTRACT_DETAILS_NUMBERS_TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return ROUTES_WITH_COLUMN_DIRECTION; });
const INDEX_PATH = '/';
const BLOCK_INFORMATION_PATH = '/blocks/:round';
const TRANSACTION_INFORMATION_PATH = '/blocks/:round/:index';
const ACCOUNTS_PATH = '/accounts/:id/info';
const CONTRACT_PATH = '/contracts/:id/info/';
const CONTRACT_PATH_DETAIL = '/contracts/:id/info/:detail?';
const CONTRACT_BYTECODE = 'bytecode';
const CONTRACT_TRANSACTIONS = 'transactions';
const CONTRACT_BALANCES = 'balances';
const CONTRACT_ABI = 'abi';
const CONTRACT_SOURCE_CODE = 'source-code';
const UPLOAD_ABI_PATH = '/contracts/:id/upload-abi';
const OBJECTS_PATH = '/objects';
const ASSET_PATH = '/assets/:id/info';
const NOT_FOUND_PATH = '/not-found';
const VERIFY_CONTRACT_PATH = '/contracts/:id/verify';
const MANAGE_CONTRACT_PATH = '/contracts/:id/manage';
const NODE_MAP = '/node-map';
const SSR_BLOCK_INFORMATION_PATH = '/blocks/[round]';
const SSR_ACCOUNTS_PATH = '/accounts/[id]/info';
const SSR_ASSET_PATH = '/assets/[id]/info';
const SSR_TRANSACTION_INFORMATION_PATH = '/blocks/[round]/[index]';
const SSR_CONTRACT_PATH = '/contracts/[id]/info/';
const SSR_UPLOAD_ABI_PATH = '/contracts/[id]/upload-abi';
const SSR_VERIFY_CONTRACT_PATH = '/contracts/[id]/verify';
const SSR_MANAGE_CONTRACT_PATH = '/contracts/[id]/manage';
const SSR_CONTRACT_DETAILS_PATH = '/contracts/[id]/info/[detail]';
const CONTRACT_DETAILS_NUMBERS_TAB = {
  [CONTRACT_TRANSACTIONS]: 1,
  [CONTRACT_BYTECODE]: 2,
  [CONTRACT_BALANCES]: 3,
  [CONTRACT_ABI]: 4,
  [CONTRACT_SOURCE_CODE]: 5
};
const ROUTES_WITH_COLUMN_DIRECTION = [INDEX_PATH];

/***/ }),

/***/ "Z6Kq":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "aBjG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("/T1H");
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("K2gz");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _public_images_default_avatar_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("xCUU");
/* harmony import */ var _public_images_default_avatar_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_public_images_default_avatar_svg__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const SvgAvatar = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(() => __webpack_require__.e(/* import() */ 18).then(__webpack_require__.bind(null, "//oX")), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("//oX")],
    modules: ['./svgAvatar']
  }
});

class Avatar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static updateAccountName(props) {
    return {
      accountName: props.accountName
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      avatarSize: null,
      accountName: ''
    };
    this.imageRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.listener = this.updateAvatarSize.bind(this);
  }

  componentDidMount() {
    this.updateAvatarSize();
    window.addEventListener('resize', this.listener);
    window.addEventListener('load', this.listener);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      accountName
    } = prevState;

    if (accountName !== nextProps.accountName && nextProps.accountName || nextProps.reset) {
      return Avatar.updateAccountName(nextProps);
    }

    return null;
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.reset) return true;
    if (nextProps.loading) return false;
    if (nextProps.accountName.length === 0) return false;
    if (this.state.accountName === nextProps.accountName) return false;
    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  }

  updateAvatarSize() {
    if (!this.imageRef.current) {
      return;
    }

    const avatarSize = this.imageRef.current.offsetHeight;

    if (avatarSize !== this.state.avatarSize) {
      this.setState({
        avatarSize
      });
    }
  }

  render() {
    const {
      round
    } = this.props;
    const {
      avatarSize,
      accountName
    } = this.state;
    return __jsx("div", {
      ref: this.imageRef,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('avatar-image', {
        round
      })
    }, !accountName ? __jsx("img", {
      src: _public_images_default_avatar_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
      alt: "avatar"
    }) : __jsx(SvgAvatar, {
      accountName: accountName,
      avatarSize: avatarSize
    }));
  }

}

Avatar.defaultProps = {
  accountName: '',
  round: false,
  loading: false,
  reset: true
};
/* harmony default export */ __webpack_exports__["a"] = (Avatar);

/***/ }),

/***/ "aC71":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

/***/ }),

/***/ "bXzB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9Jkg");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("v7Px");
/* harmony import */ var _babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("p0XB");
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("6BQ9");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d/Cm");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var utf8__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("CAhU");
/* harmony import */ var utf8__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(utf8__WEBPACK_IMPORTED_MODULE_7__);









class FormatHelper {
  static toFixed(value, precision) {
    return value.toFixed(precision).toString(10);
  }
  /**
   *
      * @param {String|Number|BN} amount
      * @param {Number} precision
      * @param {String} symbol
      * @returns {string}
      */


  static formatAmount(amount, precision = 0, symbol) {
    const number = new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(amount).div(10 ** precision);
    const base = `${_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_3___default()(this.toFixed(Math.abs(number || 0), precision), 10)}`;
    const mod = base.length > 3 ? base.length % 3 : 0;
    const postfix = `.${this.toFixed(number, precision).split('.')[1]}`;
    const resultNumber = (mod ? `${base.substr(0, mod)},` : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, `$1${','}`) + (precision ? postfix : '');
    return symbol ? `${resultNumber} ${symbol}` : resultNumber;
  }

  static formatError(err) {
    return err instanceof Error || lodash__WEBPACK_IMPORTED_MODULE_4___default.a.isObject(err) && err.message ? err.message : err;
  }

  static formatServerError(err) {
    if (lodash__WEBPACK_IMPORTED_MODULE_4___default.a.isObject(err) && err.message) {
      if (_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_2___default()(err.message)) {
        return err.message[0].message;
      }

      return err.message;
    }

    return err;
  }

  static roundNumber(value, decimals) {
    const number = Number(`${Math.ceil(`${value}e${decimals}`)}e-${decimals}`);
    return !_babel_runtime_corejs2_core_js_number_is_nan__WEBPACK_IMPORTED_MODULE_1___default()(number) ? number : 0;
  }

  static formatBlockSize(value) {
    value = new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(value);
    if (value.lt(1024)) return this.roundNumber(value.toNumber(), 2);else if (value.lt(1048576)) return this.roundNumber(value.div(1024).toNumber(), 2);else if (value.lt(1073741824)) return this.roundNumber(value.div(1048576).toNumber(), 2);
    return this.roundNumber(value.div(1073741824).toNumber(), 2);
  }

  static formatByteSize(bytes) {
    if (bytes < 1024) return 'bytes';else if (bytes < 1048576) return 'KB';else if (bytes < 1073741824) return 'MB';
    return 'GB';
  }
  /**
   *
   * @param {String} timestamp
   */


  static timestampToBlockInformationTime(timestamp) {
    return moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc(timestamp).local().format('D MMM, YYYY hh:mm:ss A');
  }
  /** *
   *
   * @param timestamp
   * @returns {{date: string, time: string}}
   */


  static timestampToContractCreationTime(timestamp) {
    const [date, time] = moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc(timestamp).local().format('DD.MM.YYYY, hh:mm A').split(',');
    return {
      date,
      time
    };
  }
  /** *
   *
   * @param timestamp
   * @returns {{date: string, time: string}}
   */


  static timestampToBlockCreationTime(timestamp) {
    const [date, time] = moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc(timestamp).local().format('DD.MM.YYYY, hh:mm A').split(',');
    return {
      date,
      time
    };
  }
  /**
   *
   * @returns {string} year
   */


  static getYear(date) {
    return moment__WEBPACK_IMPORTED_MODULE_6___default()(date).format('YYYY');
  }
  /**
   *
   * @param time
   * @returns {string}
   */


  static formatLatestBlockTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;

    if (hours > 0) {
      hours = `${hours}${hours > 1 ? 'h ' : 'h '}`;
    }

    if (minutes > 0) {
      minutes = `${minutes}m `;
    }

    seconds = `${seconds}s`;
    return `${hours || ''}${minutes || ''}${seconds} ago`;
  }
  /**
   *
      * @param {String} hex
      */


  static toUtf8(hex) {
    let str = '';

    for (let i = 0; i < hex.length; i += 2) {
      const code = _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_3___default()(hex.substr(i, 2), 16);

      if (code !== 0) {
        str += String.fromCharCode(code);
      }
    }

    let result = str;

    try {
      result = utf8__WEBPACK_IMPORTED_MODULE_7___default.a.decode(str);
    } catch (error) {
      result = str;
    }

    return result;
  }
  /**
   *
   * @param {String} str
   */


  static removeCommas(str) {
    return str.replace(/,/g, '');
  }
  /**
   *
   * @param {String} str
   */


  static removeDots(str) {
    return str.replace(/\./g, '');
  }
  /**
   *
   * @param count
   * @returns {string}
   */


  static getFormatTransactionsTitle(count) {
    return `${count} Transaction${count !== 1 ? 's' : ''}`;
  }
  /**
   *
   * @param {Array} abi
   * @returns {string}
   */


  static formatAbi(abi) {
    if (!abi) {
      return '';
    }

    return _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(abi, null, 4);
  }
  /**
   *
   * @param count
   * @returns {string}
   */


  static getFormaOperationsTitle(count) {
    return `${count} Operation${count !== 1 ? 's' : ''}`;
  }
  /**
   *
   * @param timestamp
   * @returns {string}
   */


  static timestampToOperationRowTime(timestamp) {
    return moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc(timestamp).local().format('DD.MM.YYYY hh:mm A');
  }
  /**
   *
   * @param time
   * @returns {string}
   */


  static secondsToFullTime(time) {
    return moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc(moment__WEBPACK_IMPORTED_MODULE_6___default.a.duration(time, 'seconds').asMilliseconds()).format('HH:mm:ss');
  }
  /**
   *
   * @param stringValue
   * @returns {number}
   */


  static convertToNumber(stringValue) {
    return new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(stringValue).toNumber();
  }
  /**
   * @method getBlockTimeByTimestamp
   * @param timestamp
   * @return {string}
   */


  static getBlockTimeByTimestamp(timestamp) {
    return moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc(timestamp).local().format('hh:mm:ss A');
  }
  /**
   * @method getBlockDateByTimestamp
   * @param timestamp
   * @return {string}
   */


  static getBlockDateByTimestamp(timestamp) {
    return moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc(timestamp).local().format('DD MMM');
  }

}

/* harmony default export */ __webpack_exports__["a"] = (FormatHelper);

/***/ }),

/***/ "btkE":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/number/is-integer");

/***/ }),

/***/ "bzos":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("5Uuq");

var _interopRequireDefault = __webpack_require__("KI45");

exports.__esModule = true;
exports.default = void 0;

var _map = _interopRequireDefault(__webpack_require__("LX0d"));

var _url = __webpack_require__("bzos");

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _propTypes = _interopRequireDefault(__webpack_require__("rf6O"));

var _router = _interopRequireDefault(__webpack_require__("nOHt"));

var _rewriteUrlForExport = __webpack_require__("P5f7");

var _utils = __webpack_require__("g/15");
/* global __NEXT_DATA__ */


function isLocal(href) {
  const url = (0, _url.parse)(href, false, true);
  const origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  let lastHref = null;
  let lastAs = null;
  let lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    const result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

let observer;
const listeners = new _map.default();
const IntersectionObserver = false ? undefined : null;

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      const cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

const listenToIntersections = (el, cb) => {
  const observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: formatUrl(href),
        as: asHref ? formatUrl(asHref) : asHref
      };
    });

    this.linkClicked = e => {
      // @ts-ignore target exists on currentTarget
      const {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      let {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      const {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      let {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (false) {}

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      this.cleanUpListeners = listenToIntersections(ref, () => {
        this.prefetch();
      });
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch() {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    const {
      pathname
    } = window.location;
    const {
      href: parsedHref
    } = this.formatUrls(this.props.href, this.props.as);
    const href = (0, _url.resolve)(pathname, parsedHref);

    _router.default.prefetch(href);
  }

  render() {
    let {
      children
    } = this.props;
    const {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    const child = _react.Children.only(children);

    const props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch();
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      } // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
      // defined, we specify the current 'href', so that repetition is not needed by the user

    };

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) {}

    return _react.default.cloneElement(child, props);
  }

}

Link.propTypes = void 0;

if (false) {}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "d/Cm":
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "d04V":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("r7XW");

/***/ }),

/***/ "d2d3":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHZpZXdCb3g9IjAgMCA1IDUiPjxnPjxnIG9wYWNpdHk9Ii42Ij48cGF0aCBmaWxsPSIjMTMwZDMyIiBkPSJNMi41LjQ2OWwyLjU5OCA0LjVILS4wOTh6Ii8+PC9nPjwvZz48L3N2Zz4="

/***/ }),

/***/ "dGr4":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/assign");

/***/ }),

/***/ "dZ6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var _Object$create = __webpack_require__("SqZg");

var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = _Object$create(null);

  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "e0mG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return loadBlockHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getBlockInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clearBlockInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return toggleRewardDistribution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setLatestBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return updateBlockList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return initBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getLatestOperations; });
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9Jkg");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("eVuF");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d/Cm");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("moMR");
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(echojs_lib__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _reducers_RoundReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("0xcs");
/* harmony import */ var _reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("A4BX");
/* harmony import */ var _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("tKMe");
/* harmony import */ var _constants_ObjectPrefixesConstants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("oOqk");
/* harmony import */ var _helpers_FormatHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("bXzB");
/* harmony import */ var _GlobalActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("K073");
/* harmony import */ var _TransactionActions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("St2Q");
/* harmony import */ var _reducers_GlobalReducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("uE89");
/* harmony import */ var _GridActions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("Rt/o");
/* harmony import */ var _constants_TableConstants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("hgd8");
/* harmony import */ var _helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("CZ53");
/* harmony import */ var _services_queries_history__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("HiqY");
/* harmony import */ var _AccountActions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("Oapj");



/* eslint-disable no-underscore-dangle,camelcase,no-shadow */
















/**
 *
 * @param {Object} targetBlock
 * @param {Object|undefined} targetBlock
 * @param {Object|undefined} targetBlockReward
 */

const getRewardDistribution = async (targetBlock, nextBlock) => {
  if (!nextBlock) {
    return null;
  }

  const {
    account: producerId,
    delegate: delegateId
  } = targetBlock;
  const producer = {
    type: 'Producer',
    producer: undefined,
    delegate: undefined,
    producedByCommittee: false
  };

  if (producerId) {
    const account = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getObject(producerId);
    producer.producer = account ? account.name : undefined;
  }

  if (delegateId && delegateId !== _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_7__[/* NULL_ACCOUNT */ "x"].ID) {
    const account = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getObject(delegateId);
    producer.delegate = account ? account.name : undefined;
  }

  const verifiers = nextBlock.prev_signatures.map(async s => {
    const res = {
      type: 'Verifier',
      producer: undefined,
      delegate: undefined,
      producedByCommittee: !!s._fallback
    };

    if (s._producer) {
      const id = `${_constants_ObjectPrefixesConstants__WEBPACK_IMPORTED_MODULE_8__[/* ACCOUNT_OBJECT_PREFIX */ "a"]}.${s._producer}`;
      const account = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getObject(id);
      res.producer = account ? account.name : undefined;
    }

    if (s._delegate) {
      const id = `${_constants_ObjectPrefixesConstants__WEBPACK_IMPORTED_MODULE_8__[/* ACCOUNT_OBJECT_PREFIX */ "a"]}.${s._delegate}`;
      const account = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getObject(id);
      res.delegate = account ? account.name : undefined;
    }

    return res;
  });
  const result = [producer, ...verifiers];
  return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a.all(result);
};
/**
 * method loadBlockHistory
 * @return {function(...[*]=)}
 */


const loadBlockHistory = () => async (dispatch, getState) => {
  try {
    const queryData = getState().grid.get(_constants_TableConstants__WEBPACK_IMPORTED_MODULE_14__[/* BLOCK_GRID */ "b"]).toJS();
    const {
      currentPage,
      sizePerPage
    } = queryData;
    let operations = getState().block.getIn(['blockInformation', 'operations']) || new immutable__WEBPACK_IMPORTED_MODULE_3__["List"]([]);

    const getObjectId = async objectId => {
      if (!objectId) {
        return null;
      }

      if (Object(_helpers_ValidateHelper__WEBPACK_IMPORTED_MODULE_15__[/* isSidechainEthDeposit */ "c"])(objectId) || echojs_lib__WEBPACK_IMPORTED_MODULE_4__["validators"].isContractId(objectId)) {
        return objectId;
      }

      let account = null;

      try {
        account = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getAccountByName(objectId.trim());

        if (account) {
          account = account.id;
        } // eslint-disable-next-line no-empty

      } catch (err) {}

      return account;
    };

    const [fromFilter, toFilter] = await _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a.all([getObjectId(queryData.filters.from), getObjectId(queryData.filters.to)]);
    operations = operations.filter(operation => {
      const isAllowFrom = fromFilter ? fromFilter === operation.mainInfo.from.name || fromFilter === operation.mainInfo.from.id : true;
      const isAllowTo = toFilter ? toFilter === operation.mainInfo.subject.name || toFilter === operation.mainInfo.subject.id : true;
      return isAllowFrom && isAllowTo;
    });
    dispatch(_GridActions__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"].setTotalDataSize(_constants_TableConstants__WEBPACK_IMPORTED_MODULE_14__[/* BLOCK_GRID */ "b"], operations.size));
    operations = operations.slice((currentPage - 1) * sizePerPage, currentPage * sizePerPage);
    dispatch(_reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].actions.set({
      field: 'filteredOperations',
      value: operations
    }));
  } catch (error) {
    console.log('error', error);
    dispatch(_reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].actions.set({
      field: 'error',
      value: _helpers_FormatHelper__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].formatError(error)
    }));
    dispatch(_GlobalActions__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].toggleErrorPath(true));
  }
};
/**
 *
 * @param {Number} round
 */

const getBlockInformation = round => async (dispatch, getState) => {
  try {
    let planeBlock = null;
    let nextPlaneBlock = null;

    try {
      planeBlock = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getBlock(round);
      nextPlaneBlock = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getBlock(new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(round).plus(1).toString(10));
    } catch (err) {
      dispatch(_reducers_GlobalReducer__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"].actions.set({
        field: 'error',
        value: _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_7__[/* NETWORK_CONNECTED_ERROR */ "u"]
      }));
      dispatch(_GlobalActions__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].toggleErrorScreen(true));
      return;
    }

    if (!planeBlock) {
      dispatch(_GlobalActions__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].toggleErrorPath(true));
      return;
    }

    const handledBlock = getState().block.getIn(['blocks', round]);
    const blockReward = new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(getState().round.get('blockReward'));
    const value = {};

    if (handledBlock) {
      value.reward = `${handledBlock.get('reward')} ${handledBlock.get('rewardCurrency')}`;
      value.size = `${_helpers_FormatHelper__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].formatBlockSize(handledBlock.get('weight'))}
			 ${_helpers_FormatHelper__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].formatByteSize(handledBlock.get('weight'))}`;
      value.blockNumber = handledBlock.get('blockNumber');
    } else {
      const fee = planeBlock.transactions.reduce((trxAcc, trx) => {
        if (trx.fees_collected) {
          if (typeof trx.fees_collected === 'number') {
            return trxAcc.plus(trx.fees_collected);
          }

          trx.fees_collected.forEach(({
            amount
          }) => {
            trxAcc.plus(amount);
          });
          return trxAcc;
        }

        return trxAcc;
      }, new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(0));
      const reward = blockReward.plus(fee);
      value.reward = reward.toString(10);

      const weight = _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(planeBlock).length;

      value.size = `${_helpers_FormatHelper__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].formatBlockSize(weight)} ${_helpers_FormatHelper__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].formatByteSize(weight)}`;
      value.blockNumber = _helpers_FormatHelper__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].formatAmount(planeBlock.round, 0);
    }

    const producer = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getObject(planeBlock.account);
    value.producer = {
      id: producer.id,
      name: producer.name
    }; // remove after go to 0.10 testnet

    const {
      transactions
    } = planeBlock;
    let resultTransactions = [];

    if (transactions.length !== 0) {
      // TODO: didnt work with ops data
      // const ops = transactions.reduce((resultIds, { operations }) => resultIds.concat(operations), []);
      // await TransactionActions.fetchTransactionsObjects(ops);
      const promiseTransactions = transactions.map(({
        operations,
        operation_results
      }, trIndex) => _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a.all(operations.map((op, i) => _TransactionActions__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"].getOperation(op, planeBlock.round, planeBlock.timestamp, trIndex, i, operation_results[i], i ? '' : trIndex + 1))));
      resultTransactions = await _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a.all(promiseTransactions);
    }

    value.transactionCount = resultTransactions.length;
    value.operations = new immutable__WEBPACK_IMPORTED_MODULE_3__["List"](resultTransactions.reduce((arr, ops) => [...arr, ...ops], []));
    value.round = planeBlock.round;
    value.timestamp = planeBlock.timestamp;
    value.rewardDistribution = await getRewardDistribution(planeBlock, nextPlaneBlock);
    dispatch(_GridActions__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"].setTotalDataSize(_constants_TableConstants__WEBPACK_IMPORTED_MODULE_14__[/* BLOCK_GRID */ "b"], resultTransactions.length));
    await dispatch(_reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].actions.set({
      field: 'blockInformation',
      value: new immutable__WEBPACK_IMPORTED_MODULE_3__["Map"](value)
    }));
    dispatch(loadBlockHistory());
  } catch (error) {
    dispatch(_reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].actions.set({
      field: 'error',
      value: _helpers_FormatHelper__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].formatError(error)
    }));
    dispatch(_GlobalActions__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].toggleErrorPath(true));
  }
};
const clearBlockInformation = () => dispatch => {
  dispatch(_reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].actions.set({
    field: 'blockInformation',
    value: new immutable__WEBPACK_IMPORTED_MODULE_3__["Map"]({})
  }));
};
const toggleRewardDistribution = () => (dispatch, getState) => {
  const isDistributionRewardOpen = getState().block.get('isDistributionRewardOpen');
  dispatch(_reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].actions.set({
    field: 'isDistributionRewardOpen',
    value: !isDistributionRewardOpen
  }));
};
/**
 *  @method setLatestBlock
 *  @param {Number} latestBlock
 *
 * 	Set latest block from blockchain to redux store
 */

const setLatestBlock = latestBlock => dispatch => {
  dispatch(_reducers_RoundReducer__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].actions.set({
    field: 'latestBlock',
    value: latestBlock
  }));
};
/**
 *  @method updateBlockList
 *
 * 	Update list of blocks on the recent blocks page
 *
 * 	@param {Number?} lastBlock
 * 	@param {Number?} startBlock
 * 	@param {Boolean?} isLoadMore
 */

const updateBlockList = (lastBlock, startBlock, isLoadMore) => async (dispatch, getState) => {
  let blocks = getState().block.get('blocks');
  let latestBlock = lastBlock || getState().round.get('latestBlock');
  const blockReward = new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(getState().round.get('blockReward'));
  const [...keys] = blocks.keys();
  let startedBlock = startBlock || Math.max(...keys);
  let blocksResult = [];

  if (isLoadMore) {
    startedBlock -= 1;
    latestBlock -= 1;
  }

  if (latestBlock - startedBlock > _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_7__[/* MAX_BLOCK_REQUESTS */ "l"]) {
    startedBlock = latestBlock - _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_7__[/* MAX_BLOCK_REQUESTS */ "l"];
  }

  for (let i = startedBlock + 1; i <= latestBlock; i += 1) {
    blocksResult.push(echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getBlock(i));
  }

  blocksResult = await _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a.all(blocksResult);
  const blocksRewards = {};
  const accountIds = blocksResult.reduce((accounts, block, index) => {
    if (block) {
      const {
        round,
        transactions
      } = block;
      const fee = transactions.reduce((trxAcc, trx) => {
        if (trx.fees_collected) {
          if (typeof trx.fees_collected === 'number') {
            return trxAcc.plus(trx.fees_collected);
          }

          trx.fees_collected.forEach(({
            amount
          }) => {
            trxAcc.plus(amount);
          });
        }

        return trxAcc;
      }, new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(0));
      accounts[index] = block.account;
      blocksRewards[round] = blockReward.plus(fee);
    }

    return accounts;
  }, []);
  const accounts = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getAccounts(accountIds);
  blocks = getState().block.get('blocks');
  const maxBlocks = getState().block.get('blocksCount');
  blocks = blocks.withMutations(mapBlocks => {
    for (let i = 0; i < blocksResult.length; i += 1) {
      if (!blocksResult[i]) {
        break;
      } // TODO remove!!!! try-catch after echojs-lib FIXED


      let weight = 0;

      try {
        weight = echojs_lib__WEBPACK_IMPORTED_MODULE_4__["serializers"].signedBlock.serialize(blocksResult[i]).length;
      } catch (e) {
        weight = _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(blocksResult[i]).length; //
      }

      const blockNumber = blocksResult[i].round;
      mapBlocks.setIn([blockNumber, 'timestamp'], blocksResult[i].timestamp).setIn([blockNumber, 'producer'], accounts[i].name).setIn([blockNumber, 'producerId'], blocksResult[i].account).setIn([blockNumber, 'reward'], blocksRewards[blockNumber] ? blocksRewards[blockNumber].toString(10) : 0).setIn([blockNumber, 'rewardCurrency'], 'ECHO').setIn([blockNumber, 'weight'], weight).setIn([blockNumber, 'weightSize'], 'bytes').setIn([blockNumber, 'transactions'], blocksResult[i].transactions.length).setIn([blockNumber, 'transactionsInfo'], blocksResult[i].transactions);
    }
  });
  const blocksToRemove = blocks.size - maxBlocks;

  if (Math.sign(blocksToRemove) > 0) {
    let blocksKeys = blocks.keySeq();
    blocksKeys = blocksKeys.sort((a, b) => a - b);
    blocksKeys = blocksKeys.slice(0, blocksToRemove);
    blocks = blocks.deleteAll(blocksKeys);
  }

  dispatch(_reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].actions.set({
    field: 'blocks',
    value: blocks
  }));
};
/**
 *  @method initBlocks
 *
 * 	Initialize recent blocks and starting timestamp of latest block
 */

const initBlocks = () => async dispatch => {
  const obj = await echojs_lib__WEBPACK_IMPORTED_MODULE_4___default.a.api.getObject(_constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_7__[/* DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES */ "e"]);
  dispatch(_reducers_RoundReducer__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].actions.set({
    field: 'latestBlock',
    value: obj.head_block_number
  }));
  const startBlockList = obj.head_block_number - _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_7__[/* PAGE_BLOCKS_COUNT */ "y"];
  await dispatch(updateBlockList(obj.head_block_number, startBlockList));
};
const getLatestOperations = () => async dispatch => {
  const latestOperations = await Object(_services_queries_history__WEBPACK_IMPORTED_MODULE_16__[/* getLatestOperationsFromGQL */ "b"])();
  const operations = latestOperations.data.getHistory.items;
  const transactions = _AccountActions__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].formatHistoryFromEchoDB(operations);
  const formattedOperations = await _AccountActions__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].formatAccountHistory(null, transactions);
  dispatch(_reducers_BlockReducer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].actions.set({
    field: 'latestOperations',
    value: formattedOperations
  }));
};

/***/ }),

/***/ "eVuF":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("aC71");

/***/ }),

/***/ "elyg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Promise = __webpack_require__("eVuF");

var _Object$assign = __webpack_require__("UXZV");

var _Object$defineProperty = __webpack_require__("hfKm");

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

_Object$defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__("bzos");

const mitt_1 = __importDefault(__webpack_require__("dZ6Y"));

const utils_1 = __webpack_require__("g/15");

const rewrite_url_for_export_1 = __webpack_require__("P5f7");

const route_matcher_1 = __webpack_require__("gguc");

const route_regex_1 = __webpack_require__("YTqd");

const is_dynamic_1 = __webpack_require__("/jkW");

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription
  }) {
    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state.options && e.state.options.fromExternal) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (false) {}

      this.replace(url, as, options);
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented
    // @ts-ignore backwards compatibility

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.nextExport ? pathname : as;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    return rewrite_url_for_export_1.rewriteUrlForNextExport(url);
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = _Object$assign({}, data, {
      Component
    });

    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new _Promise((resolve, reject) => {
      // marking route changes as a navigation start entry
      if (utils_1.SUPPORTS_PERFORMANCE_USER_TIMING) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      const url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as; // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, as);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (false) {}

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      } // @ts-ignore pathname is always a string


      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const rr = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(rr)(asPathname);

        if (!routeMatch) {
          const error = 'The provided `as` value is incompatible with the `href` value. This is invalid. https://err.sh/zeit/next.js/incompatible-href-as';

          if (false) {} else {
            console.error(error);
          }

          return resolve(false);
        } // Merge params into `query`, overwriting any specified in search


        _Object$assign(query, routeMatch);
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result
      // @ts-ignore pathname is always a string

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, as, options);
        const hash = window.location.hash.substring(1);

        if (false) {} // @ts-ignore pathname is always defined


        this.set(route, pathname, query, as, _Object$assign({}, routeInfo, {
          hash
        }));

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      // @ts-ignore method should always exist on history
      window.history[method]({
        url,
        as,
        options
      }, null, as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return _Promise.resolve(cachedRouteInfo);
    }

    return new _Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(Component => resolve({
        Component
      }), reject);
    }).then(routeInfo => {
      const {
        Component
      } = routeInfo;

      if (false) {}

      return new _Promise((resolve, reject) => {
        // we provide AppTree later so this needs to be `any`
        this.getInitialProps(Component, {
          pathname,
          query,
          asPath: as
        }).then(props => {
          routeInfo.props = props;
          this.components[route] = routeInfo;
          resolve(routeInfo);
        }, reject);
      });
    }).catch(err => {
      return new _Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR') {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(Component => {
          const routeInfo = {
            Component,
            err
          };
          return new _Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }));
      });
    });
  }

  set(route, pathname, query, as, data) {
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch `page` code, you may wait for the data during `page` rendering.
   * This feature only works in production!
   * @param url of prefetched `page`
   */


  prefetch(url) {
    return new _Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (false) {}

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (false) {} // @ts-ignore pathname is always defined

      const route = toRoute(pathname);
      this.pageLoader.prefetch(route).then(resolve, reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const Component = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return Component;
  }

  async getInitialProps(Component, ctx) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    const {
      Component: App
    } = this.components['/_app'];
    let props;

    if ( // @ts-ignore workaround for dead-code elimination
    (self.__HAS_SPR || "production" !== 'production') && Component.__NEXT_SPR) {
      let status; // pathname should have leading slash

      let {
        pathname
      } = url_1.parse(ctx.asPath || ctx.pathname);
      pathname = !pathname || pathname === '/' ? '/index' : pathname;
      props = await fetch( // @ts-ignore __NEXT_DATA__
      `/_next/data/${__NEXT_DATA__.buildId}${pathname}.json`).then(res => {
        if (!res.ok) {
          status = res.status;
          throw new Error('failed to load prerender data');
        }

        return res.json();
      }).catch(err => {
        console.error(`Failed to load data`, status, err);
        window.location.href = pathname;
        return new _Promise(() => {});
      });
    } else {
      const AppTree = this._wrapApp(App);

      ctx.AppTree = AppTree;
      props = await utils_1.loadGetInitialProps(App, {
        AppTree,
        Component,
        router: this,
        ctx
      });
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    if (cancelled) {
      const err = new Error('Loading initial props cancelled');
      err.cancelled = true;
      throw err;
    }

    return props;
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

Router.events = mitt_1.default();
exports.default = Router;

/***/ }),

/***/ "f3j0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseActionsClass; });
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

/**
 * Base actions for work with store by selected reducer
 */
class BaseActionsClass {
  /** Select reducer
   * @constructor
   * @param reducer
   */
  constructor(reducer) {
    this.reducer = reducer;
  }
  /**
   * Set value to reducer
   * @param {string|array} field
   * @param {string} value
   * @param {boolean} [isFromJS]
   * @returns {function}
   */


  setValue(field, value, isFromJS = true) {
    return this._callAction('set', {
      field,
      value,
      isFromJS
    });
  }
  /**
   * Set multiple values
      * @param {Object} payload
      * @returns {Function}
      */


  setMultipleValue(payload) {
    return this._callAction('setMultiple', payload);
  }
  /**
   * Reset reducer to default values
   * @returns {Function}
   */


  clear() {
    return this._callAction('clear');
  }
  /**
   * Reset only one field in reducer to default values
   * @param {String} field
   * @returns {Function}
   */


  clearByField(field) {
    return this._callAction('clearByField', {
      field
    });
  }
  /**
   * Is exist reducer
      * @returns {boolean}
      * @private
      */


  _isExistReducer() {
    return !!this.reducer || !!this.reducer.actions;
  }
  /**
   * Is exist called reducer action
      * @param {String} name
      * @returns {boolean}
      * @private
      */


  _isExistAction(name) {
    return !!this.reducer.actions[name];
  }
  /**
   * Call reducer action
      * @param {String} action
      * @param payload
      * @returns {Function}
      * @private
      */


  _callAction(action, payload = undefined) {
    if (!this._isExistReducer()) {
      throw new Error('Reducer not found');
    }

    if (!this._isExistAction(action)) {
      throw new Error(`Action "${action}" in reducer not found`);
    }

    return dispatch => {
      dispatch(this.reducer.actions[action](payload));
    };
  }

}

/***/ }),

/***/ "fflE":
/***/ (function(module, exports) {

module.exports = require("apollo-utilities");

/***/ }),

/***/ "fozc":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/json/stringify");

/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$keys = __webpack_require__("pLtp");

var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__("bzos");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  return (...args) => {
    if (!used) {
      used = true;
      fn.apply(this, args);
    }
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(Component, ctx) {
  if (false) {} // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!Component.getInitialProps) {
    return {};
  }

  const props = await Component.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(Component)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (false) {}

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SUPPORTS_PERFORMANCE = typeof performance !== 'undefined';
exports.SUPPORTS_PERFORMANCE_USER_TIMING = exports.SUPPORTS_PERFORMANCE && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "gguc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$keys = __webpack_require__("pLtp");

var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const params = {};

    _Object$keys(groups).forEach(slugName => {
      const m = routeMatch[groups[slugName]];

      if (m !== undefined) {
        params[slugName] = decodeURIComponent(m);
      }
    });

    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "ggud":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  LANDING_BRIDGE: "https://649-bridge-landing.pixelplex-test.by",
  INSTALL_NODE_LINK: "https://docs.echo.org/how-to/install-full-node",
  GRAPHQL_URL: {
    HTTP: "https://645-echodb.pixelplex-test.by/graphql",
    WS: "wss://645-echodb.pixelplex-test.by/graphql"
  },
  SERVER_URL: "https://656-echo-explorer.pixelplex-test.by",
  SOLC_LIST_URL: "https://echoprotocol.github.io/solc-bin/bin/list.json",
  SOLC_BIN_URL: "https://echoprotocol.github.io/solc-bin/bin/",
  APP_VERSION: "1.8.1",
  MAP_API_TOKEN: "pk.eyJ1IjoibWF4c2hldiIsImEiOiJjazJsbnByY2cwODlpM2NwZWZhZndhZjhhIn0.RF3XIqcQtY2nTT8sKYL8wA",
  ECHO_NODE: {
    API_URL: {"API_URL":"wss://devnet.echo-dev.io/ws","CONNECTION_TIMEOUT":5000,"MAX_RETRIES":10000000000,"PING_TIMEOUT":6000,"PING_DELAY":5000,"DEBUG":false,"APIS":["database","network_broadcast","history","registration","asset","login","network_node","echorand"]}.API_URL,
    CONNECTION_TIMEOUT: {"API_URL":"wss://devnet.echo-dev.io/ws","CONNECTION_TIMEOUT":5000,"MAX_RETRIES":10000000000,"PING_TIMEOUT":6000,"PING_DELAY":5000,"DEBUG":false,"APIS":["database","network_broadcast","history","registration","asset","login","network_node","echorand"]}.CONNECTION_TIMEOUT,
    MAX_RETRIES: {"API_URL":"wss://devnet.echo-dev.io/ws","CONNECTION_TIMEOUT":5000,"MAX_RETRIES":10000000000,"PING_TIMEOUT":6000,"PING_DELAY":5000,"DEBUG":false,"APIS":["database","network_broadcast","history","registration","asset","login","network_node","echorand"]}.MAX_RETRIES,
    PING_TIMEOUT: {"API_URL":"wss://devnet.echo-dev.io/ws","CONNECTION_TIMEOUT":5000,"MAX_RETRIES":10000000000,"PING_TIMEOUT":6000,"PING_DELAY":5000,"DEBUG":false,"APIS":["database","network_broadcast","history","registration","asset","login","network_node","echorand"]}.PING_TIMEOUT,
    PING_DELAY: {"API_URL":"wss://devnet.echo-dev.io/ws","CONNECTION_TIMEOUT":5000,"MAX_RETRIES":10000000000,"PING_TIMEOUT":6000,"PING_DELAY":5000,"DEBUG":false,"APIS":["database","network_broadcast","history","registration","asset","login","network_node","echorand"]}.PING_DELAY,
    DEBUG: {"API_URL":"wss://devnet.echo-dev.io/ws","CONNECTION_TIMEOUT":5000,"MAX_RETRIES":10000000000,"PING_TIMEOUT":6000,"PING_DELAY":5000,"DEBUG":false,"APIS":["database","network_broadcast","history","registration","asset","login","network_node","echorand"]}.DEBUG,
    APIS: {"API_URL":"wss://devnet.echo-dev.io/ws","CONNECTION_TIMEOUT":5000,"MAX_RETRIES":10000000000,"PING_TIMEOUT":6000,"PING_DELAY":5000,"DEBUG":false,"APIS":["database","network_broadcast","history","registration","asset","login","network_node","echorand"]}.APIS
  }
});

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hfKm":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("TUA0");

/***/ }),

/***/ "hgd8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return DEFAULT_SIZE_PER_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SIZES_PER_PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACCOUNT_GRID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BLOCK_GRID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return TRANSACTION_GRID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CONTRACT_GRID; });
/* unused harmony export DEFAULT_TABLE_LENGTH */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DEBOUNCE_TIMEOUT; });
const DEFAULT_SIZE_PER_PAGE = 20;
const SIZES_PER_PAGE = [20, 50, 100];
const ACCOUNT_GRID = 'account_grid';
const BLOCK_GRID = 'block_grid';
const TRANSACTION_GRID = 'transaction_grid';
const CONTRACT_GRID = 'contract_grid';
const DEFAULT_TABLE_LENGTH = 50;
const DEBOUNCE_TIMEOUT = 550;

/***/ }),

/***/ "htGi":
/***/ (function(module, exports, __webpack_require__) {

var _Object$assign = __webpack_require__("UXZV");

function _extends() {
  module.exports = _extends = _Object$assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "j8VQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MODAL_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MODAL_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MODAL_EXTENSION_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MANAGE_CONTRACT_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LIKE_CONTRACT_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return UNLIKE_CONTRACT_MESSAGE; });
const MODAL_SUCCESS = 'success';
const MODAL_ERROR = 'error';
const MODAL_EXTENSION_INFO = 'extension';
const MANAGE_CONTRACT_MESSAGE = 'Please, verify your authority to manage contract';
const LIKE_CONTRACT_MESSAGE = 'Please, verify your authority to give star to contract';
const UNLIKE_CONTRACT_MESSAGE = 'Please, verify your authority to take away star from contract';

/***/ }),

/***/ "k1wZ":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "kOwS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _extends; });
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("UXZV");
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);

function _extends() {
  _extends = _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "luI3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



class BreadCrumbs extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
      className: "breadcrumbs-container"
    }, this.props.breadcrumbs && this.props.breadcrumbs.map(breadcrumb => __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      key: breadcrumb.title,
      href: breadcrumb.href,
      as: breadcrumb.as
    }, __jsx("a", {
      className: "element"
    }, breadcrumb.title)))));
  }

}

BreadCrumbs.defaultProps = {
  breadcrumbs: []
};
/* harmony default export */ __webpack_exports__["a"] = (BreadCrumbs);

/***/ }),

/***/ "mOvZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "echojs-lib"
var external_echojs_lib_ = __webpack_require__("moMR");
var external_echojs_lib_default = /*#__PURE__*/__webpack_require__.n(external_echojs_lib_);

// EXTERNAL MODULE: external "redux-batched-actions"
var external_redux_batched_actions_ = __webpack_require__("55jf");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: ./src/config/chain.js
var chain = __webpack_require__("ggud");

// EXTERNAL MODULE: ./src/reducers/GlobalReducer.js
var GlobalReducer = __webpack_require__("uE89");

// EXTERNAL MODULE: ./src/reducers/InternetPopupReducer.js
var InternetPopupReducer = __webpack_require__("CV+1");

// EXTERNAL MODULE: ./src/reducers/RoundReducer.js
var RoundReducer = __webpack_require__("0xcs");

// EXTERNAL MODULE: ./src/helpers/FormatHelper.js
var FormatHelper = __webpack_require__("bXzB");

// EXTERNAL MODULE: ./src/constants/RoundConstants.js
var RoundConstants = __webpack_require__("X8zi");

// EXTERNAL MODULE: ./src/constants/GlobalConstants.js
var GlobalConstants = __webpack_require__("tKMe");

// EXTERNAL MODULE: ./src/actions/BlockActions.js
var BlockActions = __webpack_require__("e0mG");

// EXTERNAL MODULE: ./src/constants/RouterConstants.js
var RouterConstants = __webpack_require__("Z2WM");

// EXTERNAL MODULE: ./src/actions/StatisticsActions.js + 1 modules
var StatisticsActions = __webpack_require__("sP30");

// EXTERNAL MODULE: external "graphql-tag"
var external_graphql_tag_ = __webpack_require__("txk1");
var external_graphql_tag_default = /*#__PURE__*/__webpack_require__.n(external_graphql_tag_);

// EXTERNAL MODULE: ./src/services/GraphqlService.js + 1 modules
var GraphqlService = __webpack_require__("xoST");

// CONCATENATED MODULE: ./src/services/queries/block.js


/**
 *
 * @param contracts
 * @returns {Promise<*>}
 */

const getBlockFromGraphQl = async round => {
  const query = external_graphql_tag_default.a`
		query getBlock($round: Int!)  {
			getBlock(round: $round) {
				round,
				decentralization_rate,
				average_block_time,
				frozen_balances_data {
    			accounts_freeze_sum,
      		committee_freeze_sum
    		}
			}
		}
	`;
  return GraphqlService["a" /* default */].getClient().query({
    query,
    variables: {
      round
    }
  });
};
// CONCATENATED MODULE: ./src/actions/SocketActions.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return serverConnect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fullClientInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return partialClientConnect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return disconnect; });
/* eslint-disable no-underscore-dangle */














/**
 * set connected parameter to true
 */

const onConnectSubscriber = () => dispatch => {
  const timeoutId = setTimeout(() => {
    dispatch(Object(external_redux_batched_actions_["batchActions"])([InternetPopupReducer["a" /* default */].actions.set({
      field: 'show',
      value: false
    }), InternetPopupReducer["a" /* default */].actions.clearTimeout()]));
  }, 3000);
  dispatch(Object(external_redux_batched_actions_["batchActions"])([InternetPopupReducer["a" /* default */].actions.set({
    field: 'timeoutId',
    value: timeoutId
  }), InternetPopupReducer["a" /* default */].actions.set({
    field: 'show',
    value: true
  }), InternetPopupReducer["a" /* default */].actions.set({
    field: 'connect',
    value: true
  })]));
};
/**
 * set connected parameter to false
 */


const onDisconnectSubscriber = () => dispatch => {
  dispatch(Object(external_redux_batched_actions_["batchActions"])([InternetPopupReducer["a" /* default */].actions.clearTimeout(), InternetPopupReducer["a" /* default */].actions.set({
    field: 'connect',
    value: false
  }), InternetPopupReducer["a" /* default */].actions.set({
    field: 'show',
    value: true
  })]));
};
/**
 *  @method roundSubscribe
 *
 * 	Call when trigger setEchorandSubscribe (round process notifications)
 *
 * 	@param {Object} notification
 */


const roundSubscribe = notification => dispatch => {
  switch (notification[0].type) {
    case RoundConstants["e" /* ROUND_STARTED */]:
      dispatch(Object(external_redux_batched_actions_["batchActions"])([RoundReducer["a" /* default */].actions.set({
        field: 'readyProducers',
        value: 0
      }), RoundReducer["a" /* default */].actions.set({
        field: 'preparingBlock',
        value: notification[0].round
      }), RoundReducer["a" /* default */].actions.set({
        field: 'stepProgress',
        value: notification[0].type
      })]));
      break;

    case RoundConstants["c" /* BLOCK_PRODUCED */]:
      dispatch(Object(external_redux_batched_actions_["batchActions"])([RoundReducer["a" /* default */].actions.increment({
        field: 'readyProducers'
      }), RoundReducer["a" /* default */].actions.set({
        field: 'stepProgress',
        value: notification[0].type
      })]));
      break;

    case RoundConstants["d" /* GC_STARTED */]:
      dispatch(RoundReducer["a" /* default */].actions.set({
        field: 'stepProgress',
        value: notification[0].type
      }));
      break;

    case RoundConstants["a" /* BBA_STARTED */]:
      dispatch(RoundReducer["a" /* default */].actions.set({
        field: 'stepProgress',
        value: notification[0].type
      }));
      break;

    default:
      return null;
  }

  return null;
};
/**
 *  @method blockRelease
 *
 * 	Call when trigger setBlockApplySubscribe (release new block)
 */


const blockRelease = () => async dispatch => {
  const global = await external_echojs_lib_default.a.api.getObject(GlobalConstants["e" /* DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES */], true);
  dispatch(Object(BlockActions["f" /* setLatestBlock */])(global.head_block_number));
  await dispatch(Object(BlockActions["h" /* updateBlockList */])(global.head_block_number));
  dispatch(RoundReducer["a" /* default */].actions.set({
    field: 'stepProgress',
    value: RoundConstants["b" /* BLOCK_APPLIED_CALLBACK */]
  }));
  dispatch(RoundReducer["a" /* default */].actions.set({
    field: 'preparingBlock',
    value: global.head_block_number + 1
  }));
};
/**
 * @method serverConnect
 *
 * Server WS init preload data
 */


const serverConnect = () => async dispatch => {
  try {
    if (!external_echojs_lib_default.a.isConnected) {
      dispatch(GlobalReducer["a" /* default */].actions.set({
        field: 'connectedServer',
        value: false
      }));
      return;
    }

    const dynamicGlobalParams = await external_echojs_lib_default.a.api.getObject(GlobalConstants["e" /* DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES */]);
    const globalParams = (await external_echojs_lib_default.a.api.wsApi.database.getGlobalProperties()).parameters;
    const blockReward = globalParams.block_producer_reward_ratio;
    await dispatch(Object(external_redux_batched_actions_["batchActions"])([RoundReducer["a" /* default */].actions.set({
      field: 'blockReward',
      value: blockReward
    })]));
    const block = await getBlockFromGraphQl(dynamicGlobalParams.head_block_number);
    await dispatch(StatisticsActions["a" /* default */].updateStatistics(block.data.getBlock));
    await dispatch(Object(BlockActions["c" /* getLatestOperations */])());
    await dispatch(Object(BlockActions["d" /* initBlocks */])());
    const global = globalParams.echorand_config;
    const producers = global._creator_count;
    dispatch(Object(external_redux_batched_actions_["batchActions"])([RoundReducer["a" /* default */].actions.set({
      field: 'producers',
      value: producers
    }), GlobalReducer["a" /* default */].actions.set({
      field: 'connectedServer',
      value: true
    })]));
  } catch (err) {
    dispatch(Object(external_redux_batched_actions_["batchActions"])([GlobalReducer["a" /* default */].actions.set({
      field: 'error',
      value: FormatHelper["a" /* default */].formatError(err)
    }), GlobalReducer["a" /* default */].actions.set({
      field: 'connected',
      value: false
    })]));
  }
};
/**
 *  @method fullClientInit
 *
 * 	WS connect to blockchain and set subscribe callbacks
 */

const fullClientInit = () => async dispatch => {
  try {
    await external_echojs_lib_default.a.connect(chain["a" /* default */].ECHO_NODE.API_URL, {
      connectionTimeout: chain["a" /* default */].ECHO_NODE.CONNECTION_TIMEOUT,
      maxRetries: chain["a" /* default */].ECHO_NODE.MAX_RETRIES,
      pingDelay: chain["a" /* default */].ECHO_NODE.PING_DELAY,
      debug: chain["a" /* default */].ECHO_NODE.DEBUG,
      apis: chain["a" /* default */].ECHO_NODE.APIS
    });
    const dynamicGlobalParams = await external_echojs_lib_default.a.api.getObject(GlobalConstants["e" /* DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES */]);
    const globalParams = (await external_echojs_lib_default.a.api.wsApi.database.getGlobalProperties()).parameters;
    const blockReward = globalParams.block_producer_reward_ratio;
    await dispatch(Object(external_redux_batched_actions_["batchActions"])([RoundReducer["a" /* default */].actions.set({
      field: 'blockReward',
      value: blockReward
    })]));
    await dispatch(Object(BlockActions["d" /* initBlocks */])());
    const block = await getBlockFromGraphQl(dynamicGlobalParams.head_block_number);
    await dispatch(StatisticsActions["a" /* default */].updateStatistics(block.data.getBlock));
    await dispatch(Object(BlockActions["c" /* getLatestOperations */])());
    await external_echojs_lib_default.a.subscriber.setEchorandSubscribe(result => dispatch(roundSubscribe(result)));
    await external_echojs_lib_default.a.subscriber.setBlockApplySubscribe(() => dispatch(blockRelease()));
    external_echojs_lib_default.a.subscriber.setStatusSubscribe('connect', () => dispatch(onConnectSubscriber()));
    external_echojs_lib_default.a.subscriber.setStatusSubscribe('disconnect', () => dispatch(onDisconnectSubscriber()));
    dispatch(blockRelease());
    const global = globalParams.echorand_config;
    const producers = global._creator_count;
    dispatch(Object(external_redux_batched_actions_["batchActions"])([GlobalReducer["a" /* default */].actions.set({
      field: 'connected',
      value: true
    }), RoundReducer["a" /* default */].actions.set({
      field: 'producers',
      value: producers
    })]));
    router_default.a.push(RouterConstants["k" /* INDEX_PATH */]);
  } catch (err) {
    dispatch(Object(external_redux_batched_actions_["batchActions"])([GlobalReducer["a" /* default */].actions.set({
      field: 'error',
      value: FormatHelper["a" /* default */].formatError(err)
    }), GlobalReducer["a" /* default */].actions.set({
      field: 'connected',
      value: false
    })]));
    throw err;
  }
};
/**
 *  @method partialClientConnect
 *
 * 	WS connect to blockchain and set subscribe callbacks
 */

const partialClientConnect = () => async dispatch => {
  try {
    if (!external_echojs_lib_default.a.isConnected) {
      await external_echojs_lib_default.a.connect(chain["a" /* default */].ECHO_NODE.API_URL, {
        connectionTimeout: chain["a" /* default */].ECHO_NODE.CONNECTION_TIMEOUT,
        maxRetries: chain["a" /* default */].ECHO_NODE.MAX_RETRIES,
        pingDelay: chain["a" /* default */].ECHO_NODE.PING_DELAY,
        debug: chain["a" /* default */].ECHO_NODE.DEBUG,
        apis: chain["a" /* default */].ECHO_NODE.APIS
      });
    }

    await external_echojs_lib_default.a.subscriber.setEchorandSubscribe(result => dispatch(roundSubscribe(result)));
    await external_echojs_lib_default.a.subscriber.setBlockApplySubscribe(() => dispatch(blockRelease()));
    external_echojs_lib_default.a.subscriber.setStatusSubscribe('connect', () => dispatch(onConnectSubscriber()));
    external_echojs_lib_default.a.subscriber.setStatusSubscribe('disconnect', () => dispatch(onDisconnectSubscriber()));
    dispatch(blockRelease());
    dispatch(GlobalReducer["a" /* default */].actions.set({
      field: 'connected',
      value: true
    }));
  } catch (err) {
    dispatch(Object(external_redux_batched_actions_["batchActions"])([GlobalReducer["a" /* default */].actions.set({
      field: 'error',
      value: FormatHelper["a" /* default */].formatError(err)
    }), GlobalReducer["a" /* default */].actions.set({
      field: 'connected',
      value: false
    })]));
    throw err;
  }
};
/**
 *  @method disconnect
 *
 * 	Disconnect from web socket
 */

const disconnect = () => async dispatch => {
  await external_echojs_lib_default.a.disconnect();
  dispatch(GlobalReducer["a" /* default */].actions.set({
    field: 'connected',
    value: false
  }));
};

/***/ }),

/***/ "moMR":
/***/ (function(module, exports) {

module.exports = require("echojs-lib");

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("5Uuq");

var _interopRequireDefault = __webpack_require__("KI45");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("htGi"));

var _defineProperty = _interopRequireDefault(__webpack_require__("hfKm"));

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("qOIg");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

(0, _defineProperty.default)(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  (0, _defineProperty.default)(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    const router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      const eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = (0, _extends2.default)({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "nuGg":
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),

/***/ "o5io":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/create");

/***/ }),

/***/ "o7ok":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__("qNsG");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("eVuF");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__("K2gz");
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// EXTERNAL MODULE: external "bignumber.js"
var external_bignumber_js_ = __webpack_require__("d/Cm");
var external_bignumber_js_default = /*#__PURE__*/__webpack_require__.n(external_bignumber_js_);

// EXTERNAL MODULE: ./src/containers/OperationsTable/index.jsx + 13 modules
var OperationsTable = __webpack_require__("9s6j");

// EXTERNAL MODULE: ./src/components/InformationBreadCrumbs/index.jsx
var InformationBreadCrumbs = __webpack_require__("luI3");

// EXTERNAL MODULE: ./src/public/images/icons/show-list-arrow.svg
var show_list_arrow = __webpack_require__("AqEx");
var show_list_arrow_default = /*#__PURE__*/__webpack_require__.n(show_list_arrow);

// CONCATENATED MODULE: ./src/components/ViewListPopover/index.jsx
var __jsx = external_react_default.a.createElement;



class ViewListPopover_ViewListPopover extends external_react_["Component"] {
  render() {
    const {
      isOpen,
      toggleReward
    } = this.props;
    return __jsx("div", {
      className: "view-list-container"
    }, __jsx("a", {
      href: "",
      className: `view-list ${isOpen ? 'is-open' : ''}`,
      onClick: e => {
        e.preventDefault();
        toggleReward();
      }
    }, __jsx("span", {
      className: "view-list-text"
    }, isOpen ? 'Hide' : 'Show'), __jsx("span", {
      className: "view-list-icon"
    }, __jsx("img", {
      src: show_list_arrow_default.a,
      alt: ""
    }))));
  }

}

/* harmony default export */ var components_ViewListPopover = (ViewListPopover_ViewListPopover);
// EXTERNAL MODULE: ./src/components/TableLabel/index.jsx
var TableLabel = __webpack_require__("AGvI");

// EXTERNAL MODULE: ./src/components/InnerHeader/index.jsx
var InnerHeader = __webpack_require__("2k9L");

// EXTERNAL MODULE: ./src/components/Loader/index.jsx
var Loader = __webpack_require__("9eFo");

// EXTERNAL MODULE: external "react-perfect-scrollbar"
var external_react_perfect_scrollbar_ = __webpack_require__("RfFk");
var external_react_perfect_scrollbar_default = /*#__PURE__*/__webpack_require__.n(external_react_perfect_scrollbar_);

// EXTERNAL MODULE: ./src/helpers/URLHelper.js
var URLHelper = __webpack_require__("1qHI");

// EXTERNAL MODULE: ./src/components/InfoTooltip/index.jsx + 1 modules
var InfoTooltip = __webpack_require__("rX2I");

// CONCATENATED MODULE: ./src/components/BlockInformation/Thead.jsx
var Thead_jsx = external_react_default.a.createElement;


const DistributionThead = Object(external_react_["memo"])(() => Thead_jsx("thead", null, Thead_jsx("tr", null, Thead_jsx("td", null), Thead_jsx("td", {
  className: "role"
}, Thead_jsx("div", {
  className: "td-in"
}, "Role")), Thead_jsx("td", {
  className: "origin"
}, Thead_jsx("div", {
  className: "td-in"
}, "Origin", Thead_jsx(InfoTooltip["a" /* default */], {
  overlay: "Account selected by consensus as a participant for the current block preparation"
}))), Thead_jsx("td", {
  className: "delegate"
}, Thead_jsx("div", {
  className: "td-in"
}, "Delegate", Thead_jsx(InfoTooltip["a" /* default */], {
  overlay: "An account that has been trusted to issue messages on behalf of the Origin. Only considered if there are no messages from the original participant"
}))), Thead_jsx("td", {
  className: "produced"
}, Thead_jsx("div", {
  className: "td-in"
}, "Produced by the committee", Thead_jsx(InfoTooltip["a" /* default */], {
  overlay: "If Origin and Delegate did not send messages, the message will be sent by the committee"
}))), Thead_jsx("td", null))));
/* harmony default export */ var Thead = (DistributionThead);
// EXTERNAL MODULE: ./src/constants/RouterConstants.js
var RouterConstants = __webpack_require__("Z2WM");

// EXTERNAL MODULE: ./src/components/Avatar/index.jsx
var Avatar = __webpack_require__("aBjG");

// CONCATENATED MODULE: ./src/components/BlockInformation/DistributionTable.jsx
var DistributionTable_jsx = external_react_default.a.createElement;









class DistributionTable_DistributionTable extends external_react_default.a.PureComponent {
  onClick(e, producer) {
    e.preventDefault();
    e.stopPropagation();
    router_default.a.push(RouterConstants["q" /* SSR_ACCOUNTS_PATH */], URLHelper["a" /* default */].createAccountUrlByName(producer));
  }

  renderRow({
    type,
    delegate,
    producer,
    producedByCommittee
  }, index) {
    return DistributionTable_jsx(external_react_default.a.Fragment, {
      key: index
    }, DistributionTable_jsx("tr", {
      className: "view"
    }, DistributionTable_jsx("td", null), DistributionTable_jsx("td", {
      className: "role"
    }, DistributionTable_jsx("div", {
      className: "td-in"
    }, DistributionTable_jsx("span", {
      className: "type"
    }, type))), DistributionTable_jsx("td", {
      className: "origin"
    }, DistributionTable_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */]
    }, DistributionTable_jsx("a", {
      href: "",
      className: "td-in",
      onClick: e => this.onClick(e, producer)
    }, DistributionTable_jsx(Avatar["a" /* default */], {
      accountName: producer
    }), DistributionTable_jsx("span", null, producer)))), DistributionTable_jsx("td", {
      className: "delegate"
    }, DistributionTable_jsx(external_react_default.a.Fragment, null, delegate ? DistributionTable_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */]
    }, DistributionTable_jsx("a", {
      href: "",
      className: "td-in",
      onClick: e => this.onClick(e, delegate)
    }, DistributionTable_jsx(Avatar["a" /* default */], {
      accountName: producer
    }), DistributionTable_jsx("span", null, delegate))) : DistributionTable_jsx("div", {
      className: "td-in"
    }, "\u2014"))), DistributionTable_jsx("td", {
      className: "produced"
    }, DistributionTable_jsx("div", {
      className: "td-in"
    }, DistributionTable_jsx("span", {
      className: "currency"
    }, producedByCommittee ? 'Yes' : 'No'))), DistributionTable_jsx("td", null)));
  }

  render() {
    const {
      rewards
    } = this.props;
    return DistributionTable_jsx("div", {
      className: "distribution-table"
    }, DistributionTable_jsx(external_react_perfect_scrollbar_default.a, null, DistributionTable_jsx("table", null, DistributionTable_jsx(Thead, null), DistributionTable_jsx("tbody", null, DistributionTable_jsx("tr", {
      className: "air"
    }), rewards.map((r, i) => this.renderRow(r, i))))));
  }

}

DistributionTable_DistributionTable.defaultProps = {
  rewards: []
};
/* harmony default export */ var BlockInformation_DistributionTable = (DistributionTable_DistributionTable);
// EXTERNAL MODULE: ./src/constants/TableConstants.js
var TableConstants = __webpack_require__("hgd8");

// EXTERNAL MODULE: ./src/constants/GlobalConstants.js
var GlobalConstants = __webpack_require__("tKMe");

// EXTERNAL MODULE: ./src/helpers/FormatHelper.js
var FormatHelper = __webpack_require__("bXzB");

// EXTERNAL MODULE: ./src/actions/BlockActions.js
var BlockActions = __webpack_require__("e0mG");

// EXTERNAL MODULE: ./src/actions/GridActions.js
var GridActions = __webpack_require__("Rt/o");

// CONCATENATED MODULE: ./src/components/BlockInformation/index.jsx


var BlockInformation_jsx = external_react_default.a.createElement;




















class BlockInformation_BlockInformation extends external_react_default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBlockNumber: '',
      loader: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.operations && nextProps.blockInformation.get('round')) {
      return {
        currentBlockNumber: nextProps.blockInformation.get('blockNumber')
      };
    }

    return null;
  }

  componentDidMount() {
    const {
      router: {
        query: {
          round
        }
      },
      blockInformation
    } = this.props;

    if (blockInformation.get('blockNumber') !== round) {
      this.onResetFilter().then(() => {
        this.props.getBlockInfo(round);
      });
    }
  }

  async shouldComponentUpdate(nextProps) {
    if (this.state.currentBlockNumber !== nextProps.blockInformation.get('blockNumber')) {
      this.setState({
        loader: false,
        currentBlockNumber: nextProps.blockInformation.get('blockNumber')
      });
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.blockInformation) {
      this.props.setTitle(GlobalConstants["z" /* TITLE_TEMPLATES */].BLOCK.replace(/round/, this.props.router.query.round));
    }

    if (this.props.router.query.round !== prevProps.router.query.round || this.props.latestBlock > prevProps.latestBlock && new external_bignumber_js_default.a(this.props.latestBlock).eq(new external_bignumber_js_default.a(this.state.currentBlockNumber).plus(1))) {
      this.onResetFilter().then(() => {
        this.props.getBlockInfo(this.props.router.query.round);
      });
    }
  }

  componentWillUnmount() {
    this.props.clearBlockInfo();
  }

  async onResetFilter() {
    return promise_default.a.all([this.props.onSetFilter({
      from: '',
      to: ''
    }), this.props.onSetPage(1)]);
  }

  onBlockLink(blockNumber, e) {
    e.preventDefault();
    this.setState({
      loader: true
    });
    router_default.a.push(RouterConstants["s" /* SSR_BLOCK_INFORMATION_PATH */], URLHelper["a" /* default */].createBlockUrl(blockNumber));
  }

  onLoadMoreHistory() {
    this.props.loadBlockHistory();
  }

  returnFunction() {
    router_default.a.push(RouterConstants["k" /* INDEX_PATH */]);
  }

  renderLoader() {
    return BlockInformation_jsx(Loader["a" /* default */], null);
  }

  renderBlockInformation(blockInformation, latestBlock) {
    const {
      toggleRewardDistribution,
      isDistributionRewardOpen,
      filteredOperations
    } = this.props;
    const formattedBlockNumber = blockInformation.get('blockNumber') || '';
    const time = FormatHelper["a" /* default */].timestampToBlockInformationTime(blockInformation.get('timestamp'));
    const producer = blockInformation.get('producer') || {};
    const reward = blockInformation.get('reward');
    const size = blockInformation.get('size');
    const transactionCount = blockInformation.get('transactionCount') || 0;
    const rewardDistribution = blockInformation.get('rewardDistribution');
    const breadcrumbs = [{
      title: 'Blocks list',
      as: RouterConstants["k" /* INDEX_PATH */],
      href: RouterConstants["k" /* INDEX_PATH */]
    }];
    const blockNumber = Number(FormatHelper["a" /* default */].removeCommas(formattedBlockNumber));
    return BlockInformation_jsx(external_react_default.a.Fragment, null, BlockInformation_jsx(InnerHeader["a" /* default */], {
      returnFunction: () => this.returnFunction(),
      title: `Block ${formattedBlockNumber}`
    }, BlockInformation_jsx(InformationBreadCrumbs["a" /* default */], {
      breadcrumbs: breadcrumbs,
      returnFunction: () => this.returnFunction()
    }), BlockInformation_jsx("div", {
      className: "block-navigation"
    }, BlockInformation_jsx("button", {
      className: external_classnames_default()('prev', {
        active: blockNumber > 1
      }),
      disabled: blockNumber <= 1,
      onClick: e => this.onBlockLink(blockNumber - 1, e)
    }, "Previous block"), BlockInformation_jsx("button", {
      className: external_classnames_default()('next', {
        active: latestBlock !== blockNumber
      }),
      disabled: latestBlock === blockNumber,
      onClick: e => this.onBlockLink(blockNumber + 1, e)
    }, "Next block"))), BlockInformation_jsx("div", {
      className: "block-description"
    }, BlockInformation_jsx("div", {
      className: "container time"
    }, BlockInformation_jsx("div", {
      className: "title"
    }, "Date, time"), BlockInformation_jsx("div", {
      className: "value"
    }, time)), BlockInformation_jsx("div", {
      className: "container size"
    }, BlockInformation_jsx("div", {
      className: "title"
    }, "Size"), BlockInformation_jsx("div", {
      className: "value"
    }, size)), BlockInformation_jsx("div", {
      className: "container producer"
    }, BlockInformation_jsx("div", {
      className: "title"
    }, "Producer"), BlockInformation_jsx(link_default.a, {
      href: RouterConstants["q" /* SSR_ACCOUNTS_PATH */],
      as: URLHelper["a" /* default */].createAccountUrl(producer.name)
    }, BlockInformation_jsx("a", {
      className: "link value blue"
    }, producer.name))), BlockInformation_jsx("div", {
      className: "container verifiers"
    }, BlockInformation_jsx("div", {
      className: "title"
    }, "Verifiers"), BlockInformation_jsx("div", {
      className: "value"
    }, rewardDistribution && rewardDistribution.length ? rewardDistribution.length - 1 : '—')), BlockInformation_jsx("div", {
      className: "container reward"
    }, BlockInformation_jsx("div", {
      className: "title"
    }, "Reward"), BlockInformation_jsx("div", {
      className: "value"
    }, `${FormatHelper["a" /* default */].formatAmount(reward, GlobalConstants["f" /* ECHO_ASSET */].PRECISION)} ${GlobalConstants["f" /* ECHO_ASSET */].SYMBOL}`))), BlockInformation_jsx(TableLabel["a" /* default */], {
      label: "Block Certificate"
    }, rewardDistribution && rewardDistribution.length && BlockInformation_jsx(components_ViewListPopover, {
      toggleReward: toggleRewardDistribution,
      isOpen: isDistributionRewardOpen
    })), rewardDistribution && rewardDistribution.length ? isDistributionRewardOpen && BlockInformation_jsx(BlockInformation_DistributionTable, {
      rewards: rewardDistribution
    }) : BlockInformation_jsx(TableLabel["a" /* default */], {
      label: "Certificate list will be available after next block will be produced"
    }), BlockInformation_jsx("div", {
      className: "blocks-table-wrap"
    }, transactionCount ? BlockInformation_jsx(OperationsTable["a" /* default */], {
      isASCOps: true,
      gridName: TableConstants["b" /* BLOCK_GRID */],
      onLoadMoreHistory: () => this.onLoadMoreHistory(),
      label: FormatHelper["a" /* default */].getFormatTransactionsTitle(transactionCount),
      fee: true,
      operations: filteredOperations,
      router: this.props.router
    }) : null));
  }

  render() {
    const {
      blockInformation,
      latestBlock
    } = this.props;
    return BlockInformation_jsx("div", {
      className: "inner-container"
    }, !blockInformation.get('blockNumber') || this.state.loader ? this.renderLoader() : this.renderBlockInformation(blockInformation, latestBlock));
  }

}

BlockInformation_BlockInformation.defaultProps = {};

BlockInformation_BlockInformation.getInitialProps = async (_ref) => {
  let {
    query: {
      round
    },
    store
  } = _ref,
      filters = Object(objectWithoutProperties["a" /* default */])(_ref.query, ["round"]);

  await store.dispatch(GridActions["a" /* default */].initData(TableConstants["b" /* BLOCK_GRID */], filters));
  await store.dispatch(Object(BlockActions["b" /* getBlockInformation */])(round));
  return {};
};

/* harmony default export */ var components_BlockInformation = (BlockInformation_BlockInformation);
// EXTERNAL MODULE: ./src/actions/GlobalActions.js
var GlobalActions = __webpack_require__("K073");

// CONCATENATED MODULE: ./src/containers/RecentBlockSection/BlockInformation/index.jsx







/* harmony default export */ var RecentBlockSection_BlockInformation = (Object(router_["withRouter"])(Object(external_react_redux_["connect"])(state => ({
  filterAndPaginateData: state.grid.get(TableConstants["b" /* BLOCK_GRID */]),
  blockInformation: state.block.get('blockInformation'),
  filteredOperations: state.block.get('filteredOperations'),
  historyLength: state.global.get('historyLength'),
  isDistributionRewardOpen: state.block.get('isDistributionRewardOpen'),
  latestBlock: state.round.get('latestBlock')
}), dispatch => ({
  onSetFilter: params => dispatch(GridActions["a" /* default */].setFilter(TableConstants["b" /* BLOCK_GRID */], params)),
  onSetPage: newPage => dispatch(GridActions["a" /* default */].setPage(TableConstants["b" /* BLOCK_GRID */], newPage)),
  getBlockInfo: round => dispatch(Object(BlockActions["b" /* getBlockInformation */])(round)),
  clearBlockInfo: () => dispatch(Object(BlockActions["a" /* clearBlockInformation */])()),
  loadBlockHistory: () => dispatch(Object(BlockActions["e" /* loadBlockHistory */])()),
  setTitle: title => dispatch(GlobalActions["a" /* default */].setTitle(title)),
  toggleRewardDistribution: () => dispatch(Object(BlockActions["g" /* toggleRewardDistribution */])())
}))(components_BlockInformation)));
// CONCATENATED MODULE: ./src/pages/blocks/[round].jsx

/* harmony default export */ var _round_ = __webpack_exports__["default"] = (RecentBlockSection_BlockInformation);

/***/ }),

/***/ "oLBY":
/***/ (function(module, exports) {

module.exports = require("copy-to-clipboard");

/***/ }),

/***/ "oOqk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACCOUNT_OBJECT_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ASSET_OBJECT_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CONTRACT_OBJECT_PREFIX; });
/* unused harmony export OPERATION_HISTORY_OBJECT_PREFIX */
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("moMR");
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(echojs_lib__WEBPACK_IMPORTED_MODULE_0__);

const ACCOUNT_OBJECT_PREFIX = `1.${echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].PROTOCOL_OBJECT_TYPE_ID.ACCOUNT}`;
const ASSET_OBJECT_PREFIX = `1.${echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].PROTOCOL_OBJECT_TYPE_ID.ASSET}`;
const CONTRACT_OBJECT_PREFIX = `1.${echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].PROTOCOL_OBJECT_TYPE_ID.CONTRACT}`;
const OPERATION_HISTORY_OBJECT_PREFIX = `1.${echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].PROTOCOL_OBJECT_TYPE_ID.OPERATION_HISTORY}`;

/***/ }),

/***/ "oZ+S":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SEARCH_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEBOUNCE_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEFAULT_ERROR_SEARCH; });
/* unused harmony export ERROR_BLOCK_SEARCH */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TYPE_SEARCH_SECTION; });
const SEARCH_LIMIT = {
  MAX: 6,
  MIN: 3
};
const DEBOUNCE_TIMEOUT = 150;
const DEFAULT_ERROR_SEARCH = 'Search not found';
const ERROR_BLOCK_SEARCH = 'There is no block with such number';
const TYPE_SEARCH_SECTION = {
  OBJECT_ID: 'Id',
  ACCOUNT: 'Account',
  BLOCK: 'Block',
  ASSET: 'Asset',
  CONTRACT: 'Contract',
  ERC_20: 'ERC20 token'
};

/***/ }),

/***/ "oqxO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rE0f");





const DEFAULT_FIELDS = new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"]({
  operations: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]([])
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'transaction',
  initialState: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(DEFAULT_FIELDS)))
}));

/***/ }),

/***/ "oz4i":
/***/ (function(module, exports) {

module.exports = require("apollo-cache-inmemory");

/***/ }),

/***/ "p0XB":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("R2Q7");

/***/ }),

/***/ "pLtp":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("qJj/");

/***/ }),

/***/ "pv/X":
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),

/***/ "qJj/":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),

/***/ "qNsG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js
var get_own_property_symbols = __webpack_require__("4mXO");
var get_own_property_symbols_default = /*#__PURE__*/__webpack_require__.n(get_own_property_symbols);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("pLtp");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose.js

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};

  var sourceKeys = keys_default()(source);

  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectWithoutProperties; });


function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (get_own_property_symbols_default.a) {
    var sourceSymbolKeys = get_own_property_symbols_default()(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/***/ }),

/***/ "qOIg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__("hfKm");

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

_Object$defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__("cDcd"));

exports.RouterContext = React.createContext(null);

/***/ }),

/***/ "r7XW":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/array/from");

/***/ }),

/***/ "rE0f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("pLtp");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("p0XB");
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rf6O");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux_modules_middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("UED3");
/* harmony import */ var redux_modules_middleware__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux_modules_middleware__WEBPACK_IMPORTED_MODULE_5__);







const TransformModules = defaultFields => ({
  set: {
    middleware: [Object(redux_modules_middleware__WEBPACK_IMPORTED_MODULE_5__["propCheck"])({
      field: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array]),
      value: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any,
      isFromJS: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
    })],
    reducer: (state, {
      payload
    }) => {
      if (_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1___default()(payload.field)) {
        state = state.setIn(payload.field, payload.isFromJS ? Object(immutable__WEBPACK_IMPORTED_MODULE_2__["fromJS"])(payload.value) : payload.value);
      } else {
        state = state.set(payload.field, payload.isFromJS ? Object(immutable__WEBPACK_IMPORTED_MODULE_2__["fromJS"])(payload.value) : payload.value);
      }

      return state;
    }
  },
  setMultiple: {
    reducer: (state, {
      payload
    }) => {
      _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(payload).forEach(field => {
        state = state.setIn(field.toString().split('.'), payload[field]);
      });

      return state;
    }
  },
  clear: {
    reducer: () => lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(defaultFields)
  },
  clearByField: {
    middleware: [Object(redux_modules_middleware__WEBPACK_IMPORTED_MODULE_5__["propCheck"])({
      field: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array])
    })],
    reducer: (state, {
      payload
    }) => {
      state = state.set(payload.field, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(defaultFields[payload.field]));
      return state;
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (TransformModules);

/***/ }),

/***/ "rX2I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js
var esm_extends = __webpack_require__("kOwS");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__("qNsG");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "rc-tooltip"
var external_rc_tooltip_ = __webpack_require__("FMsK");
var external_rc_tooltip_default = /*#__PURE__*/__webpack_require__.n(external_rc_tooltip_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__("rf6O");
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__("K2gz");
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// CONCATENATED MODULE: ./src/components/InfoTooltip/TooltipIcon.jsx
var __jsx = external_react_default.a.createElement;


const TooltipIcon = external_react_default.a.memo(({
  filled
}) => filled ? __jsx("svg", {
  width: "11",
  height: "10",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, __jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M5.33 9.7C2.73 9.7.63 7.5.63 5S2.73.3 5.33.3a4.7 4.7 0 110 9.4zm0-7.2c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5zm0 2c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5V5c0-.3-.2-.5-.5-.5z"
})) : __jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "9",
  height: "9",
  viewBox: "0 0 9 9"
}, __jsx("path", {
  d: "M4.5 2c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5zm0-2C2 0 0 2 0 4.5S2 9 4.5 9 9 7 9 4.5 7 0 4.5 0zm0 8C2.6 8 1 6.4 1 4.5S2.6 1 4.5 1 8 2.6 8 4.5 6.4 8 4.5 8zm0-4c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c0-.3-.2-.5-.5-.5z",
  fillRule: "evenodd",
  clipRule: "evenodd"
})));
TooltipIcon.propTypes = {
  filled: external_prop_types_default.a.bool.isRequired
};
/* harmony default export */ var InfoTooltip_TooltipIcon = (TooltipIcon);
// CONCATENATED MODULE: ./src/components/InfoTooltip/index.jsx


var InfoTooltip_jsx = external_react_default.a.createElement;





const InfoTooltip = external_react_default.a.memo((_ref) => {
  let {
    placement,
    iconFilled
  } = _ref,
      props = Object(objectWithoutProperties["a" /* default */])(_ref, ["placement", "iconFilled"]);

  return InfoTooltip_jsx(external_rc_tooltip_default.a, Object(esm_extends["a" /* default */])({
    trigger: ['hover'],
    placement: placement
  }, props), InfoTooltip_jsx("span", {
    className: external_classnames_default()('tooltip-icon', {
      filled: iconFilled
    })
  }, InfoTooltip_jsx(InfoTooltip_TooltipIcon, {
    filled: iconFilled
  })));
});
InfoTooltip.propTypes = {
  placement: external_prop_types_default.a.string,
  iconFilled: external_prop_types_default.a.bool
};
InfoTooltip.defaultProps = {
  placement: 'rightBottom',
  iconFilled: true
};
/* harmony default export */ var components_InfoTooltip = __webpack_exports__["a"] = (InfoTooltip);

/***/ }),

/***/ "rf6O":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "sP30":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js + 1 modules
var objectSpread = __webpack_require__("zrwo");

// EXTERNAL MODULE: external "echojs-lib"
var external_echojs_lib_ = __webpack_require__("moMR");
var external_echojs_lib_default = /*#__PURE__*/__webpack_require__.n(external_echojs_lib_);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: external "bignumber.js"
var external_bignumber_js_ = __webpack_require__("d/Cm");
var external_bignumber_js_default = /*#__PURE__*/__webpack_require__.n(external_bignumber_js_);

// EXTERNAL MODULE: ./src/actions/GlobalActions.js
var GlobalActions = __webpack_require__("K073");

// EXTERNAL MODULE: ./src/actions/BaseActionsClass.js
var BaseActionsClass = __webpack_require__("f3j0");

// EXTERNAL MODULE: ./src/reducers/StatisticsReducer.js
var StatisticsReducer = __webpack_require__("HxLW");

// EXTERNAL MODULE: external "graphql-tag"
var external_graphql_tag_ = __webpack_require__("txk1");
var external_graphql_tag_default = /*#__PURE__*/__webpack_require__.n(external_graphql_tag_);

// EXTERNAL MODULE: ./src/services/GraphqlService.js + 1 modules
var GraphqlService = __webpack_require__("xoST");

// CONCATENATED MODULE: ./src/services/queries/statistics.js


const getStatistics = async (from, interval) => {
  const query = external_graphql_tag_default.a`
    query getStatistics($from: String, $interval: Int){
      getDelegationPercent(from: $from, interval: $interval){
        delegatePercent,
        ratesMap {
          rate
        }
      }
      getDecentralizationRate(from: $from, interval: $interval){
        decentralizationRatePercent,
        ratesMap {
          rate
        }
      }
      getOperationCountHistory(from: $from, interval: $interval) {
        total,
        ratesMap {
          rate
        }
      }
  		getFrozenBalancesData(from: $from, interval: $interval){
   			frozenData {
      		frozenSums {
        		accounts_freeze_sum,
     				committee_freeze_sum
      		}
    		}
    		currentFrozenData {
    			accounts_freeze_sum,
      		committee_freeze_sum
    		}
			}
		}
  `;
  return GraphqlService["a" /* default */].getClient().query({
    query,
    variables: {
      from,
      interval
    }
  });
};
// EXTERNAL MODULE: ./src/constants/TotalSupplyConstants.js
var TotalSupplyConstants = __webpack_require__("DUps");

// EXTERNAL MODULE: ./src/actions/BlockActions.js
var BlockActions = __webpack_require__("e0mG");

// CONCATENATED MODULE: ./src/actions/StatisticsActions.js











class StatisticsActions_StatisticsActionsClass extends BaseActionsClass["a" /* default */] {
  /** Initialize reducer
   * @constructor
   */
  constructor() {
    super(StatisticsReducer["a" /* default */]);
  }
  /**
   * updateStatistics
   */


  updateStatistics(block) {
    const getBlock = {};
    return async dispatch => {
      const from = external_moment_default()().subtract(1, 'month').toISOString();
      const interval = external_moment_default.a.duration(1, 'day').as('second');

      try {
        const {
          data: {
            getDelegationPercent,
            getDecentralizationRate,
            getOperationCountHistory,
            getFrozenBalancesData
          }
        } = await getStatistics(from, interval);
        getBlock.average_block_time = block.average_block_time;
        getDecentralizationRate.decentralizationRatePercent = block.decentralization_rate;
        getFrozenBalancesData.frozen_balances_data = block.frozen_balances_data;
        await dispatch(Object(BlockActions["c" /* getLatestOperations */])());
        dispatch(this.updateTotalSupply(TotalSupplyConstants["b" /* MONITORING_ASSETS */]));
        dispatch(this.updateDelegationRate(getDelegationPercent));
        dispatch(this.updateDecentralizationRate(getDecentralizationRate));
        dispatch(this.updateOperationCount(getOperationCountHistory));
        dispatch(this.updateAverageBlocktime(getBlock));
        dispatch(this.updateFrozenData(getFrozenBalancesData));
      } catch (error) {//
      }
    };
  }
  /**
   * @method updateTotalSupply
   * @param {string[]} assetIds
   */


  updateTotalSupply(assetIds) {
    return async dispatch => {
      let assets = [];

      try {
        assets = await external_echojs_lib_default.a.api.getObjects(assetIds);
      } catch (_) {
        dispatch(GlobalActions["a" /* default */].toggleErrorPath(true));
      }

      assets = assets.reduce((map, asset) => Object(objectSpread["a" /* default */])({}, map, {
        [asset.id]: asset
      }), {});
      dispatch(this.setValue('assets', assets));
    };
  }
  /**
   *
   * @param delegatePercent
   * @param ratesMap
   * @return {Promise<function(...[*]=)>}
   */


  updateDelegationRate({
    delegatePercent,
    ratesMap
  }) {
    return dispatch => {
      dispatch(this.setMultipleValue({
        delegationRate: new external_bignumber_js_default.a(delegatePercent).integerValue(external_bignumber_js_default.a.ROUND_CEIL).toNumber(),
        delegationRates: ratesMap.map(el => ({
          rate: el.rate
        }))
      }));
    };
  }
  /**
   *
   * @param decentralizationPercent
   * @param ratesMap
   * @return {Promise<function(...[*]=)>}
   */


  updateDecentralizationRate({
    decentralizationRatePercent,
    ratesMap
  }) {
    return dispatch => {
      dispatch(this.setMultipleValue({
        decentralizationRate: new external_bignumber_js_default.a(decentralizationRatePercent).integerValue(external_bignumber_js_default.a.ROUND_CEIL).toNumber(),
        decentralizationRates: ratesMap.map(el => ({
          rate: el.rate
        }))
      }));
    };
  }
  /**
   *
   * @param updateOperationCount
   * @param ratesMap
   * @return {Promise<function(...[*]=)>}
   */


  updateOperationCount({
    total,
    ratesMap
  }) {
    return dispatch => {
      dispatch(this.setMultipleValue({
        operationCount: total,
        operationCountRates: ratesMap.map(({
          rate
        }) => ({
          rate
        }))
      }));
    };
  }
  /**
   *
   * @param updateAverageBlocktime
   * @param average_block_time
   * @return {Promise<function(...[*]=)>}
   */


  updateAverageBlocktime({
    average_block_time: averageBlockTime
  }) {
    return dispatch => {
      dispatch(this.setMultipleValue({
        averageBlockTime
      }));
    };
  }

  updateFrozenData(newBlock) {
    return dispatch => {
      const {
        frozenData
      } = newBlock;
      const historyFrozenData = frozenData.map(el => el.frozenSums);
      dispatch(this.setMultipleValue({
        currentFrozenData: newBlock.currentFrozenData,
        frozenData: historyFrozenData
      }));
    };
  }

}

const StatisticsActions = new StatisticsActions_StatisticsActionsClass();
/* harmony default export */ var actions_StatisticsActions = __webpack_exports__["a"] = (StatisticsActions);

/***/ }),

/***/ "tKMe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return KEY_CODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DEFAULT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return TITLE_TEMPLATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES; });
/* unused harmony export START_AVERAGE_TRS_BLOCKS */
/* unused harmony export MAX_AVERAGE_TRS_BLOCKS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return PAGE_BLOCKS_COUNT; });
/* unused harmony export PAGE_ADD_BLOCKS_COUNT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return MAX_BLOCK_REQUESTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return KEY_CODE_ENTER; });
/* unused harmony export KEY_CODE_ESC */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ERC20_REQIURED_HASHES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ERC20_HASHES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BYTECODE_SYMBOLS_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ECHO_ASSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return NATHAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return NULL_ACCOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DEFAULT_ROWS_COUNT; });
/* unused harmony export DEFAULT_OPERATION_HISTORY_ID */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CONTRACT_FIELDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return KILO_BYTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return MAX_LENGTH_CONTRACT_DESCRIPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return MIN_LENGTH_CONTRACT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return MAX_LENGTH_CONTRACT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return MAX_KB_CONTRACT_ICON; });
/* unused harmony export MAIN_HEADER_HEIGHT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return MAX_RETRIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return MAX_WIDTH_SCREEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return MIN_ACCESS_VERSION_BUILD; });
/* unused harmony export NO_TRANSACTIONS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return NETWORK_CONNECTED_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return NONE_SYMBOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return NOT_AVAILABLE_SYMBOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return TOKEN_TYPE; });
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("moMR");
/* harmony import */ var echojs_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(echojs_lib__WEBPACK_IMPORTED_MODULE_0__);

const KEY_CODES = {
  ENTER_CODE: 13,
  TAB_CODE: 9,
  ESC_CODE: 27,
  MINUS_CODE: 189,
  FIVE_NUMBER_CODE: 53,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
const DEFAULT_TITLE = 'Echo Explorer';
const TITLE_TEMPLATES = {
  MAIN: DEFAULT_TITLE,
  ACCOUNT: `Account name | ${DEFAULT_TITLE}`,
  BLOCK: `Block round | ${DEFAULT_TITLE}`,
  ASSET: `Asset name | ${DEFAULT_TITLE}`,
  OBJECT: `Object id | ${DEFAULT_TITLE}`,
  TRANSACTION: `Transaction index in block round | ${DEFAULT_TITLE}`,
  CONTRACT: `Contract id | ${DEFAULT_TITLE}`
};
const DYNAMIC_GLOBAL_BLOCKCHAIN_PROPERTIES = echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].DYNAMIC_GLOBAL_OBJECT_ID;
const START_AVERAGE_TRS_BLOCKS = 10;
const MAX_AVERAGE_TRS_BLOCKS = 100;
const PAGE_BLOCKS_COUNT = 11;
const PAGE_ADD_BLOCKS_COUNT = 10;
const MAX_BLOCK_REQUESTS = PAGE_BLOCKS_COUNT;
const KEY_CODE_ENTER = 13;
const KEY_CODE_ESC = 27;
const ERC20_REQIURED_HASHES = {
  'allowance(address,address)': 'dd62ed3e',
  'approve(address,uint256)': '095ea7b3',
  'balanceOf(address)': '70a08231',
  'totalSupply()': '18160ddd',
  'transfer(address,uint256)': 'a9059cbb',
  'transferFrom(address,address,uint256)': '23b872dd',
  'Transfer(address,address,uint256)': 'ddf252ad',
  'Approval(address,address,uint256)': '8c5be1e5'
};
const ERC20_HASHES = {
  'increaseAllowance(address,uint256)': '39509351',
  'allowance(address,address)': 'dd62ed3e',
  'approve(address,uint256)': '095ea7b3',
  'balanceOf(address)': '70a08231',
  'decimals()': '313ce567',
  'decreaseAllowance(address,uint256)': 'a457c2d7',
  'symbol()': '95d89b41',
  'totalSupply()': '18160ddd',
  'transfer(address,uint256)': 'a9059cbb',
  'transferFrom(address,address,uint256)': '23b872dd',
  'Transfer(address,address,uint256)': 'ddf252ad',
  'Approval(address,address,uint256)': '8c5be1e5',
  'Withdrawal(address, uint256)': '7fcf532c',
  'Deposit(address, uint256)': 'e1fffcc4'
};
const BYTECODE_SYMBOLS_LENGTH = 616;
const ECHO_ASSET = {
  ID: echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].CORE_ASSET_ID,
  SYMBOL: 'ECHO',
  PRECISION: 8
};
const NATHAN = {
  ID: `1.${echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].PROTOCOL_OBJECT_TYPE_ID.ACCOUNT}.15`
};
const NULL_ACCOUNT = {
  ID: `1.${echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].PROTOCOL_OBJECT_TYPE_ID.ACCOUNT}.0`
};
const DEFAULT_ROWS_COUNT = 50;
const DEFAULT_OPERATION_HISTORY_ID = echojs_lib__WEBPACK_IMPORTED_MODULE_0__["constants"].API_CONFIG.STOP_OPERATION_HISTORY_ID;
const CONTRACT_FIELDS = {
  NAME: 'name',
  DESCRIPTION: 'description',
  ICON: 'icon'
};
const KILO_BYTE = 1024;
const MAX_LENGTH_CONTRACT_DESCRIPTION = 256;
const MIN_LENGTH_CONTRACT_NAME = 2;
const MAX_LENGTH_CONTRACT_NAME = 16;
const MAX_KB_CONTRACT_ICON = 200;
const MAIN_HEADER_HEIGHT = 250;
const MAX_RETRIES = 999999999;
const MAX_WIDTH_SCREEN = 768;
const MIN_ACCESS_VERSION_BUILD = '0.4.0';
const NO_TRANSACTIONS = 'No transactions in recent blocks';
const NETWORK_CONNECTED_ERROR = 'Couldn\'t reach server or bad internet access';
const NONE_SYMBOL = '-';
const NOT_AVAILABLE_SYMBOL = 'N/A';
const TOKEN_TYPE = 'TOKEN';

/***/ }),

/***/ "ttDY":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("zQQD");

/***/ }),

/***/ "txk1":
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "uE89":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("rE0f");
/* harmony import */ var _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("tKMe");






const DEFAULT_FIELDS = Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Map"])({
  title: _constants_GlobalConstants__WEBPACK_IMPORTED_MODULE_5__[/* DEFAULT_TITLE */ "d"],
  historyLength: 0,
  history: {
    path: '',
    route: ''
  },
  connected: false,
  connectedServer: false,
  error: '',
  errorPath: false,
  errorScreen: false,
  activeAccount: new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"](),
  isMobile: false
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'global',
  initialState: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(DEFAULT_FIELDS)), {
    set: {
      reducer: (state, {
        payload
      }) => {
        state = state.set(payload.field, payload.value);
        return state;
      }
    }
  })
}));

/***/ }),

/***/ "v7Px":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("BGkK");

/***/ }),

/***/ "vuC2":
/***/ (function(module, exports) {

module.exports = require("apollo-link");

/***/ }),

/***/ "wRB0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_TableConstants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("hgd8");
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("rE0f");






const DEFAULT_FIELDS = Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Map"])({
  totalDataSize: 0,
  sizePerPage: _constants_TableConstants__WEBPACK_IMPORTED_MODULE_4__[/* DEFAULT_SIZE_PER_PAGE */ "e"],
  currentPage: 1,
  filters: {
    from: '',
    to: ''
  }
});
const DEFAULT_STATE = Object(immutable__WEBPACK_IMPORTED_MODULE_2__["Map"])({
  [_constants_TableConstants__WEBPACK_IMPORTED_MODULE_4__[/* ACCOUNT_GRID */ "a"]]: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  [_constants_TableConstants__WEBPACK_IMPORTED_MODULE_4__[/* CONTRACT_GRID */ "c"]]: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  [_constants_TableConstants__WEBPACK_IMPORTED_MODULE_4__[/* BLOCK_GRID */ "b"]]: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  [_constants_TableConstants__WEBPACK_IMPORTED_MODULE_4__[/* TRANSACTION_GRID */ "g"]]: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS)
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'grid',
  initialState: DEFAULT_STATE,
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(DEFAULT_STATE)), {
    setTotalDataSize: {
      reducer: (state, {
        payload
      }) => {
        state = state.setIn([payload.gridName, 'totalDataSize'], payload.totalDataSize);
        return state;
      }
    },
    initData: {
      reducer: (state, {
        payload
      }) => {
        state = state.set(payload.gridName, new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"](payload.params));
        return state;
      }
    },
    setSort: {
      reducer: (state, {
        payload
      }) => {
        state = state.setIn([payload.gridName, 'sort', 'field'], payload.field);
        state = state.setIn([payload.gridName, 'sort', 'destination'], payload.destination);
        return state;
      }
    },
    setPage: {
      reducer: (state, {
        payload
      }) => {
        state = state.setIn([payload.gridName, 'currentPage'], payload.currentPage);
        return state;
      }
    },
    setFilter: {
      reducer: (state, {
        payload
      }) => {
        state = state.setIn([payload.gridName, 'filters'], payload.params);
        return state;
      }
    },
    clearByField: {
      reducer: (state, {
        payload
      }) => {
        state = state.set(payload.gridName, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS));
        return state;
      }
    }
  })
}));

/***/ }),

/***/ "wa65":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/parse-int");

/***/ }),

/***/ "whx4":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgMTcgNSI+PGc+PGc+PHBhdGggZD0iTTE3IDIuNUwxNCA1VjB6TTEwIDJoMXYxaC0xem0yIDBoMXYxaC0xek04IDJoMXYxSDh6TTYgMmgxdjFINnpNNCAyaDF2MUg0ek0yIDJoMXYxSDJ6TTAgMmgxdjFIMHoiLz48L2c+PC9nPjwvc3ZnPg=="

/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "xCUU":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE2IiBoZWlnaHQ9IjExNiIgdmlld0JveD0iMCAwIDExNiAxMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDEwNEMxMTAuNiAwIDExNiAwIDExNiAwVjEwNEMxMTYgMTEwLjYgMTE2IDExNiAxMTYgMTE2SDEyQzUuNCAxMTYgMCAxMTYgMCAxMTZWMTJDMCA1LjQgMCAwIDAgMFoiIGZpbGw9IiNBMjhCREUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04MC4xOTk5IDU2LjZDODAuMTk5OSAzMC42IDYzLjcgOC40IDQwLjUgMEg1NS4yOTk5QzU5LjU5OTkgMi43IDYzLjQ5OTkgNS44IDY3LjE5OTkgOS40QzczLjI5OTkgMTUuNSA3OC4xIDIyLjcgODEuNSAzMC42Qzg1IDM4LjggODYuNjk5OSA0Ny41IDg2LjY5OTkgNTYuNUM4Ni42OTk5IDY1LjUgODUgNzQuMyA4MS41IDgyLjVDNzguMSA5MC40IDczLjI5OTkgOTcuNiA2Ny4xOTk5IDEwMy43QzYyLjE5OTkgMTA4LjcgNTYuNSAxMTIuOCA1MC4yIDExNkgyOS4yQzU4LjEgMTExLjYgODAuMTk5OSA4Ni43IDgwLjE5OTkgNTYuNloiIGZpbGw9IiM1NDQ0ODYiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNNDUuOTAwMSAxNy4zQzIzLjEwMDEgMTcuMyA0LjYwMDEgMzUuOCA0LjYwMDEgNTguNkM0LjYwMDEgODEuNCAyMy4xMDAxIDk5LjkwMDEgNDUuOTAwMSA5OS45MDAxQzY4LjcwMDEgOTkuOTAwMSA4Ny4yMDAxIDgxLjQgODcuMjAwMSA1OC42Qzg3LjIwMDEgMzUuOCA2OC43MDAxIDE3LjMgNDUuOTAwMSAxNy4zWiIgZmlsbD0iIzU0NDQ4NiIvPgo8cGF0aCBkPSJNNDcuNSA0OC42QzQ2LjQgNDUuOSA0NC44IDQzLjYgNDIuNyA0MS41QzQwLjcgMzkuNSAzOC4zIDM3LjggMzUuNiAzNi43QzMyLjkgMzUuNSAzMCAzNSAyNi45IDM1QzIzLjggMzUgMjEgMzUuNiAxOC4yIDM2LjhDMTUuNSAzNy45IDEzLjIgMzkuNSAxMS4xIDQxLjZDOS4xIDQzLjYgNy40IDQ2IDYuMyA0OC43QzUuMSA1MS40IDQuNSA1NC40IDQuNSA1Ny40QzQuNSA2MC40IDUuMSA2My4zIDYuMyA2Ni4xQzcuNCA2OC44IDkgNzEuMSAxMS4xIDczLjJDMTMuMSA3NS4yIDE1LjUgNzYuOSAxOC4yIDc4QzIwLjkgNzkuMiAyMy45IDc5LjggMjYuOSA3OS44QzI5LjkgNzkuOCAzMi44IDc5LjIgMzUuNiA3OEMzOC4zIDc2LjkgNDAuNiA3NS4zIDQyLjcgNzMuMkM0NC43IDcxLjIgNDYuNCA2OC44IDQ3LjUgNjYuMUM0OC43IDYzLjQgNDkuMyA2MC40IDQ5LjMgNTcuNEM0OS4zIDU0LjQgNDguNiA1MS4zIDQ3LjUgNDguNlpNMjcuNCA3My44QzE4LjMgNzMuOCAxMSA2Ni41IDExIDU3LjRDMTEgNDguMyAxOC4zIDQxIDI3LjQgNDFDMzYuNSA0MSA0My44IDQ4LjMgNDMuOCA1Ny40QzQzLjggNjYuNSAzNi40IDczLjggMjcuNCA3My44WiIgZmlsbD0iIzU0NDQ4NiIvPgo8cGF0aCBkPSJNNDUuOSAyMy45QzI2LjcgMjMuOSAxMS4xIDM5LjUgMTEuMSA1OC43QzExLjEgNzcuOSAyNi43IDkzLjUgNDUuOSA5My41QzY1LjEgOTMuNSA4MC43IDc3LjkgODAuNyA1OC43QzgwLjcgMzkuNSA2NS4xIDIzLjkgNDUuOSAyMy45Wk00NS45IDE3LjRDNTEuNSAxNy40IDU2LjkgMTguNSA2MS45IDIwLjZDNjYuOCAyMi43IDcxLjIgMjUuNiA3NSAyOS40Qzc4LjggMzMuMiA4MS44IDM3LjYgODMuOCA0Mi41Qzg1LjkgNDcuNiA4NyA1MyA4NyA1OC41Qzg3IDY0IDg1LjkgNjkuNSA4My44IDc0LjVDODEuNyA3OS40IDc4LjggODMuOCA3NSA4Ny42QzcxLjIgOTEuNCA2Ni44IDk0LjQgNjEuOSA5Ni40QzU2LjggOTguNSA1MS40IDk5LjYgNDUuOSA5OS42QzQwLjQgOTkuNiAzNC45IDk4LjUgMjkuOSA5Ni40QzI1IDk0LjMgMjAuNiA5MS40IDE2LjggODcuNkMxMyA4NCA5Ljk5OTk1IDc5LjYgNy44OTk5NSA3NC43QzUuNzk5OTUgNjkuNiA0LjY5OTk1IDY0LjIgNC42OTk5NSA1OC43QzQuNjk5OTUgNTMuMiA1Ljc5OTk1IDQ3LjcgNy44OTk5NSA0Mi43QzkuOTk5OTUgMzcuOCAxMi45IDMzLjQgMTYuNyAyOS42QzIwLjUgMjUuOCAyNC44OTk5IDIyLjggMjkuNzk5OSAyMC44QzM0Ljg5OTkgMTguNSA0MC4zIDE3LjQgNDUuOSAxNy40WiIgZmlsbD0iIzU0NDQ4NiIvPgo8L3N2Zz4K"

/***/ }),

/***/ "xoST":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "apollo-client"
var external_apollo_client_ = __webpack_require__("Oyez");

// EXTERNAL MODULE: external "apollo-cache-inmemory"
var external_apollo_cache_inmemory_ = __webpack_require__("oz4i");

// EXTERNAL MODULE: external "apollo-link-http"
var external_apollo_link_http_ = __webpack_require__("TG1l");

// EXTERNAL MODULE: external "apollo-link-ws"
var external_apollo_link_ws_ = __webpack_require__("EN0U");

// EXTERNAL MODULE: external "apollo-link"
var external_apollo_link_ = __webpack_require__("vuC2");

// EXTERNAL MODULE: external "apollo-utilities"
var external_apollo_utilities_ = __webpack_require__("fflE");

// EXTERNAL MODULE: ./src/constants/GlobalConstants.js
var GlobalConstants = __webpack_require__("tKMe");

// CONCATENATED MODULE: ./src/constants/GraphqlConstans.js
const OPERATION_DEFINITION = 'OperationDefinition';
const SUBSCRIPTION = 'subscription';
// EXTERNAL MODULE: ./src/config/chain.js
var chain = __webpack_require__("ggud");

// CONCATENATED MODULE: ./src/services/GraphqlService.js










__webpack_require__("pv/X").polyfill();

__webpack_require__("W+0S");

const cache = new external_apollo_cache_inmemory_["InMemoryCache"]({
  dataIdFromObject: o => o._id ? `${o.__typename}:${o._id}` : null // eslint-disable-line no-underscore-dangle

});
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  }
};

class GraphqlService_GraphqlBrowser {
  constructor() {
    const httpLink = new external_apollo_link_http_["HttpLink"]({
      uri: chain["a" /* default */].GRAPHQL_URL.HTTP
    });
    const wsLink = new external_apollo_link_ws_["WebSocketLink"]({
      uri: chain["a" /* default */].GRAPHQL_URL.WS,
      options: {
        reconnect: true,
        reconnectionAttempts: GlobalConstants["p" /* MAX_RETRIES */]
      }
    });
    const link = Object(external_apollo_link_["split"])(({
      query
    }) => {
      const {
        kind,
        operation
      } = Object(external_apollo_utilities_["getMainDefinition"])(query);
      return kind === OPERATION_DEFINITION && operation === SUBSCRIPTION;
    }, wsLink, httpLink);
    this.client = new external_apollo_client_["ApolloClient"]({
      cache,
      link,
      defaultOptions
    });
  }

  getClient() {
    return this.client;
  }

}

class GraphqlService_GraphqlNode {
  constructor() {
    const httpLink = new external_apollo_link_http_["HttpLink"]({
      uri: chain["a" /* default */].GRAPHQL_URL.HTTP
    });
    this.client = new external_apollo_client_["ApolloClient"]({
      cache,
      link: httpLink,
      defaultOptions
    });
  }

  getClient() {
    return this.client;
  }

}

const client = false ? undefined : new GraphqlService_GraphqlNode();
/* harmony default export */ var GraphqlService = __webpack_exports__["a"] = (client);

/***/ }),

/***/ "zQQD":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/set");

/***/ }),

/***/ "zrwo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js
var get_own_property_descriptor = __webpack_require__("Jo+v");
var get_own_property_descriptor_default = /*#__PURE__*/__webpack_require__.n(get_own_property_descriptor);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js
var get_own_property_symbols = __webpack_require__("4mXO");
var get_own_property_symbols_default = /*#__PURE__*/__webpack_require__.n(get_own_property_symbols);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("pLtp");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("hfKm");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    define_property_default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectSpread; });




function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = keys_default()(source);

    if (typeof get_own_property_symbols_default.a === 'function') {
      ownKeys = ownKeys.concat(get_own_property_symbols_default()(source).filter(function (sym) {
        return get_own_property_descriptor_default()(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/***/ })

/******/ });