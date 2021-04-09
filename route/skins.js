const { Router } = require('express')
const Skin = require('../models/skins')
const verifyToken = require('../client/src/components/Users/verifyToken')
const skinRouter = new Router()

//Muestra los datos 
skinRouter.get('/skins',  (req, res) => {
    Skin.find({}, (error, skins) => {
        if (error) {
            res.status(400).send('Se ha producido un error')
        }
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.json(skins)
    })
})
 



//Crea un skin nuevo en la base de datos
skinRouter.post('/skins',   (req, res) =>{
    const {body : {name, float, icon}, params:{id}} = req
    const newSkin = new Skin({
        owner: id,
        name: name,
        float: float,
        icon: icon
    })
    return newSkin.save()
    .then(skin => res.send(skin))
    .catch(console.error) 
})

// Modifica los datos
skinRouter.patch('/skins',  function(req, res) {
    const body = req.body;
    Skin.findOneAndUpdate({ _id: body._id }, {
         //indica lo que se va a modificar
            $set: req.body
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se ha podido modificar los datos de la skin.',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

//elimina una skin de la base de datos
skinRouter.delete('/skins/:id',  (req,res) =>{
    const {params: {id}} = req

    Skin.findByIdAndRemove(id, (err, skin) =>{
        if (err){
            res.status(500).send(`Error al eliminar la skin: ${err}`)
        }
        res.json(skin)
    })
})

module.exports = skinRouter
