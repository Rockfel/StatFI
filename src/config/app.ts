import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "../users/users.routes.js";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/users", usersRouter);
