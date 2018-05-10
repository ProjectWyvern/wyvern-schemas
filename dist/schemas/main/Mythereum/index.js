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
exports.MythereumSchema = {
    version: 2,
    deploymentBlock: 5033489,
    name: 'Mythereum',
    description: 'Fantastically Distributed Collectible Card Game',
    thumbnail: 'https://www.mythereum.io/three-cards.png',
    website: 'https://www.mythereum.io/',
    fields: [{ name: 'ID', type: 'uint256', description: 'Mythereum card number.' }],
    assetFromFields: function assetFromFields(fields) {
        return fields.ID;
    },
    assetToFields: function assetToFields(asset) {
        return { ID: asset };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset, web3) {
            var cardsABI, abilitiesABI, contract, res, name, classId, classVariant, damagePoints, shieldPoints, abilityId, ares, abilityName;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            cardsABI = { 'constant': true, 'inputs': [{ 'name': '', 'type': 'uint256' }], 'name': 'cards', 'outputs': [{ 'name': 'name', 'type': 'string' }, { 'name': 'class', 'type': 'uint8' }, { 'name': 'classVariant', 'type': 'uint8' }, { 'name': 'damagePoints', 'type': 'uint8' }, { 'name': 'shieldPoints', 'type': 'uint8' }, { 'name': 'abilityId', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            abilitiesABI = { 'constant': true, 'inputs': [{ 'name': '', 'type': 'uint256' }], 'name': 'abilities', 'outputs': [{ 'name': 'name', 'type': 'string' }, { 'name': 'canBeBlocked', 'type': 'bool' }, { 'name': 'blackMagicCost', 'type': 'uint8' }, { 'name': 'grayMagicCost', 'type': 'uint8' }, { 'name': 'whiteMagicCost', 'type': 'uint8' }, { 'name': 'addedDamage', 'type': 'uint256' }, { 'name': 'addedShield', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            contract = web3.eth.contract([cardsABI, abilitiesABI]).at('0xa67aac23549f4c672256b59b43ab0bacfcfcd498');
                            _context.next = 5;
                            return typed_promisify_1.promisify(contract.cards.call)(asset);

                        case 5:
                            res = _context.sent;
                            name = res[0];
                            classId = res[1];
                            classVariant = res[2];
                            damagePoints = res[3];
                            shieldPoints = res[4];
                            abilityId = res[5];
                            _context.next = 14;
                            return typed_promisify_1.promisify(contract.abilities.call)(abilityId);

                        case 14:
                            ares = _context.sent;
                            abilityName = ares[0];
                            return _context.abrupt("return", {
                                thumbnail: 'https://www.mythereum.io/' + classId + '_' + classVariant + '.png',
                                title: 'Mythereum #' + asset + ' - ' + name,
                                description: 'Ability ' + abilityName + ' / Damage ' + damagePoints + ' / Shield ' + shieldPoints,
                                url: 'https://www.mythereum.io/',
                                properties: []
                            });

                        case 17:
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
                target: '0xa67aac23549f4c672256b59b43ab0bacfcfcd498',
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
                target: '0xa67aac23549f4c672256b59b43ab0bacfcfcd498',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: '', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: [{
            type: Web3.AbiType.Event,
            name: 'Transfer',
            target: '0xa67aac23549f4c672256b59b43ab0bacfcfcd498',
            anonymous: false,
            inputs: [{ kind: types_1.EventInputKind.Source, indexed: true, name: '_from', type: 'address' }, { kind: types_1.EventInputKind.Destination, indexed: true, name: '_to', type: 'address' }, { kind: types_1.EventInputKind.Asset, indexed: false, name: '_tokenId', type: 'uint256' }],
            assetFromInputs: function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", inputs._tokenId);

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