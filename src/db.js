import mongoose from 'mongoose' 

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://useradmin3:adminadmin@ingweb.xdloocr.mongodb.net/Parcial3')
        console.log("Conexión establecida")        
    } catch (error) {
        console.log(error)
    }
};

