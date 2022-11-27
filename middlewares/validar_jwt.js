const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validatJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token')

    try {
        
        if(!token){
            return res.status(401).json({
                msg: "no hay token en los headers"
            })
        }

        const {uid} = jwt.verify(token, process.env.SECRETKEYTOKEN)
        
        const currentUser = await Usuario.findById(uid)

        if(!currentUser){
            return res.status(400).json({
                msg: "No existe el id en db"
            })
        }

        if(!currentUser.estado){
            return res.status(400).json({
                msg: "El ususario tiene estado false"
            })
        }
        req.usuario = currentUser

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "token no válido"
        })
    }

}


module.exports = {
    validatJWT
}