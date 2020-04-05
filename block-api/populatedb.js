var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://silva-nick:fzP92gFWHDZYg7tG@clusterblock-oej5x.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));

var Character = require("./models/character");
var Word = require("./models/word");

var dictionary = require("../dictionary.json");

db.once("open", () => {
  iterateDictionary();
  createCharacters();
});

var charList = [];

function iterateDictionary() {
  console.log("connected to server  " + dictionary.length);
  for (const word of dictionary) {
    // console.log("word: " + word.simplified.split(""));
    let wordCharList = word.simplified.split("");
    let wordDB = new Word({
      simplified: wordCharList,
      pinyin: word.pinyin,
      english: word.english,
    });
    wordDB.save((err) => {
      if (err) return handleError(err);
      console.log("success");
    });

    for (const char of wordCharList) {
      if (charList.findIndex((x) => x.character === char) === -1) {
        charList.push({ character: char, words: [wordDB._blockId] });
      } else {
        charList[charList.findIndex((x) => x.character === char)].words.push(
          wordDB._blockId
        );
      }
    }
  }
  console.log("finished writing words");
}

function createCharacters() {
  for (const x of charList) {
    let newChar = new Character({
      simplified: x.character,
      blocks: x.words,
    });
    newChar.save((err) => {
      if (err) return handleError(err);
      //console.log("\tsuccess");
    });
  }
}

function handleError(err) {
  console.log(err);
  return err;
}
