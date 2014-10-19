var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

	var memoryDb = mongoose.Schema({
	    docA: String,
	    docB: String
	});

module.exports = mongoose.model('memory', memoryDb);;