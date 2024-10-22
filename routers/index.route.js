const announceRoute = require("./announce.route");

module.exports = (app) => {
  app.use("/announce", announceRoute);
};
