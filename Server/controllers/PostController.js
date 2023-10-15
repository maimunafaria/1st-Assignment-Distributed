const Minio = require('minio');
const fs = require('fs');
const Post = require('../models/Post');
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'qgGNF6kUdoenCVtDpHVd',
  secretKey: 'B3VSO1q6nDfhmLrWLgJdJ1tO8G5fr9V94V3e7KI0',
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
    
    minioClient.fPutObject(bucketName, objectName, filePath, metaData, (err, etag) => {
      if (err) {
        console.log(err);
        return res.json({ message: 'Error' });
      }
     
      console.log("HIOsfgv")
      let post = new Post({
        email: req.body.email,
        posts: req.body.posts,
        imageUrl: `http://localhost:9000/linkedin/`+objectName, 
      });
      console.log("hoy ki?")
      post.save()
        .then(response => {
          res.json({
            message: 'Post Given',
          });
        })
        .catch(error => {
          console.log(error);
          res.json({ message: 'An error occurred' });
        });
  
   
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
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

module.exports = {
  post,
  getPost,
};
