// DEPENDENCIES
const express = require('express');
const babyProducts = express.Router();
const Product = require("../models/products.js");
//todo: pull in seed

// ROUTES
const baseRoute = "/";
const newRoute = `${baseRoute}new`;
const seedRoute = `${baseRoute}insert/seed`;
const idRoute = `${baseRoute}:id`;
const editRoute = `${idRoute}/edit`;
const deleteRoute = `${idRoute}`;

babyProducts.get(baseRoute, (request, response) => {
    response.send("index");
});

// babyProducts.get(baseRoute, (request, response) => {
//     Product.find({}, (err, foundProducts) => {
//         response.json(foundProducts);
//     });
// });

babyProducts.post(baseRoute, (request, response) => {
    let body = request.body;
    Product.create(body, (err, createdProducts) => {
        Product.find({}, (err, foundProducts) => {
            response.json(foundProducts);
        });
    });
});

babyProducts.put(idRoute, (request, response) => {
    let id = request.params.id;
    let body = request.body;
    Product.findByIdAndUpdate(id, body, {new: true}, (err, updatedProduct) => {
        if(err) {
            response.send(err);
        } else {
            Product.find({}, (err, foundProducts) => { response.json(foundProducts); });
        }
    });
});

babyProducts.delete(idRoute, (request, response) => {
    let id = request.params.id;
    Product.findByIdAndRemove(id, (request, response) => {
        Product.find({}, (err, foundProducts) => {
            response.json(foundProducts);
        });
    });
});

module.exports = babyProducts;