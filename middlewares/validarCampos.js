

const { validationResult } = require('express-validator')



/* const emailEnUso = async(req, res, next) => {
    
    // VALIDAR SI EL CORREO NO EXISTE
    const {correo} = req.body
    
    if(await Usuario.findOne({correo})){
        return res.status(400).json({
            msg: "El correo ya esta en uso"
        })
    }
    
    next()
} */


const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors})
    }
    next()
}

module.exports = {
    validarCampos,
   /*  emailEnUso */
}
