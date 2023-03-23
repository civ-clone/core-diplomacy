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
var _Action_by, _Action_negotiation;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const Interaction_1 = require("../Interaction");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Action extends Interaction_1.Interaction {
    constructor(by, negotiation, ruleRegistry = RuleRegistry_1.instance) {
        super(...negotiation.players(), ruleRegistry);
        _Action_by.set(this, void 0);
        _Action_negotiation.set(this, void 0);
        __classPrivateFieldSet(this, _Action_by, by, "f");
        __classPrivateFieldSet(this, _Action_negotiation, negotiation, "f");
        this.addKey('by', 'for', 'negotiation');
    }
    by() {
        return __classPrivateFieldGet(this, _Action_by, "f");
    }
    for() {
        return this.players().filter((player) => player !== __classPrivateFieldGet(this, _Action_by, "f"));
    }
    negotiation() {
        return __classPrivateFieldGet(this, _Action_negotiation, "f");
    }
}
exports.Action = Action;
_Action_by = new WeakMap(), _Action_negotiation = new WeakMap();
exports.default = Action;
//# sourceMappingURL=Action.js.map