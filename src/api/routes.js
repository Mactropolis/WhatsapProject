const express = require('express');
const router = express.Router();
const mongoDB = require('../mongo/mongoCommon');

router.use(express.json());

router.get('/array', async (req, res) => {
  const array = await mongoDB.numerosConsolidados();
  res.json(array);
});

router.get('/', async (req, res) => {
  res.json('OK');
});

router.post('/alertwords', async (req, res) => {
  const retorno = await mongoDB.insertAlertWords(req.body.palavraAlerta);
  console.log(retorno)
  res.json(retorno);
})

module.exports = router;