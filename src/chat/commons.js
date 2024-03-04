function buscaComando(message) {
  const rawMessage = message.split(" ");
  const command = rawMessage[0];

  return command.substring(1);
}

// function registraLog(message) {
// const conversorDeTimestamp = require("../utils/conversorDeTimestamp");
// const fs = require('fs');
//   fs.appendFile("log.txt", message + "\n", (err) => {
//     if (err) throw err;
//     console.log(`${conversorDeTimestamp.obterDataFormatada()} Mensagem registrada no arquivo de log.`);
//   });
// }

module.exports = {
  buscaComando: buscaComando,
  // registraLog: registraLog,
};
