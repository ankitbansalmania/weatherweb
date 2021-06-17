const request = require('request');

const geocode = (loc, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + loc + '.json?access_token=pk.eyJ1IjoiYW5raXRiYW5zYWxtYW5pYSIsImEiOiJja3B2MzBqcTIwaHVyMnBwYWU4OTg0Nnl1In0.p-tNjLdR3iItdTDbDpzkBw&limit=1'


    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect tto location services', undefined)
        } else if (body.features.length === 0) {
            callback('Please pass correct values to get correct Lat and Long', undefined)
        } else {        
            const data = body
            //console.log(data)
            //callback(undefined, 'Lattitude for ' + loc + ' is ' + data.features[0].center[0] + ' and longitude is ' + data.features[0].center[1])
            callback(undefined, {
                latitude: data.features[0].center[0],
                longitude: data.features[0].center[1],
                location: loc
            })
        }
    })
}

module.exports = geocode