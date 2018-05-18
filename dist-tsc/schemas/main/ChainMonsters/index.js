"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typed_promisify_1 = require("typed-promisify");
const Web3 = require("web3");
const types_1 = require("../../../types");
const MonsterData = require("./monsterdata.json");
const Types = require("./types.json");
exports.ChainMonstersSchema = {
    version: 2,
    deploymentBlock: 5106855,
    name: 'ChainMonsters',
    description: '100% blockchain based monster collectible game',
    thumbnail: 'https://cdn-images-1.medium.com/fit/c/90/90/1*xthSZXBLKxsSGkLz1FWyFg.png',
    website: 'https://chainmonsters.io/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'ChainMonster number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: async (asset, web3) => {
        const abi = { 'constant': true, 'inputs': [{ 'name': '_id', 'type': 'uint256' }], 'name': 'getMonster', 'outputs': [{ 'name': 'birthTime', 'type': 'uint256' }, { 'name': 'generation', 'type': 'uint256' }, { 'name': 'stats', 'type': 'uint8[8]' }, { 'name': 'mID', 'type': 'uint256' }, { 'name': 'tradeable', 'type': 'bool' }, { 'name': 'uID', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
        const contract = web3.eth.contract([abi]).at('0xf7f6c2836293a661be2690fbacae97f3f027e9c4');
        const data = await typed_promisify_1.promisify(contract[abi.name].call)(asset);
        const generation = data[1];
        const stats = data[2];
        const mID = data[3];
        const monster = MonsterData[mID.toString()];
        const type = Types[stats[6].toString()];
        return {
            thumbnail: 'https://chainmonsters.io/assets/monsters/' + mID + '.png',
            title: 'ChainMonster #' + asset + ' - ' + monster.name,
            description: 'Type: ' + type.name + ', HP ' + stats[0] + ', Attack ' + stats[1] + ', Defense ' + stats[2] + ', Special Attack ' + stats[3] + ', Special Defense ' + stats[4] + ', Speed ' + stats[5],
            url: 'https://chainmonsters.io/monster/' + asset,
            properties: [],
        };
    },
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'transfer',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0xf7f6c2836293a661be2690fbacae97f3f027e9c4',
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
            target: '0xf7f6c2836293a661be2690fbacae97f3f027e9c4',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_deedId', type: 'uint256', value: asset },
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
                target: '0xf7f6c2836293a661be2690fbacae97f3f027e9c4',
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