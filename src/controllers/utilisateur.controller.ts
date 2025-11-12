import { Request, Response } from "express";
import prisma from "../config/db.js";

export async function list(req: Request, res: Response) {
  const data = await prisma.utilisateur.findMany({
    include: {
      // relations FK: zone, famille_impact (fi) via fi_id
      // et lien M:N via table utilisateur_role -> role
      zone_utilisateur_zone_idTozone: true,
      famille_impact: true,
      utilisateur_role: { include: { role: true } },
    },
  });
  res.json(data);
}

export async function get(req: Request, res: Response) {
  const id = Number(req.params.id);
  const row = await prisma.utilisateur.findUnique({
    where: { id },
    include: {
      zone_utilisateur_zone_idTozone: true,
      famille_impact: true,
      utilisateur_role: { include: { role: true } },
    },
  });
  if (!row) return res.status(404).json({ error: "Non trouvé" });
  res.json(row);
}

export async function create(req: Request, res: Response) {
  try {
    const created = await prisma.utilisateur.create({ data: req.body });
    res.status(201).json(created);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const updated = await prisma.utilisateur.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.utilisateur.delete({ where: { id } });
  res.status(204).send();
}
