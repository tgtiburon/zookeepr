
const express = require('express');

// path is built into node.js API that makes working
// with file systems more predictable.
//const path = require('path');  

//const { animals }  = require('./data/animals');

// For heroku
const PORT = process.env.PORT || 3001;

// setting up a server takes 2 steps
// 1. instantiate the server
// 2. listen for equests
const app = express();

// require statment will read the index.js file in each
// of the required locations
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');







// 2. listen for requests

// We are running on 3001 for testing.
// http:// runs on 80
// https:// runs on 443
// Ports under 1024 are special and need special permissions (Like admin)   
// Ports can be from 1024 - 49151


// 2 arguments, 1. string route the client will have to fetch from, 2. callback function that will
// execute each time that route is accesset with GET request.


// app.use() executed by our express.js server that mounts a function
// to the server that our requests will pass through before getting 
// to the intended endpoint.
// MIDDLEWARE
// parse incoming string or array data
// express.urlendcoded is builtin express.js. It takes POST data and converts it to
// key/value pairings that can be accessed in req.body.  
// Extended true means it has nested data so it needs to keep parsing as
// deep as it can

// The two below functions must always be set up if you are accepting POST
app.use(express.urlencoded({ extended : true}));
// parse incoming JSON data
app.use(express.json());


// used to allow css and style
// we allow everything in the public folder to be used
// this way we dont need specific endpoints for everything
app.use(express.static('public'));



// if someone navigates to /api the app will use the 
// api router we setup in apiRoutes

app.use('/api', apiRoutes);
// if someone uses / as the endpoint we will
// use htmlRoutes
app.use('/', htmlRoutes);









app.listen(PORT, ()=> {
    console.log(`API server now on port ${PORT}!`);
});