module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+4bY":
/***/ (function(module, exports) {

module.exports = require("core-js/es6/string");

/***/ }),

/***/ "+oT+":
/***/ (function(module, exports, __webpack_require__) {

var _Promise = __webpack_require__("eVuF");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    _Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "+th8":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

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

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Q0q4");


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

/***/ "6BQ9":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("wa65");

/***/ }),

/***/ "8Bbg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("B5Ud")


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

/***/ "A1cq":
/***/ (function(module, exports) {

module.exports = require("mobile-detect");

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

/***/ "B5Ud":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("KI45");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("htGi"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__("+oT+"));

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _propTypes = _interopRequireDefault(__webpack_require__("rf6O"));

var _utils = __webpack_require__("g/15");

exports.AppInitialProps = _utils.AppInitialProps;

var _router = __webpack_require__("nOHt");
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/


function appGetInitialProps(_x) {
  return _appGetInitialProps.apply(this, arguments);
}

function _appGetInitialProps() {
  _appGetInitialProps = (0, _asyncToGenerator2.default)(function* (_ref) {
    let {
      Component,
      ctx
    } = _ref;
    const pageProps = yield (0, _utils.loadGetInitialProps)(Component, ctx);
    return {
      pageProps
    };
  });
  return _appGetInitialProps.apply(this, arguments);
}

class App extends _react.default.Component {
  getChildContext() {
    return {
      router: (0, _router.makePublicRouterInstance)(this.props.router)
    };
  } // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level


  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    const {
      router,
      Component,
      pageProps
    } = this.props;
    const url = createUrl(router);
    return _react.default.createElement(Component, (0, _extends2.default)({}, pageProps, {
      url: url
    }));
  }

}

exports.default = App;
App.childContextTypes = {
  router: _propTypes.default.object
};
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
let warnContainer;
let warnUrl;

if (false) {} // @deprecated noop for now until removal


function Container(p) {
  if (false) {}
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  const {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (false) {}
      return query;
    },

    get pathname() {
      if (false) {}
      return pathname;
    },

    get asPath() {
      if (false) {}
      return asPath;
    },

    back: () => {
      if (false) {}
      router.back();
    },
    push: (url, as) => {
      if (false) {}
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (false) {}
      const pushRoute = as ? href : '';
      const pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (false) {}
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (false) {}
      const replaceRoute = as ? href : '';
      const replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

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

/***/ "Cg2A":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("y6vh");

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

/***/ "FQ1z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("K2gz");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Logotype__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("H6aG");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




class BaseErrorComponent extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    const {
      titlePage,
      description,
      titleButton,
      typeError
    } = this.props;
    return __jsx("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('not-found-page', typeError)
    }, __jsx("div", {
      className: "logo-container"
    }, __jsx(_components_Logotype__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
      onClick: () => this.props.onHandler()
    })), __jsx("div", {
      className: "container"
    }, __jsx("div", {
      className: "img"
    }), __jsx("div", {
      className: "txt-block"
    }, __jsx("div", {
      className: "title"
    }, titlePage), description && __jsx("div", {
      className: "desc"
    }, description), __jsx("button", {
      className: "n-f-button",
      onClick: () => this.props.onHandler()
    }, titleButton))));
  }

}

BaseErrorComponent.defaultProps = {
  description: '',
  typeError: ''
};
/* harmony default export */ __webpack_exports__["a"] = (BaseErrorComponent);

/***/ }),

/***/ "FfxO":
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

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

/***/ "GPYY":
/***/ (function(module, exports) {

module.exports = require("core-js/es6/array");

/***/ }),

/***/ "H6aG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const Logotype = ({
  onClick
}) => __jsx("a", {
  href: "",
  className: "logotype",
  onClick: e => {
    e.preventDefault();
    onClick();
  }
}, __jsx("svg", {
  className: "logotype-max",
  width: "171",
  height: "33",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, __jsx("path", {
  d: "M49.08 22h7.13v-1.66h-5.16v-2.97h4.75V15.7h-4.75v-2.96h5.12v-1.66h-7.1V22zm11.35-8.18h-2.05l2.43 4.09-2.5 4.09h2.05l1.72-2.95L63.81 22h2.03l-2.5-4.1 2.46-4.08h-2.04l-1.68 3.02-1.65-3.02zm7.61 11.25h1.93V20.7h.08c.3.6.94 1.43 2.34 1.43 1.93 0 3.37-1.52 3.37-4.22 0-2.73-1.48-4.2-3.37-4.2-1.45 0-2.05.86-2.34 1.45h-.11v-1.35h-1.9v11.25zm1.9-7.16c0-1.59.67-2.62 1.91-2.62 1.29 0 1.95 1.1 1.95 2.62 0 1.53-.67 2.65-1.95 2.65-1.23 0-1.92-1.06-1.92-2.65zm10.15-6.82h-1.93V22h1.93V11.1zm6.3 11.07c2.4 0 3.93-1.69 3.93-4.22s-1.53-4.23-3.93-4.23c-2.4 0-3.92 1.7-3.92 4.23 0 2.53 1.53 4.22 3.92 4.22zm.02-1.54c-1.33 0-1.98-1.19-1.98-2.68 0-1.5.65-2.7 1.98-2.7 1.3 0 1.95 1.2 1.95 2.7 0 1.5-.65 2.68-1.95 2.68zM92.7 22h1.92v-4.81c0-1.04.78-1.77 1.84-1.77.33 0 .73.05.9.1v-1.77a4.62 4.62 0 00-.7-.05c-.93 0-1.72.53-2.01 1.48h-.09v-1.36H92.7V22zm9.97.16c1.91 0 3.22-.93 3.56-2.35l-1.8-.2c-.26.69-.9 1.05-1.73 1.05-1.25 0-2.07-.82-2.09-2.22h5.7v-.6c0-2.87-1.72-4.13-3.74-4.13-2.34 0-3.87 1.72-3.87 4.25 0 2.56 1.5 4.2 3.97 4.2zm-2.05-5.02a1.97 1.97 0 011.98-1.93c1.1 0 1.85.81 1.86 1.93h-3.84zM108.7 22h1.93v-4.81c0-1.04.79-1.77 1.84-1.77.33 0 .73.05.9.1v-1.77a4.64 4.64 0 00-.7-.05c-.93 0-1.71.53-2.01 1.48h-.09v-1.36h-1.87V22zm6.95.12c.63 0 1.17-.52 1.17-1.17 0-.64-.54-1.17-1.17-1.17-.65 0-1.18.53-1.17 1.17 0 .65.52 1.17 1.17 1.17zm8.13-.12h7.14v-1.66h-5.16v-2.97h4.75V15.7h-4.75v-2.96h5.12v-1.66h-7.1V22zm13.35.16c2.05 0 3.36-1.22 3.5-2.96h-1.84a1.6 1.6 0 01-1.65 1.39c-1.2 0-1.98-1-1.98-2.68 0-1.65.8-2.64 1.98-2.64.93 0 1.5.6 1.65 1.38h1.84c-.13-1.77-1.51-2.94-3.51-2.94-2.4 0-3.91 1.73-3.91 4.23 0 2.48 1.47 4.22 3.92 4.22zm7.77-4.95c0-1.19.73-1.87 1.76-1.87 1.02 0 1.61.65 1.61 1.75V22h1.93v-5.2c0-1.99-1.12-3.09-2.82-3.09-1.25 0-2.05.57-2.43 1.5h-.1v-4.12h-1.88V22h1.93v-4.8zm11.58 4.95c2.4 0 3.93-1.69 3.93-4.22s-1.53-4.23-3.93-4.23c-2.4 0-3.92 1.7-3.92 4.23 0 2.53 1.53 4.22 3.92 4.22zm.02-1.54c-1.33 0-1.98-1.19-1.98-2.68 0-1.5.65-2.7 1.97-2.7 1.31 0 1.96 1.2 1.96 2.7 0 1.5-.65 2.68-1.95 2.68z",
  fill: "#E9EAEF"
}), __jsx("path", {
  d: "M34 16.5c0-.48 0-.97-.08-1.45C33.19 6.6 25.9 0 17 0 7.61 0 0 7.4 0 16.5S7.61 33 17 33c8.9 0 16.2-6.6 16.92-15.05v-.24c.08-.4.08-.8.08-1.21zm-1.05.89a8.91 8.91 0 01-2.75 5.55 9.31 9.31 0 01-6.72 2.66c-2.1 0-4.13-.65-5.75-1.94 1.13.49 2.35.8 3.64.8 4.62 0 8.34-3.61 8.34-8.04s-3.72-8.05-8.34-8.05c-1.3 0-2.5.32-3.64.8a9.68 9.68 0 0112.47.73 9.34 9.34 0 012.75 5.55c0 .33.08.65.08.89v.08c-.08.4-.08.72-.08.97zM19.19 11.5c1.37 0 2.67.56 3.64 1.45a4.92 4.92 0 011.54 3.54 5.09 5.09 0 01-5.18 4.99c-1.3 0-2.6-.48-3.49-1.37a3.95 3.95 0 005.34-3.62 3.9 3.9 0 00-3.96-3.86c-.48 0-.89.08-1.38.24a4.98 4.98 0 013.49-1.37zm-2.43 10.46c.73.33 1.62.49 2.5.49 3.4 0 6.16-2.66 6.16-5.96s-2.75-5.96-6.15-5.96c-.9 0-1.7.16-2.51.49a7.31 7.31 0 014.61-1.61c1.94 0 3.8.72 5.18 2.09a6.99 6.99 0 010 9.98 7.3 7.3 0 01-5.18 2.1c-1.7 0-3.32-.57-4.61-1.62zm.32-8.37c1.62 0 3 1.29 3 2.9 0 1.61-1.38 2.9-3 2.9s-3-1.29-3-2.9c0-1.61 1.3-2.9 3-2.9zm6.48-7.24c-5.5 0-10.04 4.1-10.45 9.34 0 .24-.08.56-.08.8s0 .56.08.8c.4 5.24 4.94 9.34 10.45 9.34 1.7 0 3.32-.4 4.77-1.13-.8.57-1.62 1.05-2.43 1.37-1.45.57-2.9.89-4.53.89-1.54 0-3.07-.32-4.53-.89a12.32 12.32 0 01-3.73-2.41 11.22 11.22 0 01-2.5-3.62c-.57-1.37-.9-2.9-.9-4.43a12 12 0 01.9-4.43 11.4 11.4 0 016.23-6.04c1.46-.56 2.91-.88 4.53-.88 1.54 0 3.08.32 4.53.89.9.32 1.7.8 2.43 1.36a13.3 13.3 0 00-4.77-.96zm-2.19-2.17c-6.96 0-12.63 5.47-12.63 12.31 0 6.76 5.67 12.31 12.63 12.31 2.1 0 4.13-.48 5.91-1.44-.8.56-1.7 1.12-2.67 1.53-1.7.72-3.48 1.04-5.34 1.04-1.87 0-3.65-.32-5.35-1.04A12.2 12.2 0 019.55 26a12.6 12.6 0 01-4.13-9.5c0-1.85.4-3.54 1.06-5.23.72-1.61 1.7-3.06 3-4.27a12.8 12.8 0 014.28-2.81c1.7-.73 3.48-1.05 5.34-1.05a14.11 14.11 0 018.01 2.5 12.16 12.16 0 00-5.74-1.45zM17 32.03a16.22 16.22 0 01-11.33-4.5 15.55 15.55 0 01-4.7-10.95c0-2.1.4-4.1 1.3-6.04a14.88 14.88 0 013.4-4.9 14.27 14.27 0 015.1-3.3C12.7 1.52 14.8 1.12 17 1.12a16.22 16.22 0 019.23 2.81 14.68 14.68 0 00-7.04-1.69C11 2.25 4.37 8.7 4.37 16.66s6.64 14.4 14.82 14.4c2.5 0 4.93-.64 7.04-1.68-.9.64-1.94 1.2-3 1.6A19.84 19.84 0 0117 32.04z",
  fill: "#2995D8"
})), __jsx("svg", {
  className: "logotype-min",
  width: "34",
  height: "33",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, __jsx("path", {
  d: "M34 16.5c0-.48 0-.97-.08-1.45C33.19 6.6 25.9 0 17 0 7.61 0 0 7.4 0 16.5S7.61 33 17 33c8.9 0 16.2-6.6 16.92-15.05v-.24c.08-.4.08-.8.08-1.21zm-1.05.89a8.91 8.91 0 01-2.75 5.55 9.31 9.31 0 01-6.72 2.66c-2.1 0-4.13-.65-5.75-1.94 1.13.49 2.35.8 3.64.8 4.62 0 8.34-3.61 8.34-8.04s-3.72-8.05-8.34-8.05c-1.3 0-2.5.32-3.64.8a9.68 9.68 0 0112.47.73 9.34 9.34 0 012.75 5.55c0 .33.08.65.08.89v.08c-.08.4-.08.72-.08.97zM19.19 11.5c1.37 0 2.67.56 3.64 1.45a4.92 4.92 0 011.54 3.54 5.09 5.09 0 01-5.18 4.99c-1.3 0-2.6-.48-3.49-1.37a3.95 3.95 0 005.34-3.62 3.9 3.9 0 00-3.96-3.86c-.48 0-.89.08-1.38.24a4.98 4.98 0 013.49-1.37zm-2.43 10.46c.73.33 1.62.49 2.5.49 3.4 0 6.16-2.66 6.16-5.96s-2.75-5.96-6.15-5.96c-.9 0-1.7.16-2.51.49a7.31 7.31 0 014.61-1.61c1.94 0 3.8.72 5.18 2.09a6.99 6.99 0 010 9.98 7.3 7.3 0 01-5.18 2.1c-1.7 0-3.32-.57-4.61-1.62zm.32-8.37c1.62 0 3 1.29 3 2.9 0 1.61-1.38 2.9-3 2.9s-3-1.29-3-2.9c0-1.61 1.3-2.9 3-2.9zm6.48-7.24c-5.5 0-10.04 4.1-10.45 9.34 0 .24-.08.56-.08.8s0 .56.08.8c.4 5.24 4.94 9.34 10.45 9.34 1.7 0 3.32-.4 4.77-1.13-.8.57-1.62 1.05-2.43 1.37-1.45.57-2.9.89-4.53.89-1.54 0-3.07-.32-4.53-.89a12.32 12.32 0 01-3.73-2.41 11.22 11.22 0 01-2.5-3.62c-.57-1.37-.9-2.9-.9-4.43a12 12 0 01.9-4.43 11.4 11.4 0 016.23-6.04c1.46-.56 2.91-.88 4.53-.88 1.54 0 3.08.32 4.53.89.9.32 1.7.8 2.43 1.36a13.3 13.3 0 00-4.77-.96zm-2.19-2.17c-6.96 0-12.63 5.47-12.63 12.31 0 6.76 5.67 12.31 12.63 12.31 2.1 0 4.13-.48 5.91-1.44-.8.56-1.7 1.12-2.67 1.53-1.7.72-3.48 1.04-5.34 1.04-1.87 0-3.65-.32-5.35-1.04A12.2 12.2 0 019.55 26a12.6 12.6 0 01-4.13-9.5c0-1.85.4-3.54 1.06-5.23.72-1.61 1.7-3.06 3-4.27a12.8 12.8 0 014.28-2.81c1.7-.73 3.48-1.05 5.34-1.05a14.11 14.11 0 018.01 2.5 12.16 12.16 0 00-5.74-1.45zM17 32.03a16.22 16.22 0 01-11.33-4.5 15.55 15.55 0 01-4.7-10.95c0-2.1.4-4.1 1.3-6.04a14.88 14.88 0 013.4-4.9 14.27 14.27 0 015.1-3.3C12.7 1.52 14.8 1.12 17 1.12a16.22 16.22 0 019.23 2.81 14.68 14.68 0 00-7.04-1.69C11 2.25 4.37 8.7 4.37 16.66s6.64 14.4 14.82 14.4c2.5 0 4.93-.64 7.04-1.68-.9.64-1.94 1.2-3 1.6A19.84 19.84 0 0117 32.04z",
  fill: "#2995D8"
})));

Logotype.defaultProps = {
  onClick: null
};
/* harmony default export */ __webpack_exports__["a"] = (Logotype);

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

/***/ "I5Wo":
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
  data: null,
  loading: false
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'objects',
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

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

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

/***/ "LZ+5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("LR/J");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("UXZV");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("pLtp");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("zrwo");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("WKeQ");
/* harmony import */ var redux_modules__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_modules__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("nuGg");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("YLtl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("SYHU");
/* harmony import */ var _utils_TransformModules__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("rE0f");









const DEFAULT_FIELDS = Object(immutable__WEBPACK_IMPORTED_MODULE_5__["Map"])({
  error: null,
  loading: false
});
const DEFAULT_FORM_FIELDS = {
  [_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_LOGIN */ "c"]]: Object(immutable__WEBPACK_IMPORTED_MODULE_5__["Map"])({
    login: {
      value: '',
      error: null
    },
    password: {
      value: '',
      error: null
    }
  }),
  [_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_CONTRACT_VERIFY */ "b"]]: Object(immutable__WEBPACK_IMPORTED_MODULE_5__["Map"])({
    code: '',
    currentCompiler: {
      value: '',
      error: null
    },
    contractName: '',
    contractInputs: Object(immutable__WEBPACK_IMPORTED_MODULE_5__["Map"])({})
  }),
  [_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_MANAGE_CONTRACT */ "d"]]: new immutable__WEBPACK_IMPORTED_MODULE_5__["Map"]({
    isChangedForm: false,
    isErrorForm: false,
    contractId: '',
    name: {
      value: '',
      error: ''
    },
    description: {
      value: '',
      error: ''
    },
    icon: {
      value: null,
      error: ''
    },
    iconBase64: {
      value: ''
    }
  }),
  [_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_ABI */ "a"]]: Object(immutable__WEBPACK_IMPORTED_MODULE_5__["Map"])({
    abi: {
      value: '',
      error: ''
    }
  })
};
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_4__["createModule"])({
  name: 'form',
  initialState: Object(immutable__WEBPACK_IMPORTED_MODULE_5__["Map"])({
    [_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_LOGIN */ "c"]]: lodash__WEBPACK_IMPORTED_MODULE_6___default.a.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_LOGIN */ "c"]]),
    [_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_CONTRACT_VERIFY */ "b"]]: lodash__WEBPACK_IMPORTED_MODULE_6___default.a.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_CONTRACT_VERIFY */ "b"]]),
    [_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_MANAGE_CONTRACT */ "d"]]: lodash__WEBPACK_IMPORTED_MODULE_6___default.a.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_MANAGE_CONTRACT */ "d"]]),
    [_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_ABI */ "a"]]: lodash__WEBPACK_IMPORTED_MODULE_6___default.a.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[_constants_FormConstants__WEBPACK_IMPORTED_MODULE_7__[/* FORM_ABI */ "a"]])
  }),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_6___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(DEFAULT_FIELDS)), {
    set: {
      reducer: (state, {
        payload
      }) => {
        state = state.setIn([payload.form, payload.field], payload.value);
        return state;
      }
    },
    setIn: {
      reducer: (state, {
        payload
      }) => {
        _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default()(payload.params).forEach(field => {
          state = state.setIn([payload.form, field], payload.params[field]);
        });

        return state;
      }
    },
    setFormValue: {
      reducer: (state, {
        payload
      }) => {
        state = state.setIn([payload.form, 'error'], null);
        const field = state.getIn([payload.form, payload.field]);
        state = state.setIn([payload.form, payload.field], _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, field, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, field, {
          value: payload.value,
          error: null
        })));
        return state;
      }
    },
    setFormError: {
      reducer: (state, {
        payload
      }) => {
        if (payload.field === 'error') {
          state = state.setIn([payload.form, payload.field], payload.value);
        } else {
          const field = state.getIn([payload.form, payload.field]);
          state = state.setIn([payload.form, payload.field], _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, field, {
            value: field.value,
            error: payload.value
          }));
        }

        return state;
      }
    },
    setInFormValue: {
      reducer: (state, {
        payload
      }) => {
        const path = [payload.form].concat(payload.fields);
        const field = state.getIn(path) || {};
        state = state.setIn(path, _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, field, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, field, {
          value: payload.value,
          error: null
        })));
        return state;
      }
    },
    setInFormError: {
      reducer: (state, {
        payload
      }) => {
        const path = [payload.form].concat(payload.fields);
        const field = state.getIn(path);
        state = state.setIn(path, _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, field, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, field, {
          error: payload.value
        })));
        return state;
      }
    },
    toggleLoading: {
      reducer: (state, {
        payload
      }) => {
        if (payload.field) {
          if (typeof DEFAULT_FORM_FIELDS[payload.form].get(payload.field).loading === 'undefined') {
            return state;
          }

          const field = state.getIn([payload.form, payload.field]);
          state = state.setIn([payload.form, payload.field], _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, field, {
            loading: !!payload.value
          }));
        } else {
          state = state.setIn([payload.form, 'loading'], !!payload.value);
        }

        return state;
      }
    },
    setListValues: {
      reducer: (state, {
        payload
      }) => {
        if (!DEFAULT_FORM_FIELDS[payload.form].get(payload.field).listValues) {
          return state;
        }

        const field = state.getIn([payload.form, payload.field]);
        state = state.setIn([payload.form, payload.field], _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, field, {
          listValues: payload.list
        }));
        return state;
      }
    },
    setTimeoutField: {
      reducer: (state, {
        payload
      }) => {
        const field = state.getIn([payload.form, payload.field]);
        state = state.setIn([payload.form, payload.field], _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, field, {
          timeoutId: payload.timeoutId
        }));
        return state;
      }
    },
    clearForm: {
      reducer: (state, {
        payload
      }) => {
        state = state.set(payload.form, lodash__WEBPACK_IMPORTED_MODULE_6___default.a.cloneDeep(DEFAULT_FIELDS).merge(DEFAULT_FORM_FIELDS[payload.form]));
        return state;
      }
    },
    clearByField: {
      reducer: (state, {
        payload
      }) => {
        state = state.setIn([payload.form, payload.field], lodash__WEBPACK_IMPORTED_MODULE_6___default.a.cloneDeep(DEFAULT_FORM_FIELDS[payload.form].get(payload.field)));
        return state;
      }
    },
    setMultipleFormValue: {
      reducer: (state, {
        payload
      }) => {
        _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_0___default()(payload.fields).forEach(([key, value]) => {
          state = state.setIn([payload.form, key], {
            value,
            error: null
          });
        });

        return state;
      }
    }
  })
}));

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

