var mongoose = require('mongoose');

module.exports = mongoose.model('Camping', {
	name : String,
	email : String,
	phone : String,
	address : String,
	loc : Array
});