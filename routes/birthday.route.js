import express from "express"
import controller from "../controllers/birthday.controller.js"

const router = express.Router();

// ?userId&day&month&year
router.post("/", (req, res) => {
  try{
    controller.Create(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /
router.get("/", (req, res) => {
  try{
    controller.ReadId(req).then((j)=>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /id/:id
router.get("/id/:id", (req, res) => {
  try{
    controller.ReadId(req).then((j)=>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /user/:id
router.get("/user/:id", (req, res) => {
  try{
    controller.ReadUser(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /GetShowBool/?userId||birthdayId
router.get("/GetShowBool/", (req, res) => {
  try{
    controller.ReadUser(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// ?userId&birthdayId
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