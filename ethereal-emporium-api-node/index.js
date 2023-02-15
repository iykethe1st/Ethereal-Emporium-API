const express = require("express");
const app = express();
const port = 9000;

app.use("/", (req, res) => {
  res.json({ message: "AI am Live" });
});

app.listen(port, () => {
  console.log("Started server on port " + port);
});