/***/ "Q0q4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var object_keys = __webpack_require__("pLtp");
var keys_default = /*#__PURE__*/__webpack_require__.n(object_keys);

// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__("8Bbg");
var app_default = /*#__PURE__*/__webpack_require__.n(app);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__("K2gz");
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__("rf6O");
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");
var external_next_redux_wrapper_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_wrapper_);

// EXTERNAL MODULE: external "json-immutable"
var external_json_immutable_ = __webpack_require__("Qt1O");

// EXTERNAL MODULE: external "mobile-detect"
var external_mobile_detect_ = __webpack_require__("A1cq");
var external_mobile_detect_default = /*#__PURE__*/__webpack_require__.n(external_mobile_detect_);

// EXTERNAL MODULE: external "react-helmet"
var external_react_helmet_ = __webpack_require__("zIXN");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js + 1 modules
var objectSpread = __webpack_require__("zrwo");

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-batched-actions"
var external_redux_batched_actions_ = __webpack_require__("55jf");

// EXTERNAL MODULE: external "redux-devtools-extension"
var external_redux_devtools_extension_ = __webpack_require__("ufKq");

// EXTERNAL MODULE: ./src/reducers/ModalReducer.js
var ModalReducer = __webpack_require__("GBqj");

// EXTERNAL MODULE: ./src/reducers/GlobalReducer.js
var GlobalReducer = __webpack_require__("uE89");

// EXTERNAL MODULE: ./src/reducers/FormReducer.js
var FormReducer = __webpack_require__("LZ+5");

// EXTERNAL MODULE: ./src/reducers/GridReducer.js
var GridReducer = __webpack_require__("wRB0");

// EXTERNAL MODULE: ./src/reducers/RoundReducer.js
var RoundReducer = __webpack_require__("0xcs");

// EXTERNAL MODULE: ./src/reducers/BlockReducer.js
var BlockReducer = __webpack_require__("A4BX");

// EXTERNAL MODULE: ./src/reducers/TransactionReducer.js
var TransactionReducer = __webpack_require__("oqxO");

// EXTERNAL MODULE: ./src/reducers/ObjectsReducer.js
var ObjectsReducer = __webpack_require__("I5Wo");

// EXTERNAL MODULE: external "redux-modules"
var external_redux_modules_ = __webpack_require__("WKeQ");

// EXTERNAL MODULE: external "immutable"
var external_immutable_ = __webpack_require__("nuGg");

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__("YLtl");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: ./src/utils/TransformModules.js
var TransformModules = __webpack_require__("rE0f");

// CONCATENATED MODULE: ./src/reducers/SearchReducer.js





const DEFAULT_FIELDS = Object(external_immutable_["Map"])({
  headerSearch: Object(external_immutable_["Map"])({
    hints: [],
    error: '',
    loading: false
  })
});
/* harmony default export */ var SearchReducer = (Object(external_redux_modules_["createModule"])({
  name: 'search',
  initialState: external_lodash_default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(objectSpread["a" /* default */])({}, external_lodash_default.a.cloneDeep(Object(TransformModules["a" /* default */])(DEFAULT_FIELDS)))
}));
// EXTERNAL MODULE: ./src/reducers/AccountReducer.js
var AccountReducer = __webpack_require__("0pkP");

// EXTERNAL MODULE: ./src/reducers/ContractReducer.js
var ContractReducer = __webpack_require__("QHAo");

// EXTERNAL MODULE: ./src/reducers/InternetPopupReducer.js
var InternetPopupReducer = __webpack_require__("CV+1");

// EXTERNAL MODULE: ./src/reducers/NetworkReducer.js
var NetworkReducer = __webpack_require__("cSTb");

// EXTERNAL MODULE: ./src/reducers/StatisticsReducer.js
var StatisticsReducer = __webpack_require__("HxLW");

// CONCATENATED MODULE: ./src/reducers/index.js














/* harmony default export */ var reducers = ({
  modal: ModalReducer["a" /* default */].reducer,
  global: GlobalReducer["a" /* default */].reducer,
  form: FormReducer["a" /* default */].reducer,
  grid: GridReducer["a" /* default */].reducer,
  round: RoundReducer["a" /* default */].reducer,
  block: BlockReducer["a" /* default */].reducer,
  transaction: TransactionReducer["a" /* default */].reducer,
  objects: ObjectsReducer["a" /* default */].reducer,
  account: AccountReducer["a" /* default */].reducer,
  search: SearchReducer.reducer,
  contract: ContractReducer["a" /* default */].reducer,
  internetPopup: InternetPopupReducer["a" /* default */].reducer,
  network: NetworkReducer["a" /* default */].reducer,
  statistics: StatisticsReducer["a" /* default */].reducer
});
// CONCATENATED MODULE: ./src/store.js






function configureStore(preloadState) {
  return Object(external_redux_["createStore"])(Object(external_redux_["combineReducers"])(Object(objectSpread["a" /* default */])({}, reducers)), preloadState, Object(external_redux_devtools_extension_["composeWithDevTools"])(Object(external_redux_["compose"])(Object(external_redux_["applyMiddleware"])(external_redux_thunk_default.a), Object(external_redux_["applyMiddleware"])(external_redux_batched_actions_["batchDispatchMiddleware"]))));
}
// EXTERNAL MODULE: ./src/public/scss/main.scss
var main = __webpack_require__("rVSV");

