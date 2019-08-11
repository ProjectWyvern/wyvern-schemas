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
exports.CryptoMasterpiecesSchema = {
    version: 1,
    deploymentBlock: 5096088,
    name: 'CryptoMasterpieces',
    description: 'Own a Digital Masterpiece on the Blockchain',
    thumbnail: 'https://www.cryptomasterpieces.com/static/img/top-section.jpg',
    website: 'https://www.cryptomasterpieces.com/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'CryptoMasterpiece number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: (asset, web3) => __awaiter(this, void 0, void 0, function* () {
        const abi = { 'constant': true, 'inputs': [{ 'name': '_tokenId', 'type': 'uint256' }], 'name': 'getMasterpiece', 'outputs': [{ 'name': 'name', 'type': 'string' }, { 'name': 'artist', 'type': 'string' }, { 'name': 'birthTime', 'type': 'uint256' }, { 'name': 'snatchWindow', 'type': 'uint256' }, { 'name': 'sellingPrice', 'type': 'uint256' }, { 'name': 'owner', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
        const contract = web3.eth.contract([abi]).at('0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd');
        const data = yield typed_promisify_1.promisify(contract[abi.name].call)(asset);
        const name = data[0];
        const artist = data[1];
        return {
            thumbnail: 'https://s3.amazonaws.com/cryptomasterpieces/masterpiece-images/' + asset + '.jpg',
            title: 'CryptoMasterpiece #' + asset + ' - ' + name,
            description: name + ' by ' + artist,
            url: 'https://cryptomasterpieces.com/masterpiece/' + asset,
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
            target: '0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd',
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
            target: '0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd',
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
                name: 'TransferToken',
                target: '0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd',
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