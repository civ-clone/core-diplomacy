"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Interaction_players, _Interaction_ruleRegistry, _Interaction_turn, _Interaction_when;
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
        _Interaction_players.set(this, new Set());
        _Interaction_ruleRegistry.set(this, RuleRegistry_1.instance);
        _Interaction_turn.set(this, Turn_1.instance);
        _Interaction_when.set(this, void 0);
        args.forEach((arg) => {
            if (arg instanceof Player_1.default) {
                __classPrivateFieldGet(this, _Interaction_players, "f").add(arg);
            }
            if (arg instanceof RuleRegistry_1.RuleRegistry) {
                __classPrivateFieldSet(this, _Interaction_ruleRegistry, arg, "f");
            }
            if (arg instanceof Turn_1.Turn) {
                __classPrivateFieldSet(this, _Interaction_turn, arg, "f");
            }
        });
        __classPrivateFieldSet(this, _Interaction_when, __classPrivateFieldGet(this, _Interaction_turn, "f").value(), "f");
        this.addKey('players');
        __classPrivateFieldGet(this, _Interaction_ruleRegistry, "f").process(Created_1.default, this);
    }
    isBetween(...players) {
        const uniquePlayers = Array.from(new Set(players));
        return (uniquePlayers.every((player) => __classPrivateFieldGet(this, _Interaction_players, "f").has(player)) && uniquePlayers.length === __classPrivateFieldGet(this, _Interaction_players, "f").size);
    }
    players() {
        return Array.from(__classPrivateFieldGet(this, _Interaction_players, "f"));
    }
    ruleRegistry() {
        return __classPrivateFieldGet(this, _Interaction_ruleRegistry, "f");
    }
    when() {
        return __classPrivateFieldGet(this, _Interaction_when, "f");
    }
}
exports.Interaction = Interaction;
_Interaction_players = new WeakMap(), _Interaction_ruleRegistry = new WeakMap(), _Interaction_turn = new WeakMap(), _Interaction_when = new WeakMap();
exports.default = Interaction;
//# sourceMappingURL=Interaction.js.map