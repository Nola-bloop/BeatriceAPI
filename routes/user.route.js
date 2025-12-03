import express from "express"
import controller from "../controllers/user.controller.js"

const router = express.Router();

// ?userId
router.post("", (req, res) => {
  try{
    controller.Create(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /:userId
router.get("/:id", (req, res) => {
  try{
    controller.ReadUserId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

export default router;