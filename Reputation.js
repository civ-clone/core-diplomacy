"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reputation = void 0;
const Bounds_1 = require("./Bounds");
const InteractionRegistry_1 = require("./InteractionRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const Changed_1 = require("./Rules/Reputation/Changed");
const ReputationCreditRecord_1 = require("./Records/ReputationCreditRecord");
const ReputationRecord_1 = require("./Records/ReputationRecord");
/**
 * Each player's reputation, and the credit each other player gives them against it. What the numbers mean is the rule
 *  set's: the range of a reputation is `options`, and with none given any number is kept. A credit is kept as it's
 *  given, and is 0 until one is.
 *
 * The values are `ReputationRecord`s and `ReputationCreditRecord`s in the `InteractionRegistry`, made the first time
 *  one is set, so they're saved with the rest of the diplomacy and a game that never sets one has none. Each change to
 *  a reputation is announced with a `ReputationChanged` rule.
 */
class Reputation {
    constructor(interactionRegistry = InteractionRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance, turn = Turn_1.instance, options = {}) {
        this._interactionRegistry = interactionRegistry;
        this._options = options;
        this._ruleRegistry = ruleRegistry;
        this._turn = turn;
    }
    /**
     * Changes `player`'s reputation by `delta`, and answers the value kept.
     */
    adjust(player, delta, reason) {
        return this.set(player, this.get(player) + delta, reason);
    }
    /**
     * The credit `observer` gives `player` against their reputation: 0 until one is set.
     */
    credit(observer, player) {
        var _a, _b;
        return (_b = (_a = this.creditRecord(observer, player)) === null || _a === void 0 ? void 0 : _a.value()) !== null && _b !== void 0 ? _b : 0;
    }
    /**
     * `player`'s reputation: `initial` until one is set.
     */
    get(player) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.record(player)) === null || _a === void 0 ? void 0 : _a.value()) !== null && _b !== void 0 ? _b : this._options.initial) !== null && _c !== void 0 ? _c : 0;
    }
    /**
     * Sets `player`'s reputation, kept within the range, and answers the value kept.
     */
    set(player, value, reason) {
        const record = this.record(player), from = this.get(player), to = (0, Bounds_1.clamp)(value, this._options);
        if (from === to) {
            return to;
        }
        if (record === undefined) {
            this._interactionRegistry.register(new ReputationRecord_1.default(player, to, this._ruleRegistry, this._turn));
        }
        else {
            record.setValue(to);
        }
        this._ruleRegistry.process(Changed_1.default, player, from, to, reason);
        return to;
    }
    /**
     * Sets the credit `observer` gives `player` against their reputation.
     */
    setCredit(observer, player, value) {
        const record = this.creditRecord(observer, player);
        if (record !== undefined) {
            record.setValue(value);
            return;
        }
        if (value === 0) {
            return;
        }
        this._interactionRegistry.register(new ReputationCreditRecord_1.default(observer, player, value, this._ruleRegistry, this._turn));
    }
    creditRecord(observer, player) {
        return this._interactionRegistry
            .getByPlayers(observer, player)
            .find((interaction) => interaction instanceof ReputationCreditRecord_1.default &&
            interaction.observer() === observer &&
            interaction.player() === player);
    }
    record(player) {
        return this._interactionRegistry
            .getByPlayers(player)
            .find((interaction) => interaction instanceof ReputationRecord_1.default &&
            interaction.player() === player);
    }
}
exports.Reputation = Reputation;
exports.default = Reputation;
//# sourceMappingURL=Reputation.js.map