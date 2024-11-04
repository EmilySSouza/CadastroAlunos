const inputNome = document.getElementById("inputNome");
const buttonAdd = document.getElementById("buttonAdd");
const listAlunos = document.getElementById("listAlunos");
const inputEmailResponsavel = document.getElementById("inputEmailResponsavel");
const inputTelefoneResponsavel = document.getElementById("inputTelefoneResponsavel");
const inputDataNascimento = document.getElementById("inputDataNascimento");
const alunosArray = [];

class Alunos {
    constructor(nomeAluno, emailResponsavel, telefoneResponsavel, dataNascimento) {
        this.nomeAluno = nomeAluno;
        this.emailResponsavel = emailResponsavel;
        this.telefoneResponsavel = telefoneResponsavel;
        this.dataNascimento = dataNascimento;
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

    if (nomeAluno && emailDoResponsavel && telefoneDoResponsavel && dataNascimentoDoAluno) {
        const novoAluno = new Alunos(nomeAluno, emailDoResponsavel, telefoneDoResponsavel, dataNascimentoDoAluno);
        alunosArray.push(novoAluno);

        novoAluno.exibirAluno();

        inputNome.value = "";
        inputEmailResponsavel.value = "";
        inputTelefoneResponsavel.value = "";
        inputDataNascimento.value = "";

        console.log(alunosArray);
    }
});