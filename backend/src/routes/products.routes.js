import { Router } from "express";
import { db } from "../db.js";

const router = Router();

// listar todos
router.get("/products", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM produtos_lorenamendes");
  res.json(rows);
});

// buscar por id
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(
    "SELECT * FROM produtos_lorenamendes WHERE id = ?",
    [id]
  );
  res.json(rows[0]);
});

// cadastrar
router.post("/products", async (req, res) => {
  const { nome, preco, descricao } = req.body;
  await db.query(
    "INSERT INTO produtos_lorenamendes (nome, preco, descricao) VALUES (?, ?, ?)",
    [nome, preco, descricao]
  );
  res.status(201).json({ message: "Produto cadastrado!" });
});

export default router;
