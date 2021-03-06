# Transport Tracker

## Description
Snowdonia town has ~1000 vehicles in active operation at any given moment. Each vehicle could theoretically emit their position at the exact same moment. The solution must demonstrate evidence of 1000 concurrent emissions (at maximum) being handled by your developed endpoint without an error.

## Prerequisites

Make sure you have all of the following prerequisites installed in your machine:

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).

## Cloning the repository

First of all you have to clone the repository:

```bash
$ git clone https://github.com/gosantos/transport_tracker.git
```

## Installation

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

In another terminal start the tests with the following command:

```bash
$ npm test
```
## Regarding the solution

### City

The city model is just a mock created in order to simulate a real secenario where a lot of cities will exist.

*models/city.js*

### City range vehicles control

The method was created using the following algorithm: 
http://www.geodatasource.com/developers/javascript

The method *isOutOfLimit* in the file *models/city.js* controls it.

### Vehicles

All vehicles are departing from the downtown.

The control of the interval time to update a record is implemented by the method *checkIfNeedsTobeUpdated* in the file *models/vehicle.js*.

### Vehicle moving simulation

The moving simulation of all vehicles was developed using the following algorithm: 

http://www.movable-type.co.uk/scripts/latlong.html

The vehicles are changing their positions in 1 km every 20 seconds (I know might be too much, but to test the service is a good approach)

The method *move* in the file *models/vehicle.js* is doing that job.

### Service

*routes/vehicles.js*.

The "/update" endpoint contains the most complicated logic, but the basics constraints are described below: 

* The service will return a 304 status code when the vehicle is out of city limits (using the *isOutOfLimit* function);
* The service will return a 304 status code when the update interval is less than 20 seconds for that vehicle (using the *checkIfNeedsTobeUpdated* function);

### Testing 

I have used the *Postman* chrome extension to test the service behavior without stressing tests.

For the benchmarking I chose the "loadtest" library in order to populate the database and to simulate the concurrent vehicle update.
From all libraries I found, this was, in my opinion, the easier one to use and I thought and as well as the most fittable to my scenario.

The library provides a report after the test runs.

### Difficulties Encountered

The service layer code is a little bit coupled mainly the endpoint "update". In my opinion the right place to use the method "move" to change the vehicle position would be the *test.js*, however I was not able to reproduce this scenario using the test library chosen.
My solution was write the method "move" inside the "/update" endpoint. In a real scenario, the client will know its information, then the endpoiont used would be the ":id" with the method "PUT".

I was not able to make the 1000 concurrent requests and here goes my possible reasons for that:

* Maybe to support this 1000 concurrent requests would be necessary create multiple backend containers (using docker) and set a middleware between the client and the server, this middleware would act like a load balancer redirecting the requests for the less overloaded container;
* The service layer is not well implemented, the endpoint "update" should be optimized, find a "random vehicle" to update its information is not the best solution;
* Probably in a paid service like Amazon the performance would be pretty much better;
