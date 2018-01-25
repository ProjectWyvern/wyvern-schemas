import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  SchemaField,
  StateMutability,
} from '../../../types';

export interface RinkebyENSNameType {
  node: string;
  name?: string;
}

export const rinkebyENSNameSchema: Schema<RinkebyENSNameType> = {
  name: 'RinkebyENSName',
  description: 'Rinkeby Ethereum Name Service (EIP 137)',
  thumbnail: 'http://ens.domains/img/ens.svg',
  website: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md',
  fields: [
    {name: 'Name', type: 'string', description: 'ENS Name'},
    {name: 'Node', type: 'bytes32', description: 'ENS Node Hash'},
  ],
  unifyFields: (fields: any) => ({
    Node: fields.Name,
  }),
  nftFromFields: (fields: any) => ({
    node: fields.Node,
    name: fields.Name,
  }),
  formatter:
    nft => {
      return {
        thumbnail: 'http://ens.domains/img/ens.svg',
        title: 'ENS Name ' + nft.name,
        description: '(ENS node ' + nft.node + ')',
        url: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md',
      };
  },
  functions: {
    transfer: {
      type: Web3.AbiType.Function,
      name: 'setOwner',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
      inputs: [
        {kind: FunctionInputKind.Asset, name: 'node', type: 'bytes32'},
        {kind: FunctionInputKind.Replaceable, name: 'owner', type: 'address'},
      ],
      outputs: [],
      nftToInputs: nft => ({ node: nft.node }),
    },
    ownerOf: {
      type: Web3.AbiType.Function,
      name: 'owner',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
      inputs: [
        {kind: FunctionInputKind.Asset, name: 'node', type: 'bytes32'},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '', type: 'address'},
      ],
      nftToInputs: nft => ({ node: nft.node }),
    },
  },
  events: {
    transfer: {
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0xe7410170f87102df0055eb195163a03b7f2bff4a',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Asset, indexed: true, name: 'node', type: 'bytes32'},
        {kind: EventInputKind.Destination, indexed: false, name: 'owner', type: 'address'},
      ],
      nftFromInputs: (inputs: any) => ({ node: inputs.node }),
    },
  },
};
