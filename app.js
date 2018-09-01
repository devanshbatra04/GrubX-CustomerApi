const app           = require('express')();
const session       = require('express-session');
const MongoDBStore  = require('connect-mongodb-session')(session);
const Security      = require('./lib/security');
const assignCart    = require('./lib/assigncart');
const cart          = require('./lib/cart');
const Product       = require('./models/products');
const Offer         = require('./models/offers');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const ejs           = require('ejs');
const miniZayca     = require('./models/MiniZayca');
const JC            = require('./models/JC');
const McCain        = require('./models/McCain');
const Amul          = require('./models/Amul');



//...
let Cart;



const store = new MongoDBStore({
    uri: "mongodb://don123:don123@ds163700.mlab.com:63700/grubx",
    collection: 'sessions'
});

mongoose.connect("mongodb://don123:don123@ds163700.mlab.com:63700/grubx");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



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
    next();
};
app.use(checkCart);

app.get('/', checkCart, function(req, res) {
    if(!req.session) {
        res.send('OK');
    }
    else res.send('still OK');

});

// app.post('/test', (req, res) => {
//     let token = req.body.nonce;
//     if(Security.isValidNonce(token, req)) {
//         console.log("hmm?");
//         // OK
//     } else {
//         // Reject the request
//     }
// });

app.get('/chillyPotato', checkCart, (req, res)=> {
    let product = {
        product_id : 2,
        title : "ChillyPotato",
        price : 40,
    };

    Cart.addToCart(product, 1);
    res.send("product added");
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

app.post('/api/cart', checkCart, (req, res) => {
    let qty = parseInt(req.body.qty, 10);
    let product = parseInt(req.body.product_id, 10);
    if(qty > 0) {
        console.log(Cart);
        Product.findOne({product_id: product}).then(prod => {
            Cart.addToCart(prod, qty);
            Cart.saveCart(req);
            res.redirect('/api/cart');
        }).catch(err => {
            console.log(err);
            res.redirect('/');
        });
    }
    else {
        res.redirect('/');
    }
});

app.get('/api/cart', checkCart, (req, res)=> {
    res.send(Cart.data);

});

app.post('/api/cart/remove', checkCart, (req, res)=> {
    let product = parseInt(req.body.product_id, 10);
    Cart.removeFromCart(product);
    res.redirect('/api/cart');
});

app.post('/api/cart/empty', checkCart, (req, res)=> {
    Cart.emptyCart(req);
    res.redirect('/api/cart');
});

app.get("/api/offers", function(req, res){
    Offer.find({}, function(err, offers){
        if (err) res.send(err);
        else{
            res.send(offers);
        }
    })
})

app.get("*", function(req, res){
    console.log("request");
})

app.post("/s", function(req, res){
    console.log(req.body);
    res.send(req.body)
})



app.listen(3000, function () {
    console.log('listening on port 3000!');
});