// Import node libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const signinRoute = require('./routes/signin');
const libraryRoute = require('./routes/library');
const registerRoute = require('./routes/register');
const userRoute = require('./routes/user');

// Setup Express
const app = express();

// Req Obj as JSON, add CORS, and add Morgan
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// enable CORS without external module
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
// To see if server is working
app.get('/', (req, res) => {
    res.status(200).json('Server is working');
});
// Signin, Logic is in Signin Route
app.use('/signin', signinRoute);
// Register, Logic is in Register Route
app.use('/register', registerRoute);
// Library Route, Logic is in Library Route
app.use('/library-item', libraryRoute);
app.use('/user', userRoute);

module.exports = app;