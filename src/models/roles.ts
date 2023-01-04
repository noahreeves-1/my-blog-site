import { Schema, model } from "mongoose";

export type IRole = {
  role_name: string;
  role_id: string;
};

const roleSchema: Schema = new Schema<IRole>({
  role_name: { type: String, required: true },
  role_id: { type: String, required: true },
});

export const Role = model<IRole>("Role", roleSchema);