// CONCATENATED MODULE: ./src/public/loader.js

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("eVuF");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: external "echojs-lib"
var external_echojs_lib_ = __webpack_require__("moMR");
var external_echojs_lib_default = /*#__PURE__*/__webpack_require__.n(external_echojs_lib_);

// EXTERNAL MODULE: ./src/constants/SearchConstants.js
var SearchConstants = __webpack_require__("oZ+S");

// EXTERNAL MODULE: ./src/constants/ObjectPrefixesConstants.js
var ObjectPrefixesConstants = __webpack_require__("oOqk");

// EXTERNAL MODULE: ./src/actions/BaseActionsClass.js
var BaseActionsClass = __webpack_require__("f3j0");

// EXTERNAL MODULE: ./src/helpers/URLHelper.js
var URLHelper = __webpack_require__("1qHI");

// EXTERNAL MODULE: ./src/helpers/FormatHelper.js
var FormatHelper = __webpack_require__("bXzB");

// EXTERNAL MODULE: ./src/helpers/TypesHelper.js
var TypesHelper = __webpack_require__("9B1q");

// CONCATENATED MODULE: ./src/helpers/SearchHelper.js

/**
 * get limit header hints
 * @param accountHints
 * @param contractHints
 * @param assetHints
 * @returns {[]}
 */

const getLimitHints = (accountHints, contractHints, assetHints) => {
  let accountCount = accountHints.length < SearchConstants["c" /* SEARCH_LIMIT */].MIN ? accountHints.length : SearchConstants["c" /* SEARCH_LIMIT */].MIN;
  let contractCount = contractHints.length < SearchConstants["c" /* SEARCH_LIMIT */].MIN ? contractHints.length : SearchConstants["c" /* SEARCH_LIMIT */].MIN;
  let assetCount = assetHints.length < SearchConstants["c" /* SEARCH_LIMIT */].MIN ? assetHints.length : SearchConstants["c" /* SEARCH_LIMIT */].MIN;
  let limit = SearchConstants["c" /* SEARCH_LIMIT */].MAX - accountCount - contractCount - assetCount;

  if (limit && accountHints.length > limit + accountCount) {
    const oldAccountCount = accountCount;
    accountCount = limit + accountCount;
    limit = limit + oldAccountCount - accountCount;
  }

  if (limit && contractHints.length > limit + contractCount) {
    const oldContractCount = contractCount;
    contractCount = limit + contractCount;
    limit = limit + oldContractCount - contractCount;
  }

  if (limit && assetHints.length > limit + assetCount) {
    assetCount = limit + assetCount;
  }

  accountHints = accountHints.slice(0, accountCount);
  contractHints = contractHints.slice(0, contractCount);
  assetHints = assetHints.slice(0, assetCount);
  return [].concat(accountHints).concat(contractHints).concat(assetHints);
};
// EXTERNAL MODULE: ./src/services/queries/contract.js
var queries_contract = __webpack_require__("4LdG");

// EXTERNAL MODULE: external "graphql-tag"
var external_graphql_tag_ = __webpack_require__("txk1");
var external_graphql_tag_default = /*#__PURE__*/__webpack_require__.n(external_graphql_tag_);

// EXTERNAL MODULE: ./src/services/GraphqlService.js + 1 modules
var GraphqlService = __webpack_require__("xoST");

// CONCATENATED MODULE: ./src/services/queries/asset.js


const getAssetsBySymbols = (count, ...symbols) => {
  const query = external_graphql_tag_default.a`
		query getAssets($count: Int, $symbols: [String!]) {
			getAssets(count: $count, symbols: $symbols) {
				items {
					id
          		}
			}
		}
	`;
  return GraphqlService["a" /* default */].getClient().query({
    query,
    variables: {
      count,
      symbols
    }
  }).then(({
    data
  }) => data.getAssets);
};
// EXTERNAL MODULE: ./src/services/ApiService.js + 2 modules
var ApiService = __webpack_require__("XOUZ");

// CONCATENATED MODULE: ./src/actions/SearchActions.js














class SearchActions_SearchActions extends BaseActionsClass["a" /* default */] {
  /** Set reducer
      * @constructor
      */
  constructor() {
    super(SearchReducer);
  }
  /**
   * init load data before start search
   * @param {String} type search
   * @returns {Function}
   */


  initSearch(type) {
    return dispatch => {
      dispatch(this.setMultipleValue({
        [type]: {
          loading: true,
          hints: [],
          error: ''
        }
      }));
    };
  }
  /**
   * search object by id
   * @param {String} str
   * @returns {Promise<{prefix: *, section: *, to: *, value: *}[]|Array>}
   */


  async searchObjectById(str) {
    if (!external_echojs_lib_["validators"].isObjectId(str)) return [];
    let section = SearchConstants["d" /* TYPE_SEARCH_SECTION */].OBJECT_ID;
    let isAccount = false;
    let isAsset = false;
    let prefix = '';
    const to = str;

    if (external_echojs_lib_["validators"].isAccountId(str)) {
      isAccount = true;
      section = SearchConstants["d" /* TYPE_SEARCH_SECTION */].ACCOUNT;
    } else if (external_echojs_lib_["validators"].isAssetId(str)) {
      isAsset = true;
      section = SearchConstants["d" /* TYPE_SEARCH_SECTION */].ASSET;
    } else if (external_echojs_lib_["validators"].isContractId(str)) {
      section = SearchConstants["d" /* TYPE_SEARCH_SECTION */].CONTRACT;
    }

    const object = await external_echojs_lib_default.a.api.getObject(str);
    if (!object) throw new Error(SearchConstants["b" /* DEFAULT_ERROR_SEARCH */]);

    if (external_echojs_lib_["validators"].isContractId(object.id)) {
      let token = null;

      try {
        // eslint-disable-next-line prefer-destructuring
        token = (await Object(queries_contract["c" /* getToken */])(object.id)).token;
      } catch (err) {
        console.warn('Error getting token by id from graphql');
      }

      if (token) {
        section = SearchConstants["d" /* TYPE_SEARCH_SECTION */].ERC_20;
        prefix = `${token.symbol} `;
        str = `(${object.id})`;
      }
    }

    if (isAccount) {
      prefix = `${object.name} `;
      str = `(${str})`;
    }

    if (isAsset) {
      prefix = `${object.symbol} `;
      str = `(${object.id})`;
    }

    const hint = [{
      section,
      prefix,
      value: str,
      to: URLHelper["a" /* default */].createUrlById(isAccount ? object.name : to)
    }];
    return hint;
  }
  /**
   * search object by number
   * @param {String} str
   * @returns {Promise<[]|Array>}
   */


  async searchObjectByNumber(str) {
    const hints = [];
    if (!(TypesHelper["a" /* default */].isStringNumber(str) || TypesHelper["a" /* default */].isCommaNumberRepresentation(str))) return [];
    str = FormatHelper["a" /* default */].removeCommas(str);
    str = FormatHelper["a" /* default */].removeDots(str);
    const [accountId, assetId, contractId] = [`${ObjectPrefixesConstants["a" /* ACCOUNT_OBJECT_PREFIX */]}.${str}`, `${ObjectPrefixesConstants["b" /* ASSET_OBJECT_PREFIX */]}.${str}`, `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.${str}`];
    const block = await external_echojs_lib_default.a.api.getBlock(str);

    if (block) {
      const blockHint = {
        section: SearchConstants["d" /* TYPE_SEARCH_SECTION */].BLOCK,
        value: str,
        to: URLHelper["a" /* default */].createBlockUrl(str)
      };
      hints.push(blockHint);
    }

    const [[account], [asset, contract]] = await promise_default.a.all([external_echojs_lib_default.a.api.getAccounts([accountId]), external_echojs_lib_default.a.api.getObjects([assetId, contractId])]);

    if (account) {
      const accountHint = {
        section: SearchConstants["d" /* TYPE_SEARCH_SECTION */].ACCOUNT,
        prefix: `${account.name} (${ObjectPrefixesConstants["a" /* ACCOUNT_OBJECT_PREFIX */]}.`,
        postfix: ')',
        value: str,
        to: URLHelper["a" /* default */].createAccountUrl(account.name)
      };
      hints.push(accountHint);
    }

    if (asset) {
      const assetHint = {
        section: SearchConstants["d" /* TYPE_SEARCH_SECTION */].ASSET,
        prefix: `${asset.symbol} (${ObjectPrefixesConstants["b" /* ASSET_OBJECT_PREFIX */]}.`,
        value: str,
        postfix: ')',
        to: URLHelper["a" /* default */].createAssetUrl(assetId)
      };
      hints.push(assetHint);
    }

    if (contract) {
      const id = `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.${str}`;
      let token = null;

      try {
        // eslint-disable-next-line prefer-destructuring
        token = (await Object(queries_contract["c" /* getToken */])(id)).token;
      } catch (err) {
        console.warn('Error getting token by id from graphql');
      }

      let section = SearchConstants["d" /* TYPE_SEARCH_SECTION */].CONTRACT;
      let prefix = `${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.`;

      if (token) {
        section = SearchConstants["d" /* TYPE_SEARCH_SECTION */].ERC_20;
        prefix = `${token.symbol} ${ObjectPrefixesConstants["c" /* CONTRACT_OBJECT_PREFIX */]}.`;
      }

      const contractHint = {
        section,
        prefix,
        value: str,
        to: URLHelper["a" /* default */].createContractUrl(contractId)
      };
      hints.push(contractHint);
    }

    if (!hints.length) throw new Error(SearchConstants["b" /* DEFAULT_ERROR_SEARCH */]);
    return hints;
  }
  /**
   * search object by name
   * @param {String} str
   * @returns {Promise<[]|Array>}
   */


  async searchObjectByName(str) {
    let hints = [];
    const [contractFromServer, contractFromGraphql] = await promise_default.a.all([ApiService["a" /* default */].searchContracts({
      name: str,
      limit: SearchConstants["c" /* SEARCH_LIMIT */].MAX
    }), new promise_default.a(async resolve => {
      let contracts = {
        items: []
      };

      try {
        contracts = await Object(queries_contract["a" /* getContractBySymbol */])(str.toUpperCase(), SearchConstants["c" /* SEARCH_LIMIT */].MAX);
      } catch (err) {
        console.warn('Error getting contract by name from graphql');
      } finally {
        resolve(contracts);
      }
    })]);
    let contractHints = contractFromGraphql.items.map(({
      contract,
      symbol
    }) => ({
      id: contract.id,
      section: SearchConstants["d" /* TYPE_SEARCH_SECTION */].ERC_20,
      value: symbol,
      postfix: ` (${contract.id})`,
      to: URLHelper["a" /* default */].createContractUrl(contract.id)
    }));
    const regExp = new RegExp(str, 'i');
    contractHints = contractFromServer.filter(({
      id
    }) => !contractHints.find(({
      id: contractId
    }) => contractId === id)).reduce((arr, {
      id,
      name
    }) => {
      const {
        index
      } = regExp.exec(name);
      const item = {
        prefix: name.slice(0, index),
        postfix: `${name.slice(index + str.length)} (${id})`,
        section: SearchConstants["d" /* TYPE_SEARCH_SECTION */].CONTRACT,
        value: name.slice(index, str.length),
        to: URLHelper["a" /* default */].createContractUrl(id)
      };
      return [...arr, item];
    }, contractHints).slice(0, SearchConstants["c" /* SEARCH_LIMIT */].MAX);

    if (!TypesHelper["a" /* default */].isStartWithLetter(str)) {
      hints = hints.concat(contractHints);
      if (!hints.length) throw new Error(SearchConstants["b" /* DEFAULT_ERROR_SEARCH */]);
      return hints;
    }

    const accounts = await external_echojs_lib_default.a.api.lookupAccounts(str.toLowerCase(), SearchConstants["c" /* SEARCH_LIMIT */].MAX);
    const accountHints = accounts.filter(([name]) => regExp.exec(name)).map(([name, id]) => {
      const {
        index
      } = regExp.exec(name);
      return {
        section: SearchConstants["d" /* TYPE_SEARCH_SECTION */].ACCOUNT,
        prefix: name.slice(0, index),
        postfix: `${name.slice(index + str.length)} (${id})`,
        value: name.slice(index, index + str.length),
        to: URLHelper["a" /* default */].createAccountUrl(name)
      };
    });
    let assets = {
      items: []
    };

    try {
      assets = await getAssetsBySymbols(SearchConstants["c" /* SEARCH_LIMIT */].MAX, str.toUpperCase());
    } catch (err) {
      console.warn('Error getting asset by symbol from graphql');
    }

    const assetHints = assets.items.map(({
      id
    }) => ({
      section: SearchConstants["d" /* TYPE_SEARCH_SECTION */].ASSET,
      value: str.toUpperCase(),
      postfix: ` (${id})`,
      to: URLHelper["a" /* default */].createAssetUrl(id)
    }));
    hints = getLimitHints(accountHints, contractHints, assetHints);
    if (!hints.length) throw new Error(SearchConstants["b" /* DEFAULT_ERROR_SEARCH */]);
    return hints;
  }
  /**
   * get header search hints
      * @param {String} str
      * @returns {function}
      */


  headerSearchHint(str) {
    return async dispatch => {
      dispatch(this.initSearch('headerSearch'));
      let hints = [];

      try {
        if (!str) {
          return;
        }

        hints = await this.searchObjectById(str);

        if (hints.length) {
          return;
        }

        hints = await this.searchObjectByNumber(str);

        if (hints.length) {
          return;
        }

        hints = await this.searchObjectByName(str.toLocaleLowerCase());
      } catch (error) {
        dispatch(this.setValue(['headerSearch', 'error'], FormatHelper["a" /* default */].formatError(error), false));
      } finally {
        dispatch(this.setValue(['headerSearch', 'hints'], hints, false));
        dispatch(this.setValue(['headerSearch', 'loading'], false, false));
      }
    };
  }

}

