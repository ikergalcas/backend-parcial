import Evento from "../models/modelEvento.js"

export const getAllEventos = async (req, res) => {
    try {
        const data = await Evento.find().sort({timestamp: -1})

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener los Eventos' });
    }
};

export const getEventoID = async (req, res) => {
    try {
        const { id } = req.params;
        const Evento = await Evento.findById(id);
        res.json(Evento);

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Evento' });
    }
}

export const createEvento = async (req, res) => {
    try {
        const { nombre, timestamp, lugar, lat, lon, organizador } = req.body


        const newEvento = new Evento({
            nombre,
            timestamp,
            lugar,
            lat,
            lon,
            organizador
        })

        await newEvento.save()

        res.send(newEvento._id)

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un Evento' });
    }
}

export const editEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada

        //buscamos user y modificamos
        const updatedEvento = await Evento.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedEvento){
            return res.status(404).json({message : 'Evento no encontrada' });
        }
        res.json(updatedEvento)

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Evento' });
    }
}


export const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedEvento = await Evento.findByIdAndDelete(id);

        if(!searchedEvento){
            return res.status(404).json({message : 'User no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log('Error en la consulta de Eventos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Evento' });
    }
}

export const getUbiEvento = async (req, res) => {
    try {
        const {id} = req.params;
        const evento = await Evento.findById(id);
        var lat, lon
        if(evento) {
            const locationName = evento.lugar;
            
            const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;
            
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                const firstResult = data[0];
                const lat = parseFloat(firstResult.lat);
                const lon = parseFloat(firstResult.lon);
                res.json({lat, lon});
                } else {
                    console.log("Ubicación no encontrada");
                }
            })
            .catch(error => {
                console.error("Error en la solicitud de geocodificación: " + error);
            });
        }
    } catch (error) {
        console.log('Error en la consulta de Eventos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener la localización' })
    }
};