const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const treasureRouter = require('./api/routes/treasure')
const authRouter = require("./api/routes/auth")

env.config();
const app = express();
app.use(express.json());
app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to lucky shine application." });
});

// Handle incoming bad request
app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON");
    res.status(400).json({ message: "Bad Request" });
  }
  next();
});
app.use([authRouter, treasureRouter]);
app.listen(process.env.PORT || 7000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
module.exports = app;