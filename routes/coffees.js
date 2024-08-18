const express = require('express');
const Joi = require('joi');
// const app = express(); - this approach doesn't work
// when you seperate the app in a seperate module so we have to do :
const router = express.Router(); // returns a router object


const coffees = [
    {id:1, name: 'Cortado'},
    {id:2, name: 'Espresso'},
    {id:3, name: 'Flat wgite'},
];


// A funtion for validating input using joi class
function validateCoffee(coffee){
    const schema = {name: Joi.string().min(3).required(),};
    return Joi.validate(coffee, schema);
};


// All the coffees
router.get('/', (req, res) => {
    res.send(coffees);
});


// To get a single item
router.get('/:id', (req, res) => {

    // to check if the id is exist so we make it true
    let coffee = coffees.find(c => c.id === parseInt(req.params.id));

    // if not exist so we give 404 - not found , sending message to the client
    if(!coffee) return res.status(404).send('The coffee with the given ID was not found');

    // otherwise, show the item
    res.send(coffee);
});


// Adding a new item
router.post('/', (req, res) => {
    const coffee = {
        id: coffees.length + 1,
        name : req.body.name,
    };

    // validate the item
    // if invalid , return 400 - bad request
    // using Object destructuring (availble in modern javascript)
    const {error} = validateCoffee(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    coffees.push(coffee);
    res.send(coffee);
});


// Updating an item
router.put('/:id', (req, res) => {
    // look up the item
    let coffee = coffees.find(c => c.id === parseInt(req.params.id));

    // if not , return 404
    if(!coffee) return res.status(404).send('The coffee with the given ID was not found');

    // input validation
    const {error} = validateCoffee(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // otherwise, update the item & return it
    coffee.name = req.body.name;
    res.send(coffee);
});


// Deleting an item
router.delete('/:id', (req, res) => {
    // look up the item, if not, return 404
    let coffee = coffees.find(c => c.id === parseInt(req.params.id));
    if(!coffee) return res.status(404).send('The coffee with the given ID was not found');

    // otherwise, delete it, and return the same item
    const index = coffees.indexOf(coffee);
    // splice method : we go to this index and remove 1 item
    coffees.splice(index, 1); 
    // returning the same item
    res.send(coffee);

});


module.exports = router;
