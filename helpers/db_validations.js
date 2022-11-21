const Role = require('../models/role')
const Usuario = require('../models/usuario')


const rolValido = async(rol) => {

    if(!await Role.findOne({rol})){
        throw new Error(`El rol ${rol} no esta en la DB`)
    }
    
}


const emailEnUso = async(correo) => {
    
    // VALIDAR SI EL CORREO NO EXISTE
    if(await Usuario.findOne({correo})){
        throw new Error(`El correo ${correo} ya esta en uso`)
    }
}

const existeUsuarioById = async(id) => {
    
    // VALIDAR SI EL CORREO NO EXISTE
    if(!await Usuario.findById(id)){
        console.log("PAso por aca")
        throw new Error(`El id ${id} no existe`)
    }
}


module.exports = {
    rolValido,
    emailEnUso,
    existeUsuarioById
}