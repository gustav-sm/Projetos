import { initializeDragAndDrop } from './drag-and-drop.js'; // Importa a função para inicializar o drag and drop
import { initializeScore } from './score.js'; // Importa a função para inicializar a pontuação

// Aguarda o carregamento completo do DOM antes de executar as inicializações
document.addEventListener('DOMContentLoaded', function () {
    initializeDragAndDrop(); // Inicializa a funcionalidade de arrastar e soltar do quebra-cabeça
    initializeScore(); // Inicializa a funcionalidade de pontuação
});

// Função para filtrar elementos com base no valor do campo de busca
function search() {
    let input = document.getElementById("search-bar").value; // Obtém o valor inserido no campo de busca
    input = input.toLowerCase(); // Converte o valor para minúsculas para fazer uma comparação de texto sem diferenciação de maiúsculas/minúsculas
    let x = document.getElementsByClassName("courses-logo"); // Seleciona os elementos com a classe 'courses-logo'

    // Percorre todos os elementos com a classe 'courses-logo'
    for (let i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) { // Verifica se o conteúdo do elemento não inclui o texto buscado
            x[i].style.display = "none"; // Oculta o elemento se não contiver o texto buscado
        } else {
            x[i].style.display = "list-item"; // Exibe o elemento se contiver o texto buscado
            x[i].style.listStyleType = "none"; // Remove a estilização padrão de lista, caso seja um elemento list-item
        }
    }
}
