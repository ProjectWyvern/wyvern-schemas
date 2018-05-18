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
var Names = require("./names.json");
var Thumbnails = require("./thumbnails.json");
exports.EtheremonSchema = {
    version: 2,
    deploymentBlock: 4946456,
    name: 'Etheremon',
    description: 'Decentralized World of Ether Monsters',
    thumbnail: 'https://cdn-images-1.medium.com/max/720/1*SvU1GenU55qO0eNNiTWGtA.png',
    website: 'https://www.etheremon.com/',
    fields: [{ name: 'ID', type: 'uint64', description: 'Etheremon ID.' }],
    assetFromFields: function assetFromFields(fields) {
        return fields.ID;
    },
    assetToFields: function assetToFields(asset) {
        return { ID: asset };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset, web3) {
            var getMonsterObjABI, getMonsterNameABI, dataContract, res, objId, classId, trainer, exp, createIndex, lastClaimIndex, createTime, className, name;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            getMonsterObjABI = { 'constant': true, 'inputs': [{ 'name': '_objId', 'type': 'uint64' }], 'name': 'getMonsterObj', 'outputs': [{ 'name': 'objId', 'type': 'uint64' }, { 'name': 'classId', 'type': 'uint32' }, { 'name': 'trainer', 'type': 'address' }, { 'name': 'exp', 'type': 'uint32' }, { 'name': 'createIndex', 'type': 'uint32' }, { 'name': 'lastClaimIndex', 'type': 'uint32' }, { 'name': 'createTime', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            getMonsterNameABI = { 'constant': true, 'inputs': [{ 'name': '_objId', 'type': 'uint64' }], 'name': 'getMonsterName', 'outputs': [{ 'name': 'name', 'type': 'string' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            dataContract = web3.eth.contract([getMonsterObjABI, getMonsterNameABI]).at('0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e');
                            _context.next = 5;
                            return typed_promisify_1.promisify(dataContract.getMonsterObj.call)(asset);

                        case 5:
                            res = _context.sent;
                            objId = res[0];
                            classId = res[1];
                            trainer = res[2];
                            exp = res[3];
                            createIndex = res[4];
                            lastClaimIndex = res[5];
                            createTime = res[6];
                            className = Names[classId];
                            _context.next = 16;
                            return typed_promisify_1.promisify(dataContract.getMonsterName.call)(asset);

                        case 16:
                            name = _context.sent;
                            return _context.abrupt("return", {
                                thumbnail: 'https://www.etheremon.com/' + Thumbnails[classId] + '.png',
                                title: 'Etheremon #' + asset + ' - ' + className,
                                description: 'Catch number: ' + createIndex + ', experience: ' + exp + ', nickname: ' + name,
                                url: 'https://www.etheremon.com/#/mons/' + classId,
                                properties: []
                            });

                        case 18:
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
                name: 'freeTransferItem',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_objId', type: 'uint64', value: asset }, { kind: types_1.FunctionInputKind.Replaceable, name: '_receiver', type: 'address' }],
                outputs: []
            };
        },
        ownerOf: function ownerOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'getMonsterObj',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: '0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_objId', type: 'uint64', value: asset }],
                outputs: [{ kind: types_1.FunctionOutputKind.Other, name: 'objId', type: 'uint64' }, { kind: types_1.FunctionOutputKind.Other, name: 'classId', type: 'uint32' }, { kind: types_1.FunctionOutputKind.Owner, name: 'trainer', type: 'address' }, { kind: types_1.FunctionOutputKind.Other, name: 'exp', type: 'uint32' }, { kind: types_1.FunctionOutputKind.Other, name: 'createIndex', type: 'uint32' }, { kind: types_1.FunctionOutputKind.Other, name: 'lastClaimIndex', type: 'uint32' }, { kind: types_1.FunctionOutputKind.Other, name: 'createTime', type: 'uint' }]
            };
        },
        assetsOfOwnerByIndex: [{
            type: Web3.AbiType.Function,
            name: 'getMonsterObjId',
            payable: false,
            constant: true,
            stateMutability: types_1.StateMutability.View,
            target: '0xabc1c404424bdf24c19a5cc5ef8f47781d18eb3e',
            inputs: [{ kind: types_1.FunctionInputKind.Owner, name: '_trainer', type: 'address' }, { kind: types_1.FunctionInputKind.Index, name: 'index', type: 'uint256' }],
            outputs: [{ kind: types_1.FunctionOutputKind.Asset, name: '', type: 'uint64' }],
            assetFromOutputs: function assetFromOutputs(output) {
                var str = output.toString();
                if (str === '0') {
                    return null;
                } else {
                    return str;
                }
            }
        }]
    },
    events: {
        transfer: [{
            type: Web3.AbiType.Event,
            name: 'EventFreeTransferItem',
            target: '0x4bA72F0F8DAd13709EE28a992869E79d0fE47030',
            anonymous: false,
            inputs: [{ kind: types_1.EventInputKind.Source, indexed: true, name: 'sender', type: 'address' }, { kind: types_1.EventInputKind.Destination, indexed: true, name: 'receiver', type: 'address' }, { kind: types_1.EventInputKind.Asset, indexed: false, name: 'objId', type: 'uint64' }],
            assetFromInputs: function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", inputs.objId);

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