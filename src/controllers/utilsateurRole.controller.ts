import { Request, Response } from "express";
import prisma from "../config/db.js";

export async function list(req: Request, res: Response) {
  const data = await prisma.utilisateur_role.findMany({
    include: { utilisateur: true, role: true },
  });
  res.json(data);
}

export async function create(req: Request, res: Response) {
  // { utilisateur_id, role_id }
  try {
    const created = await prisma.utilisateur_role.create({ data: req.body });
    res.status(201).json(created);
  } catch (e: any) {
    if (e.code === "P2002") return res.status(409).json({ error: "Déjà associé." });
    res.status(400).json({ error: e.message });
  }
}

export async function remove(req: Request, res: Response) {
  // suppression par PK composite
  const { utilisateur_id, role_id } = req.body;
  await prisma.utilisateur_role.delete({ where: { utilisateur_id_role_id: { utilisateur_id, role_id } } });
  res.status(204).send();
}
