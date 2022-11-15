const {response, request} = require('express')

const getUsers = (req = request, res = response) => {
    
    const {nombre, key, page = 1, limit = 10} = req.query 
    
    res.json( {
        msg: "Metodo get - controler",
        nombre,
        key,
        page,
        limit
    })
    
}

const postUsers = (req, res = response) => {

    const body = req.body

    res.json( {
        msg: "Metodo post - controler",
        ...body
    })
    
}

const putUsers = (req, res = response) => {
    
    const {id} = req.params

    res.json( {
        msg: "Metodo put - controler",
        id
    })
    
}

const pacthUsers = (req, res = response) => {
    res.send("Metodo patch - controle")
}

const deleteUsers = (req, res = response) => {
    res.send("Metodo delete - controle")
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    pacthUsers,
    deleteUsers
}