"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeDefaultCall = exports.encodeBuy = exports.encodeAtomicizedBuy = exports.encodeAtomicizedSell = exports.encodeSell = exports.encodeCall = exports.encodeReplacementPattern = void 0;
const utils_1 = require("@0x/utils");
const ethABI = require("ethereumjs-abi");
const wyvern_js_1 = require("wyvern-js");
const types_1 = require("./types");
const failWith = (msg) => {
    throw new Error(msg);
};
exports.encodeReplacementPattern = wyvern_js_1.WyvernProtocol.encodeReplacementPattern;
const encodeCall = (abi, parameters) => {
    const inputTypes = abi.inputs.map(i => i.type);
    return '0x' + Buffer.concat([
        ethABI.methodID(abi.name, inputTypes),
        ethABI.rawEncode(inputTypes, parameters),
    ]).toString('hex');
};
exports.encodeCall = encodeCall;
const encodeSell = (schema, asset, address) => {
    const transfer = schema.functions.transfer(asset);
    return {
        target: transfer.target,
        calldata: (0, exports.encodeDefaultCall)(transfer, address),
        replacementPattern: (0, exports.encodeReplacementPattern)(transfer),
    };
};
exports.encodeSell = encodeSell;
const encodeAtomicizedSell = (schema, assets, address, atomicizer) => {
    const transactions = assets.map(asset => {
        const { target, calldata } = (0, exports.encodeSell)(schema, asset, address);
        return {
            calldata,
            abi: schema.functions.transfer(asset),
            address: target,
            value: new utils_1.BigNumber(0),
        };
    });
    const atomicizedCalldata = atomicizer
        .atomicize(transactions.map(t => t.address), transactions.map(t => t.value), transactions.map(t => new utils_1.BigNumber((t.calldata.length - 2) / 2)), // subtract 2 for '0x', divide by 2 for hex
    transactions.map(t => t.calldata).reduce((x, y) => {
        return x + y.slice(2);
    }))
        .getABIEncodedTransactionData();
    const atomicizedReplacementPattern = wyvern_js_1.WyvernProtocol.encodeAtomicizedReplacementPattern(transactions.map(t => t.abi));
    return {
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern,
    };
};
exports.encodeAtomicizedSell = encodeAtomicizedSell;
const encodeAtomicizedBuy = (schema, assets, address, atomicizer) => {
    const transactions = assets.map(asset => {
        const { target, calldata } = (0, exports.encodeBuy)(schema, asset, address);
        return {
            calldata,
            abi: schema.functions.transfer(asset),
            address: target,
            value: new utils_1.BigNumber(0),
        };
    });
    const atomicizedCalldata = atomicizer
        .atomicize(transactions.map(t => t.address), transactions.map(t => t.value), transactions.map(t => new utils_1.BigNumber((t.calldata.length - 2) / 2)), // subtract 2 for '0x', divide by 2 for hex
    transactions.map(t => t.calldata).reduce((x, y) => {
        return x + y.slice(2);
    }))
        .getABIEncodedTransactionData();
    const atomicizedReplacementPattern = wyvern_js_1.WyvernProtocol.encodeAtomicizedReplacementPattern(transactions.map(t => t.abi), types_1.FunctionInputKind.Owner);
    return {
        calldata: atomicizedCalldata,
        replacementPattern: atomicizedReplacementPattern,
    };
};
exports.encodeAtomicizedBuy = encodeAtomicizedBuy;
const encodeBuy = (schema, asset, address) => {
    const transfer = schema.functions.transfer(asset);
    const replaceables = transfer.inputs.filter((i) => i.kind === types_1.FunctionInputKind.Replaceable);
    const ownerInputs = transfer.inputs.filter((i) => i.kind === types_1.FunctionInputKind.Owner);
    // Validate
    if (replaceables.length !== 1) {
        failWith('Only 1 input can match transfer destination, but instead ' + replaceables.length + ' did');
    }
    // Compute calldata
    const parameters = transfer.inputs.map((input) => {
        switch (input.kind) {
            case types_1.FunctionInputKind.Replaceable:
                return address;
            case types_1.FunctionInputKind.Owner:
                return wyvern_js_1.WyvernProtocol.generateDefaultValue(input.type);
            default:
                return input.value.toString();
        }
    });
    const calldata = (0, exports.encodeCall)(transfer, parameters);
    // Compute replacement pattern
    let replacementPattern = '0x';
    if (ownerInputs.length > 0) {
        replacementPattern = (0, exports.encodeReplacementPattern)(transfer, types_1.FunctionInputKind.Owner);
    }
    return {
        target: transfer.target,
        calldata,
        replacementPattern,
    };
};
exports.encodeBuy = encodeBuy;
const encodeDefaultCall = (abi, address) => {
    const parameters = abi.inputs.map(input => {
        switch (input.kind) {
            case types_1.FunctionInputKind.Replaceable:
                return wyvern_js_1.WyvernProtocol.generateDefaultValue(input.type);
            case types_1.FunctionInputKind.Owner:
                return address;
            case types_1.FunctionInputKind.Asset:
            default:
                return input.value;
        }
    });
    return (0, exports.encodeCall)(abi, parameters);
};
exports.encodeDefaultCall = encodeDefaultCall;
//# sourceMappingURL=schemaFunctions.js.map