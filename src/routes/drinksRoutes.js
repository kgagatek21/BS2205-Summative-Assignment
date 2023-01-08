const express = require('express');
const drinksRouter = express.Router();
const sql = require('mssql');
const debug = require('debug') ('app:drinksRoutes');

drinksRouter.route('/')
    .get((req, res) => {
        (async function query() {
            const request2 = new sql.Request();
            const result2 = await request2.query('select * from drinks');
            debug(result2);
                res.render('drinks',
                {
                    nav: [
                        {link: '/meals', title: 'Meals'},
                        {link: '/drinks', title: 'Drinks'}
                    ],
                    title: 'Drinks List',
                    drinks: result2.recordset
                });
            }())
            
        });
module.exports = drinksRouter;

