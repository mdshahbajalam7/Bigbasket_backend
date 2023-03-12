const { Router } = require("express");
const { cartItems, removecart } = require("../controller/Cart.controller");
const authenticate = require("../Middleware/Authorization.middleware");

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  const mobile = req.cookies.auth;
  console.log(mobile);
  const { user } = await authenticate(mobile);
  if (user === undefined || user.length === 0) {
    return res
      .status(401)
      .send({ message: "unauthorised user", status: "failed" });
  }
  const { message, status, data } = await cartItems(mobile);
  if (status === "error") {
    return res.status(404).send({ message, status });
  }
  return res.status(200).send({ message, status, data });
});

cartRouter.get("/removecartdata", async (req, res) => {
  const mobile = req.cookies.auth;
  const user = await authenticate(mobile);
  if (user === undefined || user.length === 0) {
    return res
      .status(401)
      .send({ message: "unauthorised user", status: "failed" });
  }
  const { message, status, Data } = await removecart(mobile);
  if (status === "error") {
    return res.status(404).send({ message, status });
  }
  return res.status(200).send({ message, status, Data });
});

module.exports = cartRouter;
