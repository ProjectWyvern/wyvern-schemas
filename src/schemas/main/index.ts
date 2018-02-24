import { Schema } from '../../types';

import { CryptoFightersSchema } from './CryptoFighters/index';
import { CryptoKittiesSchema } from './CryptoKitties/index';
import { CryptoMemesSchema } from './CryptoMemes/index';
import { CryptoPunksSchema } from './CryptoPunks/index';
import { DecentralandSchema } from './Decentraland/index';
import { ENSNameSchema } from './ENSName/index';
import { EtheremonSchema } from './Etheremon/index';
import { MythereumSchema } from './Mythereum/index';

export const mainSchemas: Array<Schema<any>> = [
  CryptoKittiesSchema,
  CryptoFightersSchema,
  CryptoPunksSchema,
  CryptoMemesSchema,
//  DecentralandSchema,
  ENSNameSchema,
//  EtheremonSchema,
  MythereumSchema,
];
