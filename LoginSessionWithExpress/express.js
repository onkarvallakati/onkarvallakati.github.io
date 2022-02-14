const express = require('express');
var app = express();
const session = require('express-session');
const mongoStore = require('connect-mongo');

app.use(session({
    store: mongoStore.create({
      mongoUrl: 'mongodb+srv://rajib:ammabba123@cluster0.hqbfn.mongodb.net/testdb?retryWrites=true&w=majority',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 }
  }));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.set('views','templates');
app.set('view engine','ejs');

const logger = function(req, res, next){
    console.log(`[${new Date()}][${req.method}][${req.url}]`);
    next();
}

app.use(logger);

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.get('/', (req, res)=>{
    res.redirect('/auth/signin');
})

const errorHandler = function(err, req, res, next){
    if(err) {
        res.status(500).save(err.toString());
    }
}

app.use(errorHandler);

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
console.log(server_port + "----" + server_host);
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

//app.listen(5000, ()=>{console.log('server is running..')});
