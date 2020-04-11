var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var route = require("./routes/word-router.js");
app.use("/api", route);

//database
let mongoose = require("mongoose"); //.set("debug", true);

let mongoDB =
  "mongodb+srv://silva-nick:fzP92gFWHDZYg7tG@clusterblock-oej5x.gcp.mongodb.net/block_dictionary?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const apiPort = 3001;
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

module.exports = app;
