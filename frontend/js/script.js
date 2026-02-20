const API = "http://localhost:3000/products";


// ================= LISTAR =================
if (document.getElementById("produtos")) {

  fetch(API)
    .then(res => res.json())
    .then(produtos => {

      const div = document.getElementById("produtos");
      div.innerHTML = "";

      produtos.forEach(produto => {

        div.innerHTML += `
          <div style="margin-bottom:15px; padding:10px; border:1px solid #ccc; border-radius:8px;">

            <strong>${produto.nome}</strong><br>
            Preço: R$ ${produto.preco}<br><br>

            <a href="detalhes.html?id=${produto.id}">
              Ver detalhes
            </a>

            <br><br>

            <button onclick="excluirProduto(${produto.id})">
              Excluir
            </button>

          </div>
        `;
      });

    });

}


// ================= CADASTRAR =================
if (document.getElementById("formProduto")) {

  document
    .getElementById("formProduto")
    .addEventListener("submit", async e => {

      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const preco = document.getElementById("preco").value;
      const descricao = document.getElementById("descricao").value;

      await fetch(API, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          nome,
          preco,
          descricao
        })

      });

      alert("Produto cadastrado com sucesso!");

      window.location.href = "index.html";

    });

}


// ================= DETALHES =================
if (document.getElementById("detalhes")) {

  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(produto => {

      document.getElementById("detalhes").innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Preço:</strong> R$ ${produto.preco}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
      `;

    });

}


// ================= EXCLUIR =================
async function excluirProduto(id) {

  const confirmar = confirm("Tem certeza que deseja excluir este produto?");

  if (!confirmar) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  alert("Produto excluído com sucesso!");

  location.reload();
}