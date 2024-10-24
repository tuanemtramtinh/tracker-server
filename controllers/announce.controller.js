const DownloadFileModel = require("../models/downloadFile.model");
const FileModel = require("../models/file.model");

module.exports.index = async (req, res) => {
  try {
    const file_name = req.query.file_name;
    const info_hash = req.query.info_hash;
    const ip = req.query.ip;
    const port = req.query.port;
    const left = parseInt(req.query.left);
    const num_of_pieces = req.query.num_of_pieces;

    //detect seeder
    if (left === 0) {
      const file = await FileModel.findOne({
        infoHash: info_hash,
      });

      if (file) {
        const seeders = file.seeders;

        const address = `${ip}:${port}`;

        console.log(address);

        const check = seeders.find((item) => item === address);

        if (!check) {
          seeders.push(address);

          await FileModel.updateOne(
            {
              infoHash: info_hash,
            },
            {
              seeders: seeders,
            }
          );

          const downloadFile = await DownloadFileModel.findOne({
            infoHash: info_hash,
          });

          console.log(downloadFile);

          await DownloadFileModel.updateOne(
            {
              infoHash: info_hash,
            },
            {
              seeders: downloadFile.seeders + 1,
            }
          );
        }
      } else {
        const address = [`${ip}:${port}`];
        const newFile = await FileModel.create({
          fileName: file_name,
          infoHash: info_hash,
          seeders: address,
          numOfPieces: num_of_pieces,
        });
      }

      res.json({ message: "Upload to tracker successfully" });
    }
    //detect leechers
    else {
      const info_hash = req.query.info_hash;

      const file = await FileModel.findOne({
        infoHash: info_hash,
      });

      res.json(file.seeders);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.infoHashBuffer = async (req, res) => {
  try {
    // console.log(req.body);

    const infoHash = req.body.infoHash;
    const infoHashBuffer = Buffer.from(req.body.infoHashBuffer, "base64");

    // console.log(infoHashBuffer);

    await FileModel.updateOne(
      {
        infoHash: infoHash,
      },
      {
        infoHashBuffer: infoHashBuffer,
      }
    );

    res.json("OK");
  } catch (error) {
    console.log(error);
  }
};

module.exports.find = async (req, res) => {
  try {
    const infoHash = Buffer.from(req.body.infoHash, "base64").toString("hex");
    // console.log(req.body);

    const file = await FileModel.findOne({
      infoHash: infoHash,
    });

    // console.log(file);

    res.json(file);

    // res.json("OK");
  } catch (error) {
    console.log(error);
  }
};

module.exports.online = (req, res) => {};
