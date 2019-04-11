import * as Web3 from 'web3';

import {
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export interface NonFungibleContractType {
  id: string;
  address: string;
}

export const EnjinMetaverseSchema: Schema<NonFungibleContractType> = {
  version: 1,
  deploymentBlock: 0, // Not indexed (for now; need asset-specific indexing strategy)
  name: 'EnjinMetaverse',
  description: 'Items conforming to the Enjin Metaverse contract ABI, using transfer.',
  thumbnail: 'https://opensea.io/static/images/opensea-icon.png',
  website: 'https://github.com/ethereum/eips/issues/1155',
  fields: [
    {name: 'ID', type: 'uint256', description: 'Asset ID'},
    {name: 'Address', type: 'address', description: 'Enjin Contract Address'},
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
        title: 'EnjinMetaverse Asset: Token ID ' + asset.id + ' at ' + asset.address,
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
        {kind: FunctionInputKind.Asset, name: '_id', type: 'uint256', value: asset.id},
        {kind: FunctionInputKind.Count, name: '_value', type: 'uint256', value: 1},
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
  hash: asset => asset.address + '-' + asset.id,
};
