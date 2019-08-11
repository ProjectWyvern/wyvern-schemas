"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rinkebyCustomSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'RinkebyCustom',
    description: 'Rinkeby Custom (manual ABI specification)',
    thumbnail: 'https://d30y9cdsu7xlg0.cloudfront.net/png/45447-200.png',
    website: 'https://github.com/projectwyvern/wyvern-schemas',
    fields: [
        { name: 'Name', type: 'string', description: 'Name of Asset' },
        { name: 'Description', type: 'string', description: 'Description of Asset' },
        { name: 'Thumbnail', type: 'string', description: 'URL of asset thumbnail image' },
        { name: 'URL', type: 'string', description: 'URL of asset' },
        { name: 'Transfer', type: 'abi', description: 'ABI of transfer function' },
    ],
    assetFromFields: (fields) => ({
        name: fields.Name,
        description: fields.Description,
        thumbnail: fields.Thumbnail,
        url: fields.URL,
        transfer: fields.Transfer,
    }),
    formatter: (asset) => __awaiter(this, void 0, void 0, function* () {
        return {
            thumbnail: asset.thumbnail,
            title: asset.name,
            description: asset.description,
            url: asset.url,
            properties: [],
        };
    }),
    functions: {
        transfer: asset => asset.transfer,
        assetsOfOwnerByIndex: [],
    },
    events: {
        transfer: [],
    },
    hash: a => JSON.stringify(a),
};
//# sourceMappingURL=index.js.map