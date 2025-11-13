import express from "express";
import cors from "cors";


// middleware
import { requireDevKey } from "../middlewares/devKey.middleware.js";

//route
import routes from "../routes/index.js";

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());


// Route publique simple (pour vérifier que le serveur répond)
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Exemple de route protégée
app.get("/api/protected", requireDevKey, (req, res) => {
  res.json({ message: "Accès autorisé", user: (req as any).user });
});

// 👉 Anciennement : app.use("/api", routes);
// Ici on protège TOUTES les routes /api avec la clé dev
app.use("/api", requireDevKey, routes);

export default app;


