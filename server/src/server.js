import express from "express";
import dotenv from "dotenv/config";
import { requestLogger } from "../middlewares/requestLogger.js";
const server = express();
const PORT = process.env.PORT || 3000;

// middlewares
server.use(express.json());
server.use(requestLogger);
// routes

server.get("/", (req, res) => {
  res.send(`  Recipe Roulette: hello  `);
});

server.listen(PORT, () => {
  console.log(`Restaurant roulette: Server listening on port ${PORT}`);
});
