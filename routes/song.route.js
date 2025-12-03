import express from "express"
import controller from "../controllers/song.controller.js"

const router = express.Router();

// ?name&url&length&playlistId
router.post("/", (req, res) => {
  controller.Create(req).then((j) =>{
    res.json(j)
  })
});

// /single/:id
router.get("/single/:id", (req, res) => {
  controller.ReadId(req).then((j) =>{
    res.json(j)
  })
});

// /by-playlist/:id
router.get("/by-playlist/:id", (req, res) => {
  controller.ReadPlaylistId(req).then((j) =>{
    res.json(j)
  })
});

// ?id
router.delete("/", (req, res) => {
  controller.Delete(req).then((j) =>{
    res.json(j)
  })
});

export default router; 