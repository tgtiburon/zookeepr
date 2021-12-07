 const fs = require("fs");

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");

const {zookeepers }  = require("../data/zookeepers");
const { TestWatcher } = require("@jest/core");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const { start } = require("repl");
const { validateAnimal } = require("../lib/animals");

jest.mock("fs");


test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        {
            name: "Darlene",
            id: "asdfjkl;"
        }, zookeepers
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBE("asdfjkl;");
});

test("filters by query", () => {
    const startingZookeepers   = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
          },
          {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
          },


    ];

    const updatedZookeepers = filterByQuery({ age: 31}, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin",
          },
          {
            id: "3",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear",
          },


    ];

    const result = findById("3", startingZookeepers);
    expect(result.name).toBE("Isabella");
});


test("validates age", () => {
    const zookeeper = {

        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",

    };

    const invalidZookeeper = {
        id: "3",
        name: "Isabella",
        age: "67",
        favoriteAnimal: "bear",

    }

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBE(true);
    expect(result2).toBE(false);


});