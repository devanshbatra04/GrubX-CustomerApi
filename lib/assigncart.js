module.exports = function (Cart){
    Cart.addToCart = function (product = null, qty = 1) {
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
            request.session.cart = this.data;
            console.log("saveCart called");
        }
    };

};