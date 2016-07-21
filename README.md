#MEAN Stack example


## Introduction

MEAN stack consists of open source javascript frameworks MongoDB, Express, Angular JS and Node JS.
Server side frameworks are Node Js, Express and MongoDB. Client side frameworks are Angular JS, Node JS.

----
## Application
This application manages contact list using MEAN stack. It provide UI to add, update, delete contact list
using the above frameworks.

----
## Installation of Frameworks
URL's to download frameworks

* [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) - Database to store data

* [Node JS](https://nodejs.org/) - JavaScript runtime

* [Bootstrap](http://getbootstrap.com/getting-started/) 
	Styles used from Bootstrap for look and feel

* [Angular](http://angularjs.org) - Templating system

----
## Files

* server.js - Server side code manages data using MongoDB database.
* controllers/controller.js - Manages the UI events and routes.
* index.html - Displays the UI.

----
## Application UI
![Contact List](/screenshots/screen1.png?raw=true "Contact List")

----
## Database configuration

MongoDB database can be local or on remote server. In this example MongoDB used on a remote server called
Heroku. To connect to remote MondoDB database you need to use the database connection string. This is documented at [mongojs GIT repo](https://github.com/mafintosh/mongojs)

---
## Web Server port 
Web Server port number locally for NodeJS is 3000. This application developed locally using NodeJS with port number 3000. Finally deployed to Heroku repository. To configure the port number to work in local machine as well as on the Heroku use the following code in server.js

``` javascript
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

serverApp.listen(port);
```
