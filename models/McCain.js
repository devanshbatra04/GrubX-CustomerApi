'use strict';

const mongoose  = require('mongoose');

let Schema  = mongoose.Schema;

let ProductsSchema = new Schema({
        product_id: Number,
        title: String,
        description: String,
        price: Number},
    {collection: 'McCain'});
module.exports = mongoose.model("McCain", ProductsSchema, "McCain");