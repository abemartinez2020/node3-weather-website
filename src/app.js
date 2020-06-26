const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Express is a single function, that will be called once to create a new express application.

//creat a new app that has methods/it's an object.
const app = express();

//Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views' );
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
      title: 'Weather hbs App',
      name: "Abrahan Mar"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "abe"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Need to provide address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error) {
           return res.send({
               error: error,
            })
        }
        
    forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
           return  res.send({
               error: error,
           })
        } else {
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        }
      })
    
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
       return  res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help is on the way!',
        name: 'Abrahan',
        issue: 'frozen page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Help',
        message: 'Help article not found',
        name: 'AMartinez'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Generic',
        message: 'Page not found',
        name: 'Abe'
    })
})
//app.com --> one domain
//setup multiple routes
    //app.com/help
    //app.com/about

//Start the server up.

app.listen(3000, () => {
    console.log('Server started correctly. Running on port 3000.');
});