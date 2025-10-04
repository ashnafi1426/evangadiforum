const express=require("express")
const router=express.Router();
router.get("/",(req,res)=>{
   res.send("Welcome");
})
//register rout
router.post("/api/question/register",(req,res)=>{
    res.send("register user")
})
router.post("/api/question/login",(req,res)=>{
    res.send("login user")
})
router.get("/api/question/check",(req,res)=>{
    res.send("check user")
})
module.exports=router;
