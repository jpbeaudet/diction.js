// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//


// dependencies

var path = require('path');  
var express = require('express');
var http = require('http');
var https = require('https');
var session    = require('express-session');
//var MongoStore = require('connect-mongo')(express);
var mongoose = require('mongoose');
var passport = require('passport');
var fs = require('fs');
var LocalStrategy = require('passport-local').Strategy;
var passphrase = "";
var sessionStore = new express.session.MemoryStore();
var EXPRESS_SID_KEY = 'express.sid';
var COOKIE_SECRET ='J976dd78Hffr#$%68h';

var options = {
		  key: fs.readFileSync('var/keys/server.key'),
		  cert: fs.readFileSync('var/keys/server.crt')
	};


	if(passphrase) {
		options.passphrase = passphrase;
	}

var cookieParser = express.cookieParser(COOKIE_SECRET);
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
app.use(cookieParser);
app.use(express.session({
    store: sessionStore,
    cookie: { 
        httpOnly: true
    },
    key: EXPRESS_SID_KEY
}));
//app.use(express.session({
	 // secret: '%%?7hhh%43SS_--$',
	 // store: new MongoStore({
		   // host: '127.0.0.1',
		   // port: 27017,
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

var memoryDb = require('./models/save');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("db started ------------");
});

// routes
require('./routes')(app);

var server = https.createServer(options, app);
app.set('port', process.env.PORT || 3000);
console.log(("Express server listening on port " + app.get('port')));


//var MEMORY = mongoose.model('memory', memoryDb);
//var Memory = new MEMORY({ docA: "", docB: "" });
//Memory.save(function (err, Memory) {
	 // if (err) return console.error(err);
	//});


var io = require('socket.io').listen(server);

io.on('connection', function(socket){ 
	var MEMORY = mongoose.model('memory', memoryDb);
	//var memory ="";
	var memory = new Object();	
	memory.docA = "";
	memory.docB= "";
		
	console.log("socket.io started on port"+ app.get('port'));
	MEMORY.find(function (err, docs) {
		  if (err) return console.error(err);
		  console.log("starting elements stored in db: docA,docB "+docs);

	});

		socket.on("request",function(data){
			MEMORY.find(function (err, docs) {
				  if (err) return console.error(err);
				  console.log("element stored in db: docA,docB "+docs);
				  
				 var docsL= docs.length;
				 console.log("docsL = "+docsL);
				  
					console.log("socket answer = "+ data);
					console.log("memory A >>= "+ memory.docA );
					console.log("memory B >>= "+ memory.docB );
					console.log("docsA docs[docsL - 1][0];>>= "+ docs[docsL - 1][0] );
					console.log("docsB docs[docsL - 1][0];>>= "+ docs[docsL - 1][1] );
					socket.emit("response", [ memory.docA ,memory.docB]);
			});
		
		});
		socket.on("save",function(data){
			
			var doc = data[0];			
			memory.docA = data[1];
			memory.docB = data[2];
			

			//Memory.update({ docA: '' , docB: ''}, { docA: memory.docA , docB: memory.docB}, callback);

			//function callback (err, numAffected) {
			 // console.log("affected array element = " + numAffected)
				//Memory.save(function (err, Memory) {
					// if (err) return console.error(err);
						//});
			//}
			delete mongoose.models.Memory;
			var Memory = new MEMORY({ docA: memory.docA, docB: memory.docB });
			Memory.save(function (err, Memory) {
				  if (err) return console.error(err);
				});
			console.log("socket save = "+ doc);
			console.log("memory A >> save= "+ memory.docA );
			console.log("memory B >> save= "+ memory.docB );

		});
		
		socket.on("cmd",function(data){			
						
			memory.docA = data[0];
			memory.docB = data[1];
			delete mongoose.models.Memory;
			var Memory = new MEMORY({ docA: memory.docA, docB: memory.docB });
			Memory.save(function (err, Memory) {
				  if (err) return console.error(err);
				});
			console.log("memory A >> save= "+ memory.docA );
			console.log("memory B >> save= "+ memory.docB );

		});
	
	////here will go the initial load of the current saved user data (last diction)

	
	
});


server.listen(3000);
