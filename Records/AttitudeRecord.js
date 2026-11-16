"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttitudeRecord = void 0;
const RelationRecord_1 = require("./RelationRecord");
/**
 * How `holder` feels about `toward`: one direction of one pair, kept in the `InteractionRegistry` so that it's saved
 *  with the rest of the diplomacy. Made the first time a value is set (`Attitude`), so a game that never sets one has
 *  none.
 */
class AttitudeRecord extends RelationRecord_1.RelationRecord {
    constructor(holder, toward, value, ...args) {
        super(holder, toward, ...args);
        this._holder = holder;
        this._toward = toward;
        this._value = value;
        this.addKey('holder', 'toward', 'value');
    }
    holder() {
        return this._holder;
    }
    setValue(value) {
        this._value = value;
    }
    toward() {
        return this._toward;
    }
    value() {
        return this._value;
    }
}
exports.AttitudeRecord = AttitudeRecord;
exports.default = AttitudeRecord;
//# sourceMappingURL=AttitudeRecord.js.map