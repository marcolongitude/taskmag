import { Router } from "express";

import { sessionRoutes } from "./session.routes";
import { usersRoutes } from "./user.routes";
import { tasksRoutes } from "./tasks.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);
router.use("/tasks", tasksRoutes);

export { router };

