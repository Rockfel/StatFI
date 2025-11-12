import "dotenv/config";
import { prisma } from "./config/db.js";
import app from "./server.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Connecté à la base PostgreSQL via Prisma");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur de connexion à la base :", error);
    process.exit(1);
  }
}

startServer();
