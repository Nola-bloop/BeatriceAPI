import express from "express"
import controller from "../controllers/playlist.controller.js"

const router = express.Router();

// ?name&userId
router.post("/", (req, res) => {
  controller.Create(req, res)
});

// /user/:userId
router.get("/user/:userId", (req, res) => {
  controller.ReadUser(req, res)
});

// /id/:id
router.get("/id/:id", (req, res) => {
  controller.ReadId(req, res)
});

// ?userId&id&name&count&total_time&author
router.put("/", (req, res) => {
  controller.Create(req, res)
});

// ?userId&id
router.delete("/", (req, res) => {
  controller.Delete(req, res)
});

export default router;