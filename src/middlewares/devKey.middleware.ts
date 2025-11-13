import { Request, Response, NextFunction } from "express";

export function requireDevKey(req: Request, res: Response, next: NextFunction) {
  // 1. Récupérer la clé envoyée par le client
  const apiKeyHeader = req.headers["x-api-key"];

  // 2. Vérifier que la clé serveur est bien définie
  const serverKey = process.env.DEV_API_KEY;
  if (!serverKey) {
    console.error("❌ DEV_API_KEY manquante dans le .env");
    return res.status(500).json({ message: "DEV_API_KEY manquante dans le serveur" });
  }

  // 3. Si aucune clé envoyée → refus
  if (!apiKeyHeader) {
    return res.status(401).json({ message: "Clé d'accès manquante (x-api-key)" });
  }

  // 4. Si la clé ne correspond pas → refus
  if (apiKeyHeader !== serverKey) {
    return res.status(401).json({ message: "Clé d'accès invalide" });
  }

  // 5. Tout est OK → on laisse passer
  next();
}
