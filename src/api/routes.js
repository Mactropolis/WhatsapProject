const express = require('express');
const router = express.Router();
const mongoDB = require('../mongo/mongoCommon');

router.get('/array', async (req, res) => {
  const array = await mongoDB.numerosConsolidados();
  res.json(array);
});

router.get('/', async (req, res) => {
  res.json('OK');
});

module.exports = router;