import express from "express"
import controller from "../controllers/playlist.controller.js"

const router = express.Router();

// ?name&userId
router.post("/", (req, res) => {
  try{
    controller.Create(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json(error:e)
  }
});

// /user/:userId
router.get("/user/:userId", (req, res) => {
  try{
    controller.ReadUser(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json(error:e)
  }
});

// /id/:id
router.get("/id/:id", (req, res) => {
  try{
    controller.ReadId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json(error:e)
  }
});

// ?userId&id[&name][&author]
router.put("/", (req, res) => {
  try{
    controller.Update(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json(error:e)
  }
});

// ?userId&id
router.delete("/", (req, res) => {
  try{
    controller.Delete(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json(error:e)
  }
});

export default router;