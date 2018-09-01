'use strict';

const mongoose  = require('mongoose');

let Schema  = mongoose.Schema;

let ProductsSchema = new Schema({
        product_id: Number,
        title: String,
        description: String,
        price: Number},
    {collection: 'Amul'});
module.exports = mongoose.model("Amul", ProductsSchema, "Amul");