import { promisify } from 'typed-promisify';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export enum Kind {
  Angel = 'Angel',
  Pet = 'Pet',
  Accessory = 'Accessory',
}

export interface AngelBattlesType {
  kind: Kind;
  id: string;
}

const targets = {
  [Kind.Angel]: '0x0c47E8028D5452fcc1aD577B3212C1E63DE72b50',
  [Kind.Pet]: '0x5ee9bc8a2b2baa393706ba3f3268135663a626a1',
  [Kind.Accessory]: '0x466c44812835f57b736ef9f63582b8a6693a14d0',
};

// @ts-ignore
export const AngelBattlesSchema: Schema<AngelBattlesType> = {
  version: 1,
  deploymentBlock: 0,
  name: 'AngelBattles',
  description: 'Collect angel, pet, and accessory cards',
  thumbnail: 'https://www.angelbattles.com/images/Site/Logo.png',
  website: 'https://www.angelbattles.com/',
  fields: [
    {name: 'Kind', type: 'enum', values: ['Angel', 'Pet', 'Accessory'], description: 'Kind of AngelBattles asset.'},
    {name: 'ID', type: 'uint', description: 'Angel ID.'},
  ],
  assetFromFields: (fields: any) => fields.ID,
  assetToFields: asset => ({ID: asset}),
  formatter:
    async (asset, web3) => {
      switch (asset.kind) {
        case Kind.Angel:
          const getAngelABI = {'constant':true,'inputs':[{'name':'_angelId','type':'uint64'}],'name':'getAngel','outputs':[{'name':'angelId','type':'uint64'},{'name':'angelCardSeriesId','type':'uint8'},{'name':'battlePower','type':'uint16'},{'name':'aura','type':'uint8'},{'name':'experience','type':'uint16'},{'name':'price','type':'uint256'},{'name':'owner','type':'address'}],'payable':false,'stateMutability':'view','type':'function'};
          const contract = web3.eth.contract([getAngelABI]).at(targets[Kind.Angel]);
          const res: any = await (promisify(contract.getAngel.call) as any)(asset.id);
          const angelId = res[0];
          const angelCardSeriesId = res[1];
          const battlePower = res[2];
          const aura = res[3];
          const experience = res[4];
          const price = res[5];
          const owner = res[6];
          return {
            thumbnail: 'https://www.angelbattles.com/images/Site/Logo.png',
            title: 'Angel #' + angelId + ' - ' + angelCardSeriesId,
            description: 'Battle power: ' + battlePower + ', aura: ' + aura + ', experience: ' + experience,
            url: 'https://www.angelbattles.com/getcard?type=angel&seriesid=' + angelCardSeriesId,
            properties: [],
          };
        case Kind.Pet:
          const getPetABI = {"constant":true,"inputs":[{"name":"_petId","type":"uint256"}],"name":"getPet","outputs":[{"name":"petId","type":"uint256"},{"name":"petCardSeriesId","type":"uint8"},{"name":"luck","type":"uint8"},{"name":"auraRed","type":"uint16"},{"name":"auraBlue","type":"uint16"},{"name":"auraYellow","type":"uint16"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"};
          const petContract = web3.eth.contract([getPetABI]).at(targets[Kind.Pet]);
          const petRes: any = await (promisify(petContract.getPet.call) as any)(asset.id);
          const petId = petRes[0];
          const petCardSeriesId = petRes[1];
          const luck = petRes[2];
          const auraRed = petRes[3];
          const auraBlue = petRes[4];
          const auraYellow = petRes[5];
          const petOwner = petRes[6];
          return {
            thumbnail: 'https://www.angelbattles.com/images/Site/Logo.png',
            title: 'Pet #' + petId + ' - ' + petCardSeriesId,
            description: 'Luck: ' + luck + ', aura red: ' + auraRed + ', aura blue: ' + auraBlue + ', aura yellow: ' + auraYellow,
            url: 'https://www.angelbattles.com/getcard?type=pet&seriesid=' + petCardSeriesId,
            properties: [],
          };
        case Kind.Accessory:
          const getAccessoryABI = {"constant":true,"inputs":[{"name":"_accessoryId","type":"uint256"}],"name":"getAccessory","outputs":[{"name":"accessoryID","type":"uint256"},{"name":"AccessorySeriesID","type":"uint8"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"};
          const accessoryContract = web3.eth.contract([getAccessoryABI]).at(targets[Kind.Accessory]);
          const accessoryRes: any = await (promisify(accessoryContract.getAccessory.call) as any)(asset.id);
          const accessoryId = accessoryRes[0];
          const accessorySeriesId = accessoryRes[1];
          const accessoryOwner = accessoryRes[2];
          return {
            thumbnail: 'https://www.angelbattles.com/images/Site/Logo.png',
            title: 'Accessory #' + accessoryId + ' - ' + accessorySeriesId,
            description: '',
            url: 'https://www.angelbattles.com/getcard?type=accessory&seriesid=' + accessorySeriesId,
            properties: [],
          };
      }
  },
  functions: {
    transfer: asset => ({
      type: Web3.AbiType.Function,
      name: 'transfer',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: targets[asset.kind],
      inputs: [
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
      target: targets[asset.kind],
      inputs: [
        {kind: FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '_owner', type: 'address'},
      ],
    }),
    assetsOfOwnerByIndex: ([Kind.Angel, Kind.Pet, Kind.Accessory].map(kind => ({
      type: Web3.AbiType.Function,
      name: 'getTokenByIndex',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: targets[kind],
      inputs: [
        {kind: FunctionInputKind.Owner, name: '_owner', type: 'address'},
        {kind: FunctionInputKind.Index, name: 'index', type: 'uint'},
      ],
      outputs: [
        {kind: FunctionOutputKind.Asset, name: '', type: 'uint64'},
      ],
      assetFromOutputs: (output: any) => {
        const str = output.toString();
        if (str === '0') {
          return null;
        } else {
          return {kind, id: str};
        }
      },
    }))),
  },
  events: {
    transfer: [],
  },
  hash: a => a.kind + ':' + a.id,
};
