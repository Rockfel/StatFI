import { Request, Response } from "express";
import prisma from "../config/db.js";

const STATUTS = ["present", "absent"]; // conforme au CHECK

export async function list(req: Request, res: Response) {
  const data = await prisma.participation.findMany({
    include: {
      reunion: true,
      utilisateur: true, // membre_id -> utilisateur
    },
  });
  res.json(data);
}

export async function get(req: Request, res: Response) {
  const id = Number(req.params.id);
  const row = await prisma.participation.findUnique({
    where: { id },
    include: { reunion: true, utilisateur: true },
  });
  if (!row) return res.status(404).json({ error: "Non trouvé" });
  res.json(row);
}

export async function create(req: Request, res: Response) {
  const body = req.body;
  if (body?.statut && !STATUTS.includes(body.statut)) {
    return res.status(400).json({ error: `statut invalide. Attendu: ${STATUTS.join(", ")}` });
  }
  try {
    const created = await prisma.participation.create({ data: body });
    res.status(201).json(created);
  } catch (e: any) {
    // Gestion de l'unicité (reunion_id + membre_id)
    if (e.code === "P2002") return res.status(409).json({ error: "Déjà enregistré pour cette réunion." });
    res.status(400).json({ error: e.message });
  }
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const body = req.body;
  if (body?.statut && !STATUTS.includes(body.statut)) {
    return res.status(400).json({ error: `statut invalide. Attendu: ${STATUTS.join(", ")}` });
  }
  try {
    const updated = await prisma.participation.update({ where: { id }, data: body });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.participation.delete({ where: { id } });
  res.status(204).send();
}
