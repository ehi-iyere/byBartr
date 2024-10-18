const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const { PORT } = process.env;
const userRoutes = require("./routes/user");

app.get("/", (req, res) => {
  res.json({
    message:
      "Hello, thank you for requesting. You are currently hitting ByBartrs public endpoint",
  });
});

app.use("/user", userRoutes);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
