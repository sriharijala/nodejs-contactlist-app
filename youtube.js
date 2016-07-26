var express = require('express');
var mongojs = require("mongojs");
var googleapis = require("googleapis");

var serverApp = require('./server.js');

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

serverApp.get('/youtube/pingtest', function(req,res) {

    console.log('youtube ping test received');

    res.send('youtube services are up and running!');

});


serverApp.get('/youtube/searchTopic/:topic', function(req,res) {

    var searchData = req.params.topic;

    console.log('youtube search by topic request received' + searchData);


    youtubeV3 = googleapis.youtube( { version: 'v3', auth: 'AIzaSyD2JXMOPwk_RcFK3Ez1tFsagsNP6pAdGf0' } );

    var request =  youtubeV3.search.list({
        part: 'snippet',
        type: 'video',
        q: searchData,
        maxResults: 10,
        order: 'viewCount',
        //order: 'date',
        safeSearch: 'moderate',
        videoEmbeddable: true
    }, (err,response) => {

       if(err) {
            // your code here
            console.log('Google error:', err);
            res.send({1: 'Data not availabe'});
            
       } else {

            console.log('Google response;', response.items)

            res.send(response.items);
       }
  
    });
});