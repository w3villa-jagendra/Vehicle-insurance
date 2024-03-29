import React, { useState, useContext } from "react";
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './LogInSignUp.css';
import { userContext } from "../../utils/userContext";

function LogIn() {

    const { user } = useContext(userContext);
    console.log(user)
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

    console.log(formData);


 
    const handleLogin = async (e) => {


        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5113/api/User/login",
                formData
            );



            if (response.status === 200) {
                const token = response.data.token;
                console.log(token);
                localStorage.setItem("authToken", token);


                if (localStorage.getItem('authToken')) {


                    const userResponse = await axios.get('http://localhost:5113/api/User/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    const userData = userResponse.data;
                    localStorage.setItem('apiResponse', JSON.stringify(userData));

                    navigate("/dashboard");
                }
            } else {
                setAlertVariant('danger');
                setShowAlert(true);
                console.error("Login failed:", response.statusText);
            }

        } catch (error) {

            setAlertVariant('danger');
            setShowAlert(true);
            console.error("Login failed:", error);
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
                        <input value={formData.username} type="text" id="username" name="username" required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hashedPassword">Password:</label>
                        <input type="password" value={formData.hashedPassword} id="hashedPassword" name="hashedPassword" required onChange={handleChange} />
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
