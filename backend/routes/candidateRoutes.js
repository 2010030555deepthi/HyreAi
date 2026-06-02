const express = require("express");
const router = express.Router();

const Candidate =
require("../models/Candidate");
router.post("/", async(req,res)=>{

 const candidate =
 new Candidate(req.body);

 await candidate.save();

 res.json(candidate);

});
router.get("/", async(req,res)=>{

 const data =
 await Candidate.find();

 res.json(data);

});
router.get("/:id", async(req,res)=>{

 const data =
 await Candidate.findById(req.params.id);

 res.json(data);

});
router.put("/:id", async(req,res)=>{

 const data =
 await Candidate.findByIdAndUpdate(
   req.params.id,
   req.body,
   {new:true}
 );

 res.json(data);

});
router.delete("/:id", async(req,res)=>{

 await Candidate.findByIdAndDelete(
   req.params.id
 );

 res.json({
   message:"Deleted"
 });

});
module.exports = router;
