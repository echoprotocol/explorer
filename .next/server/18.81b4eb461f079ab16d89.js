exports.ids = [18];
exports.modules = {

/***/ "//oX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var echojs_ping__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("+xE3");
/* harmony import */ var echojs_ping__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(echojs_ping__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;



function SvgAvatarComponent({
  accountName,
  avatarSize
}) {
  return __jsx("div", {
    dangerouslySetInnerHTML: {
      __html: Object(echojs_ping__WEBPACK_IMPORTED_MODULE_0__["svgAvatar"])(accountName, avatarSize)
    }
  });
}

SvgAvatarComponent.defaultProps = {
  avatarSize: null,
  accountName: ''
};
/* harmony default export */ __webpack_exports__["default"] = (SvgAvatarComponent);

/***/ })

};;