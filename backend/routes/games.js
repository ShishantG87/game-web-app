
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

    if (platform && platform !== "all") {
      filter.platforms = platform;
    }

    const games = await Game.find(filter).populate("platforms");
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("platforms");

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update game" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});

export default router;
