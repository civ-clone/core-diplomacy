"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _players;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
class Interaction {
    constructor(...players) {
        _players.set(this, []);
        __classPrivateFieldGet(this, _players).push(...players);
    }
    isBetween(...players) {
        return (players.every((player) => __classPrivateFieldGet(this, _players).includes(player)) && players.length === __classPrivateFieldGet(this, _players).length);
    }
    players() {
        return __classPrivateFieldGet(this, _players);
    }
}
exports.Interaction = Interaction;
_players = new WeakMap();
exports.default = Interaction;
//# sourceMappingURL=Interaction.js.map