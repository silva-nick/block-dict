var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CharSchema = new Schema({
  simplified: String,
  blocks: [Schema.Types.ObjectId],
});

module.exports = mongoose.model("Character", CharSchema);
