import { Schema } from '../../types';

import { cryptoKittiesSchema } from './CryptoKitties/index';
import { ENSNameSchema } from './ENSName/index';

export const mainSchemas: Array<Schema<any>> = [
  cryptoKittiesSchema,
  ENSNameSchema,
];
