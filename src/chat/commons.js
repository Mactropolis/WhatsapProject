const mongoDB = require("../mongo/mongoCommon")
const chatGPT = require('../openai/commons')
const conversorDeTimestamp = require("../utils/conversorDeTimestamp");

function buscaComando(message) {
  const rawMessage = message.split(" ");
  const command = rawMessage[0];

  return command.substring(1);
}

async function keywordCheck(message) {
  if (message == null) {
    return false;
  }
  return true;
}

async function trataMensagem(msg) {
  // const comando = this.buscaComando(msg.body);
  const device = msg._data.device;
  const notifyName = msg._data.notifyName;

  console.log((`(${conversorDeTimestamp.obterDataFormatada()}/${device}) - ${notifyName} / ${msg._data.type}  : ${msg.body}`));
  mongoDB.InsereChat(msg)

  if ((msg.body.startsWith('!gpt') && msg.fromMe == false) || msg.body.startsWith('!selfgpt')) {
    const prompt = msg.body.substring(4);
    console.log('\n\n' + prompt);
    const retorno = await chatGPT.chatGPTPrompt(prompt);
    msg.reply(
      `Mensagem do GPT Bot - ${retorno}`
    )
  }

}

module.exports = {
  buscaComando: buscaComando,
  trataMensagem: trataMensagem,
  keywordCheck: keywordCheck
};
