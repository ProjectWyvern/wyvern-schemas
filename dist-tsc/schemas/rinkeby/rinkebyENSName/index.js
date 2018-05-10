"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereumjs_util_1 = require("ethereumjs-util");
const Web3 = require("web3");
const types_1 = require("../../../types");
const namehash = (name) => {
    let node = '0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        const labels = name.split('.');
        for (let i = labels.length - 1; i >= 0; i--) {
            const labelHash = ethereumjs_util_1.sha3(labels[i]).toString('hex');
            node = ethereumjs_util_1.sha3(new Buffer(node + labelHash, 'hex')).toString('hex');
        }
    }
    return '0x' + node.toString();
};
const nodehash = (name) => {
    const label = name.split('.')[0];
    if (label) {
        return '0x' + ethereumjs_util_1.sha3(label).toString('hex');
    }
    else {
        return '';
    }
};
exports.rinkebyENSNameSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'RinkebyENSName',
    description: 'Rinkeby Ethereum Name Service (EIP 137)',
    thumbnail: 'https://ens.domains/img/ens.svg',
    website: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md',
    fields: [
        { name: 'Name', type: 'string', description: 'ENS Name' },
        { name: 'NodeHash', type: 'bytes32', description: 'ENS Node Hash', readOnly: true },
        { name: 'NameHash', type: 'bytes32', description: 'ENS Name Hash', readOnly: true },
    ],
    unifyFields: (fields) => ({
        Name: fields.Name,
        NodeHash: nodehash(fields.Name),
        NameHash: namehash(fields.Name),
    }),
    assetFromFields: (fields) => ({
        name: fields.Name,
        nodeHash: fields.NodeHash,
        nameHash: fields.NameHash,
    }),
    checkAsset: (asset) => {
        return asset.name ? (namehash(asset.name) === asset.nameHash && nodehash(asset.name) === asset.nodeHash) : true;
    },
    formatter: async (asset) => {
        return {
            thumbnail: 'https://ens.domains/img/ens.svg',
            title: 'ENS Name ' + asset.name,
            description: '(ENS node ' + asset.nodeHash + ')',
            url: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md',
            properties: [],
        };
    },
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'setOwner',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: 'node', type: 'bytes32', value: asset.nodeHash },
                { kind: types_1.FunctionInputKind.Replaceable, name: 'owner', type: 'address' },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'owner',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: 'node', type: 'bytes32', value: asset.nodeHash },
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
                target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Asset, indexed: true, name: 'node', type: 'bytes32' },
                    { kind: types_1.EventInputKind.Destination, indexed: false, name: 'owner', type: 'address' },
                ],
                assetFromInputs: async (inputs) => ({ nodeHash: inputs.node }),
            }],
    },
    hash: a => a.nodeHash,
};
//# sourceMappingURL=index.js.map