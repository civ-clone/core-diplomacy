"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Proposal_resolution;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
const Action_1 = require("./Action");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Step_1 = require("../Rules/Negotiation/Step");
const Resolved_1 = require("../Rules/Proposal/Resolved");
class Proposal extends Action_1.Action {
    constructor(by, negotiation, ruleRegistry = RuleRegistry_1.instance) {
        super(by, negotiation, ruleRegistry);
        _Proposal_resolution.set(this, null);
        this.addKey('resolution', 'resolved');
    }
    choices() {
        return this.ruleRegistry().process(Step_1.default, this.negotiation());
    }
    resolution() {
        return __classPrivateFieldGet(this, _Proposal_resolution, "f");
    }
    async resolve(resolution) {
        __classPrivateFieldSet(this, _Proposal_resolution, resolution, "f");
        await Promise.all(this.ruleRegistry().process(Resolved_1.default, resolution, this));
    }
    resolved() {
        return __classPrivateFieldGet(this, _Proposal_resolution, "f") !== null;
    }
}
exports.Proposal = Proposal;
_Proposal_resolution = new WeakMap();
exports.default = Proposal;
//# sourceMappingURL=Proposal.js.map