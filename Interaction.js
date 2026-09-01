"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Player_1 = require("@civ-clone/core-player/Player");
const Created_1 = require("./Rules/Interaction/Created");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
class Interaction extends DataObject_1.DataObject {
    constructor(...args) {
        super();
        this._players = new Set();
        this._ruleRegistry = RuleRegistry_1.instance;
        // `protected` because `Declaration` writes it too. It declared its own
        // `#turn` before this change; the two slots merge without any behavioural
        // difference, as this one is read only by the constructor below.
        this._turn = Turn_1.instance;
        args.forEach((arg) => {
            if (arg instanceof Player_1.default) {
                this._players.add(arg);
            }
            if (arg instanceof RuleRegistry_1.RuleRegistry) {
                this._ruleRegistry = arg;
            }
            if (arg instanceof Turn_1.Turn) {
                this._turn = arg;
            }
        });
        this._when = this._turn.value();
        this.addKey('players', 'when');
        this._ruleRegistry.process(Created_1.default, this);
    }
    isBetween(...players) {
        const uniquePlayers = Array.from(new Set(players));
        return (uniquePlayers.every((player) => this._players.has(player)) && uniquePlayers.length === this._players.size);
    }
    players() {
        return Array.from(this._players);
    }
    ruleRegistry() {
        return this._ruleRegistry;
    }
    when() {
        return this._when;
    }
}
exports.Interaction = Interaction;
exports.default = Interaction;
//# sourceMappingURL=Interaction.js.map