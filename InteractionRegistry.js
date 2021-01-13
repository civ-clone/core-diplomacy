"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.InteractionRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const Interaction_1 = require("./Interaction");
class InteractionRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(Interaction_1.default);
    }
    getByPlayer(player) {
        return this.entries().filter((interaction) => interaction.players().includes(player));
    }
    getByPlayers(...players) {
        return this.entries().filter((interaction) => interaction.isBetween(...players));
    }
}
exports.InteractionRegistry = InteractionRegistry;
exports.instance = new InteractionRegistry();
exports.default = InteractionRegistry;
//# sourceMappingURL=InteractionRegistry.js.map