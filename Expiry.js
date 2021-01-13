"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expiry = void 0;
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
class Expiry extends Turn_1.Turn {
    increment() {
        throw new TypeError('Cannot increment Expiry');
    }
}
exports.Expiry = Expiry;
exports.default = Expiry;
//# sourceMappingURL=Expiry.js.map