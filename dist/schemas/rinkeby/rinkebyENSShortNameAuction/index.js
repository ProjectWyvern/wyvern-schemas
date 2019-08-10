"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = require("web3");
var ens_1 = require("../../../common/ens");
var types_1 = require("../../../types");
exports.RINKEBY_ENS_SHORT_NAME_AUCTION_ADDRESS = '0x76b6481a334783be36f2fc35b8f0b9bc7835d57b';
exports.rinkebyENSShortNameAuctionSchema = (0, _assign2.default)({}, ens_1.ENSNameBaseSchema, { version: 0, deploymentBlock: 4791629, name: 'ENSShortNameAuction', description: 'ERC721 ENS short (3-6 character) names sold via auction.', thumbnail: '', website: 'https://ens.domains/', formatter: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
            var name = _ref.name;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", {
                                title: 'ENS Short Name: ' + name,
                                description: '',
                                url: '',
                                thumbnail: '',
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
            return _ref2.apply(this, arguments);
        }

        return formatter;
    }(), functions: {
        transfer: function transfer(_ref3) {
            var name = _ref3.name;
            return {
                type: web3_1.AbiType.Function,
                name: 'register',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: exports.RINKEBY_ENS_SHORT_NAME_AUCTION_ADDRESS,
                inputs: [{
                    kind: types_1.FunctionInputKind.Data,
                    name: 'name',
                    type: 'string',
                    value: name
                }, { kind: types_1.FunctionInputKind.Replaceable, name: 'owner', type: 'address' }],
                outputs: []
            };
        },
        assetsOfOwnerByIndex: []
    }, events: {
        transfer: [{
            type: web3_1.AbiType.Event,
            name: 'NameRegistered',
            target: exports.RINKEBY_ENS_SHORT_NAME_AUCTION_ADDRESS,
            anonymous: false,
            inputs: [{
                kind: types_1.EventInputKind.Asset,
                indexed: false,
                name: 'name',
                type: 'string'
            }, {
                kind: types_1.EventInputKind.Destination,
                indexed: false,
                name: 'owner',
                type: 'address'
            }],
            assetFromInputs: function () {
                var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inputs) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", {
                                        name: inputs.name,
                                        nodeHash: ens_1.nodehash(inputs.name),
                                        nameHash: ens_1.namehash(inputs.name)
                                    });

                                case 1:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, undefined);
                }));

                function assetFromInputs(_x2) {
                    return _ref4.apply(this, arguments);
                }

                return assetFromInputs;
            }()
        }]
    } });
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map