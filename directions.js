require('dotenv').config();
const fs = require('fs');
const Promise = require('bluebird');
const googleMapsAPI = require('googlemaps');

getDirections('New York City', 'Houston', 'driving').then(res => {
/*  return res.routes.map(route => route.legs)
            .map(legs => legs.steps)*/
//            .map(step => step.instructions)
  const leg = res.routes[0].legs[0];
//  return leg.map(x => x.html_instructions)
  return leg.distance
//  fs.writeFileSync('obj.txt', JSON.stringify(leg))
//  return leg
}).then(res => {
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
