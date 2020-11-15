import {  useState } from "react";

import { API } from 'aws-amplify';


  export default () => {
    const [trendsResults, setTrendsResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const trendsApi =async function getTwitterTrending(lat, long,) {
        const apiName = 'twi';
        const path = '/twitter';
        const myInit = {
            queryStringParameters: {
                lat: parseFloat(lat),
                long: parseFloat(long),
      
            }
        };
        try{
            let temp = await API.get(apiName, path, myInit);
            // console.log(temp);
            // console.log("line 44 trend Resulut");
            setTrendsResults(temp);

        }
        catch{
            setErrorMessage("something went wrong when getting twitter trends");
        }
        


      }

  
    return [trendsApi, trendsResults, errorMessage];
  };
  



