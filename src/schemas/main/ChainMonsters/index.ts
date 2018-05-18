import { promisify } from 'typed-promisify';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

import * as MonsterData from './monsterdata.json';
import * as Types from './types.json';

export type ChainMonstersType = string;

export const ChainMonstersSchema: Schema<ChainMonstersType> = {
  version: 2,
  deploymentBlock: 5106855,
  name: 'ChainMonsters',
  description: '100% blockchain based monster collectible game',
  thumbnail: 'https://cdn-images-1.medium.com/fit/c/90/90/1*xthSZXBLKxsSGkLz1FWyFg.png',
  website: 'https://chainmonsters.io/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'ChainMonster number.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async (asset: ChainMonstersType, web3: any) => {
      const abi = {'constant': true, 'inputs': [{'name': '_id', 'type': 'uint256'}], 'name': 'getMonster', 'outputs': [{'name': 'birthTime', 'type': 'uint256'}, {'name': 'generation', 'type': 'uint256'}, {'name': 'stats', 'type': 'uint8[8]'}, {'name': 'mID', 'type': 'uint256'}, {'name': 'tradeable', 'type': 'bool'}, {'name': 'uID', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'};
      const contract = web3.eth.contract([abi]).at('0xf7f6c2836293a661be2690fbacae97f3f027e9c4');
      const data = await (promisify(contract[abi.name].call) as any)(asset);
      const generation = data[1];
      const stats = data[2];
      const mID = data[3];
      const monster = (MonsterData as any)[mID.toString()];
      const type = (Types as any)[stats[6].toString()];
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
      stateMutability: StateMutability.Nonpayable,
      target: '0xf7f6c2836293a661be2690fbacae97f3f027e9c4',
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
      target: '0xf7f6c2836293a661be2690fbacae97f3f027e9c4',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_deedId', type: 'uint256', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '_owner', type: 'address'},
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
        {kind: EventInputKind.Source, indexed: false, name: 'from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: false, name: 'to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256'},
      ],
      assetFromInputs: async (inputs: any) => inputs.tokenId,
    }],
  },
  hash: a => a,
};
