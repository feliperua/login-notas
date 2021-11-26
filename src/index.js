const express= require('express')

const path=require('path')
const exphbs=require('express-handlebars')
const methodOverride=require('method-override')
const session=require ('express-session')
const rutas=require('./routes/index.js')
const users=require('./routes/users.js')
const notes=require('./routes/notes.js')

//inicializaciones
const app=express()
require('./database.js')
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

//Routes
app.use('/',rutas)
app.use('/users',users)
app.use('/notes',notes)
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
//servidor escuchando
app.listen(app.get('port'),()=>{
    console.log('servidor corriendo en puerto',app.get('port'))
})