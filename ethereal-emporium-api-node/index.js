const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const port = 9500;
const { logger } = require("./logger");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.amghmo9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

app.use("/", (req, res) => {
  res.json("Ethereal Emporium is Live");
});

app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});
