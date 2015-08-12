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
var markdownpdf = require("markdown-pdf");
//require('./var/passport')(passport); // pass passport for configuration
var fs = require('fs');
var LocalStrategy = require('passport-local').Strategy;
var passphrase = "";
var sessionStore = new express.session.MemoryStore();
var expressValidator = require('express-validator');
var flash    = require('connect-flash');
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
app.use(flash());
app.use(express.logger());
app.use(express.bodyParser());
app.use(expressValidator());
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
var username= "";
require('./routes')(app);


app.post('/login', function(req, res,next) {
    req.assert('username', 'required').notEmpty();
    req.assert('username', 'valid email required').isEmail();
    req.assert('password', 'required').notEmpty();
    //req.assert('password', '6 to 20 characters required with at least 1 number, 1 upper case character and 1 special symbol').isStrongPassword();

    var errors = req.validationErrors();

    if (errors) {
        return res.render("login", {errors: errors});
    }
	username = req.body.username;
	console.log(username);
    next();
//}, passport.authenticate('local-login', {
}, passport.authenticate('local', {

    successRedirect : '/home', // redirect to the secure account section
    failureRedirect : '/login' ,// redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.get('/download', function(req, res){
	  var MEMORY = mongoose.model('memory', memoryDb);
	  var path = require('path');
	  var file_content;
	  var file_title ;
	  MEMORY.findOne({ username: username}, function (err, doc){
		  file_content=doc.docA+doc.docB;
		  file_title = doc.title || "Untitled";
	  });
	  
	  var filepath = path.join(__dirname, 'public/tmp/');
	 // var md = "foo===\n* bar\n* baz\n\nThis should be orking when i get text content"
	  console.log("download has sent title= "+file_title+" content = "+file_content+"at path ="+ filepath);
	 var md = file_content
	    , outputPath = filepath + file_title+".pdf";
	   
	  markdownpdf().from.string(md).to(outputPath, function () {
	    console.log("Created", outputPath);
	  });
	  var file = filepath + file_title+".pdf";
	  res.download(file); // Set disposition and send it.
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
	    	//socket.join(username);
	    	MEMORY.findOne({ username: username}, function (err, doc){
	    		
	    	if(doc != null){
	    	socket.emit("res.load", [doc.docA, doc.docB,username,doc.title]);  
	    	}else{
	    	var Memory = new MEMORY({ docA: "", docB: "" , username: username,lastsaveA:"",lastsaveB:"",title:"Untitled"});
			Memory.save(function (err, Memory) {
			if (err) return console.error(err);
			});
	    	socket.emit("res.load", ["", "", username,"Untitled"]);   
			//socket.to(username).emit("res.load", ["", "",username]);  
	        }				  
			});	    	
	    });
	    
	    socket.on("newtext",function(data){
			MEMORY.findOne({ username: username}, function (err, doc){
				var query = {docA:doc.docA, docB:doc.docB, username: username,lastsave:doc.lastsave},
				    options = { multi: true };
				  console.log(" query =  :"+ query);
				
				  MEMORY.update(query, { docA: "", docB: "", username: username,lastsaveA:"",lastsaveB:"",title:"Untitled"}, options, callback);
				  function callback (err, numAffected) {
					   //numAffected is the number of updated documents
		
					};
			});	
	    });


		socket.on("request",function(data){
			MEMORY.findOne({ username: username}, function (err, doc){
				  console.log(" findOne did send :"+ doc);
				  console.log(" last doc for :: doc.docA for" + username+"  :"+ doc.docA);
					console.log("lastsave A >> request = "+ doc.lastsaveA );
					console.log("lastsave B >> request = "+ doc.lastsaveB );
					console.log("doc.docA >> request = "+ doc.docA);
					console.log("doc.docB>> request = "+ doc.docB);
				  socket.emit("response", [doc.docA, doc.docB,doc.lastsaveA,doc.lastsaveB,doc.title]);
				  //socket.to(username).emit("response", [doc.docA, doc.docB,doc.lastsaveA,doc.lastsaveB]);

			});

		
		});

		var lock;
 var lock2;
		socket.on("save",function(data){
		console.log("save has fire()--------------------------------->>")
			
			var doc = data[0];			
			memory.docA = data[1];
			memory.docB = data[2];
			var json = data[3];
			var title = data[4];
			console.log("memory A >> before save= "+ memory.docA );
			console.log("memory B >> before save= "+ memory.docB );
			console.log("final JSON.stringify(json) in app = "+JSON.stringify(json));
			console.log("json.data= "+ json.data);
			if(json.data != lock){
				lock = json.data;
			MEMORY.findOne({ username: username}, function (err, doc){
				var query = {docA:doc.docA, docB:doc.docB, username: username,lastsaveA:doc.lastsaveA,lastsaveB:doc.lastsaveB},
				    options = { multi: true };
				  MEMORY.update(query, { docA: memory.docA , docB: memory.docB, username: username,lastsaveA:doc.docA,lastsaveB:doc.docB,title:title}, options, callback);
				  function callback (err, numAffected) {
					   //numAffected is the number of updated documents
	
						console.log("socket save = "+ doc);
						console.log("lastsave A >> db = "+ doc.lastsaveA );
						console.log("lastsave B >> db = "+ doc.lastsaveB );
						console.log("memory A >> db= "+ doc.docA );
						console.log("memory B >> db= "+ doc.docB );
						console.log("username >> save= "+ username);
					};
			});}


				
		});
		
		socket.on("cmd",function(data){			
						
			memory.docA = data[0];
			memory.docB = data[1];
			var title = data[2];
			
			MEMORY.findOne({ username: username}, function (err, doc){
				var query = {docA:doc.docA, docB:doc.docB, username: username,lastsaveA:doc.lastsaveA,lastsaveB:doc.lastsaveB},
				    options = { multi: true };
				  //console.log(" query =  :"+ query);

				  MEMORY.update(query, { docA: memory.docA , docB: memory.docB, username: username, title:title}, options, callback);
				  //MEMORY.update(query, { docA: memory.docA , docB: memory.docB, username: username,lastsaveA:doc.lastsaveA,lastsaveB:doc.lastsaveB}, options, callback);
				  function callback (err, numAffected) {
					   //numAffected is the number of updated documents
						console.log("lastsave A >> command after update = "+ doc.lastsaveA );
						console.log("lastsave B >> command after update = "+ doc.lastsaveB );
						console.log("memory A >> cmd= "+ memory.docA );
						console.log("memory B >> cmd= "+ memory.docB );
					};
			});
			});	
		
});


server.listen(3000);
