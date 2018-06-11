"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethABI = require("ethereumjs-abi");
const wyvern_js_1 = require("wyvern-js");
const types_1 = require("./types");
const failWith = (msg) => {
    throw new Error(msg);
};
exports.encodeReplacementPattern = wyvern_js_1.WyvernProtocol.encodeReplacementPattern;
exports.encodeCall = (abi, parameters) => {
    const inputTypes = abi.inputs.map(i => i.type);
    return '0x' + Buffer.concat([
        ethABI.methodID(abi.name, inputTypes),
        ethABI.rawEncode(inputTypes, parameters),
    ]).toString('hex');
};
const generateDefaultValue = (type) => {
    switch (type) {
        case 'address':
            /* Null address is sometimes checked in transfer calls. */
            return '0x1111111111111111111111111111111111111111';
        case 'bytes32':
            return '0x0000000000000000000000000000000000000000000000000000000000000000';
        case 'bool':
            return false;
        case 'int':
        case 'uint':
        case 'uint8':
        case 'uint16':
        case 'uint32':
        case 'uint64':
        case 'uint256':
            return 0;
        default:
            failWith('Default value not yet implemented for type: ' + type);
    }
};
exports.encodeSell = (schema, asset, address) => {
    const transfer = getTransferFunction(schema)(asset);
    return {
        target: transfer.target,
        calldata: exports.encodeDefaultCall(transfer, address),
        replacementPattern: wyvern_js_1.WyvernProtocol.encodeReplacementPattern(transfer),
    };
};
exports.encodeBuy = (schema, asset, address) => {
    const transfer = getTransferFunction(schema)(asset);
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
                return generateDefaultValue(input.type);
            default:
                return input.value.toString();
        }
    });
    const calldata = exports.encodeCall(transfer, parameters);
    // Compute replacement pattern
    let replacementPattern = '0x';
    if (ownerInputs.length > 0) {
        replacementPattern = wyvern_js_1.WyvernProtocol.encodeReplacementPattern(transfer, types_1.FunctionInputKind.Owner);
    }
    return {
        target: transfer.target,
        calldata,
        replacementPattern,
    };
};
exports.encodeDefaultCall = (abi, address) => {
    const parameters = abi.inputs.map(input => {
        switch (input.kind) {
            case types_1.FunctionInputKind.Asset:
                return input.value;
            case types_1.FunctionInputKind.Replaceable:
                return generateDefaultValue(input.type);
            case types_1.FunctionInputKind.Owner:
                return address;
        }
    });
    return exports.encodeCall(abi, parameters);
};
function getTransferFunction(schema) {
    return schema.functions.transferFrom
        || schema.functions.transfer;
}
//# sourceMappingURL=schemaFunctions.js.map