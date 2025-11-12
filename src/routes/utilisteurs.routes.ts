import { Router } from "express";

import * as ctrl from "../controllers/utilisateur.controller"

const r = Router();

r.get("/", ctrl.list);
r.get("/:id", ctrl.get);
r.post("/", ctrl.create);
r.put("/:id", ctrl.update);
r.delete("/:id", ctrl.remove);

export default r;
