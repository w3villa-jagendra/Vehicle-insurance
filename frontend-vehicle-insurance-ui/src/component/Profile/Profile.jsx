import React, { useState } from "react";
import NavbarProfile from "../NavbarProfile/NavbarProfile";
import Footer from "../Footer/Footer";
const Profile = () => {
  const [profileValues, setProfileValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
   
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileValues({ ...profileValues, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
   
    const errors = {};
    Object.keys(profileValues).forEach((key) => {
      if (!profileValues[key]) {
        errors[key] = `Please provide ${key}`;
      }
    });
    setFormErrors(errors);

   
    if (Object.keys(errors).length === 0) {
    
      console.log("Submitting profile form:", profileValues);
    }
  };

  return (
    <>
    <NavbarProfile/>
      <form onSubmit={handleSubmit}>
      <h1 className="text-center">User Profile</h1>
      <div className="ui divider"></div>
      <div className="ui form container">
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={profileValues.firstName}
            onChange={handleChange}
          />
        </div>
        <p className="errors">{formErrors.firstName}</p>

        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={profileValues.lastName}
            onChange={handleChange}
          />
        </div>
        <p className="errors">{formErrors.lastName}</p>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={profileValues.email}
            onChange={handleChange}
          />
        </div>
        <p className="errors">{formErrors.email}</p>

        <div className="field">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={profileValues.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <p className="errors">{formErrors.phoneNumber}</p>

      

        <button className="btn btn-primary" type="submit">
          Update Profile
        </button>
      </div>
    </form>
    <Footer/>
    </>
  
  );
};

export default Profile;
