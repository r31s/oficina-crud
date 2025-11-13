// Função para carregar clientes 
async function carregarClientes() {
  const resposta = await fetch('/api/clientes');
  const clientes = await resposta.json();

  const tabela = document.querySelector('#tabelaClientes tbody');
  tabela.innerHTML = '';

  clientes.forEach(cliente => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cliente.cpf}</td>
      <td><input type="text" id="nome-${cliente.cpf}" value="${cliente.nome}"></td>
      <td><input type="email" id="email-${cliente.cpf}" value="${cliente.email || ''}"></td>
      <td><input type="text" id="telefone-${cliente.cpf}" value="${cliente.telefone || ''}"></td>
      <td>
        <button onclick="atualizarCliente('${cliente.cpf}')">Atualizar</button>
        <button onclick="excluirCliente('${cliente.cpf}')">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// Função para cadastrar cliente
document.querySelector('#formCliente').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = Object.fromEntries(new FormData(e.target).entries());

  const resposta = await fetch('/api/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  if (resposta.ok) {
    alert('Cliente cadastrado com sucesso!');
    e.target.reset();
    carregarClientes();
  } else {
    alert('Erro ao cadastrar cliente.');
  }
});

// Função para excluir cliente
async function excluirCliente(cpf) {
  if (!confirm('Deseja excluir este cliente?')) return;

  const resposta = await fetch(`/api/clientes/${cpf}`, { method: 'DELETE' });

  if (resposta.ok) {
    alert('Cliente excluído com sucesso!');
    carregarClientes();
  } else {
    alert('Erro ao excluir cliente.');
  }
}

// Função para atualizar cliente
async function atualizarCliente(cpf) {
  const nome = document.querySelector(`#nome-${cpf}`).value;
  const email = document.querySelector(`#email-${cpf}`).value;
  const telefone = document.querySelector(`#telefone-${cpf}`).value;

  try {
    const resposta = await fetch(`/api/clientes/${cpf}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone })
    });

    if (!resposta.ok) throw new Error('Erro ao atualizar cliente');
    alert('Cliente atualizado com sucesso!');
    carregarClientes(); // Atualiza a tabela
  } catch (err) {
    console.error(err);
    alert('Erro ao atualizar cliente');
  }
}

// Carregar tabela ao abrir a página
carregarClientes();
