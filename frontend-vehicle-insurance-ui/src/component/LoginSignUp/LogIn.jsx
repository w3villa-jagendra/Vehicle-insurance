import React, { useState } from "react";
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LogInSignUp.css';

function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Retrieve user data from local storage
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        // Check if entered credentials match stored credentials
        if (formData.email === storedEmail && formData.password === storedPassword) {
            setShowAlert(true);
            setAlertVariant('success');
            navigate('/');
        } else {
            setShowAlert(true);
            setAlertVariant('danger');
            
        }

        // Automatically hide the alert after 3 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <div className="main">
         
            <div className="login-box">
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertVariant === 'success' ? 'Login successful!' : 'Invalid credentials!'}
                </Alert>
            )}
                <h1 className="text-center">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required onChange={handleChange} />
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
