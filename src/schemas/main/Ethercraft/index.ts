import { promisify } from 'typed-promisify';
import * as Web3 from 'web3';

import {
  AnnotatedEventABI,
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

import * as AddressMap from './addressMap.json';
import * as ItemDB from './ethercraft.json';
import * as Images from './images.json';

(ItemDB as any).map((x: any) => {
  x.address = x.address.toLowerCase();
  const addr = (AddressMap as any)[x.address];
  if (addr) {
    x.address = addr;
  }
});

export type EthercraftType = string;

const dataOf = (asset: EthercraftType) => (ItemDB as any).filter((x: any) => x.address.toLowerCase() === asset.toLowerCase())[0];

const nameOf = (asset: EthercraftType) => dataOf(asset).strings[0].name;

const indexOf = (asset: EthercraftType) => (ItemDB as any).map((v: any, i: any) => i).filter((i: any) => (ItemDB as any)[i].address.toLowerCase() === asset.toLowerCase())[0];

const imageOf = (asset: EthercraftType) => {
  const index = indexOf(asset);
  return (Images as any)[index];
};

const descriptionOf = (asset: EthercraftType) => {
  const data = dataOf(asset);
  return data.strings[0].description;
};

const unit = '1000000000000000000'; // 10e18

const kinds = (ItemDB as any).map((x: any) => x.strings[0].name);

const addressByKind = (name: string) => (ItemDB as any).filter((x: any) => x.strings[0].name === name)[0].address;

export const EthercraftSchema: Schema<EthercraftType> = {
  version: 1,
  deploymentBlock: 0, // Currently not indexed
  name: 'Ethercraft',
  description: 'A decentralized RPG running on the Ethereum blockchain.',
  thumbnail: 'https://cdn.discordapp.com/icons/400700363402903552/4f9c2076b2b8a9c0b8a57ce3ecdc57fe.png',
  website: 'https://ethercraft.io',
  fields: [
    {name: 'Kind', type: 'enum', values: kinds, description: 'Kind of item.'},
  ],
  assetFromFields: (fields: any) => addressByKind(fields.Kind),
  assetToFields: asset => ({Kind: nameOf(asset)}),
  formatter:
    async asset => {
      return {
        thumbnail: imageOf(asset),
        title: 'Ethercraft - ' + nameOf(asset),
        description: descriptionOf(asset),
        url: 'https://ethercraft.io/#/shop/' + indexOf(asset),
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
      target: asset,
      inputs: [
        {kind: FunctionInputKind.Replaceable, name: 'to', type: 'address'},
        {kind: FunctionInputKind.Asset, name: 'tokens', type: 'uint256', value: unit},
      ],
      outputs: [],
    }),
    countOf: asset => ({
      type: Web3.AbiType.Function,
      name: 'balanceOf',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: asset,
      inputs: [
        {kind: FunctionInputKind.Owner, name: 'tokenOwner', type: 'address'},
      ],
      outputs: [
        {kind: FunctionOutputKind.Count, name: 'balance', type: 'uint'},
      ],
      assetFromOutputs: (outputs: any) => outputs.balance,
    }),
  },
  events: {
    transfer: [],
  },
  hash: a => a,
};
