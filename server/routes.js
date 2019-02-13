
const express = require('express');
const router = express.Router();
const path = require("path");
const creditScoreRouter = require('./routes/credit-score-router');
const userRouter = require('./routes/user-router');

router.use('/creditscore', creditScoreRouter);
router.use('/user', userRouter);

module.exports = router;