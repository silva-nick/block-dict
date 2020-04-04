var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://silva-nick:fzP92gFWHDZYg7tG@clusterblock-oej5x.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { newUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));

var Character = require("./models/character");
var Word = require("./models/word");

var dictionary = require("../dictionary.json");

function iterateDictionary() {
  for (const word in dictionary) {
  }
}

mongoose.connection.close();
