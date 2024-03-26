import express from "express";

import {
    deleteUserId,
    updateUserId,
    getUserEmail,
    getUserById,
    getUsers,
    createUser,
} from "../modules/users/controllers";
import authMiddleware from "../middlewares/authMiddleware";

const usersRoutes = express.Router();

usersRoutes.use(authMiddleware("sac"));
usersRoutes.post("/", createUser);

usersRoutes.get("/", getUsers);

usersRoutes.get("/id/:id_users", getUserById);

usersRoutes.get("/email/:email_users", getUserEmail);

usersRoutes.put("/:id_users", updateUserId);

usersRoutes.delete("/:id_users", deleteUserId);

export { usersRoutes };

