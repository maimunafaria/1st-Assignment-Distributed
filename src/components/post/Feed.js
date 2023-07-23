
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import './Feed.css';
import MyNavbar from '../../components/Navbar';

const PostCard = ({ email, content, imageUrl }) => {

  const imageBaseUrl = 'http://localhost:9000/distributed';
  const fullImageUrl = imageUrl ? `${imageBaseUrl}/${imageUrl}` : null;
 // console.log(fullImageUrl);
  return (
    <div className="post-card">
      <h3 className="user-email">{email}</h3>
      <p>{content}</p>

      {imageUrl && <img src={fullImageUrl} alt=" nai" style={{ maxHeight: "300px", maxWidth: "300px" }} />}
    </div>
  );
};

const Feed = () => {
  const { email } = useParams();
  const [posts, setPosts] = useState('');
  const [authState, setAuthState] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();



    const formData = new FormData();
    formData.append('email', email);
    formData.append('posts', posts);
    formData.append('image', imageFile);

    Axios.post('http://localhost:3002/api/post/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        toast.success('Post given!');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const [postInformation, setPostInformation] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3002/api/post/getPost')
      .then((response) => {
        if (Array.isArray(response.data.response)) { setPostInformation(response.data.response); }

      })

  }, []);
  const sortedPosts = postInformation.sort((a, b) => b._id.localeCompare(a._id));

  const authenticate = (email) => {
    Axios.get("http://localhost:3002/api/auth/", {
      headers: {
        accessToken: localStorage.getItem("accessToken")

      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        console.log(response.data.email);
        if (response.data.email == email) {
          setAuthState(true);
        }
      }
    });
  }

  useEffect(() => {
    authenticate(email);
  }, []);

  return (
    <>
      {
        authState && (
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
                post.email !== email && (
                  <PostCard key={post._id} email={post.email} content={post.posts} imageUrl={post.imageUrl} />
                )
              ))}

            </div>
          </div>
        )
      }
    </>
  );
};

export default Feed;
