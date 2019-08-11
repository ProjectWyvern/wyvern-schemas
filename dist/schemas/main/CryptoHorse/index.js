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
const typed_promisify_1 = require("typed-promisify");
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.CryptoHorseSchema = {
    version: 2,
    deploymentBlock: 4979255,
    name: 'CryptoHorse',
    description: 'Collectible and breedable blockchain horses',
    thumbnail: 'https://www.cryptohorse.ch/logo.svg',
    website: 'https://www.cryptohorse.ch/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'CryptoHorse number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: (asset, web3) => __awaiter(this, void 0, void 0, function* () {
        const abi = { 'constant': true, 'inputs': [{ 'name': '_id', 'type': 'uint256' }], 'name': 'getHorse', 'outputs': [{ 'name': 'price', 'type': 'uint256' }, { 'name': 'id', 'type': 'uint256' }, { 'name': 'forSale', 'type': 'bool' }, { 'name': 'isGestating', 'type': 'bool' }, { 'name': 'isReady', 'type': 'bool' }, { 'name': 'unproductiveIndex', 'type': 'uint256' }, { 'name': 'nextActionAt', 'type': 'uint256' }, { 'name': 'stallionWithId', 'type': 'uint256' }, { 'name': 'birthTime', 'type': 'uint256' }, { 'name': 'mareId', 'type': 'uint256' }, { 'name': 'stallionId', 'type': 'uint256' }, { 'name': 'generation', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
        const contract = web3.eth.contract([abi]).at('0xB88924408A95917c75DE67fc9FbdC4Af992979c3');
        const data = yield typed_promisify_1.promisify(contract[abi.name].call)(asset);
        const generation = data[11];
        return {
            thumbnail: 'https://www.cryptohorse.ch/logo.svg',
            title: 'CryptoHorse #' + asset,
            description: 'Generation: ' + generation,
            url: 'https://www.cryptohorse.ch/',
            properties: [],
        };
    }),
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'transfer',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
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
            target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' },
                { kind: types_1.FunctionOutputKind.Other, name: 'tokenId', type: 'uint256' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [{
                type: Web3.AbiType.Event,
                name: 'Transfer',
                target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
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