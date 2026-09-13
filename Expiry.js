"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expiry = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
class Expiry extends DataObject_1.DataObject {
    constructor(expiry, turn = Turn_1.instance) {
        super();
        this._expiry = expiry;
        this._turn = turn;
        this.addKey('expired', 'expiry');
    }
    expired() {
        return this._expiry <= this._turn.value();
    }
    expiry() {
        return this._expiry;
    }
}
exports.Expiry = Expiry;
Expiry.transient = ['_turn'];
exports.default = Expiry;
//# sourceMappingURL=Expiry.js.map