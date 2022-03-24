"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721v3Schema = exports.ERC721Schema = void 0;
const ethereum_types_1 = require("ethereum-types");
const types_1 = require("../../types");
exports.ERC721Schema = {
    version: 2,
    deploymentBlock: 0,
    name: 'ERC721',
    description: 'Items conforming to the ERC721 spec, using transferFrom.',
    thumbnail: 'https://opensea.io/static/images/opensea-icon.png',
    website: 'http://erc721.org/',
    fields: [
        { name: 'ID', type: 'uint256', description: 'Asset Token ID' },
        { name: 'Address', type: 'address', description: 'Asset Contract Address' },
    ],
    assetFromFields: (fields) => ({
        id: fields.ID,
        address: fields.Address,
    }),
    assetToFields: asset => ({
        ID: asset.id,
        Address: asset.address,
    }),
    formatter: (asset) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            title: 'ERC721 Asset: Token ID ' + asset.id + ' at ' + asset.address,
            description: '',
            url: '',
            thumbnail: '',
            properties: [],
        };
    }),
    functions: {
        transfer: asset => ({
            type: ethereum_types_1.AbiType.Function,
            name: 'transferFrom',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Owner, name: '_from', type: 'address' },
                { kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id },
            ],
            outputs: [],
        }),
        checkAndTransfer: (asset, validatorAddress, merkle) => ({
            type: ethereum_types_1.AbiType.Function,
            name: 'matchERC721UsingCriteria',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: validatorAddress,
            inputs: [
                { kind: types_1.FunctionInputKind.Owner, name: 'from', type: 'address' },
                { kind: types_1.FunctionInputKind.Replaceable, name: 'to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: 'token', type: 'address', value: asset.address },
                { kind: types_1.FunctionInputKind.Asset, name: 'tokenId', type: 'uint256', value: asset.id },
                { kind: types_1.FunctionInputKind.Data, name: 'root', type: 'bytes32', value: merkle ? merkle.root : "" },
                { kind: types_1.FunctionInputKind.Data, name: 'proof', type: 'bytes32[]', value: merkle ? merkle.proof : "[]" },
            ],
            outputs: [],
        }),
        ownerOf: asset => ({
            type: ethereum_types_1.AbiType.Function,
            name: 'ownerOf',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id },
            ],
            outputs: [
                { kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' },
            ],
        }),
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [],
    },
    hash: asset => asset.address + '-' + asset.id,
};
exports.ERC721v3Schema = Object.assign(Object.assign({}, exports.ERC721Schema), { version: 3, name: 'ERC721v3', description: 'Items conforming to the ERC721 v3 spec, using safeTransferFrom.', functions: Object.assign(Object.assign({}, exports.ERC721Schema.functions), { transfer: asset => ({
            type: ethereum_types_1.AbiType.Function,
            name: 'safeTransferFrom',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: asset.address,
            inputs: [
                { kind: types_1.FunctionInputKind.Owner, name: '_from', type: 'address' },
                { kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id },
            ],
            outputs: [],
        }), checkAndTransfer: (asset, validatorAddress, merkle) => ({
            type: ethereum_types_1.AbiType.Function,
            name: 'matchERC721WithSafeTransferUsingCriteria',
            payable: false,
            constant: false,
            stateMutability: types_1.StateMutability.Nonpayable,
            target: validatorAddress,
            inputs: [
                { kind: types_1.FunctionInputKind.Owner, name: 'from', type: 'address' },
                { kind: types_1.FunctionInputKind.Replaceable, name: 'to', type: 'address' },
                { kind: types_1.FunctionInputKind.Asset, name: 'token', type: 'address', value: asset.address },
                { kind: types_1.FunctionInputKind.Asset, name: 'tokenId', type: 'uint256', value: asset.id },
                { kind: types_1.FunctionInputKind.Data, name: 'root', type: 'bytes32', value: merkle ? merkle.root : "" },
                { kind: types_1.FunctionInputKind.Data, name: 'proof', type: 'bytes32[]', value: merkle ? merkle.proof : "[]" },
            ],
            outputs: [],
        }) }) });
//# sourceMappingURL=index.js.map