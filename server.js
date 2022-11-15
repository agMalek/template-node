
const express = require("express")
const cors = require('cors')

class Server {
    
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.userPath = '/api/user'
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static("public"))
    }

    routes(){
        
        this.app.use(this.userPath, require('./routes/users'))
    }

    listen(){
        this.app.listen(process.env.PORT, () =>{
            console.log("Puerto", this.port)
        })
    }

}

module.exports = Server