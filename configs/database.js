const mongoose = require("mongoose");

module.exports.connect = () => {
  mongoose.connect("mongodb://truntrun.ddns.net:27017/bittorent", {
    authSource: "admin",
    user: "tuanemtramtinh",
    pass: "TuanAnh_0908",
  }).then(() => {
    console.log("Kết nối database thành công");
  })
};
