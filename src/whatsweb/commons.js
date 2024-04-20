const { Client, LocalAuth } = require("whatsapp-web.js");

const qrcode = require("qrcode-terminal");
const conversorDeTimestamp = require("../utils/conversorDeTimestamp");
const mensagens = require("../chat/commons");

const wwebVersion = '2.3000.1012797600-alpha';

async function initializeWhatsApp() {
    await whatsBotInit();
}

async function whatsBotInit() {
    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox']
        },
        webVersionCache: {
            type: 'remote',
            remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
        },
    });

    client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on("ready", async () => {
        console.log(`${conversorDeTimestamp.obterDataFormatada()} - Cliente iniciado com sucesso!`);
        const numeroPara = await client.getNumberId("5511994869827")
        await client.sendMessage(numeroPara._serialized, `${conversorDeTimestamp.obterDataFormatada()} - Cliente iniciado com sucesso!`)
    });

    client.on("message_create", async (msg) => {
        await mensagens.trataMensagem(msg);
    });

    await client.initialize();
}

module.exports = {
    initializeWhatsApp: initializeWhatsApp,
}