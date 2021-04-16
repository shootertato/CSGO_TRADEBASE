const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/users');
const router = require('./route/user');
const verifyToken = require('./client/src/components/Users/verifyToken');
const {env:{MONGODB_URL}} = process;
const jwt = require('jsonwebtoken');
const {env:{SECRET}} = process;
const cors = require("cors");
const path = require('path');


//acceso a las rutas  y su contenido
mongoose.connect(MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,})
.then(() => {
    const router = require('./route/user')
    const skinRouter = require('./route/skins')
    const postRouter = require('./route/post')
    const chatRouter = require('./route/chat')
    app.use(express.json())
    app.use(express.urlencoded())  
    app.use(router)
    app.use(skinRouter)
    app.use(postRouter)
    app.use(chatRouter)
})

// formulario de login, verifica la pass escrita con la pass cifrada
router.post('/login', async (req, res) =>{
    const user = await User.findOne({email: req.body.email})

    if(user){
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(validPassword){
            const token = jwt.sign({id: user._id}, SECRET, {
                expiresIn: 60*60*24*7
            })
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            res.json({auth:true, token})
        }else{
            res.status(400).send('El usuario o la contraseña son incorrectos');
        }
    }else{
        res.status(400).send('El usuario no existe');
    }
})


app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}else{
    app.get('/', (req, res) =>{
        res.send('Api running')
    })
}

app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})
