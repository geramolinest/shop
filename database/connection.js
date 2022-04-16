const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.DATABASE,process.env.USER_DB,process.env.PASSWORD_DB,{
    host:process.env.HOST,
    dialect: 'postgres',
    port: process.env.PORT,
    dialectOptions:{
        ssl: {
            require:true,
            rejectUnauthorized: false
        }

    }
    

});

module.exports = db; 
