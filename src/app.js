// Modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Create Express application
const app = express()
const port = process.env.PORT || 3000

// Path constants
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up static directory to serve
app.use(express.static(publicDir))

// Set up handlebars engile and views, partials locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Albert '
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Albert'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg: 'This is a help message ',
        name: 'Albert'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })

   
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 helping page',
        name: 'Albert',
        errorMsg: 'Helping page not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Albert',
        errorMsg: 'Page not found'
    })
})



app.listen(port, () => {
    console.log('Server is up on port '+port+'!')
})