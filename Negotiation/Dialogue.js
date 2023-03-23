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
var _Dialogue_key;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialogue = void 0;
const Proposal_1 = require("./Proposal");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Dialogue extends Proposal_1.Proposal {
    constructor(by, key, negotiation, ruleRegistry = RuleRegistry_1.instance) {
        super(by, negotiation, ruleRegistry);
        _Dialogue_key.set(this, void 0);
        __classPrivateFieldSet(this, _Dialogue_key, key, "f");
        this.addKey('key');
    }
    key() {
        return __classPrivateFieldGet(this, _Dialogue_key, "f");
    }
}
exports.Dialogue = Dialogue;
_Dialogue_key = new WeakMap();
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map