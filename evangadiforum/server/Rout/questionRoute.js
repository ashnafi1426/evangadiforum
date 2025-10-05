const express=require("express")
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const { askQuestion, getAllQuestions, answerQuestion } = require("../controller/questionController");
//ask question
router.post("/ask",authMiddleware,askQuestion);
//get all question

router.get("/all",authMiddleware,getAllQuestions)

//answer a question
router.post("/answer/:questionId", authMiddleware, answerQuestion);


// router.get("/all-question",authMiddleware,(req,res)=>{
//    res.send("all question");
// })
module.exports=router;
