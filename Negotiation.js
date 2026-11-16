"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Negotiation = void 0;
const Interaction_1 = require("./Interaction");
const Interaction_2 = require("./Rules/Negotiation/Interaction");
const Player_1 = require("@civ-clone/core-player/Player");
const Step_1 = require("./Rules/Negotiation/Step");
const Terminate_1 = require("./Negotiation/Terminate");
const Terminated_1 = require("./Negotiation/Error/Terminated");
const Terminated_2 = require("./Rules/Negotiation/Terminated");
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
    /**
     * The player who opened the negotiation: the first of the players it was made with. Either player may open one; the
     *  other answers. The players keep the order they were given in, in a saved game too.
     */
    initiator() {
        return this.players()[0];
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
            nextSteps.push(new Terminate_1.default(this.initiator(), this, this.ruleRegistry()));
        }
        return nextSteps;
    }
    proceed(nextStep) {
        if (this.terminated()) {
            throw new Terminated_1.default();
        }
        this._interactions.push(nextStep);
        this.ruleRegistry().process(Interaction_2.default, nextStep, this);
        // After the step's own rules (which, in the rule sets, register the step), and before the caller registers the
        //  negotiation itself: the drivers register it once its loop ends. `proceed` isn't async, so a `Terminated` rule
        //  that returns a promise isn't awaited; one that throws throws from `proceed`, as an `Interaction` rule does, and
        //  the negotiation has ended either way.
        if (nextStep instanceof Terminate_1.default) {
            this.ruleRegistry().process(Terminated_2.default, this);
        }
    }
    terminated() {
        return this._interactions.some((interaction) => interaction instanceof Terminate_1.default);
    }
}
exports.Negotiation = Negotiation;
exports.default = Negotiation;
//# sourceMappingURL=Negotiation.js.map