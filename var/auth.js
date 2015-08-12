
// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '507144606120614', // your App ID
		'clientSecret' 	: '17f9cf6038c5eac4d409765ccb3cb1a2', // your App Secret
		'callbackURL' 	: 'https://54.68.32.250:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'https://ip:port/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-consumer-key-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'https://54.68.32.250:3000/auth/google/callback'
	}

};
