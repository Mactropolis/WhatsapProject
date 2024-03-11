require('dotenv/config');
const qrcode = require("qrcode-terminal");
const conversorDeTimestamp = require("./src/utils/conversorDeTimestamp");
const mensagens = require("./src/chat/commons");
const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require('express');
const apiRoutes = require('./src/api/routes')
const app = express();

const port = process.env.WEB_PORT;

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
      headless: true,
      args: ['--no-sandbox']
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log(`${conversorDeTimestamp.obterDataFormatada()} - Cliente iniciado com sucesso!`);
});

client.on("message_create", async (msg) => {
  mensagens.trataMensagem(msg);
});

client.initialize();
