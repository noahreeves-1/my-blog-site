import { Schema, model, ObjectId } from "mongoose";
import { DateTime } from "luxon";

export type IPost = {
  title: string;
  content: string;
  date_created: Date;
  author: ObjectId;
};

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date_created: { type: Date },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

postSchema.virtual("date_clean").get(function () {
  return DateTime.fromJSDate(this.date_created).toLocaleString(
    DateTime.DATE_MED
  );
});

export const Post = model<IPost>("Post", postSchema);
