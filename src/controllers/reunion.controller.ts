import { Request, Response } from "express";
import prisma from "../config/db.js";

const TYPES = ["partage", "communion", "priere", "evangelisation"]; // conforme au CHECK
export async function list(req: Request, res: Response) {
  const data = await prisma.reunion.findMany({
    include: {
      famille_impact: true,   // fi_id -> famille_impact
      participation: true,
      invite: true,
    },
    orderBy: { date_reunion: "desc" },
  });
  res.json(data);
}

export async function get(req: Request, res: Response) {
  const id = Number(req.params.id);
  const row = await prisma.reunion.findUnique({
    where: { id },
    include: { famille_impact: true, participation: true, invite: true },
  });
  if (!row) return res.status(404).json({ error: "Non trouvé" });
  res.json(row);
}

export async function create(req: Request, res: Response) {
  const body = req.body;
  if (body?.type && !TYPES.includes(body.type)) {
    return res.status(400).json({ error: `type invalide. Attendu: ${TYPES.join(", ")}` });
  }
  const created = await prisma.reunion.create({ data: body });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const body = req.body;
  if (body?.type && !TYPES.includes(body.type)) {
    return res.status(400).json({ error: `type invalide. Attendu: ${TYPES.join(", ")}` });
  }
  const updated = await prisma.reunion.update({ where: { id }, data: body });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.reunion.delete({ where: { id } });
  res.status(204).send();
}
