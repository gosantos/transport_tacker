// this is a mock of a class who is resposible to simulate a city model

var city = {
  name: 'Snowdia',
  lat: 40,
  lng: 40,
  limit: 50,
  isOutOfLimit: function (lat, lng) {
    var radlat1 = Math.PI * this.lat / 180
    var radlat2 = Math.PI * lat / 180
    var theta = this.lng - lng
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    return dist > this.limit
  }
}

module.exports = city
