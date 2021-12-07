const fs = require("fs");
const path = require("path");


function filterByQuery(query, zookeepers) {
    console.log("zookepersFilterbyQuery: ", zookeepers);
    console.log("Query: ", query);
    //console.log(JSON.stringify(zookeepers));
    let filteredResults = zookeepers;
    if(query.age) {
        filteredResults = filteredResults.filter(
            // since our form data will be coming in as strings, and our JSON is storing
            // age as a number, we must convert the query string to a number to perform the 
            // comparison
            (zookeeper) => zookeeper.age === Number(query.age)
        );
    }
    if(query.favoriteAnimal) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
        );
    }
    if(query.name) {
        console.log(query.name);
        console.log(filteredResults);
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
        
    }
    console.log("FilteredResults: ", filteredResults);
    return filteredResults;
}

function findById(id, zookeepers) {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
}

function createNewZookeeper(body,zookeepers) {
    const zookeeper = body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({ zookeepers }, null, 2) 
    );
    return zookeeper;
}

function validateZookeeper(zookeeper) {

    if(!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }
    if(!zookeeper.age  || typeof zookeeper.age !== "number") {
        return false;
    }
    if(!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
        return false;
    }
    if(!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,  
};

