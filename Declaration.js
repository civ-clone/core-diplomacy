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
var _Declaration_expiry, _Declaration_turn;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const Interaction_1 = require("./Interaction");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const Expiry_1 = require("./Expiry");
const Never_1 = require("./Expiries/Never");
const Player_1 = require("@civ-clone/core-player/Player");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Declaration extends Interaction_1.Interaction {
    constructor(...args) {
        super(...args.filter((value) => value instanceof Player_1.default || value instanceof RuleRegistry_1.default));
        _Declaration_expiry.set(this, new Never_1.default());
        _Declaration_turn.set(this, Turn_1.instance);
        this.addKey('expired', 'expiry');
        args.forEach((arg) => {
            if (arg instanceof Expiry_1.default) {
                __classPrivateFieldSet(this, _Declaration_expiry, arg, "f");
            }
            if (arg instanceof Turn_1.Turn) {
                __classPrivateFieldSet(this, _Declaration_turn, arg, "f");
            }
        });
    }
    active() {
        return !this.expiry().expired();
    }
    expire() {
        __classPrivateFieldSet(this, _Declaration_expiry, new Expiry_1.default(__classPrivateFieldGet(this, _Declaration_turn, "f").value()), "f");
    }
    expired() {
        return __classPrivateFieldGet(this, _Declaration_expiry, "f").expired();
    }
    expiry() {
        return __classPrivateFieldGet(this, _Declaration_expiry, "f");
    }
}
exports.Declaration = Declaration;
_Declaration_expiry = new WeakMap(), _Declaration_turn = new WeakMap();
exports.default = Declaration;
//# sourceMappingURL=Declaration.js.map