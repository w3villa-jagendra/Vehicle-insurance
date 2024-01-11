import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from "react-bootstrap";


const NavbarProfile = () => {
    const navigate = useNavigate();


    const handleShowVehicle = ()=>{
        navigate("/vehicle");
      }

    const handleHome =()=>{
        navigate("/dashboard")
    }
      
    
    
      const handleProfile = () => {
    
        const token = localStorage.getItem('authToken');
    
        
        if (!token) {
    
          console.error('Token not available');
          return;
        }
    
    
        const apiPlan = 'http://localhost:5113/api/User/profile';
    
    
        axios.get(apiPlan, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
    
            console.log('API response:', response.data);
          })
          .catch(error => {
    
            console.error('API request error:', error);
          });
    
          navigate("/profile");
      };
    
    
      const handleLogout = () => {
        localStorage.removeItem('authToken');
    
        navigate("/");
    
      };
    
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="#" className="font-weight-bold">
        Your Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={handleHome}>Home</Nav.Link>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleProfile}>Edit Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleShowVehicle}>Vehicles</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#">Settings</Nav.Link>
        </Nav>
        <Form inline className="d-flex">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="light" className="mx-3">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavbarProfile