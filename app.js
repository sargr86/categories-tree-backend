const express = require('express');
const app = express();

const port = process.env.PORT ||3000;
const server = require('http').createServer(app);
const cors = require('cors');


// Cors
app.use(cors(require('./config/cors')));

const bodyParser = require('body-parser');

// Start server on pre-defined port
server.listen(port, () => {
    console.log('server is listening on port ' + port)
});

// Dotenv used to read process.env
require('dotenv').config();


// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Passport.js config
// const passport = require('passport');
// require('./config/google-passport-strategy')(passport);
// require('./config/facebook-passport-strategy')(passport);
// app.use(passport.initialize({}));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/categories', require('./routes/categories'));

const path = require('path');


let dist = path.join(__dirname, '/dist/categories-tree/');

if (process.env.NODE_ENV === 'production') {
    console.log('dist works')
    dist = path.join(__dirname, '/dist/categories-tree/')
}
app.use(express.static(dist));

// Separating Angular routes
app.get('*', (req, res, next) => {
    if (!req.url.includes('phpmyadmin') && !req.url.includes('uploads')) {
        res.sendFile(dist + 'index.html');
    }
});




