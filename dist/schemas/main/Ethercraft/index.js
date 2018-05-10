"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var types_1 = require("../../../types");
var AddressMap = require("./addressMap.json");
var ItemDB = require("./ethercraft.json");
var Images = require("./images.json");
ItemDB.map(function (x) {
    x.address = x.address.toLowerCase();
    var addr = AddressMap[x.address];
    if (addr) {
        x.address = addr;
    }
});
var dataOf = function dataOf(asset) {
    return ItemDB.filter(function (x) {
        return x.address.toLowerCase() === asset.toLowerCase();
    })[0];
};
var nameOf = function nameOf(asset) {
    return dataOf(asset).strings[0].name;
};
var indexOf = function indexOf(asset) {
    return ItemDB.map(function (v, i) {
        return i;
    }).filter(function (i) {
        return ItemDB[i].address.toLowerCase() === asset.toLowerCase();
    })[0];
};
var imageOf = function imageOf(asset) {
    var index = indexOf(asset);
    return Images[index];
};
var descriptionOf = function descriptionOf(asset) {
    var data = dataOf(asset);
    return data.strings[0].description;
};
var unit = '1000000000000000000'; // 10e18
var kinds = ItemDB.map(function (x) {
    return x.strings[0].name;
});
var addressByKind = function addressByKind(name) {
    return ItemDB.filter(function (x) {
        return x.strings[0].name === name;
    })[0].address;
};
exports.EthercraftSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'Ethercraft',
    description: 'A decentralized RPG running on the Ethereum blockchain.',
    thumbnail: 'https://cdn.discordapp.com/icons/400700363402903552/4f9c2076b2b8a9c0b8a57ce3ecdc57fe.png',
    website: 'https://ethercraft.io',
    fields: [{ name: 'Kind', type: 'enum', values: kinds, description: 'Kind of item.' }],
    assetFromFields: function assetFromFields(fields) {
        return addressByKind(fields.Kind);
    },
    assetToFields: function assetToFields(asset) {
        return { Kind: nameOf(asset) };
    },
    allAssets: function allAssets() {
        return ItemDB.map(function (x) {
            return x.address;
        });
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", {
                                thumbnail: imageOf(asset),
                                title: 'Ethercraft - ' + nameOf(asset),
                                description: descriptionOf(asset),
                                url: 'https://ethercraft.io/#/shop/' + indexOf(asset),
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
            return {
                type: Web3.AbiType.Function,
                name: 'transfer',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: asset,
                inputs: [{ kind: types_1.FunctionInputKind.Replaceable, name: 'to', type: 'address' }, { kind: types_1.FunctionInputKind.Asset, name: 'tokens', type: 'uint256', value: unit }],
                outputs: []
            };
        },
        countOf: function countOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'balanceOf',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: asset,
                inputs: [{ kind: types_1.FunctionInputKind.Owner, name: 'tokenOwner', type: 'address' }],
                outputs: [{ kind: types_1.FunctionOutputKind.Count, name: 'balance', type: 'uint' }],
                assetFromOutputs: function assetFromOutputs(outputs) {
                    return outputs.balance;
                }
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: []
    },
    hash: function hash(a) {
        return a;
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map