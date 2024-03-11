const mongoDB = require("../mongo/mongoCommon")
const conversorDeTimestamp = require("../utils/conversorDeTimestamp");

function buscaComando(message) {
  const rawMessage = message.split(" ");
  const command = rawMessage[0];

  return command.substring(1);
}

async function trataMensagem(msg) {
  const comando = this.buscaComando(msg.body);
  const horario = conversorDeTimestamp.converterParaHorario(msg.timestamp);
  const data = conversorDeTimestamp.converterParaData(msg.timestamp);
  const device = msg._data.device;
  const notifyName = msg._data.notifyName;

  console.log((`(${data} - ${horario}/${device}) - ${notifyName} / ${msg._data.type}  : ${msg.body}`));
  mongoDB.InsereChat(msg)
  if (msg.body.startsWith("!")) {
    console.log(msg);
    msg.reply(
      `Seu comando, enviado ${horario} / ${data}, foi *${comando}* enviado de *${notifyName}*`
    );
  }
}

module.exports = {
  buscaComando: buscaComando,
  trataMensagem: trataMensagem
};
