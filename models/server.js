
const express = require("express")
const cors = require('cors')
const { dbConnection } = require("../db/config")

class Server {
    
    constructor(){
        console.log("paso por aca")
        this.app = express()
        this.port = process.env.PORT
        this.userPath = '/api/user'
        this.authPath = '/api/auth'

        this.conectarDB()
        this.middlewares()
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static("public"))
    }

    routes(){
        
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.userPath, require('../routes/users'))
    }

    listen(){
        this.app.listen(process.env.PORT, () =>{
            console.log("Puerto", this.port)
        })
    }

}

module.exports = Server