"use strict";

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var types_1 = require("../../../types");
var ERC1155_1 = require("../../ERC1155");
exports.EnjinItemSchema = (0, _assign2.default)({}, ERC1155_1.ERC1155Schema, { version: 1, deploymentBlock: 0, name: 'Enjin', description: 'Items conforming to the Enjin implementation of the ERC1155 spec.', website: 'https://enjincoin.io/', functions: (0, _assign2.default)({}, ERC1155_1.ERC1155Schema.functions, { ownerOf: function ownerOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'ownerOf',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: asset.address,
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_id', type: 'uint256', value: asset.id }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' }]
            };
        },
        // Parameters are flipped from 1155
        countOf: function countOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'balanceOf',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: asset.address,
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_id', type: 'uint256', value: asset.id }, { kind: types_1.FunctionInputKind.Owner, name: '_owner', type: 'address' }],
                outputs: [{ kind: types_1.FunctionOutputKind.Count, name: 'balance', type: 'uint' }],
                assetFromOutputs: function assetFromOutputs(outputs) {
                    return outputs.balance;
                }
            };
        }, assetsOfOwnerByIndex: [] }) });
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map