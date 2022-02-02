const mongoose=require('mongoose')
const {Schema}=mongoose //guarda en una constante el esquema de mongos

const NoteSchema=new Schema({
    title:{type:String, require: true},
    description:{type:String, require: true},
    date: {type:Date, default: Date.now},//La propiedad Date.now ejecuta un dato por defecto si la persona no lo almacena
    user: {type: String}
})

module.exports=mongoose.model('Note',NoteSchema)//modelo de datos en mongos