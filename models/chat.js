const {Schema, model} = require('mongoose');
const {Types: {ObjectId}} = Schema;

const chat = new Schema({
    owner: {
        type: ObjectId,
        ref: "User"
    },  
    date:{
        type: Date,
    },
    text:{
        type: String,
    }
})

module.exports = Chat = model('Chat', chat)