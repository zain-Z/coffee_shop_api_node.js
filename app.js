const express = require('express')
const Joi = require('joi');
const app = express();
app.use(express.json());

const coffees = [
    {id:1, name: 'Cortado'},
    {id:2, name: 'Espresso'},
    {id:3, name: 'Flat wgite'},
];

// Home page
app.get('/', (req, res) => {
    res.send('Home');
});

// All the coffees
app.get('/api/coffees', (req, res) => {
    res.send(coffees);
});

// To get a single item
app.get('/api/coffees/:id', (req, res) => {

    // to check if the id is exist so we make it true
    let coffee = coffees.find(c => c.id === parseInt(req.params.id));

    // if not exist so we give 404 - not found , sending message to the client
    if(!coffee) return res.status(404).send('The coffee with the given ID was not found');

    // otherwise, show the item
    res.send(coffee);
});

// Adding a new item
app.post('/api/coffees', (req, res) => {
    const coffee = {
        id: coffees.length + 1,
        name : req.body.name,
    };
    coffees.push(coffee);
    res.send(coffee);
});






port = process.env.PORT || 3000;

app.listen(3000, () =>{
    console.log(`listeninf on port ${port}...`);
});