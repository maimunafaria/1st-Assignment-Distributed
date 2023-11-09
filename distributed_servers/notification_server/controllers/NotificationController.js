// const User = require('../models/User');
const Notification = require('../models/Notification');
const axios = require('axios');
const mongoose = require('mongoose')
// const userService = require('../../user_server'); 
// const postService = require('../../post_server'); 

async function createNotifications() {
  try {
    const postsResponse = await axios.get("http://postservice:3011/getPost");
    const usersResponse = await axios.get("http://userservice:3010/getUser");
    const posts = postsResponse.data.response;
    const users = usersResponse.data.response;

    for (const post of posts) {
      if (!post.createdNotification) {
        const postGiverEmail = post.email;
        const postss = post.posts;
        const imageurl = post.imageUrl;

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

        const data= await axios.put("http://postservice:3011/changeCreatedPostStatus", { id: post._id });
      //  console.log(data);
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
  // console.log("O:",id);
  //   console.log(objectId);
    const approveData = await Notification.updateOne(
      { _id: objectId},
     { $set: { ifChecked: true } }
    );res.json(approveData);
  
};


module.exports = {
  createNotificationsForUsers,getNotification,approve
};
