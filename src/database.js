//hace llamado a la base de datos de mongos
const mongoose= require('mongoose')

//se conecta a la base de datos mongo
mongoose.connect('mongodb://localhost/notes-db-app',{
     useNewUrlParser:true
    
})
//se utiliza como una promesa de conexion a la base de datos el termino 
//.then=luego que significa luego y catch=captura
    .then(db=>console.log('Base de datos conectada')) 
    .catch(err=>console.log(err))