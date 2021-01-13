"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.DeclarationRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const Declaration_1 = require("./Declaration");
class DeclarationRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(Declaration_1.default);
    }
    getByPlayer(player) {
        return this.entries().filter((interaction) => interaction.players().includes(player));
    }
    getByPlayers(...players) {
        return this.entries().filter((interaction) => interaction.isBetween(...players));
    }
}
exports.DeclarationRegistry = DeclarationRegistry;
exports.instance = new DeclarationRegistry();
exports.default = DeclarationRegistry;
//# sourceMappingURL=DeclarationRegistry.js.map