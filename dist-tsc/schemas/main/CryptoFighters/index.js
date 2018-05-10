"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.CryptoFightersSchema = {
    version: 2,
    deploymentBlock: 4952230,
    name: 'CryptoFighters',
    description: 'Collect, train, and fight: digital fighters on the blockchain.',
    thumbnail: 'https://s3.amazonaws.com/cryptofighters/images/455fde9f-9810-4e70-bda6-8bb5cf7a6fe7.png',
    website: 'https://cryptofighters.io/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'CryptoFighter number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: async (asset) => {
        const response = await axios_1.default.get(`https://api.cryptofighters.io/fighters/${asset}`);
        const data = response.data;
        if (data === null) {
            return {
                thumbnail: 'https://s3.amazonaws.com/cryptofighters/images/455fde9f-9810-4e70-bda6-8bb5cf7a6fe7.png',
                title: 'CryptoFighter #' + asset,
                description: '',
                url: 'https://cryptofighters.io/fighter/' + asset,
                properties: [],
            };
        }
        else {
            return {
                thumbnail: data.image,
                title: 'CryptoFighter #' + asset,
                description: 'Luck: ' + data.luck + ', genes: ' + data.attr.join(', '),
                url: 'https://cryptofighters.io/fighter/' + asset,
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
            target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
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
            target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
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
                target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: true, name: 'from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: true, name: 'to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: true, name: 'tokenId', type: 'uint256' },
                ],
                assetFromInputs: async (inputs) => inputs.tokenId,
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map