var express = require('express');
var router = express.Router();
var uuidV4 = require('uuid/v4');
var mongoose = require('mongoose');
var Vehicle = mongoose.model('Vehicle');
var city = require('../models/city');

router.route('/')

	.post(function(req, res){
		if (city.isOutOfLimit(req.body.lat, req.body.lng))
			return res.sendStatus(304);
		
		var vehicle = new Vehicle();
		vehicle.uuid = uuidV4();
		vehicle.type = req.body.type;
		vehicle.lat = req.body.lat;
		vehicle.lng = req.body.lng;
		vehicle.heading = req.body.heading;

		vehicle.save(function(err, vehicle){
			if (err){
				return res.send(500, err);
			}

			return res.json(vehicle);
		});
    })

    .get(function(req, res){
        Vehicle.find(function(err, vehicles){
            if(err)
                return res.send(500, err);

        	return res.send(vehicles);
        });

    });

router.route('/update')
	.put(function(req, res){


	  	Vehicle.count().exec(function (err, count) {
			var vehicle;

		    var random = Math.floor(Math.random() * count)

		    Vehicle.findOne().skip(random).exec(
		    	function (err, v) {

					vehicle = v;

		        	if (err)
						return res.send(500, err);

					if ((Date.now() - vehicle.timestamp) < vehicle.updateFrequency)
						return res.sendStatus(304);
		
					if (city.isOutOfLimit(vehicle.lat, vehicle.lng))
						return res.sendStatus(304);					

					vehicle.move();
					vehicle.timestamp = Date.now();

					vehicle.save(function(err, vehicle){
						if (err)
							return res.send(err);

						return res.json(vehicle);
					})
		      	})

	  	})

		
	})

router.route('/:id')

	.get(function(req, res){
		Vehicle.findById(req.params.id, function(err, vehicle){
			if (err)
				return res.send(err);

			return res.send(vehicle);
		});
	})

	.put(function(req, res){
		if (city.isOutOfLimit(req.body.lat, req.body.lng))
			return res.sendStatus(304);

		Vehicle.findById(req.params.id, function(err, vehicle){
			if (err)
				return res.send(err);

			vehicle.lat = req.body.lat;
			vehicle.lng = req.body.lng;
			vehicle.timestamp = Date.now;
			vehicle.heading = req.body.heading;

			vehicle.save(function(err, vehicle){
				if (err)
					return res.send(err);

				return res.json(vehicle);
			});
		});
	})

	.delete(function(req, res){
		Vehicle.remove({_id: req.params.id}, function(err, vehicle){
			if (err)
				return res.send(err);

			return res.json(vehicle);
		});
	});


module.exports = router;