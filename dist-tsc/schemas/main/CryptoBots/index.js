"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.CryptoBotsSchema = {
    version: 1,
    deploymentBlock: 4819345,
    name: 'CryptoBots',
    description: 'A blockchain-based game to find out whose bot army is the best!',
    thumbnail: 'https://cryptobots.me/static/media/banner.38d05abc.svg',
    website: 'https://cryptobots.me/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'CryptoBot number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: async (asset) => {
        const response = await axios_1.default.post(`https://cryptobots.me/api/bot/search`, { ids: [asset] }).catch(err => {
            if (err.response && (err.response.status === 404 || err.response.status === 400)) {
                return null;
            }
            else {
                throw err;
            }
        });
        if (response === null || !response.data.items[0]) {
            return {
                thumbnail: 'https://cryptobots.me/static/media/banner.38d05abc.svg',
                title: 'CryptoBot #' + asset,
                description: '',
                url: 'https://cryptobots.me/bot/' + asset,
                properties: [],
            };
        }
        else {
            const data = response.data.items[0];
            return {
                thumbnail: 'https://cryptobots.me/img/' + data.info.genes,
                title: 'CryptoBot #' + asset,
                description: 'Generation: ' + data.info.generation,
                url: 'https://cryptobots.me/bot/' + asset,
                properties: [],
            };
        }
    },
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'transfer',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0xf7a6e15dfd5cdd9ef12711bd757a9b6021abf643',
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
            target: '0xf7a6e15dfd5cdd9ef12711bd757a9b6021abf643',
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
                target: '0xf7a6e15dfd5cdd9ef12711bd757a9b6021abf643',
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