import React, { useState } from "react";
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import  axios from "axios";
import './LogInSignUp.css';

function LogIn() {
    const [formData, setFormData] = useState({
        username: '',
        hashedPassword: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const navigate = useNavigate();


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
              if (response.status === 200) {


                localStorage.setItem("userData", JSON.stringify(response.data));
                // Redirect the user to the login page
              
                setShowAlert(true);
                setAlertVariant('success');
                console.log(response.data)
                navigate("/dashboard");
              } else {
                // Registration failed, handle errors
                console.error("Registration failed:", response.statusText);
              }
            
          } catch (error) {
            console.error("Error during registration:", error);
          }

        };
        

       
    return (
        <div className="main">
         
            <div className="login-box">
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertVariant === 'success' ? 'Login successful!' : 'Invalid credentials!'}
                </Alert>
            )}
                <h1 className="text-center">Login </h1>
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
