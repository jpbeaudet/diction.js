var passport = require('passport');
var Account = require('./models/account');


module.exports = function (app) {

  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

 // app.post('/register', function(req, res) {
 //   Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
 //       if (err) {
  //          return res.render('register', { account : account });
  //      }

   //     passport.authenticate('local')(req, res, function () {
        	
  //        res.redirect('/');
  //      });
  //  });
 // });
  app.post('/register', function(req, res, next) {
      req.assert('username', 'required').notEmpty();
      req.assert('username', 'valid email required').isEmail();
      req.assert('password', 'required').notEmpty();
      //req.assert('password', '6 to 20 characters required with at least 1 number, 1 upper case character and 1 special symbol').isStrongPassword();

      var errors = req.validationErrors();

      if (errors) {
          return res.render("register", {errors: errors});
      }
  	var username = req.body.username;

      next();
  }, passport.authenticate('local-signup', {

      successRedirect : '/home', // redirect to the secure account section
      failureRedirect : '/register', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));
  app.get('/home', function(req, res) {

	  res.render('home', { user : req.user });
});

app.get('/login', function(req, res) {
	
    res.render('login', { user : req.user });
});

  

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });
  

  

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });
  
  app.get('/speech.js', function(req, res) {
	  res.set('Content-Type', 'text/javascript');
	  res.sendfile('./speech.js');
	});
  

  app.get('/data.js', function(req, res) {
	  res.set('Content-Type', 'text/javascript');
	  res.sendfile('./data.js');
	});
  
  app.get('/controls.js', function(req, res) {
	  res.set('Content-Type', 'text/javascript');
	  res.sendfile('./controls.js');
	});
  
  
  //app.get('*', function(req, res){
	//  res.render('error', { user : req.user });
  //});

};