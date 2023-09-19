const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/limit", (req, res) => {
  res.send("I will limit your calls!!");
});

app.get("/unlimited", (req, res) => {
  res.send("Call me anytime");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
