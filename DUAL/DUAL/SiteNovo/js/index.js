document.addEventListener('DOMContentLoaded', function() {
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
        }
        ,
        {
            title: 'NOSSA MISSAO',
            description: '',
            text: ''
        }
        ,
        {
            title: 'VAMOS APRENDER',
            description: '',
            text: '',
            jogos:[
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

    const dynamicContentDiv = document.getElementById('dynamicContent');

    content.forEach(item => {
        const section = document.createElement('section');
        section.classList.add('main');

        const h2 = document.createElement('h2');
        h2.textContent = item.title;

        const p1 = document.createElement('p');
        p1.textContent = item.description;

        const p2 = document.createElement('p');
        p2.textContent = item.text;

        const img = document.createElement('img');
        img.src = 'Illustration_1.png';
        img.alt = 'Ilustração de apoio educacional';

        const emailDiv = document.createElement('div');
        emailDiv.classList.add('email');

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.id = 'email';
        emailInput.placeholder = 'Insira seu email';
        emailInput.setAttribute('aria-label', 'Insira seu email');

        const emailButton = document.createElement('button');
        emailButton.type = 'button';
        emailButton.textContent = 'Comece já';

        emailDiv.appendChild(emailInput);
        emailDiv.appendChild(emailButton);

        section.appendChild(h2);
        section.appendChild(p1);
        section.appendChild(p2);
        section.appendChild(img);
        section.appendChild(emailDiv);

        dynamicContentDiv.appendChild(section);
    });
});