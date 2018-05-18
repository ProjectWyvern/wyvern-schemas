"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethABI = require("ethereumjs-abi");
const types_1 = require("./types");
const failWith = (msg) => {
    throw new Error(msg);
};
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
exports.encodeSell = (schema, asset, address) => {
    const transfer = getTransferFunction(schema)(asset);
    return {
        target: transfer.target,
        calldata: exports.encodeDefaultCall(transfer, address),
        replacementPattern: exports.encodeReplacementPattern(transfer),
    };
};
exports.encodeBuy = (schema, asset, address) => {
    const transfer = getTransferFunction(schema)(asset);
    const replaceables = transfer.inputs.filter((i) => i.kind === types_1.FunctionInputKind.Replaceable);
    if (replaceables.length !== 1) {
        failWith('Only 1 input can match transfer destination, but instead ' + replaceables.length + ' did');
    }
    const inputs = transfer.inputs.map((i) => {
        if (i.kind === types_1.FunctionInputKind.Replaceable) {
            return address;
        }
        else if (i.value == null) {
            return generateDefaultValue(i.kind).toString();
        }
        else {
            return i.value.toString();
        }
    });
    const calldata = exports.encodeCall(transfer, inputs);
    return {
        target: transfer.target,
        calldata,
        replacementPattern: '0x',
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
exports.encodeReplacementPattern = abi => {
    const allowReplaceBit = '1';
    const doNotAllowReplaceBit = '0';
    /* Four bytes for method ID. */
    const maskArr = [doNotAllowReplaceBit, doNotAllowReplaceBit,
        doNotAllowReplaceBit, doNotAllowReplaceBit];
    /* This DOES NOT currently support dynamic-length data (arrays). */
    abi.inputs.map(i => {
        const type = ethABI.elementaryName(i.type);
        const encoded = ethABI.encodeSingle(type, generateDefaultValue(i.type));
        if (i.kind === types_1.FunctionInputKind.Replaceable) {
            maskArr.push(allowReplaceBit.repeat(encoded.length));
        }
        else {
            maskArr.push(doNotAllowReplaceBit.repeat(encoded.length));
        }
    });
    let mask = maskArr.reduce((x, y) => x + y, '');
    const ret = [];
    /* Encode into bytes. */
    while (true) {
        let byteChars = mask.substr(0, 8);
        if (byteChars.length === 0) {
            break;
        }
        byteChars = byteChars.padEnd(8, '0');
        let byte = 0;
        let mul = 2 ** 7;
        for (let i = 0; i < 8; i++) {
            byte += byteChars[i] === allowReplaceBit ? mul : 0;
            mul = mul / 2;
        }
        const buf = Buffer.alloc(1);
        buf.writeUInt8(byte, 0);
        ret.push(buf);
        mask = mask.slice(8);
    }
    return '0x' + Buffer.concat(ret).toString('hex');
};
function getTransferFunction(schema) {
    return schema.functions.transferFrom
        || schema.functions.transfer;
}
//# sourceMappingURL=schemaFunctions.js.map