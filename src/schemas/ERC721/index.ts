import * as Web3 from 'web3';

import {
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../types';

export interface NonFungibleContractType {
  id: string;
  address: string;
}

export const ERC721Schema: Schema<NonFungibleContractType> = {
  version: 1,
  deploymentBlock: 0, // Not indexed (for now; need asset-specific indexing strategy)
  name: 'ERC721',
  description: 'Items conforming to the ERC721 spec, using transferFrom.',
  thumbnail: 'https://opensea.io/static/images/opensea-icon.png',
  website: 'http://erc721.org/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'Asset Token ID'},
    {name: 'Address', type: 'address', description: 'Asset Contract Address'},
  ],
  assetFromFields: (fields: any) => ({
    id: fields.ID,
    address: fields.Address,
  }),
  assetToFields: asset => ({
    ID: asset.id,
    Address: asset.address,
  }),
  formatter:
    async asset => {
      return {
        title: 'ERC721 Asset: Token ID ' + asset.id + ' at ' + asset.address,
        description: '',
        url: '',
        thumbnail: '',
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
      target: asset.address,
      inputs: [
        {kind: FunctionInputKind.Replaceable, name: '_to', type: 'address'},
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id},
      ],
      outputs: [],
    }),
    transferFrom: asset => ({
      type: Web3.AbiType.Function,
      name: 'transferFrom',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: asset.address,
      inputs: [
        {kind: FunctionInputKind.Owner, name: '_from', type: 'address'},
        {kind: FunctionInputKind.Replaceable, name: '_to', type: 'address'},
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id},
      ],
      outputs: [],
    }),
    ownerOf: asset => ({
      type: Web3.AbiType.Function,
      name: 'ownerOf',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: asset.address,
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: 'owner', type: 'address'},
      ],
    }),
    assetsOfOwnerByIndex: [],
  },
  events: {
    transfer: [],
  },
  hash: asset => asset.address + "-" + asset.id,
};
