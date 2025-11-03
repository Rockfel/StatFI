import express from "express";

const app = express();
app.use(express.json());

// Une route de test
app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Ça tourne ✅" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API démarrée: http://localhost:${PORT}/health`);
});
