import { Router } from "express";
import { db } from "../db.js";

const router = Router();

// Mostrar produtos
router.get("/products", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM produtos_lorenamendes");
  res.json(rows);
});

// Cadastrar produto
router.post("/products", async (req, res) => {
  const { nome, preco, descricao } = req.body;
  await db.query(
    "INSERT INTO produtos_lorenamendes (nome, preco, descricao) VALUES (?, ?, ?)",
    [nome, preco, descricao]
  );
  res.status(201).json({ message: "Produto cadastrado!" });
});

export default router;
