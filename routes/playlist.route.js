import express from "express"
import controller from "../controllers/playlist.controller.js"

const router = express.Router();

// ?name&userId
router.post("/", (req, res) => {
  controller.Create(req).then((j) =>{
    res.json(j)
  })
});

// /user/:userId
router.get("/user/:userId", (req, res) => {
  controller.ReadUser(req).then((j) =>{
    res.json(j)
  })
});

// /id/:id
router.get("/id/:id", (req, res) => {
  controller.ReadId(req).then((j) =>{
    res.json(j)
  })
});

// ?userId&id[&name][&author]
router.put("/", (req, res) => {
  controller.Update(req).then((j) =>{
    res.json(j)
  })
});

// ?userId&id
router.delete("/", (req, res) => {
  controller.Delete(req).then((j) =>{
    res.json(j)
  })
});

export default router;