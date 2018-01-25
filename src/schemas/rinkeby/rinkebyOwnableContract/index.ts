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

export interface RinkebyOwnableContractType {
  name?: string;
  address: string;
}

export const rinkebyOwnableContractSchema: Schema<RinkebyOwnableContractType> = {
  name: 'RinkebyOwnableContract',
  description: 'Rinkeby Ownable Smart Contract',
  thumbnail: 'https://i.redditmedia.com/NaFzmSbDX2T2RALMxy2tmGJN_gPVNH9lJggCKUDDqcc.jpg?w=320&s=3913239508209aaf6ba1188fe3d3b5fc',
  website: 'https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol',
  fields: [
    {name: 'Name', type: 'string', description: 'Contract Name'},
    {name: 'Address', type: 'address', description: 'Contract Address'},
  ],
  nftFromFields: (fields: any) => ({
    name: fields.Name,
    address: fields.Address,
  }),
  formatter:
    nft => {
      return {
        thumbnail: 'https://i.redditmedia.com/NaFzmSbDX2T2RALMxy2tmGJN_gPVNH9lJggCKUDDqcc.jpg?w=320&s=3913239508209aaf6ba1188fe3d3b5fc',
        title: 'Ownable Contract: "' + nft.name + '"',
        description: 'Ownable at address ' + nft.address,
        url: 'https://etherscan.io/address/' + nft.address,
      };
  },
  functions: {
    transfer: nft => ({
      type: Web3.AbiType.Function,
      name: 'transferOwnership',
      payable: false,
      constant: false,
      stateMutability: StateMutability.Nonpayable,
      target: nft.address,
      inputs: [
        {kind: FunctionInputKind.Replaceable, name: 'newOwner', type: 'address'},
      ],
      outputs: [],
    }),
    ownerOf: nft => ({
      type: Web3.AbiType.Function,
      name: 'owner',
      payable: false,
      constant: true,
      stateMutability: StateMutability.View,
      target: nft.address,
      inputs: [],
      outputs: [
        {kind: FunctionOutputKind.Owner, name: 'owner', type: 'address'},
      ],
    }),
  },
  events: {},
};
