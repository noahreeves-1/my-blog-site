"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const luxon_1 = require("luxon");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date_created: { type: Date },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
postSchema.virtual("date_clean").get(function () {
    return luxon_1.DateTime.fromJSDate(this.date_created).toLocaleString(luxon_1.DateTime.DATE_MED);
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
//# sourceMappingURL=post.js.map