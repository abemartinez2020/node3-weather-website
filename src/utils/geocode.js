const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFydGlhYnI1MjAiLCJhIjoiY2ticXoxdXVvMm83azJzcGY5cng0dmUxMCJ9.u5Tr3wMi1P7oYm9SwJ1IPw&limit=1`

    request({url, json: true}, (error, {body}) =>{
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0 ) {
            callback('Unable to find search location, look up with a different search term', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;