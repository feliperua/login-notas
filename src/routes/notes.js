const express=require('express')
const router=express.Router()

router.get('/add',(req,res)=>{
    res.render('notes/new-note')
})

router.post('/new-note',(req,res)=>{
    console.log(req.body)
    res.send("ok")

})
router.get('/',(req,res)=>{
    res.send('notes')
})

module.exports=router