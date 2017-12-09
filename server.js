const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile(__dirname + '/log/express.log', log + ' \n', (err) => {
        if (err) console.log('Unable to append to express.log');
    });
    next();
})

// app.use((req, res, next) => res.render('maintenance.hbs'));

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my webpage!',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: '404 - Page not found.'
    });
});

app.listen(3000, '192.168.2.120', () => {
    console.log('Express app listening on port 3000');
});