const express = require("express");
const redis = require("./services/redisConnection");
const port = require("./config").config.port;
const forwardUrl = require("./config").config.forwardUrl;

const app = express();

app.get("/unlimited", (req, res) => {
  res.redirect(forwardUrl + "/unlimited");
});

app.get("/bucket/:endpoint", async (req, res) => {
  if (await redis.allowRequestBucket(req.ip)) {
    res.redirect(`${forwardUrl}/${req.params.endpoint}`);
  } else {
    res.status(429).send("Too many");
  }
});

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});

module.exports = app;
