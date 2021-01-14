// DEPENDENCIES
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// CONFIGURATION
require("dotenv").config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// DATABASE
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log(`MonGOD connected at: ${MONGODB_URI}`);
});

db.on("error", (err) => {
    console.log(err.message + " is Mongod not running?/Problem with Atlas Connection?");
});
db.on("connected", () => {
    console.log(`mongo connected:  ${MONGODB_URI}`);
});
db.on("disconnected", () => console.log("mongo disconnected"));

// CONTROLLERS
const productsController = require("./controllers/products_controller.js");
app.use("/products", productsController);

// ROUTES
// app.get("/", (request, response) => {
//     response.send("index");
// });

// LISTENER
app.listen(PORT, () => {
    console.log("listening on port: ", PORT);
});