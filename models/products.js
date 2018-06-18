'use strict';

const mongoose  = require('mongoose');

let Schema  = mongoose.Schema;

let ProductsSchema = new Schema({
        product_id: Number,
        id: String,
        title: String,
        description: String,
        price: Number},
    {collection: 'products'});

module.exports = mongoose.model('Products', ProductsSchema);