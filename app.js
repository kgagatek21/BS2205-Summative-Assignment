const express = require('express');
const chalk = require('chalk');
const path = require('path');
const debug = require('debug') ('app');
const morgan = require('morgan');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
    user: 'the-clown-of-waterloo',
    password: 'AStrongPassword29!',
    server: 's-the-clown-of-waterloo.database.windows.net',
    database: 'db_the_clown_of_waterloo',

    options: {
        encrypt: true //if you're using azure
    }
} //Variable declaring details needed to connect to database
    
sql.connect(config).catch((err) => debug(err)) //Establishes connection to data base using config constant

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const mealsRouter = require("./src/routes/mealsRoutes");
app.use('/meals', mealsRouter);

const drinksRouter = require("./src/routes/drinksRoutes");
app.use('/drinks', drinksRouter);

app.get('/', function(req,res) {
    res.render('index', 
    {
        nav: [
            {link: '/meals', title: 'Meals'},
            {link: '/drinks', title: 'Drinks'}
        ],
        title: 'The Clown of Waterloo'
    
    });
})

app.listen(port, function(){
    debug(`listening on port ${chalk.green(port)}`);
})

