"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPunksSchema = void 0;
const ethereum_types_1 = require("ethereum-types");
const types_1 = require("../../../types");
exports.CryptoPunksSchema = {
    version: 1,
    deploymentBlock: 3914495,
    name: 'CryptoPunks',
    description: '10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.',
    thumbnail: 'https://www.larvalabs.com/cryptopunks/cryptopunk2838.png',
    website: 'https://www.larvalabs.com/cryptopunks',
    fields: [
        { name: 'ID', type: 'uint256', description: 'CryptoPunk number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: (asset) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            thumbnail: 'https://www.larvalabs.com/cryptopunks/cryptopunk' + asset + '.png',
            title: 'CryptoPunk #' + asset,
            description: '',
            url: 'https://www.larvalabs.com/cryptopunks/details/' + asset,
            properties: [],
        };
    }),
    functions: {
        transfer: asset => ({
            type: ethereum_types_1.AbiType.Function,
            name: 'transferPunk',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            inputs: [
                { kind: types_1.FunctionInputKind.Replaceable, name: 'to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: 'punkIndex', type: 'uint256', value: asset },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: ethereum_types_1.AbiType.Function,
            name: 'punkIndexToAddress',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '', type: 'uint256', value: asset },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: '', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [{
                type: ethereum_types_1.AbiType.Event,
                name: 'PunkTransfer',
                target: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: true, name: 'from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: true, name: 'to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: false, name: 'punkIndex', type: 'uint256' },
                ],
                assetFromInputs: (inputs) => __awaiter(void 0, void 0, void 0, function* () { return inputs.punkIndex; }),
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map