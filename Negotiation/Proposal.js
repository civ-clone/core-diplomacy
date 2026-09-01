"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
const Action_1 = require("./Action");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Step_1 = require("../Rules/Negotiation/Step");
const Resolved_1 = require("../Rules/Proposal/Resolved");
class Proposal extends Action_1.Action {
    constructor(by, negotiation, ruleRegistry = RuleRegistry_1.instance) {
        super(by, negotiation, ruleRegistry);
        this._resolution = null;
        this.addKey('resolution', 'resolved');
    }
    choices() {
        return this.ruleRegistry().process(Step_1.default, this.negotiation());
    }
    resolution() {
        return this._resolution;
    }
    async resolve(resolution) {
        this._resolution = resolution;
        await Promise.all(this.ruleRegistry().process(Resolved_1.default, resolution, this));
    }
    resolved() {
        return this._resolution !== null;
    }
}
exports.Proposal = Proposal;
exports.default = Proposal;
//# sourceMappingURL=Proposal.js.map