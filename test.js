var loadtest = require('loadtest');
var uuidV1 = require('uuid/v1');
var mongoose = require('mongoose');
var Vehicle = mongoose.model('Vehicle')
var city = require('./models/city')


console.log(city);
//exteding the array functions
//this will be quite helpful in two scenarios:
//	1 - generate random entries (taxis, buses, trams and so on)
//	2 - create an "inteligence" to move the vehicles
Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

//populating the database with 1000 entries
for (var i=0; i<1000;i++){
	var vehicle = new Vehicle();
	vehicle.uuid = uuidV4();
	vehicle.type = ['taxi', 'bus', 'tram', 'train'].sample();
	vehicle.lat = city.lat;
	vehicle.lng = city.lng;
	vehicle.heading = Math.floor(Math.random()*360);

	vehicle.save(function(err, vehicle){
		if (err)
			return res.send(500, err);

		return res.json(vehicle);
	});
}


//latitude is latitude, 
//longitude is longitude, 
//heading is the bearing (clockwise from north), 
//angular distance distance / earthRadius; 
//distance being the distance travelled, 
//earthRadius the earth’s radius
//(all angles in radians)
/*
var latitude1 = 30;
var longitude = 30;
var heading = 90;
 
function vehicle_mov(current_latitude, current_longitude, heading){
	const distance = 100 //the vehicles will move 100 m each 20 seconds
	const earthRadius = 6378.1 //km

	var destination_latitude = Math.asin( Math.sin(latitude1)*Math.cos(distance/earthRadius) +
	                Math.cos(latitude1) * Math.sin(distance/earthRadius) * Math.cos(Number.toRad(heading)) );
	var destination_longitude = longitude1 + Math.atan2(Math.sin(Number.toRad(heading)) * Math.sin(distance/earthRadius) * Math.cos(latitude1),
	                     Math.cos(distance/earthRadius) - Math.sin(latitude1) * Math.sin(latitude2));


}
console.log(latitude2);
console.log(longitude2);
*/
//The longitude can be normalised to −180…+180 using (lon+540)%360-180

//executing the Tests
var options = {
    url: 'http://localhost:3000',
    maxSeconds: 100
};

loadtest.loadTest(options, function(error, result)
{
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully');

});