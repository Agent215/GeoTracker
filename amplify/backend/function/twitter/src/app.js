/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/
app.get('/twitter', async(req, res) =>{
  const url = 'https://api.twitter.com/1.1/search/tweets.json';
  const headers = {
    'Authorization' : 'Bearer AAAAAAAAAAAAAAAAAAAAAHTgIQEAAAAAanWdtHE31s4QRThNOuZE8eMd%2BjQ%3D8KZ38KBOKACDTqFM1F2YGV7bUdcpUJsuyq905xWhckhe2qssYI'
  }
  let event = req.param('event');//.replace(',',' ');
  let geocode = `${req.param('lat')},${req.param('long')},15mi` ;
  let query_string = `${url}?q=${event}&result_type=recent&geocode=${geocode}`;

  try{
    const fetch = require("node-fetch");
    let twitter_call = await fetch(query_string,{headers :headers})
        .then((res)=>{
          return   res.json()
        })
        .then((json) => {
          res.send(json);
        });
    /*
    twitter_call = await twitter_call.json();
    const aux = require('./auxillary.js')();
    let tweet_response = clean_response(await twitter_call);
    console.log(await tweet_response);
    //res.json( JSON.stringify(await tweet_response));
     */
  }
  catch(err){
    console.log('err',err);
  }
  //res.json({success: 'get call succeed!', url: req.url});
});

app.get('/twitter/woeid', async(req,res) => {
  const headers = {
    'Authorization' : 'Bearer AAAAAAAAAAAAAAAAAAAAAHTgIQEAAAAAanWdtHE31s4QRThNOuZE8eMd%2BjQ%3D8KZ38KBOKACDTqFM1F2YGV7bUdcpUJsuyq905xWhckhe2qssYI'
  };
  const url_WOEID = `https://api.twitter.com/1.1/trends/closest.json?lat=${req.param('lat')}&long=${req.param('long')}`;
  try{
    const fetch = require("node-fetch");
    fetch(url_WOEID,{headers:headers})
        .then((res)=>{
          return  res.json()
        })
        .then((json) => {
          let x = json[0].woeid;
          let rest_response= {
            "WOEID" : json[0].woeid
          };
          res.send(rest_response);
        });
  }
  catch(err){
    console.log('error:', err);
  }
});

app.get('/twitter/trends', async(req,res) =>{
  //need to find woeid to add to fetch request
  const headers = {
    'Authorization' : 'Bearer AAAAAAAAAAAAAAAAAAAAAHTgIQEAAAAAanWdtHE31s4QRThNOuZE8eMd%2BjQ%3D8KZ38KBOKACDTqFM1F2YGV7bUdcpUJsuyq905xWhckhe2qssYI'
  };

  const url = `https://api.twitter.com/1.1/trends/place.json?id=${req.param('WOEID')}`;
  try{
    const fetch = require("node-fetch");
    fetch(url,{headers:headers})
        .then((res)=>{
          return   res.json()
        })
        .then((json) => {
          res.send(json);
        });
  }
  catch(err){
    console.log('error:', err);
  }
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
