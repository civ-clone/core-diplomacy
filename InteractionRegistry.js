"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.InteractionRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const Interaction_1 = require("./Interaction");
// The same players, in any order and counted once, give the same key, as `isBetween` compares them as a set.
const playersKey = (players) => Array.from(new Set(players.map((player) => player.id())))
    .sort()
    .join('\u0000');
class InteractionRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(Interaction_1.Interaction);
        // An interaction's players are set when it's made and never change. Scanning every interaction for each lookup was
        //  most of a late-game turn, as route finding asks about a treaty on each step (civ-clone/web-renderer#657).
        this._byPlayers = this.index((interaction) => playersKey(interaction.players()));
    }
    getByPlayer(player) {
        return this.entries().filter((interaction) => interaction.players().includes(player));
    }
    getByPlayers(...players) {
        return this._byPlayers.get(playersKey(players));
    }
}
exports.InteractionRegistry = InteractionRegistry;
exports.instance = new InteractionRegistry();
exports.default = InteractionRegistry;
//# sourceMappingURL=InteractionRegistry.js.map