/* harmony default export */ var actions_SearchActions = (new SearchActions_SearchActions());
// CONCATENATED MODULE: ./src/containers/PreparingSection/PreparingBlock.jsx
var __jsx = external_react_default.a.createElement;


const PreparingBlock = ({
  children
}) => __jsx("div", {
  className: "preparing-block"
}, children);

/* harmony default export */ var PreparingSection_PreparingBlock = (PreparingBlock);
// CONCATENATED MODULE: ./src/components/Icons/HeaderIcons.jsx
var HeaderIcons_jsx = external_react_default.a.createElement;

const NextBlockIcon = () => HeaderIcons_jsx("svg", {
  width: "17",
  height: "17",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, HeaderIcons_jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M.63 8.85c0-.41.33-.75.74-.75h3.4a.75.75 0 010 1.5H2.14v5.5h5.4v-2.75a.75.75 0 011.5 0v3.5c0 .41-.34.75-.75.75h-6.9a.75.75 0 01-.75-.75v-7z",
  fill: "#2995D8"
}), HeaderIcons_jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M4.03 1.25c0-.41.33-.75.75-.75h11.2c.4 0 .75.34.75.75v11.1c0 .41-.34.75-.76.75h-7.7a.75.75 0 010-1.5h6.96V2h-9.7v6.85a.75.75 0 01-1.5 0v-7.6z",
  fill: "#2995D8"
}), HeaderIcons_jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M11.9 5.22c.3.3.3.77 0 1.06l-6.6 6.6a.75.75 0 01-1.06-1.06l6.6-6.6c.3-.3.77-.3 1.07 0z",
  fill: "#2995D8"
}));
const LatestBlockIcon = () => HeaderIcons_jsx("svg", {
  width: "17",
  height: "17",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, HeaderIcons_jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M10.68 1.03a.81.81 0 011.04-.48 7.61 7.61 0 014.9 7.17v.03c0 .3 0 .71-.1 1.14a.81.81 0 11-1.57-.4c.05-.21.05-.43.05-.77 0-2.59-1.57-4.8-3.85-5.65a.81.81 0 01-.47-1.04zM7.23 3.15A5.86 5.86 0 002.2 9c0 3.3 2.63 5.9 5.82 5.9a5.83 5.83 0 005.13-3.09.78.78 0 011.06-.32c.38.2.53.7.32 1.08a7.4 7.4 0 01-6.51 3.93C3.97 16.5.62 13.2.62 9s3.35-7.5 7.4-7.5a.8.8 0 01.78.8v6.24l3.15 1.84c.38.22.5.71.29 1.1a.78.78 0 01-1.08.29L7.62 9.69A.8.8 0 017.23 9V3.15z",
  fill: "#2995D8"
}));
const AverageBlockIcon = () => HeaderIcons_jsx("svg", {
  width: "14",
  height: "16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, HeaderIcons_jsx("path", {
  d: "M11.92 10.3c-.2 0-.4-.1-.5-.2l-3.1-2.7c-.1-.1-.2-.3-.2-.6V1.3c0-.4.3-.8.8-.8.4 0 .8.3.8.8v5.1l2.8 2.4c.3.3.4.8.1 1.1-.2.3-.5.4-.7.4zM4.72 2.9a.8.8 0 100-1.6.8.8 0 000 1.6zM2.42 5.1a.8.8 0 100-1.6.8.8 0 000 1.6zM1.32 8a.8.8 0 100-1.6.8.8 0 000 1.6zM1.82 11.1a.8.8 0 100-1.6.8.8 0 000 1.6zM3.72 13.7a.8.8 0 100-1.6.8.8 0 000 1.6zM6.42 15.1a.8.8 0 100-1.6.8.8 0 000 1.6zM9.52 15a.8.8 0 100-1.6.8.8 0 000 1.6zM13.16 12.7a.8.8 0 10-1.6-.06.8.8 0 001.6.05z",
  fill: "#2995D8"
}));
const OperationsBlockIcon = () => HeaderIcons_jsx("svg", {
  width: "17",
  height: "17",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, HeaderIcons_jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M7.72 1.25c0-.41.34-.75.75-.75a7.56 7.56 0 017.55 7.55.75.75 0 01-1.5 0c0-3.3-2.67-6.05-6.04-6.05a.75.75 0 01-.76-.75zM6.08 2.6c.4 0 .75.34.75.75v6.6a.75.75 0 01-1.5 0v-6.6c0-.41.33-.75.75-.75z",
  fill: "#2995D8"
}), HeaderIcons_jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M6.6 2.82c.3.3.3.77 0 1.06l-2.2 2.2a.75.75 0 11-1.06-1.06l2.2-2.2c.3-.3.77-.3 1.07 0zM1.38 7.8c.4 0 .75.34.75.75 0 3.3 2.67 6.05 6.05 6.05a.75.75 0 010 1.5A7.56 7.56 0 01.63 8.55c0-.41.33-.75.74-.75zM10.57 5.9c.42 0 .75.34.75.75v6.6a.75.75 0 01-1.5 0v-6.6c0-.41.34-.75.75-.75z",
  fill: "#2995D8"
}), HeaderIcons_jsx("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M13.3 10.52c.3.3.3.77 0 1.06l-2.2 2.2a.75.75 0 11-1.06-1.06l2.2-2.2c.3-.3.77-.3 1.07 0z",
  fill: "#2995D8"
}));
// EXTERNAL MODULE: ./src/components/InfoTooltip/index.jsx + 1 modules
var InfoTooltip = __webpack_require__("rX2I");

// EXTERNAL MODULE: ./src/constants/RoundConstants.js
var RoundConstants = __webpack_require__("X8zi");

// CONCATENATED MODULE: ./src/containers/PreparingSection/Block1.jsx
var Block1_jsx = external_react_default.a.createElement;






const getStatus = nodeStatus => nodeStatus && RoundConstants["f" /* rounderSteps */][nodeStatus].title;

const Block1 = external_react_default.a.memo(props => Block1_jsx(external_react_default.a.Fragment, null, Block1_jsx("div", {
  className: "preparing-head"
}, Block1_jsx(NextBlockIcon, null), Block1_jsx("span", {
  className: "preparing-caption accent"
}, props.latestBlock)), Block1_jsx("div", {
  className: "preparing-line"
}, Block1_jsx("span", {
  className: "preparing-text"
}, "Next block\xA0", Block1_jsx("span", {
  style: {
    color: '#e9eaef'
  }
}, props.latestBlock + 1), ":\xA0", getStatus(props.stepProgress), Block1_jsx(InfoTooltip["a" /* default */], {
  iconFilled: false,
  overlay: "Next block info"
})), Block1_jsx("a", {
  href: "https://docs.echo.org/",
  target: "_blank",
  rel: "noopener noreferrer"
}, "Echo rand info"))));
Block1.propTypes = {
  stepProgress: external_prop_types_default.a.string.isRequired,
  latestBlock: external_prop_types_default.a.number.isRequired
};
/* harmony default export */ var PreparingSection_Block1 = (Block1);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// CONCATENATED MODULE: ./src/components/Time/TimeFace.jsx
var TimeFace_jsx = external_react_default.a.createElement;



const getFullHour = momentTime => {
  const fullDays = momentTime.as('days');

  if (fullDays >= 1) {
    return `${momentTime.as('hour')}h`;
  }

  const h = momentTime.get('hour');
  return h === 0 ? undefined : `${h}h`;
};

const TimeFace = external_react_default.a.memo(({
  time
}) => {
  const momentTime = external_moment_default.a.duration(time, 'milliseconds');
  const m = momentTime.get('minute');
  const s = momentTime.get('second');
  const fullH = getFullHour(momentTime);
  const fullS = s === 0 && !m && !fullH ? undefined : `${s}s`;
  const fullM = m === 0 && !s && !fullH ? undefined : `${m}m`;
  const ftiltredTime = [fullH, fullM, fullS].filter(v => v);
  const [primeTime = '0s', ...restTime] = ftiltredTime;
  const restTimeWithSeparators = restTime.length === 0 ? undefined : ` : ${restTime.join(' : ')}`;
  return TimeFace_jsx(external_react_default.a.Fragment, null, TimeFace_jsx("span", {
    className: "preparing-caption "
  }, TimeFace_jsx("span", {
    className: "accent"
  }, primeTime, " "), " ", restTimeWithSeparators));
});
/* harmony default export */ var Time_TimeFace = (TimeFace);
// CONCATENATED MODULE: ./src/components/Time/Timer.jsx
var Timer_jsx = external_react_default.a.createElement;

/* eslint-disable react/no-did-update-set-state */



class Timer_Timer extends external_react_["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      time: props.diff
    };
    const timerId = setInterval(() => {
      const {
        time
      } = this.state;
      this.setState({
        time: time + 1
      });
    }, 1000);
    this.state.timerId = timerId;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.diff !== this.props.diff) {
      clearInterval(prevState.timerId);
      this.setState({
        time: this.props.diff
      });
      const timerId = setInterval(() => {
        const {
          time
        } = this.state;
        this.setState({
          time: time + 1
        });
      }, 1000);
      this.setState({
        timerId
      });
    }
  }

  render() {
    const {
      time
    } = this.state;
    return Timer_jsx(external_react_default.a.Fragment, null, Timer_jsx(Time_TimeFace, {
      time: time * 1000
    }));
  }

}

/* harmony default export */ var Time_Timer = (Timer_Timer);
// CONCATENATED MODULE: ./src/containers/PreparingSection/Block2.jsx
var Block2_jsx = external_react_default.a.createElement;






const calculateTimestamp = (latestBlock, blocks) => {
  const lastTimestamp = blocks.getIn([latestBlock, 'timestamp']);

  if (!lastTimestamp) {
    return 0;
  }

  const diff = external_moment_default()().diff(external_moment_default.a.utc(lastTimestamp));
  return Math.floor(diff / 1000);
};

const Block2 = external_react_default.a.memo(({
  latestBlock,
  blocks
}) => Block2_jsx(external_react_default.a.Fragment, null, Block2_jsx("div", {
  className: "preparing-head"
}, Block2_jsx(LatestBlockIcon, null), Block2_jsx("span", {
  className: "preparing-caption"
}, Block2_jsx(Time_Timer, {
  diff: calculateTimestamp(latestBlock, blocks)
}))), Block2_jsx("div", {
  className: "preparing-line"
}, Block2_jsx("span", {
  className: "preparing-text"
}, "Latest block time"))));
Block2.propTypes = {
  blocks: external_prop_types_default.a.object.isRequired,
  latestBlock: external_prop_types_default.a.number.isRequired
};
/* harmony default export */ var PreparingSection_Block2 = (Block2);
// CONCATENATED MODULE: ./src/containers/PreparingSection/Block3.jsx
var Block3_jsx = external_react_default.a.createElement;




const Block3 = external_react_default.a.memo(props => Block3_jsx(external_react_default.a.Fragment, null, Block3_jsx("div", {
  className: "preparing-head"
}, Block3_jsx(AverageBlockIcon, null), Block3_jsx(Time_TimeFace, {
  time: props.averageBlockTime
})), Block3_jsx("div", {
  className: "preparing-line"
}, Block3_jsx("span", {
  className: "preparing-text"
}, "Average block time (last 24h)"))));
Block3.propTypes = {
  averageBlockTime: external_prop_types_default.a.number.isRequired
};
/* harmony default export */ var PreparingSection_Block3 = (Block3);
// EXTERNAL MODULE: external "recharts"
var external_recharts_ = __webpack_require__("Uq7R");

// EXTERNAL MODULE: external "react-media"
var external_react_media_ = __webpack_require__("PnyD");
var external_react_media_default = /*#__PURE__*/__webpack_require__.n(external_react_media_);

// CONCATENATED MODULE: ./src/containers/PreparingSection/Block4.jsx

var Block4_jsx = external_react_default.a.createElement;







const getChartWidth = queries => {
  const keys = keys_default()(queries);

  const query = keys.filter(key => queries[key]).slice(-1)[0];

  switch (query) {
    case 'hd':
      return 300;

    case 'lg':
      return 190;

    case 'md':
      return 150;

    case 'sm':
      return 190;

    default:
      return 190;
  }
};

const Block4 = external_react_default.a.memo(props => Block4_jsx(external_react_default.a.Fragment, null, Block4_jsx("div", {
  className: "preparing-head"
}, Block4_jsx(OperationsBlockIcon, null), Block4_jsx("span", {
  className: "preparing-caption accent"
}, FormatHelper["a" /* default */].formatAmount(props.operationCount)), Block4_jsx(external_react_media_default.a, {
  queries: {
    hd: '(max-width: 1280px)',
    lg: '(max-width: 1000px)',
    md: '(max-width: 768px)',
    sm: '(max-width: 500px)'
  }
}, matches => Block4_jsx("div", {
  className: "preparing-chart"
}, Block4_jsx(external_recharts_["LineChart"], {
  width: getChartWidth({
    hd: matches.hd,
    lg: matches.lg,
    md: matches.md
  }),
  height: 20,
  data: props.operationCountRates
}, Block4_jsx(external_recharts_["Line"], {
  dot: false,
  isAnimationActive: false,
  type: "monotone",
  dataKey: "rate",
  stroke: "#2995D8"
}))))), Block4_jsx("div", {
  className: "preparing-line"
}, Block4_jsx("span", {
  className: "preparing-text"
}, "Operations (last 30 days)"))));
Block4.propTypes = {
  operationCountRates: external_prop_types_default.a.array.isRequired,
  operationCount: external_prop_types_default.a.number.isRequired
};
/* harmony default export */ var PreparingSection_Block4 = (Block4);
// CONCATENATED MODULE: ./src/containers/PreparingSection/index.jsx
var PreparingSection_jsx = external_react_default.a.createElement;







