"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var ethereumjs_util_1 = require("ethereumjs-util");
var Web3 = require("web3");
var types_1 = require("../../../types");
var namehash = function namehash(name) {
    var node = '0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        var labels = name.split('.');
        for (var i = labels.length - 1; i >= 0; i--) {
            var labelHash = ethereumjs_util_1.sha3(labels[i]).toString('hex');
            node = ethereumjs_util_1.sha3(new Buffer(node + labelHash, 'hex')).toString('hex');
        }
    }
    return '0x' + node.toString();
};
var nodehash = function nodehash(name) {
    var label = name.split('.')[0];
    if (label) {
        return '0x' + ethereumjs_util_1.sha3(label).toString('hex');
    } else {
        return '';
    }
};
exports.ENSNameSchema = {
    version: 2,
    deploymentBlock: 3605331,
    name: 'ENSName',
    description: 'Ethereum Name Service Name (EIP 137)',
    thumbnail: 'https://ens.domains/img/ens.svg',
    website: 'https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md',
    fields: [{ name: 'Name', type: 'string', description: 'ENS Name' }, { name: 'NodeHash', type: 'bytes32', description: 'ENS Node Hash', readOnly: true }, { name: 'NameHash', type: 'bytes32', description: 'ENS Name Hash', readOnly: true }],
    unifyFields: function unifyFields(fields) {
        return {
            Name: fields.Name,
            NodeHash: nodehash(fields.Name),
            NameHash: namehash(fields.Name)
        };
    },
    assetFromFields: function assetFromFields(fields) {
        return {
            name: fields.Name,
            nodeHash: fields.NodeHash,
            nameHash: fields.NameHash
        };
    },
    checkAsset: function checkAsset(asset) {
        return asset.name ? namehash(asset.name) === asset.nameHash && nodehash(asset.name) === asset.nodeHash : true;
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt("return", {
                                thumbnail: 'https://ens.domains/img/ens.svg',
                                title: 'ENS Name ' + (asset.name ? asset.name : asset.nodeHash.slice(0, 4) + '...'),
                                description: 'ENS node ' + asset.nodeHash,
                                url: 'https://etherscan.io/enslookup?q=' + asset.name,
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
                target: '0x6090a6e47849629b7245dfa1ca21d94cd15878ef',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_hash', type: 'bytes32', value: asset.nodeHash }, { kind: types_1.FunctionInputKind.Replaceable, name: 'newOwner', type: 'address' }],
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
                target: '0x314159265dD8dbb310642f98f50C066173C1259b',
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: 'node', type: 'bytes32', value: asset.nameHash }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: '', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: []
    },
    events: {
        transfer: []
    },
    hash: function hash(a) {
        return a.nodeHash;
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map