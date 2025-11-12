import { Router } from "express";
// Make sure the file exists at the specified path, or update the path if necessary
import * as ctrl from "../controllers/utilsateurRole.controller";
const r = Router();

r.get("/", ctrl.list);
r.post("/", ctrl.create);
r.delete("/", ctrl.remove); // suppression via composite key

export default r;
