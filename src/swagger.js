import swaggerAutogen from "swagger-autogen";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFile = path.join(__dirname, "swagger.json");
const endPointFiles = [path.join(__dirname, "routes/index.ts")];

const options = {
    openapi : "3.0.0",
    info : {
        title : "GrowthX backend task",
        description : "Automated swagger documentation for growthx backend task",
        version : "1.0.0",
    },
};

swaggerAutogen(outputFile, endPointFiles, options).then(() => {
    console.log("Swagger documentation generated successfully.");
});