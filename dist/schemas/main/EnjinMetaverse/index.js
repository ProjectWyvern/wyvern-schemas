"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var types_1 = require("../../../types");
exports.EnjinMetaverseSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'EnjinMetaverse',
    description: 'Items conforming to the Enjin Metaverse contract ABI, using transfer.',
    thumbnail: 'https://opensea.io/static/images/opensea-icon.png',
    website: 'https://github.com/ethereum/eips/issues/1155',
    fields: [{ name: 'ID', type: 'uint256', description: 'Asset ID' }, { name: 'Address', type: 'address', description: 'Enjin Contract Address' }],
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
                                title: 'EnjinMetaverse Asset: Token ID ' + asset.id + ' at ' + asset.address,
                                description: '',
                                url: '',
                                thumbnail: '',
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
                name: 'transfer',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: asset.address,
                inputs: [{ kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' }, { kind: types_1.FunctionInputKind.Asset, name: '_id', type: 'uint256', value: asset.id }, { kind: types_1.FunctionInputKind.Count, name: '_value', type: 'uint256', value: 1 }],
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
        transfer: []
    },
    hash: function hash(asset) {
        return asset.address + '-' + asset.id;
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map