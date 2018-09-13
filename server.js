const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: Method ${req.method} || URL ${req.url}`;
    fs.appendFileSync('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append server.log')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenence.html');
// });

app.use(express.static(__dirname + '/public'));

app.listen(4200, () => {
    console.log('App listning on port 4200');
});

app.get('/', (req, res) => {
    res.render('index.html',{
        welcomeMessage: 'Hi Welcome to this website, currently you are on ',
        currentYear: new Date().getFullYear(),
        pageTitle: 'Index Page'
    });
});

app.get('/home', (req, res) => {
    res.render('home.html', {
        pageTitle: 'Home Page'
    });
});