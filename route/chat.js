const { Router } = require('express')
const Chat = require('../models/chat')
const verifyToken = require('../client/src/components/Users/verifyToken')
const chatRouter = new Router()

//Recoge los datos 
chatRouter.get('/chat',   verifyToken,(req, res) =>{
    Chat.find({}, (error, chats) => {
        if(error){
          res.status(400).send('Ha ocurrido un error.')
        }
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.json(chats)
    })   
  }) 
  
// crea una zona de comentarios en la base de datos
chatRouter.post('/chat',  verifyToken,  (req, res) =>{
    const {body : {date, text}, params:{id}} = req
    const newChat = new Chat({
        owner: id,
        date:date,
        text:text
    })
    return newChat.save()
    .then(chat => res.send(chat))
    .catch(console.error) 
})    

// Modifica los datos
chatRouter.patch('/chat/:id',   verifyToken, function(req, res) {
    const body = req.body;
    Chat.findOneAndUpdate({ _id: body._id }, {
            //indica lo que se va a modificar
            $set: req.body
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se ha podido modificar los datos del chat.',
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
chatRouter.delete('/chat/:id',  verifyToken, (req,res) =>{
    const {params: {id}} = req

    chat.findByIdAndRemove(id, (err, chat) =>{
        if (err){
            res.status(500).send(`Error al eliminar el chat: ${err}`)
        }
        res.json(chat)
    })
})

module.exports = chatRouter