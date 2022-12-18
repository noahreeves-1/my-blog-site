import { Schema, model, ObjectId } from "mongoose";
import { DateTime } from "luxon";

export type IComment = {
  author: ObjectId;
  blogPost: ObjectId;
  commentBody: string;
  date_created: Date;
};

const commentSchema = new Schema<IComment>({
  blogPost: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  commentBody: { type: String, required: true },
  date_created: { type: Date },
  author: { type: Schema.Types.ObjectId, ref: "User", requied: true },
});

commentSchema.virtual("date_clean").get(function () {
  return DateTime.fromJSDate(this.date_created).toLocaleString(
    DateTime.DATE_MED
  );
});

export const Comment = model<IComment>("Comment", commentSchema);
