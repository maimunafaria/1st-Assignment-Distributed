
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "../../Axios/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Feed.css';
import MyNavbar from '../../components/Navbar';

const PostCard = ({ email, content, imageUrl }) => {

  const fullImageUrl = imageUrl ? `${imageUrl}` : null;
 // console.log(fullImageUrl);
  return (
    <div className="post-card">
      <h3 className="user-email">{email}</h3>
      <p>{content}</p>

      {imageUrl && <img src={fullImageUrl} alt=" nai" style={{ maxHeight: "300px", maxWidth: "300px" }} />}
    </div>
  );
};

const Post= () => {

  const [posts, setPosts] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const email = localStorage.getItem('email');
    useEffect(() => {

    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
          Authorization: 'Bearer ' + token,
      }
  }
    Axios.get('/post/getPost' ,config)
      .then((response) => {
        if (Array.isArray(response.data.response)) { setPostInformation(response.data.response); }

      })

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data', 
      },
    };
  

    const formData = new FormData();
    formData.append('email', email);
    formData.append('posts', posts);
    formData.append('image', imageFile);

    Axios.post('/post/post', formData, config)
      .then((response) => {
        toast.success('Post given!');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


  const [postInformation, setPostInformation] = useState([]);

  const sortedPosts = postInformation.sort((a, b) => b._id.localeCompare(a._id));




  return (
    
          <div>
            <MyNavbar />
            <div className="status-feed">
              <ToastContainer />
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNotice">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter the Status"
                    value={posts}
                    onChange={(event) => setPosts(event.target.value)}
                    style={{ height: "100px" }}
                  />
                </Form.Group>

                <Form.Group controlId="formImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) => setImageFile(event.target.files[0])}
                  />
                </Form.Group>
                <div className="post-button">
                  <Button variant="primary" type="submit">
                    Post
                  </Button>
                </div>
              </Form>
            </div>
            <div className="posts-feed">
              {sortedPosts.map((post) => (
                post.email === email && (
                  <PostCard key={post._id} email={post.email} content={post.posts} imageUrl={post.imageUrl} />
                )
              ))}

            </div>
          </div>
        
      
  );
};

export default Post;