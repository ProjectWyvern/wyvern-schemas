import { promisify } from 'typed-promisify';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type MythereumType = string;

export const MythereumSchema: Schema<MythereumType> = {
  version: 2,
  deploymentBlock: 5033489,
  name: 'Mythereum',
  description: 'Fantastically Distributed Collectible Card Game',
  thumbnail: 'https://www.mythereum.io/three-cards.png',
  website: 'https://www.mythereum.io/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'Mythereum card number.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async (asset, web3) => {
      const cardsABI = {'constant': true, 'inputs': [{'name': '', 'type': 'uint256'}], 'name': 'cards', 'outputs': [{'name': 'name', 'type': 'string'}, {'name': 'class', 'type': 'uint8'}, {'name': 'classVariant', 'type': 'uint8'}, {'name': 'damagePoints', 'type': 'uint8'}, {'name': 'shieldPoints', 'type': 'uint8'}, {'name': 'abilityId', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'};
      const abilitiesABI = {'constant': true, 'inputs': [{'name': '', 'type': 'uint256'}], 'name': 'abilities', 'outputs': [{'name': 'name', 'type': 'string'}, {'name': 'canBeBlocked', 'type': 'bool'}, {'name': 'blackMagicCost', 'type': 'uint8'}, {'name': 'grayMagicCost', 'type': 'uint8'}, {'name': 'whiteMagicCost', 'type': 'uint8'}, {'name': 'addedDamage', 'type': 'uint256'}, {'name': 'addedShield', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'};
      const contract = web3.eth.contract([cardsABI, abilitiesABI]).at('0xa67aac23549f4c672256b59b43ab0bacfcfcd498');
      const res: any = await (promisify(contract.cards.call) as any)(asset);
      const name = res[0];
      const classId = res[1];
      const classVariant = res[2];
      const damagePoints = res[3];
      const shieldPoints = res[4];
      const abilityId = res[5];
      const ares: any = await (promisify(contract.abilities.call) as any)(abilityId);
      const abilityName = ares[0];
      return {
        thumbnail: 'https://www.mythereum.io/' + classId + '_' + classVariant + '.png',
        title: 'Mythereum #' + asset + ' - ' + name,
        description: 'Ability ' + abilityName + ' / Damage ' + damagePoints + ' / Shield ' + shieldPoints,
        url: 'https://www.mythereum.io/',
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
      target: '0xa67aac23549f4c672256b59b43ab0bacfcfcd498',
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
      target: '0xa67aac23549f4c672256b59b43ab0bacfcfcd498',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '', type: 'address'},
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
        {kind: EventInputKind.Source, indexed: true, name: '_from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: true, name: '_to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: false, name: '_tokenId', type: 'uint256'},
      ],
      assetFromInputs: async (inputs: any) => inputs._tokenId,
    }],
  },
  hash: a => a,
};
