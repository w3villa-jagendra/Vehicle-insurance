import React, { useState,useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../utils/userContext";
import axios from "axios";

import "./LogInSignUp.css";
const SignUp= () => {

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const {signUp,user} = useContext(userContext);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate= useNavigate();
  useEffect(() => {
    const submitData = async () => {
      try {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
     
          const response = await axios.post('http://localhost:5113/api/User', user);
  
         
          console.log(response);
  
       
          navigate('/logIn');
        }
      } catch (error) {
        
        console.error('Error submitting data:', error);
      }
    };
  
    submitData();
  }, [formErrors, isSubmit]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0){

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
      errors.email = "This is not a valid email format"; 
    }
    if (!formValues.password) {
      errors.password = "empty password";
    } else if (formValues.password.length <= 4) {
      errors.password = "password length is too short";
    } else if (formValues.password.length >= 10) {
      errors.password = "password length should not exceed more than 10 digits"; 
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
          <p className ='errors'>{formErrors.username}</p>
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
          <p className ='errors'>{formErrors.email}</p>
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
          <p className ='errors'>{formErrors.password}</p>
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
          <p className ='errors'>{formErrors.confirmPassword}</p>
          <button className="fuild ui button blue">Submit</button>

            </div>
      </form>
    </div>
  );
};
export default SignUp;









// import React, { useState } from "react";
// import { Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './LogInSignUp.css';

// function SignUp() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });
//     const [showAlert, setShowAlert] = useState(false);
//     const [alertVariant, setAlertVariant] = useState('success'); // To track alert variant
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));

//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (formData.password === formData.confirmPassword) {
//             // Passwords match, store only password in local storage
//             localStorage.setItem('name', formData.name);
//             localStorage.setItem('email', formData.email);
//             localStorage.setItem('password', formData.password);
//             setShowAlert(true);
//             setAlertVariant('success');
//             navigate('/');
//         } else {
//             // Passwords do not match
//             setShowAlert(true);
//             setAlertVariant('danger');
//         }

//         // Automatically hide the alert after 3 seconds
//         setTimeout(() => {
//             setShowAlert(false);
//         }, 3000);
//     };

//     return (
//         <div className="main">
//             {showAlert && (
//                 <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
//                     {alertVariant === 'success' ? 'Password stored successfully!' : 'Passwords do not match!'}
//                 </Alert>
//             )}
//             <div className="signUp-box">
//                 <h1 className="text-center">SignUp</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="name">Name:</label>
//                         <input type="text" id="name" name="name" required onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email">Email:</label>
//                         <input type="email" id="email" name="email" required onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password:</label>
//                         <input type="password" id="password" name="password" required onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="confirmPassword">Confirm Password:</label>
//                         <input type="password" id="confirmPassword" name="confirmPassword" required onChange={handleChange} />
//                     </div>
//                     <div className="button">
//                         <button type="submit" className="submit-btn">Sign Up</button>
                       
//                     </div>

//                 </form>

//             </div>
//         </div>
//     )
// }

// export default SignUp;
