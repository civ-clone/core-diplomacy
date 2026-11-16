"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationRecord = void 0;
const Interaction_1 = require("../Interaction");
/**
 * A player's reputation, kept in the `InteractionRegistry` so that it's saved with the rest of the diplomacy. Made the
 *  first time a value is set (`Reputation`), so a game that never sets one has none.
 */
class ReputationRecord extends Interaction_1.Interaction {
    constructor(player, value, ...args) {
        super(player, ...args);
        this._player = player;
        this._value = value;
        this.addKey('player', 'value');
    }
    player() {
        return this._player;
    }
    setValue(value) {
        this._value = value;
    }
    value() {
        return this._value;
    }
}
exports.ReputationRecord = ReputationRecord;
exports.default = ReputationRecord;
//# sourceMappingURL=ReputationRecord.js.map