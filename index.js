require('dotenv/config');
const mongoDB = require("./src/mongo/mongoCommon")

const express = require('express');
const app = express();
const apiRoutes = require('./src/api/routes')
const whatsModulo = require('./src/whatsweb/commons')

const port = process.env.WEB_PORT;

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

whatsModulo.initializeWhatsApp();