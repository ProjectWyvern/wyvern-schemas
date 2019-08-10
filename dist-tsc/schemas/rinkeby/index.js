"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../ContractRole/index");
const ERC1155_1 = require("../ERC1155");
const ERC20_1 = require("../ERC20");
const index_2 = require("../ERC721/index");
const index_3 = require("./rinkebyCryptoKitties/index");
const index_4 = require("./rinkebyCustom/index");
const index_5 = require("./rinkebyENSName/index");
const index_6 = require("./rinkebyENSShortNameAuction/index");
const index_7 = require("./rinkebyOwnableContract/index");
const index_8 = require("./testRinkebyNFT/index");
exports.rinkebySchemas = [
    index_3.rinkebyCryptoKittiesSchema,
    index_4.rinkebyCustomSchema,
    index_5.rinkebyENSNameSchema,
    index_6.rinkebyENSShortNameAuctionSchema,
    index_7.rinkebyOwnableContractSchema,
    index_8.testRinkebyNFTSchema,
    ERC20_1.ERC20Schema,
    index_2.ERC721Schema,
    ERC1155_1.ERC1155Schema,
    index_1.ContractRoleSchema,
];
//# sourceMappingURL=index.js.map