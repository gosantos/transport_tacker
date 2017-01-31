var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehicleSchema = new Schema({
  uuid: { 
  	type: String, 
  	required: true 
  },
  type: { 
  	type: String, 
  	required: true 
  },
  lat: { 
  	type: String, 
  	required: true 
  },
  lng: { 
    type: String, 
    required: true 
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  updateFrequency:{
    type: Number,
    default: 20000 //milliseconds
  },
  heading: { 
    type: Number, 
    min: 0, 
    max: 359,
    required: true 
  }
});

vehicleSchema.methods.move = function(){
  /** Extend Number object with method to convert numeric degrees to radians */
  
  Number.prototype.toRadians = function() { return this * Math.PI / 180; };
  Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };

  /**
 * Returns the destination point having travelled along a rhumb line from ‘this’ point the given
 * distance on the  given bearing.
 *
 * @param   {number} distance - Distance travelled, in same units as earth radius (default: metres).
 * @param   {number} bearing - Bearing in degrees from north.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {LatLon} Destination point.
 *
 * @example
 *     var p1 = new LatLon(51.127, 1.338);
 *     var p2 = p1.rhumbDestinationPoint(40300, 116.7); // 50.9642°N, 001.8530°E
 */
  
  var radius = 6378.1
  const distance = 10
  
  var δ = Number(distance) / radius; // angular distance in radians
  var φ1 = Number(this.lat).toRadians(), λ1 = Number(this.lng).toRadians();
  var θ = Number(this.heading).toRadians();

  var Δφ = δ * Math.cos(θ);
  var φ2 = φ1 + Δφ;

  // check for some daft bugger going past the pole, normalise latitude if so
  if (Math.abs(φ2) > Math.PI/2) φ2 = φ2>0 ? Math.PI-φ2 : -Math.PI-φ2;

  var Δψ = Math.log(Math.tan(φ2/2+Math.PI/4)/Math.tan(φ1/2+Math.PI/4));
  var q = Math.abs(Δψ) > 10e-12 ? Δφ / Δψ : Math.cos(φ1); // E-W course becomes ill-conditioned with 0/0

  var Δλ = δ*Math.sin(θ)/q;
  var λ2 = λ1 + Δλ;

  this.lat = φ2.toDegrees()
  this.lng = ((λ2.toDegrees()+540) % 360) - 180
}

mongoose.model('Vehicle', vehicleSchema);