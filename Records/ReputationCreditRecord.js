"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationCreditRecord = void 0;
const RelationRecord_1 = require("./RelationRecord");
/**
 * The credit `observer` gives `player` against their reputation: one direction of one pair, kept in the
 *  `InteractionRegistry` so that it's saved with the rest of the diplomacy. Made the first time a value is set
 *  (`Reputation`), so a game that never sets one has none.
 */
class ReputationCreditRecord extends RelationRecord_1.RelationRecord {
    constructor(observer, player, value, ...args) {
        super(observer, player, ...args);
        this._observer = observer;
        this._player = player;
        this._value = value;
        this.addKey('observer', 'player', 'value');
    }
    observer() {
        return this._observer;
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
exports.ReputationCreditRecord = ReputationCreditRecord;
exports.default = ReputationCreditRecord;
//# sourceMappingURL=ReputationCreditRecord.js.map