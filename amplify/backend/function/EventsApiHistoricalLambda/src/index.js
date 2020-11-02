const HISTORICAL_EVENTS_URL = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?start=2020-01-01&end=2020-12-31&status=closed";
const fetch = require('node-fetch');
const EventEntity = require('./EventEntity');


exports.handler = async (event) => {
    let settings = { method: "Get" };

    let fetchedJsonObject = await fetch(HISTORICAL_EVENTS_URL, settings)
        .then(res => res.json())
        .then((json) => {
            return json;
    });

    let responseToReturn = createListFromJsonResponse(fetchedJsonObject);

    const response = {
        statusCode: 200,
        body: JSON.stringify(responseToReturn),
        
    };
    return response;
};

function createListFromJsonResponse(json) {
    let parsedList = {};
    let events = [];
    parsedList.events = events;


    json.events.forEach(item => {
        let currentEvent = new EventEntity();

        currentEvent.setTitle(item.title);
        currentEvent.setCategory(item.categories[0].id);
        currentEvent.setSourceLink(item.sources[0].url);
        currentEvent.setLocationList(item.geometry);
        currentEvent.setIsClosed(item.closed);
        currentEvent.setCurrentLat(item.geometry[0].coordinates[1]);
        currentEvent.setCurrentLong(item.geometry[0].coordinates[0]);
        currentEvent.setId(item.id);
	    currentEvent.setDate(item.geometry[0].date);

        parsedList.events.push(currentEvent);
    });

    return parsedList.events;
}
