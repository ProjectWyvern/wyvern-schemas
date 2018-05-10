"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const types_1 = require("../../../types");
const AddressMap = require("./addressMap.json");
const ItemDB = require("./ethercraft.json");
const Images = require("./images.json");
ItemDB.map((x) => {
    x.address = x.address.toLowerCase();
    const addr = AddressMap[x.address];
    if (addr) {
        x.address = addr;
    }
});
const dataOf = (asset) => ItemDB.filter((x) => x.address.toLowerCase() === asset.toLowerCase())[0];
const nameOf = (asset) => dataOf(asset).strings[0].name;
const indexOf = (asset) => ItemDB.map((v, i) => i).filter((i) => ItemDB[i].address.toLowerCase() === asset.toLowerCase())[0];
const imageOf = (asset) => {
    const index = indexOf(asset);
    return Images[index];
};
const descriptionOf = (asset) => {
    const data = dataOf(asset);
    return data.strings[0].description;
};
const unit = '1000000000000000000'; // 10e18
const kinds = ItemDB.map((x) => x.strings[0].name);
const addressByKind = (name) => ItemDB.filter((x) => x.strings[0].name === name)[0].address;
exports.EthercraftSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'Ethercraft',
    description: 'A decentralized RPG running on the Ethereum blockchain.',
    thumbnail: 'https://cdn.discordapp.com/icons/400700363402903552/4f9c2076b2b8a9c0b8a57ce3ecdc57fe.png',
    website: 'https://ethercraft.io',
    fields: [
        { name: 'Kind', type: 'enum', values: kinds, description: 'Kind of item.' },
    ],
    assetFromFields: (fields) => addressByKind(fields.Kind),
    assetToFields: asset => ({ Kind: nameOf(asset) }),
    allAssets: () => ItemDB.map((x) => x.address),
    formatter: async (asset) => {
        return {
            thumbnail: imageOf(asset),
            title: 'Ethercraft - ' + nameOf(asset),
            description: descriptionOf(asset),
            url: 'https://ethercraft.io/#/shop/' + indexOf(asset),
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
            target: asset,
            inputs: [
                { kind: types_1.FunctionInputKind.Replaceable, name: 'to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: 'tokens', type: 'uint256', value: unit },
            ],
            outputs: [],
        }),
        countOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'balanceOf',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: asset,
            inputs: [
                { kind: types_1.FunctionInputKind.Owner, name: 'tokenOwner', type: 'address' },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Count, name: 'balance', type: 'uint' },
            ],
            assetFromOutputs: (outputs) => outputs.balance,
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [],
    },
    hash: a => a,
};
//# sourceMappingURL=index.js.map