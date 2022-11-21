const {response, request} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const getUsers = async(req = request, res = response) => {
    
    const {limite = 5, desde=0} = req.query 
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    
    res.json({total, usuarios})
}

const postUsers = async(req, res = response) => {

    const {nombre, password, correo, rol} = req.body
    const usuario = new Usuario({nombre, password, correo, rol})
    
    // ENCRIPTAR CONTRASEÑA
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt) 

    // GUARDAR EN BD
    await usuario.save()
    
    res.json( {
        usuario
    })
}

const putUsers = async(req, res = response) => {
    
    const {id} = req.params
    const {_id, password, google, ...resto} = req.body

    // ENCRIPTAR CONTRASEÑA
    if(password){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
    
}

const deleteUsers = async(req, res = response) => {
    
    const {id} = req.params

    //const usuario = await Usuario.findByIdAndDelete(id)
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})

    res.json(usuario)
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}