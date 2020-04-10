let Character = require("./models/character");
let Word = require("./models/word");

getCharacterByCharacter = async (req, res) => {
  await Character.findOne(
    { simplified: req.params.simplified },
    (error, char) => {
      if (error) return handleError(err);
      if (!char)
        return res
          .status(404)
          .json({ success: false, error: `Character not found` });

      let idList = char.blocks;
      var wordList = [];

      for (const wordId in idList) {
        Word.findOne({ _blockId: wordId }, (err, word) => {
          if (err) return handleError(err);
          wordList.push(word);
        }).catch((err) => console.log(err));
      }
      return res.status(200).json({ success: true, data: wordList });
    }
  ).catch((err) => console.log(err));
};

function handleError(err) {
  console.log(err);
  return err;
}

module.exports = getCharacterByCharacter;
