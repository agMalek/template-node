
const { Router } = require('express')
const { getUsers, deleteUsers, putUsers, pacthUsers, postUsers } = require('../controlers/users')

const router = Router()

router.get('/', getUsers)
router.post('/', postUsers)
router.put('/:id', putUsers)
router.patch('/', pacthUsers)
router.delete('/', deleteUsers)

module.exports = router