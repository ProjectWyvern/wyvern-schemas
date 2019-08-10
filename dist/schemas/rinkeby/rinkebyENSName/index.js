"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var ens_1 = require("../../../common/ens");
var types_1 = require("../../../types");
exports.rinkebyENSNameSchema = (0, _assign2.default)({}, ens_1.ENSNameBaseSchema, { version: 1, deploymentBlock: 0, name: 'ENSName', description: 'Rinkeby Ethereum Name Service (EIP 137)', thumbnail: 'https://ens.domains/img/ens.svg', website: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md', formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", {
                                thumbnail: 'https://ens.domains/img/ens.svg',
                                title: 'ENS Name ' + asset.name,
                                description: '(ENS node ' + asset.nodeHash + ')',
                                url: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md',
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
    }(), functions: {
        transfer: function transfer(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'setOwner',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: 'node', type: 'bytes32', value: asset.nodeHash }, { kind: types_1.FunctionInputKind.Replaceable, name: 'owner', type: 'address' }],
                outputs: []
            };
        },
        ownerOf: function ownerOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'owner',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: 'node', type: 'bytes32', value: asset.nodeHash }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: '', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    }, events: {
        transfer: [{
            type: Web3.AbiType.Event,
            name: 'Transfer',
            target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
            anonymous: false,
            inputs: [{ kind: types_1.EventInputKind.Asset, indexed: true, name: 'node', type: 'bytes32' }, { kind: types_1.EventInputKind.Destination, indexed: false, name: 'owner', type: 'address' }],
            assetFromInputs: function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", { nodeHash: inputs.node });

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
    } });
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map