//Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const admin = require('./routes/admin')
//Configurações
    //Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    //Handeblars
    app.engine('handlebars',handlebars.engine({defaultLayout:'main'}))
    app.set('view engine','handlebars')
    //Sequilize
//Rotas
    app.get('/', (req,res) =>{
        res.send("Rota principal")
    })
    app.get('/posts',(req,res) =>{
        res.send('Lista Posts')
    })

    app.use('/admin', admin)


//Outros
const PORT = 8081
app.listen(PORT,()=>{
    console.log("Servidor rodando!")
})