const Sequelize = require ('sequelize');

const sequelize = require ('../util/database');

const Expense  = sequelize.define('expenses',{
    id:{
      type : Sequelize.INTEGER,
      autoIncrement:true,
      allowNull : false,
      primaryKey : true
    },
    description:{
      type : Sequelize.STRING,
      allowNull : false
    },
    amount:{
      type : Sequelize.STRING,
      allowNull : false
    }

});

module.exports = Expense;