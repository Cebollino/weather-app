const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/82056476f1d4f88d169476599bd4d1db/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unabel to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees celsius out. There is a ' + body.currently.precipProbability + '% chance of rain. The minimum temperature '+body.daily.data[0].temperatureMin+' for today is while maximum is '+body.daily.data[0].temperatureMax+'')
        }
    })
}

module.exports = forecast