import axios from 'axios';
import * as Web3 from 'web3';

import {
  EventInputKind,
  FunctionInputKind,
  FunctionOutputKind,
  Schema,
  StateMutability,
} from '../../../types';

export interface DecentralandType {
  x: string;
  y: string;
}

export const DecentralandSchema: Schema<DecentralandType> = {
  version: 1,
  deploymentBlock: 4944642,
  name: 'Decentraland',
  description: 'A virtual world that runs on open standards.',
  thumbnail: 'https://decentraland.org/images/logo-65f7b27caf.png',
  website: 'https://decentraland.org/',
  fields: [
    {name: 'X', type: 'int', description: 'Parcel x-coordinate'},
    {name: 'Y', type: 'int', description: 'Parcel y-coordinate'},
  ],
  assetFromFields: (fields: any) => ({x: fields.X, y: fields.Y}),
  assetToFields: asset => ({X: asset.x, Y: asset.y}),
  formatter:
    async asset => {
      const districtResponse = await axios.get(`https://api.land.decentraland.org/api/districts`);
      const districts = districtResponse.data.data;
      const assetResponse = await axios.get(`https://api.land.decentraland.org/api/parcels?nw=${asset.x},${asset.y}&se=${asset.x},${asset.y}`);
      const assetData = assetResponse.data.data[0];
      let district = 'None';
      if (assetData.district_id !== null) {
        district = districts.filter((d: any) => d.id === assetData.district_id)[0].name;
      }
      return {
        thumbnail: 'https://decentraland.org/images/logo-65f7b27caf.png',
        title: 'Decentraland Parcel at ' + asset.x + ',' + asset.y,
        description: 'District: ' + district,
        url: 'https://land.decentraland.org/' + asset.x + '/' + asset.y,
        properties: [],
      };
  },
  functions: {
    transfer: asset => ({
      type: Web3.AbiType.Function,
      name: 'transferLand',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
      inputs: [
        {kind: FunctionInputKind.Asset, name: 'x', type: 'int256', value: asset.x},
        {kind: FunctionInputKind.Asset, name: 'y', type: 'int256', value: asset.y},
        {kind: FunctionInputKind.Replaceable, name: 'to', type: 'address'},
      ],
      outputs: [],
    }),
    ownerOf: asset => ({
      type: Web3.AbiType.Function,
      name: 'ownerOfLand',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
      inputs: [
        {kind: FunctionInputKind.Asset, name: 'x', type: 'int256', value: asset.x},
        {kind: FunctionInputKind.Asset, name: 'y', type: 'int256', value: asset.y},
      ],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: '', type: 'address'},
      ],
    }),
  },
  events: {
    transfer: [{
      type: Web3.AbiType.Event,
      name: 'Transfer',
      target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
      anonymous: false,
      inputs: [
        {kind: EventInputKind.Source, indexed: true, name: 'from', type: 'address'},
        {kind: EventInputKind.Destination, indexed: true, name: 'to', type: 'address'},
        {kind: EventInputKind.Asset, indexed: true, name: 'assetId', type: 'uint256'},
        {kind: EventInputKind.Other, indexed: false, name: 'operator', type: 'address'},
        {kind: EventInputKind.Other, indexed: false, name: 'userData', type: 'bytes'},
        {kind: EventInputKind.Other, indexed: false, name: 'operatorData', type: 'bytes'},
      ],
      assetFromInputs: (inputs: any) => {
        const assetId = parseInt(inputs.assetId.toString(), 10);
        return {
          x: '0',
          y: '0',
        };
      },
    }],
  },
  hash: a => a,
};
