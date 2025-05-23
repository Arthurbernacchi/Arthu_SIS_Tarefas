const form = document.getElementById("form-tarefa");
const lista = document.getElementById("lista-tarefas");

// Carregar tarefas do banco
window.onload = () => {
  fetch('listar.php')
    .then(response => response.json())
    .then(tarefas => {
      tarefas.forEach(tarefa => {
        exibirTarefa(tarefa);
      });
    });
};

// Exibir tarefas na lista
function exibirTarefa(tarefa) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = `<strong>${tarefa.materia}:</strong> ${tarefa.titulo} – até ${tarefa.data_vencimento}`;
  li.appendChild(span);

  const btn = document.createElement("button");
  btn.textContent = "✔️ Concluir";
  btn.classList.add("concluir");
  btn.addEventListener("click", () => {
    concluirTarefa(tarefa.id);
    li.classList.toggle("concluida");
  });

  const btnDeletar = document.createElement("button");
  btnDeletar.textContent = "❌ Deletar";
  btnDeletar.classList.add("concluir");
  btnDeletar.addEventListener("click", () => {
    deletarTarefa(tarefa.id);
    li.remove();
  });

  li.appendChild(btn);
  li.appendChild(btnDeletar);
  lista.appendChild(li);
}

// Adicionar tarefa
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const data = document.getElementById("data").value;
  const materia = document.getElementById("materia").value;

  if (!titulo || !data || !materia) return;

  // Enviar tarefa para o PHP
  fetch('adicionar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `titulo=${titulo}&data=${data}&materia=${materia}`
  })
  .then(response => response.text())
  .then(() => {
    exibirTarefa({titulo, data_vencimento: data, materia});
    form.reset();
  });
});

// Concluir tarefa
function concluirTarefa(id) {
  fetch('concluir.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `id=${id}`
  })
  .then(response => response.text())
  .then(message => console.log(message));
}

// Deletar tarefa
function deletarTarefa(id) {
  fetch('deletar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `id=${id}`
  })
  .then(response => response.text())
  .then(message => console.log(message));
}
