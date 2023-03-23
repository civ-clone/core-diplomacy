"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Expiry_expiry, _Expiry_turn;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expiry = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
class Expiry extends DataObject_1.DataObject {
    constructor(expiry, turn = Turn_1.instance) {
        super();
        _Expiry_expiry.set(this, void 0);
        _Expiry_turn.set(this, void 0);
        __classPrivateFieldSet(this, _Expiry_expiry, expiry, "f");
        __classPrivateFieldSet(this, _Expiry_turn, turn, "f");
        this.addKey('expired', 'expiry');
    }
    expired() {
        return __classPrivateFieldGet(this, _Expiry_expiry, "f") <= __classPrivateFieldGet(this, _Expiry_turn, "f").value();
    }
    expiry() {
        return __classPrivateFieldGet(this, _Expiry_expiry, "f");
    }
}
exports.Expiry = Expiry;
_Expiry_expiry = new WeakMap(), _Expiry_turn = new WeakMap();
exports.default = Expiry;
//# sourceMappingURL=Expiry.js.map