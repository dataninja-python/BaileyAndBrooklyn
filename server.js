// DEPENDENCIES
var express = require("express");
var morgan = require("morgan");
// CONFIGURATION
require("dotenv").config();
var app = express();
var PORT = process.env.PORT || 3000;
// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// CONTROLLER
// ROUTES
app.get("/", function (request, response) {
    response.send("index");
});
// LISTENER
app.listen(PORT, function () {
    console.log("listening on port: ", PORT);
});
