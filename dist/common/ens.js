"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ethereumjs_util_1 = require("ethereumjs-util");
exports.namehash = function (name) {
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
exports.nodehash = function (name) {
    var label = name.split('.')[0];
    if (label) {
        return '0x' + ethereumjs_util_1.sha3(label).toString('hex');
    } else {
        return '';
    }
};
exports.ENSNameBaseSchema = {
    fields: [{ name: 'Name', type: 'string', description: 'ENS Name' }, {
        name: 'NodeHash',
        type: 'bytes32',
        description: 'ENS Node Hash',
        readOnly: true
    }, {
        name: 'NameHash',
        type: 'bytes32',
        description: 'ENS Name Hash',
        readOnly: true
    }],
    assetFromFields: function assetFromFields(fields) {
        return {
            id: fields.ID,
            address: fields.Address,
            name: fields.Name,
            nodeHash: exports.nodehash(fields.Name),
            nameHash: exports.namehash(fields.Name)
        };
    },
    checkAsset: function checkAsset(asset) {
        return asset.name ? exports.namehash(asset.name) === asset.nameHash && exports.nodehash(asset.name) === asset.nodeHash : true;
    },
    hash: function hash(_ref) {
        var nodeHash = _ref.nodeHash;
        return nodeHash;
    }
};
//# sourceMappingURL=ens.js.map
//# sourceMappingURL=ens.js.map