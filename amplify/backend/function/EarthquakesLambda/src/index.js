let EARTHQUAKES_URL;

const fetch = require('node-fetch');
const EventEntity = require('./EventEntity');


exports.handler = async (event) => {
    console.log(event.queryStringParameters);
    parseParameters(event);

    let settings = { method: "Get" };

    let fetchedJsonObject = await fetch(EARTHQUAKES_URL, settings)
        .then(res => res.json())
        .then((json) => {
            return json;
    });

    event.queryStringParameters

    let responseToReturn = createListFromJsonResponse(fetchedJsonObject);

    const response = {
        statusCode: 200,
        body: JSON.stringify(responseToReturn),
        
    };
    return response;
};

function parseParameters(event) {
    let MIN_MAGNITUDE = 6;
    let REVIEW_STATUS = "reviewed";
    let EVENT_TYPE = "earthquake";
    let START_TIME = event.queryStringParameters.starttime;
    let END_TIME = event.queryStringParameters.endtime;
    EARTHQUAKES_URL = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventtype=${EVENT_TYPE}&reviewstatus=${REVIEW_STATUS}&minmagnitude=${MIN_MAGNITUDE}`;
    

    if (START_TIME && START_TIME != "") {
        EARTHQUAKES_URL += "&starttime=" + START_TIME;
    } else {
        EARTHQUAKES_URL += "&starttime=" + "2020-01-01";
    }
         
    if (END_TIME && END_TIME != "") {
        EARTHQUAKES_URL += "&endtime=" + END_TIME;
    }    
    console.log("EARTHQUAKE url requested: " + EARTHQUAKES_URL);
}

function createListFromJsonResponse(json) {
    let parsedList = {};
    let events = [];
    parsedList.events = events;


    json.features.forEach(item => {
        let currentEvent = new EventEntity();
        let timeOccurred = new Date();
        timeOccurred.setTime(item.properties.time);
        let timeOccurredString = timeOccurred.toISOString();
        
        currentEvent.setTitle(item.properties.title);
        currentEvent.setCategory("earthquakes");
        currentEvent.setSourceLink(item.properties.url);
        currentEvent.setLocationList(item.properties.geometry);
        currentEvent.setIsClosed(timeOccurredString);
        currentEvent.setCurrentLat(item.geometry.coordinates[1]);
        currentEvent.setCurrentLong(item.geometry.coordinates[0]);
        currentEvent.setId(item.id);
	    currentEvent.setDate(timeOccurredString);

        parsedList.events.push(currentEvent);
    });

    return parsedList.events;
}
