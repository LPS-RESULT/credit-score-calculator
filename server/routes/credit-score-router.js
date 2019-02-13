/**
 * This is the main route, we handle server status here.
 * We also connect the rest of the routes here.
 */

const express = require('express');
const router = express.Router();
const creditScoreService = require('../credit-score-service');

router.post('/', (req, res) => {
    let profile = req.body;
    res.json(creditScoreService.calculateCreditSummary(profile));
});

module.exports = router;