import { AbiType } from 'web3';

import { ENSName, ENSNameBaseSchema } from '../../../common/ens';
import {
  EventInputKind,
  FunctionInputKind,
  Schema,
  StateMutability,
} from '../../../types';

export const RINKEBY_ENS_SHORT_NAME_AUCTION_ADDRESS =
  '0x266ebd3ca5b8c472da228df3f7ab2cc951b19ec3';

export const rinkebyENSShortNameAuctionSchema: Schema<ENSName> = {
  ...ENSNameBaseSchema,
  version: 0,
  deploymentBlock: 4791629,
  name: 'ENSShortNameAuction',
  description: 'ERC721 ENS short (3-6 character) names sold via auction.',
  thumbnail: '', // TODO: put SVG body directly here or host a PNG ourselves?
  website: 'https://ens.domains/',
  formatter: async ({ name }) => {
    return {
      title: 'ENS Short Name: ' + name,
      description: '',
      url: '',
      thumbnail: '',
      properties: [],
    };
  },
  functions: {
    transfer: ({ name }) => ({
      type: AbiType.Function,
      name: 'register',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: RINKEBY_ENS_SHORT_NAME_AUCTION_ADDRESS,
      inputs: [
        {
          kind: FunctionInputKind.Data,
          name: 'name',
          type: 'string',
          value: name,
        },
        { kind: FunctionInputKind.Replaceable, name: 'owner', type: 'address' },
      ],
      outputs: [],
    }),
    assetsOfOwnerByIndex: [],
  },
  events: {
    transfer: [
      {
        type: AbiType.Event,
        name: 'NameRegistered',
        target: RINKEBY_ENS_SHORT_NAME_AUCTION_ADDRESS,
        anonymous: false,
        inputs: [
          {
            kind: EventInputKind.Asset,
            indexed: false,
            name: 'name',
            type: 'string',
          },
          {
            kind: EventInputKind.Destination,
            indexed: false,
            name: 'owner',
            type: 'address',
          },
        ],
        assetFromInputs: async (inputs: any) => inputs.name,
      },
    ],
  },
};
