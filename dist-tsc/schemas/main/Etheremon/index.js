"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typed_promisify_1 = require("typed-promisify");
const Web3 = require("web3");
const types_1 = require("../../../types");
const Names = require("./names.json");
const Thumbnails = require("./thumbnails.json");
exports.EtheremonSchema = {
    version: 2,
    deploymentBlock: 4946456,
    name: 'Etheremon',
    description: 'Decentralized World of Ether Monsters',
    thumbnail: 'https://cdn-images-1.medium.com/max/720/1*SvU1GenU55qO0eNNiTWGtA.png',
    website: 'https://www.etheremon.com/',
    fields: [
        { name: 'ID', type: 'uint64', description: 'Etheremon ID.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: async (asset, web3) => {
        const getMonsterObjABI = { "constant": true, "inputs": [{ "name": "_objId", "type": "uint64" }], "name": "getMonsterObj", "outputs": [{ "name": "objId", "type": "uint64" }, { "name": "classId", "type": "uint32" }, { "name": "trainer", "type": "address" }, { "name": "exp", "type": "uint32" }, { "name": "createIndex", "type": "uint32" }, { "name": "lastClaimIndex", "type": "uint32" }, { "name": "createTime", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" };
        const getMonsterNameABI = { "constant": true, "inputs": [{ "name": "_objId", "type": "uint64" }], "name": "getMonsterName", "outputs": [{ "name": "name", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" };
        const dataContract = web3.eth.contract([getMonsterObjABI, getMonsterNameABI]).at('0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e');
        const res = await typed_promisify_1.promisify(dataContract.getMonsterObj.call)(asset);
        const objId = res[0];
        const classId = res[1];
        const trainer = res[2];
        const exp = res[3];
        const createIndex = res[4];
        const lastClaimIndex = res[5];
        const createTime = res[6];
        const className = Names[classId];
        const name = await typed_promisify_1.promisify(dataContract.getMonsterName.call)(asset);
        return {
            thumbnail: 'https://www.etheremon.com/' + Thumbnails[classId] + '.png',
            title: 'Etheremon #' + asset + ' - ' + className,
            description: 'Catch number: ' + createIndex + ', experience: ' + exp + ', nickname: ' + name,
            url: 'https://www.etheremon.com/#/mons/' + classId,
            properties: [],
        };
    },
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'freeTransferItem',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_objId', type: 'uint64', value: asset },
                { kind: types_1.FunctionInputKind.Replaceable, name: '_receiver', type: 'address' },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'getMonsterObj',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: '0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_objId', type: 'uint64', value: asset },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Other, name: 'objId', type: 'uint64' },
                { kind: types_1.FunctionOutputKind.Other, name: 'classId', type: 'uint32' },
                { kind: types_1.FunctionOutputKind.Owner, name: 'trainer', type: 'address' },
                { kind: types_1.FunctionOutputKind.Other, name: 'exp', type: 'uint32' },
                { kind: types_1.FunctionOutputKind.Other, name: 'createIndex', type: 'uint32' },
                { kind: types_1.FunctionOutputKind.Other, name: 'lastClaimIndex', type: 'uint32' },
                { kind: types_1.FunctionOutputKind.Other, name: 'createTime', type: 'uint' },
            ],
        }),
        assetsOfOwnerByIndex: [{
                type: Web3.AbiType.Function,
                name: 'getMonsterObjId',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: '0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e',
                inputs: [
                    { kind: types_1.FunctionInputKind.Owner, name: '_trainer', type: 'address' },
                    { kind: types_1.FunctionInputKind.Index, name: 'index', type: 'uint256' },
                ],
                outputs: [
                    { kind: types_1.FunctionOutputKind.Asset, name: '', type: 'uint64' },
                ],
                assetFromOutputs: (output) => {
                    const str = output.toString();
                    if (str === '0') {
                        return null;
                    }
                    else {
                        return str;
                    }
                },
            }],
    },
    events: {
        transfer: [{
                type: Web3.AbiType.Event,
                name: 'EventFreeTransferItem',
                target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: true, name: 'sender', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: true, name: 'receiver', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: false, name: 'objId', type: 'uint64' },
                ],
                assetFromInputs: async (inputs) => inputs.objId,
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map