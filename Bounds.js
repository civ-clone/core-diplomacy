"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = exports.assertBounds = void 0;
// Throws when the range is empty: a minimum above the maximum keeps no number.
const assertBounds = ({ maximum, minimum }) => {
    if (maximum !== undefined && minimum !== undefined && minimum > maximum) {
        throw new RangeError(`The minimum (${minimum}) is above the maximum (${maximum}).`);
    }
};
exports.assertBounds = assertBounds;
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