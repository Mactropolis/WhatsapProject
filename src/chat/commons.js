function trataMensagem(message) {
    const rawMessage = message.split(' ');
    const command = rawMessage[0];

    return command.substring(1);
}

module.exports = {
    trataMensagem: trataMensagem
}