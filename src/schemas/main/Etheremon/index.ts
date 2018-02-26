import { promisify } from 'typed-promisify';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type EtheremonType = string;

export const EtheremonSchema: Schema<EtheremonType> = {
  version: 1,
  deploymentBlock: 4946456,
  name: 'Etheremon',
  description: 'Decentralized World of Ether Monsters',
  thumbnail: 'https://cdn-images-1.medium.com/max/720/1*SvU1GenU55qO0eNNiTWGtA.png',
  website: 'https://www.etheremon.com/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'Etheremon ID.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async (asset, web3) => {
      return {
        thumbnail: '',
        title: 'Etheremon #' + asset,
        description: '',
        url: 'https://www.etheremon.com/#/mons/' + asset,
        properties: [],
      };
    },
  functions: {
    transfer: asset => ({
      type: Web3.AbiType.Function,
      name: 'freeTransferItem',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_objId', type: 'uint64', value: asset},
        {kind: FunctionInputKind.Replaceable, name: '_receiver', type: 'address'},
      ],
      outputs: [],
    }),
    /* ownerOf TODO */
    ownerOf: asset => ({
      type: Web3.AbiType.Function,
      name: 'ownerOf',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_objId', type: 'uint64', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '', type: 'address'},
      ],
    }),
  },
  events: {
    transfer: [{
      type: Web3.AbiType.Event,
      name: 'EventFreeTransferItem',
      target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: true, name: 'sender', type: 'address'},
        {kind: EventInputKind.Destination, indexed: true, name: 'receiver', type: 'address'},
        {kind: EventInputKind.Asset, indexed: false, name: 'objId', type: 'uint64'},
      ],
      assetFromInputs: (inputs: any) => inputs.objId,
    }],
  },
  hash: a => a,
};
