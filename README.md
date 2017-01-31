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
