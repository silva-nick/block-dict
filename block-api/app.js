var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//database
let mongoose = require("mongoose");

let mongoDB = "mongodb://127.0.0.1/dictionary";
mongoose.connect(mongoDB, { newUrlParser: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));

module.exports = app;
