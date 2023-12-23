const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "TASKS - ADM",
        description: "Listagem de tarefas com data/tempo",
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "User",
            description: "Endpoints",
        },
        {
            name: "Tasks",
            description: "Endpoints",
        },
        {
            name: "Login",
            description: "Endpoints",
        },
    ],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header", // can be 'header', 'query' or 'cookie'
            name: "Authorization", // name of the header, query parameter or cookie
            description: "Some description...",
        },
    },
};

const outputFile = "./src/swagger-output.json";

const routes = ["./src/routes/index.ts"];

swaggerAutogen(outputFile, routes, doc).then(() => {
    require("./src/server.ts");
});

