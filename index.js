const inputNome = document.getElementById("inputNome");
const buttonAdd = document.getElementById("buttonAdd");
const listAlunos = document.getElementById("listAlunos");
const inputEmailResponsavel = document.getElementById("inputEmailResponsavel");
const inputTelefoneResponsavel = document.getElementById("inputTelefoneResponsavel");
const inputDataNascimento = document.getElementById("inputDataNascimento");
const inputCPF = document.getElementById("inputCPF");
const popoutListAlunos = document.getElementById("popoutListAlunos");
const viewList = document.getElementById("viewList");
const close = document.getElementById("close");
const alunosArray = [];

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const calcularDigito = (cpf, peso) => {
        let soma = 0;
        for (let i = 0; i < peso - 1; i++) {
            soma += parseInt(cpf.charAt(i)) * (peso - i);
        }
        let digito = (soma * 10) % 11;
        return digito === 10 ? 0 : digito;
    };

    const primeiroDigito = calcularDigito(cpf, 10);
    const segundoDigito = calcularDigito(cpf, 11);

    return primeiroDigito === parseInt(cpf.charAt(9)) && segundoDigito === parseInt(cpf.charAt(10));
}

// Função para validar o email
function validarEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

// Função para validar o telefone (11 dígitos)
function validarTelefone(telefone) {
    const regex = /^\d{11}$/;
    return regex.test(telefone);
}

// Função para validar a idade mínima de 5 anos
function validarDataNascimento(data) {
    const hoje = new Date();
    const dataNasc = new Date(data);
    const idade = hoje.getFullYear() - dataNasc.getFullYear();
    return idade >= 5;
}

function cpfJaExiste(cpf) {
    return alunosArray.some(aluno => aluno.cpfAluno === cpf);
}

class Alunos {
    constructor(nomeAluno, emailResponsavel, telefoneResponsavel, dataNascimento, cpfAluno) {
        this.nomeAluno = nomeAluno;
        this.emailResponsavel = emailResponsavel;
        this.telefoneResponsavel = telefoneResponsavel;
        this.dataNascimento = dataNascimento;
        this.cpfAluno = cpfAluno;
        this.alunoSection = null;
    }

    exibirAluno() {
        this.alunoSection = document.createElement("section");
        this.alunoSection.classList.add("alunoSection");

        this.alunoSection.innerHTML = `
            <h2>Informações do Aluno</h2>
            <p class="nomeAluno">Nome do aluno: ${this.nomeAluno}</p>
            <p class="nomeEmailResponsavel">Email do responsável: ${this.emailResponsavel}</p>
            <p class="nomeTelefoneResponsavel">Telefone do responsável: ${this.telefoneResponsavel}</p>
            <p class="dataNascimento">Data nascimento do aluno: ${this.formatarData(this.dataNascimento)}</p>
            <p class="cpfAluno">CPF do aluno: ${this.cpfAluno}</p>

            <button class="edit">Editar</button>
            <button class="remove">Remover</button>
        `;

        this.alunoSection.querySelector(".edit").addEventListener("click", () => this.editarAluno());
        this.alunoSection.querySelector(".remove").addEventListener("click", () => this.removerAluno());


        listAlunos.appendChild(this.alunoSection);
    }

    editarAluno() {
        const novoNome = prompt("Digite o novo nome do aluno:", this.nomeAluno);
        const novoEmailResponsavel = prompt("Digite o novo email do responsável:", this.emailResponsavel);
        const novoTelefoneResponsavel = prompt("Digite o novo número do responsávelL:", this.telefoneResponsavel);

        if (novoNome && novoEmailResponsavel && novoTelefoneResponsavel) {
            this.nomeAluno = novoNome;
            this.emailResponsavel = novoEmailResponsavel;
            this.telefoneResponsavel = novoTelefoneResponsavel;
            this.atualizarExibicao();
        }
    }

