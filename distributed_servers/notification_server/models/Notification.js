const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    email:{
        type: String
    },
    postEmail:{
        type: String
    },
    posts:{
        type: String
    },
    image: {
        type: String, 
      },
    ifChecked:{
        type:Boolean
    }
},{timestamps: true});

const Notification= mongoose.model('Notification', notificationSchema)
module.exports = Notification