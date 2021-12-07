// Need to import
const {filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const { animals } = require('../../data/animals');

const router = require('express').Router();
// Now I change all app.   to router get since it is not in the server.js






// I don't need /api/animals because Router function adds the /api for us
router.get('/animals', (req, res) => {
    // I am using the send method from the response to send a string

    let results = animals;
   
    if(req.query) {
        results = filterByQuery(req.query, results);
    }

    res.json(results);

});
// A param route needs to come after the other route
router.get('/animals/:id', (req, res)=> {
    const result = findById(req.params.id, animals);

    if(result) {
        res.json(result);
    } else {
        res.send(404);//not found
    }
    
});

// creates a route that listens for post requests
// we want the server to accept data from the user
router.post('/animals', (req, res) => {
    // req.body is where our incoming content will be 
    // set id based on what the index of the animalarr will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrrect, send 400 error back
    if(!validateAnimal(req.body)){
        res.status(400).send('The animal is not properly formatted.');
    } else {

         // add animal to json file and animals array
    const animal = createNewAnimal(req.body, animals);

    res.json(animal);



    }

   
});



module.exports = router;