var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
var dbConnection = require("./db/init");
var routerUser = require("./route/userRoutes");
var routerAuth = require("./route/auth");
const { application } = require("express");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

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

// db connection
dbConnection();
server.use(express.json());

// routes
server.use("/api", routerUser);
// server.use("/api/auth", routerAuth);
server.use(notFound);
server.use(errorHandler);

server.listen(runningPort, function () {
  console.log("Server started on port:", runningPort);
});
