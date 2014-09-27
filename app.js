// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//


// dependencies
var path = require('path');
var express = require('express');
var http = require('http');
var https = require('https');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(express);
var mongoose = require('mongoose');
var passport = require('passport');
var fs = require('fs');
var LocalStrategy = require('passport-local').Strategy;


// main config
var app = express();
var server = require('http').Server(app);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('J976dd78Hffr#$%68h'));
app.use(express.session({
	  secret: '%%?7hhh%43SS_--$',
	  store: new MongoStore({
		    host: '127.0.0.1',
		    port: 27017,
		    db: 'diction4js'
		    
		  })
		}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose');

// routes
require('./routes')(app);

app.listen(app.get('port'), function(){
  console.log(("Express server listening on port " + app.get('port')));
});

var io = require('socket.io').listen(4000);
io.on('connection', function(socket){ 
	//here will go the initial load of the current saved user data (last diction)
	io.on("request",function(){
		
	});
	
});

server.listen(4000);
server.listen(3000);