function converterParaHorario(timestamp) {
    const data = new Date(timestamp * 1000);

    const horas = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();

    const horario = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    return horario;
}

function converterParaData(timestamp) {
    const data = new Date(timestamp * 1000);
    
    const dia = data.getDate();
    const mes = data.getMonth() + 1; 
    const ano = data.getFullYear() % 100;

    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString().padStart(2, '0')}`;

    return dataFormatada;
}

function obterDataFormatada() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = dataAtual.getFullYear();
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
  }

module.exports = {
    converterParaHorario: converterParaHorario,
    converterParaData: converterParaData,
    obterDataFormatada: obterDataFormatada
};
