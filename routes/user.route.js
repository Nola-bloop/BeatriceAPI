import express from "express"
import controller from "../controllers/user.controller.js"

const router = express.Router();

// ?userId
router.post("", (req, res) => {
  controller.Create(req).then((j) =>{
    res.json(j)
  })
});

// /:userId
router.get("/:id", (req, res) => {
  controller.ReadUserId(req).then((j) =>{
    res.json(j)
  })
});

export default router;