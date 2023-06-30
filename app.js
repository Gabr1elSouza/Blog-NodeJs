//Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const Sequelize = require("sequelize")
const sequelize = new Sequelize('blogweb','root','Savitar18',{
    host: "localhost", dialect: 'mysql'
})
const session = require('express-session')
const flash = require('connect-flash')

//Configurações

    //Sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))

    app.use(flash())

    //Middlaware
    
        app.use((req,res,next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
        

    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
    //Handeblars
        app.engine('handlebars',handlebars.engine({defaultLayout:'main', layoutsDir:path.join(__dirname, 'views/layout')}))
        app.set('view engine','handlebars')
    //Sequelize
    sequelize.authenticate().then(function(){
        console.log("Conectado com sucesso")
    }).catch(function(erro){
        console.log("Falha ao se conectar: "+erro)
    })
    //Public
        app.use(express.static(path.join(__dirname,"public")))

        
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