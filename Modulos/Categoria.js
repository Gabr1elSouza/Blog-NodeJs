const Sequelize = require("sequelize")
const sequelize = new Sequelize('blogweb','root','Savitar18',{
    host: "localhost", dialect: 'mysql'
})

const Categoria = sequelize.define('Categoria', {
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

//Categoria.sync({force: true})
module.exports = Categoria