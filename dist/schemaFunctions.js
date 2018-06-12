"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ethABI = require("ethereumjs-abi");
var wyvern_js_1 = require("wyvern-js");
var types_1 = require("./types");
var failWith = function failWith(msg) {
    throw new Error(msg);
};
exports.encodeReplacementPattern = wyvern_js_1.WyvernProtocol.encodeReplacementPattern;
exports.encodeCall = function (abi, parameters) {
    var inputTypes = abi.inputs.map(function (i) {
        return i.type;
    });
    return '0x' + Buffer.concat([ethABI.methodID(abi.name, inputTypes), ethABI.rawEncode(inputTypes, parameters)]).toString('hex');
};
exports.encodeSell = function (schema, asset, address) {
    var transfer = getTransferFunction(schema)(asset);
    return {
        target: transfer.target,
        calldata: exports.encodeDefaultCall(transfer, address),
        replacementPattern: exports.encodeReplacementPattern(transfer)
    };
};
exports.encodeBuy = function (schema, asset, address) {
    var transfer = getTransferFunction(schema)(asset);
    var replaceables = transfer.inputs.filter(function (i) {
        return i.kind === types_1.FunctionInputKind.Replaceable;
    });
    var ownerInputs = transfer.inputs.filter(function (i) {
        return i.kind === types_1.FunctionInputKind.Owner;
    });
    // Validate
    if (replaceables.length !== 1) {
        failWith('Only 1 input can match transfer destination, but instead ' + replaceables.length + ' did');
    }
    // Compute calldata
    var parameters = transfer.inputs.map(function (input) {
        switch (input.kind) {
            case types_1.FunctionInputKind.Replaceable:
                return address;
            case types_1.FunctionInputKind.Owner:
                return wyvern_js_1.WyvernProtocol.generateDefaultValue(input.type);
            default:
                return input.value.toString();
        }
    });
    var calldata = exports.encodeCall(transfer, parameters);
    // Compute replacement pattern
    var replacementPattern = '0x';
    if (ownerInputs.length > 0) {
        replacementPattern = exports.encodeReplacementPattern(transfer, types_1.FunctionInputKind.Owner);
    }
    return {
        target: transfer.target,
        calldata: calldata,
        replacementPattern: replacementPattern
    };
};
exports.encodeDefaultCall = function (abi, address) {
    var parameters = abi.inputs.map(function (input) {
        switch (input.kind) {
            case types_1.FunctionInputKind.Asset:
                return input.value;
            case types_1.FunctionInputKind.Replaceable:
                return wyvern_js_1.WyvernProtocol.generateDefaultValue(input.type);
            case types_1.FunctionInputKind.Owner:
                return address;
        }
    });
    return exports.encodeCall(abi, parameters);
};
function getTransferFunction(schema) {
    return schema.functions.transferFrom || schema.functions.transfer;
}
//# sourceMappingURL=schemaFunctions.js.map
//# sourceMappingURL=schemaFunctions.js.map