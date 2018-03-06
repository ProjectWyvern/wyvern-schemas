import { promisify } from 'typed-promisify';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

import * as Names from './names.json';
import * as Thumbnails from './thumbnails.json';

export type EtheremonType = string;

export const EtheremonSchema: Schema<EtheremonType> = {
  version: 2,
  deploymentBlock: 4946456,
  name: 'Etheremon',
  description: 'Decentralized World of Ether Monsters',
  thumbnail: 'https://cdn-images-1.medium.com/max/720/1*SvU1GenU55qO0eNNiTWGtA.png',
  website: 'https://www.etheremon.com/',
  fields: [
    {name: 'ID', type: 'uint64', description: 'Etheremon ID.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async (asset, web3) => {
      const getMonsterObjABI = {"constant":true,"inputs":[{"name":"_objId","type":"uint64"}],"name":"getMonsterObj","outputs":[{"name":"objId","type":"uint64"},{"name":"classId","type":"uint32"},{"name":"trainer","type":"address"},{"name":"exp","type":"uint32"},{"name":"createIndex","type":"uint32"},{"name":"lastClaimIndex","type":"uint32"},{"name":"createTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"};
      const getMonsterNameABI = {"constant":true,"inputs":[{"name":"_objId","type":"uint64"}],"name":"getMonsterName","outputs":[{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"};
      const dataContract = web3.eth.contract([getMonsterObjABI, getMonsterNameABI]).at('0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e');
      const res: any = await (promisify(dataContract.getMonsterObj.call) as any)(asset);
      const objId = res[0];
      const classId = res[1];
      const trainer = res[2];
      const exp = res[3];
      const createIndex = res[4];
      const lastClaimIndex = res[5];
      const createTime = res[6];
      const className = (Names as any)[classId];
      const name: any = await (promisify(dataContract.getMonsterName.call) as any)(asset);
      return {
        thumbnail: 'https://www.etheremon.com/' + (Thumbnails as any)[classId] + '.png',
        title: 'Etheremon #' + asset + ' - ' + className,
        description: 'Catch number: ' + createIndex + ', experience: ' + exp + ', nickname: ' + name,
        url: 'https://www.etheremon.com/#/mons/' + classId,
        properties: [],
      };
    },
  functions: {
    transfer: asset => ({
      type: Web3.AbiType.Function,
      name: 'freeTransferItem',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_objId', type: 'uint64', value: asset},
        {kind: FunctionInputKind.Replaceable, name: '_receiver', type: 'address'},
      ],
      outputs: [],
    }),
    ownerOf: asset => ({
      type: Web3.AbiType.Function,
      name: 'getMonsterObj',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e',
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_objId', type: 'uint64', value: asset},
      ],
      outputs: [
        {kind: FunctionOutputKind.Other, name: 'objId', type: 'uint64'},
        {kind: FunctionOutputKind.Other, name: 'classId', type: 'uint32'},
        {kind: FunctionOutputKind.Owner, name: 'trainer', type: 'address'},
        {kind: FunctionOutputKind.Other, name: 'exp', type: 'uint32'},
        {kind: FunctionOutputKind.Other, name: 'createIndex', type: 'uint32'},
        {kind: FunctionOutputKind.Other, name: 'lastClaimIndex', type: 'uint32'},
        {kind: FunctionOutputKind.Other, name: 'createTime', type: 'uint'},
      ],
    }),
    assetsOfOwnerByIndex: ({
      type: Web3.AbiType.Function,
      name: 'getMonsterObjId',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e',
      inputs: [
        {kind: FunctionInputKind.Owner, name: '_trainer', type: 'address'},
        {kind: FunctionInputKind.Index, name: 'index', type: 'uint256'},
      ],
      outputs: [
        {kind: FunctionOutputKind.Asset, name: '', type: 'uint64'},
      ],
      assetFromOutputs: (outputs: any) => outputs.toString(),
    }),
  },
  events: {
    transfer: [{
      type: Web3.AbiType.Event,
      name: 'EventFreeTransferItem',
      target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: true, name: 'sender', type: 'address'},
        {kind: EventInputKind.Destination, indexed: true, name: 'receiver', type: 'address'},
        {kind: EventInputKind.Asset, indexed: false, name: 'objId', type: 'uint64'},
      ],
      assetFromInputs: async (inputs: any) => inputs.objId,
    }],
  },
  hash: a => a,
};
