const express = require('express');
const coffees = require('./routes/coffees');
const home = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


// because we had our routes in a seperate module
app.use('/api/coffees', coffees); 
app.use('/', home); 


// Enviroment variable
port = process.env.PORT || 3000;

app.listen(3000, () =>{
    console.log(`listening on port ${port}...`);
});