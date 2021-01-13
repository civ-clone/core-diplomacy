"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _expiry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const Interaction_1 = require("./Interaction");
const Expiry_1 = require("./Expiry");
class Declaration extends Interaction_1.Interaction {
    constructor(expiry, ...players) {
        super(...players);
        _expiry.set(this, new Expiry_1.default(Infinity));
        __classPrivateFieldSet(this, _expiry, expiry);
    }
    expiry() {
        return __classPrivateFieldGet(this, _expiry);
    }
}
exports.Declaration = Declaration;
_expiry = new WeakMap();
exports.default = Declaration;
//# sourceMappingURL=Declaration.js.map