const app = require('express')();
const session = require('express-session');
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/grubx',
    collection: 'sessions'
});

app.use(session({
    secret: 'Dis ish Secretish',
    resave: false,
    saveUninitialized: true,
    store: store,
    unset: 'destroy',
    name: 'session cookie name'
}));


app.listen(3000, function () {
    console.log('Ecommerce sample listening on port 3000!');
});