const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

//middleware
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let timeStamp = new Date().toString();
    let log = `${timeStamp}: ${req.method} ${req.path} \n`;
    fs.appendFile('server.log', log, (error) => {
        if (error) {
            console.log(`Could not log ${timeStamp}: ${req.method}`);
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});



app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home",
        welcomeMessage: "Welcome to this amazing website that i am visiting",
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});


app.get('/bad', (req, res) => {
    res.send({
        "statusCode": 400,
        "errorMessage": "Bad request bro",
    })
})

app.listen(3000, () => {
    console.log('Server up and running on port 3000');
});



