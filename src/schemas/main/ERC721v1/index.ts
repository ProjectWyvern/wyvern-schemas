import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type ECR721v1Type = string;

export const ECR721v1Schema: Schema<ECR721v1Type> = {
  version: 1,
  deploymentBlock: 0, // Not indexed (for now; need asset-specific indexing strategy)
  name: 'ECR721v1',
  description: 'Items conforming to the ERC721 v1 spec, using transferFrom.',
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
        title: 'ECR721v1 Asset: Token ID ' + asset.id + ' at ' + asset.address,
        properties: [],
      };
  },
  functions: {
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
    transfer: asset => ([{
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: asset.address,
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: false, name: 'from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: false, name: 'to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256'},
      ],
      assetFromInputs: async (inputs: any) => ({ address: asset.address, id: inputs.tokenId }),
    }]),
  },
  hash: a => a,
};
