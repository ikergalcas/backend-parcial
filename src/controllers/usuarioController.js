import Usuario from "../models/modelUsuario.js"

export const getAllUsuarios = async (req, res) => {
    try {
        const data = await Usuario.find()

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de Usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener los Usuarios' });
    }
};

export const getUsuarioByCorreo = async (req, res) => {
    try {
        const { correo } = req.params;
        const Usuario = await Usuario.findOne({correo : correo})
        res.json(Usuario);

    } catch (error) {
        console.log('Error en la consulta de Usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Usuario' });
    }
}

export const createUsuario = async (req, res) => {
    try {
        const { usuario, ubicacion, correo } = req.body

        const newUsuario = new Usuario({
            ubicacion,
            correo,
            nombre,
        })

        await newUsuario.save()

        res.send(newUsuario._id)

    } catch (error) {
        console.log('Error en la consulta de Usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un Usuario' });
    }
}

export const editUsuario = async (req, res) => {
    try {
        const { correo } = req.params;
        const updateData = req.body; //la info modificada

        //buscamos user y modificamos
        const updatedUsuario = await Usuario.findOneAndUpdate({corre:correo}, updateData, {new: true});

        if(!updatedUsuario){
            return res.status(404).json({message : 'Usuario no encontrada' });
        }
        res.json(updatedUser);

    } catch (error) {
        console.log('Error en la consulta de Usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Usuario' });
    }
}


export const deleteUsuario = async (req, res) => {
    try {
        const { correo } = req.params;

        //buscamos user y borramos
        const searchedUsuario = await Usuario.findOneAndDelete({corre:correo});

        if(!searchedUsuario){
            return res.status(404).json({message : 'User no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log('Error en la consulta de Usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Usuario' });
    }
}