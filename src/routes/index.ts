import { Router } from "express";

import { sessionRoutes } from "./session.routes";
import { usersRoutes } from "./user.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);

export { router };
