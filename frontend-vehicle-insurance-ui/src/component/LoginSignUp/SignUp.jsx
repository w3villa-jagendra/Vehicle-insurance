import React, { useState } from "react";
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LogInSignUp.css';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success'); // To track alert variant
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password === formData.confirmPassword) {
            // Passwords match, store only password in local storage
            localStorage.setItem('name', formData.name);
            localStorage.setItem('email', formData.email);
            localStorage.setItem('password', formData.password);
            setShowAlert(true);
            setAlertVariant('success');
            navigate('/');
        } else {
            // Passwords do not match
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
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertVariant === 'success' ? 'Password stored successfully!' : 'Passwords do not match!'}
                </Alert>
            )}
            <div className="signUp-box">
                <h1 className="text-center">SignUp</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required onChange={handleChange} />
                    </div>
                    <div className="button">
                        <button type="submit" className="submit-btn">Sign Up</button>
                       
                    </div>

                </form>

            </div>
        </div>
    )
}

export default SignUp;
