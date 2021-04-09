const {Schema, model} = require('mongoose')

const post = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User" 
    }, 
    information:{
        type: String,
        /* required: true  */
    },
    status: {
        type: String,
        /* required: true, */
    },
    tradelink:{
        type: String,
       /*  required: true */
    },
    date:{
        type: Date,
    }
})

module.exports = Post = model('Post', post)