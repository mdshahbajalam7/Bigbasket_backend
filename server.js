const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/Product.route");
const userRouter = require("./routes/User.route");
const cartRouter = require("./routes/Cart.route");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares for the Apis
app.set("trust proxy", 1);
app.use(cors({
  origin: true,
  credentials: true,
  sameSite: "none",
}));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Api routes
app.use("/big-basket/auth", userRouter);
app.use("/big-basket/products", productRouter);
app.use("/big-basket/cart", cartRouter);

const PORT = process.env.PORT || 8080;
const mongoDB = process.env.MongoAtlas;

app.listen(PORT, async () => {
  mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection successful to server");
    })
    .catch((err) => {
      console.log(err, "Failed to connect to server");
    });
  console.log(`Listening on Port http://localhost:${PORT}`);
});
