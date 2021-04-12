const { Router } = require('express')
const User = require('../models/users')
const verifyToken = require('../client/src/components/Users/verifyToken')
const router = new Router()

//Muestra los datos 
router.get('/users',  verifyToken, (req, res) =>{
    User.find({}, (error, users) => {
        if(error){
          res.status(400).send('Ha ocurrido un error.')
        }
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.json(users)
    })   
  }) 

//Perfil del usuario
router.get(`/users/perfil/`, verifyToken, (req, res) =>{
   const id = req.userId
    User.findById(id)
    .populate('posts')
    .exec(function(error, user){
        if(error){
            return res.status(400).send('Ha ocurrido un error.')
        }
            return res.json(user)
    })
  }) 


  
// crea un nuevo usuario en la base de datos
router.post('/register', (req, res) =>{
    const {body : {username, email, password}} = req
    const newUser = new User({
        username:username,
        email:email,
        password:password
    })
    return newUser.save()
    .then(user => res.send("El registro has ido completado, ves al login aqui debajo"))
    .catch(console.error) 
})    

// Modifica los datos
router.patch('/users',  verifyToken,  function(req, res) {
    const body = req.body;
    User.findOneAndUpdate({ _id: body._id }, {
         //indica lo que se va a modificar
            $set: req.body
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se ha podido modificar los datos del usuario.',
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

//elimina un usuario de la base de datos
router.delete('/users/:id',   verifyToken, (req,res) =>{
    const {params: {id}} = req

    user.findByIdAndRemove(id, (err, user) =>{
        if (err){
            res.status(500).send(`Error al eliminar el usuario: ${err}`)
        }
        res.json(user)
    })
})

module.exports = router