const app           = require('express')();
const session       = require('express-session');
const MongoDBStore  = require('connect-mongodb-session')(session);
const Security      = require('./lib/security');
const assignCart    = require('./lib/assigncart');
const cart          = require('./lib/cart');
const Product       = require('./models/products');
const mongoose      = require('mongoose');
//...
let Cart;

const store = new MongoDBStore({
    uri: "mongodb://don123:don123@ds163700.mlab.com:63700/grubx",
    collection: 'sessions'
});

mongoose.connect("mongodb://don123:don123@ds163700.mlab.com:63700/grubx");


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
app.get('/api/items', (req, res) => {
    console.log("I am here");
    Product.find({}, function(err, items){
        if (err) console.log(err) ;
        else {
            res.send(items);
        }
    });


});

app.listen(3000, function () {
    console.log('Ecommerce sample listening on port 3000!');
});