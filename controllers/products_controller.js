// DEPENDENCIES
var express = require('express');
var babyProducts = express.Router();
var Product = require("../models/productSchema.js");
var theSeed = require("../models/products.js");
//todo: pull in seed
// ROUTES
var baseRoute = "/";
var newRoute = baseRoute + "new";
var seedRoute = baseRoute + "seed";
var idRoute = baseRoute + ":id";
var editRoute = idRoute + "/edit";
var deleteRoute = "" + idRoute;
babyProducts.get(baseRoute, function (request, response) {
    Product.find({}, function (err, foundProducts) {
        response.json(foundProducts);
    });
});
// babyProducts.get(seedRoute, (request, response) => {
//     Product.insertMany(theSeed, (err, manyProducts) => {
//         response.redirect(baseRoute);
//     });
// });
babyProducts.post("/", function (request, response) {
    var body = request.body;
    Product.create(body, function (err, createdProducts) {
        Product.find({}, function (err, foundProducts) {
            response.json(foundProducts);
        });
    });
});
babyProducts.put(idRoute, function (request, response) {
    var id = request.params.id;
    var body = request.body;
    Product.findByIdAndUpdate(id, body, { "new": true }, function (err, updatedProduct) {
        if (err) {
            response.send(err);
        }
        else {
            Product.find({}, function (err, foundProducts) { response.json(foundProducts); });
        }
    });
});
babyProducts["delete"](deleteRoute, function (request, response) {
    var id = request.params.id;
    Product.findByIdAndRemove(id, function (request, response) {
        Product.find({}, function (err, foundProducts) {
            response.json(foundProducts);
        });
    });
});
module.exports = babyProducts;