const PreparingSection = props => PreparingSection_jsx("div", {
  className: "preparing-wrap"
}, PreparingSection_jsx(PreparingSection_PreparingBlock, null, PreparingSection_jsx(PreparingSection_Block1, {
  stepProgress: props.stepProgress,
  latestBlock: props.latestBlock
})), PreparingSection_jsx(PreparingSection_PreparingBlock, null, PreparingSection_jsx(PreparingSection_Block2, {
  blocks: props.blocks,
  latestBlock: props.latestBlock
})), PreparingSection_jsx(PreparingSection_PreparingBlock, null, PreparingSection_jsx(PreparingSection_Block3, {
  averageBlockTime: props.averageBlockTime
})), PreparingSection_jsx(PreparingSection_PreparingBlock, null, PreparingSection_jsx(PreparingSection_Block4, {
  operationCountRates: props.operationCountRates,
  operationCount: props.operationCount
})));

/* harmony default export */ var containers_PreparingSection = (PreparingSection);
// EXTERNAL MODULE: ./src/components/Logotype/index.jsx
var Logotype = __webpack_require__("H6aG");

// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__("FfxO");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "react-debounce-input"
var external_react_debounce_input_ = __webpack_require__("ftPg");

// EXTERNAL MODULE: ./src/helpers/SsrHrefHelper.js
var SsrHrefHelper = __webpack_require__("Q5ih");

// EXTERNAL MODULE: ./src/constants/GlobalConstants.js
var GlobalConstants = __webpack_require__("tKMe");

// CONCATENATED MODULE: ./src/components/SearchFields/index.jsx
var SearchFields_jsx = external_react_default.a.createElement;

/* eslint-disable no-unused-expressions */










class SearchFields_SearchField extends external_react_default.a.Component {
  constructor() {
    super();
    this.state = {
      focus: false,
      isChange: false,
      isActiveSmall: false,
      inputValue: '',
      to: '',
      href: ''
    };
    this.timeoutSearch = null;
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    if (this.timeoutSearch) {
      clearTimeout(this.timeoutSearch);
    }

    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onFocus() {
    this.setState({
      focus: true
    });
  }

  onChangeDropdown(e, data) {
    const code = e.keyCode || e.which;
    const option = data.options.find(({
      value
    }) => value === data.value);

    if ([GlobalConstants["i" /* KEY_CODES */].ARROW_UP, GlobalConstants["i" /* KEY_CODES */].ARROW_DOWN].includes(code)) {
      this.setState({
        to: data.value,
        href: option.href
      });
    } else {
      this.setState({
        focus: false,
        isChange: false,
        to: data.value,
        href: option.href
      });
    }
  }

  onChange(e) {
    const {
      value
    } = e.target;
    this.setState({
      isChange: !!value.length,
      inputValue: value
    });

    if (this.timeoutSearch) {
      clearTimeout(this.timeoutSearch);
    }

    this.timeoutSearch = setTimeout(() => {
      this.props.getHints(value);
    }, 300);
  }

  onClick(e) {
    e.preventDefault();
    this.setState({
      focus: true
    });
    this.inputEl.focus();
  }

  onKeyPress(e) {
    const {
      loadingSearch
    } = this.props;
    const {
      inputValue
    } = this.state;
    const code = e.keyCode || e.which;

    if (!loadingSearch && GlobalConstants["i" /* KEY_CODES */].ENTER_CODE === code && inputValue && this.state.to) {
      if (this.props.hints.length !== 0) {
        router_default.a.push(this.state.href, this.state.to);
        this.setState({
          focus: false,
          isChange: false
        });
        this.inputEl.blur();
      }
    }

    if (GlobalConstants["i" /* KEY_CODES */].ESC_CODE === code) {
      this.inputEl.blur();
      this.setState({
        focus: false,
        isChange: false
      });
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  blurInput() {
    this.setState({
      focus: false,
      isChange: false
    });
    this.inputEl.blur();
  }

  handleClickOutside(event) {
    if (this.state.isActiveSmall && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isActiveSmall: false
      });
    }

    if (!this.wrapperRef.contains(event.target)) {
      this.setState({
        focus: false,
        isChange: false
      });
    }
  }

  isSmallShow() {
    this.setState({
      isActiveSmall: true
    });
    this.inputEl.focus();
  }

  clearInput() {
    this.setState({
      inputValue: '',
      focus: false,
      isChange: false,
      isActiveSmall: false,
      to: ''
    });
    this.props.getHints();
  }

  renderIcon(active) {
    const {
      loadingSearch
    } = this.props;
    return loadingSearch ? SearchFields_jsx("span", {
      className: "search-loading"
    }) : SearchFields_jsx("button", {
      tabIndex: active ? 0 : -1,
      className: "close-icn",
      onClick: () => this.clearInput()
    });
  }

  render() {
    const {
      focus,
      isChange,
      isActiveSmall,
      inputValue
    } = this.state;
    const {
      placeholder,
      white,
      withHelp,
      hints,
      errorSearch
    } = this.props;
    const options = hints.map(({
      section,
      prefix,
      value,
      to,
      postfix
    }, i) => ({
      key: i,
      value: to,
      href: SsrHrefHelper["a" /* default */].getHrefByTypeSection(section),
      content: SearchFields_jsx(link_default.a, {
        key: to,
        href: SsrHrefHelper["a" /* default */].getHrefByTypeSection(section),
        as: to
      }, SearchFields_jsx("div", {
        className: "element"
      }, SearchFields_jsx("div", {
        className: "section-name"
      }, section), SearchFields_jsx("div", {
        className: "value"
      }, prefix, SearchFields_jsx("span", {
        className: "select"
      }, value), postfix)))
    }));

    if (errorSearch) {
      options.push({
        key: options.length + 1,
        selected: false,
        value: '',
        content: SearchFields_jsx("div", {
          className: "element no-results"
        }, SearchFields_jsx("div", {
          className: "warn"
        }), SearchFields_jsx("div", {
          className: "text"
        }, SearchConstants["b" /* DEFAULT_ERROR_SEARCH */]))
      });
    }

    return SearchFields_jsx("div", {
      className: external_classnames_default()('input-search-block', {
        active: isActiveSmall || inputValue,
        white
      }),
      ref: this.setWrapperRef
    }, SearchFields_jsx("div", {
      className: external_classnames_default()('input-container', {
        focus
      })
    }, SearchFields_jsx("a", {
      href: "",
      className: "icon",
      onClick: e => {
        e.preventDefault();
        this.isSmallShow();
      }
    }, SearchFields_jsx("svg", null, SearchFields_jsx("path", {
      fill: "#686C86",
      d: "M14.72 13.12l-3.54-3.54a6.12 6.12 0 10-1.6 1.6l3.53 3.55a1.14 1.14 0 001.6-1.6zm-12.45-7a3.85 3.85 0 117.7 0 3.85 3.85 0 01-7.7 0z"
    }))), SearchFields_jsx("div", {
      className: "input-field"
    }, SearchFields_jsx(external_react_debounce_input_["DebounceInput"], {
      type: "text",
      value: inputValue,
      placeholder: placeholder,
      onFocus: () => this.onFocus(),
      onChange: e => this.onChange(e),
      onKeyDown: e => this.onKeyPress(e),
      debounceTimeout: SearchConstants["a" /* DEBOUNCE_TIMEOUT */],
      inputRef: node => {
        this.inputEl = node;
      }
    }), this.renderIcon(isActiveSmall || inputValue))), withHelp && (isChange || focus) && SearchFields_jsx("div", {
      className: "search-block-result"
    }, SearchFields_jsx(external_semantic_ui_react_["Dropdown"], {
      options: options,
      open: true,
      onChange: (event, data) => this.onChangeDropdown(event, data)
    })));
  }

}

SearchFields_SearchField.defaultProps = {
  loadingSearch: false,
  errorSearch: '',
  placeholder: '',
  white: false,
  withHelp: false,
  hints: [],
  getHints: () => {}
};
/* harmony default export */ var SearchFields = (SearchFields_SearchField);
// EXTERNAL MODULE: ./src/constants/RouterConstants.js
var RouterConstants = __webpack_require__("Z2WM");

// CONCATENATED MODULE: ./src/components/Header/NavTabs.jsx
var NavTabs_jsx = external_react_default.a.createElement;




const NavTabs = external_react_default.a.memo(() => {
  const router = Object(router_["useRouter"])();
  return NavTabs_jsx("div", {
    className: "nav-tabs"
  }, NavTabs_jsx("button", {
    className: external_classnames_default()({
      active: router.pathname === RouterConstants["k" /* INDEX_PATH */]
    }),
    onClick: () => router_default.a.push(RouterConstants["k" /* INDEX_PATH */])
  }, "Blocks"), NavTabs_jsx("button", {
    className: external_classnames_default()({
      active: router.pathname === RouterConstants["m" /* NODE_MAP */]
    }),
    onClick: () => router_default.a.push(RouterConstants["m" /* NODE_MAP */])
  }, "Nodes map"));
});
/* harmony default export */ var Header_NavTabs = (Object(router_["withRouter"])(NavTabs));
// CONCATENATED MODULE: ./src/components/Header/index.jsx
var Header_jsx = external_react_default.a.createElement;







const Header = external_react_default.a.memo(({
  hints,
  getHints,
  loadingSearch,
  errorSearch
}) => Header_jsx("header", null, Header_jsx(Logotype["a" /* default */], {
  onClick: () => router_default.a.push(RouterConstants["k" /* INDEX_PATH */])
}), Header_jsx(Header_NavTabs, null), Header_jsx(SearchFields, {
  loadingSearch: loadingSearch,
  errorSearch: errorSearch,
  withHelp: true,
  getHints: getHints,
  hints: hints,
  placeholder: "Search by account / block / transaction"
})));
Header.propTypes = {
  loadingSearch: external_prop_types_default.a.bool,
  errorSearch: external_prop_types_default.a.string,
  hints: external_prop_types_default.a.array,
  getHints: external_prop_types_default.a.func
};
Header.defaultProps = {
  hints: [],
  loadingSearch: false,
  errorSearch: '',
  getHints: () => {}
};
/* harmony default export */ var components_Header = (Header);
// CONCATENATED MODULE: ./src/containers/Header/index.jsx
var containers_Header_jsx = external_react_default.a.createElement;







const HeaderContainer = external_react_default.a.memo(({
  hints,
  getHints,
  loadingSearch,
  errorSearch,
  latestBlock,
  blocks,
  stepProgress,
  operationCountRates,
  operationCount,
  averageBlockTime
}) => containers_Header_jsx("div", {
  className: "top-section"
}, containers_Header_jsx("div", {
  className: "wrap"
}, containers_Header_jsx(components_Header, {
  errorSearch: errorSearch,
  loadingSearch: loadingSearch,
  hints: hints,
  getHints: getHints
}), containers_Header_jsx(containers_PreparingSection, {
  blocks: blocks,
  stepProgress: stepProgress,
  latestBlock: latestBlock,
  averageBlockTime: averageBlockTime,
  operationCountRates: operationCountRates,
  operationCount: operationCount
}))));
HeaderContainer.propTypes = {
  hints: external_prop_types_default.a.array.isRequired,
  loadingSearch: external_prop_types_default.a.bool.isRequired,
  errorSearch: external_prop_types_default.a.string.isRequired,
  getHints: external_prop_types_default.a.func.isRequired,
  blocks: external_prop_types_default.a.object.isRequired,
  stepProgress: external_prop_types_default.a.string.isRequired,
  latestBlock: external_prop_types_default.a.number.isRequired,
  averageBlockTime: external_prop_types_default.a.number.isRequired,
  operationCountRates: external_prop_types_default.a.array.isRequired,
  operationCount: external_prop_types_default.a.number.isRequired
};
/* harmony default export */ var containers_Header = (Object(router_["withRouter"])(Object(external_react_redux_["connect"])(state => ({
  hints: state.search.getIn(['headerSearch', 'hints']),
  errorSearch: state.search.getIn(['headerSearch', 'error']),
  loadingSearch: state.search.getIn(['headerSearch', 'loading']),
  blocks: state.block.get('blocks'),
  stepProgress: state.round.get('stepProgress'),
  latestBlock: state.round.get('latestBlock'),
  averageBlockTime: state.statistics.get('averageBlockTime'),
  operationCountRates: state.statistics.get('operationCountRates'),
  operationCount: state.statistics.get('operationCount')
}), dispatch => ({
  getHints: str => dispatch(actions_SearchActions.headerSearchHint(str))
}))(HeaderContainer)));
// EXTERNAL MODULE: ./src/constants/ModalConstants.js
var ModalConstants = __webpack_require__("j8VQ");

// EXTERNAL MODULE: ./src/actions/ModalActions.js
var ModalActions = __webpack_require__("OyDG");

// CONCATENATED MODULE: ./src/components/Modals/ModalBase.jsx
var ModalBase_jsx = external_react_default.a.createElement;




class ModalBase_ModalBase extends external_react_default.a.Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel() {
    this.props.onClose();
  }

  handleKeyUp(e) {
    if (e.keyCode === GlobalConstants["i" /* KEY_CODES */].ESC_CODE) {
      this.onCancel();
    }
  }

  render() {
    return ModalBase_jsx("div", {
      role: "presentation",
      className: external_classnames_default()('modal-overlay'),
      onClick: this.handleKeyUp
    }, this.props.children);
  }

}

/* harmony default export */ var Modals_ModalBase = (ModalBase_ModalBase);
// EXTERNAL MODULE: ./src/public/images/icons/check.svg
var check = __webpack_require__("wz7p");
var check_default = /*#__PURE__*/__webpack_require__.n(check);

// CONCATENATED MODULE: ./src/components/Modals/ModalSuccess.jsx
var ModalSuccess_jsx = external_react_default.a.createElement;





