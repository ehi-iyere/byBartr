import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";
import userRouter from "./routes/user.routes.js";
dotenv.config();
mongoose
  .connect(process.env.Mongo)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("error");
  });
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
