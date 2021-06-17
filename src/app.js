const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bars engine
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'New Weather App',
        name: 'Ankit Bansal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abcd'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help message',
        title: 'Help',
        name: 'Qwerty'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Hello Express!!!</h1>')
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Ankit',
//         age: 27
//     },{
//         name: 'Abcd',
//         age: 10
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>This is the about page!!!</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a certain address in order to get forecast'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search terms'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article error message',
        title: 'Help 404',
        name: 'hGFSGHDFGH'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Generic error message',
        title: '404',
        name: 'JGHBJ'
    })
})

app.listen(3000, () => {
    console.log('Server is up on PORT 3000')
})