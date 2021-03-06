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

// This is the main endpoint that will return the twitter trends  it is comprised of the the two endpoints below it in a concatenated form.
app.get('/twitter', async(req,res) => {
  const headers = {
    'Authorization' : 'Bearer AAAAAAAAAAAAAAAAAAAAAHTgIQEAAAAAanWdtHE31s4QRThNOuZE8eMd%2BjQ%3D8KZ38KBOKACDTqFM1F2YGV7bUdcpUJsuyq905xWhckhe2qssYI'
  };
  const url_WOEID = `https://api.twitter.com/1.1/trends/closest.json?lat=${req.param('lat')}&long=${req.param('long')}`;

  try{
    const fetch = require("node-fetch");
    const w = await fetch(url_WOEID,{headers:headers})
        .then(response => response.json())
        .then((json) => {
            let x = json[0].woeid;
            let rest_response= {
              "WOEID" : json[0].woeid
            };
            return x;
          });
    const url = `https://api.twitter.com/1.1/trends/place.json?id=${w}&exclude=hashtags`;

    const trends = await fetch(url, {headers:headers})
       // .then(response => response.json())
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          let tweet_arr = [];
          for (let i = 0 ; i < 10; i++){
            tweet_arr.push(json[0].trends[i].name);
          }
          let api_body = {
            "trends" : tweet_arr
          }
          let api_response = {
            statusCode : 200,
            body : api_body,
            headers : {'Content-Type': 'application/json'}
          }
          res.send(api_body);
        });
  }
  catch(err){
    console.log('error:', err);
  }
});
//There is an API issue with the result type where it only returns calls if the result_type parameter is mixed using popular or recent will return a null list of statuses
app.get('/twitter/tweets', async(req,res)=>{
  const headers = {
    'Authorization' : 'Bearer AAAAAAAAAAAAAAAAAAAAAHTgIQEAAAAAanWdtHE31s4QRThNOuZE8eMd%2BjQ%3D8KZ38KBOKACDTqFM1F2YGV7bUdcpUJsuyq905xWhckhe2qssYI'
  };
  const url = `https://api.twitter.com/1.1/search/tweets.json?q=${req.param('query_string')}&result_type=recent&geocode=${req.param('lat')},${req.param('long')},${req.param('rad')}mi`;

  try{
    const fetch = require("node-fetch");
    fetch(url, {headers:headers})
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          let size_response = json.statuses.length;
          let tweets = [];
          for (var i =0 ; i < size_response ;i++){
            if(json.statuses[i].entities.urls[0] != undefined){
                 let entry = {
                'text' : json.statuses[i].text,
                'user' : json.statuses[i].user.screen_name ,
                'id' : json.statuses[i].id,
                'url' : json.statuses[i].entities.urls[0].url,
                'date' : json.statuses[i].created_at

              }
              tweets.push(entry);
            }
            else{
              let entry = {
              'text' : json.statuses[i].text,
              'user' : json.statuses[i].user.screen_name ,
              'id' : json.statuses[i].id,
              'date' : json.statuses[i].created_at
            }
            tweets.push(entry);
            }
            
          }
          let response = {
            'tweets' : tweets,
            'response_size' : size_response
          };
          res.send(response);
        })
  }
  catch(err){
    console.log("error:",err);
  }
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
    console.log('error while searching for WOEID:', err);
  }
});

//returns an array of top ten trends

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
          let tweet_arr = [];
          for (let i = 0 ; i < 10; i++){
            tweet_arr.push(json[0].trends[i].name);
          }
          let api_body = {
            "trends" : tweet_arr
          }
          let api_response = {
            statusCode : 200,
            body : api_body,
            headers : {'Content-Type': 'application/json'}
          }
          res.send(api_response);
        });
  }
  catch(err){
    console.log('error while searching for trends:', err);
  }
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
