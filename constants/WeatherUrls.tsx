//key and value pairs for use with urlTile for changing weather tile overlay
export const weatherUrls = {

    ["clouds"]: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b',
    ["precipitation"]: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b',
    ["pressure"]: 'https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b',
    ["wind"]: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b',
    ["temp"]: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=52621d09b1f91b7e4cbc93777fb2801b',
}

//key and value pairs for use with urlTile for changing weather tile overlay
export const GibsUrls = {

    //["clouds"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/IMERG_Precipitation_Rate/default/2014-04-09/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
    ["clouds"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_Cloud_Effective_Radius/default/default/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png",
    //["precipitation"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MERRA2_ISCCP_Cloud_Albedo_Monthly/default/2014-04-09/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
    ["precipitation"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/IMERG_Precipitation_Rate/default/default/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
    //["pressure"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Cloud_Top_Pressure_Day/default/2014-04-09/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
    ["pressure"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/AIRS_L2_RelativeHumidity_500hPa_Day/default/default/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
    //["wind"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/Aquarius_Wind_Speed_L3_7Day_Snapshot/default/2014-04-09/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
    //
    ["wind"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/CYGNSS_L3_Wind_Speed_Daily/default/default/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
    //["temp"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/AIRS_L3_Surface_Air_Temperature_Monthly_Night/default/2014-04-09/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
    ["temp"]: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/AIRS_L2_Surface_Skin_Temperature_Day/default/default/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png",
}

