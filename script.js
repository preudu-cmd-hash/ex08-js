// selecionar elementos
const input = document.getElementById('tarefaInput');
const btn = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');

btn.addEventListener('click', () => {
    const texto = input.value.trim()
    if(texto == ""){
        alert('digite uma tarefa')
        return
    }

    // Criar um novo <li> com o value -> texto
    const item = document.createElement('li');
    item.textContent = texto;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'remover';
    btnRemover.style.marginLeft = '8px';
    btnRemover.addEventListener('click', () => {
        lista.removeChild(item);
    })
    item.appendChild(btnRemover);
    lista.appendChild(item);

    input.value = '';
})