const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/chat-app");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to DB"));

db.once("open", function () {
  console.log("Connected to database");
});
module.exports = db;
