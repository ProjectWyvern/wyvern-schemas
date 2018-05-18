"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var typed_promisify_1 = require("typed-promisify");
var Web3 = require("web3");
var types_1 = require("../../../types");
var MonsterData = require("./monsterdata.json");
var Types = require("./types.json");
exports.ChainMonstersSchema = {
    version: 2,
    deploymentBlock: 5106855,
    name: 'ChainMonsters',
    description: '100% blockchain based monster collectible game',
    thumbnail: 'https://cdn-images-1.medium.com/fit/c/90/90/1*xthSZXBLKxsSGkLz1FWyFg.png',
    website: 'https://chainmonsters.io/',
    fields: [{ name: 'ID', type: 'uint256', description: 'ChainMonster number.' }],
    assetFromFields: function assetFromFields(fields) {
        return fields.ID;
    },
    assetToFields: function assetToFields(asset) {
        return { ID: asset };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset, web3) {
            var abi, contract, data, generation, stats, mID, monster, type;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            abi = { 'constant': true, 'inputs': [{ 'name': '_id', 'type': 'uint256' }], 'name': 'getMonster', 'outputs': [{ 'name': 'birthTime', 'type': 'uint256' }, { 'name': 'generation', 'type': 'uint256' }, { 'name': 'stats', 'type': 'uint8[8]' }, { 'name': 'mID', 'type': 'uint256' }, { 'name': 'tradeable', 'type': 'bool' }, { 'name': 'uID', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            contract = web3.eth.contract([abi]).at('0xf7f6c2836293a661be2690fbacae97f3f027e9c4');
                            _context.next = 4;
                            return typed_promisify_1.promisify(contract[abi.name].call)(asset);

                        case 4:
                            data = _context.sent;
                            generation = data[1];
                            stats = data[2];
                            mID = data[3];
                            monster = MonsterData[mID.toString()];
                            type = Types[stats[6].toString()];
                            return _context.abrupt("return", {
                                thumbnail: 'https://chainmonsters.io/assets/monsters/' + mID + '.png',
                                title: 'ChainMonster #' + asset + ' - ' + monster.name,
                                description: 'Type: ' + type.name + ', HP ' + stats[0] + ', Attack ' + stats[1] + ', Defense ' + stats[2] + ', Special Attack ' + stats[3] + ', Special Defense ' + stats[4] + ', Speed ' + stats[5],
                                url: 'https://chainmonsters.io/monster/' + asset,
                                properties: []
                            });

                        case 11:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function formatter(_x, _x2) {
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
                target: '0xf7f6c2836293a661be2690fbacae97f3f027e9c4',
                inputs: [{ kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' }, { kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset }],
                outputs: []
            };
        },
        ownerOf: function ownerOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'ownerOf',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: '0xf7f6c2836293a661be2690fbacae97f3f027e9c4',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_deedId', type: 'uint256', value: asset }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: '_owner', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: [{
            type: Web3.AbiType.Event,
            name: 'Transfer',
            target: '0xf7f6c2836293a661be2690fbacae97f3f027e9c4',
            anonymous: false,
            inputs: [{ kind: types_1.EventInputKind.Source, indexed: false, name: 'from', type: 'address' }, { kind: types_1.EventInputKind.Destination, indexed: false, name: 'to', type: 'address' }, { kind: types_1.EventInputKind.Asset, indexed: false, name: 'tokenId', type: 'uint256' }],
            assetFromInputs: function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", inputs.tokenId);

                                case 1:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, undefined);
                }));

                function assetFromInputs(_x3) {
                    return _ref2.apply(this, arguments);
                }

                return assetFromInputs;
            }()
        }]
    },
    hash: function hash(a) {
        return a;
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map