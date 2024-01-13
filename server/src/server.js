import express from "express";
import dotenv from "dotenv/config";
const server = express();
const PORT = process.env.PORT || 3000;

// middlewares
server.use(express.json());

// routes

server.get("/", (req, res) => {
  res.send(`  Recipe Roulette: hello  `);
});

server.listen(PORT, () => {
  console.log(`Restaurant roulette: Server listening on port ${PORT}`);
});
