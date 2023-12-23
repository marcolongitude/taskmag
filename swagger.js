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
            name: "Login",
            description: "Endpoints",
        },
    ],
    // securityDefinitions: {
    //     api_key: {
    //         type: "apiKey",
    //         name: "api_key",
    //         in: "header",
    //     },
    //     petstore_auth: {
    //         type: "oauth2",
    //         authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
    //         flow: "implicit",
    //         scopes: {
    //             read_pets: "read your pets",
    //             write_pets: "modify pets in your account",
    //         },
    //     },
    // },
};

const outputFile = "./src/swagger-output.json";

const routes = ["./src/routes/index.ts"];

swaggerAutogen(outputFile, routes, doc);

// swaggerAutogen()(outputFile, routes, doc);

