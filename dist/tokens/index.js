"use strict";
// To help typescript find the type
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = void 0;
const index_1 = require("./main/index");
const index_2 = require("./rinkeby/index");
exports.tokens = {
    rinkeby: index_2.rinkebyTokens,
    main: index_1.mainTokens,
};
//# sourceMappingURL=index.js.map