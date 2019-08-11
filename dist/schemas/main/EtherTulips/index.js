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
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.EtherTulipsSchema = {
    version: 1,
    deploymentBlock: 4950098,
    name: 'EtherTulips',
    description: 'Tulip mania. Now with fights. On the blockchain.',
    thumbnail: 'https://s3.amazonaws.com/ethertulips-assets/tulipexamples.png',
    website: 'https://ethertulips.com/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'EtherTulip number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: (asset) => __awaiter(this, void 0, void 0, function* () {
        // const response = await axios.get(``);
        const response = null;
        if (response === null) {
            return {
                thumbnail: 'https://s3.amazonaws.com/ethertulips-assets/tulipexamples.png',
                title: 'EtherTulip #' + asset,
                description: '',
                url: 'https://ethertulips.com/my_tulips',
                properties: [],
            };
        }
        else {
            return {
                thumbnail: 'https://s3.amazonaws.com/ethertulips-assets/tulipexamples.png',
                title: 'EtherTulip #' + asset,
                description: '',
                url: 'https://ethertulips.com/my_tulips',
                properties: [],
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
            target: '0x995020804986274763df9deb0296b754f2659ca1',
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
            target: '0x995020804986274763df9deb0296b754f2659ca1',
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
                target: '0x995020804986274763df9deb0296b754f2659ca1',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: true, name: 'from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: true, name: 'to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: true, name: 'tokenId', type: 'uint256' },
                ],
                assetFromInputs: (inputs) => __awaiter(this, void 0, void 0, function* () { return inputs.tokenId; }),
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map