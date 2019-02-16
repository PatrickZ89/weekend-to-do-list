const express = require('express');
const router = express.Router();
const pg = require('pg');
const pool = pg.Pool({
    host: 'localhost', 
    port: 5432,
    database: 'weekend-to-do-app', 
    max: 10, 
    idleTimeoutMillis: 30000 
});

pool.on('connect', () => {
    console.log('Postgresql connected');
});
pool.on('error',(error) => {
    console.log('Error with postgres pool', error);
});

router.get('/', (req, res) => {
    console.log('GET route was hit');
    pool.query('SELECT * FROM "tasks"')
        .then((results) => {
            console.log(results.rows)
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with GET', error);
            res.sendStatus(500);
        });
});







module.exports = router;