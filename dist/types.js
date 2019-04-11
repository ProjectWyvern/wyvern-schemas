"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var Network;
(function (Network) {
    Network["Main"] = "main";
    Network["Rinkeby"] = "rinkeby";
    Network["Kovan"] = "kovan";
})(Network = exports.Network || (exports.Network = {}));
var ABIType;
(function (ABIType) {
    ABIType["Function"] = "function";
    ABIType["Event"] = "event";
})(ABIType = exports.ABIType || (exports.ABIType = {}));
var StateMutability;
(function (StateMutability) {
    StateMutability["Pure"] = "pure";
    StateMutability["View"] = "view";
    StateMutability["Payable"] = "payable";
    StateMutability["Nonpayable"] = "nonpayable";
})(StateMutability = exports.StateMutability || (exports.StateMutability = {}));
var FunctionInputKind;
(function (FunctionInputKind) {
    FunctionInputKind["Replaceable"] = "replaceable";
    FunctionInputKind["Asset"] = "asset";
    FunctionInputKind["Owner"] = "owner";
    FunctionInputKind["Index"] = "index";
    FunctionInputKind["Quantity"] = "quantity";
})(FunctionInputKind = exports.FunctionInputKind || (exports.FunctionInputKind = {}));
var FunctionOutputKind;
(function (FunctionOutputKind) {
    FunctionOutputKind["Owner"] = "owner";
    FunctionOutputKind["Asset"] = "asset";
    FunctionOutputKind["Count"] = "count";
    FunctionOutputKind["Other"] = "other";
})(FunctionOutputKind = exports.FunctionOutputKind || (exports.FunctionOutputKind = {}));
var EventInputKind;
(function (EventInputKind) {
    EventInputKind["Source"] = "source";
    EventInputKind["Destination"] = "destination";
    EventInputKind["Asset"] = "asset";
    EventInputKind["Other"] = "other";
})(EventInputKind = exports.EventInputKind || (exports.EventInputKind = {}));
//# sourceMappingURL=types.js.map
//# sourceMappingURL=types.js.map