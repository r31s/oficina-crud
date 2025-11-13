// Função para carregar carros
async function carregarCarros() {
  const resposta = await fetch('/api/carros');
  const carros = await resposta.json();

  const tabela = document.querySelector('#tabelaCarros tbody');
  tabela.innerHTML = '';

  carros.forEach(carro => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${carro.placa}</td>
      <td><input type="text" id="modelo-${carro.placa}" value="${carro.modelo || ''}"></td>
      <td><input type="text" id="marca-${carro.placa}" value="${carro.marca || ''}"></td>
      <td><input type="text" id="cpf-${carro.placa}" value="${carro.cpf_cliente || ''}"></td>
      <td>
        <button onclick="atualizarCarro('${carro.placa}')">Atualizar</button>
        <button onclick="excluirCarro('${carro.placa}')">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// Função para cadastrar carro
document.querySelector('#formCarro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = Object.fromEntries(new FormData(e.target).entries());

  const resposta = await fetch('/api/carros', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  if (resposta.ok) {
    alert('Carro cadastrado com sucesso!');
    e.target.reset();
    carregarCarros();
  } else {
    alert('Erro ao cadastrar carro.');
  }
});

// Função para excluir carro
async function excluirCarro(placa) {
  if (!confirm('Deseja excluir este carro?')) return;

  const resposta = await fetch(`/api/carros/${placa}`, { method: 'DELETE' });

  if (resposta.ok) {
    alert('Carro excluído com sucesso!');
    carregarCarros();
  } else {
    alert('Erro ao excluir carro.');
  }
}

// Função para atualizar carro
async function atualizarCarro(placa) {
  const modelo = document.querySelector(`#modelo-${placa}`).value;
  const marca = document.querySelector(`#marca-${placa}`).value;
  const cpf_cliente = document.querySelector(`#cpf-${placa}`).value;

  try {
    const resposta = await fetch(`/api/carros/${placa}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelo, marca, cpf_cliente })
    });

    if (!resposta.ok) throw new Error('Erro ao atualizar carro');
    alert('Carro atualizado com sucesso!');
    carregarCarros();
  } catch (err) {
    console.error(err);
    alert('Erro ao atualizar carro');
  }
}

// Carregar tabela ao abrir a página
carregarCarros();
