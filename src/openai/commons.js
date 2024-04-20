const fs = require('fs');

const OpenAI = require(`openai`);

const isDocker = fs.existsSync('/app');
const configFilePath = isDocker ? '/app/config.json' : 'config.json';

const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

const apiGptKey = config.GPT_API_KEY;

const openai = new OpenAI({
    apiKey: apiGptKey,
});

async function chatGPTPrompt(pergunta) {
    try {
        const response = await openai.chat.completions.create({
            messages: [{
                role: "system",
                content: `${pergunta}`
            }],
            model: "gpt-3.5-turbo",
            temperature: 0.2,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Erro na solicitação para a API da OpenAI:', error);
        throw error;
    }
}

module.exports = {
    chatGPTPrompt: chatGPTPrompt
}