import { Schema } from '../../types';

import { CryptoFightersSchema } from './CryptoFighters/index';
import { CryptoKittiesSchema } from './CryptoKitties/index';
import { ENSNameSchema } from './ENSName/index';
import { MythereumSchema } from './Mythereum/index';

export const mainSchemas: Array<Schema<any>> = [
  CryptoKittiesSchema,
  CryptoFightersSchema,
  ENSNameSchema,
  MythereumSchema,
];
