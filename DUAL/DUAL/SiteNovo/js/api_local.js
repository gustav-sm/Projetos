// Declaração global de CPF


// Event listener para DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Verifica se cpf_ é 2 e atualiza o HTML
    
        let nome_ = localStorage.getItem('nome') || '';
        if(nome_!=''){
        let score_ =  localStorage.getItem('score'); // Defina a pontuação aqui conforme necessário
        document.getElementById('nome').textContent = "Olá " + nome_;
        document.getElementById('score').textContent = "Sua pontuação é " + score_ + "!";
        }

    
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const login = loginForm.elements['login'].value;
        const senha_login = loginForm.elements['senha_login'].value;

        const lista_dados = JSON.parse(localStorage.getItem('pessoa')) || [];
        const usuarioEncontrado = lista_dados.find(user => user.cpf === login && user.senha === senha_login);
        
        if (usuarioEncontrado) {
            alert('Login bem-sucedido!');
            const capturar=lista_dados.filter(a=>{return a.cpf==login})
            if(capturar.length!=0){
                console.log("verificando veracidade")
                let score = capturar[0].score
                localStorage.setItem('score',score)
                let nome = capturar[0].nome
                localStorage.setItem('nome',nome)
                let cpf = capturar[0].cpf
                localStorage.setItem('cpf',cpf)
                
            }  
            // Atualiza cpf_ para '2' após o login bem-sucedido
            
            // Redirecionar o usuário para outra página ou fazer qualquer outra ação necessária
        } else {
            alert('Login ou senha incorretos.');
        }

        loginForm.reset();
    });
});
