import { sha3 } from 'ethereumjs-util';

import { Schema } from '../types';

export interface ENSName {
  nodeHash: string;
  nameHash?: string;
  name?: string;
}

export const namehash = (name: string) => {
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

export const nodehash = (name: string) => {
  const label = name.split('.')[0];
  if (label) {
    return '0x' + sha3(label).toString('hex');
  } else {
    return '';
  }
};

export const ENSNameBaseSchema: Required<
  Pick<
    Schema<ENSName>,
    'fields' | 'unifyFields' | 'assetFromFields' | 'checkAsset'
  >
> = {
  fields: [
    { name: 'Name', type: 'string', description: 'ENS Name' },
    {
      name: 'NodeHash',
      type: 'bytes32',
      description: 'ENS Node Hash',
      readOnly: true,
    },
    {
      name: 'NameHash',
      type: 'bytes32',
      description: 'ENS Name Hash',
      readOnly: true,
    },
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
  checkAsset: (asset: ENSName) => {
    return asset.name
      ? namehash(asset.name) === asset.nameHash &&
          nodehash(asset.name) === asset.nodeHash
      : true;
  },
};
