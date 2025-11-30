import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connect.js";
import gamesRouter from "./routes/games.js";
import platformsRouter from "./routes/platforms.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();


app.use("/api/games", gamesRouter);
app.use("/api/platforms", platformsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
