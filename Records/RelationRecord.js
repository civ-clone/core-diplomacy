"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationRecord = void 0;
const Interaction_1 = require("../Interaction");
/**
 * A value kept about players (`AttitudeRecord`, `ReputationRecord`, `ReputationCreditRecord`), stored in the
 *  `InteractionRegistry` so it's saved with the rest of the diplomacy. It's a record, not something that happened
 *  between the players: a reader that takes any interaction between two players as a sign they've met must skip
 *  these (`interaction instanceof RelationRecord`).
 */
class RelationRecord extends Interaction_1.Interaction {
}
exports.RelationRecord = RelationRecord;
exports.default = RelationRecord;
//# sourceMappingURL=RelationRecord.js.map