var http = require('http')
  , path = require('path')
  , connect = require('connect')
  , express = require('express')
  , app = express();

var https = require('https');
var session  = require('express-session');
//var MongoStore = require('connect-mongo')(express);
var mongoose = require('mongoose');
var passport = require('passport');
var fs = require('fs');
var LocalStrategy = require('passport-local').Strategy;
//var MemoryStore = express.session.MemoryStore;
//var sessionStore = new MemoryStore();
var passphrase = "";

var options = {
		  key: fs.readFileSync('var/keys/server.key'),
		  cert: fs.readFileSync('var/keys/server.crt')
	};


	if(passphrase) {
		options.passphrase = passphrase;
	}

var cookieParser = express.cookieParser('your secret sauce')
  , sessionStore = new connect.middleware.session.MemoryStore();

app.configure(function () {
  app.set('views', path.resolve('views'));
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(cookieParser);
  app.use(express.session({ store: sessionStore }));
  app.use(app.router);
});

//routes
require('./routes')(app);

var server = https.createServer(options,app)
  , io = require('socket.io').listen(server);
app.set('port', process.env.PORT || 3000);

var SessionSockets = require('session.socket.io')
  , sessionSockets = new SessionSockets(io, sessionStore, cookieParser);


sessionSockets.on('connection', function (err, socket, session) {
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
		console.log("session = "+ session.docA);
		 
	});
});

server.listen(3000);