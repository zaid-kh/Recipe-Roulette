import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import { requestLogger } from "../middlewares/requestLogger.js";
import connectDB from "../config/db.js";
import errorHandler from "../middlewares/errorHandler.js";
import userRoutes from "../routes/user.routes.js";
import authRoutes from "../routes/auth.routes.js";

const server = express();
const PORT = process.env.PORT || 3000;

// middlewares
server.use(express.json());
server.use(requestLogger);
server.use(cors());
// routes
server.use("/api/users", userRoutes);
server.use("/api/auth", authRoutes);
// server.use("/api/recipes", recipeRoutes);

// default route
server.get("/", (req, res) => {
  res.send(`  Recipe Roulette: hello  `);
});

// error handler
server.use(errorHandler);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Restaurant roulette: Server listening on port ${PORT}`);
  });
});
