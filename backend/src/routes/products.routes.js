import { Router } from "express";
import { db } from "../db.js";

const router = Router();


// ================= LISTAR TODOS =================
router.get("/products", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM produtos_lorenamendes"
  );
  res.json(rows);
});


// ================= BUSCAR PRODUTO POR ID =================
router.get("/products/:id", async (req, res) => {

  const { id } = req.params;

  const [rows] = await db.query(
    "SELECT * FROM produtos_lorenamendes WHERE id = ?",
    [id]
  );

  res.json(rows[0]);

});


// ================= CADASTRAR =================
router.post("/products", async (req, res) => {

  const { nome, preco, descricao } = req.body;

  await db.query(
    "INSERT INTO produtos_lorenamendes (nome, preco, descricao) VALUES (?, ?, ?)",
    [nome, preco, descricao]
  );

  res.json({ message: "Produto cadastrado com sucesso!" });

});


// ================= ATUALIZAR PRODUTO =================
router.put("/products/:id", async (req, res) => {

  const { id } = req.params;
  const { nome, preco, descricao } = req.body;

  await db.query(
    "UPDATE produtos_lorenamendes SET nome = ?, preco = ?, descricao = ? WHERE id = ?",
    [nome, preco, descricao, id]
  );

  res.json({ message: "Produto atualizado com sucesso!" });

});


// ================= DELETAR =================
router.delete("/products/:id", async (req, res) => {

  const { id } = req.params;

  await db.query(
    "DELETE FROM produtos_lorenamendes WHERE id = ?",
    [id]
  );

  res.json({ message: "Produto excluído com sucesso!" });

});

export default router;