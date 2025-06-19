// selecionar elementos
const input = document.getElementById('tarefaInput');
const btn = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');

function criarItemTarefa(texto) {
    const item = document.createElement('li');
    item.textContent = texto;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'remover';
    btnRemover.style.marginLeft = '8px';
    btnRemover.addEventListener('click', () => {
        lista.removeChild(item);
        salvarTarefas();
    });

    item.appendChild(btnRemover);
    lista.appendChild(item);
}

function salvarTarefas() {
    const tarefas = [];
    lista.querySelectorAll('li').forEach(itemDaLista => {
        tarefas.push(itemDaLista.firstChild.textContent.trim()); 
    });

    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('minhasTarefas');
    if (tarefasSalvas) {
        const tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(textoDaTarefa => {
            criarItemTarefa(textoDaTarefa);
        });
    }
}

btn.addEventListener('click', () => {
    const texto = input.value.trim();
    if (texto === "") {
        alert('Digite uma tarefa!');
        return;
    }
    criarItemTarefa(texto);
    input.value = '';
    salvarTarefas(); 
});
