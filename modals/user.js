const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    message: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
