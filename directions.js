require('dotenv').config();
const Promise = require('bluebird');
const googleMapsAPI = require('googlemaps');

getDirections('New York City', 'Houston', 'driving').then(res => {
  console.log(res)
})

function getDirections(origin, destination, mode) {
  const config = {
    key: process.env.GOOGLE_API_KEY,
    encode_polylines: false,
    secure: true
  };

  const params = {
    origin: origin,
    destination: destination,
    mode: mode
  };
  
  const googleMaps = new googleMapsAPI(config);
  return new Promise((resolve, reject) => {
    googleMaps.directions(params, (err, res) => {
      if (err) {
        return err;
      }
      resolve(res);
    })
  });
}
