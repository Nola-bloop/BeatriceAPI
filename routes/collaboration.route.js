import express from "express"
import controller from "../controllers/collaboration.controller.js"

const router = express.Router();

// ?userId&collaborator&playlistId
router.post("/", (req, res) => {
  try{
    controller.Create(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /collaborator/:id
router.get("/collaborator/:id", (req, res) => {
  try{
    controller.ReadByCollaborator(req).then((j)=>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /playlist/:id
router.get("/playlist/:id", (req, res) => {
  try{
    controller.ReadByPlaylist(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// ?userId&collaborator&playlistId
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