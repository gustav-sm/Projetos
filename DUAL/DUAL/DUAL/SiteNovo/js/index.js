// Adiciona um evento ao documento que é acionado quando o DOM é completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Define um array de objetos que contém o conteúdo que será dinamicamente adicionado ao HTML
    const content = [
        {
            title: 'DUAL',
            description: 'Descubra e desenvolva o melhor de si',
            text: 'Oferecemos guias práticos, planos de aula adaptados, e uma comunidade de apoio dedicada a transformar desafios em conquistas. Navegue pelo nosso site e descubra como podemos ajudar você a alcançar novos horizontes.'
        },
        {
            title: 'SOBRE NOS',
            description: '',
            text: ''
        },
        {
            title: 'NOSSA MISSAO',
            description: '',
            text: ''
        },
        {
            title: 'VAMOS APRENDER',
            description: '',
            text: '',
            jogos: [
                {
                    title: 'Quebra cabeca',
                    description: '',
                    text: ''
                },
                {
                    title: 'Raciocinio Logico',
                    description: '',
                    text: ''
                },
                {
                    title: 'Jogo de Memoria',
                    description: '',
                    text: ''
                },
                {
                    title: 'Jogo de Matematica',
                    description: '',
                    text: ''
                }
            ]
        }
    ];

    // Seleciona o elemento com o id 'dynamicContent' onde o conteúdo será inserido
    const dynamicContentDiv = document.getElementById('dynamicContent');

    // Itera sobre cada item no array 'content'
    content.forEach(item => {
        // Cria um novo elemento <section> e adiciona a classe 'main' a ele
        const section = document.createElement('section');
        section.classList.add('main');

        // Cria um elemento <h2> para o título e define seu texto
        const h2 = document.createElement('h2');
        h2.textContent = item.title;

        // Cria um elemento <p> para a descrição e define seu texto
        const p1 = document.createElement('p');
        p1.textContent = item.description;

        // Cria um elemento <p> para o texto detalhado e define seu texto
        const p2 = document.createElement('p');
        p2.textContent = item.text;

        // Cria um elemento <img> para a imagem e define a fonte e o texto alternativo
        const img = document.createElement('img');
        img.src = 'Illustration_1.png';
        img.alt = 'Ilustração de apoio educacional';

        // Cria um <div> para agrupar o campo de entrada de email e o botão
        const emailDiv = document.createElement('div');
        emailDiv.classList.add('email');

        // Cria um campo de entrada para o email e define atributos como tipo, id, placeholder e rótulo acessível
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.id = 'email';
        emailInput.placeholder = 'Insira seu email';
        emailInput.setAttribute('aria-label', 'Insira seu email');

        // Cria um botão para enviar o email e define seu texto
        const emailButton = document.createElement('button');
        emailButton.type = 'button';
        emailButton.textContent = 'Comece já';

        // Adiciona o campo de entrada de email e o botão ao <div> de email
        emailDiv.appendChild(emailInput);
        emailDiv.appendChild(emailButton);

        // Adiciona o título, descrição, texto, imagem e <div> de email à seção
        section.appendChild(h2);
        section.appendChild(p1);
        section.appendChild(p2);
        section.appendChild(img);
        section.appendChild(emailDiv);

        // Adiciona a seção completamente construída ao <div> de conteúdo dinâmico
        dynamicContentDiv.appendChild(section);
    });
});
