import { Router } from "express";
import { query } from "../setup/db.js";

const router = Router();

// 🔹 GET all users
router.get("/", async (_req, res) => {
  const { rows } = await query("SELECT id, first_name, last_name, email, role, created_at FROM users ORDER BY id ASC");
  res.json(rows);
});

// 🔹 GET user by id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rows } = await query("SELECT * FROM users WHERE id = $1", [id]);
  if (!rows.length) return res.status(404).json({ message: "User not found" });
  res.json(rows[0]);
});

// 🔹 POST create new user
router.post("/", async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  if (!first_name || !last_name || !username || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const sql = `
      INSERT INTO users (first_name, last_name, username, email, password_hash)
      VALUES ($1, $2, $3, $4, crypt($5, gen_salt('bf')))
      RETURNING id, first_name, last_name, email, role, created_at;
    `;
    const { rows } = await query(sql, [first_name, last_name, username, email, password]);
    res.status(201).json(rows[0]);
  } catch (e: any) {
    if (e.code === "23505") return res.status(409).json({ message: "Email or username already exists" });
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 PUT update user
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { first_name, last_name, email, role, is_active } = req.body;

  const sql = `
    UPDATE users
    SET
      first_name = COALESCE($1, first_name),
      last_name  = COALESCE($2, last_name),
      email      = COALESCE($3, email),
      role       = COALESCE($4, role),
      is_active  = COALESCE($5, is_active)
    WHERE id = $6
    RETURNING *;
  `;

  const { rows } = await query(sql, [first_name, last_name, email, role, is_active, id]);
  if (!rows.length) return res.status(404).json({ message: "User not found" });
  res.json(rows[0]);
});

// 🔹 DELETE user
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rowCount } = await query("DELETE FROM users WHERE id = $1", [id]);
  if (!rowCount) return res.status(404).json({ message: "User not found" });
  res.status(204).send();
});

export default router;
