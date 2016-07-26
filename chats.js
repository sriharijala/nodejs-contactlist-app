
var express = require('express');
var mongojs = require("mongojs");

var serverApp = require('./server.js');


//remote mongo DB at Heroku
var db = mongojs('sjala:jala123@ds047802.mlab.com:47802/heroku_35qbv260',['chats']);


// Add headers
serverApp.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



serverApp.get('/chats/pingtest', function(req,res) {

	console.log('received pingtest request');

	res.send('chats services are up and running!');

});

serverApp.get('/chats', function(req, res){

	console.log("Received request for chats");

	db.chats.find(function(err, docs) {

		console.log('Server sending chats response', docs);

		res.json(docs);

	});

    
});


///get single contact details
serverApp.get('/chats/:id', function(req,res){

	var id = req.params.id;

	console.log('received chat details request ' + id);

	db.chats.findOne(
		{_id : mongojs.ObjectId(id)}, function(err,doc) {

		res.json(doc);
	});
});