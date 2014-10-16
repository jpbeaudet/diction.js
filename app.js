var io      = require('socket.io'),
    https    = require('https'),
    express = require('express');

var path = require('path');  
var express = require('express');
var http = require('http');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var passphrase = "";
var options = {
		  key: fs.readFileSync('var/keys/server.key'),
		  cert: fs.readFileSync('var/keys/server.crt')
	};


	if(passphrase) {
		options.passphrase = passphrase;
	}


// We define the key of the cookie containing the Express SID
var EXPRESS_SID_KEY = 'express.sid';

// We define a secret string used to crypt the cookies sent by Express
var COOKIE_SECRET = 'J976dd78Hffr#$%68h';
var cookieParser = express.cookieParser(COOKIE_SECRET);

// Create a new store in memory for the Express sessions
var sessionStore = new express.session.MemoryStore();

var app = express();

// Configure Express app with :
// * Cookie Parser created above
// * Configure Session Store
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

//passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Configture routes
require('./routes')(app);

// Create HTTP server, register socket.io as listener
var server = https.createServer(options, app);
app.set('port', process.env.PORT || 3000);
console.log(("Express server listening on port " + app.get('port')));
io = io.listen(server);

// We configure the socket.io authorization handler (handshake)
io.set('authorization', function (data, callback) {
    if(!data.headers.cookie) {
        return callback('No cookie transmitted.', false);
    }

    // We use the Express cookieParser created before to parse the cookie
    // Express cookieParser(req, res, next) is used initialy to parse data in "req.headers.cookie".
    // Here our cookies are stored in "data.headers.cookie", so we just pass "data" to the first argument of function
    cookieParser(data, {}, function(parseErr) {
        if(parseErr) { return callback('Error parsing cookies.', false); }

        // Get the SID cookie
        var sidCookie = (data.secureCookies && data.secureCookies[EXPRESS_SID_KEY]) ||
                        (data.signedCookies && data.signedCookies[EXPRESS_SID_KEY]) ||
                        (data.cookies && data.cookies[EXPRESS_SID_KEY]);

        // Then we just need to load the session from the Express Session Store
        sessionStore.load(sidCookie, function(err, session) {
            // And last, we check if the used has a valid session and if he is logged in
            if (err || !session || session.isLogged !== true) {
                callback('Not logged in.', false);
            } else {
                // If you want, you can attach the session to the handshake data, so you can use it again later
                // You can access it later with "socket.handshake.session"
                data.session = session;

                callback(null, true);
            }
        });
    });
});

// upon connection, start a periodic task that emits (every 1s) the current timestamp
io.on('connection', function (socket) {
	console.log("socket.io started on port"+ app.get('port'));

});


server.listen(3000);