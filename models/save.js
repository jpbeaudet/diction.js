var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

	var memoryDb = mongoose.Schema({
	    docA: String,
	    docB: String,
	    username: String
	});

module.exports = mongoose.model('memory', memoryDb);;