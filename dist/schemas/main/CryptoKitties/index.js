"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Web3 = require("web3");
var types_1 = require("../../../types");
exports.CryptoKittiesSchema = {
    version: 1,
    deploymentBlock: 4605167,
    name: 'CryptoKitties',
    description: 'The virtual kitties that started the craze.',
    thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
    website: 'https://cryptokitties.co',
    fields: [{ name: 'ID', type: 'uint256', description: 'CryptoKitty number.' }],
    assetFromFields: function assetFromFields(fields) {
        return fields.ID;
    },
    assetToFields: function assetToFields(asset) {
        return { ID: asset };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            var response, data, attrs;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return axios_1.default.get("https://api.cryptokitties.co/kitties/" + asset).catch(function (err) {
                                if (err.response && (err.response.status === 404 || err.response.status === 400)) {
                                    return null;
                                } else {
                                    throw err;
                                }
                            });

                        case 2:
                            response = _context.sent;

                            if (!(response === null)) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt("return", {
                                thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
                                title: 'CryptoKitty #' + asset,
                                description: '',
                                url: 'https://www.cryptokitties.co/kitty/' + asset,
                                properties: []
                            });

                        case 7:
                            data = response.data;
                            attrs = data.enhanced_cattributes || data.cattributes || [];
                            return _context.abrupt("return", {
                                thumbnail: data.image_url_cdn,
                                title: 'CryptoKitty #' + asset,
                                description: data.bio,
                                url: 'https://www.cryptokitties.co/kitty/' + asset,
                                properties: attrs.map(function (c) {
                                    return {
                                        key: c.type,
                                        kind: 'string',
                                        value: c.description
                                    };
                                })
                            });

                        case 10:
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
                name: 'transfer',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
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
                target: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: [{
            type: Web3.AbiType.Event,
            name: 'Transfer',
            target: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
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