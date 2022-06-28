// install express with `npm install express`
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

const route_captcha = require("./routes/captcha");
const route_add = require("./routes/add");
const route_get = require("./routes/get");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is /");
});

app.use("/", route_captcha);
app.use("/", route_add);
app.use("/", route_get);
module.exports = app;
