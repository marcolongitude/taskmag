import express from "express";

import { SessionController } from "../modules/session/controllers";

const sessionRoutes = express.Router();

sessionRoutes.post("/", SessionController);

export { sessionRoutes };
