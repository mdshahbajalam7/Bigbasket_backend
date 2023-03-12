const { Router } = require("express");
const {
  loginUser,
  sendOtp,
  signupUser,
} = require("../controller/User.controller");

const userRouter = Router();

//send otp routes
userRouter.post("/login", async (req, res) => {
  const { mobile } = req.body;
  if (!mobile || mobile.toString().length != 10) {
    return res.status(400).send({ message: "Invalid Mobile Number" });
  }
  const { message, status, otp } = await sendOtp(mobile.toString());
  if (status === "error") {
    return res.status(404).send({ message, status });
  } else if (status === "failed") {
    return res.status(201).send({ message, status });
  }

  return res.status(200).send({ message, status, data: otp });
});

//login user by otp check
userRouter.post("/login/otp", async (req, res) => {
  const { otp, mobile } = req.body;
  const { message, status } = await loginUser(otp, mobile);
  if (status === "error") {
    return res.status(404).send({ message, status });
  } else if (status === "failed") {
    return res.status(201).send({ message, status });
  } else {
    return res
      .cookie("auth", mobile)
      .status(200)
      .send({ message, status });
  }
});

// create new user
userRouter.post("/signup", async (req, res) => {
  const { first_name, last_name, mobile } = req.body;
  if (
    mobile.toString().length != 10 ||
    !mobile ||
    !first_name ||
    !last_name ||
    first_name.trim() == "" ||
    last_name.trim() == ""
  ) {
    return res.status(200).send({ message: "Invalid input" });
  }
  const { message, status } = await signupUser(
    first_name,
    last_name,
    mobile.toString()
  );
  if (status === "error") {
    return res.status(404).send({ message, status });
  } else if (status === "exists") {
    return res.status(200).send({ message, status });
  }
  return res.status(200).send({ message, status });
});

//logout user
userRouter.get("/logout", async (req, res) => {
  res.clearCookie('auth');
  
  return  res
  .status(200)
    .send({ message: "user loggedout successfully", status: "success" });
});

module.exports = userRouter;
