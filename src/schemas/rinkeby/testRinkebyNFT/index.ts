import * as Web3 from 'web3';

import {
  ABIType,
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type TestRinkebyNFTType = number;

export const testRinkebyNFTSchema: Schema<TestRinkebyNFTType> = {
  name: 'TestRinkebyNFT',
  description: 'Rinkeby ERC721 non-fungible token for Wyvern Exchange testing',
  thumbnail: 'http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/ethereum.png',
  website: 'https://projectwyvern.com',
  formatter:
    nftNumber => {
      return {
        thumbnail: 'http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/ethereum.png',
        title: 'TestRinkebyNFT #' + nftNumber,
        description: 'A useless NFT!',
        url: 'https://www.projectwyvern.com',
    };
  },
  functions: {
    transfer: {
      type: Web3.AbiType.Function,
      name: 'transfer',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0x07a6dc6e3f1120ca03658d473d10aee3af5f8ab',
      inputs: [
        {kind: FunctionInputKind.Replaceable, name: '_to', type: 'address'},
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256'},
      ],
      outputs: [],
      nftToInputs:
      nft => {
        return {_tokenId: nft};
      },
    },
    ownerOf: {
      type: Web3.AbiType.Function,
      name: 'ownerOf',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0x07a6dc6e3f1120ca03658d473d10aee3af5f8ab',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256'},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '_owner', type: 'address'},
      ],
      nftToInputs:
      nft => {
        return {_tokenId: nft};
      },
    },
  },
  events: {
    transfer: {
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0x07a6dc6e3f1120ca03658d473d10aee3af5f8abb',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: true, name: '_from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: true, name: '_to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: false, name: '_tokenId', type: 'uint256'},
      ],
      nftFromInputs: (inputs: any) => {
        return inputs._tokenId;
      },
    },
  },
};
