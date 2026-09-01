"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolution = void 0;
const Action_1 = require("../Negotiation/Action");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Resolution extends Action_1.Action {
    constructor(by, proposal, ruleRegistry = RuleRegistry_1.instance) {
        super(by, proposal.negotiation(), ruleRegistry);
        this._proposal = proposal;
        this.addKey('proposal');
    }
    proposal() {
        return this._proposal;
    }
}
exports.Resolution = Resolution;
exports.default = Resolution;
//# sourceMappingURL=Resolution.js.map