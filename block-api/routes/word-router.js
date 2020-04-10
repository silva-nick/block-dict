const express = require("express");
const router = express.Router();
const WordController = require("./word-ctrl");

router.get("/word/:id", WordController.getCharacterbyCharacter);

module.exports = router;
