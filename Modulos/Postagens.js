const Sequelize = require("sequelize")
const sequelize = new Sequelize('blogweb','root','Savitar18',{
    host: "localhost", dialect: 'mysql'
})

const Postagem = sequelize.define('Postagem',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    conteudo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria:{
        type: Sequelize.INTEGER,
        references:{
            model:'Categoria',
            key: 'id'},
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }

});

// Postagem.sync({force: true})
module.exports = Postagem