const Sequelize = require('sequelize');
const sequelize = new Sequelize('Book','root','kldpsh7@8447',{dialect:'mysql'})
const Book = sequelize.define('book',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    issuedOn:{
        type:Sequelize.DATE,
        allowNull:false
    },
    returnBy:{
        type:Sequelize.DATE,
        allowNull:false
    },
    returnedOn:{
        type:Sequelize.DATE
    },
    fine:{
        type:Sequelize.INTEGER
    }
})

module.exports = Book;