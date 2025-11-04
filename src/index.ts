import express from 'express';

const app = express();
app.use(express.json()); // pour lire le JSON envoyé par le client

// --- Données "en mémoire" (disparaissent quand tu arrêtes l'app) ---
type User = { id: number; name: string; email?: string };
const users: User[] = [
  { id: 1, name: 'Rockfel', email: 'rockfel@example.com' },
];
let nextId = 2;

// --- ROUTES ---

// 1) Lister tous les utilisateurs
app.get('/users', (_req, res) => {
  res.json(users);
});

// 2) Ajouter un utilisateur
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // vérif très simple
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Le champ "name" est obligatoire (string).' });
  }

  const newUser: User = { id: nextId++, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
});

// (bonus) Récupérer un utilisateur par id
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = users.find(u => u.id === id);
  if (!found) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.json(found);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API démarrée : http://localhost:${PORT}/users`);
});
