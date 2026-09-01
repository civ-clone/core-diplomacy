"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const Interaction_1 = require("../Interaction");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Action extends Interaction_1.Interaction {
    constructor(by, negotiation, ruleRegistry = RuleRegistry_1.instance) {
        super(...negotiation.players(), ruleRegistry);
        this._by = by;
        this._negotiation = negotiation;
        this.addKey('by', 'for', 'negotiation');
    }
    by() {
        return this._by;
    }
    for() {
        return this.players().filter((player) => player !== this._by);
    }
    negotiation() {
        return this._negotiation;
    }
}
exports.Action = Action;
exports.default = Action;
//# sourceMappingURL=Action.js.map