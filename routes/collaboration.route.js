import express from "express"
import controller from "../controllers/collaboration.controller.js"

const router = express.Router();

// ?name&url&playlistId
router.post("/", (req, res) => {
  controller.Create(req).then((j) =>{
    res.json(j)
  })
});

// /collaborator/:id
router.get("/collaborator/:id", (req, res) => {
  controller.ReadByCollaborator(req).then((j)=>{
    res.json(j)
  })
});

// /playlist/:id
router.get("/playlist/:id", (req, res) => {
  controller.ReadByPlaylist(req).then((j) =>{
    res.json(j)
  })
});

export default router;