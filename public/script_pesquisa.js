document.getElementById("btnPesquisar").addEventListener("click", pesquisar);

async function pesquisar() {
  const q = document.getElementById("campoPesquisa").value.trim();
  if (q === "") return alert("Digite algo para pesquisar!");

  const tabelaBody = document.querySelector("#tabelaResultados tbody");
  tabelaBody.innerHTML = "<tr><td colspan='4'>Carregando...</td></tr>";

  try {
    const [clientesRes, carrosRes] = await Promise.all([
      fetch(`/api/pesquisar/clientes?q=${q}`), // ✔️ CORRETA
      fetch(`/api/pesquisar?q=${q}`)           // ✔️ CORRETA
    ]);

    const clientes = await clientesRes.json();
    const carros = await carrosRes.json();

    tabelaBody.innerHTML = "";

    // Mostrar clientes
    clientes.forEach(cli => {
      tabelaBody.innerHTML += `
        <tr>
          <td>Cliente</td>
          <td>${cli.cpf}</td>
          <td>${cli.nome}</td>
          <td>${cli.email || "-"}</td>
        </tr>
      `;
    });

    // Mostrar carros
    carros.forEach(car => {
      tabelaBody.innerHTML += `
        <tr>
          <td>Carro</td>
          <td>${car.placa}</td>
          <td>${car.marca}</td>
          <td>${car.modelo}</td>
        </tr>
      `;
    });

    if (clientes.length === 0 && carros.length === 0) {
      tabelaBody.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado.</td></tr>";
    }

  } catch (error) {
    console.error(error);
    tabelaBody.innerHTML = "<tr><td colspan='4'>Erro ao pesquisar.</td></tr>";
  }
}
