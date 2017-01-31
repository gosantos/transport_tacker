# Transport Tracker

## Description
Snowdonia town has ~1000 vehicles in active operation at any given moment. Each vehicle could theoretically emit their position at the exact same moment. The solution must demonstrate evidence of 1000 concurrent emissions (at maximum) being handled by your developed endpoint without an error.

## Prerequisites

Make sure you have all of the following prerequisites installed in your machine:

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).

## Cloning the repostiroy

First of all you to clone the repository:

```bash
$ git clone https://github.com/gosantos/baconlab.git
```

## Installation

In this project we have one directory for the backend (server) and another one for the frontend (client). So for that reason you should install each one separately.

```bash
$ cd transport_tracker
$ npm install
```

## Starting the application

In one terminal start the server with the following command:

```bash
$ npm start
```

## Running the tests

```bash
$ npm test
```
## Regarding the solution

### City

The city model is just a mock created in order to simulate a real secenario where will exist a lot of cities.

*models/city.js*

### City range vehicles control

The method was created used the algorithim it follows: 
http://www.geodatasource.com/developers/javascript

The method *isOutOfLimit* in the file *models/city.js* controls that.

### Vehciles

All vehicles are departing from the downtwon.

model/vehicle.js

### Vehicle moving simulation

http://www.movable-type.co.uk/scripts/latlong.html

The vehicles are changing their positions in 1 km each 20 seconds (I know might be too much, but to test the service is a good approach)

### Service
The service will return a 304 status code when the vehicles is out of city limits.

### Testing library

I choose the "loadtest" library in order to populate the database and simulate the concurrency update vehicle testing.
From all libraries I researched, this was in my opinion the easier to use and I thought and as well the more fittable for my scenario.

The library provides a report after the test runs.

### Difficulties Encountered

The service layer is a little bit coupled mainly the method "PUT". In my opinion the right place to use the method "move" to change the vehicle position would be the test, however I was not able to use the testing library to create this scenario. 
My solution was put the method "move" inside the "/update" endpoint.
In a real scenario the client will now its information, then the endpoiont used would be the ":id" with the method "PUT". 

I was not able to make the 1000 concurrent requests and here goes my possible reasons for that:

1) Maybe to support this 1000 concurrent requests would be necessary create multiple backend containers (using docker) and put a middleware between the client and the server, this middleware would act like a load balancer redirecting the requests for the less overloaded container;
2) The service layer is not well implemented, the endpoint "update" shoule be optimized, find a "random vehicle" to update its information is not the best solution;
3) I had not a real server to test this solution, probably in a paid service like Amazon the performance would be pretty much better;
