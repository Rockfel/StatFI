import { Router } from "express";
import utilisateurRoutes from "./utilisteurs.routes";
import familleImpactRoutes from "./fi.routes";
import reunionRoutes from "./reunion.routes";
import participationRoutes from "./participation.routes";
import inviteRoutes from "./invite.routes";
import roleRoutes from "./role.routes";
import utilisateurRoleRoutes from "./utilisateurRole.routes";                            
import zoneRoutes from "./zone.routes";

const router = Router();

router.use("/v1/utilisateurs", utilisateurRoutes);
router.use("/v1/familles", familleImpactRoutes);
router.use("/v1/reunions", reunionRoutes);
router.use("/v1/participations", participationRoutes);
router.use("/v1/invites", inviteRoutes);
router.use("/v1/roles", roleRoutes);
router.use("/v1/utilisateur-roles", utilisateurRoleRoutes);
router.use("/v1/zones", zoneRoutes);

export default router;
