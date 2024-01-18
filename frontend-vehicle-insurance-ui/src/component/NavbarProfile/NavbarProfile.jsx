import React, { useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from "react-bootstrap";


const NavbarProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
        // console.log('API response:', response.data);
        localStorage.setItem('apiResponse', JSON.stringify(response.data));





      })
      .catch(error => {
        console.error('API request error:', error);
      });
  }, []);

  const storedApiResponse = JSON.parse(localStorage.getItem('apiResponse'));
  // Extract userRole from apiResponse
  const userRole = storedApiResponse.userRole;
 



  const handleShowVehicle = () => {
    navigate("/vehicle");
  }

  const handleHome = () => {
    navigate("/dashboard");
  }

  const handleProfile = () => {
    navigate("/profile");
  }

  const handleShowPlans = () => {
    navigate("/plan")
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('apiResponse');
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
              {userRole === 'customer' && (
                <NavDropdown.Item onClick={handleShowVehicle}>Vehicles</NavDropdown.Item>
              )}
              {userRole === 'vendor' && (
                <NavDropdown.Item onClick={handleShowPlans}>Plans</NavDropdown.Item>
              )}
              {userRole === 'admin' && (
                <>
                  <NavDropdown.Item onClick={handleShowVehicle}>Vehicles</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleShowPlans}>Plans</NavDropdown.Item>
                </>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>

            </NavDropdown>
            <Nav.Link href="#">Settings</Nav.Link>
          </Nav>
          <Form inline className="d-flex">
            <FormControl type="text" placeholder="Search" />
            <Button variant="light" className="mx-3">
              Search
            </Button>
            {/* {vehicle && <Button variant="light" >
            Add 
            </Button>} */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarProfile