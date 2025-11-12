// Charge les variables d'environnement (.env)
import "dotenv/config";

// Import du client Prisma
import { PrismaClient } from '@prisma/client'

// Création d'une instance unique de Prisma
export const prisma = new PrismaClient();

// Connexion à la base au démarrage
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connecté à la base PostgreSQL via Prisma");
  } catch (error) {
    console.error("❌ Erreur de connexion Prisma :", error);
    process.exit(1); // Stoppe le serveur si la base est inaccessible
  }
}

// Exécute la connexion dès l'import du module
connectDB();

// Permet d’utiliser `prisma` ailleurs (ex: prisma.user.findMany())
export default prisma;
