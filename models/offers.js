'use strict';

const mongoose  = require('mongoose');

let Schema  = mongoose.Schema;

let ProductsSchema = new Schema({
        product_id: Number,
        title: String,
        canteen: String,
        Category: String,
        url: String,
        totalPrice: Number,
        description: String,
        price: Number,
        items: []},
    {collection: 'Offers'});

module.exports = mongoose.model("Offer", ProductsSchema, "Offers");