"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
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
exports.encodeAtomicizedSell = function (schema, assets, address, atomicizer) {
    var transactions = assets.map(function (asset) {
        var _exports$encodeSell = exports.encodeSell(schema, asset, address),
            target = _exports$encodeSell.target,
            calldata = _exports$encodeSell.calldata;

        return {
            calldata: calldata,
            abi: getTransferFunction(schema)(asset),
            address: target,
            value: new utils_1.BigNumber(0)
        };
    });
    var atomicizedCalldata = atomicizer.atomicize.getABIEncodedTransactionData(transactions.map(function (t) {
        return t.address;
    }), transactions.map(function (t) {
        return t.value;
    }), transactions.map(function (t) {
        return new utils_1.BigNumber((t.calldata.length - 2) / 2);
    }), // subtract 2 for '0x', divide by 2 for hex
    transactions.map(function (t) {
        return t.calldata;
    }).reduce(function (x, y) {
        return x + y.slice(2);
    }));
    var atomicizedReplacementPattern = wyvern_js_1.WyvernProtocol.encodeAtomicizedReplacementPattern(transactions.map(function (t) {
        return t.abi;
    }));
    return {
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern
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