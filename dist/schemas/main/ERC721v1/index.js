"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var types_1 = require("../../../types");
exports.ECR721v1Schema = {
    version: 1,
    deploymentBlock: 0,
    name: 'ECR721v1',
    description: 'Items conforming to the ERC721 v1 spec, using transferFrom.',
    thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
    website: 'http://erc721.org/',
    fields: [{ name: 'ID', type: 'uint256', description: 'Asset Token ID' }, { name: 'Address', type: 'address', description: 'Asset Contract Address' }],
    assetFromFields: function assetFromFields(fields) {
        return {
            id: fields.ID,
            address: fields.Address
        };
    },
    assetToFields: function assetToFields(asset) {
        return {
            ID: asset.id,
            Address: asset.address
        };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", {
                                title: 'ECR721v1 Asset: Token ID ' + asset.id + ' at ' + asset.address,
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
        transferFrom: function transferFrom(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'transferFrom',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: asset.address,
                inputs: [{ kind: types_1.FunctionInputKind.Owner, name: '_from', type: 'address' }, { kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' }, { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id }],
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
                target: asset.address,
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: function transfer(asset) {
            return [{
                type: Web3.AbiType.Event,
                name: 'Transfer',
                target: asset.address,
                anonymous: false,
                inputs: [{ kind: types_1.EventInputKind.Source, indexed: false, name: 'from', type: 'address' }, { kind: types_1.EventInputKind.Destination, indexed: false, name: 'to', type: 'address' }, { kind: types_1.EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256' }],
                assetFromInputs: function () {
                    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs) {
                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        return _context2.abrupt("return", { address: asset.address, id: asset.tokenId });

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
            }];
        }
    },
    hash: function hash(a) {
        return a;
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map