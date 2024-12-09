import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import loadEnvCongifMongoDB from "./config/dotenv.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import routes from "./routes/index";

dotenv.config();

const app = express();

loadEnvCongifMongoDB();
connectDB();

app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});