var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Vehicle = mongoose.model('Vehicle');
var city = require('../models/city');

router.route('/')

	.post(function(req, res){
		if (city.isOutOfLimit(req.body.lat, req.body.lng))
			return res.sendStatus(304);

		var vehicle = new Vehicle();
		vehicle.uuid = req.body.uuid;
		vehicle.type = req.body.type;
		vehicle.lat = req.body.lat;
		vehicle.lng = req.body.lng;
		vehicle.timestamp = req.body.timestamp;
		vehicle.heading = req.body.heading;

		vehicle.save(function(err, vehicle){
			if (err)
				return res.send(500, err);

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
			vehicle.timestamp = req.body.timestamp;
			vehicle.heading = req.body.heading;
			console.log("before move() " + vehicle);
			vehicle.move(); 
			console.log("after move() "+vehicle);


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