import express from "express";

import {
    deleteUserId,
    updateUserId,
    getUserEmail,
    getUserById,
    getUsers,
    createUser,
} from "../modules/users/controllers";

const usersRoutes = express.Router();

usersRoutes.get("/", getUsers);

usersRoutes.get("/id/:id_users", getUserById);

usersRoutes.get("/email/:email_users", getUserEmail);

usersRoutes.put("/:id_users", updateUserId);

usersRoutes.delete("/:id_users", deleteUserId);

usersRoutes.post("/", createUser);

export { usersRoutes };

