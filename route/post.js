const { Router } = require('express')
const Post = require('../models/post')
const verifyToken = require('../client/src/components/Users/verifyToken')
const User = require('../models/users') 
const postRouter = new Router()


//Muestra los datos 
postRouter.get('/api/posts', (req, res) =>{
    
    Post.find({})
        .populate(`owner`, `username`)
        .exec((error, post) => {
        if(error){
            res.status(400).send('Ha ocurrido un error.')
        }
        res.json(post)
    })
  }) 

  //Muestra los datos 
postRouter.get('/api/posts/:id', (req, res) =>{
    const{params:{id}} = req;
    console.log(id)
    Post.findById(id)
    .populate(`owner`, `username`)
    .exec((error, post) => {
        if(error){
            res.status(400).send('Ha ocurrido un error.')
        }
        res.json(post)
    })
  }) 

  
//Crea un post nuevo en la base de datos
postRouter.post('/api/newpost', verifyToken,  (req, res) =>{
    const {body : { information, status,  tradelink, date}, userId} = req
      try{  
    const newPost = new Post({
        owner: userId, 
        information: information,
        status: status,
        tradelink: tradelink, 
        date: date  
    })
     User.findById(userId, (error, user)=>{
        if(error){
            return res.status(400).send("Ha ocurrido un error");
        }
        newPost.save()
        .then(post => {
            user.posts.push(post._id)
            user.save()
            .then(()=>{
                return res.status(200).send("post creado");
            })
        })
    })
}
    catch(error){
        return res.status(400).send("Ha ocurrido un error");
    } 
})  

// Modifica los datos
postRouter.put('/api/user/post/:id',  verifyToken, function(req, res) {
    const body = req.body;
    const {params: {id}} = req

    Post.findByIdAndUpdate( id, {$set: body} , {
         //indica lo que se va a modificar
           /*  $set: req.body */
        },
        function(error, info) {
            if (error) {
                res.send({
                    resultado: false,
                    msg: 'No se ha podido modificar los datos del post.',
                    err
                });
            } else {
                res.send("El post se ha modifcado correctamente")
                console.log(info)
            }
        }
    )
});

//elimina un usuario de la base de datos


postRouter.delete('/api/deletepost/:id', verifyToken, (req, res) => {
    const { params: { id }, userId } = req
    return User.findById(userId)
        .then(user => {
            console.log(user)
            const index = user.posts.indexOf(id)
            console.log(index)
            if (index == -1) {
               return res.status(401).send('Este usuario no tiene permisos para borrar el post indicado')
            }
            else {
                return User.findByIdAndUpdate(userId, { $pull: { posts: id } })
                    .then(doc => {
                        return Post.findByIdAndRemove(id).lean()
                            .then(post => res.status(200).send('Post eliminado'))
                            .catch(error => res.status(400).send('Ha ocurrido un error'))
                    })
                }
            })

        .catch(error => res.send('Se ha producido un error'))
})

module.exports = postRouter