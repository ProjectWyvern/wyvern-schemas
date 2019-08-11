"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const types_1 = require("../../../types");
const ERC1155_1 = require("../../ERC1155");
exports.EnjinItemSchema = Object.assign({}, ERC1155_1.ERC1155Schema, { version: 1, deploymentBlock: 0, name: 'Enjin', description: 'Items conforming to the Enjin implementation of the ERC1155 spec.', website: 'https://enjincoin.io/', functions: Object.assign({}, ERC1155_1.ERC1155Schema.functions, { ownerOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'ownerOf',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_id', type: 'uint256', value: asset.id },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' },
            ],
        }), 
        // Parameters are flipped from 1155
        countOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'balanceOf',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_id', type: 'uint256', value: asset.id },
                { kind: types_1.FunctionInputKind.Owner, name: '_owner', type: 'address' },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Count, name: 'balance', type: 'uint' },
            ],
            assetFromOutputs: (outputs) => outputs.balance,
        }), assetsOfOwnerByIndex: [] }) });
//# sourceMappingURL=index.js.map