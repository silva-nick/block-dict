var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var WordSchema = new Schema({
  simplified: [String],
  pinyin: String,
  english: String,
  _blockId: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
});

WordSchema.virtual("simpleString").get(function () {
  return this.simplified.join("");
});

module.exports = mongoose.model("Word", WordSchema);
