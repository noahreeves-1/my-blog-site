"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true, minlength: 2, maxlength: 50 },
    last_name: { type: String, required: true, minlength: 2, maxlength: 50 },
    username: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, minlength: 8, maxlength: 100 },
    password: { type: String, required: true, minlength: 8 },
    admin: { type: Boolean, default: false },
});
userSchema.virtual("name").get(function () {
    const name = `${this.first_name} ${this.last_name}`;
    return name;
});
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.js.map