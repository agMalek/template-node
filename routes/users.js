
const { Router } = require('express')
const { check } = require('express-validator')

const { getUsers, deleteUsers, putUsers, postUsers } = require('../controlers/users')
const { emailEnUso, rolValido, existeUsuarioById } = require('../helpers/db_validations')
const { validarCampos} = require('../middlewares/validarCampos')

const router = Router()

router.get('/', getUsers)

router.post('/', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom( correo => emailEnUso(correo)),
    check("password", "La contraseña debe tener 6 caracteres").isLength({min: 6}),
    /* check("rol", "El rol no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    check("rol").custom( rol => rolValido(rol)),
    validarCampos
], postUsers)

router.put('/:id',[
   check('id', "El id no es válido").isMongoId(),
   check('id').custom(id => existeUsuarioById(id)),
   check("rol").custom( rol => rolValido(rol)),
   check("correo").custom( correo => emailEnUso(correo)),
   validarCampos
] ,putUsers)

router.delete('/:id',[
   check('id', "El id no es válido").isMongoId(),
   check('id').custom(id => existeUsuarioById(id)),
   validarCampos
], deleteUsers)

module.exports = router