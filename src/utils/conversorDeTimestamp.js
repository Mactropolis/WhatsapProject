// Define a função converterParaHorario
function converterParaHorario(timestamp) {
    // Multiplica o timestamp por 1000 para converter de segundos para milissegundos
    const data = new Date(timestamp * 1000);

    // Extrai o horário da data
    const horas = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();

    // Formata o horário
    const horario = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    return horario;
}

function converterParaData(timestamp) {
    // Multiplica o timestamp por 1000 para converter de segundos para milissegundos
    const data = new Date(timestamp * 1000);
    
    // Extrai o dia, mês e ano da data
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses em JavaScript começam em zero, então adicionamos 1
    const ano = data.getFullYear() % 100; // Obtém apenas os dois últimos dígitos do ano

    // Formata a data
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString().padStart(2, '0')}`;

    return dataFormatada;
}

// Exporta a função converterParaHorario
module.exports = {
    converterParaHorario: converterParaHorario,
    converterParaData: converterParaData
};
