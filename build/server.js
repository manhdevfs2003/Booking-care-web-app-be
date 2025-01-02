"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./route/web"));
var _conectDB = _interopRequireDefault(require("./config/conectDB"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import cors from 'cors';

require('dotenv').config(); // giup chayj dc dong process.env

var app = (0, _express["default"])();
// app.use(cors({ origin: true }));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(_bodyParser["default"].json({
  limit: "50mb"
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "50mb",
  extended: true
}));
(0, _viewEngine["default"])(app);
(0, _web["default"])(app);
(0, _conectDB["default"])();
var port = process.env.PORT || 8080; //Port === undefined => Port = 6060

app.listen(port, function () {
  //callback
  console.log("Backend Nodejs is running on the port: " + port);
});