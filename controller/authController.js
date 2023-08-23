const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config");
const callback = require("../models/Callback");

//User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if user already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: "User Already Exists" });
    }
    //Hash Password
    const hashedPswd = await bcrypt.hash(password, 10);
    //Create new user.

    const newUser = new User({ 
      name,
      email,
      password: hashedPswd,
      courses: [],
      address1: "",
      pin: "",
      state: "",
      city: "",
      country: "",
      year: "",
      college: "",
      degree: "",
      saved: "False",
    });
    await newUser.save();
  } catch (error) {
    console.log("Error Registering User", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//User Login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if the user in db using Email Id already exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    //Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    //Generate jwt token

    const token = jwt.sign({ userId: user._id }, config.secret_key, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      error: false,
      isUserLoggedIn: true,
      username: user.name,
      email: user.email,
      courses: user.courses,
      saved: user?.saved || "False",
      message: "Valid details",
    });
  } catch (error) {
    console.log("Error Authenticating the user:", error);
    return res
      .status(500)
      .json({
        message: "Internal Server Error",
        error: true,
        isUserLoggedIn: false,
        message: err,
        username: "",
        email: "",
        courses: [],
        saved: "False",
      });
  }
};

exports.userLogoutController = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({
            error: false,
            message: "Logged out successfully"
        })
    } catch (err) {
        res.status(401).json({
            error: true,
            message: err
        })
    }

}

exports.callbackController = (req, res) => {
  try {
    // const name = req.body.name;
    // const email = req.body.email;
    // const phone = req.body.phone;
    // const year = req.body.year;

    const {name, email, phone, year} = req.body;

    const callbackDetails = new Callback({
      name,
      email,
      phone,
      year,
    });

    callbackDetails
      .save()
      .then((re) => {
        res.status(200).json({
          error: false,
          message: "success",
        });
      })
      .catch((err) => {
        res.status(401).json({
          error: true,
          message: err,
        });
      });
  } catch (err) {
    res.status(401).json({
      error: true,
      message: err,
    });
  }
};

module.exports = exports;
