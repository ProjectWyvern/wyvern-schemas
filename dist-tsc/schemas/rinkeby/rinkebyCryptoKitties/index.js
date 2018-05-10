"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const types_1 = require("../../../types");
exports.rinkebyCryptoKittiesSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'RinkebyCryptoKitties',
    description: 'Rinkeby Testnet CryptoKitties',
    thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
    website: 'https://cryptokitties.co',
    fields: [
        { name: 'ID', type: 'uint256', description: 'CryptoKitty number.' },
    ],
    assetFromFields: (fields) => fields.ID,
    assetToFields: asset => ({ ID: asset }),
    formatter: async (asset) => {
        return {
            thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
            title: 'RinkebyCryptoKitty #' + asset,
            description: 'A Rinkeby kitten!',
            url: 'https://www.cryptokitties.co/kitty/' + asset,
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
            target: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
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
            target: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [{
                type: Web3.AbiType.Function,
                name: 'tokensOfOwnerByIndex',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
                inputs: [
                    { kind: types_1.FunctionInputKind.Owner, name: '_owner', type: 'address' },
                    { kind: types_1.FunctionInputKind.Index, name: '_index', type: 'uint' },
                ],
                outputs: [
                    { kind: types_1.FunctionOutputKind.Asset, name: 'tokenId', type: 'uint' },
                ],
                assetFromOutputs: (output) => {
                    if (output.toNumber() === 0) {
                        return null;
                    }
                    else {
                        return output.toString();
                    }
                },
            }],
    },
    events: {
        transfer: [{
                type: Web3.AbiType.Event,
                name: 'Transfer',
                target: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
                anonymous: false,
                inputs: [
                    { kind: types_1.EventInputKind.Source, indexed: true, name: 'from', type: 'address' },
                    { kind: types_1.EventInputKind.Destination, indexed: true, name: 'to', type: 'address' },
                    { kind: types_1.EventInputKind.Asset, indexed: true, name: 'tokenId', type: 'uint256' },
                ],
                assetFromInputs: async (inputs) => inputs.tokenId,
            }],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map