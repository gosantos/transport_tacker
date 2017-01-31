var loadtest = require('loadtest')
var city = require('./models/city')

// exteding the array functions
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}

// adding 1000 vehicles entries
var options = {
  url: 'http://localhost:3000/vehicles',
  concurrent: 1000,
  method: 'POST',
  maxRequests: 1000,
  requestGenerator: function (params, options, client, callback) {
    var message = 'type=' + ['taxi', 'bus', 'tram', 'train'].sample() + '&lat=' + city.lat + '&lng=' + city.lng + '&heading=' + Math.floor(Math.random() * 360)
    options.headers['Content-Length'] = message.length
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    var request = client(options, callback)
    request.write(message)
    return request
  }
}

loadtest.loadTest(options, function (error, results) {
  if (error) {
    return console.error('Got an error: %s', error)
  }
  console.log(results)
  console.log('Tests run successfully')
})

var options = {
  url: 'http://localhost:3000/vehicles/update',
  concurrent: 10,
  method: 'PUT',
  maxSeconds: 100
}

loadtest.loadTest(options, function (error, results) {
  if (error) {
    return console.error('Got an error: %s', error)
  }
  console.log(results)
  console.log('Tests run successfully')
})
