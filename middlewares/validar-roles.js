const {request, response} = require('express')


const esAdminRole = (req = request, res=response, next) => {

    if(!req.usuario){
        res.status(500).json({
            msg: "no se hizo el token"
        })
    }

    if(req.usuario.rol != 'ADMIN_ROLE'){
        res.status(401).json({
            msg: "no es admin"
        })
    }

    next()

}


const tieneRol = (...roles) => {
    return (req = request, res=response, next) => {
        

        if(!req.usuario){
            res.status(500).json({
                msg: "no se hizo el token"
            })
        }


        if(!roles.includes(req.usuario.rol)){
            res.status(401).json({
                msg: `no tiene acceso a esta operación - solo pueden ${roles}`
            })
        }
        
        next()
    }
} 

module.exports = {
    esAdminRole,
    tieneRol
}