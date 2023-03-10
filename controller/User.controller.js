const UserModel = require("../models/User.model");

//otp for user varification
const sendOtp = async (mobile) => {
  try {
    const user = await UserModel.findOne({ mobile });
    if (user) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      await UserModel.updateOne({ mobile: mobile }, { $set: { otp: otp } });

      return { message: "otp sent", status: "success", otp };
    } else {
      return { message: "user does not exist", status: "failed" };
    }
  } catch (err) {
    return { message: "otp failed", status: "error" };
  }
};

//login user
const loginUser = async (otp, mobile) => {
  if (
    mobile.toString().length != 10 ||
    !mobile ||
    !otp ||
    otp.toString().length != 4
  ) {
    return { message: "Invalid Input", status: "error" };
  }
  try {
    const user = await UserModel.findOne({ otp: otp, mobile: mobile });
    if (user) {
      await UserModel.updateOne({ mobile: mobile }, { $set: { otp: null } });
      return { message: "login success", status: "success" };
    } else {
      return { message: "wrong otp", status: "failed" };
    }
  } catch (err) {
    return { message: "something went wrong", status: "error" };
  }
};

// Create new user
const signupUser = async (first_name, last_name, mobile) => {
  try {
    const user = await UserModel.findOne({ mobile });
    if (user) {
      return { message: "user already exists", status: "exists" };
    } else {
      let newUserData = {
        first_name,
        last_name,
        mobile,
        cart: [],
      };
      const newUser = new UserModel(newUserData);
      newUser.save();
      return { message: "user created", status: "success" };
    }
  } catch (err) {
    return { message: "something went wrong", status: "error" };
  }
};

module.exports = { loginUser, sendOtp, signupUser };
