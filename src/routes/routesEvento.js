import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
import dotenv from 'dotenv'
dotenv.config()

import { getAllEventos,getEventoID, createEvento, editEvento, deleteEvento, getUbiEvento} from "../controllers/eventoController.js"

const routerEvento = express.Router()

routerEvento.get('/', getAllEventos)
routerEvento.get('/:id', getEventoID)
routerEvento.post('/', createEvento)
routerEvento.put('/:id', editEvento)
routerEvento.get('/ubicacion/:id', getUbiEvento)
routerEvento.delete('/:id', deleteEvento)

const fileUpload = multer();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

routerEvento.post('/subirFoto', fileUpload.single('foto'), function (req, res, next) {
  let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (result, error) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
  };

  async function upload(req) {
    try {
      let result = await streamUpload(req);
      res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: result.url});
    } catch (error) {
      console.log('Error al subir la imagen: ', error)
      res.status(500).json({ message: 'Error al subir la imagen:', error});
    }
  }

  upload(req);
});

export default routerEvento