//upload moduls
const express = require('express')
const router = express.Router()
const Sequelize = require("sequelize")
const Categoria = require("../Modulos/Categoria")
const Postagem = require("../Modulos/Postagens")
const bodyParser = require('body-parser')

//Configuration
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.get('/',(req,res) =>{
    res.render("admin/index")
})

router.get('/posts',(req,res) =>{
    res.send("Pagina de posts")

})

//route for listing category
router.get('/categorias',(req,res) =>{
    //listagem de categorias
    Categoria.findAll({}).then(function(categorias){
        res.render('admin/categorias', {categorias: categorias})
    }).catch((erro) => {
        req.flash('error_msg',"Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
    

})

router.post('/categorias/nova',(req,res)=>{
    //Validação de formulário
    var erros = []
    //Nome vazio
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push({texto:"Nome inválido"})
        }
    //Slug vazio
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
            erros.push({texto: "Slug inválido"})
        }
    //Tamanho menor que 2 caracteres
    if(req.body.nome.length < 2){
            erros.push({texto: "Nome da categoria muito pequeno"})
        }
    //quantidade de erros/ acima de 0 mostra o erro
    if(erros.length >0){
            res.render("admin/addcategorias", {erros: erros})
        }
    else{
        //Criação dos dados para o banco de dados
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
//Route for add category
router.get('/categorias/add',(req,res) =>{
    res.render('admin/addcategorias')

})

//Route for edit with paraments
router.get("/categorias/edit/:id", (req, res) => {
    //listando por meio do id
    Categoria.findOne({
        where: { id: req.params.id }
    })  //validação para apenas ir para a pagina de editar se estiver no banco de dados
        .then((categoria) => {
            if (categoria) {//
                res.render('admin/editcategorias', { categoria: categoria })
            } else {
                req.flash("error_msg", "Esta categoria não existe")
                res.redirect("/admin/categorias")
            }
        })
        .catch((erro) => {
            req.flash("error_msg", "Ocorreu um erro ao buscar a categoria")
            res.redirect("/admin/categorias")
        })
})

//Route for edit
router.post("/categorias/edit",(req, res)=>{
    //Validação de formulário
    var erros = []
    //Nome vazio
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push({texto:"Nome inválido"})
        }
    //Slug vazio
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
            erros.push({texto: "Slug inválido"})
        }
    //Tamanho menor que 2 caracteres
    if(req.body.nome.length < 2){
            erros.push({texto: "Nome da categoria muito pequeno"})
        }
    //quantidade de erros/ acima de 0 mostra o erro
    if(erros.length >0){
            req.flash("error_msg", "Houve um erro ao editar a categoria")
            res.redirect("/admin/categorias")   
        }
    else{
    //Colocando o dados dentro dos input 
    Categoria.findOne({where:{id: req.body.id}}).then((categoria)=>{
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug
        //salvando updates
        categoria.save().then(()=>{
            req.flash("success_msg", "Categoria editada com sucesso")
            res.redirect("/admin/categorias")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao salvar a edição")
            res.redirect("/admin/categorias")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })
}
})

router.post("/categorias/deletar", (req,res)=>{
    Categoria.destroy({where: {id: req.body.id}
    }).then(()=>{
        req.flash("success_msg", "Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao deletar categoria")
        console.log("erro: "+err)
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens", (req,res) =>{
    res.render("admin/postagens")
})

router.get("/postagens/add", (req,res) =>{
    Categoria.findAll().then((categorias)=>{
        res.render("admin/addpostagem", {categorias:categorias})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/admin")
    })
    

})

router.post("/postagens/nova", (req,res) => {

    var erros =[]

    if(req.body.categoria === 0){
        erros.push({texto: "Categoria inválida, registre uma categoria"})
    }

    if(erros.length > 0){
        res.render("admin/addpostagem", {erros:erros})
    }else{
        Postagem.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            slug: req.body.slug,
            categoria: req.body.categoria,
        }).then(function(){
            req.flash("success_msg", "Postagem criada com sucesso")
            res.redirect("/admin/postagens")
            console.log("Postagem criada com sucesso salva com sucesso")
        }).catch(function(err){
            req.flash("error_msg", "Houve um problema no salvamento da postagem")
            res.redirect("/admin/postagens")
            console.log("erro: "+ err)
        })
    }
    
})

//exportação para o arquivo principal
module.exports = router