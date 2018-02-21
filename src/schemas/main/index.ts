import { Schema } from '../../types';

import { CryptoFightersSchema } from './CryptoFighters/index';
import { CryptoKittiesSchema } from './CryptoKitties/index';
import { CryptoPunksSchema } from './CryptoPunks/index';
// import { DecentralandSchema } from './Decentraland/index';
import { ENSNameSchema } from './ENSName/index';
import { MythereumSchema } from './Mythereum/index';

export const mainSchemas: Array<Schema<any>> = [
  CryptoKittiesSchema,
  CryptoFightersSchema,
  CryptoPunksSchema,
//  DecentralandSchema,
  ENSNameSchema,
  MythereumSchema,
];
