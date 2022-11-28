const {response, request} = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar_jwt')
const { googleVerify } = require('../helpers/google_verify')


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

const googleSignIn = async(req, res) => {

    const {id_token} = req.body
    
    try {
        const { nombre, img, correo } = await googleVerify(id_token)
        
        let usuario = await Usuario.findOne({correo})
        
        if(!usuario){
            const data = {
                nombre,
                correo,
                img,
                rol: "ADMIN_ROLE",
                password: ":P",
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save()
        }

        if(!usuario.estado){
            res.status(401).json({
                msg:"usuario bloqueado"
            })
        }

        const token = await generarJWT(usuario.id)
       
        res.json({
           msg: "todo bien",
           usuario,
           token,
           id_token
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar"
        })    
    }
    


}

module.exports = {
    login,
    googleSignIn
}