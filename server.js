var express = require('express'),
	app = express(),
    port = process.env.PORT || 8080, 
    mongoose = require('mongoose'), 
    database = require('./config/database');

mongoose.connect(database.url);

app.configure(function () {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

require('./app/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);
