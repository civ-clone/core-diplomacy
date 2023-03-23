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
var _Resolution_proposal;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolution = void 0;
const Action_1 = require("../Negotiation/Action");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Resolution extends Action_1.Action {
    constructor(by, proposal, ruleRegistry = RuleRegistry_1.instance) {
        super(by, proposal.negotiation(), ruleRegistry);
        _Resolution_proposal.set(this, void 0);
        __classPrivateFieldSet(this, _Resolution_proposal, proposal, "f");
        this.addKey('proposal');
    }
    proposal() {
        return __classPrivateFieldGet(this, _Resolution_proposal, "f");
    }
}
exports.Resolution = Resolution;
_Resolution_proposal = new WeakMap();
exports.default = Resolution;
//# sourceMappingURL=Resolution.js.map