"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.ECR721v1Schema = {
    version: 1,
    deploymentBlock: 0,
    name: 'ECR721v1',
    description: 'Items conforming to the ERC721 v1 spec, using transferFrom.',
    thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
    website: 'http://erc721.org/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'Asset Token ID' },
        { name: 'Address', type: 'address', description: 'Asset Contract Address' },
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
            title: 'ECR721v1 Asset: Token ID ' + asset.id + ' at ' + asset.address,
            properties: [],
        };
    },
    functions: {
        transferFrom: asset => ({
            type: Web3.AbiType.Function,
            name: 'transferFrom',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Owner, name: '_from', type: 'address' },
                { kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id },
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
        transfer: asset => ([{
                type: Web3.AbiType.Event,
                name: 'Transfer',
                target: asset.address,
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: false, name: 'from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: false, name: 'to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256' },
                ],
                assetFromInputs: async (inputs) => ({ address: asset.address, id: asset.tokenId }),
            }]),
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map