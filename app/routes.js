var Camping = require('./models/camping'),
    stringToNumberArray = function(stringArray){
        return stringArray.map(function(item) { return Number(item)});
    };

module.exports = function(app) {
    
	app.get('/api/campings', function(req, res) {
		Camping.find(function(err, campings) {
			if (err) {
                res.send(err)
            }
			res.json(campings);
		});
	});

	app.post('/api/campings', function(req, res) {
		Camping.create({
			name : req.body.name,
			address : req.body.address,
			email : req.body.email,
			phone : req.body.phone,
			loc : stringToNumberArray(req.body.loc)
		}, function(err, camping) {
			if (err) {
                res.send(err);
            }
			Camping.find(function(err, campings) {
				if (err) {
                    res.send(err)
                }
				res.json(campings);
			});
		});
	});

    app.put('/api/campings/:camping_id', function (req, res) {
        Camping.update({
                _id: req.params.camping_id
            }, {
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone,
                loc: stringToNumberArray(req.body.loc)
            }
            , function (err, camping) {
                if (err) {
                    res.send(err);
                }
                Camping.find(function (err, campings) {
                    if (err) {
                        res.send(err)
                    }
                    res.json(campings);
                });
            }
        );
    });

	app.delete('/api/campings/:camping_id', function(req, res) {
		Camping.remove({
			_id : req.params.camping_id
		}, function(err, camping) {
			if (err) {
                res.send(err);
            }
            
			Camping.find(function(err, campings) {
				if (err) {
                    res.send(err)
                }
				res.json(campings);
			});
		});
	});
    
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
};