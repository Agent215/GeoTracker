module.exports = class EventEntity {

    constructor() {
        this.title = undefined;
        this.category = undefined;
        this.sourceLink = undefined;
        this.locationList = undefined;
        this.isClosed = undefined;
        this.currentLat = undefined;
        this.currentLong = undefined;
        this.id = undefined;
    }

    setTitle(title){
        this.title = title;
    }

    setCategory(category){
        this.category = category;
    }

    setSourceLink(soureLink){
        this.sourceLink = soureLink;
    }

    setLocationList(locationList){
        this.locationList = locationList;
    }

    setIsClosed(isClosed){
        this.isClosed = isClosed;
    }

    setCurrentLat(latitude) {
        this.currentLat = latitude;
    }

    setCurrentLong(longitude) {
        this.currentLong = longitude;
    }

    setId(id) {
        this.id = id;
    }
}
