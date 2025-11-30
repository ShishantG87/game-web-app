
import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: "Failed to create game" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { platform } = req.query; 
    const filter = {};

    if (platform) {
      filter.platforms = platform;
    }

    const games = await Game.find(filter).populate("platforms");
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

export default router;
