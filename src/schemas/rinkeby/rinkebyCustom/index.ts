import { sha3 } from 'ethereumjs-util';
import * as Web3 from 'web3';

import {
  AnnotatedFunctionABI,
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  SchemaField,
  StateMutability,
} from '../../../types';

export interface RinkebyCustomType {
  name: string;
  description: string;
  thumbnail: string;
  url: string;
  transfer: AnnotatedFunctionABI;
}

export const rinkebyCustomSchema: Schema<RinkebyCustomType> = {
  name: 'RinkebyCustom',
  description: 'Rinkeby Custom (manual ABI specification)',
  thumbnail: 'https://d30y9cdsu7xlg0.cloudfront.net/png/45447-200.png',
  website: 'https://github.com/projectwyvern/wyvern-schemas',
  fields: [
    {name: 'Name', type: 'string', description: 'Name of Asset'},
    {name: 'Description', type: 'string', description: 'Description of Asset'},
    {name: 'Thumbnail', type: 'string', description: 'URL of asset thumbnail image'},
    {name: 'URL', type: 'string', description: 'URL of asset'},
    {name: 'Transfer', type: 'abi', description: 'ABI of transfer function'},
  ],
  nftFromFields: (fields: any) => ({
    name: fields.Name,
    description: fields.Description,
    thumbnail: fields.Thumbnail,
    url: fields.URL,
    transfer: fields.Transfer,
  }),
  formatter:
    nft => {
      return {
        thumbnail: nft.thumbnail,
        title: nft.name,
        description: nft.description,
        url: nft.url,
      };
  },
  functions: {
    transfer: nft => nft.transfer,
  },
  events: {},
};
