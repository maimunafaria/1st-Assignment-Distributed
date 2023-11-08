// const User = require('../models/User');
const Notification = require('../models/Notification');
// const Post = require('../models/Post');
const mongoose = require('mongoose')
const userService = require('../../user_server'); // Import the User service
const postService = require('../../post_server'); 

async function createNotifications() {
  try {
    // const posts = await Post.find();
    const posts = await postService.getPosts(); 
    const users = await userService.getUsers();
    for (const post of posts) {
      if (!post.createdNotification) {
     // const users = await User.find();
      const postGiverEmail = post.email;
      const postss = post.posts;
      const imageurl =post.imageUrl;
      const createdPost = post.createdNotification;
      for (const user of users) {
        if (user.email !== postGiverEmail) {
          const notificationExists = await Notification.exists({
            email: user.email,
            posts: postss,
            postEmail: postGiverEmail,
            image: imageurl
          });

          if (!notificationExists) {
            await Notification.create({
              email: user.email,
              postEmail: postGiverEmail,
              image: imageurl,
              posts: post.posts,
              ifChecked: false,
            });
          }
        }
      }
      post.createdNotification = true;
        await post.save();
    }
    
  }
 } catch (error) {
    console.error('Error', error);
  }
}
async function createNotificationsForUsers(req, res) {
  try {
    await createNotifications();
    res.json({ message: 'Notifications created' });
  } catch (error) {
    console.error('Error', error);
  }
}
const getNotification =(req,res,next)=>{
  Notification.find()
  .then(response=>{
      res.json({
          response
      })
  })
  .catch(error=>{
      res.json({
          message:"An error occured!"
      })
  })
}

const approve = async (req, res) => {
  const id = req.body.id;
  const objectId = new mongoose.Types.ObjectId(id);
   // console.log(objectId);
    const approveData = await Notification.updateOne(
      { _id: objectId},
     { $set: { ifChecked: true } }
    );res.json(approveData);
  
};


module.exports = {
  createNotificationsForUsers,getNotification,approve
};
