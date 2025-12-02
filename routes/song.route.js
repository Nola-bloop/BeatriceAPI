import express from "express"
import controller from "../controllers/song.controller.js"

const router = express.Router();

// ?name&url&length&playlistId
router.post("/", (req, res) => {
  controller.Create(req, res)
});

// /single/:id
router.get("/single/:id", (req, res) => {
  controller.ReadId(req, res)
});

// /by-playlist/:id
router.get("/by-playlist/:id", (req, res) => {
  controller.ReadId(req, res)
});

// ?id
router.delete("/", (req, res) => {
  controller.Delete(req, res)
});

export default router; 