const express = require('express');
const mealsRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:mealsRoutes');

mealsRouter.route('/')
    .get((req, res) => {
        (async function query() {
            const request = new sql.Request();
            const result = await request.query('select * from meals');
            debug(result);
                res.render('meals',
                {
                    nav: [
                        {link: '/meals', title: 'Meals'},
                        {link: '/drinks', title: 'Drinks'}
                    ],
                    title: 'Meals List',
                    meals: result.recordset
                });
        }())
        
    });
module.exports = mealsRouter;

