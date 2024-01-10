import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Card, Form, FormControl, Button, Image } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



const Dashboard = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5113/api/Plan');
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plan data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBuyButtonClick = (plan) => {
    console.log(`Buy button clicked for Plan ID ${plan.planId}`);
  };

  const handleProfile = () => {

    const token = localStorage.getItem('authToken');


    if (!token) {

      console.error('Token not available');
      return;
    }


    const apiUrl = 'http://localhost:5113/api/User/profile';


    axios.get(apiUrl, {
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
  };


  const handleLogout = () => {
    localStorage.removeItem('authToken');

    navigate("/");

  };

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" className="font-weight-bold">
            Your Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>Home</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Edit Profile</NavDropdown.Item>
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

      {/* Main Content */}
      <Container fluid className="content-center">
        <div className="card-container d-flex flex-wrap mx-5">
          {plans.map(plan => (
            <Card key={plan.planId} style={{ width: '30rem', margin: '10px' }}>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  {plan.vehicleType}
                  <Image
                    src="https://via.placeholder.com/100x50" // URL for your placeholder image
                    alt="Vehicle Type Placeholder"
                    rounded
                    className="mr-3"
                  />
                </Card.Title>
                <Card.Text>
                  <strong>Company Name:</strong> {plan.companyName}
                  <br />
                  <strong>Plan Details:</strong> {plan.planDetails}
                  <br />
                  <strong>Base Price:</strong> Rs.{plan.basePrice}
                </Card.Text>
                <Card.Footer className="d-flex flex-row-reverse">
                  <Button variant="primary" className="px-4" onClick={() => handleBuyButtonClick(plan)}>
                    Buy
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
