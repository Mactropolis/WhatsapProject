const qrcode = require('qrcode-terminal');
const conversorDeTimestamp = require('./src/utils/conversorDeTimestamp')
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

client.on('message', async (message) => {
    const whatsHorario = conversorDeTimestamp.converterParaHorario(message.timestamp)
    const whatsData = conversorDeTimestamp.converterParaData(message.timestamp)
    console.log(`${message._data.notifyName}(${whatsData}-${whatsHorario})/${message.type} : ${message.body}\n`);
    console.log(message);
	if (message.body === '!ping') {
		await message.reply('pong');
        await message.react('👍');
	}
});


client.initialize();
