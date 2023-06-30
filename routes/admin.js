const express = require('express')
const router = express.Router()
const Sequelize = require("sequelize")

const Categoria = require("../Modulos/Categoria")
const bodyParser = require('body-parser')

//Configuração
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',(req,res) =>{
    res.render("admin/index")

})

router.get('/posts',(req,res) =>{
    res.send("Pagina de posts")

})

router.get('/categorias',(req,res) =>{
    res.render('admin/categorias')

})

router.post('/categorias/nova',(req,res)=>{
    
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push({texto:"Nome inválido"})
        }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
            erros.push({texto: "Slug inválido"})
        }
    if(req.body.nome.length < 2){
            erros.push({texto: "Nome da categoria muito pequeno"})
        }
    if(erros.length >0){
            res.render("admin/addcategorias", {erros: erros})
        }
    else{
        Categoria.create({
            nome: req.body.nome,
            slug: req.body.slug
        }).then(function(){
            req.flash("success_msg", "Categoria criada com sucesso")
            res.redirect("/admin/categorias")
            console.log("Categoria salva com sucesso")
        }).catch(function(erro){
            req.flash("error_msg","Houve um erro ao salvar a categoria, tente novamente!")
            console.log("Houve um erro: " + erro);
        })
    }
    
    
    
})

router.get('/categorias/add',(req,res) =>{
    res.render('admin/addcategorias')

})

module.exports = router