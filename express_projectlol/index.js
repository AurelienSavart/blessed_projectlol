const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const championsRouter = require("./routes/champions");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/champions", championsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).json({ error: "Route does not exist" });
});

module.exports = app;
