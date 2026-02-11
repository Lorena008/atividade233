const API = "http://localhost:3000/products";

// ================= LISTAR =================
if (document.getElementById("produtos")) {
  fetch(API)
    .then(res => res.json())
    .then(produtos => {
      const div = document.getElementById("produtos");
      produtos.forEach(p => {
        div.innerHTML += `
          <div>
            <strong>${p.nome}</strong><br>
            R$ ${p.preco}<br>
            <a href="detalhes.html?id=${p.id}">Ver detalhes</a>
          </div>
        `;
      });
    });
}

// ================= CADASTRAR =================
if (document.getElementById("formProduto")) {
  formProduto.addEventListener("submit", async e => {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome.value,
        preco: preco.value,
        descricao: descricao.value
      })
    });

    alert("Produto cadastrado!");
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
      const div = document.getElementById("detalhes");
      div.innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Preço:</strong> R$ ${produto.preco}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
      `;
    });
}
