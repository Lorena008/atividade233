import { Router } from "express";
import { db } from "../db.js";

const router = Router();


// ================= LISTAR TODOS =================
router.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM produtos_lorenamendes"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
});


// ================= BUSCAR POR ID =================
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM produtos_lorenamendes WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});


// ================= CADASTRAR =================
router.post("/products", async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;

    await db.query(
      "INSERT INTO produtos_lorenamendes (nome, preco, descricao) VALUES (?, ?, ?)",
      [nome, preco, descricao]
    );

    res.json({ message: "Produto cadastrado com sucesso!" });

  } catch (error) {
    res.status(500).json(error);
  }
});


// ================= DELETE =================
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM produtos_lorenamendes WHERE id = ?",
      [id]
    );

    res.json({ message: "Produto excluído com sucesso!" });

  } catch (error) {
    res.status(500).json(error);
  }
});


export default router;