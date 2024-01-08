// Dashboard.jsx

import React from "react";
// import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" className="font-weight-bold">
            Your Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {/* <Link to="/" className=''>Home</Link> */}
              <Nav.Link >Home</Nav.Link>
              <Nav.Link href="#">Profile</Nav.Link>
              <Nav.Link href="#">Settings</Nav.Link>
            </Nav>
            {/* Search Bar */}
            <Form inline className="d-flex  ">
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="light" className="mx-3  ">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid>
        {/* ... (rest of the code remains unchanged) */}
      </Container>
    </div>
  );
};

export default Dashboard;
