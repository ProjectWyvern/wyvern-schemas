"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.CryptoMemesSchema = {
    version: 2,
    deploymentBlock: 5121073,
    name: 'CryptoMemes',
    description: 'Buy memes on the blockchain.',
    thumbnail: 'https://pbs.twimg.com/profile_images/966538539667042304/H57YxbG-_400x400.jpg',
    website: 'https://cryptomemes.lol/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'CryptoMeme number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: async (asset) => {
        const response = await axios_1.default.get(`https://cryptomemes.lol/api/meme/${asset}`);
        const data = response.data[0];
        return {
            thumbnail: data.image_url,
            title: 'CryptoMeme #' + asset + ' - ' + data.name,
            description: data.description,
            url: 'https://cryptomemes.lol/meme/' + asset,
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
            target: '0x0d623823d2aa4540f335bb926447dc582dc5bd64',
            inputs: [
                { kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'ownerOf',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: '0x0d623823d2aa4540f335bb926447dc582dc5bd64',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [{
                type: Web3.AbiType.Event,
                name: 'Transfer',
                target: '0x0d623823d2aa4540f335bb926447dc582dc5bd64',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: false, name: 'from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: false, name: 'to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256' },
                ],
                assetFromInputs: async (inputs) => inputs.tokenId,
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map