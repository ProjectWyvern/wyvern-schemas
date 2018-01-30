import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type RinkebyCryptoKittiesType = number;

export const rinkebyCryptoKittiesSchema: Schema<RinkebyCryptoKittiesType> = {
  name: 'RinkebyCryptoKitties',
  description: 'Rinkeby Testnet CryptoKitties',
  thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
  website: 'https://cryptokitties.co',
  fields: [
    {name: 'ID', type: 'uint256', description: 'CryptoKitty number.'},
  ],
  nftFromFields: (fields: any) => fields.ID,
  formatter:
    nftID => {
      return {
        thumbnail: 'https://www.cryptokitties.co/images/kitty-eth.svg',
        title: 'RinkebyCryptoKitty #' + nftID,
        description: 'A Rinkeby testnet virtual cat!',
        url: 'https://cryptokitties.co',
      };
  },
  functions: {
    transfer: nft => ({
      type: Web3.AbiType.Function,
      name: 'transfer',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
      inputs: [
        {kind: FunctionInputKind.Replaceable, name: '_to', type: 'address'},
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: nft},
      ],
      outputs: [],
    }),
    ownerOf: nft => ({
      type: Web3.AbiType.Function,
      name: 'ownerOf',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: nft},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: 'owner', type: 'address'},
      ],
    }),
    tokensOfOwnerByIndex: {
      type: Web3.AbiType.Function,
      name: 'tokensOfOwnerByIndex',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
      inputs: [
        {kind: FunctionInputKind.Owner, name: '_owner', type: 'address'},
        {kind: FunctionInputKind.Index, name: '_index', type: 'uint'},
      ],
      outputs: [
        {kind: FunctionOutputKind.Asset, name: 'tokenId', type: 'uint'},
      ],
      nftFromOutputs: (output: any) => {
        if (output.toNumber() === 0) {
          return null;
        } else {
          return output;
        }
      },
    },
  },
  events: {},
/*
    transfer: {
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: true, name: 'from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: true, name: 'to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: true, name: 'tokenId', type: 'uint256'},
      ],
      nftFromInputs: (inputs: any) => inputs._tokenId,
    },
  },
*/
};
