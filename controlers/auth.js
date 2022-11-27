const {response, request} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar_jwt')


const login = async(req = request, res = response) => {
    
    
    try {
        const {correo, password} = req.body
        
        const usuario = await Usuario.findOne({correo})
        
        //VERIFICAR SI EL MAIL EXISTE
        if(!usuario || !usuario.estado){
            return res.status(400).json({
                msg: "Login incorrecto --->>> mail "
            })
        }


        //VERIFICAR SI EL MAIL ESTA ACTIVO
        /* if(!usuario.estado){
            return res.status(400).json({
                msg: "Login incorrecto --->>> no esta activo "
            })
        } */

        
        //VERIFICAR CONTRASEÑA
        const esValida = bcryptjs.compareSync(password, usuario.password)
        if(!esValida){
            return res.status(400).json({
                msg: "Login incorrecto --->>> contraseña "
            })
        }
    
        const token = await generarJWT(usuario.id)

        res.json({
            msg: "login ok",
            usuario,
            token
        })


    } catch (error) {
        console.log(error)
        res.json({
            msg: "Error"
        })    
    }
    
    
}

module.exports = {
    login
}