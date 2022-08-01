var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
// var dbConnection = require("./db/init");
var router = require("./route");

var server = express();
var runningPort = process.env.PORT || 3001;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(
  cors({
    origin: "*",
  })
);
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

server.use("/api", router);
// dbConnection();

server.listen(runningPort, function () {
  console.log("Server started on port:", runningPort);
});
