"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var types_1 = require("../../../types");
exports.CryptoPunksSchema = {
    version: 1,
    deploymentBlock: 3914495,
    name: 'CryptoPunks',
    description: '10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.',
    thumbnail: 'https://www.larvalabs.com/cryptopunks/cryptopunk2838.png',
    website: 'https://www.larvalabs.com/cryptopunks',
    fields: [{ name: 'ID', type: 'uint256', description: 'CryptoPunk number.' }],
    assetFromFields: function assetFromFields(fields) {
        return fields.ID;
    },
    assetToFields: function assetToFields(asset) {
        return { ID: asset };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", {
                                thumbnail: 'https://www.larvalabs.com/cryptopunks/cryptopunk' + asset + '.png',
                                title: 'CryptoPunk #' + asset,
                                description: '',
                                url: 'https://www.larvalabs.com/cryptopunks/details/' + asset,
                                properties: []
                            });

                        case 1:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function formatter(_x) {
            return _ref.apply(this, arguments);
        }

        return formatter;
    }(),
    functions: {
        transfer: function transfer(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'transferPunk',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
                inputs: [{ kind: types_1.FunctionInputKind.Replaceable, name: 'to', type: 'address' }, { kind: types_1.FunctionInputKind.Asset, name: 'punkIndex', type: 'uint256', value: asset }],
                outputs: []
            };
        },
        ownerOf: function ownerOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'punkIndexToAddress',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '', type: 'uint256', value: asset }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: '', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: [{
            type: Web3.AbiType.Event,
            name: 'PunkTransfer',
            target: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            anonymous: false,
            inputs: [{ kind: types_1.EventInputKind.Source, indexed: true, name: 'from', type: 'address' }, { kind: types_1.EventInputKind.Destination, indexed: true, name: 'to', type: 'address' }, { kind: types_1.EventInputKind.Asset, indexed: false, name: 'punkIndex', type: 'uint256' }],
            assetFromInputs: function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", inputs.punkIndex);

                                case 1:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, undefined);
                }));

                function assetFromInputs(_x2) {
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