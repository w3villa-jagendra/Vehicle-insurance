import React, { useState, useContext } from "react";
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import  axios from "axios";
import './LogInSignUp.css';
import { userContext } from "../../utils/userContext";
function LogIn() {
    const [formData, setFormData] = useState({
        username: '',
        hashedPassword: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const navigate = useNavigate();
    const {user} = useContext(userContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
      
              // Use Axios to send the POST request
              const response = await axios.post(
                "http://localhost:5113/api/User/login",
                formData
              );

              
            
              // Check if the registration was successful
              if (response.status === 201) {
                // Redirect the user to the login page
                // navigate("/");
                console.log(response)
              } else {
                // Registration failed, handle errors
                console.error("Registration failed:", response.statusText);
              }
            
          } catch (error) {
            console.error("Error during registration:", error);
          }

        };
        
      
        

        // // Check if entered credentials match stored credentials
        // if (formData.email === storedEmail && formData.password === storedPassword) {
        //     setShowAlert(true);
        //     setAlertVariant('success');
          
        // } else {
        //     setShowAlert(true);
        //     setAlertVariant('danger');
            
        // }

        // Automatically hide the alert after 3 seconds
    return (
        <div className="main">
         
            <div className="login-box">
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertVariant === 'success' ? 'Login successful!' : 'Invalid credentials!'}
                </Alert>
            )}
                <h1 className="text-center">Login {user && user.username}</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input value={formData.username} type="text" id="email" name="username" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" value={formData.hashedPassword} id="password" name="hashedPassword" required onChange={handleChange} />
                    </div>
                    <div className="button">
                        <button type="submit" className="submit-btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
