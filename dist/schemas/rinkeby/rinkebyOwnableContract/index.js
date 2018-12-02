"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var types_1 = require("../../../types");
exports.rinkebyOwnableContractSchema = {
    version: 1,
    deploymentBlock: 0,
    name: 'OwnableContract',
    description: 'Rinkeby Ownable Smart Contract',
    thumbnail: 'https://i.redditmedia.com/NaFzmSbDX2T2RALMxy2tmGJN_gPVNH9lJggCKUDDqcc.jpg?w=320&s=3913239508209aaf6ba1188fe3d3b5fc',
    website: 'https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol',
    fields: [{ name: 'Name', type: 'string', description: 'Contract Name' }, { name: 'Address', type: 'address', description: 'Contract Address' }],
    assetFromFields: function assetFromFields(fields) {
        return {
            name: fields.Name,
            address: fields.Address
        };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", {
                                thumbnail: 'https://i.redditmedia.com/NaFzmSbDX2T2RALMxy2tmGJN_gPVNH9lJggCKUDDqcc.jpg?w=320&s=3913239508209aaf6ba1188fe3d3b5fc',
                                title: 'Ownable Contract: "' + asset.name + '"',
                                description: 'Ownable at address ' + asset.address,
                                url: 'https://rinkeby.etherscan.io/address/' + asset.address,
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
                name: 'transferOwnership',
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: asset.address,
                inputs: [{ kind: types_1.FunctionInputKind.Replaceable, name: 'newOwner', type: 'address' }],
                outputs: []
            };
        },
        ownerOf: function ownerOf(asset) {
            return {
                type: Web3.AbiType.Function,
                name: 'owner',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: asset.address,
                inputs: [],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: 'owner', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: []
    },
    hash: function hash(a) {
        return a.address;
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map