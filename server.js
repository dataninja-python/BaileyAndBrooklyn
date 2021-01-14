// DEPENDENCIES
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
// CONFIGURATION
require("dotenv").config();
var app = express();
var db = mongoose.connection;
var PORT = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI;
// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// DATABASE
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function () {
    console.log("MonGOD connected at: " + MONGODB_URI);
});
db.on("error", function (err) {
    console.log(err.message + " is Mongod not running?/Problem with Atlas Connection?");
});
db.on("connected", function () {
    console.log("mongo connected:  " + MONGODB_URI);
});
db.on("disconnected", function () { return console.log("mongo disconnected"); });
// CONTROLLERS
var productsController = require("./controllers/products_controller.js");
app.use("/products", productsController);
// ROUTES
// app.get("/", (request, response) => {
//     response.send("index");
// });
// LISTENER
app.listen(PORT, function () {
    console.log("listening on port: ", PORT);
});
