"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const Interaction_1 = require("./Interaction");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const Expired_1 = require("./Rules/Declaration/Expired");
const Expiry_1 = require("./Expiry");
const Never_1 = require("./Expiries/Never");
const Player_1 = require("@civ-clone/core-player/Player");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
class Declaration extends Interaction_1.Interaction {
    constructor(...args) {
        super(...args.filter((value) => value instanceof Player_1.default || value instanceof RuleRegistry_1.default));
        this._expiry = new Never_1.default();
        this.addKey('expired', 'expiry');
        args.forEach((arg) => {
            if (arg instanceof Expiry_1.default) {
                this._expiry = arg;
            }
            if (arg instanceof Turn_1.Turn) {
                this._turn = arg;
            }
        });
    }
    active() {
        return !this.expiry().expired();
    }
    /**
     * Ends the declaration. `by` is the player who ended it, if one did, for the
     * `Expired` rules to say so. It isn't kept: once it has been announced, a
     * declaration only needs to know that it ended, and when.
     */
    expire(by = null) {
        this._expiry = new Expiry_1.default(this._turn.value());
        this.ruleRegistry().process(Expired_1.default, this, by);
    }
    expired() {
        return this._expiry.expired();
    }
    expiry() {
        return this._expiry;
    }
}
exports.Declaration = Declaration;
exports.default = Declaration;
//# sourceMappingURL=Declaration.js.map