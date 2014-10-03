var passport = require('passport');
var Account = require('./models/account');


module.exports = function (app) {

  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
        	
          res.redirect('/');
        });
    });
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/home');
  });
  

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });
  
  app.get('/home', function(req, res) {
	  //res.header('Content-type','text/html');
	  //res.sendfile( __dirname +'/home.html' );
	  //res.render('home', { title: 'speech', scripts: ['speech.js','controls.js','data.js'], user : req.user });
	  //res.render('home', { title: 'controls, scripts: ['./app/controls.js']});
	  //res.render('home', { title: 'data', scripts: ['./app/data.js']});
      res.render('home', { user : req.user });
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });
  
  app.get('/speech.js', function(req, res){
	  res.header('Content-type','text/javascript');
	  res.sendfile( __dirname +'/app/speech.js' );
	 });

  app.get('/controls.js', function(req, res){
	  res.header('Content-type','text/javascript');
	  res.sendfile( __dirname +'/app/controls.js' );
	 });
	 
  app.get('/data.js', function(req, res){
		  res.header('Content-type','text/javascript');
		  res.res.sendfile( __dirname +'/app/data.js' );
		 });
  
  app.get('*', function(req, res){
	  res.render('error', { user : req.user });
  });

};