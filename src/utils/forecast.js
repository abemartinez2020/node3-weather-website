const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=994cc3d06fd1b47bca93db614ca47f9d&query=${latitude},${longitude}&units=f`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if(body.error) {
            callback('Unable to find location.', undefined);
        } else {
            const weatherDes = body.current.weather_descriptions[0];
            const weatherTemp = body.current.temperature;
            const feelsLike = body.current.feelslike;
            const answer = `${weatherDes}, IT's currently ${weatherTemp} degrees out, but feels like ${feelsLike} degrees`
            callback(undefined, answer) 
        }
    })
}




  module.exports = forecast;