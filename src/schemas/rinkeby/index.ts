import { Schema } from '../../types';

import { rinkebyENSNameSchema } from './rinkebyENSName/index';
import { testRinkebyNFTSchema } from './testRinkebyNFT/index';

export const rinkebySchemas: Array<Schema<any>> = [
  testRinkebyNFTSchema,
  rinkebyENSNameSchema,
];
