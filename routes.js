var passport = require('passport');
var Account = require('./models/account');


module.exports = function (app) {

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
     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
  
     	var username = req.body.username;
     	  next();
     });
     }
   
   }, passport.authenticate('local', {

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
  
  
  app.use(function (err, req, res, next) {
      // treat as 404
      if (err.message
          && (~err.message.indexOf('not found')
          || (~err.message.indexOf('Cast to ObjectId failed')))) {
          return next();
      }
      console.error(err.stack);
      // error page
      res.status(500).render('500', {error: err.stack});
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
      res.status(404).render('404', {
          url: req.originalUrl,
          error: 'Not found'
      });
  });

};