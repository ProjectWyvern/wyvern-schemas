"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ethABI = require("ethereumjs-abi");
var types_1 = require("./types");
var failWith = function failWith(msg) {
    throw new Error(msg);
};
exports.encodeCall = function (abi, parameters) {
    var inputTypes = abi.inputs.map(function (i) {
        return i.type;
    });
    return '0x' + Buffer.concat([ethABI.methodID(abi.name, inputTypes), ethABI.rawEncode(inputTypes, parameters)]).toString('hex');
};
var generateDefaultValue = function generateDefaultValue(type) {
    switch (type) {
        case 'address':
        case types_1.FunctionInputKind.Owner:
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
    if (replaceables.length !== 1) {
        failWith('Only 1 input can match transfer destination, but instead ' + replaceables.length + ' did');
    }
    var calldata = exports.encodeDefaultCall(transfer, address);
    return {
        target: transfer.target,
        calldata: calldata,
        replacementPattern: '0x'
    };
};
exports.encodeDefaultCall = function (abi, address) {
    var parameters = abi.inputs.map(function (input) {
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
exports.encodeReplacementPattern = function (abi) {
    var allowReplaceBit = '1';
    var doNotAllowReplaceBit = '0';
    /* Four bytes for method ID. */
    var maskArr = [doNotAllowReplaceBit, doNotAllowReplaceBit, doNotAllowReplaceBit, doNotAllowReplaceBit];
    /* This DOES NOT currently support dynamic-length data (arrays). */
    abi.inputs.map(function (i) {
        var type = ethABI.elementaryName(i.type);
        var encoded = ethABI.encodeSingle(type, generateDefaultValue(i.type));
        if (i.kind === types_1.FunctionInputKind.Replaceable) {
            maskArr.push(allowReplaceBit.repeat(encoded.length));
        } else {
            maskArr.push(doNotAllowReplaceBit.repeat(encoded.length));
        }
    });
    var mask = maskArr.reduce(function (x, y) {
        return x + y;
    }, '');
    var ret = [];
    /* Encode into bytes. */
    while (true) {
        var byteChars = mask.substr(0, 8);
        if (byteChars.length === 0) {
            break;
        }
        byteChars = byteChars.padEnd(8, '0');
        var byte = 0;
        var mul = Math.pow(2, 7);
        for (var i = 0; i < 8; i++) {
            byte += byteChars[i] === allowReplaceBit ? mul : 0;
            mul = mul / 2;
        }
        var buf = Buffer.alloc(1);
        buf.writeUInt8(byte, 0);
        ret.push(buf);
        mask = mask.slice(8);
    }
    return '0x' + Buffer.concat(ret).toString('hex');
};
function getTransferFunction(schema) {
    return schema.functions.transferFrom || schema.functions.transfer;
}
//# sourceMappingURL=schemaFunctions.js.map
//# sourceMappingURL=schemaFunctions.js.map