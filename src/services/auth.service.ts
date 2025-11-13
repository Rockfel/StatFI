import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function registerUser(data: { email: string; password: string; nom: string; prenom?: string }) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.utilisateur.create({
    data: { ...data, mot_de_passe: hashedPassword },
  });
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.utilisateur.findUnique({ where: { email } });
  if (!user) throw new Error("Utilisateur introuvable");

  const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe);
  if (!isPasswordValid) throw new Error("Mot de passe incorrect");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return { token, user };
}
