import React, { useEffect, useState } from "react";
import { Container, Card, Button, Image, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/Footer";
import NavbarProfile from "../NavbarProfile/NavbarProfile";


const Dashboard = () => {
  const [plans, setPlans] = useState([]);

  const [show, setShow] = useState(false);
  const [buyPlan, setbuyPlan] = useState({

    companyName: "",
    planDetails: "",
    vehicleType: "",
    basePrice: null

  });

  const [vehicles, setVehicles] = useState([]);
  const [transaction, setTransaction] = useState({
    userId: null,
    vehicleId: null,
    planId: null,
    totalAmount: null,
  })



  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('apiResponse');
  const storedUser = JSON.parse(user);
  const userId = storedUser.userId;


  // get the plan details on the load of the dashboard
  useEffect(() => {
    const fetchData = async () => {

      try {



        const response = await axios.get('http://localhost:5113/api/Plan', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const sortedPlans = response.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        setPlans(sortedPlans);
      } catch (error) {
        console.error('Error fetching plan data:', error);
      }

    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleClose = () => {

    setTransaction({
      userId: null,
      vehicleId: null,
      planId: null,
      totalAmount: null,
    })

    setShow(false);

  };

  const handleShow = () => {

    fetchVehicles();
    setShow(true);
  };



  // post the transaction to the bakend
  const buyTransaction = async () => {

    try {

      const response = await axios.post(`http://localhost:5113/api/Transaction`, transaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      if (response.status === 201) {
        alert(`You have buy a plan with the TransationId: ${data.transactionId}`);


      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  }


  // Get vehicle to show vehicle list
  const fetchVehicles = async () => {
    try {





      const response = await axios.get(`http://localhost:5113/api/Vehicle/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      setVehicles(response.data);


    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };



  //on buy button click show the modal , set plan and setTransaction details
  const handleBuyButtonClick = (plan) => {


    // console.log(userId);
    if (storedUser.userRole === "vendor") {
      alert("You Are a Vendor. /n You can Sell Plan Only!!!");
    }
    else {
      handleShow();

      setTransaction({
        ...transaction,
        userId: userId,
        planId: plan.planId,
        totalAmount: plan.basePrice,
      });

      setbuyPlan({
        companyName: plan.companyName,
        planDetails: plan.planDetails,
        vehicleType: plan.vehicleType,
        basePrice: plan.basePrice

      })
    }


  };



  // set the vehicleId of the selected plan
  const handleSelect = (e) => {
    const vId = e.target.value;

    setTransaction({
      ...transaction,
      vehicleId: vId,

    });
  };


  console.log(transaction);


  return (
    <div>
      <NavbarProfile />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company Name</Form.Label>
              <Form.Control readOnly
                type="text"
                placeholder="Company"
                value={buyPlan.companyName}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Plan Details</Form.Label>
              <Form.Control readOnly
                type="text"
                placeholder="Details"
                value={buyPlan.planDetails}
                autoFocus
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control readOnly
                type="text"
                placeholder="Rs"
                value={buyPlan.basePrice}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Vehicle</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => handleSelect(e)}>
                <option>Buy Plan for Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.vehicleId} value={vehicle.vehicleId} >
                    {vehicle.vehicleNumber}
                  </option>
                ))}

              </Form.Select>
            </Form.Group>



          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="primary" onClick={buyTransaction} >
            Buy Plan
          </Button>

        </Modal.Footer>
      </Modal>

      {/* Main Content */}
      <Container fluid className="content-center my-5" >
        <div className="card-container d-flex flex-wrap mb-5 content-center">
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
      <Footer />
    </div>
  );
};

export default Dashboard;
