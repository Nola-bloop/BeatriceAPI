import express from "express"
import controller from "../controllers/user.controller.js"

const router = express.Router();

// ?userId
router.post("", (req, res) => {
  controller.Create(req, res)
});

// /:id
router.get("/:id", (req, res) => {
  controller.ReadUserId(req, res)
});

export default router;