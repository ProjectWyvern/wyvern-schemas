"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const typed_promisify_1 = require("typed-promisify");
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.DecentralandSchema = {
    version: 1,
    deploymentBlock: 4944642,
    name: 'Decentraland',
    description: 'A virtual world that runs on open standards.',
    thumbnail: 'https://decentraland.org/images/logo-65f7b27caf.png',
    website: 'https://decentraland.org/',
    fields: [
        { name: 'X', type: 'int', description: 'Parcel x-coordinate' },
        { name: 'Y', type: 'int', description: 'Parcel y-coordinate' },
    ],
    assetFromFields: (fields) => ({ x: fields.X, y: fields.Y }),
    assetToFields: asset => ({ X: asset.x, Y: asset.y }),
    formatter: async (asset) => {
        const districtResponse = await axios_1.default.get(`https://api.land.decentraland.org/api/districts`);
        const districts = districtResponse.data.data;
        const assetResponse = await axios_1.default.get(`https://api.land.decentraland.org/api/parcels?nw=${asset.x},${asset.y}&se=${asset.x},${asset.y}`);
        const assetData = assetResponse.data.data[0];
        let district = 'None';
        if (assetData.district_id !== null) {
            district = districts.filter((d) => d.id === assetData.district_id)[0].name;
        }
        return {
            thumbnail: 'https://decentraland.org/images/logo-65f7b27caf.png',
            title: 'Decentraland Parcel at ' + asset.x + ',' + asset.y,
            description: 'District: ' + district,
            url: 'https://land.decentraland.org/' + asset.x + '/' + asset.y,
            properties: [],
        };
    },
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'transferLand',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: 'x', type: 'int256', value: asset.x },
                { kind: types_1.FunctionInputKind.Asset, name: 'y', type: 'int256', value: asset.y },
                { kind: types_1.FunctionInputKind.Replaceable, name: 'to', type: 'address' },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'ownerOfLand',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: 'x', type: 'int256', value: asset.x },
                { kind: types_1.FunctionInputKind.Asset, name: 'y', type: 'int256', value: asset.y },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: '', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [{
                type: Web3.AbiType.Event,
                name: 'Transfer',
                target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: true, name: 'from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: true, name: 'to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: true, name: 'assetId', type: 'uint256' },
                    { kind: types_1.EventInputKind.Other, indexed: false, name: 'operator', type: 'address' },
                    { kind: types_1.EventInputKind.Other, indexed: false, name: 'userData', type: 'bytes' },
                    { kind: types_1.EventInputKind.Other, indexed: false, name: 'operatorData', type: 'bytes' },
                ],
                assetFromInputs: async (inputs, web3) => {
                    const decodeABI = { 'constant': true, 'inputs': [{ 'name': 'value', 'type': 'uint256' }], 'name': 'decodeTokenId', 'outputs': [{ 'name': '', 'type': 'int256' }, { 'name': '', 'type': 'int256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                    const contract = web3.eth.contract([decodeABI]).at('0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d');
                    const res = await typed_promisify_1.promisify(contract.decodeTokenId.call)(inputs.assetId);
                    return {
                        x: res[0].toString(),
                        y: res[1].toString(),
                    };
                },
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map