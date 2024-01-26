import mongoose from "mongoose";
import { isEmail } from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      uniqe: true,
    },
    email: {
      type: String,
      required: true,
      uniqe: true,
      validate: [isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
