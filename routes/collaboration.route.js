import express from "express"
import controller from "../controllers/collaboration.controller.js"

const router = express.Router();

// ?name&url&playlistId
router.post("/", (req, res) => {
  controller.Create(req, res)
});

// /collaborator/:id
router.get("/collaborator/:id", (req, res) => {
  controller.ReadByCollaborator(req, res)
});

// /playlist/:id
router.get("/playlist/:id", (req, res) => {
  controller.ReadByPlaylist(req, res)
});

export default router;