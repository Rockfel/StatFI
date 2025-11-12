import { Request, Response } from "express";
import prisma from "../config/db.js";

export async function list(req: Request, res: Response) {
  const data = await prisma.zone.findMany({
    include: {
      // responsable_zone_id -> utilisateur
      utilisateur_zone_responsable_zone_idToutilisateur: true,
      famille_impact: true, // 1:N
    },
  });
  res.json(data);
}

export async function get(req: Request, res: Response) {
  const id = Number(req.params.id);
  const row = await prisma.zone.findUnique({
    where: { id },
    include: { utilisateur_zone_responsable_zone_idToutilisateur: true, famille_impact: true },
  });
  if (!row) return res.status(404).json({ error: "Non trouvé" });
  res.json(row);
}

export async function create(req: Request, res: Response) {
  const created = await prisma.zone.create({ data: req.body });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = await prisma.zone.update({ where: { id }, data: req.body });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.zone.delete({ where: { id } });
  res.status(204).send();
}
