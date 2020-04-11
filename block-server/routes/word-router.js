const express = require("express");
const router = express.Router();
const WordController = require("./word-ctrl");

router.get("/word/:id", WordController.getWordById);
router.get("/char/:char", WordController.getCharacterByCharacter);

module.exports = router;
