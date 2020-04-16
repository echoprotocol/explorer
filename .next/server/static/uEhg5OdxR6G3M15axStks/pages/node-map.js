module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		15: 0
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
/******/ 			var chunk = require("../../../" + ({}[chunkId]||chunkId) + "." + {"1":"4f90c69894dcb11687ec"}[chunkId] + ".js");
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+4bY":
/***/ (function(module, exports) {

module.exports = require("core-js/es6/string");

/***/ }),

/***/ "/T1H":
/***/ (function(module, exports) {

module.exports = require("next/dynamic");

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("IAdc");


/***/ }),

/***/ "2wwy":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Loka");

/***/ }),

/***/ "4mXO":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("k1wZ");

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

/***/ "GPYY":
/***/ (function(module, exports) {

module.exports = require("core-js/es6/array");

/***/ }),

/***/ "IAdc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/values.js
var values = __webpack_require__("2wwy");
var values_default = /*#__PURE__*/__webpack_require__.n(values);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js + 1 modules
var objectSpread = __webpack_require__("zrwo");

// EXTERNAL MODULE: external "country-list"
var external_country_list_ = __webpack_require__("UNZ4");

// EXTERNAL MODULE: ./src/reducers/NetworkReducer.js
var NetworkReducer = __webpack_require__("cSTb");

// EXTERNAL MODULE: ./src/actions/BaseActionsClass.js
var BaseActionsClass = __webpack_require__("f3j0");

// EXTERNAL MODULE: ./src/services/ApiService.js + 2 modules
var ApiService = __webpack_require__("XOUZ");

// CONCATENATED MODULE: ./src/actions/NetworkActions.js







class NetworkActions_NetworkActionsClass extends BaseActionsClass["a" /* default */] {
  /** Initialize reducer
   * @constructor
   */
  constructor() {
    super(NetworkReducer["a" /* default */]);
  }
  /**
   * get peers
   * @param {String} type
   * @param params
   * @param {object} type
   */


  getPeers(connected) {
    return async dispatch => {
      const options = connected ? {
        connected: true
      } : {};
      const peers = await ApiService["a" /* default */].getPeers(options);
      const value = peers.filter(p => p).map(p => Object(objectSpread["a" /* default */])({}, p, {
        country: Object(external_country_list_["getName"])(p.country) || p.country
      })).reduce((acc, p) => {
        const key = `${p.ll[0]}${p.ll[1]}`;

        if (!acc[key]) {
          acc[key] = Object(objectSpread["a" /* default */])({}, p, {
            node: 1
          });
        } else {
          acc[key].node += 1;
        }

        return acc;
      }, {});
      dispatch(this.reducer.actions.set({
        field: 'peers',
        value: values_default()(value),
        fromJS: false
      }));
    };
  }

}

const NetworkActions = new NetworkActions_NetworkActionsClass();
/* harmony default export */ var actions_NetworkActions = (NetworkActions);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "next/dynamic"
var dynamic_ = __webpack_require__("/T1H");
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic_);

// EXTERNAL MODULE: ./src/config/chain.js
var chain = __webpack_require__("ggud");

// CONCATENATED MODULE: ./src/constants/NetworkConstants.js
const DEFAULT_MAP_ZOOM = [1];
// EXTERNAL MODULE: ./src/components/Loader/index.jsx
var Loader = __webpack_require__("9eFo");

// CONCATENATED MODULE: ./src/components/NodeMap/index.jsx
var __jsx = external_react_default.a.createElement;





const Map = dynamic_default()(() => __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "SLJa")), {
  ssr: false,
  loading: () => __jsx(Loader["a" /* default */], null),
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("SLJa")],
    modules: ['./mapbox']
  }
});
const Layer = dynamic_default()(() => __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "SLJa")).then(component => component.Layer), {
  ssr: false,
  loading: () => __jsx(Loader["a" /* default */], null),
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("SLJa")],
    modules: ['./mapbox']
  }
});
const Feature = dynamic_default()(() => __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "SLJa")).then(component => component.Feature), {
  ssr: false,
  loading: () => __jsx(Loader["a" /* default */], null),
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("SLJa")],
    modules: ['./mapbox']
  }
});
const Popup = dynamic_default()(() => __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "SLJa")).then(component => component.Popup), {
  ssr: false,
  loading: () => __jsx(Loader["a" /* default */], null),
  loadableGenerated: {
    webpack: () => [/*require.resolve*/("SLJa")],
    modules: ['./mapbox']
  }
});

