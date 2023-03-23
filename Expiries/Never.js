"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Never = void 0;
const Expiry_1 = require("../Expiry");
class Never extends Expiry_1.default {
    constructor() {
        super(Infinity);
    }
    expired() {
        return false;
    }
}
exports.Never = Never;
exports.default = Never;
//# sourceMappingURL=Never.js.map