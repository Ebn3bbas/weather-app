const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiZWJuM2JiYXMiLCJhIjoiY2xiam45N3JxMTRyOTN2cDg3MXpmbzBncSJ9.sqbHuVbg6FoOr9dKY4eT_g&limit=1";

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect the location services!", undefined);
    } else if (body.features === undefined || body.features.length === 0) {
      callback("unable to find location try another on", undefined);
    } else {
      const { center, place_name } = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};

module.exports = {
  geocode: geocode,
};
