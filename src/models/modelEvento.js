import mongoose from 'mongoose'

const eventoSchema = new mongoose.Schema({
    nombre: {
        type : String,
        required : true  
    },
    timestamp : {
        type: Date,
        required : true
    },
    lugar: {
        type: String,
        required : true
    },
    lat : {
        type : Number,
        default : 0.00
    },
    lon : {
        type : Number,
        default : 0.00
    },
    organizador : {
        type: String,
        required : true
    },
    imagen : {
        type: String,
        default: "http://res.cloudinary.com/dsvcyziih/image/upload/v1702658815/ieecrymqdjvptpxcjmfh.png"
    }


},{ versionKey: false });

export default mongoose.model('eventos', eventoSchema)