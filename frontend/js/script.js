const API = "http://localhost:3000/products";

// listar produtos
if (document.getElementById("produtos")) {
  fetch(API)
    .then(res => res.json())
    .then(produtos => {
      const div = document.getElementById("produtos");
      produtos.forEach(p => {
        div.innerHTML += `<p>${p.nome} - R$ ${p.preco}</p>`;
      });
    });
}

// cadastrar produto
if (document.getElementById("formProduto")) {
  document.getElementById("formProduto").addEventListener("submit", async e => {
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
