"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var typed_promisify_1 = require("typed-promisify");
var Web3 = require("web3");
var types_1 = require("../../../types");
exports.DecentralandSchema = {
    version: 1,
    deploymentBlock: 4944642,
    name: 'Decentraland',
    description: 'A virtual world that runs on open standards.',
    thumbnail: 'https://decentraland.org/images/logo-65f7b27caf.png',
    website: 'https://decentraland.org/',
    fields: [{ name: 'X', type: 'int', description: 'Parcel x-coordinate' }, { name: 'Y', type: 'int', description: 'Parcel y-coordinate' }],
    assetFromFields: function assetFromFields(fields) {
        return { x: fields.X, y: fields.Y };
    },
    assetToFields: function assetToFields(asset) {
        return { X: asset.x, Y: asset.y };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            var districtResponse, districts, assetResponse, assetData, district;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return axios_1.default.get("https://api.land.decentraland.org/api/districts");

                        case 2:
                            districtResponse = _context.sent;
                            districts = districtResponse.data.data;
                            _context.next = 6;
                            return axios_1.default.get("https://api.land.decentraland.org/api/parcels?nw=" + asset.x + "," + asset.y + "&se=" + asset.x + "," + asset.y);

                        case 6:
                            assetResponse = _context.sent;
                            assetData = assetResponse.data.data[0];
                            district = 'None';

                            if (assetData.district_id !== null) {
                                district = districts.filter(function (d) {
                                    return d.id === assetData.district_id;
                                })[0].name;
                            }
                            return _context.abrupt("return", {
                                thumbnail: 'https://decentraland.org/images/logo-65f7b27caf.png',
                                title: 'Decentraland Parcel at ' + asset.x + ',' + asset.y,
                                description: 'District: ' + district,
                                url: 'https://land.decentraland.org/' + asset.x + '/' + asset.y,
                                properties: []
                            });

                        case 11:
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
                name: 'transferLand',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: 'x', type: 'int256', value: asset.x }, { kind: types_1.FunctionInputKind.Asset, name: 'y', type: 'int256', value: asset.y }, { kind: types_1.FunctionInputKind.Replaceable, name: 'to', type: 'address' }],
                outputs: []
            };
        },
        ownerOf: function ownerOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'ownerOfLand',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: 'x', type: 'int256', value: asset.x }, { kind: types_1.FunctionInputKind.Asset, name: 'y', type: 'int256', value: asset.y }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: '', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: [{
            type: Web3.AbiType.Event,
            name: 'Transfer',
            target: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
            anonymous: false,
            inputs: [{ kind: types_1.EventInputKind.Source, indexed: true, name: 'from', type: 'address' }, { kind: types_1.EventInputKind.Destination, indexed: true, name: 'to', type: 'address' }, { kind: types_1.EventInputKind.Asset, indexed: true, name: 'assetId', type: 'uint256' }, { kind: types_1.EventInputKind.Other, indexed: false, name: 'operator', type: 'address' }, { kind: types_1.EventInputKind.Other, indexed: false, name: 'userData', type: 'bytes' }, { kind: types_1.EventInputKind.Other, indexed: false, name: 'operatorData', type: 'bytes' }],
            assetFromInputs: function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs, web3) {
                    var decodeABI, contract, res;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    decodeABI = { 'constant': true, 'inputs': [{ 'name': 'value', 'type': 'uint256' }], 'name': 'decodeTokenId', 'outputs': [{ 'name': '', 'type': 'int256' }, { 'name': '', 'type': 'int256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                                    contract = web3.eth.contract([decodeABI]).at('0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d');
                                    _context2.next = 4;
                                    return typed_promisify_1.promisify(contract.decodeTokenId.call)(inputs.assetId);

                                case 4:
                                    res = _context2.sent;
                                    return _context2.abrupt("return", {
                                        x: res[0].toString(),
                                        y: res[1].toString()
                                    });

                                case 6:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, undefined);
                }));

                function assetFromInputs(_x2, _x3) {
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