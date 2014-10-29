// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// Diction4js - Web based hands-free text editor
//


// dependencies

var path = require('path');  
var express = require('express');
var http = require('http');
var https = require('https');
var session    = require('express-session');
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
var username= "";

app.post('/login', passport.authenticate('local'), function(req, res) {
	username = req.body.username;
	console.log(username);
    res.redirect('/home');
});

var server = https.createServer(options, app);
app.set('port', process.env.PORT || 3000);
console.log(("Express server listening on port " + app.get('port')));


var io = require('socket.io').listen(server);

io.on('connection', function(socket){ 
	var MEMORY = mongoose.model('memory', memoryDb);
	var memory = new Object();	
	memory.docA = "";
	memory.docB= "";
	console.log("socket.io started on port"+ app.get('port'));
	
	MEMORY.findOne({ username: username}, function (err, doc){
		  if (err) return console.error(err);
		  console.log("starting elements stored in "+ username+" db: docA,docB "+doc);

	});
	
	    socket.on("load",function(data){
	    	MEMORY.findOne({ username: username}, function (err, doc){
	    		
	    	if(doc != null){
	    	socket.emit("res.load", [doc.docA, doc.docB]);  
	    	}else{
	    	var Memory = new MEMORY({ docA: "", docB: "" , username: username });
			Memory.save(function (err, Memory) {
			if (err) return console.error(err);
			});
	    	socket.emit("res.load", ["", ""]);    
	        }				  
			});	    	
	    });
	    
	    socket.on("newtext",function(data){
			MEMORY.findOne({ username: username}, function (err, doc){
				var query = {docA:doc.docA, docB:doc.docB, username: username},
				    options = { multi: true };
				  console.log(" query =  :"+ query);
				
				  MEMORY.update(query, { docA: "", docB: "", username: username}, options, callback);
				  function callback (err, numAffected) {
					   //numAffected is the number of updated documents
		
					};
			});	
	    });


		socket.on("request",function(data){
			MEMORY.findOne({ username: username}, function (err, doc){
				  console.log(" findOne did send :"+ doc);
				  console.log(" last doc for :: doc.docA for" + username+"  :"+ doc.docA);
				  socket.emit("response", [doc.docA, doc.docB]);
			});

		
		});
		var Json={event:"0",data:""};
		var lock;
		//var X = new Object();
		//X.docs = new Array();
		//X.docs[0]={event:"0",data:""};

		
		socket.on("save",function(data){
		console.log("save has fire()--------------------------------->>")
			
			var doc = data[0];			
			memory.docA = data[1];
			memory.docB = data[2];
			var json = data[3];

			//for (i in X.docs){
			//	console.log("X.docs["+i+"] = "+X.docs[i]);
			//	console.log("X.docs.["+i+"].data = "+X.docs[i].data);
			//}
			
			//J = JSON.stringify(Json)+','+ JSON.stringify(json);
			J = Json+','+ json;
			console.log("J in app = "+J);
			Json =J;
			J = {docs:[ J ]};
		
			console.log("final J in app = "+J);
			console.log("final JSON.stringify(J) in app = "+JSON.stringify(J));
			console.log("J.docs in app = "+J.docs);
			console.log("J.docs[0] in app = "+J.docs[0]);
			console.log("J.docs[0].data in app = "+J.docs[0].data);
			console.log("Json in app = "+Json);
			MEMORY.findOne({ username: username}, function (err, doc){
				var query = {docA:doc.docA, docB:doc.docB, username: username},
				    options = { multi: true };
				  console.log(" query =  :"+ query);
				
				  MEMORY.update(query, { docA: memory.docA , docB: memory.docB, username: username}, options, callback);
				  function callback (err, numAffected) {
					   //numAffected is the number of updated documents
						//console.log("json in app = "+JSON.stringify(json));
						//var num = (X.docs.length);
						//console.log("X.docs[(num-1)].data = "+X.docs[(num-1)].data);
						//console.log("json.data = "+json.data);
						//if(X.docs[(num-1)].data!= json.data){
						
						//X.docs[num] = json;
						//}
						//console.log("num = "+num);
						//console.log("X.docs[(num-1)].data = "+X.docs[(num-1)].data );
						console.log("socket save = "+ doc);
						console.log("memory A >> save= "+ memory.docA );
						console.log("memory B >> save= "+ memory.docB );
						console.log("username >> save= "+ username);
					};
			});


				
		});
		
		socket.on("cmd",function(data){			
						
			memory.docA = data[0];
			memory.docB = data[1];
			
			MEMORY.findOne({ username: username}, function (err, doc){
				var query = {docA:doc.docA, docB:doc.docB, username: username},
				    options = { multi: true };
				  console.log(" query =  :"+ query);
				
				  MEMORY.update(query, { docA: memory.docA , docB: memory.docB, username: username}, options, callback);
				  function callback (err, numAffected) {
					   //numAffected is the number of updated documents
						console.log("memory A >> save= "+ memory.docA );
						console.log("memory B >> save= "+ memory.docB );
					};
			});
			});	
		
});


server.listen(3000);
