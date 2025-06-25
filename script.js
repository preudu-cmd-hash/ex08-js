const input = document.getElementById('tarefaInput');
const btn = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');

function criarItemTarefa(texto, concluida = false) {
    const item = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.className = 'btnConcluir'
    checkbox.checked = concluida

    
    const spanTexto = document.createElement('span');
    spanTexto.textContent = texto;
    spanTexto.style.flex = '1';
    if (concluida) {
        spanTexto.classList.add('concluida');
    }
    
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'REMOVER';
    btnRemover.className = 'btn-remover';
    
    checkbox.addEventListener('click', () =>{
        spanTexto.classList.toggle('concluida');
        salvarTarefas();
    });

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
    item.appendChild(checkbox);
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
    lista.querySelectorAll('li').forEach(item => {
        const texto = item.querySelector('span').textContent.trim();
        const concluida = item.querySelector('span').classList.contains('concluida');
        tarefas.push({ texto, concluida });
    });

    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('minhasTarefas');
    if (tarefasSalvas) {
        const tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(tarefa => {
            criarItemTarefa(tarefa.texto, tarefa.concluida);
        });
    }
}

btn.addEventListener('click', () => {
    const texto = input.value.trim();
    if (texto === "") {
        alert('Digite uma tarefa!');
        return;
    }
    criarItemTarefa(texto, concluida = false);
    input.value = '';
    salvarTarefas(); 
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});

document.addEventListener('DOMContentLoaded', carregarTarefas);