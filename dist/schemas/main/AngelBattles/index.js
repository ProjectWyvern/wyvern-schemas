"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _targets, _dataTargets, _transferNames, _assetNames, _assetTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var typed_promisify_1 = require("typed-promisify");
var Web3 = require("web3");
var types_1 = require("../../../types");
var Kind;
(function (Kind) {
    Kind["Angel"] = "Angel";
    Kind["Pet"] = "Pet";
    Kind["Accessory"] = "Accessory";
})(Kind = exports.Kind || (exports.Kind = {}));
var targets = (_targets = {}, (0, _defineProperty3.default)(_targets, Kind.Angel, '0x0c47E8028D5452fcc1aD577B3212C1E63DE72b50'), (0, _defineProperty3.default)(_targets, Kind.Pet, '0x5ee9bc8a2b2baa393706ba3f3268135663a626a1'), (0, _defineProperty3.default)(_targets, Kind.Accessory, '0x11b4591dc55d0fb44ce2ab7abe5536ab6e19cf78'), _targets);
var dataTargets = (_dataTargets = {}, (0, _defineProperty3.default)(_dataTargets, Kind.Angel, '0x6d2e76213615925c5fc436565b5ee788ee0e86dc'), (0, _defineProperty3.default)(_dataTargets, Kind.Pet, '0xB340686da996b8B3d486b4D27E38E38500A9E926'), (0, _defineProperty3.default)(_dataTargets, Kind.Accessory, '0x466c44812835f57b736ef9f63582b8a6693a14d0'), _dataTargets);
var transferNames = (_transferNames = {}, (0, _defineProperty3.default)(_transferNames, Kind.Angel, 'ownerAngelTransfer'), (0, _defineProperty3.default)(_transferNames, Kind.Pet, 'transfer'), (0, _defineProperty3.default)(_transferNames, Kind.Accessory, 'ownerAccessoryTransfer'), _transferNames);
var assetNames = (_assetNames = {}, (0, _defineProperty3.default)(_assetNames, Kind.Angel, '_angelId'), (0, _defineProperty3.default)(_assetNames, Kind.Pet, '_petId'), (0, _defineProperty3.default)(_assetNames, Kind.Accessory, '__accessoryId'), _assetNames);
var assetTypes = (_assetTypes = {}, (0, _defineProperty3.default)(_assetTypes, Kind.Angel, 'uint64'), (0, _defineProperty3.default)(_assetTypes, Kind.Pet, 'uint256'), (0, _defineProperty3.default)(_assetTypes, Kind.Accessory, 'uint64'), _assetTypes);
// @ts-ignore
exports.AngelBattlesSchema = {
    version: 6,
    deploymentBlock: 0,
    name: 'AngelBattles',
    description: 'Collect angel, pet, and accessory cards',
    thumbnail: 'https://www.angelbattles.com/images/Site/Logo.png',
    website: 'https://www.angelbattles.com/',
    fields: [{ name: 'Kind', type: 'enum', values: ['Angel', 'Pet', 'Accessory'], description: 'Kind of AngelBattles asset.' }, { name: 'ID', type: 'uint', description: 'Angel ID.' }],
    assetFromFields: function assetFromFields(fields) {
        return { id: fields.ID, kind: fields.Kind };
    },
    assetToFields: function assetToFields(asset) {
        return { ID: asset.id, Kind: asset.kind };
    },
    formatter: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(asset, web3) {
            var imageResponse, imagesSvg, getAngelABI, contract, res, angelId, angelCardSeriesId, battlePower, aura, experience, price, owner, angelThumbnail, angelName, angelMatching, getPetABI, petContract, petRes, petId, petCardSeriesId, luck, auraRed, auraBlue, auraYellow, petOwner, petThumbnail, petName, petMatching, getAccessoryABI, accessoryContract, accessoryRes, accessoryId, accessorySeriesId, accessoryOwner, accessoryThumbnail, accessoryName, accessoryMatching;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return axios_1.default.get('https://www.angelbattles.com/api/imagesSvg');

                        case 2:
                            imageResponse = _context.sent;
                            imagesSvg = imageResponse.data;
                            _context.t0 = asset.kind;
                            _context.next = _context.t0 === Kind.Angel ? 7 : _context.t0 === Kind.Pet ? 24 : _context.t0 === Kind.Accessory ? 41 : 54;
                            break;

                        case 7:
                            getAngelABI = { 'constant': true, 'inputs': [{ 'name': '_angelId', 'type': 'uint64' }], 'name': 'getAngel', 'outputs': [{ 'name': 'angelId', 'type': 'uint64' }, { 'name': 'angelCardSeriesId', 'type': 'uint8' }, { 'name': 'battlePower', 'type': 'uint16' }, { 'name': 'aura', 'type': 'uint8' }, { 'name': 'experience', 'type': 'uint16' }, { 'name': 'price', 'type': 'uint256' }, { 'name': 'owner', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            contract = web3.eth.contract([getAngelABI]).at(targets[Kind.Angel]);
                            _context.next = 11;
                            return typed_promisify_1.promisify(contract.getAngel.call)(asset.id);

                        case 11:
                            res = _context.sent;
                            angelId = res[0];
                            angelCardSeriesId = res[1].toString();
                            battlePower = res[2];
                            aura = res[3];
                            experience = res[4];
                            price = res[5];
                            owner = res[6];
                            angelThumbnail = 'https://www.angelbattles.com/images/Site/Logo.png';
                            angelName = angelCardSeriesId;
                            angelMatching = imagesSvg.filter(function (x) {
                                return x.cardSeriesType === 'Angel' && x.cardSeriesId === angelCardSeriesId;
                            })[0];

                            if (angelMatching) {
                                angelThumbnail = 'https://' + angelMatching.imageUri;
                                angelName = angelMatching.cardName;
                            }
                            return _context.abrupt("return", {
                                thumbnail: angelThumbnail,
                                title: 'Angel #' + angelId + ' - ' + angelName,
                                description: 'Battle power: ' + battlePower + ', aura: ' + aura + ', experience: ' + experience,
                                url: 'https://www.angelbattles.com/getcard?type=angel&seriesid=' + angelCardSeriesId,
                                properties: []
                            });

                        case 24:
                            getPetABI = { 'constant': true, 'inputs': [{ 'name': '_petId', 'type': 'uint256' }], 'name': 'getPet', 'outputs': [{ 'name': 'petId', 'type': 'uint256' }, { 'name': 'petCardSeriesId', 'type': 'uint8' }, { 'name': 'luck', 'type': 'uint8' }, { 'name': 'auraRed', 'type': 'uint16' }, { 'name': 'auraBlue', 'type': 'uint16' }, { 'name': 'auraYellow', 'type': 'uint16' }, { 'name': 'owner', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            petContract = web3.eth.contract([getPetABI]).at(targets[Kind.Pet]);
                            _context.next = 28;
                            return typed_promisify_1.promisify(petContract.getPet.call)(asset.id);

                        case 28:
                            petRes = _context.sent;
                            petId = petRes[0];
                            petCardSeriesId = petRes[1].toString();
                            luck = petRes[2];
                            auraRed = petRes[3];
                            auraBlue = petRes[4];
                            auraYellow = petRes[5];
                            petOwner = petRes[6];
                            petThumbnail = 'https://www.angelbattles.com/images/Site/Logo.png';
                            petName = petCardSeriesId;
                            petMatching = imagesSvg.filter(function (x) {
                                return x.cardSeriesType === 'Pet' && x.cardSeriesId === petCardSeriesId;
                            })[0];

                            if (petMatching) {
                                petThumbnail = 'https://' + petMatching.imageUri;
                                petName = petMatching.cardName;
                            }
                            return _context.abrupt("return", {
                                thumbnail: petThumbnail,
                                title: 'Pet #' + petId + ' - ' + petName,
                                description: 'Luck: ' + luck + ', aura red: ' + auraRed + ', aura blue: ' + auraBlue + ', aura yellow: ' + auraYellow,
                                url: 'https://www.angelbattles.com/getcard?type=pet&seriesid=' + petCardSeriesId,
                                properties: []
                            });

                        case 41:
                            getAccessoryABI = { 'constant': true, 'inputs': [{ 'name': '_accessoryId', 'type': 'uint256' }], 'name': 'getAccessory', 'outputs': [{ 'name': 'accessoryID', 'type': 'uint256' }, { 'name': 'AccessorySeriesID', 'type': 'uint8' }, { 'name': 'owner', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            accessoryContract = web3.eth.contract([getAccessoryABI]).at(targets[Kind.Accessory]);
                            _context.next = 45;
                            return typed_promisify_1.promisify(accessoryContract.getAccessory.call)(asset.id);

                        case 45:
                            accessoryRes = _context.sent;
                            accessoryId = accessoryRes[0];
                            accessorySeriesId = accessoryRes[1].toString();
                            accessoryOwner = accessoryRes[2];
                            accessoryThumbnail = 'https://www.angelbattles.com/images/Site/Logo.png';
                            accessoryName = accessorySeriesId;
                            accessoryMatching = imagesSvg.filter(function (x) {
                                return x.cardSeriesType === 'Accessory' && x.cardSeriesId === accessorySeriesId;
                            })[0];

                            if (accessoryMatching) {
                                accessoryThumbnail = 'https://' + accessoryMatching.imageUri;
                                accessoryName = accessoryMatching.cardName;
                            }
                            return _context.abrupt("return", {
                                thumbnail: accessoryThumbnail,
                                title: 'Accessory #' + accessoryId + ' - ' + accessoryName,
                                description: '',
                                url: 'https://www.angelbattles.com/getcard?type=acc&seriesid=' + accessorySeriesId,
                                properties: []
                            });

                        case 54:
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
    allAssets: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(web3) {
            var getTotalAngelsABI, getTotalAngelsContract, getTotalPetsABI, getTotalPetsContract, getTotalAccessoriesABI, getTotalAccessoriesContract, totalAngels, totalPets, totalAccessories, res, i, _i, _i2;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            getTotalAngelsABI = { 'constant': true, 'inputs': [], 'name': 'getTotalAngels', 'outputs': [{ 'name': '', 'type': 'uint64' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            getTotalAngelsContract = web3.eth.contract([getTotalAngelsABI]).at(dataTargets[Kind.Angel]);
                            getTotalPetsABI = { 'constant': true, 'inputs': [], 'name': 'getTotalPets', 'outputs': [{ 'name': '', 'type': 'uint64' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            getTotalPetsContract = web3.eth.contract([getTotalPetsABI]).at(dataTargets[Kind.Pet]);
                            getTotalAccessoriesABI = { 'constant': true, 'inputs': [], 'name': 'getTotalAccessories', 'outputs': [{ 'name': '', 'type': 'uint64' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' };
                            getTotalAccessoriesContract = web3.eth.contract([getTotalAccessoriesABI]).at(dataTargets[Kind.Accessory]);
                            _context2.next = 8;
                            return typed_promisify_1.promisify(getTotalAngelsContract.getTotalAngels.call)();

                        case 8:
                            totalAngels = _context2.sent;
                            _context2.next = 11;
                            return typed_promisify_1.promisify(getTotalPetsContract.getTotalPets.call)();

                        case 11:
                            totalPets = _context2.sent;
                            _context2.next = 14;
                            return typed_promisify_1.promisify(getTotalAccessoriesContract.getTotalAccessories.call)();

                        case 14:
                            totalAccessories = _context2.sent;
                            res = [];

                            for (i = 0; i < totalAngels; i++) {
                                res.push({ kind: Kind.Angel, id: i.toString() });
                            }
                            for (_i = 0; _i < totalPets; _i++) {
                                res.push({ kind: Kind.Pet, id: _i.toString() });
                            }
                            for (_i2 = 0; _i2 < totalAccessories; _i2++) {
                                res.push({ kind: Kind.Accessory, id: _i2.toString() });
                            }
                            return _context2.abrupt("return", res);

                        case 20:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        function allAssets(_x3) {
            return _ref2.apply(this, arguments);
        }

        return allAssets;
    }(),
    functions: {
        transfer: function transfer(asset) {
            return {
                type: Web3.AbiType.Function,
                name: transferNames[asset.kind],
                payable: false,
                constant: false,
                stateMutability: types_1.StateMutability.Nonpayable,
                target: asset.kind === Kind.Pet ? targets[asset.kind] : dataTargets[asset.kind],
                inputs: [{ kind: types_1.FunctionInputKind.Replaceable, name: '_to', type: 'address' }, { kind: types_1.FunctionInputKind.Asset, name: assetNames[asset.kind], type: assetTypes[asset.kind], value: asset.id }],
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
                target: targets[asset.kind],
                inputs: [{ kind: types_1.FunctionInputKind.Asset, name: '_tokenId', type: 'uint256', value: asset.id }],
                outputs: [{ kind: types_1.FunctionOutputKind.Owner, name: '_owner', type: 'address' }]
            };
        },
        assetsOfOwnerByIndex: [Kind.Angel, Kind.Pet, Kind.Accessory].map(function (kind) {
            return {
                type: Web3.AbiType.Function,
                name: 'getTokenByIndex',
                payable: false,
                constant: true,
                stateMutability: types_1.StateMutability.View,
                target: targets[kind],
                inputs: [{ kind: types_1.FunctionInputKind.Owner, name: '_owner', type: 'address' }, { kind: types_1.FunctionInputKind.Index, name: 'index', type: 'uint256' }],
                outputs: [{ kind: types_1.FunctionOutputKind.Asset, name: '', type: 'uint64' }],
                assetFromOutputs: function assetFromOutputs(output) {
                    var str = output.toString();
                    if (str === '0') {
                        return null;
                    } else {
                        return { kind: kind, id: str };
                    }
                }
            };
        })
    },
    events: {
        transfer: []
    },
    hash: function hash(a) {
        return a.kind + ':' + a.id;
    }
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map