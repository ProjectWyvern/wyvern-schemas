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
exports.testRinkebyNFTSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'TestRinkebyNFT',
    description: 'Rinkeby ERC721 non-fungible token for Wyvern Exchange testing',
    thumbnail: 'https://cointelegraph.com/storage/uploads/view/f88e17e41f607dc0aef238230dd40cc6.png',
    website: 'https://projectwyvern.com',
    fields: [
        { name: 'ID', type: 'uint256', description: 'Token identification number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: (asset) => __awaiter(this, void 0, void 0, function* () {
        return {
            thumbnail: 'https://cointelegraph.com/storage/uploads/view/f88e17e41f607dc0aef238230dd40cc6.png',
            title: 'TestRinkebyNFT #' + asset,
            description: 'A useless NFT!',
            url: 'https://www.projectwyvern.com',
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
            target: '0x07a6dc6e3f1120ca03658d473d10aee3af5f8abb',
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
            target: '0x07a6dc6e3f1120ca03658d473d10aee3af5f8abb',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: '_owner', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [{
                type: Web3.AbiType.Event,
                name: 'Transfer',
                target: '0x07a6dc6e3f1120ca03658d473d10aee3af5f8abb',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: true, name: '_from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: true, name: '_to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: false, name: '_tokenId', type: 'uint256' },
                ],
                assetFromInputs: (inputs) => __awaiter(this, void 0, void 0, function* () { return inputs._tokenId.toString(); }),
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map