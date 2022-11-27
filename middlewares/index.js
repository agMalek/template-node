

const validarCampos = require('../middlewares/validarCampos')
const validatJWT = require('../middlewares/validar_jwt')
const validarRoles = require('../middlewares/validar-roles')

module.exports = {
    ...validarCampos,
    ...validatJWT,
    ...validarRoles
}