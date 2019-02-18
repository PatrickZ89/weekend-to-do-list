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
    pool.query('SELECT * FROM "tasks" ORDER BY "status" DESC, "id"')
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with GET', error);
            res.sendStatus(500);
        });
});


router.post('/', (req, res) => {
    console.log('Adding Task:', req.body.task);
    pool.query(`INSERT INTO "tasks" ("task", "status", "priority", "notes", "deadline")
    VALUES ( $1, $2, $3, $4, $5 );`, [req.body.task, req.body.status, req.body.priority, req.body.notes, req.body.deadline])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error with task insert:', error);
        res.sendStatus(500);
    });
});


router.delete('/:id', (req, res) => {
    console.log('/tasks DELETE request was hit');
    console.log('req.params:', req.params);
    pool.query(`DELETE FROM "tasks" WHERE "id"=$1;`, [req.params.id])
    .then(() => {
        res.sendStatus(204);
    }).catch(error => {
        console.log('there was an error on the task DELETE query', error);
        res.sendStatus(500);
    });
});


router.put('/:id', (req, res) => {
    console.log('/tasks PUT request was hit');
    console.log('req.params', req.params);
    pool.query(`UPDATE "tasks"  SET "status"= 'Complete' WHERE "id"=$1`, [req.params.id])
    .then(() => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log('there was an error on the task PUT query', error);
        res.sendStatus(500);
    });
});




module.exports = router;