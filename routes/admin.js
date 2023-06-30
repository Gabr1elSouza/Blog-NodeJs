const express = require('express')
const router = express.Router()
const Sequelize = require("sequelize")

const Categoria = require("../Modulos/Categoria")

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
    Categoria.create({
        nome: req.body.nome,
        slug: req.body.slug
    }).then(function(){
        res.redirect("/")
        console.log("Categoria salva com sucesso")
    }).catch(function(erro){
        console.log("Houve um erro: " + erro);
    })
    
})

router.get('/categorias/add',(req,res) =>{
    res.render('admin/addcategorias')

})

module.exports = router