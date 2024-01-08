import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../utils/userContext";
import axios from "axios";
import "./LogInSignUp.css";
const SignUp = () => {

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    vendor:false,
    customer:false
    
  });

  const { signUp, user } = useContext(userContext);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();


  useEffect(() => {

    const registerUser = async () => {
      try {
        if (user.username) {
          // Use Axios to send the POST request
          const response = await axios.post(
            "http://localhost:5113/api/User/signUp",
            user
          );

          // Check if the registration was successful
          if (response.status === 201) {
            // Redirect the user to the login page
            navigate("/logIn");
          } else {
            // Registration failed, handle errors
            console.error("Registration failed:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    };

    registerUser();
  }, [formErrors,user, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
 

    if (Object.keys(formErrors).length === 0) {
      signUp(formValues)

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
          <button className="btn btn-primary">Submit</button>

        </div>
      </form>
    </div>
  );
};
export default SignUp;

