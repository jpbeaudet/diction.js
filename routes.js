var passport = require('passport');
var Account = require('./models/account');
var passport= require('./var/passport')(passport); // pass passport for configuration

//module.exports = function (app) {
	module.exports = function (app,passport) {

  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  
   app.post('/register', function(req, res,next) {
       req.assert('username', 'required').notEmpty();
       req.assert('username', 'valid email required').isEmail();
       req.assert('password', 'required').notEmpty();
       //req.assert('password', '6 to 20 characters required with at least 1 number, 1 upper case character and 1 special symbol').isStrongPassword();

       var errors = req.validationErrors();

       if (errors) {
           return res.render("register", {errors: errors});
       }else{ 
    // Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
  
     	//var username = req.body.username;
     	//  next();
    // });
     next();
     }
   
   }, passport.authenticate('local-signup', {

	      successRedirect : '/home', // redirect to the secure account section
	      failureRedirect : '/register' ,// redirect back to the signup page if there is an error
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
  // PROFILE SECTION =========================
  app.get('/profile',  function(req, res) {
      res.render('profile', {
          user : req.user
      });
  });	
  // facebook -------------------------------

  // send to facebook to do the authentication
  app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

  // handle the callback after facebook has authorized the user
  app.get('/connect/facebook/callback',
      passport.authorize('facebook', {
          successRedirect : '/home',
          failureRedirect : '/'
      }));

  // twitter --------------------------------

  /*// send to twitter to do the authentication
  app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

  // handle the callback after twitter has authorized the user
  app.get('/connect/twitter/callback',
      passport.authorize('twitter', {
          successRedirect : '/home',
          failureRedirect : '/'
      }));*/


  // google ---------------------------------

  /*// send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

  // the callback after google has authorized the user
  app.get('/connect/google/callback',
      passport.authorize('google', {
          successRedirect : '/home',
          failureRedirect : '/'
      }));*/

//=============================================================================
//UNLINK ACCOUNTS =============================================================
//=============================================================================
//used to unlink accounts. for social accounts, just remove the token
//for local account, remove email and password
//user account will stay active in case they want to reconnect in the future

  // facebook -------------------------------
  app.get('/unlink/facebook', function(req, res) {
      var user            = req.user;
      user.facebook = undefined;
      user.save(function(err) {
          if (err) {
              console.error(err);
          }
          res.redirect('/profile');
      });
  });

  /*// twitter --------------------------------
  app.get('/unlink/twitter', RouteHelpers.isLoggedIn, function(req, res) {
      var user           = req.user;
      user.twitter = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  // google ---------------------------------
  app.get('/unlink/google', RouteHelpers.isLoggedIn, function(req, res) {
      var user          = req.user;
      user.google = undefined;
      user.save(function(err) {
          if (err) {
              console.error(err);
          }
          res.redirect('/profile');
      });
  });*/
  
  app.use(function (err, req, res, next) {
      // treat as 404
      if (err.message
          && (~err.message.indexOf('not found')
          || (~err.message.indexOf('Cast to ObjectId failed')))) {
          return next();
      }
      console.error(err.stack);
      // error page
      if (req.user) {
		    // logged in
		  res.redirect("/home");
		} else {
		    // not logged in
      res.status(500).render('500', {error: err.stack});
		}
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
	  var logged;
	  if (req.user) {
		    // logged in
		  res.redirect("/home");
		} else {
		    // not logged in
		
      res.status(404).render('404', {
          url: req.originalUrl,
          error: 'Not found'
      });
		}
  });

};