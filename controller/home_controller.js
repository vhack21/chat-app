let User = require("../modals/user");

module.exports.home = function (req, res) {
  User.find({}, function (err, chats) {
    if (err) {
      console.log("error in fetching the database");
      return;
    }
    return res.render("home", {
      title: "My chat App",
      chat_list: chats,
    });
  });
};
