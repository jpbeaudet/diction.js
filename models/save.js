var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

	var memoryDb = mongoose.Schema({
	    docA: String,
	    docB: String,
	    username: String,
	    lastsaveA: String,
	    lastsaveB: String,
	    title: String
	});

module.exports = mongoose.model('memory', memoryDb);;