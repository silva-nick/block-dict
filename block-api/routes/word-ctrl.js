const Character = require("../models/character");
const Word = require("../models/word");
const mongoose = require("mongoose");

getCharacterByCharacter = async function (req, res) {
  await Character.findOne(
    { simplified: req.params.char },
    async (error, char) => {
      if (error) return handleError(error);
      if (!char)
        return res
          .status(404)
          .json({ success: false, error: `Character not found` });

      let idList = char.blocks;
      var wordList = [];
      for (const wordId of idList) {
        await Word.findOne({ _id: wordId }, (err, word) => {
          if (err) return handleError(err);
          wordList.push(word);
        }).catch((err) => console.log(err));
      }
      return res.status(200).json({ success: true, data: wordList });
    }
  ).catch((err) => console.log(err));
};

getWordById = async function (req, res) {
  try {
    await Word.find({ _id: req.params.id }, (err, word) => {
      if (!word)
        return res
          .status(404)
          .json({ success: false, error: `Word not found` });
      if (err) return handleError(err);
      return res.status(200).json({ success: true, data: word });
    });
  } catch (error) {
    handleError(error);
  }
};

function handleError(err) {
  console.log(err);
  return err;
}

module.exports = { getCharacterByCharacter, getWordById };
