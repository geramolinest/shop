const { DataTypes, Model } = require('sequelize');
const db = require('../database/connection');

class Item extends Model{}

Item.init({
    //Fields

    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
    },
    price:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    existence:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    }
},
{
    //options
    sequelize: db,
    modelName: 'item',
    tableName: 'shop_items',
    createdAt: false,
    updatedAt: false
});

module.exports = Item;