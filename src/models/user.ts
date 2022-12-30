import { Schema, model } from "mongoose";

export type IUser = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  refresh_token: string;
};

const userSchema: Schema = new Schema<IUser>({
  first_name: { type: String, required: true, minlength: 2, maxlength: 50 },
  last_name: { type: String, required: true, minlength: 2, maxlength: 50 },
  username: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, minlength: 8, maxlength: 100 },
  password: { type: String, required: true, minlength: 8 },
  admin: { type: Boolean, default: false },
  refresh_token: { type: String },
});

userSchema.virtual("name").get(function () {
  const name = `${this.first_name} ${this.last_name}`;
  return name;
});

export const User = model<IUser>("User", userSchema);
