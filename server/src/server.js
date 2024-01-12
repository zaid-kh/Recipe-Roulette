import express from "express";
import dotenv from "dotenv/config";
const server = express();

// middlewares
server.use(express.json());

// routes

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Restaurant roulette: Server listening on port ${PORT}`);
});
