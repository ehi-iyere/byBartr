import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();
mongoose
  .connect(process.env.Mongo, {
    autoIndex: true, //make this also true
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("error");
  });
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
