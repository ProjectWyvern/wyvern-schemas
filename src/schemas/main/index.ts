import { Schema } from '../../types';
import { ContractRoleSchema } from '../ContractRole/index';
import { ERC1155Schema } from '../ERC1155';
import { ERC20Schema } from '../ERC20';
import { ERC721Schema } from '../ERC721/index';

import { AngelBattlesSchema } from './AngelBattles/index';
import { ChainMonstersSchema } from './ChainMonsters/index';
import { CryptoBotsSchema } from './CryptoBots/index';
import { CryptoFightersSchema } from './CryptoFighters/index';
import { CryptoHorseSchema } from './CryptoHorse/index';
import { CryptoKittiesSchema } from './CryptoKitties/index';
import { CryptoMasterpiecesSchema } from './CryptoMasterpieces/index';
import { CryptoMemesSchema } from './CryptoMemes/index';
import { CryptoPunksSchema } from './CryptoPunks/index';
import { EnjinItemSchema } from './EnjinItem';
import { ENSNameSchema } from './ENSName/index';
import { ENSShortNameAuctionSchema } from './ENSShortNameAuction/index';
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
  ENSNameSchema,
  ENSShortNameAuctionSchema,
  EthercraftSchema,
  EtheremonSchema,
  EtherTulipsSchema,
  MythereumSchema,
  OwnableContractSchema,
  ERC20Schema,
  ERC721Schema,
  ERC1155Schema,
  EnjinItemSchema,
  ContractRoleSchema,
];
