import React, { useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "../../Axios/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './Login.css';
import HomeNavbar from '../../components/homeNavbar';
import { useNavigate } from "react-router-dom";

const Login = () => {


  React.useEffect(() => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("email");
  }, []);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post('/auth/login',
      {
        email: email,
        password: password,

      }).then((response) => {
        if (response.data.message == "Password does not match" || response.data.message == "No user") {
                  toast.error(response.data.message);
                  }
        else {
       
          localStorage.setItem("accessToken", (response.data.token));
          localStorage.setItem("email", (response.data.email));
          navigate(`/feed`);
        }
      });
      Axios.post(`/notification/createNotification`).then(response => {
        console.log("hi");
      });
  }

  return <div>
    <HomeNavbar />
    <Container className="login-container">

      <ToastContainer />
      <Form className="login-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" className="login-button" onClick={(e) => { handleSubmit(e) }}>
          Log In
        </Button>
      </Form>


    </Container>
  </div>
}

export default Login;