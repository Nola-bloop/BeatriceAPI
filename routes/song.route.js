import express from "express"
import controller from "../controllers/song.controller.js"

const router = express.Router();

// ?userId&url&playlistId
router.post("/", (req, res) => {
  try{
    controller.Create(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /single/:id
router.get("/single/:id", (req, res) => {
  try{
    controller.ReadId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /by-playlist/:id
router.get("/by-playlist/:id", (req, res) => {
  try{
    controller.ReadPlaylistId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// ?id
router.delete("/", (req, res) => {
  try{
    controller.Delete(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

export default router; 