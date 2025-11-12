import { Request, Response } from "express";
import prisma from "../config/db.js";

export async function list(req: Request, res: Response) {
  const data = await prisma.famille_impact.findMany({
    include: {
      zone: true,              // FK zone_id
      reunion: true,           // 1:N vers reunion
      utilisateur: true,       // 1:N vers utilisateur (fi_id)
    },
  });
  res.json(data);
}

export async function get(req: Request, res: Response) {
  const id = Number(req.params.id);
  const row = await prisma.famille_impact.findUnique({
    where: { id },
    include: { zone: true, reunion: true, utilisateur: true },
  });
  if (!row) return res.status(404).json({ error: "Non trouvé" });
  res.json(row);
}

export async function create(req: Request, res: Response) {
  const created = await prisma.famille_impact.create({ data: req.body });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = await prisma.famille_impact.update({ where: { id }, data: req.body });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.famille_impact.delete({ where: { id } });
  res.status(204).send();
}
