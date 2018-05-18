"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var typed_promisify_1 = require("typed-promisify");
var Web3 = require("web3");
var types_1 = require("../../../types");
exports.CryptoHorseSchema = {
    version: 2,
    deploymentBlock: 4979255,
    name: 'CryptoHorse',
    description: 'Collectible and breedable blockchain horses',
    thumbnail: 'https://www.cryptohorse.ch/logo.svg',
    website: 'https://www.cryptohorse.ch/',
    fields: [{ name: 'ID', type: 'uint256', description: 'CryptoHorse number.' }],
    assetFromFields: function assetFromFields(fields) {
        return fields.ID;
    },
    assetToFields: function assetToFields(asset) {
        return { ID: asset };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset, web3) {
            var abi, contract, data, generation;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            abi = { 'constant': true, 'inputs': [{ 'name': '_id', 'type': 'uint256' }], 'name': 'getHorse', 'outputs': [{ 'name': 'price', 'type': 'uint256' }, { 'name': 'id', 'type': 'uint256' }, { 'name': 'forSale', 'type': 'bool' }, { 'name': 'isGestating', 'type': 'bool' }, { 'name': 'isReady', 'type': 'bool' }, { 'name': 'unproductiveIndex', 'type': 'uint256' }, { 'name': 'nextActionAt', 'type': 'uint256' }, { 'name': 'stallionWithId', 'type': 'uint256' }, { 'name': 'birthTime', 'type': 'uint256' }, { 'name': 'mareId', 'type': 'uint256' }, { 'name': 'stallionId', 'type': 'uint256' }, { 'name': 'generation', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            contract = web3.eth.contract([abi]).at('0xB88924408A95917c75DE67fc9FbdC4Af992979c3');
                            _context.next = 4;
                            return typed_promisify_1.promisify(contract[abi.name].call)(asset);

                        case 4:
                            data = _context.sent;
                            generation = data[11];
                            return _context.abrupt("return", {
                                thumbnail: 'https://www.cryptohorse.ch/logo.svg',
                                title: 'CryptoHorse #' + asset,
                                description: 'Generation: ' + generation,
                                url: 'https://www.cryptohorse.ch/',
                                properties: []
                            });

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function formatter(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return formatter;
    }(),
    functions: {
        transfer: function transfer(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'transfer',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
                inputs: [{ kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' }, { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset }],
                outputs: []
            };
        },
        ownerOf: function ownerOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'ownerOf',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' }, { kind: types_1.FunctionOutputKind.Other, name: 'tokenId', type: 'uint256' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: [{
            type: Web3.AbiType.Event,
            name: 'Transfer',
            target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
            anonymous: false,
            inputs: [{ kind: types_1.EventInputKind.Source, indexed: false, name: 'from', type: 'address' }, { kind: types_1.EventInputKind.Destination, indexed: false, name: 'to', type: 'address' }, { kind: types_1.EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256' }],
            assetFromInputs: function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", inputs.tokenId);

                                case 1:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, undefined);
                }));

                function assetFromInputs(_x3) {
                    return _ref2.apply(this, arguments);
                }

                return assetFromInputs;
            }()
        }]
    },
    hash: function hash(a) {
        return a;
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map