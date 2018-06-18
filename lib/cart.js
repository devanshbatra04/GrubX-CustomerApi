'use strict';


class Cart {
    constructor() {
        this.data = {};
        this.data.items = [];
        this.data.totals = 0;
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
    calculateTotals() {
        this.data.totals = 0;
        this.data.items.forEach(item => {
            let price = item.price;
            let qty = item.qty;
            let amount = price * qty;

            this.data.totals += amount;
        });
    }
    addToCart(product = null, qty = 1) {
        if(!this.inCart(product.product_id)) {
            let prod = {
                id: product.product_id,
                title: product.title,
                price: product.price,
                qty: qty,
            };
            this.data.items.push(prod);
            this.calculateTotals();
        }
    }
}

module.exports = new Cart();