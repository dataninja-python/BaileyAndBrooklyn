// DEPENDENCIES
const express = require("express");
const morgan = require("morgan");

// CONFIGURATION
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// CONTROLLER

// ROUTES
app.get("/", (request, response) => {
    response.send("Hello World");
});

// LISTENER
app.listen(PORT, () => {
    console.log("listening on port: ", PORT);
});