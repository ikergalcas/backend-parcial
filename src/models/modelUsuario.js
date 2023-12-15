import mongoose from 'mongoose'

const entitySchema = new mongoose.Schema({
    foto: {
        type: String,
        default: "http://res.cloudinary.com/dten77l85/image/upload/v1701645989/hfxempzbqlkawdekvuxy.jpg"
    },
    correo: {
        type:String  
    },
    ubicacion: {
        type: String
    }


},{ versionKey: false });

export default mongoose.model('entidades', entitySchema)