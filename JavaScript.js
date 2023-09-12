var nomePessoa = "";
var nomeDono = "admin"; // Nome do dono da página
var senhaDono = "123"; // Senha do dono da página
var mensagens = [];

// Carregue as mensagens salvas no armazenamento local quando a página carregar
window.onload = function () {
    if (localStorage.getItem("mensagens")) {
        mensagens = JSON.parse(localStorage.getItem("mensagens"));
        atualizarChat();
    }
}

function enviarMensagem() {
    var nome = document.getElementById("nomeInput").value;
    var mensagem = document.getElementById("mensagemInput").value;

    if (nome.trim() !== "") {
        nomePessoa = nome;
    }

    var dataHora = obterDataHoraFormatada(); // Obtém data e hora formatadas
    var novaMensagem = dataHora + " - " + nomePessoa + ": " + mensagem;
    mensagens.push(novaMensagem);

    atualizarChat();

    // Salve as mensagens no armazenamento local
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    document.getElementById("mensagemInput").value = "";

    var batePapo = document.getElementById("batePapo");
    batePapo.scrollTop = batePapo.scrollHeight;
}

function obterDataHoraFormatada() {
    var data = new Date();
    var dia = data.getDate().toString().padStart(2, '0');
    var mes = (data.getMonth() + 1).toString().padStart(2, '0');
    var ano = data.getFullYear();
    var hora = data.getHours().toString().padStart(2, '0');
    var minutos = data.getMinutes().toString().padStart(2, '0');
    var segundos = data.getSeconds().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
}

function exibirPromptApagar() {
    var usuario = prompt("Digite o nome de usuário:");
    var senha = prompt("Digite a senha:");

    if (usuario === nomeDono && senha === senhaDono) {
        var confirmacao = confirm("Tem certeza de que deseja apagar todas as mensagens?");
        if (confirmacao) {
            limparChat();
        }
    } else {
        alert("Credenciais incorretas. Você não tem permissão para apagar as mensagens.");
    }
}

function apagarUltimaMensagem() {
    if (mensagens.length > 0) {
        mensagens.pop(); // Remove a última mensagem do array
        localStorage.setItem("mensagens", JSON.stringify(mensagens));
        atualizarChat();
    }
}


function limparChat() {
    mensagens = [];
    localStorage.removeItem("mensagens");
    atualizarChat();
}

function atualizarChat() {
    var batePapo = document.getElementById("batePapo");
    batePapo.innerHTML = mensagens.map(function (mensagem) {
        return mensagem + "<br><br>"; // Adicione <br> duplo após cada mensagem
    }).join('');
    batePapo.scrollTop = batePapo.scrollHeight;
}
