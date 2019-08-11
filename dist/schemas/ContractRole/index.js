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
const types_1 = require("../../types");
exports.ContractRoleSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'ContractRole',
    description: 'Transferrable role on a smart contract.',
    thumbnail: 'https://i.redditmedia.com/NaFzmSbDX2T2RALMxy2tmGJN_gPVNH9lJggCKUDDqcc.jpg?w=320&s=3913239508209aaf6ba1188fe3d3b5fc',
    website: 'https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol',
    fields: [
        { name: 'Name', type: 'string', description: 'Contract Name' },
        { name: 'Description', type: 'string', description: 'Contract Description' },
        { name: 'Address', type: 'address', description: 'Contract Address' },
        { name: 'RoleGetter', type: 'string', description: 'Name of method to get value of role. Should take no arguments.' },
        { name: 'RoleSetter', type: 'string', description: 'Name of method to set value of role. Should take one argument, an address.' },
    ],
    assetFromFields: (fields) => ({
        name: fields.Name,
        address: fields.Address,
        description: fields.Description,
        roleGetter: fields.RoleGetter,
        roleSetter: fields.RoleSetter,
    }),
    formatter: (asset) => __awaiter(this, void 0, void 0, function* () {
        return {
            thumbnail: 'https://i.redditmedia.com/NaFzmSbDX2T2RALMxy2tmGJN_gPVNH9lJggCKUDDqcc.jpg?w=320&s=3913239508209aaf6ba1188fe3d3b5fc',
            title: `Smart Contract Role: ${asset.roleGetter} for ${asset.name}`,
            description: asset.description || (`${asset.roleGetter} for smart contract at ${asset.address}`),
            url: 'https://etherscan.io/address/' + asset.address,
            properties: [],
        };
    }),
    functions: {
        transfer: asset => ({
            type: Web3.AbiType.Function,
            name: asset.roleSetter,
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Replaceable, name: 'newOwner', type: 'address' },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: Web3.AbiType.Function,
            name: asset.roleGetter,
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: asset.address,
            inputs: [],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [],
    },
    hash: a => a.address,
};
//# sourceMappingURL=index.js.map