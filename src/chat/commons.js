function buscaComando(message) {
  const rawMessage = message.split(" ");
  const command = rawMessage[0];

  return command.substring(1);
}

function registraLog(message) {
const fs = require('fs');
  fs.appendFile("log.txt", message + "\n", (err) => {
    if (err) throw err;
    console.log("Mensagem registrada no arquivo de log.");
  });
}

module.exports = {
  buscaComando: buscaComando,
  registraLog: registraLog,
};
