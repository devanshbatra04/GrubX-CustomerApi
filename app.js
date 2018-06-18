const app = require('express')();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const Security = require('./lib/security');
const cart = require('./lib/cart');
//...
let Cart;

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/grubx',
    collection: 'sessions'
});
function assignCart(Cart){
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
    }

}



app.use(session({
    secret: 'Dis ish Secretish',
    resave: false,
    saveUninitialized: true,
    store: store,
    unset: 'destroy',
    name: 'CartCheck',
}));

let checkCart = function (req,res,next){
    if (!req.session.cart) {
        req.session.cart = new cart();
    }
    Cart = req.session.cart;
    if (!Cart.addToCart) assignCart(Cart);
    console.log(Cart);
    next();
};
app.use(checkCart);

app.get('/', checkCart, function(req, res) {
    if(!req.session) {
        res.send('OK');
    }
    else res.send('still OK');

});

app.post('/test', (req, res) => {
    let token = req.body.nonce;
    if(Security.isValidNonce(token, req)) {
        // OK
    } else {
        // Reject the request
    }
});

app.get('/chillyPotato', (req, res)=> {
    let product = {
        product_id : 2,
        title : "ChillyPotato",
        price : 40,
    };
    console.log(Cart);

    Cart.addToCart(product, 1);
    res.send("product added");
    console.log(Cart);
});



app.listen(3000, function () {
    console.log('Ecommerce sample listening on port 3000!');
});