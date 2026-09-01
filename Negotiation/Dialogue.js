"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialogue = void 0;
const Proposal_1 = require("./Proposal");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Dialogue extends Proposal_1.Proposal {
    constructor(by, key, negotiation, ruleRegistry = RuleRegistry_1.instance) {
        super(by, negotiation, ruleRegistry);
        this._key = key;
        this.addKey('key');
    }
    key() {
        return this._key;
    }
}
exports.Dialogue = Dialogue;
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map