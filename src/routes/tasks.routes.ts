import express from "express";

import {
    getByUser,
    create,
    updateByUser,
    getAll,
} from "../modules/tasks/controllers";
import authMiddleware from "../middlewares/authMiddleware";
import { deleteByUser } from "../modules/tasks/controllers/deleteByUser";
import { updateStatusTasks } from "../modules/tasks/controllers/updateStatusTasks";
import { getByUserStatus } from "../modules/tasks/controllers/getByUserStatus";

const tasksRoutes = express.Router();

tasksRoutes.use(authMiddleware("sac"));
tasksRoutes.put("/status", updateStatusTasks);

tasksRoutes.get("/", getAll);
tasksRoutes.get("/user/:id/status/:status", getByUserStatus);
tasksRoutes.get("/user/:id", getByUser);

tasksRoutes.put("/:idtasks", updateByUser);

tasksRoutes.delete("/:idtasks", deleteByUser);

tasksRoutes.post("/", create);

export { tasksRoutes };

