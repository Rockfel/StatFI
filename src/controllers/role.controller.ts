import { Request, Response } from "express";
import prisma from "../config/db.js";

export async function list(req: Request, res: Response) {
  const data = await prisma.role.findMany({ include: { utilisateur_role: true } });
  res.json(data);
}

export async function get(req: Request, res: Response) {
  const id = Number(req.params.id);
  const row = await prisma.role.findUnique({ where: { id }, include: { utilisateur_role: true } });
  if (!row) return res.status(404).json({ error: "Non trouvé" });
  res.json(row);
}

export async function create(req: Request, res: Response) {
  const created = await prisma.role.create({ data: req.body });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = await prisma.role.update({ where: { id }, data: req.body });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.role.delete({ where: { id } });
  res.status(204).send();
}
