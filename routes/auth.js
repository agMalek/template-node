const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignIn } = require('../controlers/auth')
const { validarCampos} = require('../middlewares/validarCampos')

const router = Router()

router.post('/login',[
    check('correo', "El correo no es válido").isEmail(),
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    validarCampos
], login)

router.post('/google',[
    check('id_token', "el id_token es obligatorio").not().isEmpty(),
    validarCampos
], googleSignIn)

module.exports = router