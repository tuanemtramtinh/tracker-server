const UserModel = require("../models/user.model");

module.exports.userAuthentication = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect("/user/login");
  } else {
    const existUser = await UserModel.findOne({
      token: req.cookies.tokenUser,
    });

    if (!existUser) {
      res.redirect("/user/login");
      return;
    }

    res.locals.user = existUser;
    next();
  }
};