class NodeMap_NodeMap extends external_react_default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupData: null,
      data: []
    };
  }

  componentDidMount() {
    this.props.getPeers(true);
  }

  static getDerivedStateFromProps(props) {
    const getCircleRadius = nodeCount => {
      if (nodeCount > 1) {
        return 11;
      } else if (nodeCount > 10) {
        return 13;
      } else if (nodeCount > 20) {
        return 17;
      }

      return 8;
    };

    const data = props.peers.map((p, i) => ({
      id: i.toString(),
      city: p.city,
      country: p.country,
      latitude: p.ll[0],
      longitude: p.ll[1],
      node: p.node,
      POSITION_CIRCLE_PAINT: {
        'circle-stroke-width': 0,
        'circle-radius': getCircleRadius(p.node),
        'circle-blur': 0.15,
        'circle-stroke-color': 'white',
        'circle-color': '#4588D7'
      }
    }));
    return {
      data
    };
  }

  onHover(mapWithEvt, p) {
    mapWithEvt.map.setPaintProperty(p.id, 'circle-color', '#1B1B21');
    mapWithEvt.map.setPaintProperty(p.id, 'circle-stroke-width', 3);
    this.showPopup(p);
  }

  showPopup(popupData) {
    this.setState({
      popupData
    });
  }

  hidePopup(mapWithEvt, p) {
    mapWithEvt.map.setPaintProperty(p.id, 'circle-color', '#4588D7');
    mapWithEvt.map.setPaintProperty(p.id, 'circle-stroke-width', 0);
    this.setState({
      popupData: null
    });
  }

  render() {
    const {
      popupData,
      data
    } = this.state;
    return __jsx("div", {
      className: "distribution inner-container"
    }, __jsx("div", {
      className: "distribution-header"
    }, __jsx("h1", null, "Nodes Distribution"), __jsx("button", {
      onClick: () => window.open(chain["a" /* default */].INSTALL_NODE_LINK, '_blank')
    }, "How to run full node")), __jsx(Map, {
      className: "distribution-map" // eslint-disable-next-line react/style-prop-object
      ,
      style: "mapbox://styles/maxshev/ck2lyn9ua0bv61cp7598loxiq",
      zoom: DEFAULT_MAP_ZOOM
    }, data.map((p, key) => __jsx(Layer, {
      type: "circle",
      id: p.id,
      key: key.toString(),
      paint: p.POSITION_CIRCLE_PAINT
    }, __jsx(Feature, {
      coordinates: [p.longitude, p.latitude],
      onMouseEnter: mapWithEvt => this.onHover(mapWithEvt, p),
      onMouseLeave: mapWithEvt => this.hidePopup(mapWithEvt, p)
    }))), popupData && __jsx(Popup, {
      coordinates: [popupData.longitude, popupData.latitude],
      anchor: "null"
    }, __jsx("span", null, popupData.city, popupData.city ? ', ' : ' ', popupData.country), __jsx("br", null), __jsx("span", null, "count = ", popupData.node))));
  }

}

/* harmony default export */ var components_NodeMap = (NodeMap_NodeMap);
// CONCATENATED MODULE: ./src/containers/NodeMap/index.jsx



/* harmony default export */ var containers_NodeMap = (Object(external_react_redux_["connect"])(state => ({
  peers: state.network.get('peers')
}), dispatch => ({
  getPeers: connected => dispatch(actions_NetworkActions.getPeers(connected))
}))(components_NodeMap));
// CONCATENATED MODULE: ./src/pages/node-map/index.jsx

/* harmony default export */ var node_map = __webpack_exports__["default"] = (containers_NodeMap);

/***/ }),

/***/ "Im+X":
/***/ (function(module, exports) {

module.exports = require("react-mapbox-gl");

/***/ }),

/***/ "Jo+v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Z6Kq");

/***/ }),

/***/ "K2gz":
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "Loka":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/values");

/***/ }),

/***/ "R2Q7":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/array/is-array");

/***/ }),

/***/ "TUA0":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "UED3":
/***/ (function(module, exports) {

module.exports = require("redux-modules-middleware");

/***/ }),

/***/ "UNZ4":
/***/ (function(module, exports) {

module.exports = require("country-list");

/***/ }),

/***/ "W+0S":
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "WKeQ":
/***/ (function(module, exports) {

module.exports = require("redux-modules");

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

/***/ "YLtl":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "Z6Kq":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "aC71":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

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

/***/ "eVuF":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("aC71");

/***/ }),

/***/ "eW3l":
/***/ (function(module, exports) {

module.exports = require("qs");

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

/***/ "fozc":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/json/stringify");

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

/***/ "k1wZ":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "nuGg":
/***/ (function(module, exports) {

module.exports = require("immutable");

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

/***/ "rf6O":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "sx5k":
/***/ (function(module, exports) {

module.exports = require("core-js/es6/number");

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