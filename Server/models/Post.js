// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const postSchema = new Schema({
//     email:{
//         type: String
//     },
//     posts:{
//         type: String
//     }
// },{timeStamps: true})

// const Post= mongoose.model('Post', postSchema)
// module.exports = Post

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  email: {
    type: String,
  },
  posts: {
    type: String,
  },
  imageUrl: {
    type: String, 
  },
  createdNotification:{
    type:Boolean,
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
