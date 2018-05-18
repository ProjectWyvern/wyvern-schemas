import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type EtherTulipsType = string;

export const EtherTulipsSchema: Schema<EtherTulipsType> = {
  version: 1,
  deploymentBlock: 4950098,
  name: 'EtherTulips',
  description: 'Tulip mania. Now with fights. On the blockchain.',
  thumbnail: 'https://s3.amazonaws.com/ethertulips-assets/tulipexamples.png',
  website: 'https://ethertulips.com/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'EtherTulip number.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async asset => {
      // const response = await axios.get(``);
      const response = null;
      if (response === null) {
        return {
          thumbnail: 'https://s3.amazonaws.com/ethertulips-assets/tulipexamples.png',
          title: 'EtherTulip #' + asset,
          description: '',
          url: 'https://ethertulips.com/my_tulips',
          properties: [],
        };
      } else {
        return {
          thumbnail: 'https://s3.amazonaws.com/ethertulips-assets/tulipexamples.png',
          title: 'EtherTulip #' + asset,
          description: '',
          url: 'https://ethertulips.com/my_tulips',
          properties: [],
        };
      }
  },
  functions: {
    transfer: asset => ({
      type: Web3.AbiType.Function,
      name: 'transfer',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0x995020804986274763df9deb0296b754f2659ca1',
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
      target: '0x995020804986274763df9deb0296b754f2659ca1',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: 'owner', type: 'address'},
      ],
    }),
    assetsOfOwnerByIndex: [],
  },
  events: {
    transfer: [{
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0x995020804986274763df9deb0296b754f2659ca1',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: true, name: 'from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: true, name: 'to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: true, name: 'tokenId', type: 'uint256'},
      ],
      assetFromInputs: async (inputs: any) => inputs.tokenId,
    }],
  },
  hash: a => a,
};
