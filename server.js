'use strict';

var express = require('express');
var path = require('path');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');

//init app
var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(express.static(process.cwd() + '/public'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
