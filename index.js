const fs = require('fs');

const qrcode = require("qrcode-terminal");
const conversorDeTimestamp = require("./src/utils/conversorDeTimestamp");
const trataMensagens = require("./src/chat/commons");
const { Client, LocalAuth } = require("whatsapp-web.js");


const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "yourFolderName",
    clientId: "ProjectWhatsapp",
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  trataMensagens.registraLog(`${conversorDeTimestamp.obterDataFormatada()} - Cliente iniciado com sucesso!`);
});

client.on("message", async (msg) => {

  const comando = trataMensagens.buscaComando(msg.body);
  const horario = conversorDeTimestamp.converterParaHorario(msg.timestamp);
  const data = conversorDeTimestamp.converterParaData(msg.timestamp);
  const device = msg._data.device;

  trataMensagens.registraLog((`(${data} - ${horario}/${device}) - ${msg._data.notifyName} / ${msg._data.type}  : ${msg.body}`));
  if (msg.body.startsWith("!")) {
    console.log(msg);
    msg.reply(
      `Seu comando, enviado ${horario} / ${data}, foi *${comando}* enviado de *{}`
    );
  }
});

client.initialize();



  
