import { Schema } from '../../types';

import { CryptoKittiesSchema } from './CryptoKitties/index';
import { CryptoFightersSchema } from './CryptoFighters/index';
import { ENSNameSchema } from './ENSName/index';

export const mainSchemas: Array<Schema<any>> = [
  CryptoKittiesSchema,
  CryptoFightersSchema,
  ENSNameSchema,
];
