"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../ContractRole/index");
const ERC1155_1 = require("../ERC1155");
const ERC20_1 = require("../ERC20");
const index_2 = require("../ERC721/index");
const index_3 = require("./CryptoKitties/index");
const index_4 = require("./CryptoPunks/index");
const EnjinItem_1 = require("./EnjinItem");
const index_5 = require("./ENSName/index");
const index_6 = require("./ENSShortNameAuction/index");
const index_7 = require("./OwnableContract/index");
exports.mainSchemas = [
    index_3.CryptoKittiesSchema,
    index_4.CryptoPunksSchema,
    index_5.ENSNameSchema,
    index_6.ENSShortNameAuctionSchema,
    index_7.OwnableContractSchema,
    ERC20_1.ERC20Schema,
    index_2.ERC721Schema,
    ERC1155_1.ERC1155Schema,
    EnjinItem_1.EnjinItemSchema,
    index_1.ContractRoleSchema,
];
//# sourceMappingURL=index.js.map