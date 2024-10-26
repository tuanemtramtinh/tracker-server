const announceRoute = require("./announce.route");
const homeRoute = require("./home.route");
const userRoute = require("./user.route");

module.exports = (app) => {

  app.use("/user", userRoute);

  app.use("/announce", announceRoute);

  app.get("/", (req, res) => res.redirect("/home"));

  app.use("/home", homeRoute);

};
