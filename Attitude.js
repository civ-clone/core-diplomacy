"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attitude = void 0;
const Bounds_1 = require("./Bounds");
const InteractionRegistry_1 = require("./InteractionRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const Changed_1 = require("./Rules/Attitude/Changed");
const AttitudeRecord_1 = require("./Records/AttitudeRecord");
/**
 * How each player feels about each other: a number per direction of each pair, `holder` toward `toward`. What the
 *  numbers mean (whether higher is warmer or colder, and the range) is the rule set's: the range is `options`, and
 *  with none given any number is kept.
 *
 * The values are `AttitudeRecord`s in the `InteractionRegistry`, made the first time one is set, so they're saved with
 *  the rest of the diplomacy and a game that never sets one has none. Each change is announced with an
 *  `AttitudeChanged` rule.
 */
class Attitude {
    constructor(interactionRegistry = InteractionRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance, turn = Turn_1.instance, options = {}) {
        this._interactionRegistry = interactionRegistry;
        this._options = options;
        this._ruleRegistry = ruleRegistry;
        this._turn = turn;
    }
    /**
     * Changes `holder`'s attitude toward `toward` by `delta`, from `initial` when it has none yet, and answers the value
     *  kept.
     */
    adjust(holder, toward, delta, reason) {
        var _a, _b;
        return this.set(holder, toward, ((_b = (_a = this.get(holder, toward)) !== null && _a !== void 0 ? _a : this._options.initial) !== null && _b !== void 0 ? _b : 0) + delta, reason);
    }
    /**
     * `holder`'s attitude toward `toward`, or `undefined` if it has none.
     */
    get(holder, toward) {
        var _a;
        return (_a = this.record(holder, toward)) === null || _a === void 0 ? void 0 : _a.value();
    }
    /**
     * Sets `holder`'s attitude toward `toward`, kept within the range, and answers the value kept.
     */
    set(holder, toward, value, reason) {
        const record = this.record(holder, toward), from = record === null || record === void 0 ? void 0 : record.value(), to = (0, Bounds_1.clamp)(value, this._options);
        if (from === to) {
            return to;
        }
        if (record === undefined) {
            this._interactionRegistry.register(new AttitudeRecord_1.default(holder, toward, to, this._ruleRegistry, this._turn));
        }
        else {
            record.setValue(to);
        }
        this._ruleRegistry.process(Changed_1.default, holder, toward, from, to, reason);
        return to;
    }
    record(holder, toward) {
        return this._interactionRegistry
            .getByPlayers(holder, toward)
            .find((interaction) => interaction instanceof AttitudeRecord_1.default &&
            interaction.holder() === holder &&
            interaction.toward() === toward);
    }
}
exports.Attitude = Attitude;
exports.default = Attitude;
//# sourceMappingURL=Attitude.js.map