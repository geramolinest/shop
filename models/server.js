const express = require('express');
const Item = require('./item');
const cors = require('cors');
const { Op } = require('sequelize');
class Server{
    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
    }
    middleware(){

        //JSON FORMAT FOR REQUEST
        this.app.use( express.json() )

        this.app.use(cors());

    }

    routes(){

        //Register an item
        this.app.post('/item',(req,res) =>{

            const body = req.body;

            Item.create({
                name: body.name,
                description: body.description,
                price: body.price,
                existence: body.existence
            }).then((item) => {
                res.status(201).json({'status':200,'msg':'Item was created'});
            }).catch((error)=>{res.status(500).json({'msg':error})})
            
        });

        //Get all items or get just one item by id
        this.app.post('/items',(req, res)=>{

            const body = req.body;
            if(!body.id && !body.description){
                Item.findAll().then((items) =>{
                    res.status(200).json({
                        'items':items
                    })
                }).catch((error) => {
                    res.status(500).json({'msg':error})
                });
            }else if(body.id){
                Item.findOne({where:{
                    id: body.id
                }}).then((item) =>{
                    if(item){
                        res.status(200).json({
                            'item':item
                        });
                    }else{
                        res.status(400).json({
                            'item':'item not found'
                        });
                    }
                    
                }).catch((error) => {
                    res.status(500).json({'msg':error})
                });
            }else if(body.description){
                Item.findAll({where:{
                    [Op.or]:{
                        name:{
                            [Op.iLike]: `%${body.description}%`,
                        },
                        description:{
                            [Op.iLike]: `%${body.description}%`,
                        }
                    }
                    
                    
                }}).then((item) =>{
                    if(item){
                        res.status(200).json({
                            'items':item
                        });
                    }else{
                        res.status(400).json({
                            'items':'items not found'
                        });
                    }
                    
                }).catch((error) => {
                    res.status(500).json({'msg':error})
                });
            }

            
        });

    }

    startServer(){
        this.app.listen(3000,()=>{
            console.log(`Listening at port ${3000}`);
        });
    }
}

module.exports = Server;