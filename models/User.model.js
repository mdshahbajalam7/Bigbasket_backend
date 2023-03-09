const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    mobile: String,
    otp:Number,
    Cart: [
      {
        productId: Schema.Types.ObjectId,
        quantity: Number,
      },
    ],
  },
  { collection: "user" }
);

const UserModel = model("UserModel", UserSchema, "user");

module.exports = UserModel;
