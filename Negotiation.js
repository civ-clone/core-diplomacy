"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Negotiation = void 0;
const Interaction_1 = require("./Interaction");
const Interaction_2 = require("./Rules/Negotiation/Interaction");
const Player_1 = require("@civ-clone/core-player/Player");
const Step_1 = require("./Rules/Negotiation/Step");
const Terminate_1 = require("./Negotiation/Terminate");
const Terminated_1 = require("./Negotiation/Error/Terminated");
const Unsupported_1 = require("./Negotiation/Error/Unsupported");
class Negotiation extends Interaction_1.Interaction {
    constructor(...args) {
        if (args.filter((arg) => arg instanceof Player_1.default).length !== 2) {
            throw new Unsupported_1.default();
        }
        super(...args);
        this._interactions = [];
        const [initiator] = args.filter((arg) => arg instanceof Player_1.default);
        if (!initiator) {
            throw new Unsupported_1.default('Not enough `Player`s for `Negotiation`.');
        }
        this.addKey('interactions', 'lastInteraction', 'terminated');
    }
    interactions() {
        return this._interactions;
    }
    lastInteraction() {
        if (this._interactions.length === 0) {
            return null;
        }
        return this._interactions[this._interactions.length - 1];
    }
    nextSteps() {
        const nextSteps = this.ruleRegistry().process(Step_1.default, this);
        if (nextSteps.length === 0) {
            nextSteps.push(new Terminate_1.default(this.players()[0], this, this.ruleRegistry()));
        }
        return nextSteps;
    }
    proceed(nextStep) {
        if (this.terminated()) {
            throw new Terminated_1.default();
        }
        this._interactions.push(nextStep);
        this.ruleRegistry().process(Interaction_2.default, nextStep, this);
    }
    terminated() {
        return this._interactions.some((interaction) => interaction instanceof Terminate_1.default);
    }
}
exports.Negotiation = Negotiation;
exports.default = Negotiation;
//# sourceMappingURL=Negotiation.js.map