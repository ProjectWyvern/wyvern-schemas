import axios from 'axios';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type CryptoBotsType = string;

export const CryptoBotsSchema: Schema<CryptoBotsType> = {
  version: 1,
  deploymentBlock: 4819345,
  name: 'CryptoBots',
  description: 'A blockchain-based game to find out whose bot army is the best!',
  thumbnail: 'https://cryptobots.me/static/media/banner.38d05abc.svg',
  website: 'https://cryptobots.me/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'CryptoBot number.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async asset => {
      const response = await axios.post(`https://cryptobots.me/api/bot/search`, {ids: [asset]}).catch(err => {
        if (err.response && (err.response.status === 404 || err.response.status === 400)) {
          return null;
        } else {
          throw err;
        }
      });
      if (response === null) {
        return {
          thumbnail: 'https://cryptobots.me/static/media/banner.38d05abc.svg',
          title: 'CryptoBot #' + asset,
          description: '',
          url: 'https://cryptobots.me/bot/' + asset,
          properties: [],
        };
      } else {
        const data = response.data.items[0];
        return {
          thumbnail: 'https://cryptobots.me/img/' + data.info.genes,
          title: 'CryptoBot #' + asset,
          description: 'Generation: ' + data.info.generation,
          url: 'https://cryptobots.me/bot/' + asset,
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
      target: '0x491C05896EF656d7FeE0FB90CE487315ff0aC14C',
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
      target: '0x491C05896EF656d7FeE0FB90CE487315ff0aC14C',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: 'owner', type: 'address'},
      ],
    }),
  },
  events: {
    transfer: [{
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0x491C05896EF656d7FeE0FB90CE487315ff0aC14C',
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
