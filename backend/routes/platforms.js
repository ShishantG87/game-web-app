
import express from "express";
import Platform from "../models/Platform.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const platform = await Platform.create({ name: req.body.name });
    res.json(platform);
  } catch (err) {
    res.status(500).json({ error: "Failed to create platform" });
  }
});

router.get("/", async (req, res) => {
  const platforms = await Platform.find();
  res.json(platforms);
});

export default router;
