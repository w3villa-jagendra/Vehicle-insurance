import React, { useEffect, useState } from "react";
import { Container, Card,  Button, Image } from "react-bootstrap";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/Footer";
import NavbarProfile from "../NavbarProfile/NavbarProfile";



const Dashboard = () => {
  const [plans, setPlans] = useState([]);



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


 
  return (
    <div>
     <NavbarProfile />

      {/* Main Content */}
      <Container fluid  className="content-center">
        <div className="card-container d-flex flex-wrap mx-5 content-center">
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
      <Footer/>
    </div>
  );
};

export default Dashboard;
