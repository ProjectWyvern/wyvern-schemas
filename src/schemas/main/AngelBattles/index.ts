import axios from 'axios';
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

const dataTargets = {
  [Kind.Angel]: '0x6d2e76213615925c5fc436565b5ee788ee0e86dc',
  [Kind.Pet]: '0xB340686da996b8B3d486b4D27E38E38500A9E926',
  [Kind.Accessory]: '0x466c44812835f57b736ef9f63582b8a6693a14d0',
};

const transferNames = {
  [Kind.Angel]: 'ownerAngelTransfer',
  [Kind.Pet]: 'ownerPetTransfer',
  [Kind.Accessory]: 'ownerAccessoryTransfer',
};

const assetNames = {
  [Kind.Angel]: '_angelId',
  [Kind.Pet]: '_petId',
  [Kind.Accessory]: '__accessoryId',
};

// @ts-ignore
export const AngelBattlesSchema: Schema<AngelBattlesType> = {
  version: 3,
  deploymentBlock: 0,
  name: 'AngelBattles',
  description: 'Collect angel, pet, and accessory cards',
  thumbnail: 'https://www.angelbattles.com/images/Site/Logo.png',
  website: 'https://www.angelbattles.com/',
  fields: [
    {name: 'Kind', type: 'enum', values: ['Angel', 'Pet', 'Accessory'], description: 'Kind of AngelBattles asset.'},
    {name: 'ID', type: 'uint', description: 'Angel ID.'},
  ],
  assetFromFields: (fields: any) => ({id: fields.ID, kind: fields.Kind}),
  assetToFields: asset => ({ID: asset.id, Kind: asset.kind}),
  formatter:
    async (asset, web3) => {
      const imageResponse = await axios.get('https://www.angelbattles.com/api/imagesSvg');
      const imagesSvg = imageResponse.data;
      switch (asset.kind) {
        case Kind.Angel:
          const getAngelABI = {'constant':true,'inputs':[{'name':'_angelId','type':'uint64'}],'name':'getAngel','outputs':[{'name':'angelId','type':'uint64'},{'name':'angelCardSeriesId','type':'uint8'},{'name':'battlePower','type':'uint16'},{'name':'aura','type':'uint8'},{'name':'experience','type':'uint16'},{'name':'price','type':'uint256'},{'name':'owner','type':'address'}],'payable':false,'stateMutability':'view','type':'function'};
          const contract = web3.eth.contract([getAngelABI]).at(targets[Kind.Angel]);
          const res: any = await (promisify(contract.getAngel.call) as any)(asset.id);
          const angelId = res[0];
          const angelCardSeriesId = res[1].toString();
          const battlePower = res[2];
          const aura = res[3];
          const experience = res[4];
          const price = res[5];
          const owner = res[6];
          let angelThumbnail = 'https://www.angelbattles.com/images/Site/Logo.png';
          let angelName = angelCardSeriesId;
          const angelMatching = imagesSvg.filter((x: any) => x.cardSeriesType === 'Angel' && x.cardSeriesId === angelCardSeriesId)[0];
          if (angelMatching) {
            angelThumbnail = 'https://' + angelMatching.imageUri;
            angelName = angelMatching.cardName;
          }
          return {
            thumbnail: angelThumbnail,
            title: 'Angel #' + angelId + ' - ' + angelName,
            description: 'Battle power: ' + battlePower + ', aura: ' + aura + ', experience: ' + experience,
            url: 'https://www.angelbattles.com/getcard?type=angel&seriesid=' + angelCardSeriesId,
            properties: [],
          };
        case Kind.Pet:
          const getPetABI = {"constant":true,"inputs":[{"name":"_petId","type":"uint256"}],"name":"getPet","outputs":[{"name":"petId","type":"uint256"},{"name":"petCardSeriesId","type":"uint8"},{"name":"luck","type":"uint8"},{"name":"auraRed","type":"uint16"},{"name":"auraBlue","type":"uint16"},{"name":"auraYellow","type":"uint16"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"};
          const petContract = web3.eth.contract([getPetABI]).at(targets[Kind.Pet]);
          const petRes: any = await (promisify(petContract.getPet.call) as any)(asset.id);
          const petId = petRes[0];
          const petCardSeriesId = petRes[1].toString();
          const luck = petRes[2];
          const auraRed = petRes[3];
          const auraBlue = petRes[4];
          const auraYellow = petRes[5];
          const petOwner = petRes[6];
          let petThumbnail = 'https://www.angelbattles.com/images/Site/Logo.png';
          let petName = petCardSeriesId;
          const petMatching = imagesSvg.filter((x: any) => x.cardSeriesType === 'Pet' && x.cardSeriesId === petCardSeriesId)[0];
          if (petMatching) {
            petThumbnail = 'https://' + petMatching.imageUri;
            petName = petMatching.cardName;
          }
          return {
            thumbnail: petThumbnail,
            title: 'Pet #' + petId + ' - ' + petName,
            description: 'Luck: ' + luck + ', aura red: ' + auraRed + ', aura blue: ' + auraBlue + ', aura yellow: ' + auraYellow,
            url: 'https://www.angelbattles.com/getcard?type=pet&seriesid=' + petCardSeriesId,
            properties: [],
          };
        case Kind.Accessory:
          const getAccessoryABI = {"constant":true,"inputs":[{"name":"_accessoryId","type":"uint256"}],"name":"getAccessory","outputs":[{"name":"accessoryID","type":"uint256"},{"name":"AccessorySeriesID","type":"uint8"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"};
          const accessoryContract = web3.eth.contract([getAccessoryABI]).at(targets[Kind.Accessory]);
          const accessoryRes: any = await (promisify(accessoryContract.getAccessory.call) as any)(asset.id);
          const accessoryId = accessoryRes[0];
          const accessorySeriesId = accessoryRes[1].toString();
          const accessoryOwner = accessoryRes[2];
          let accessoryThumbnail = 'https://www.angelbattles.com/images/Site/Logo.png';
          let accessoryName = accessorySeriesId;
          const accessoryMatching = imagesSvg.filter((x: any) => x.cardSeriesType === 'Pet' && x.cardSeriesId === petCardSeriesId)[0];
          if (accessoryMatching) {
            accessoryThumbnail = 'https://' + petMatching.imageUri;
            accessoryName = petMatching.cardName;
          }
          return {
            thumbnail: accessoryThumbnail,
            title: 'Accessory #' + accessoryId + ' - ' + accessoryName,
            description: '',
            url: 'https://www.angelbattles.com/getcard?type=accessory&seriesid=' + accessorySeriesId,
            properties: [],
          };
      }
  },
  allAssets: async (web3: any) => {
    const getTotalAngelsABI = {"constant":true,"inputs":[],"name":"getTotalAngels","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"};
    const getTotalAngelsContract = web3.eth.contract([getTotalAngelsABI]).at(dataTargets[Kind.Angel]);
    const getTotalPetsABI = {"constant":true,"inputs":[],"name":"getTotalPets","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"};
    const getTotalPetsContract = web3.eth.contract([getTotalPetsABI]).at(dataTargets[Kind.Pet]);
    const getTotalAccessoriesABI = {"constant":true,"inputs":[],"name":"getTotalAccessories","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"};
    const getTotalAccessoriesContract = web3.eth.contract([getTotalAccessoriesABI]).at(dataTargets[Kind.Accessory]);
    const totalAngels: any = await (promisify(getTotalAngelsContract.getTotalAngels.call) as any)();
    const totalPets: any = await (promisify(getTotalPetsContract.getTotalPets.call) as any)();
    const totalAccessories: any = await (promisify(getTotalAccessoriesContract.getTotalAccessories.call) as any)();
    const res = [];
    for (let i = 0; i < totalAngels; i++) {
      res.push({kind: Kind.Angel, id: i.toString()});
    }
    for (let i = 0; i < totalPets; i++) {
      res.push({kind: Kind.Pet, id: i.toString()});
    }
    for (let i = 0; i < totalAccessories; i++) {
      res.push({kind: Kind.Accessory, id: i.toString()});
    }
    return res;
  },
  functions: {
    transfer: asset => ({
      type: Web3.AbiType.Function,
      name: transferNames[asset.kind],
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: dataTargets[asset.kind],
      inputs: [
        {kind: FunctionInputKind.Replaceable, name: '_to', type: 'address'},
        {kind: FunctionInputKind.Asset, name: assetNames[asset.kind], type: 'uint64', value: asset.id},
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
        {kind: FunctionInputKind.Index, name: 'index', type: 'uint256'},
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
