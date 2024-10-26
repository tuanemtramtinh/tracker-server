const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: String,
  infoHash: String,
  infoHashBuffer: Buffer,
  seeders: Array,
  leechers: Number,
  numOfPieces: Number,
  size: Number,
});

const FileModel = mongoose.model("file", fileSchema);

module.exports = FileModel;
