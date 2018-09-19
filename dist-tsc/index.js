"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
/* HACK */
// @ts-ignore
Web3.AbiType = {
    Function: 'function',
    Event: 'event',
};
var schemaFunctions_1 = require("./schemaFunctions");
exports.encodeBuy = schemaFunctions_1.encodeBuy;
exports.encodeSell = schemaFunctions_1.encodeSell;
exports.encodeAtomicizedBuy = schemaFunctions_1.encodeAtomicizedBuy;
exports.encodeAtomicizedSell = schemaFunctions_1.encodeAtomicizedSell;
exports.encodeCall = schemaFunctions_1.encodeCall;
exports.encodeDefaultCall = schemaFunctions_1.encodeDefaultCall;
exports.encodeReplacementPattern = schemaFunctions_1.encodeReplacementPattern;
var index_1 = require("./schemas/index");
exports.schemas = index_1.schemas;
var index_2 = require("./tokens/index");
exports.tokens = index_2.tokens;
var web3_1 = require("web3");
exports.AbiType = web3_1.AbiType;
//# sourceMappingURL=index.js.map