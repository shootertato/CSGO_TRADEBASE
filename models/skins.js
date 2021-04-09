const {Schema, model} = require('mongoose')
const {Types: {ObjectId}} = Schema

const skin = new Schema({
    name: {
        type: String,
        required: true,
    },
    float: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
})

module.exports = Skin = model('Skin', skin)