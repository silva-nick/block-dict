var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://silva-nick:fzP92gFWHDZYg7tG@clusterblock-oej5x.gcp.mongodb.net/block_dictionary?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));

var Character = require("./models/character");
var Word = require("./models/word");

var dictionary = require("../dictionary.json");

db.once("open", () => {
  iterateDictionary();
  // createCharacters();
});

var charList = [];

async function iterateDictionary() {
  console.log("connected to server  " + dictionary.length);
  let count = 10;
  for (const word of dictionary) {
    if (count % 11 === 0) {
      let wordCharList = word.simplified.split("");
      let wordDB = new Word({
        simplified: wordCharList,
        pinyin: word.pinyin,
        english: word.english,
        _id: mongoose.mongo.ObjectID(hashId(word.pinyin, word.english) + ""),
      });
      await wordDB.save((err) => {
        if (err) return handleError(err);
        console.log("success");
      });
    }
    count++;
    // for (const char of wordCharList) {
    //   if (charList.findIndex((x) => x.character === char) === -1) {
    //     charList.push({ character: char, words: [wordDB._id] });
    //   } else {
    //     charList[charList.findIndex((x) => x.character === char)].words.push(
    //       wordDB._id
    //     );
    //   }
    // }
  }
  console.log("finished writing words");
}

async function createCharacters() {
  console.log("starting writing characters");
  let count = 0;
  for (const x of charList) {
    if (count % 3 === 0) {
      let newChar = new Character({
        simplified: x.character,
        blocks: x.words,
      });
      await newChar.save((err) => {
        if (err) return handleError(err);
        console.log("\tsuccess");
      });
    }
    count++;
  }
  console.log("finished writing characters");
}

function hashId(pinyin, definition) {
  let str =
    pinyin.replace(" ", "").toLowerCase() +
    definition.replace(" ", "").toLowerCase();
  const p = 31;
  const max = Number.MAX_SAFE_INTEGER;
  let hash = 0;
  let pow = 1;

  for (var i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i) * pow) % max;
    pow = (pow * p) % max;
  }
  let x = hash + "";
  for (var i = x.length; i < 24; i++) {
    x += "a";
  }
  return x;
}

function handleError(err) {
  //console.log(err);
  return err;
}