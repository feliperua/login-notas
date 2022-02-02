const express=require('express')
const router=express.Router()
const User = require('../models/Users')
const passport = require('passport')

router.get('/',(req,res)=>{
    res.send('user')
})

router.get('/singin',(req,res)=>{
    res.render('users/singin')
})

router.post('/singin', passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/singin',
    failureFlash: true
    //failureRedirect: '/users/singin',
    //failureFlash: true
}))

router.get('/singup',(req,res)=>{
     res.render('users/singup')
})

router.post('/singup',async (req,res)=>{
    
    const {name, email, password, confirm_password}=req.body
    const errors= []
    if(name<=0){
        errors.push({text:'El nombre esta vacio'})
    }
    if(password!=confirm_password){
        errors.push({text:'password no coinciden'})
    }
    if(password.length<4){
        errors.push({text:'Las contraseñas deben de tener mas de 4 caracteres'})
    }
    if(errors.length>0){
        console.log("Hay errores")
        res.render('users/singup',{errors, name, email, password, confirm_password})
    }else{
     const emailUser = await User.findOne({email:email})
     if(emailUser){
         req.flash('error_msg','El email ya esta en uso')
         console.log('entrando')
         res.redirect('/users/singup')
     }
     const newUser=new User({name, email, password})
     newUser.password= await newUser.encriptarPassword(password)
     await newUser.save()
     req.flash('success_msg','Estan registrado')
     res.redirect('/users/singin')
    }


    
})
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports=router