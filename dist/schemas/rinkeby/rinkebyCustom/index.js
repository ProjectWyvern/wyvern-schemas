"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
exports.rinkebyCustomSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'RinkebyCustom',
    description: 'Rinkeby Custom (manual ABI specification)',
    thumbnail: 'https://d30y9cdsu7xlg0.cloudfront.net/png/45447-200.png',
    website: 'https://github.com/projectwyvern/wyvern-schemas',
    fields: [{ name: 'Name', type: 'string', description: 'Name of Asset' }, { name: 'Description', type: 'string', description: 'Description of Asset' }, { name: 'Thumbnail', type: 'string', description: 'URL of asset thumbnail image' }, { name: 'URL', type: 'string', description: 'URL of asset' }, { name: 'Transfer', type: 'abi', description: 'ABI of transfer function' }],
    assetFromFields: function assetFromFields(fields) {
        return {
            name: fields.Name,
            description: fields.Description,
            thumbnail: fields.Thumbnail,
            url: fields.URL,
            transfer: fields.Transfer
        };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", {
                                thumbnail: asset.thumbnail,
                                title: asset.name,
                                description: asset.description,
                                url: asset.url,
                                properties: []
                            });

                        case 1:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function formatter(_x) {
            return _ref.apply(this, arguments);
        }

        return formatter;
    }(),
    functions: {
        transfer: function transfer(asset) {
            return asset.transfer;
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: []
    },
    hash: function hash(a) {
        return (0, _stringify2.default)(a);
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map