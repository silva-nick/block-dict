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

let mongoDB =
  "mongodb+srv://silva-nick:fzP92gFWHDZYg7tG@clusterblock-oej5x.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));

let Character = require("./models/character");
let Word = require("./models/word");

Character.find({ simplified: "Some chinese character" }, function (
  error,
  char
) {
  if (err) return handleError(err);
  let idList = char.blocks;
  var wordList = [];
  for (const wordId in idList) {
    Word.find({ _blockId: wordId }, (err, word) => {
      if (err) return handleError(err);
      wordList.push(word);
    });
  }
});

module.exports = app;
