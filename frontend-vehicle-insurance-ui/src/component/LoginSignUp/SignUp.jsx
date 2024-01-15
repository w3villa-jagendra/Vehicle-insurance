import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { userContext } from "../../utils/userContext";
import axios from "axios";
import "./LogInSignUp.css";


const SignUp = () => {


  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const {  user, setUser } = useContext(userContext);
  const navigate = useNavigate();


  const userRole =   localStorage.getItem('userRole',user.userRole);

  const [formValues, setFormValues] = useState({

    username: "",
    email: "",
    password: "",
    confirmPassword: "",
   userRole:null



  });





  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));


    if (Object.keys(formErrors).length === 0) {
     
      //set values in userContext
      setUser({
        username : formValues.username,
        email : formValues.email,
        hashedPassword: formValues.password,
        userRole:userRole 
    });
      if (user.username ) {
        console.log(user.username);
        registerUser();
      }

    }
    

  };

  console.log(user)


  const registerUser = async () => {
    try {
      //if username is filled field, then we can hit the api 

      if (user.username) {
        // Use Axios to send the POST request
        const response = await axios.post(
          "http://localhost:5113/api/User/signUp",
          user
        );
        console.log(response);

        if (response.status === 201) {
       
          navigate("/logIn");
        } else {
         
          handleShow();


          console.error("Registration failed:", response.statusText);
        }
      } else {
        console.log("Not logdedIn");
      }
    } catch (error) {
      setError(error && error.response.data.errors.Username);
      handleShow();
      console.error("Error during registration:", error.response.data.errors.Username);
    }
  };


  const validate = (formValues) => {
    const errors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!formValues.username) {
      errors.username = "empty username";
    }
    if (!formValues.email) {
      errors.email = "empty email";
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = "This is not a valid email format"; // Fix here
    }
    if (!formValues.password) {
      errors.password = "empty password";
    } else if (formValues.password.length <= 4) {
      errors.password = "password length is too short";
    } else if (formValues.password.length >= 10) {
      errors.password = "password length should not exceed more than 10 digits"; // Fix here
    }
    if (!formValues.confirmPassword) {
      errors.confirmPassword = "empty Confirm password";
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Password is not matching";
    }
    return errors;
  };

  return (
    <div className="container mt-5 text-center ">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{error}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Try With Another User Name</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p className='errors'>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p className='errors'>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p className='errors'>{formErrors.password}</p>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <p className='errors'>{formErrors.confirmPassword}</p>
          <button className="btn btn-primary" type="submit">Submit</button>

        </div>
      </form>
    </div>
  );
};
export default SignUp;

