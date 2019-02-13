/**
 * This is the main route, we handle server status here.
 * We also connect the rest of the routes here.
 */

const express = require('express');
const router = express.Router();
const userService = require('../user-service');

router.get('/', (req, res) => {
    let search = req.query.search || "";
    let limit = req.query.limit || 20;
    let offset = req.query.offset || 0;
    let sort = req.query.sort || "";

    userService.getUsers(search, limit, offset, sort).then((result) => {
        res.json(result);
    }, (error) => {
        res.next(error);
    })
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    userService.getUser(id).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

router.post('/', (req, res) => {
    let object = req.body;
    userService.createUser(object).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let object = req.body;
    userService.updateUser(id, object).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    userService.deleteUser(id).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({error: error});
    })
});

module.exports = router;
