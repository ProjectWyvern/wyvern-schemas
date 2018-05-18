import { Schema } from '../../types';

import { AngelBattlesSchema } from './AngelBattles/index';
import { ChainMonstersSchema } from './ChainMonsters/index';
import { CryptoBotsSchema } from './CryptoBots/index';
import { CryptoFightersSchema } from './CryptoFighters/index';
import { CryptoHorseSchema } from './CryptoHorse/index';
import { CryptoKittiesSchema } from './CryptoKitties/index';
import { CryptoMasterpiecesSchema } from './CryptoMasterpieces/index';
import { CryptoMemesSchema } from './CryptoMemes/index';
import { CryptoPunksSchema } from './CryptoPunks/index';
import { ENSNameSchema } from './ENSName/index';
import { ERC721v1 } from './ERC721v1/index';
import { EthercraftSchema } from './Ethercraft/index';
import { EtheremonSchema } from './Etheremon/index';
import { EtherTulipsSchema } from './EtherTulips/index';
import { MythereumSchema } from './Mythereum/index';
import { OwnableContractSchema } from './OwnableContract/index';

export const mainSchemas: Array<Schema<any>> = [
  AngelBattlesSchema,
  ChainMonstersSchema,
  CryptoBotsSchema,
  CryptoKittiesSchema,
  CryptoHorseSchema,
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
  ERC721v1,
];
