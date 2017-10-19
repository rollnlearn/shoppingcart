var express = require('express');
/* var path = require('path');
var favicon = require('serve-favicon');*/
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/* var index = require('./routes/index');
var users = require('./routes/users'); */

var app = express();

// view engine setup
/* app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); */

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/* app.use(express.static(path.join(__dirname, 'public'))); */

// APIs
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect('mongodb://testUser:Rnl20170801@ds123695.mlab.com:23695/bookshop');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'# MongoDB - Connection Error: '));

// SET UP SESSIONS
//console.log(require('connect'))
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 2*24*60*60*1000
  })
}));


// SAVE TO SESSION

app.post('/cart', function(req,res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
});

// GET SESSION CART API

app.get('/cart', function(req,res){
  if(typeof req.session.cart != undefined){
    res.json(req.session.cart);
  }
});
// END OF SESSIONS ET UP


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
  console.log("tyring to get books");
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
    
    var options = {newreturnNewDocument: true};  
    Books.findOneAndUpdate(query,update,options, function(err,bookList){
      res.json(bookList);
    });
  });


// GET BOOK IMAGES API
app.get('/images', function(req,res){
  const imageFolder = __dirname + '/public/images';
  const fs = require('fs');
  fs.readdir(imageFolder, function(err,files){
    if(err){
      return console.log(err);
    }else{
      const filesArr = [];
      //console.log(files);
      files.forEach(function(file){
        filesArr.push({name:file});
      })
      res.json(filesArr);
    }
  })
})



// END APIs

var port = 3001;
app.listen(port,function(err){
  if(err){
    return console.log('Error while running API server. Error :' + err);
  }
  console.log('\n API server listening on http://localhost:' + port.toString());
})