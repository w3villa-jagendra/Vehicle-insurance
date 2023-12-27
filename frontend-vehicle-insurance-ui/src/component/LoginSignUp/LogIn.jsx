import React, { useState, useContext } from "react";
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LogInSignUp.css';
import { userContext } from "../../utils/userContext";
function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const navigate = useNavigate();
    const {user} = useContext(userContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

      
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

       
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
console.log(user)
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
