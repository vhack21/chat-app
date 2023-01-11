const express = require("express");

const path = require("path");

const app = express();

const http = require("http").createServer(app);

const db = require("./config/mongoose");
let User = require("./modals/user");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.port || 3000;

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
app.use("/", require("./routes"));

//socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("message", (msg) => {
    // console.log(msg);

    User.findOne({ user: msg.user }, function (err, user) {
      if (err) {
        console.log("error in finding the user");
        return;
      }
      if (!user) {
        User.create({
          user: msg.user,
          message: msg.message,
        });
      }
      if (user) {
        let newMsg = msg.message;
        user.message.push(newMsg);
        user.save();
      }
    });

    socket.broadcast.emit("message", msg);
  });
});
