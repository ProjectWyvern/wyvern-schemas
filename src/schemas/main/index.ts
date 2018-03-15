import { Schema } from '../../types';

import { AngelBattlesSchema } from './AngelBattles/index';
import { CryptoBotsSchema } from './CryptoBots/index';
import { CryptoFightersSchema } from './CryptoFighters/index';
import { CryptoKittiesSchema } from './CryptoKitties/index';
import { CryptoMasterpiecesSchema } from './CryptoMasterpieces/index';
import { CryptoMemesSchema } from './CryptoMemes/index';
import { CryptoPunksSchema } from './CryptoPunks/index';
import { DecentralandSchema } from './Decentraland/index';
import { ENSNameSchema } from './ENSName/index';
import { EthercraftSchema } from './Ethercraft/index';
import { EtheremonSchema } from './Etheremon/index';
import { EtherTulipsSchema } from './EtherTulips/index';
import { MythereumSchema } from './Mythereum/index';
import { OwnableContractSchema } from './OwnableContract/index';

export const mainSchemas: Array<Schema<any>> = [
  AngelBattlesSchema,
  CryptoBotsSchema,
  CryptoKittiesSchema,
  CryptoFightersSchema,
  CryptoPunksSchema,
  CryptoMasterpiecesSchema,
  CryptoMemesSchema,
//  DecentralandSchema,
  ENSNameSchema,
  EthercraftSchema,
  EtheremonSchema,
  EtherTulipsSchema,
  MythereumSchema,
  OwnableContractSchema,
];
