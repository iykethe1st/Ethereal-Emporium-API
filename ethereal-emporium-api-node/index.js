const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const port = 9500;
const { logger } = require("./logger");

mongoose
  .connect(
    process.env.ETHEREAL_DB
    // "mongodb://localhost/ethereal-emporium"
  )
  .then(() => console.log("Connected to MongoB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

// CORS POLICY
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});
