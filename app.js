// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//


// dependencies
var connect = require('connect')
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
//var MemoryStore = express.session.MemoryStore;
var sessionStore = new connect.middleware.session.MemoryStore();
var passphrase = "";

var options = {
		  key: fs.readFileSync('var/keys/server.key'),
		  cert: fs.readFileSync('var/keys/server.crt')
	};


	if(passphrase) {
		options.passphrase = passphrase;
	}


// main config
var app = express();
//var server = http.createServer(app);
//var server = require('http').Server(app);
//app.set('port', process.env.PORT || 3000);
app.configure(function () {
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('J976dd78Hffr#$%68h'));
app.use(express.session({store: sessionStore
    , secret: 'secret'
    , key: 'express.sid'}));
//app.use(express.session({
	  ///secret: '%%?7hhh%43SS_--$',
	  //store: new MongoStore({
		   // host: '127.0.0.1',
		    //port: 27017,
		   // db: 'diction4js'
		    
		 // })
		//}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/app", express.static(__dirname + "/app"));
});

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

var server = https.createServer(options, app);
app.set('port', process.env.PORT || 3000);
console.log(("Express server listening on port " + app.get('port')));




var io = require('socket.io').listen(server);
var SessionSockets = require('session.socket.io')
, sessionSockets = new SessionSockets(io, sessionStore, express.cookieParser());
//io.on('connection', function(socket){ 
sessionSockets.on('connection', function(err,socket,session){ 
	console.log("socket.io started on port"+ app.get('port'));
    
		socket.on("request",function(data){
			console.log("socket answer = "+ data);
			socket.emit("response", [ "docA" ,"docB"]);
		});
		socket.on("save",function(data){
			console.log("socket save = "+ data);
		
			session.docA += data;
			//session.doc += data; 
			session.save();
			console.log("session = "+ session);
			 
		});
	
	////here will go the initial load of the current saved user data (last diction)

		
	//app.get('/save', function(req, res) {
		 // req.session.doc += S ;
		 // console.log("session = "+ S);
		 // res.end();
	 // });
	
});


server.listen(3000);