class ModalSuccess_ModalSuccess extends external_react_default.a.PureComponent {
  render() {
    return ModalSuccess_jsx(Modals_ModalBase, {
      onClose: () => this.props.onClose()
    }, ModalSuccess_jsx("section", {
      className: external_classnames_default()('modal', 'modal-success')
    }, ModalSuccess_jsx("div", {
      className: "modal-header"
    }, ModalSuccess_jsx("img", {
      className: "icon",
      src: check_default.a,
      alt: "check"
    })), ModalSuccess_jsx("div", {
      className: "modal-body"
    }, ModalSuccess_jsx("p", {
      className: "title"
    }, this.props.title)), ModalSuccess_jsx("div", {
      className: "modal-footer"
    }, ModalSuccess_jsx("p", null, ModalSuccess_jsx("button", {
      className: "btn-modal-close",
      onClick: () => this.props.onClose()
    }, ModalSuccess_jsx("span", null, "Return to contract"))))));
  }

}

ModalSuccess_ModalSuccess.defaultProps = {
  title: 'Form veryfied'
};
/* harmony default export */ var Modals_ModalSuccess = (ModalSuccess_ModalSuccess);
// EXTERNAL MODULE: ./src/public/images/icons/cross.svg
var cross = __webpack_require__("RBme");
var cross_default = /*#__PURE__*/__webpack_require__.n(cross);

// CONCATENATED MODULE: ./src/components/Modals/ModalError.jsx
var ModalError_jsx = external_react_default.a.createElement;





class ModalError_ModalError extends external_react_default.a.PureComponent {
  render() {
    return ModalError_jsx(Modals_ModalBase, {
      onClose: () => this.props.onClose()
    }, ModalError_jsx("section", {
      className: external_classnames_default()('modal', 'modal-error')
    }, ModalError_jsx("div", {
      className: "modal-header"
    }, ModalError_jsx("img", {
      className: "icon",
      src: cross_default.a,
      alt: "error"
    })), ModalError_jsx("div", {
      className: "modal-body"
    }, ModalError_jsx("p", {
      className: "title"
    }, this.props.title)), ModalError_jsx("div", {
      className: "modal-footer"
    }, ModalError_jsx("p", null, ModalError_jsx("button", {
      className: "btn-modal-close",
      onClick: () => this.props.onClose()
    }, ModalError_jsx("span", null, "Return"))))));
  }

}

ModalError_ModalError.defaultProps = {
  title: 'Unable to verify contract'
};
/* harmony default export */ var Modals_ModalError = (ModalError_ModalError);
// EXTERNAL MODULE: ./src/public/images/modal-ext-header.png
var modal_ext_header = __webpack_require__("+th8");
var modal_ext_header_default = /*#__PURE__*/__webpack_require__.n(modal_ext_header);

// EXTERNAL MODULE: ./src/config/chain.js
var chain = __webpack_require__("ggud");

// CONCATENATED MODULE: ./src/components/Modals/ModalExtensionInfo.jsx
var ModalExtensionInfo_jsx = external_react_default.a.createElement;






class ModalExtensionInfo_ModalExtensionInfo extends external_react_default.a.PureComponent {
  constructor() {
    super();
    this.renderModal = this.renderModal.bind(this);
    this.openBrowserExtensions = this.openBrowserExtensions.bind(this);
  }

  openBrowserExtensions() {
    window.open(chain["a" /* default */].LANDING_BRIDGE, '_blank');
  }

  renderModal() {
    return ModalExtensionInfo_jsx(Modals_ModalBase, {
      onClose: () => this.props.onClose()
    }, ModalExtensionInfo_jsx("section", {
      className: external_classnames_default()('modal', 'modal-extension')
    }, ModalExtensionInfo_jsx("div", {
      className: "modal-header"
    }, ModalExtensionInfo_jsx("img", {
      src: modal_ext_header_default.a,
      alt: "bridge"
    })), ModalExtensionInfo_jsx("div", {
      className: "modal-body"
    }, ModalExtensionInfo_jsx("p", {
      className: "title"
    }, "Bridge is not installed"), ModalExtensionInfo_jsx("p", {
      className: "text"
    }, "To manage contract you need to verify your ", ModalExtensionInfo_jsx("br", null), "authority using Bridge (browser extension that  ", ModalExtensionInfo_jsx("br", null), "allows you make transactions in Echo  ", ModalExtensionInfo_jsx("br", null), "network). Please install Bridge"), ModalExtensionInfo_jsx("p", null, ModalExtensionInfo_jsx("button", {
      className: "link",
      onClick: this.openBrowserExtensions
    }, "Get chrome extension "))), ModalExtensionInfo_jsx("div", {
      className: "modal-footer"
    }, ModalExtensionInfo_jsx("p", null, ModalExtensionInfo_jsx("button", {
      className: "btn-modal-close",
      onClick: () => this.props.onClose()
    }, ModalExtensionInfo_jsx("span", null, "Close"))))));
  }

  render() {
    return this.renderModal();
  }

}

/* harmony default export */ var Modals_ModalExtensionInfo = (ModalExtensionInfo_ModalExtensionInfo);
// CONCATENATED MODULE: ./src/components/Modals/index.jsx
var Modals_jsx = external_react_default.a.createElement;






class Modals_Modals extends external_react_default.a.Component {
  onClose(modal) {
    this.props.closeModal(modal);
  }

  render() {
    const {
      successForm,
      errorForm,
      extensionInfo
    } = this.props;
    return Modals_jsx(external_react_default.a.Fragment, null, successForm.get('show') && Modals_jsx(Modals_ModalSuccess, {
      title: successForm.get('title'),
      onClose: () => this.onClose(ModalConstants["e" /* MODAL_SUCCESS */])
    }), errorForm.get('show') && Modals_jsx(Modals_ModalError, {
      title: errorForm.get('title'),
      onClose: () => this.onClose(ModalConstants["c" /* MODAL_ERROR */])
    }), extensionInfo.get('show') && Modals_jsx(Modals_ModalExtensionInfo, {
      onClose: () => this.onClose(ModalConstants["d" /* MODAL_EXTENSION_INFO */])
    }));
  }

}

/* harmony default export */ var components_Modals = (Modals_Modals);
// CONCATENATED MODULE: ./src/containers/Modals/index.jsx




/* harmony default export */ var containers_Modals = (Object(external_react_redux_["connect"])(state => ({
  successForm: state.modal.get(ModalConstants["e" /* MODAL_SUCCESS */]),
  errorForm: state.modal.get(ModalConstants["c" /* MODAL_ERROR */]),
  extensionInfo: state.modal.get(ModalConstants["d" /* MODAL_EXTENSION_INFO */])
}), dispatch => ({
  closeModal: () => dispatch(ModalActions["a" /* default */].closeModal())
}))(components_Modals));
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/date/now.js
var now = __webpack_require__("Cg2A");
var now_default = /*#__PURE__*/__webpack_require__.n(now);

// EXTERNAL MODULE: external "randomstring"
var external_randomstring_ = __webpack_require__("VF8b");
var external_randomstring_default = /*#__PURE__*/__webpack_require__.n(external_randomstring_);

// CONCATENATED MODULE: ./src/helpers/GlobalHelper.js


/* eslint-disable import/prefer-default-export */


const generateUniqueKey = key => `${now_default()()}_${external_randomstring_default.a.generate(10)}${key || ''}`;
const getAppVersion = () => chain["a" /* default */].APP_VERSION;
// CONCATENATED MODULE: ./src/containers/Footer/index.jsx
var Footer_jsx = external_react_default.a.createElement;



const Footer = external_react_default.a.memo(() => Footer_jsx("footer", {
  className: "footer"
}, Footer_jsx("div", {
  className: "wrap"
}, Footer_jsx("div", {
  className: "footer-info"
}, "\xA9ECHO DEVELOPMENT LTD, ", FormatHelper["a" /* default */].getYear(new Date())), Footer_jsx("div", {
  className: "footer-version"
}, "v", getAppVersion()))));
/* harmony default export */ var containers_Footer = (Footer);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js
var object_assign = __webpack_require__("UXZV");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./src/components/Sidebar/SidebarElement.jsx
var SidebarElement_jsx = external_react_default.a.createElement;


const SidebarElement = ({
  children,
  title,
  className
}) => SidebarElement_jsx("div", {
  className: `sidebar-element ${className}`
}, SidebarElement_jsx("h3", {
  className: "sidebar-element-title"
}, title), SidebarElement_jsx("div", {
  className: "sidebar-element-wrap"
}, children));

SidebarElement.defaultProps = {
  className: ''
};
/* harmony default export */ var Sidebar_SidebarElement = (SidebarElement);
// CONCATENATED MODULE: ./src/constants/UiConstants.js
const SIDEBAR_CHART_WIDTH = 150;
const SIDEBAR_CHART_HEIGHT = 20;
// CONCATENATED MODULE: ./src/components/Sidebar/BlockchainRates.jsx
var BlockchainRates_jsx = external_react_default.a.createElement;





const BlockchainRates = ({
  pinned,
  delegationRate,
  delegationRates,
  decentralizationRate,
  decentralizationRates
}) => BlockchainRates_jsx("div", {
  className: "blockchain-rates-wrap"
}, BlockchainRates_jsx("div", {
  className: "sidebar-element-block"
}, BlockchainRates_jsx("div", {
  className: "sidebar-element-block-title"
}, "Delegation rate", BlockchainRates_jsx(InfoTooltip["a" /* default */], {
  overlay: "Delegation rate information"
})), BlockchainRates_jsx("div", {
  className: "blockchain-rates-block-info"
}, BlockchainRates_jsx("div", {
  className: "blockchain-rates-block-percent"
}, delegationRate, "%"), BlockchainRates_jsx(external_recharts_["LineChart"], {
  width: pinned ? SIDEBAR_CHART_WIDTH + 20 : SIDEBAR_CHART_WIDTH,
  height: SIDEBAR_CHART_HEIGHT,
  data: delegationRates
}, BlockchainRates_jsx(external_recharts_["Line"], {
  dot: false,
  isAnimationActive: false,
  type: "monotone",
  dataKey: "rate",
  stroke: "#2995D8"
})))), BlockchainRates_jsx("div", {
  className: "sidebar-element-block"
}, BlockchainRates_jsx("div", {
  className: "sidebar-element-block-title"
}, "Decentralisation rate", BlockchainRates_jsx(InfoTooltip["a" /* default */], {
  overlay: "Decentralisation rate information"
})), BlockchainRates_jsx("div", {
  className: "blockchain-rates-block-info"
}, BlockchainRates_jsx("div", {
  className: "blockchain-rates-block-percent"
}, decentralizationRate, "%"), BlockchainRates_jsx(external_recharts_["LineChart"], {
  width: pinned ? SIDEBAR_CHART_WIDTH + 20 : SIDEBAR_CHART_WIDTH,
  height: SIDEBAR_CHART_HEIGHT,
  data: decentralizationRates
}, BlockchainRates_jsx(external_recharts_["Line"], {
  isAnimationActive: false,
  dot: false,
  type: "monotone",
  dataKey: "rate",
  stroke: "#2995D8"
})))));

/* harmony default export */ var Sidebar_BlockchainRates = (BlockchainRates);
// EXTERNAL MODULE: external "rc-tooltip"
var external_rc_tooltip_ = __webpack_require__("FMsK");
var external_rc_tooltip_default = /*#__PURE__*/__webpack_require__.n(external_rc_tooltip_);

// CONCATENATED MODULE: ./src/components/Sidebar/FrozenFunds.jsx
var FrozenFunds_jsx = external_react_default.a.createElement;










const FrozenFunds = ({
  currentFrozenData,
  frozenData
}) => FrozenFunds_jsx(external_react_default.a.Fragment, null, FrozenFunds_jsx("div", {
  className: "frozen-funds-wrap"
}, FrozenFunds_jsx("div", {
  className: "sidebar-element-block"
}, FrozenFunds_jsx("div", {
  className: "sidebar-element-block-title"
}, "Committee amount"), FrozenFunds_jsx("div", {
  className: "frozen-funds-block-info"
}, FrozenFunds_jsx("div", {
  className: "comitee-amount"
}, FrozenFunds_jsx(external_rc_tooltip_default.a, {
  placement: "top",
  overlayClassName: "verify-contract-tooltip",
  trigger: ['hover'],
  overlay: FormatHelper["a" /* default */].formatAmount(currentFrozenData.committee_freeze_sum, GlobalConstants["f" /* ECHO_ASSET */].PRECISION)
}, FrozenFunds_jsx("div", {
  className: "comitee-amount-value"
}, FormatHelper["a" /* default */].formatAmount(currentFrozenData.committee_freeze_sum, GlobalConstants["f" /* ECHO_ASSET */].PRECISION))), FrozenFunds_jsx("div", {
  className: "comitee-amount-coin"
}, FrozenFunds_jsx(link_default.a, {
  href: RouterConstants["r" /* SSR_ASSET_PATH */],
  as: URLHelper["a" /* default */].createAssetUrl(GlobalConstants["f" /* ECHO_ASSET */].ID)
}, FrozenFunds_jsx("a", {
  href: "",
  className: "total-supply-coin"
}, GlobalConstants["f" /* ECHO_ASSET */].SYMBOL)))))), FrozenFunds_jsx("div", {
  className: "sidebar-element-block"
}, FrozenFunds_jsx("div", {
  className: "sidebar-element-block-title"
}, "Users amount"), FrozenFunds_jsx("div", {
  className: "frozen-funds-block-info"
}, FrozenFunds_jsx("div", {
  className: "users-amount"
}, FrozenFunds_jsx(external_rc_tooltip_default.a, {
  placement: "top",
  overlayClassName: "verify-contract-tooltip",
  trigger: ['hover'],
  overlay: FormatHelper["a" /* default */].formatAmount(currentFrozenData.accounts_freeze_sum, GlobalConstants["f" /* ECHO_ASSET */].PRECISION)
}, FrozenFunds_jsx("div", {
  className: "comitee-amount-value"
}, FormatHelper["a" /* default */].formatAmount(currentFrozenData.accounts_freeze_sum, GlobalConstants["f" /* ECHO_ASSET */].PRECISION))), FrozenFunds_jsx("div", {
  className: "users-amount-coin"
}, FrozenFunds_jsx(link_default.a, {
  href: RouterConstants["r" /* SSR_ASSET_PATH */],
  as: URLHelper["a" /* default */].createAssetUrl(GlobalConstants["f" /* ECHO_ASSET */].ID)
}, FrozenFunds_jsx("a", {
  href: "",
  className: "total-supply-coin"
}, GlobalConstants["f" /* ECHO_ASSET */].SYMBOL)))), FrozenFunds_jsx(external_recharts_["LineChart"], {
  width: SIDEBAR_CHART_WIDTH,
  height: SIDEBAR_CHART_HEIGHT,
  data: frozenData
}, FrozenFunds_jsx(external_recharts_["Line"], {
  isAnimationActive: false,
  dot: false,
  type: "monotone",
  dataKey: "accounts_freeze_sum",
  stroke: "#2995D8"
}))))));

