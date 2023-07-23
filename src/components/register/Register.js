import React, { useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './Register.css';
import HomeNavbar from '../../components/homeNavbar';

const Register = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
  }, []);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (event) => {
        event.preventDefault();
        if (!name || !email || !password) {  
            toast.error("Please fill in all the required fields.");
            return;
          }
        
        Axios.post('http://localhost:3002/api/auth/register', {
            
          email: email,
          name: name,  
          password: password,
          
        }).then((response) => {
          console.log(response);
          if (response.data.message == "Duplicate user") {
            toast.error("User Already Exits");
            setTimeout(function () {
              window.location.reload();
            }, 5000);
    
          } else {
              toast.success("Account Creation Successful");
              setTimeout(function () {
                window.location.reload();
              }, 5000);}
            })
    
      };

    return <div>
        <HomeNavbar /> 
        <Container className="Signup-container">
            <ToastContainer />
            <Form className="Signup-form">
               
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                </Form.Group>
                <Button variant="primary" type="submit" className="Signup-button" onClick={(e) => { handleSignUp(e) }}>
                    Sign Up
                </Button>
            </Form>
        </Container>

    </div>
}

export default Register;