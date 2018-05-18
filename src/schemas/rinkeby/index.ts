import { Schema } from '../../types';

import { rinkebyCryptoKittiesSchema } from './rinkebyCryptoKitties/index';
import { rinkebyCustomSchema } from './rinkebyCustom/index';
import { rinkebyENSNameSchema } from './rinkebyENSName/index';
import { rinkebyOwnableContractSchema } from './rinkebyOwnableContract/index';
import { testRinkebyNFTSchema } from './testRinkebyNFT/index';
import { ERC721v1Schema } from '../main/ERC721v1/index';

export const rinkebySchemas: Array<Schema<any>> = [
  rinkebyCryptoKittiesSchema,
  rinkebyCustomSchema,
  rinkebyENSNameSchema,
  rinkebyOwnableContractSchema,
  testRinkebyNFTSchema,
  ERC721v1Schema,
];
