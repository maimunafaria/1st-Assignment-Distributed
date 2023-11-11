const Minio = require('minio');
const fs = require('fs');
const mongoose = require('mongoose')
const Post = require('../models/Post');
const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'B0P7FMRJgKcCXfxg7jSQ',
  secretKey: '8r43tyqICTmKfppfIa9N1YiuvwXEH2SqNpXzKIed',
});


const post = (req, res, next) => {
  console.log("why")
  
  if (!req.file) {
    let post = new Post({
        email: req.body.email,
        posts: req.body.posts,
    });

    post.save()
        .then(response => {
            return res.json({
                message: 'Post Given'
            });
        })
        .catch(error => {
            console.log(error); 
            console.log(("HI"))
            return res.json({ message: 'An error occurred' });
        });
        
    return; 
}
    // console.log("hi");
    const filePath = req.file.path;
    const metaData = {
      'Content-Type': req.file.mimetype,
    };
  
    const bucketName = 'linkedin'; 
    const objectName = req.file.originalname;
  console.log("HIO")
  console.log("bysdfge")
    minioClient.fPutObject(bucketName, objectName, filePath, metaData, (err, etag) => {
      if (err) {
        console.log(err);
        console.log("HIhuio")
        return res.json({ message: 'Error' });
      }
     
      let post = new Post({
        email: req.body.email,
        posts: req.body.posts,
        imageUrl: `http://127.0.0.1:9000/linkedin/`+objectName, 
      });
      post.save()
        .then(response => {
          res.json({
            message: 'Post Given',
          });
        })
        .catch(error => {
          console.log("dfsxjohn")
          console.log(error);
          res.json({ message: 'An error occurred' });
        });
  
   
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
    console.log("bye")
  };
const getPost = (req, res, next) => {
  Post.find()
    .then(response => {
      res.json({
        response,
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!',
      });
    });
};

const changeCreatedPostStatus = async (req, res) => {
  const id = req.body.id;
  const objectId = new mongoose.Types.ObjectId(id);
  // console.log("O:",id);
  //   console.log(objectId);
    const approveData = await Post.updateOne(
      { _id: id},
     { $set: { createdNotification: true } }
    );res.json(approveData)
 
};

module.exports = {
  post,
  getPost,
  changeCreatedPostStatus,
};
