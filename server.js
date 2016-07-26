var compression = require('compression');  //to improve performance
var express = require('express');
var serverApp = module.exports = express();
var mongojs = require("mongojs");

//custom services
var chats = require("./chats.js");
var youtube = require("./youtube.js");

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

//local default mongo DB
//var db = mongojs('contactlist',['contactlist']);

//remote mongo DB at Heroku
var db = module.exports = mongojs('sjala:jala123@ds047802.mlab.com:47802/heroku_35qbv260',['contactlist']);

var bodyParser = require('body-parser');



//peformance improvement
serverApp.use(compression());

//public file folder		
serverApp.use(express.static(__dirname + '/public'));

//to parge request body
serverApp.use(bodyParser.json());

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


serverApp.get('/pingtest', function(req,res) {

	console.log('received pingtest request');

	res.send('contactlist services are up and running!');

});


serverApp.get('/contactlist', function(req,res) {

	console.log('Server received contactlist request');

   
    /*
	var person1 = {
		name : 'Srihari',
		email : 'sjala@email.com',
		number : '(111)-111-1111'
	};

	var person2 = {
		name  : 'Bhavana',
		email : 'bj@email.com',
		number : '(222)-111-1111'
	};


	var person3 = {
		name  : 'Anudeep',
		email : 'anu@email.com',
		number : '(333)-111-1111'
	};
	

	var contactlist = [person1, person2, person3];

	res.json(contactlist);
	*/

	db.contactlist.find(function(err, docs) {

		console.log(docs);
	
		res.json(docs);

	});

    console.log('Server sending contactlist response');

	

});

//handle post request to add contact
serverApp.post('/contactlist', function(req,res) {

	console.log(req.body);

	db.contactlist.insert(req.body, function(err, doc) {

		console.log('insert response');
		console.log(doc);

		res.json(doc);
	})
});

//handle delete request to delete contact
serverApp.delete('/contactlist/:id', function(req,res){

	var id = req.params.id;

	console.log('Received delete request with id :' + id);

	db.contactlist.remove({_id : mongojs.ObjectId(id)}, function(err,doc) {

		res.json(doc);

	});
	
});

//get single contact details
serverApp.get('/contactlist/:id', function(req,res){

	var id = req.params.id;

	console.log('received contact details request ' + id);

	db.contactlist.findOne(
		{_id : mongojs.ObjectId(id)}, function(err,doc) {

		res.json(doc);
	});
});

serverApp.put('/contactlist/:id', function(req,res) {

	var id = req.params.id;
	var name = req.body.name;
	var email = req.body.email;
	var number = req.body.number;

	console.log('received to update contact details for ' + name);

	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set : {name: req.body.name, email: req.body.email, number: req.body.number} },
		new: true
		}, 
		function(err, doc) {
			res.json(doc);
	});
});



serverApp.listen(port);
console.log('Server running on port ' + port);

