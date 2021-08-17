const path = require('path') //core module. this allows us to work with directory paths easier
const express = require('express') //web server 
const hbs = require('hbs') //so we can use partials
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

//define paths for express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public') //use path module to get access to pulic dir
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials') 

app.set('view engine','hbs') //tell express what templating engine we installed
app.set('views', viewsPath) // tell express to use a different directory for the views. in this case "templates"
hbs.registerPartials(partialsPath) //location of partials

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { //index/default page is ''
    res.render('index', { //use to render a view
        title: 'index page', //since the title propertie exist in each page. we can add it to a template/partials
        name: 'name:Cory'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'name:Its me, Mario'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "this is helpful text",
        title: 'help page',
        name: 'name:memoo memoo'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) { //check if address exists in url params
        return res.send({
            error: "please enter an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //need to pass empty object incase of an error otherwise it will fail to destructure these properties
        if (error) {
            return res.send(error)
        }
        forecast(latitude, longitude, (error, weather) => {
            if (error) {
                return res.send(error)
            }
            return res.send({
                forecast: weather, //return forecast response back to view
                location, //return geocode response location back to view
                address: req.query.address, //return the query string value back to the view
            })
        })
    })
})

//query string example
app.get('/products', (req, res) =>{
    if (!req.query.search){ //access url query using "req.query" where "search" is the key name
        return res.send({ //return a response so that way it doesnt try to do 2 res.send requests
            error:'you must provide a search term'
        })
    }    

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => { //wild card to grab all non matching urls after /help
    //res.send('help article not found') using static message for this specific page
    res.render('404', { //using handlebars template for error page
        title: '404',
        errorMessage: 'help article not found',
        name: 'created by cory'
    })
})

app.get('*', (req, res) => { //wild card to grab all non matching urls
    res.render('404', { 
        title: '404',
        errorMessage: 'page not found',
        name: 'cory'
    
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000 ,() => {
    console.log('server is up on port 3000') //this starts up the server on a specific port. 3000 is a development port. http is port 80

})