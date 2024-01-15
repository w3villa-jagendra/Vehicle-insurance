// Plan.jsx
import React, { useState, useEffect } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import Axios from 'axios';
import NavbarProfile from '../NavbarProfile/NavbarProfile';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';


const Plan = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);

    const handleAddPlan = () => {
        navigate('/plan/addplan');
    };

    const handleEditPlan = (id) => {
        navigate(`/plan/editplan/${id}`);
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('apiResponse')).userId;
                const response = await Axios.get(`http://localhost:5113/api/Plan/user/${userId}`);
                const sortedPlans = response.data.sort((a, b) => b.planId - a.planId);
                setPlans(sortedPlans);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <NavbarProfile />

            <Container>
                <Button className="my-3 px-5" onClick={handleAddPlan}>
                    Add Plan
                </Button>
            </Container>

            <Container fluid className="content-center">
                <div className="card-container d-flex flex-wrap m-5 content-center">
                    {plans.map(plan => (
                        <Card key={plan.planId} style={{ width: '30rem', margin: '10px' }}>
                            <Card.Body>
                                <Card.Title>{plan.vehicleType}</Card.Title>
                                <Card.Text>
                                    <strong>Plan ID:</strong> {plan.planId}
                                    <br />
                                    <strong>Company Name:</strong> {plan.companyName}
                                    <br />
                                    <strong>Plan Details:</strong> {plan.planDetails}
                                    <br />
                                    <strong>Base Price:</strong> {plan.basePrice}
                                </Card.Text>
                                <Card.Footer className="d-flex flex-row-reverse">
                                    <Button variant="primary" className="px-4" onClick={() => handleEditPlan(plan.planId)}>
                                        Edit
                                    </Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>

            <Footer />
        </>
    );
};

export default Plan;
