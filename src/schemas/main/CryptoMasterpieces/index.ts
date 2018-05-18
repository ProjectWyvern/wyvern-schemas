import { promisify } from 'typed-promisify';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export type CryptoMasterpiecesType = string;

export const CryptoMasterpiecesSchema: Schema<CryptoMasterpiecesType> = {
  version: 1,
  deploymentBlock: 5096088,
  name: 'CryptoMasterpieces',
  description: 'Own a Digital Masterpiece on the Blockchain',
  thumbnail: 'https://www.cryptomasterpieces.com/static/img/top-section.jpg',
  website: 'https://www.cryptomasterpieces.com/',
  fields: [
    {name: 'ID', type: 'uint256', description: 'CryptoMasterpiece number.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async (asset: CryptoMasterpiecesType, web3: any) => {
      const abi = {'constant': true, 'inputs': [{'name': '_tokenId', 'type': 'uint256'}], 'name': 'getMasterpiece', 'outputs': [{'name': 'name', 'type': 'string'}, {'name': 'artist', 'type': 'string'}, {'name': 'birthTime', 'type': 'uint256'}, {'name': 'snatchWindow', 'type': 'uint256'}, {'name': 'sellingPrice', 'type': 'uint256'}, {'name': 'owner', 'type': 'address'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'};
      const contract = web3.eth.contract([abi]).at('0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd');
      const data = await (promisify(contract[abi.name].call) as any)(asset);
      const name = data[0];
      const artist = data[1];
      return {
        thumbnail: 'https://s3.amazonaws.com/cryptomasterpieces/masterpiece-images/' + asset + '.jpg',
        title: 'CryptoMasterpiece #' + asset + ' - ' + name,
        description: name + ' by ' + artist,
        url: 'https://cryptomasterpieces.com/masterpiece/' + asset,
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
      target: '0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd',
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
      target: '0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '_owner', type: 'address'},
      ],
    }),
    assetsOfOwnerByIndex: [],
  },
  events: {
    transfer: [{
      type: Web3.AbiType.Event,
      name: 'TransferToken',
      target: '0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd',
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
