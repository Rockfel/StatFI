import { Request, Response } from "express";
import prisma from "../config/db.js";

export async function list(req: Request, res: Response) {
  const data = await prisma.invite.findMany({ include: { reunion: true } });
  res.json(data);
}

export async function get(req: Request, res: Response) {
  const id = Number(req.params.id);
  const row = await prisma.invite.findUnique({ where: { id }, include: { reunion: true } });
  if (!row) return res.status(404).json({ error: "Non trouvé" });
  res.json(row);
}

export async function create(req: Request, res: Response) {
  const created = await prisma.invite.create({ data: req.body });
  res.status(201).json(created);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = await prisma.invite.update({ where: { id }, data: req.body });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.invite.delete({ where: { id } });
  res.status(204).send();
}
