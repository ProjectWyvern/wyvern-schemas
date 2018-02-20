import { sha3 } from 'ethereumjs-util';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  SchemaField,
  StateMutability,
} from '../../../types';

export interface ENSNameType {
  nodeHash: string;
  nameHash?: string;
  name?: string;
}

const namehash = (name: string) => {
  let node = '0000000000000000000000000000000000000000000000000000000000000000';
  if (name !== '') {
    const labels = name.split('.');
    for (let i = labels.length - 1; i >= 0; i--) {
      const labelHash = sha3(labels[i]).toString('hex');
      node = sha3(new Buffer(node + labelHash, 'hex')).toString('hex');
    }
  }
  return '0x' + node.toString();
};

const nodehash = (name: string) => {
  const label = name.split('.')[0];
  if (label) {
    return '0x' + sha3(label).toString('hex');
  } else {
    return '';
  }
};

export const ENSNameSchema: Schema<ENSNameType> = {
  version: 1,
  name: 'ENSName',
  description: 'Ethereum Name Service Name (EIP 137)',
  thumbnail: 'https://ens.domains/img/ens.svg',
  website: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md',
  fields: [
    {name: 'Name', type: 'string', description: 'ENS Name'},
    {name: 'NodeHash', type: 'bytes32', description: 'ENS Node Hash', readOnly: true},
    {name: 'NameHash', type: 'bytes32', description: 'ENS Name Hash', readOnly: true},
  ],
  unifyFields: (fields: any) => ({
    Name: fields.Name,
    NodeHash: nodehash(fields.Name),
    NameHash: namehash(fields.Name),
  }),
  assetFromFields: (fields: any) => ({
    name: fields.Name,
    nodeHash: fields.NodeHash,
    nameHash: fields.NameHash,
  }),
  checkAsset: (asset: ENSNameType) => {
    return asset.name ? (namehash(asset.name) === asset.nameHash && nodehash(asset.name) === asset.nodeHash) : true;
  },
  formatter:
    async asset => {
      return {
        thumbnail: 'https://ens.domains/img/ens.svg',
        title: 'ENS Name ' + asset.name,
        description: 'ENS node ' + asset.nodeHash,
        url: 'https://etherscan.io/enslookup?q=' + asset.name,
        properties: [],
      };
  },
  functions: {
    transfer: asset => ({
      type: Web3.AbiType.Function,
      name: 'setOwner',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0x6090a6e47849629b7245dfa1ca21d94cd15878ef',
      inputs: [
        {kind: FunctionInputKind.Asset, name: 'node', type: 'bytes32', value: asset.nodeHash },
        {kind: FunctionInputKind.Replaceable, name: 'owner', type: 'address'},
      ],
      outputs: [],
    }),
    ownerOf: asset => ({
      type: Web3.AbiType.Function,
      name: 'owner',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0x6090a6e47849629b7245dfa1ca21d94cd15878ef',
      inputs: [
        {kind: FunctionInputKind.Asset, name: 'node', type: 'bytes32', value: asset.nodeHash},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '', type: 'address'},
      ],
    }),
  },
  events: {
    transfer: {
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0x6090a6e47849629b7245dfa1ca21d94cd15878ef',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Asset, indexed: true, name: 'node', type: 'bytes32'},
        {kind: EventInputKind.Destination, indexed: false, name: 'owner', type: 'address'},
      ],
      assetFromInputs: (inputs: any) => ({ nodeHash: inputs.node }),
    },
  },
  hash: a => a.nodeHash,
};
