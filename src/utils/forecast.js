const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bb950c1db5d2db9c3247dc625b0a4733&query=" + lat + ',' + long
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('There is an issue while connecting', undefined)
        } else if (body.error) {
            callback('Please provide the correct values', undefined)
        } else {
            //const data = JSON.parse(response.body)
            const data = body
            const temp = data.current.temperature
            const feedata = data.current.feelslike
            //console.log(feedata)
            callback(undefined, 'It feels like current temprature is ' + temp + ' and it feels like ' + feedata + ' % chance of rain')
            // const weatherdesc = data.current.weather_descriptions[0]
            // console.log(weatherdesc)
        }
    })
}

module.exports = forecast