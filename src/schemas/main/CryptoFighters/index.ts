import axios from 'axios';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type CryptoFightersType = string;

export const CryptoFightersSchema: Schema<CryptoFightersType> = {
  version: 1,
  name: 'CryptoFighters',
  description: 'Collect, train, and fight: digital fighters on the blockchain.',
  thumbnail: 'https://s3.amazonaws.com/cryptofighters/images/455fde9f-9810-4e70-bda6-8bb5cf7a6fe7.png',
  website: 'https://cryptofighters.io/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'CryptoFighter number.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async asset => {
      const response = await axios.get(`https://api.cryptofighters.io/fighters/${asset}`);
      const data = response.data;
      return {
        thumbnail: data.image,
        title: 'CryptoFighter #' + asset,
        description: '',
        url: 'https://cryptofighters.io/fighter/' + asset,
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
      target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
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
      target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: 'owner', type: 'address'},
      ],
    }),
  },
  events: {
    transfer: {
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0x87d598064c736dd0c712d329afcfaa0ccc1921a1',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: true, name: 'from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: true, name: 'to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: true, name: 'tokenId', type: 'uint256'},
      ],
      assetFromInputs: (inputs: any) => inputs.tokenId,
    },
  },
  hash: a => a,
};
