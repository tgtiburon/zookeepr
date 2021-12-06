const express = require('express');

const { animals }  = require('./data/animals');


// For heroku
const PORT = process.env.PORT || 3001;

// setting up a server takes 2 steps
// 1. instantiate the server
// 2. listen for equests
const app = express();

// 2. listen for requests

// We are running on 3001 for testing.
// http:// runs on 80
// https:// runs on 443
// Ports under 1024 are special and need special permissions (Like admin)   
// Ports can be from 1024 - 49151


// 2 arguments, 1. string route the client will have to fetch from, 2. callback function that will
// execute each time that route is accesset with GET request.


function filterByQuery(query, animalsArray)   {

    // Because personality is an array we need to handle it special
    let personalityTraitsArray = [];
    //Note that we save te animalsArray as filtered results here:
    let filteredResults = animalsArray;
    if(query.personalityTraits) {
        //Save personalityTraits as a dedicated array
        //If personalityTraits is a string, place it into a new array and save.
        if(typeof query.personalityTraits === 'string') {
            // this makes sure personalityTraits are always an array, even if 
            // a string
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have everyone of the traits 
            // the .foreach() loop is finished
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species)  {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}
app.get('/api/animals', (req, res) => {
    // we are using the send method from the response to send a string
    //res.send('Hello!');
    //res.json(animals);
    let results = animals;
    //console.log(req.query);
    //res.json(results);
    if(req.query) {
        results = filterByQuery(req.query, results);
    }

    res.json(results);

});
// A param route needs to come after the other route
app.get('/api/animals/:id', (req, res)=> {
    const result = findById(req.params.id, animals);

    if(result) {
        res.json(result);
    } else {
        res.send(404);//not found
    }
    
});

app.listen(PORT, ()=> {
    console.log(`API server now on port ${PORT}!`);
});