const md5 = require("md5");
const generateHelper = require("../helpers/generateHelper");
const UserModel = require("../models/user.model");

module.exports.login = (req, res) => {
  try {
    res.render("client/pages/user/login", {
      pageTitle: "Trang Đăng Nhập",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.register = (req, res) => {
  try {
    res.render("client/pages/user/register", {
      pageTitle: "Trang Đăng Ký",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("tokenUser");

    req.flash("success", "Đăng xuất thành công");
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports.loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    const encodePassword = md5(password);

    const existUser = await UserModel.findOne({
      email: email,
    });

    if (!existUser) {
      req.flash("error", "Tài khoản không tồn tại");
      res.redirect("back");
      return;
    }

    if (encodePassword !== existUser.password) {
      req.flash("error", "Sai mật khẩu");
      res.redirect("back");
      return;
    }

    req.flash("success", "Đăng nhập thành công");
    res.cookie("tokenUser", existUser.token);
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

module.exports.registerPost = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const encodePassword = md5(password);
    const token = generateHelper.makeid(20);

    const existUser = await UserModel.findOne({
      email: email,
    });

    if (existUser) {
      req.flash("error", "Tài khoản đã tồn tại");
      res.redirect("back");
      return;
    }

    const newUser = new UserModel({
      fullName: fullName,
      email: email,
      password: encodePassword,
      token: token,
    });

    await newUser.save();

    req.flash("success", "Đăng ký thành công");

    res.cookie("tokenUser", token);

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};
