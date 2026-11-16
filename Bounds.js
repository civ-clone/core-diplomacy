"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
const clamp = (value, { maximum, minimum }) => {
    if (maximum !== undefined && value > maximum) {
        return maximum;
    }
    if (minimum !== undefined && value < minimum) {
        return minimum;
    }
    return value;
};
exports.clamp = clamp;
exports.default = exports.clamp;
//# sourceMappingURL=Bounds.js.map