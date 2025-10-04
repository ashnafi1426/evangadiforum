const express=require("express")
const router=express.Router();
router.get("/",(req,res)=>{
   res.send("Welcome");
})
//register rout
router.post("/api/answers/register",(req,res)=>{
    res.send("register user")
})
router.post("/api/answers/login",(req,res)=>{
    res.send("login user")
})
router.get("/api/answers/check",(req,res)=>{
    res.send("check user")
})
module.exports=router;
