import express from "express";

import {
    // deleteUserId,
    // updateUserId,
    // getUserEmail,
    // getUserById,
    // getUsers,
    getByUser,
    create,
    updateByUser,
    getAll,
} from "../modules/tasks/controllers";
import authMiddleware from "../middlewares/authMiddleware";
import { deleteByUser } from "../modules/tasks/controllers/deleteByUser";

const tasksRoutes = express.Router();

tasksRoutes.use(authMiddleware("sac"));

tasksRoutes.get("/", getAll);

tasksRoutes.get("/user/:id", getByUser);

tasksRoutes.put("/:idtasks", updateByUser);

tasksRoutes.delete("/:idtasks", deleteByUser);

tasksRoutes.post("/", create);

export { tasksRoutes };

