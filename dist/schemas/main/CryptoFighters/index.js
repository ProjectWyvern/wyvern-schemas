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
exports.CryptoFightersSchema = {
    version: 2,
    deploymentBlock: 4952230,
    name: 'CryptoFighters',
    description: 'Collect, train, and fight: digital fighters on the blockchain.',
    thumbnail: 'https://s3.amazonaws.com/cryptofighters/images/455fde9f-9810-4e70-bda6-8bb5cf7a6fe7.png',
    website: 'https://cryptofighters.io/',
    fields: [{ name: 'ID', type: 'uint256', description: 'CryptoFighter number.' }],
    assetFromFields: function assetFromFields(fields) {
        return fields.ID;
    },
    assetToFields: function assetToFields(asset) {
        return { ID: asset };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            var response, data;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return axios_1.default.get("https://api.cryptofighters.io/fighters/" + asset);

                        case 2:
                            response = _context.sent;
                            data = response.data;

                            if (!(data === null)) {
                                _context.next = 8;
                                break;
                            }

                            return _context.abrupt("return", {
                                thumbnail: 'https://s3.amazonaws.com/cryptofighters/images/455fde9f-9810-4e70-bda6-8bb5cf7a6fe7.png',
                                title: 'CryptoFighter #' + asset,
                                description: '',
                                url: 'https://cryptofighters.io/fighter/' + asset,
                                properties: []
                            });

                        case 8:
                            return _context.abrupt("return", {
                                thumbnail: data.image,
                                title: 'CryptoFighter #' + asset,
                                description: 'Luck: ' + data.luck + ', genes: ' + data.attr.join(', '),
                                url: 'https://cryptofighters.io/fighter/' + asset,
                                properties: []
                            });

                        case 9:
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
                target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
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
                target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
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
            target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
            anonymous: false,
            inputs: [{ kind: types_1.EventInputKind.Source, indexed: true, name: 'from', type: 'address' }, { kind: types_1.EventInputKind.Destination, indexed: true, name: 'to', type: 'address' }, { kind: types_1.EventInputKind.Asset, indexed: true, name: 'tokenId', type: 'uint256' }],
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