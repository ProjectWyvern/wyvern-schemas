"use strict";

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var ethABI = require("ethereumjs-abi");
var wyvern_js_1 = require("wyvern-js");
var types_1 = require("./types");
var failWith = function failWith(msg) {
    throw new Error(msg);
};
// export const encodeReplacementPattern = WyvernProtocol.encodeReplacementPattern;
// Copied from wyvern-js 3.0.0-rc1
exports.encodeReplacementPattern = function (abi) {
    var replaceKind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : types_1.FunctionInputKind.Replaceable;

    var allowReplaceByte = '1';
    var doNotAllowReplaceByte = '0';
    /* Four bytes for method ID. */
    var maskArr = [doNotAllowReplaceByte, doNotAllowReplaceByte, doNotAllowReplaceByte, doNotAllowReplaceByte];
    /* This DOES NOT currently support dynamic-length data (arrays). */
    abi.inputs.map(function (i) {
        var type = ethABI.elementaryName(i.type);
        var encoded = ethABI.encodeSingle(type, wyvern_js_1.WyvernProtocol.generateDefaultValue(i.type));
        if (i.kind === replaceKind) {
            maskArr.push(allowReplaceByte.repeat(encoded.length));
        } else {
            maskArr.push(doNotAllowReplaceByte.repeat(encoded.length));
        }
    });
    var mask = maskArr.reduce(function (x, y) {
        return x + y;
    }, '');
    var ret = [];
    /* Encode into bytes. */
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(mask), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var char = _step.value;

            var byte = char === allowReplaceByte ? 255 : 0;
            var buf = Buffer.alloc(1);
            buf.writeUInt8(byte, 0);
            ret.push(buf);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return '0x' + Buffer.concat(ret).toString('hex');
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
                return generateDefaultValue(input.type);
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
                return generateDefaultValue(input.type);
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