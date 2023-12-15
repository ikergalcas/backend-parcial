import mongoose from 'mongoose'

const entitySchema = new mongoose.Schema({
    foto: {
        type: String,
        default: "http://res.cloudinary.com/dsvcyziih/image/upload/v1702631668/ecoaffylh8jxxumqbhki.webp"
    },
    correo: {
        type:String,
        unique: true
    },
    ubicacion: {
        type: String
    },
    nombre: {
        type: String
    }


},{ versionKey: false });

export default mongoose.model('usuarios', entitySchema)