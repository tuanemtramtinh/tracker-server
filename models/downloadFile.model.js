const mongoose = require("mongoose");

const downloadFileSchema = new mongoose.Schema(
  {
    fileName: String,
    size: Number,
    link: String,
    seeders: Array,
    leechers: Number,
    infoHash: String,
  },
  {
    timestamps: true,
  }
);

const DownloadFileModel = mongoose.model("download", downloadFileSchema);

module.exports = DownloadFileModel;