    atualizarExibicao() {
        if (this.alunoSection) {
            const nomeElement = this.alunoSection.querySelector(".nomeAluno");
            nomeElement.textContent = `Nome do aluno: ${this.nomeAluno}`;
            const emailElement = this.alunoSection.querySelector(".nomeEmailResponsavel");
            emailElement.textContent = `Email do responsável: ${this.emailResponsavel}`;
            const telefoneElement = this.alunoSection.querySelector(".nomeTelefoneResponsavel");
            telefoneElement.textContent = `Telefone do responsável: ${this.telefoneResponsavel}`;
        }
    }

    removerAluno() {
        if (this.alunoSection) {
            listAlunos.removeChild(this.alunoSection);
        }
    }

    formatarData(data) {
        const [ano, mes, dia] = data.split("-");
        return `${dia}-${mes}-${ano}`;
    }
}

buttonAdd.addEventListener("click", () => {
    const nomeAluno = inputNome.value;
    const emailDoResponsavel = inputEmailResponsavel.value;
    const telefoneDoResponsavel = inputTelefoneResponsavel.value;
    const dataNascimentoDoAluno = inputDataNascimento.value;
    const cpfDoAluno = inputCPF.value;

    if (!nomeAluno || !emailDoResponsavel || !telefoneDoResponsavel || !dataNascimentoDoAluno || !cpfDoAluno) {
        mostrarErro("❗ Por favor, preencha todos os campos ❗");
        return;
    }

    if (!validarCPF(cpfDoAluno)) {
        mostrarErro("❗ CPF inválido ❗");
        return;
    }

    if (cpfJaExiste(cpfDoAluno)) {
        mostrarErro("Esse CPF já foi cadastrado.");
        return;
    }

    if (!validarEmail(emailDoResponsavel)) {
        mostrarErro("❗ Email do responsável inválido ❗");
        return;
    }

    if (!validarTelefone(telefoneDoResponsavel)) {
        mostrarErro("❗ Telefone do responsável inválido. Insira um número com 11 dígitos ❗");
        return;
    }

    if (!validarDataNascimento(dataNascimentoDoAluno)) {
        mostrarErro("❗ Data de nascimento inválida. O aluno deve ter pelo menos 5 anos ❗");
        return;
    }

    listAlunos.style = "display: flex";

    if (nomeAluno && emailDoResponsavel && telefoneDoResponsavel && dataNascimentoDoAluno && cpfDoAluno) {
        const novoAluno = new Alunos(nomeAluno, emailDoResponsavel, telefoneDoResponsavel, dataNascimentoDoAluno, cpfDoAluno);
        alunosArray.push(novoAluno);

        novoAluno.exibirAluno();

        inputNome.value = "";
        inputEmailResponsavel.value = "";
        inputTelefoneResponsavel.value = "";
        inputDataNascimento.value = "";
        inputCPF.value = "";
    }
});

viewList.addEventListener("click", () => {
    popoutListAlunos.style = "display: flex";
})

close.addEventListener("click", () => {
    popoutListAlunos.style = "display: none";
})

function mostrarErro(mensagem) {
    const popOut = document.getElementById("errorPopOut");
    const errorMessage = document.getElementById("errorMessage");
    const progressBar = document.querySelector(".progress-bar");

    // Define a mensagem e exibe o pop-out
    errorMessage.textContent = mensagem;
    popOut.classList.remove("hidden");
    popOut.classList.add("show");

    // Reinicia a animação da barra de progresso
    progressBar.style.animation = "none";
    requestAnimationFrame(() => {
        progressBar.style.animation = "";
        progressBar.style.animation = "progress 3s linear forwards";
    });

    // Oculta o pop-out após 3 segundos
    setTimeout(() => {
        popOut.classList.remove("show");
        setTimeout(() => {
            popOut.classList.add("hidden");
        }, 300); // Espera a transição terminar antes de ocultar completamente
    }, 3000);
}