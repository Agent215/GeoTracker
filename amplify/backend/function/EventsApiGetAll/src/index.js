

exports.handler = async (event) => {
    // TODO implement

    const fetch = require('node-fetch');

    let url = "https://eonet.sci.gsfc.nasa.gov/api/v3/events";

    let settings = { method: "Get" };

    let jsonObject = await fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            // do something with JSON
            return json;
    });


    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*"
    //  }, 
        // body: JSON.stringify('Hello from Lambda!'),
        body: JSON.stringify(jsonObject),
        
    };
    return response;
};