/* harmony default export */ var Sidebar_FrozenFunds = (FrozenFunds);
// CONCATENATED MODULE: ./src/services/subscriptions/block.js


/**
 *
 * @param contracts
 * @returns {Promise<*>}
 */

const subscribeNewBlock = async () => {
  const query = external_graphql_tag_default.a`
		subscription {
			newBlock {
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
  return GraphqlService["a" /* default */].getClient().subscribe({
    query
  });
};
// EXTERNAL MODULE: ./src/constants/TotalSupplyConstants.js
var TotalSupplyConstants = __webpack_require__("DUps");

// CONCATENATED MODULE: ./src/components/Icons/TotalSupplyIcon.jsx
var TotalSupplyIcon_jsx = external_react_default.a.createElement;

const TotalSupplyIcon = () => TotalSupplyIcon_jsx("svg", {
  width: "16",
  height: "16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, TotalSupplyIcon_jsx("path", {
  d: "M8 16c-4.4 0-8-3.53-8-7.95C0 3.62 3.6 0 8 0s8 3.62 8 8.05A8.02 8.02 0 018 16zM8 1.45a6.62 6.62 0 00-6.56 6.6c0 3.61 2.96 6.6 6.56 6.6 3.6 0 6.56-2.99 6.56-6.6 0-3.71-2.96-6.6-6.56-6.6z",
  fill: "#2995D8"
}), TotalSupplyIcon_jsx("path", {
  d: "M8 16c-2.16 0-3.87-3.44-3.87-8.05C4.13 3.44 5.75 0 8 0s3.87 3.44 3.87 8.05c0 4.6-1.71 7.95-3.87 7.95zM8 1.45c-.99 0-2.43 2.53-2.43 6.6 0 4.06 1.44 6.6 2.43 6.6.99 0 2.43-2.54 2.43-6.6 0-4.07-1.44-6.6-2.43-6.6z",
  fill: "#2995D8"
}), TotalSupplyIcon_jsx("path", {
  d: "M15.1 5.97c0 .36-.36.72-.72.72H1.53c-.36 0-.72-.36-.72-.72 0-.37.36-.73.72-.73h12.85c.45 0 .72.27.72.73zM15.1 10.12c0 .37-.36.73-.72.73H1.53c-.36 0-.72-.36-.72-.73 0-.36.36-.72.72-.72h12.85c.45 0 .72.27.72.72z",
  fill: "#2995D8"
}));
// CONCATENATED MODULE: ./src/components/Sidebar/TotalSupply.jsx
var TotalSupply_jsx = external_react_default.a.createElement;









class TotalSupply_TotalSupply extends external_react_default.a.Component {
  constructor() {
    super();
    this.state = {
      isOpenAssets: false,
      assets: null
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.assets) {
      return {
        assets: nextProps.assets.toJS()
      };
    }

    return nextProps;
  }

  onToggleAssets(e) {
    e.preventDefault();
    this.setState({
      isOpenAssets: !this.state.isOpenAssets
    });
  }

  render() {
    const {
      assets
    } = this.state;
    const amount = assets && assets[TotalSupplyConstants["a" /* ECHO */].ID] ? FormatHelper["a" /* default */].formatAmount(assets[TotalSupplyConstants["a" /* ECHO */].ID].dynamic.current_supply) : '0';
    return TotalSupply_jsx(external_react_default.a.Fragment, null, TotalSupply_jsx("div", {
      className: "total-supply"
    }, TotalSupply_jsx(TotalSupplyIcon, null), TotalSupply_jsx(external_rc_tooltip_default.a, {
      placement: "top",
      overlayClassName: "verify-contract-tooltip",
      trigger: ['hover'],
      overlay: amount
    }, TotalSupply_jsx("div", {
      className: "total-supply-value"
    }, amount)), TotalSupply_jsx(link_default.a, {
      href: RouterConstants["r" /* SSR_ASSET_PATH */],
      as: URLHelper["a" /* default */].createAssetUrl(TotalSupplyConstants["a" /* ECHO */].ID)
    }, TotalSupply_jsx("a", {
      href: "",
      className: "total-supply-coin"
    }, TotalSupplyConstants["a" /* ECHO */].SYMBOL))));
  }

}

TotalSupply_TotalSupply.defaultProps = {};
/* harmony default export */ var Sidebar_TotalSupply = (TotalSupply_TotalSupply);
// CONCATENATED MODULE: ./src/containers/Sidebar/TotalSupply.jsx


/* harmony default export */ var containers_Sidebar_TotalSupply = (Object(external_react_redux_["connect"])(state => ({
  assets: state.statistics.get('assets')
}), () => ({}))(Sidebar_TotalSupply));
// CONCATENATED MODULE: ./src/components/Sidebar/index.jsx
var Sidebar_jsx = external_react_default.a.createElement;








const Sidebar = external_react_default.a.memo(props => {
  const {
    pinned,
    withFooter,
    currentFrozenData,
    frozenData,
    delegationRate,
    delegationRates,
    decentralizationRate,
    decentralizationRates
  } = props;
  const {
    0: blockSubscriber,
    1: setBlockSubscriber
  } = Object(external_react_["useState"])(null);
  Object(external_react_["useEffect"])(() => {
    const subscribe = async () => {
      const newBlock = await subscribeNewBlock();

      const nextUpdate = ({
        data: {
          newBlock: block
        }
      }) => props.updateStatistics(block);

      setBlockSubscriber(newBlock.subscribe({
        next: nextUpdate.bind(undefined),
        error: err => {
          console.log('Handle block error: ', err.message || err);
        }
      }));
    };

    if (!blockSubscriber) {
      subscribe();
    }

    return () => {
      if (blockSubscriber) {
        setBlockSubscriber(null);
        blockSubscriber.unsubscribe();
      }
    };
  });
  return Sidebar_jsx("div", {
    className: external_classnames_default()('sidebar', {
      pinned
    })
  }, Sidebar_jsx(Sidebar_SidebarElement, {
    title: "Total supply",
    className: "total-supply"
  }, Sidebar_jsx(containers_Sidebar_TotalSupply, null)), Sidebar_jsx(Sidebar_SidebarElement, {
    title: "Blockchain rates",
    className: "blockchain-rates"
  }, Sidebar_jsx(Sidebar_BlockchainRates, {
    pinned: pinned,
    delegationRate: delegationRate,
    delegationRates: delegationRates,
    decentralizationRate: decentralizationRate,
    decentralizationRates: decentralizationRates
  })), Sidebar_jsx(Sidebar_SidebarElement, {
    title: "Frozen Funds",
    className: "frozen-funds"
  }, Sidebar_jsx(Sidebar_FrozenFunds, {
    currentFrozenData: currentFrozenData,
    frozenData: frozenData
  })), withFooter && Sidebar_jsx(containers_Footer, null));
});
Sidebar.defaultProps = {
  pinned: false,
  withFooter: false
};
/* harmony default export */ var components_Sidebar = (Sidebar);
// EXTERNAL MODULE: ./src/actions/StatisticsActions.js + 1 modules
var StatisticsActions = __webpack_require__("sP30");

// CONCATENATED MODULE: ./src/containers/Sidebar/index.jsx

var containers_Sidebar_jsx = external_react_default.a.createElement;





const SidebarContainer = external_react_default.a.memo((_ref) => {
  let props = assign_default()({}, _ref);

  return containers_Sidebar_jsx(components_Sidebar, props);
});
/* harmony default export */ var containers_Sidebar = (Object(router_["withRouter"])(Object(external_react_redux_["connect"])(state => ({
  currentFrozenData: state.statistics.get('currentFrozenData'),
  frozenData: state.statistics.get('frozenData'),
  delegationRate: state.statistics.get('delegationRate'),
  delegationRates: state.statistics.get('delegationRates'),
  decentralizationRate: state.statistics.get('decentralizationRate'),
  decentralizationRates: state.statistics.get('decentralizationRates')
}), dispatch => ({
  updateStatistics: data => dispatch(StatisticsActions["a" /* default */].updateStatistics(data))
}))(SidebarContainer)));
// EXTERNAL MODULE: ./src/actions/GlobalActions.js
var GlobalActions = __webpack_require__("K073");

// EXTERNAL MODULE: ./src/actions/SocketActions.js + 1 modules
var SocketActions = __webpack_require__("mOvZ");

// EXTERNAL MODULE: ./src/components/Error/index.jsx
var components_Error = __webpack_require__("FQ1z");

// CONCATENATED MODULE: ./src/components/Error/ErrorScreen.jsx
var ErrorScreen_jsx = external_react_default.a.createElement;




class ErrorScreen_ErrorScreen extends external_react_default.a.Component {
  reload() {
    router_default.a.reload();
  }

  render() {
    const {
      error
    } = this.props;
    return ErrorScreen_jsx(components_Error["a" /* default */], {
      typeError: "bad-internet",
      titlePage: error,
      titleButton: "TRY AGAIN",
      onHandler: () => this.reload()
    });
  }

}

/* harmony default export */ var Error_ErrorScreen = (ErrorScreen_ErrorScreen);
// EXTERNAL MODULE: ./src/components/Error/NotFoundScreen.jsx
var NotFoundScreen = __webpack_require__("czfP");

// CONCATENATED MODULE: ./src/components/InternetPopup/index.jsx
var InternetPopup_jsx = external_react_default.a.createElement;


class InternetPopup_InternetPopup extends external_react_["Component"] {
  render() {
    const {
      isConnected,
      isShow
    } = this.props;
    return !isShow ? null : InternetPopup_jsx("div", {
      className: `internet-popup ${isConnected ? 'isConnected' : ''}`
    }, !isConnected ? "Your computer seems to be offline. We'll keep trying to reconnect." : 'Connected!');
  }

}

InternetPopup_InternetPopup.defaultProps = {
  isShow: false,
  isConnected: false
};
/* harmony default export */ var components_InternetPopup = (InternetPopup_InternetPopup);
// CONCATENATED MODULE: ./src/containers/InternetPopup/index.jsx


/* harmony default export */ var containers_InternetPopup = (Object(external_react_redux_["connect"])(state => ({
  isConnected: state.internetPopup.get('connect'),
  isShow: state.internetPopup.get('show')
}))(components_InternetPopup));
// EXTERNAL MODULE: ./src/components/Loader/index.jsx
var Loader = __webpack_require__("9eFo");

// CONCATENATED MODULE: ./src/pages/_app.jsx

var _app_jsx = external_react_default.a.createElement;
























class _app_ExplorerApp extends app_default.a {
  componentDidMount() {
    router_default.a.events.on('routeChangeStart', () => {
      if (this.props.router.route !== RouterConstants["w" /* SSR_TRANSACTION_INFORMATION_PATH */]) {
        this.props.store.dispatch(GlobalActions["a" /* default */].updateHistoryPath(this.props.router.asPath, this.props.router.route));
      }

      this.props.store.dispatch(GlobalActions["a" /* default */].incrementHistoryLength());
    });
    this.props.store.dispatch(GlobalActions["a" /* default */].init());
  }

  componentWillUnmount() {
    this.props.store.dispatch(Object(SocketActions["a" /* disconnect */])());
  }

  renderModals() {
    return _app_jsx(containers_Modals, null);
  }

  renderMeta() {
    const title = this.props.store.getState().global.get('title');
    return _app_jsx(external_react_helmet_["Helmet"], {
      htmlAttributes: {
        lang: 'en'
      },
      title: title || 'Echo Explorer',
      meta: [{
        charset: 'UTF-8'
      }, {
        name: 'viewport',
        id: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }, {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=utf-8'
      }]
    });
  }

  renderErrorScreen(error) {
    return _app_jsx(Error_ErrorScreen, {
      error: error
    });
  }

  renderNotFound() {
    const resetErrorPath = () => this.props.store.dispatch(GlobalActions["a" /* default */].toggleErrorPath(false));

    return _app_jsx(NotFoundScreen["a" /* default */], {
      resetErrorPath: () => resetErrorPath()
    });
  }

  render() {
    const {
      router: {
        pathname
      },
      Component,
      pageProps,
      store
    } = this.props;
    const parsedLocation = pathname.split('/')[1];

    const full = keys_default()(RouterConstants["g" /* CONTRACT_DETAILS_NUMBERS_TAB */]).includes(parsedLocation);

    const error = store.getState().global.get('error');
    const errorScreen = store.getState().global.get('errorScreen');
    const errorPath = store.getState().global.get('errorPath');
    const clientConnected = store.getState().global.get('connected');
    const connectedServer = store.getState().global.get('connectedServer');

    if (error || errorScreen) {
      return this.renderErrorScreen(error);
    }

    if ( true && !connectedServer ||  false && false) {
      return _app_jsx(Loader["a" /* default */], {
        global: true
      });
    }

    if (errorPath) {
      return this.renderNotFound();
    }

    return _app_jsx(external_react_redux_["Provider"], {
      store: store
    }, _app_jsx(external_react_default.a.Fragment, null, this.renderMeta(), this.renderModals(), _app_jsx(containers_Header, null), RouterConstants["p" /* ROUTES_WITH_COLUMN_DIRECTION */].includes(pathname) ? _app_jsx(external_react_default.a.Fragment, null, _app_jsx("div", {
      className: "wrap"
    }, _app_jsx(containers_Sidebar, null)), _app_jsx(Component, pageProps), _app_jsx(containers_Footer, null)) : _app_jsx(external_react_default.a.Fragment, null, _app_jsx("div", {
      className: external_classnames_default()('wrap', 'flex', {
        full
      })
    }, _app_jsx(Component, pageProps), _app_jsx(containers_Sidebar, {
      pinned: true,
      withFooter: true
    })), _app_jsx(containers_Footer, null)), _app_jsx(containers_InternetPopup, null)));
  }

}

_app_ExplorerApp.propTypes = {
  router: external_prop_types_default.a.object,
  store: external_prop_types_default.a.object.isRequired
};
_app_ExplorerApp.defaultProps = {
  router: {}
};

_app_ExplorerApp.getInitialProps = async ({
  Component,
  ctx
}) => {
  let pageProps = {};

  if (ctx.isServer) {
    const userAgent = ctx.req ? ctx.req.headers['user-agent'] : window.navigator.userAgent;
    const isMobile = !!new external_mobile_detect_default.a(userAgent).mobile();
    await ctx.store.dispatch(GlobalActions["a" /* default */].setValue('isMobile', isMobile));
    await ctx.store.dispatch(Object(SocketActions["d" /* serverConnect */])());

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
  }

  return {
    pageProps
  };
};

const withReduxJob = external_next_redux_wrapper_default()(initialState => configureStore(initialState), {
  serializeState: (state = {}) => Object(external_json_immutable_["serialize"])(state),
  deserializeState: (state = Object(external_json_immutable_["serialize"])({})) => Object(external_json_immutable_["deserialize"])(state)
});
/* harmony default export */ var _app = __webpack_exports__["default"] = (Object(router_["withRouter"])(withReduxJob(_app_ExplorerApp)));

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

/***/ "QHAo":
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
  error: '',
  loading: false,
  loadingMoreHistory: false,
  isFullHistory: false,
  balances: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]([]),
  history: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"]([]),
  bytecode: null,
  lastOperationId: '',
  compilersList: new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"]({}),
  contracts: new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"]({}),
  name: '',
  description: '',
  icon: '',
  sourceCode: '',
  abi: '',
  compilerVersion: '',
  verified: false,
  stars: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"](),
  registrar: '',
  blockNumber: 0,
  countUsedByAccount: 0,
  type: new immutable__WEBPACK_IMPORTED_MODULE_2__["List"](),
  supportedAsset: '',
  ethAccuracy: false,
  contractTxs: 0,
  creationFee: new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"](),
  createdAt: '',
  owner: new immutable__WEBPACK_IMPORTED_MODULE_2__["Map"](),
  clickSaveCounter: 0,
  downloadedCompilers: new immutable__WEBPACK_IMPORTED_MODULE_2__["Set"](),
  progress: 0,
  token: null,
  countTokenTransfer: 0
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'contract',
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

/***/ "Qt1O":
/***/ (function(module, exports) {

module.exports = require("json-immutable");

/***/ }),

/***/ "R2Q7":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/array/is-array");

/***/ }),

/***/ "RBme":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ItCh0LvQvtC5XzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyMCAyMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjAgMjA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxOS42LDQuMyAxNi4xLDAuNyAxMC4xLDYuNyAzLjksMC42IDAuNCw0LjIgNi41LDEwLjMgMC41LDE2LjMgNC4xLDE5LjkgMTAuMSwxMy45IDE2LjEsMTkuOSAKCTE5LjYsMTYuMyAxMy42LDEwLjMgIi8+Cjwvc3ZnPgo="

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

/***/ "SYHU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FORM_LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FORM_CONTRACT_VERIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FORM_MANAGE_CONTRACT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FORM_ABI; });
const FORM_LOGIN = 'login';
const FORM_CONTRACT_VERIFY = 'contract_verify';
const FORM_MANAGE_CONTRACT = 'manage';
const FORM_ABI = 'abi';

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

/***/ "Uq7R":
/***/ (function(module, exports) {

module.exports = require("recharts");

/***/ }),

/***/ "VF8b":
/***/ (function(module, exports) {

module.exports = require("randomstring");

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

/***/ "XOUZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/constants/ExplorerServerConstans.js
const CONTRACT_PREFIX = 'contracts';
const LIKE_PREFIX = 'like';
const VERIFY_PREFIX = 'verify';
const API_PREFIX = 'api';
const ABI_PREFIX = 'abi';
const SEARCH_PREFIX = 'search';
const NETWORK_PREFIX = 'network';
const PEERS_PREFIX = 'peers';
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js
var stringify = __webpack_require__("9Jkg");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("eVuF");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__("p0XB");
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("pLtp");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: external "qs"
var external_qs_ = __webpack_require__("eW3l");
var external_qs_default = /*#__PURE__*/__webpack_require__.n(external_qs_);

// EXTERNAL MODULE: external "core-js/es6/string"
var string_ = __webpack_require__("+4bY");

// EXTERNAL MODULE: external "core-js/es6/number"
var number_ = __webpack_require__("sx5k");

// EXTERNAL MODULE: external "core-js/es6/array"
var array_ = __webpack_require__("GPYY");

// EXTERNAL MODULE: external "core-js/es7/array"
var es7_array_ = __webpack_require__("pase");

// CONCATENATED MODULE: ./src/utils/Api.js





/* eslint-disable no-undef,no-throw-literal */






__webpack_require__("pv/X").polyfill();

__webpack_require__("W+0S");

const parseServerError = error => {
  const {
    message
  } = error;

  if (typeof message !== 'string') {
    if (keys_default()(message).length) {
      const firstKey = keys_default()(message)[0];

      return {
        status: error.status,
        message: `${firstKey}: ${message[firstKey] ? message[firstKey][0] : 'Error'}`,
        error: error.message
      };
    }

    if (is_array_default()(error.message) && error.message.length) {
      return {
        status: error.status,
        message: error.message[0]
      };
    }
  }

  return {
    status: error.status,
    message: error.message
  };
};

function get(url, params, credentials) {
  const query = external_qs_default.a.stringify(params);
  const headers = new Headers();
  const options = {
    method: 'GET',
    headers,
    cache: 'default'
  };

  if (credentials) {
    options.credentials = 'include';
  }

  return new promise_default.a((resolve, reject) => {
    fetch(`${url}?${query}`, options).then(response => {
      const contentType = response.headers.get('content-type');

      if (response.ok) {
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        }

        return response.text();
      }

      return response.json().then(error => {
        throw {
          status: error.status,
          message: error.error
        };
      });
    }).then(data => {
      resolve(data);
    }).catch(error => {
      reject(parseServerError(error));
    });
  });
}
function post(url, params) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    cache: 'default',
    mode: 'cors',
    body: stringify_default()(params)
  };
  return new promise_default.a((resolve, reject) => {
    fetch(url, options).then(response => {
      const contentType = response.headers.get('content-type');

      if (response.ok) {
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        }

        return response.text();
      }

      return response.json().then(error => {
        throw {
          status: error.status,
          message: error.error.message || error.error
        };
      });
    }).then(data => {
      resolve(data);
    }).catch(error => {
      reject(error);
    });
  });
}
function patch(url, params) {
  const options = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    cache: 'default',
    credentials: 'include',
    body: stringify_default()(params)
  };
  return new promise_default.a((resolve, reject) => {
    fetch(url, options).then(response => {
      const contentType = response.headers.get('content-type');

      if (response.ok) {
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        }

        return response.text();
      }

      return response.json().then(error => {
        throw {
          status: error.status,
          message: error.error
        };
      });
    }).then(data => {
      resolve(data);
    }).catch(error => {
      reject(parseServerError(error));
    });
  });
}
function put(url, body, contentType = 'application/json') {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': contentType
    },
    cache: 'default',
    mode: 'cors',
    body
  };
  delete options.headers['Content-Type'];
  return new promise_default.a((resolve, reject) => {
    fetch(url, options).then(response => {
      const contentTypeResp = response.headers.get('content-type');

      if (response.ok) {
        if (contentTypeResp && contentTypeResp.indexOf('application/json') !== -1) {
          return response.json();
        }

        return response.text();
      }

      return response.json().then(error => {
        throw {
          status: error.status,
          message: error.error.message || error.error
        };
      });
    }).then(data => {
      resolve(data);
    }).catch(error => {
      reject(error);
    });
  });
}
function upload(url, params) {
  const headers = new Headers();
  const options = {
    method: 'POST',
    headers,
    cache: 'default',
    credentials: 'include',
    contentType: false,
    processData: false,
    body: params
  };
  return new promise_default.a((resolve, reject) => {
    fetch(url, options).then(response => {
      const contentType = response.headers.get('content-type');

      if (response.ok) {
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        }

        return response.text();
      }

      if (response.status === 413) {
        throw {
          status: response.status,
          message: 'Файл слишком большой'
        };
      }

      return response.json().then(error => {
        throw {
          status: error.status,
          message: error.error
        };
      });
    }).then(data => {
      resolve(data);
    }).catch(error => {
      reject(parseServerError(error));
    });
  });
}
function del(url, params) {
  const query = external_qs_default.a.stringify(params);
  const headers = new Headers();
  const options = {
    method: 'DELETE',
    headers,
    cache: 'default',
    credentials: 'include' // body: params

  };
  return new promise_default.a((resolve, reject) => {
    fetch(`${url}?${query}`, options).then(response => {
      const contentType = response.headers.get('content-type');

      if (response.ok) {
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        }

        return response.text();
      }

      return response.json().then(error => {
        throw {
          status: error.status,
          message: error.error
        };
      });
    }).then(data => {
      resolve(data);
    }).catch(error => {
      reject(parseServerError(error));
    });
  });
}
// EXTERNAL MODULE: ./src/config/chain.js
var chain = __webpack_require__("ggud");

// CONCATENATED MODULE: ./src/services/ApiService.js




class ApiService_ApiService {
  static changeContract(id, data) {
    return put(`${chain["a" /* default */].SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${id}`, data, 'multipart/form-data');
  }

  static getContractInfo(contractId) {
    return get(`${chain["a" /* default */].SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${contractId}`);
  }

  static setStarToContract(data) {
    return post(`${chain["a" /* default */].SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${LIKE_PREFIX}`, data);
  }

  static getSolcList() {
    return get(chain["a" /* default */].SOLC_LIST_URL);
  }

  static verifyContract(data) {
    return post(`${chain["a" /* default */].SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${VERIFY_PREFIX}`, data);
  }

  static setAbi(data) {
    return post(`${chain["a" /* default */].SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${ABI_PREFIX}`, data);
  }

  static searchContracts(data) {
    return post(`${chain["a" /* default */].SERVER_URL}/${API_PREFIX}/${CONTRACT_PREFIX}/${SEARCH_PREFIX}`, data);
  }

  static getPeers(data) {
    return get(`${chain["a" /* default */].SERVER_URL}/${API_PREFIX}/${NETWORK_PREFIX}/${PEERS_PREFIX}`, data);
  }

}

/* harmony default export */ var services_ApiService = __webpack_exports__["a"] = (ApiService_ApiService);

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

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

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

/***/ "cSTb":
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
  peers: []
});
/* harmony default export */ __webpack_exports__["a"] = (Object(redux_modules__WEBPACK_IMPORTED_MODULE_1__["createModule"])({
  name: 'network',
  initialState: lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(DEFAULT_FIELDS),
  transformations: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, lodash__WEBPACK_IMPORTED_MODULE_3___default.a.cloneDeep(Object(_utils_TransformModules__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(DEFAULT_FIELDS)))
}));

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

/***/ "czfP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_RouterConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Z2WM");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("FQ1z");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





class NotFoundScreen extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  goToHome() {
    this.props.resetErrorPath();
    next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push(_constants_RouterConstants__WEBPACK_IMPORTED_MODULE_2__[/* INDEX_PATH */ "k"]);
  }

  render() {
    return __jsx(_index__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      titlePage: "404",
      titleButton: "GO TO HOMEPAGE",
      description: "page doesn't exist",
      onHandler: () => this.goToHome()
    });
  }

}

NotFoundScreen.defaultProps = {
  resetErrorPath: () => {}
};
/* harmony default export */ __webpack_exports__["a"] = (NotFoundScreen);

/***/ }),

/***/ "d/Cm":
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

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

/***/ "eW3l":
/***/ (function(module, exports) {

module.exports = require("qs");

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

/***/ "ftPg":
/***/ (function(module, exports) {

module.exports = require("react-debounce-input");

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

/***/ "pase":
/***/ (function(module, exports) {

module.exports = require("core-js/es7/array");

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

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "rVSV":
/***/ (function(module, exports) {



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

/***/ "sx5k":
/***/ (function(module, exports) {

module.exports = require("core-js/es6/number");

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

/***/ "ufKq":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

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

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "wz7p":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ItCh0LvQvtC5XzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNCAxOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIyMC4xLDAuNyAxMC4xLDEwLjcgMy45LDQuNiAwLjQsOC4yIDEwLjEsMTcuOSAyMy42LDQuMyAiLz4KPC9zdmc+Cg=="

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

/***/ "y6vh":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/date/now");

/***/ }),

/***/ "zIXN":
/***/ (function(module, exports) {

module.exports = require("react-helmet");

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