const { Router } = require('express')
const Post = require('../models/post')
const verifyToken = require('../client/src/components/Users/verifyToken')
const { default: Users } = require('../client/src/components/Users/Users')
const postRouter = new Router()


//Muestra los datos 
postRouter.get('/posts', (req, res) =>{
    
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
postRouter.get('/posts/:id', (req, res) =>{
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
postRouter.post('/newpost', verifyToken,  (req, res) =>{
    const {body : { information, status,  tradelink, date}, userId} = req
   /*  try{ */
    const newPost = new Post({
        owner: userId, 
        information: information,
        status: status,
        tradelink: tradelink, 
        date: date  
    })
    return newPost.save()
    .then(post => res.send(post))
    .catch(console.error) 
   /*  User.findById(userId, (error, user)=>{
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
    } */
})  

// Modifica los datos
postRouter.patch('/posts',  verifyToken, function(req, res) {
    const body = req.body;
    Post.findOneAndUpdate({ _id: body._id }, {
         //indica lo que se va a modificar
            $set: req.body
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se ha podido modificar los datos del post.',
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
postRouter.delete('/posts/:id',  verifyToken, (req,res) =>{
    const {params: {id}} = req

    post.findByIdAndRemove(id, (err, post) =>{
        if (err){
            res.status(500).send(`Error al eliminar el post: ${err}`)
        }
        res.json(post)
    })
})

module.exports = postRouter