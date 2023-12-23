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

const tasksRoutes = express.Router();

tasksRoutes.use(authMiddleware("sac"));

tasksRoutes.get("/", getAll);

tasksRoutes.get("/id/:id_tasks", getByUser);

// tasksRoutes.get("/email/:email_users", getUserEmail);

tasksRoutes.put("/:idtasks", updateByUser);

// tasksRoutes.delete("/:id_users", deleteUserId);

tasksRoutes.post("/", create);

export { tasksRoutes };

