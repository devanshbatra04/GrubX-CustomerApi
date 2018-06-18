module.exports = function (Cart){
    Cart.addToCart = function (product = null, qty = 1) {
        console.log(this);
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
    };
    Cart.inCart = function(productID = 0) {
        console.log(this);
        let found = false;
        this.data.items.forEach(item => {
            if(item.id === productID) {
                found = true;
            }
        });
        return found;
    };
    Cart.calculateTotals = function() {
        this.data.totals = 0;
        this.data.items.forEach(item => {
            let price = item.price;
            let qty = item.qty;
            let amount = price * qty;

            this.data.totals += amount;
        });
    };
    Cart.saveCart = function(request) {
        if(request.session) {
            request.session.cart = this;
            console.log("saveCart called");
        }
    };
    Cart.removeFromCart = function(id = 0) {
        for(let i = 0; i < this.data.items.length; i++) {
            let item = this.data.items[i];
            if(item.id === id) {
                this.data.items.splice(i, 1);
                this.calculateTotals();
            }
        }

    }

};