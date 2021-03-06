const express = require('express')

const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require ('express-session')
const flash = require('connect-flash')
const passport = require('passport')


const rutas=require('./routes/index.js')
const users=require('./routes/users.js')
const notes=require('./routes/notes.js')

//inicializaciones
const app=express()
require('./database.js')
require('./config/passport')
//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'))
//app.set('public',path.join(__dirname,'public'))
app.engine('.hbs', exphbs({
    defaultLayout:'main.hbs',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs'
}))
app.set('view engine','.hbs')

//files statics
//app.use(express.static('public'))
app.use(express.static(path.join(__dirname,'public')))
//midlewares

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(session({
    secret:'misecreto',
    resave:true,
    saveUninitialized:true
    
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
// Global variables
app.use((req, res, next)=> {
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    res.locals.error=req.flash('error')
    res.locals.user = req.user || null 
    next()
})

//Routes
app.use('/',rutas)
app.use('/users',users)
app.use('/notes',notes)

//servidor escuchando
app.listen(app.get('port'),()=>{
    console.log('servidor corriendo en puerto',app.get('port'))
})