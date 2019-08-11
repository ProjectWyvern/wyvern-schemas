"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.CryptoKittiesSchema = {
    version: 1,
    deploymentBlock: 4605167,
    name: 'CryptoKitties',
    description: 'The virtual kitties that started the craze.',
    thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
    website: 'https://cryptokitties.co',
    fields: [
        { name: 'ID', type: 'uint256', description: 'CryptoKitty number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: (asset) => __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://api.cryptokitties.co/kitties/${asset}`).catch(err => {
            if (err.response && (err.response.status === 404 || err.response.status === 400)) {
                return null;
            }
            else {
                throw err;
            }
        });
        if (response === null) {
            return {
                thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
                title: 'CryptoKitty #' + asset,
                description: '',
                url: 'https://www.cryptokitties.co/kitty/' + asset,
                properties: [],
            };
        }
        else {
            const data = response.data;
            const attrs = data.enhanced_cattributes || data.cattributes || [];
            return {
                thumbnail: data.image_url_cdn,
                title: 'CryptoKitty #' + asset,
                description: data.bio,
                url: 'https://www.cryptokitties.co/kitty/' + asset,
                properties: attrs.map((c) => ({
                    key: c.type,
                    kind: 'string',
                    value: c.description,
                })),
            };
        }
    }),
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'transfer',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
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
            target: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
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
                target: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: false, name: 'from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: false, name: 'to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256' },
                ],
                assetFromInputs: (inputs) => __awaiter(this, void 0, void 0, function* () { return inputs.tokenId; }),
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map