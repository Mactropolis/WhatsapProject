const qrcode = require('qrcode-terminal');
const conversorDeTimestamp = require('./src/utils/conversorDeTimestamp')
const trataMensagens = require('./src/chat/commons')
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'yourFolderName',
        clientId: 'ProjectWhatsapp'
    })
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    console.log(msg);
    if (msg.body.startsWith('!')) {
        const comando = trataMensagens.buscaComando(msg.body)
        const horario = conversorDeTimestamp.converterParaHorario(msg.timestamp);  
        const data = conversorDeTimestamp.converterParaData(msg.timestamp);      
         msg.reply(`Seu comando, enviado ${horario} / ${data}, foi *${comando}*`)
    }
});


client.initialize();
