"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventInputKind = exports.FunctionOutputKind = exports.StateMutability = exports.ABIType = exports.Network = exports.FunctionInputKind = void 0;
const types_1 = require("wyvern-js/lib/types");
Object.defineProperty(exports, "FunctionInputKind", { enumerable: true, get: function () { return types_1.FunctionInputKind; } });
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