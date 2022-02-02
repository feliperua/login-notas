const express= require('express')
const router=express.Router()
const {isAthenticated} = require('../helpers/auth')

const Note=require('../models/Note')

router.get('/add',isAthenticated,(req,res)=>{
    res.render('notes/new-note')
})

router.post('/new-note',isAthenticated, async (req,res)=>{//async significa procesos asincronos
    const { title, description }=req.body
    const errors=[]
    if(!title){
        errors.push({text:'please write a title'})
    }
    if (!description){
        errors.push({text:'please write a description'})
    }
    //length: longitud del texto
    if(errors.length > 0){
        res.render('notes/new-note',{
            errors,
            title,
            description
        })
    }else{
     const newNote=new Note({title,description})
     newNote.user = req.user.id
     await newNote.save()//.save guarda los datos en la bd, await espera hasta que tome los datos para continuar con el código
     req.flash('success_msg','Note Added Successfully')
     res.redirect('/notes') 
    }

})
router.get('/',isAthenticated,async(req,res)=>{
    const notes=await Note.find({user: req.user.id}).lean().sort({date:'desc'})
    //console.log(notes)
    res.render('notes/all-notes',{notes})

})

router.get('/edit/:id', isAthenticated, async(req,res)=>{
    const note=await Note.findById(req.params.id).lean()
    res.render("notes/edit-note",{note})
})
router.put('/edit-note/:id',isAthenticated, async(req,res)=>{
    const {title,description}=req.body
    await Note.findByIdAndUpdate(req.params.id,{title,description})
    req.flash('success_msg','Nota actualizada sactifactoriamente')
    res.redirect('/notes')
})
router.delete('/delete/:id',isAthenticated, async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg','Nota eliminada sactifactoriamente')
    res.redirect('/notes')
})
module.exports=router