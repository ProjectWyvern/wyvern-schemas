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
exports.MythereumSchema = {
    version: 2,
    deploymentBlock: 5033489,
    name: 'Mythereum',
    description: 'Fantastically Distributed Collectible Card Game',
    thumbnail: 'https://www.mythereum.io/three-cards.png',
    website: 'https://www.mythereum.io/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'Mythereum card number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: (asset, web3) => __awaiter(this, void 0, void 0, function* () {
        const cardsABI = { 'constant': true, 'inputs': [{ 'name': '', 'type': 'uint256' }], 'name': 'cards', 'outputs': [{ 'name': 'name', 'type': 'string' }, { 'name': 'class', 'type': 'uint8' }, { 'name': 'classVariant', 'type': 'uint8' }, { 'name': 'damagePoints', 'type': 'uint8' }, { 'name': 'shieldPoints', 'type': 'uint8' }, { 'name': 'abilityId', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
        const abilitiesABI = { 'constant': true, 'inputs': [{ 'name': '', 'type': 'uint256' }], 'name': 'abilities', 'outputs': [{ 'name': 'name', 'type': 'string' }, { 'name': 'canBeBlocked', 'type': 'bool' }, { 'name': 'blackMagicCost', 'type': 'uint8' }, { 'name': 'grayMagicCost', 'type': 'uint8' }, { 'name': 'whiteMagicCost', 'type': 'uint8' }, { 'name': 'addedDamage', 'type': 'uint256' }, { 'name': 'addedShield', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
        const contract = web3.eth.contract([cardsABI, abilitiesABI]).at('0xa67aac23549f4c672256b59b43ab0bacfcfcd498');
        const res = yield typed_promisify_1.promisify(contract.cards.call)(asset);
        const name = res[0];
        const classId = res[1];
        const classVariant = res[2];
        const damagePoints = res[3];
        const shieldPoints = res[4];
        const abilityId = res[5];
        const ares = yield typed_promisify_1.promisify(contract.abilities.call)(abilityId);
        const abilityName = ares[0];
        return {
            thumbnail: 'https://www.mythereum.io/' + classId + '_' + classVariant + '.png',
            title: 'Mythereum #' + asset + ' - ' + name,
            description: 'Ability ' + abilityName + ' / Damage ' + damagePoints + ' / Shield ' + shieldPoints,
            url: 'https://www.mythereum.io/',
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
            target: '0xa67aac23549f4c672256b59b43ab0bacfcfcd498',
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
            target: '0xa67aac23549f4c672256b59b43ab0bacfcfcd498',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset },
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
                target: '0xa67aac23549f4c672256b59b43ab0bacfcfcd498',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: true, name: '_from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: true, name: '_to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: false, name: '_tokenId', type: 'uint256' },
                ],
                assetFromInputs: (inputs) => __awaiter(this, void 0, void 0, function* () { return inputs._tokenId; }),
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map