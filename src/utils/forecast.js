const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=942d47503e9203f4ad1791f6a0f298a2&query='+latitude+','+longitude+'&units=f'
    request({url, json:true}, (error, res) => {
        if (error){
            callback(error, undefined)
        }else if(res.body.error){
            callback(res.body.error, undefined)
        }else{
            callback(undefined, res.body.current.weather_descriptions[0] + ". It is currently " + res.body.current.temperature + '. It feels like ' + res.body.current.feelslike)
        }
    })
}

module.exports = forecast 
