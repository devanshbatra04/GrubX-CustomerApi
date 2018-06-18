'use strict';

const config = require('./config');

class Cart {
    constructor() {
        this.data = {};
        this.data.items = [];
        this.data.totals = 0;
        this.data.formattedTotals = '';
    }
    inCart(productID = 0) {
        let found = false;
        this.data.items.forEach(item => {
            if(item.id === productID) {
                found = true;
            }
        });
        return found;
    }
}

module.exports = new Cart();