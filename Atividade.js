// crie uma calculadora de IMC. utilize funções, eventos e as tags de entrada de informações (input) para efetuar a entrada de informaçao do usúario, devolva as informações ao usuario, devolva, as informacões ao usuario via DOM na página web. 

// --- 1. SELEÇÃO DOS ELEMENTOS DO DOM ---
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const btnCalcular = document.getElementById('btnCalcular');
const divResultado = document.getElementById('resultado');

// --- 2. DEFINIÇÃO DAS FUNÇÕES ---

/**
 * Função pura que calcula o valor do IMC.
 * @param {number} peso 
 * @param {number} altura 
 * @returns {number} Valor do IMC calculado
 */
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

/**
 * Função que avalia o IMC e retorna o texto da faixa e a classe de estilo correspondente.
 * @param {number} imc 
 * @returns {Object} Objeto contendo o texto e a classe CSS
 */
function obterClassificacao(imc) {
    if (imc < 18.5) {
        return { texto: 'Abaixo do peso', classe: 'alerta' };
    } else if (imc >= 18.5 && imc < 25) {
        return { texto: 'Peso normal', classe: 'normal' };
    } else if (imc >= 25 && imc < 30) {
        return { texto: 'Sobrepeso', classe: 'alerta' };
    } else {
        return { texto: 'Obesidade', classe: 'perigo' };
    }
}

/**
 * Função principal que lê os inputs, valida os dados, executa os cálculos 
 * e atualiza o DOM da página.
 */
function processarCalculo() {
    // Coleta os valores inseridos pelo usuário nos inputs
    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);

    // Validação de segurança dos dados de entrada
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        divResultado.style.display = 'block';
        divResultado.className = 'perigo';
        divResultado.innerHTML = 'Por favor, insira valores válidos de peso e altura.';
        return;
    }

    // Chamada das funções de lógica
    const imc = calcularIMC(peso, altura);
    const classificacao = obterClassificacao(imc);

    // Devolução das informações ao usuário alterando o DOM da página
    divResultado.style.display = 'block';
    divResultado.className = classificacao.classe;
    divResultado.innerHTML = `
        IMC: <strong>${imc.toFixed(2)}</strong><br>
        Classificação: <strong>${classificacao.texto}</strong>
    `;
}

// --- 3. CONFIGURAÇÃO DOS EVENTOS ---

// Adiciona um ouvinte de evento para escutar o clique no botão de cálculo
btnCalcular.addEventListener('click', processarCalculo);