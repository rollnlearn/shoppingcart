require('babel-core/register')({
  "presets": ["es2015", "react", "stage-1"] 
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
/* var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); */

//PROXY
var httpProxy = require('http-proxy');
// Request Handler module
var requestHandler = require('./requestHandler.js');

/* var index = require('./routes/index');
var users = require('./routes/users'); */

var app = express();

// Proxy to API
const apiProxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:3001'
});

app.use('/api',function(req,res){
  apiProxy.web(req,res);
})
// End Proxy


// view engine setup
/* app.set('views', path.join(__dirname, 'views'));*/



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); */
app.use(express.static(path.join(__dirname, 'public')));


/* // APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var Books = require('./models/books.js');

//------------> POST BOOKS <----------------
app.post("/books", function(req,res){

  var book = req.body;

  Books.create(book, function(err,books){
    if(err){
      throw err;
    }

    res.json(books);
  });
});

//------------> GET BOOKS <----------------
app.get("/books", function(req,res){
  
  Books.find({},function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
  })

//------------> DELETE BOOKS <----------------
app.delete("/books/:_id", function(req,res){

  var query = {_id: req.params._id};
  
  Books.remove(query,function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})

//------------> UPDATE BOOKS <----------------
app.put("/books/:_id", function(req,res){
  
    var book = req.body;
    var query = {_id: req.params._id};
    var update = {
      $set:{
        title: book.title,
        description: book.description,
        image: book.image,
        price: book.price
      }
    };

    var options = {new: true};

    
    Books.update(query,update,options,function(err,books){
      if(err){
        throw err;
      }
      res.json(books);
    })
  })


// END APIs */

// Set view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(requestHandler);
/*
app.get('*', function(req,res){
  res.sendFile(path.resolve(__dirname,'views','index.html'));
})
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
