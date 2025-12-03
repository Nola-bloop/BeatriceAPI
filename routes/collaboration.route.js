import express from "express"
import controller from "../controllers/collaboration.controller.js"

const router = express.Router();

// ?name&url&playlistId
router.post("/", (req, res) => {
  try{
    controller.Create(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json(error:e)
  }
});

// /collaborator/:id
router.get("/collaborator/:id", (req, res) => {
  try{
    controller.ReadByCollaborator(req).then((j)=>{
      res.json(j)
    })
  }catch(e){
    res.json(error:e)
  }
});

// /playlist/:id
router.get("/playlist/:id", (req, res) => {
  try{
    controller.ReadByPlaylist(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json(error:e)
  }
});

export default router;