const request = require('request')

const geoCode = (location, callback) => {
    
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiY29yeTI2IiwiYSI6ImNrczg4b211ZjBpa3EydW9janF6eGtyZGwifQ.HItytdROG_a3ogewrJ7Rmg'
    debugger
    request({url: mapBoxUrl, json: true}, (error, res) => {
        if(error){
            callback(error, undefined)
        }else if (res.body.features.length === 0){
            callback({error:'could not find address. please enter a different one'}, undefined)
        }else{
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
