import cors from "cors";
import express from "express";

import "express-async-errors";
import swaggerUi from "swagger-ui-express";

// import errorHandler from "./appError/error-handler.middleware";
import { router } from "./routes";
import swaggerFile from "./swagger-output.json";

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, {
        swaggerOptions: { persistAuthorization: true },
    })
);

// app.use(errorHandler);

app.listen(3000, () => console.log("Server is running on port 3000"));

