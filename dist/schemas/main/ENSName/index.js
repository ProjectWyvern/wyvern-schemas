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
const ens_1 = require("../../../common/ens");
const types_1 = require("../../../types");
exports.ENSNameSchema = Object.assign({}, ens_1.ENSNameBaseSchema, { version: 2, deploymentBlock: 3605331, name: 'ENSName', description: 'Ethereum Name Service Name (EIP 137)', thumbnail: 'https://ens.domains/img/ens.svg', website: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md', formatter: (asset) => __awaiter(this, void 0, void 0, function* () {
        return {
            thumbnail: 'https://ens.domains/img/ens.svg',
            title: 'ENS Name ' +
                (asset.name ? asset.name : asset.nodeHash.slice(0, 4) + '...'),
            description: 'ENS node ' + asset.nodeHash,
            url: 'https://etherscan.io/enslookup?q=' + asset.name,
            properties: [],
        };
    }), functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: 'transfer',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: '0x6090a6e47849629b7245dfa1ca21d94cd15878ef',
            inputs: [
                {
                    kind: types_1.FunctionInputKind.Asset,
                    name: '_hash',
                    type: 'bytes32',
                    value: asset.nodeHash,
                },
                {
                    kind: types_1.FunctionInputKind.Replaceable,
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: Web3.AbiType.Function,
            name: 'owner',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: '0x314159265dD8dbb310642f98f50C066173C1259b',
            inputs: [
                {
                    kind: types_1.FunctionInputKind.Asset,
                    name: 'node',
                    type: 'bytes32',
                    value: asset.nameHash,
                },
            ],
            outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: '', type: 'address' }],
        }),
        assetsOfOwnerByIndex: [],
    }, events: {
        transfer: [],
    } });
//# sourceMappingURL=index.js.map