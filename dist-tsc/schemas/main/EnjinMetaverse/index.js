"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.EnjinMetaverseSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'EnjinMetaverse',
    description: 'Items conforming to the Enjin Metaverse contract ABI, using transfer.',
    thumbnail: 'https://opensea.io/static/images/opensea-icon.png',
    website: 'https://github.com/ethereum/eips/issues/1155',
    fields: [
        { name: 'ID', type: 'uint256', description: 'Asset ID' },
        { name: 'Address', type: 'address', description: 'Enjin Contract Address' },
    ],
    assetFromFields: (fields) => ({
        id: fields.ID,
        address: fields.Address,
    }),
    assetToFields: asset => ({
        ID: asset.id,
        Address: asset.address,
    }),
    formatter: async (asset) => {
        return {
            title: 'EnjinMetaverse Asset: Token ID ' + asset.id + ' at ' + asset.address,
            description: '',
            url: '',
            thumbnail: '',
            properties: [],
        };
    },
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'transfer',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: '_id', type: 'uint256', value: asset.id },
                { kind: types_1.FunctionInputKind.Count, name: '_value', type: 'uint256', value: 1 },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'ownerOf',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [],
    },
    hash: asset => asset.address + '-' + asset.id,
};
//# sourceMappingURL=index.js.map