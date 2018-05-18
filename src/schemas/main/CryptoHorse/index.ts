import { promisify } from 'typed-promisify';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type CryptoHorseType = string;

export const CryptoHorseSchema: Schema<CryptoHorseType> = {
  version: 2,
  deploymentBlock: 4979255,
  name: 'CryptoHorse',
  description: 'Collectible and breedable blockchain horses',
  thumbnail: 'https://www.cryptohorse.ch/logo.svg',
  website: 'https://www.cryptohorse.ch/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'CryptoHorse number.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async (asset: CryptoHorseType, web3: any) => {
      const abi = {'constant': true, 'inputs': [{'name': '_id', 'type': 'uint256'}], 'name': 'getHorse', 'outputs': [{'name': 'price', 'type': 'uint256'}, {'name': 'id', 'type': 'uint256'}, {'name': 'forSale', 'type': 'bool'}, {'name': 'isGestating', 'type': 'bool'}, {'name': 'isReady', 'type': 'bool'}, {'name': 'unproductiveIndex', 'type': 'uint256'}, {'name': 'nextActionAt', 'type': 'uint256'}, {'name': 'stallionWithId', 'type': 'uint256'}, {'name': 'birthTime', 'type': 'uint256'}, {'name': 'mareId', 'type': 'uint256'}, {'name': 'stallionId', 'type': 'uint256'}, {'name': 'generation', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'};
      const contract = web3.eth.contract([abi]).at('0xB88924408A95917c75DE67fc9FbdC4Af992979c3');
      const data = await (promisify(contract[abi.name].call) as any)(asset);
      const generation = data[11];
      return {
        thumbnail: 'https://www.cryptohorse.ch/logo.svg',
        title: 'CryptoHorse #' + asset,
        description: 'Generation: ' + generation,
        url: 'https://www.cryptohorse.ch/',
        properties: [],
      };
  },
  functions: {
    transfer: asset => ({
      type: Web3.AbiType.Function,
      name: 'transfer',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
      inputs: [
        {kind: FunctionInputKind.Replaceable, name: '_to', type: 'address'},
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset},
      ],
      outputs: [],
    }),
    ownerOf: asset => ({
      type: Web3.AbiType.Function,
      name: 'ownerOf',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: 'owner', type: 'address'},
        {kind: FunctionOutputKind.Other, name: 'tokenId', type: 'uint256'},
      ],
    }),
    assetsOfOwnerByIndex: [],
  },
  events: {
    transfer: [{
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0xB88924408A95917c75DE67fc9FbdC4Af992979c3',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: false, name: 'from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: false, name: 'to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256'},
      ],
      assetFromInputs: async (inputs: any) => inputs.tokenId,
    }],
  },
  hash: a => a,
};
