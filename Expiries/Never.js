"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Never = void 0;
const Expiry_1 = require("../Expiry");
class Never extends Expiry_1.Expiry {
    constructor() {
        super(Infinity);
    }
}
exports.Never = Never;
exports.default = Never;
//# sourceMappingURL=Never.js.map