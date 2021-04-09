const bcrypt = require('bcrypt-nodejs');
const { Schema, model } = require('mongoose');

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post",
    }],       

});

// cifra la contraseña
user.pre('save', function(next) {
    const usuario = this;
    if (!usuario.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, (err, salt) =>{
        if (err){
            next(next);
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash) =>{
            if (err){
                next(err)
            }
            usuario.password = hash;
            next();
        })
    })

})


module.exports = User = model('User', user)