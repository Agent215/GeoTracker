import {  useState } from "react";

import { API } from 'aws-amplify';



  export default () => {
    const [tweetResults, setResults] = useState({});
    const [tweetErrorMessage, setErrorMessage] = useState("");

    const tweetApi = async function getTwitterTweets(query, lat, long, rad) {
      const apiName = 'twi';
      const path = '/twitter/tweets';
      const myInit = {
          queryStringParameters: {
              query_string: query,
              lat: parseFloat(lat),
              long: parseFloat(long),
              rad: rad
          }
      };
    
      try{
        let temp = await API.get(apiName, path, myInit);
        // console.log(temp);
        // console.log("line 26, tweet result");
        setResults({...temp,query:query});
      }catch{
        setErrorMessage("Something went wrong when getting tweets");
    }
    
  
    }
  

  
    return [tweetApi, tweetResults, tweetErrorMessage];
  };
  



