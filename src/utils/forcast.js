const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=57b969e18c2cf6dd7d93e9cfcc24e97e&query=" +
    latitude +
    ",";
  longitude + "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect the weather service!", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;

      callback(
        undefined,
        weather_descriptions[0] +
          " It is currently " +
          -temperature +
          " degress out. But it feels like " +
          -feelslike +
          " degress out"
      );
    }
  });
};

module.exports = {
  forcast: forcast,
};
