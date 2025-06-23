const input = document.getElementById('tarefaInput');
const btn = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');

function criarItemTarefa(texto) {
    const item = document.createElement('li');
    
    const spanTexto = document.createElement('span');
    spanTexto.textContent = texto;
    spanTexto.style.flex = '1';
    
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'REMOVER';
    btnRemover.className = 'btn-remover';
    
    btnRemover.addEventListener('click', () => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            lista.removeChild(item);
            salvarTarefas();
        }, 300);
    });

    item.appendChild(spanTexto);
    item.appendChild(btnRemover);
    lista.appendChild(item);
    
    item.style.opacity = '0';
    item.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'all 0.3s ease';
    }, 10);
}

function salvarTarefas() {
    const tarefas = [];
    lista.querySelectorAll('li span').forEach(span => {
        tarefas.push(span.textContent.trim()); 
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

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});

document.addEventListener('DOMContentLoaded', carregarTarefas);