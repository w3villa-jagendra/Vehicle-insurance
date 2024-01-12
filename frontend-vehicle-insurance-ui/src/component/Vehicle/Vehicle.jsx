import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Image } from "react-bootstrap";

import Axios from 'axios';

import NavbarProfile from '../NavbarProfile/NavbarProfile'
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Vehicle = () => {

    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);

    const handleAddVehicle = () => {
        navigate("/addvehicle");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('http://localhost:5113/api/Vehicle');
                setPlans(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <>
            <NavbarProfile />

            <Container  ><Button className='my-3 px-5' onClick={handleAddVehicle} >Add Vehicle</Button></Container>

            <Container fluid className="content-center">

                <div className="card-container d-flex flex-wrap mx-5 content-center">
                    {plans.map(plan => (
                        <Card key={plan.vehicleId} style={{ width: '30rem', margin: '10px' }}>
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
                                    <strong>Vehicle ID:</strong> {plan.vehicleId}
                                    <br />
                                    <strong>Engine Number:</strong> {plan.engineNumber}
                                    <br />
                                    <strong>Vehicle Number:</strong> {plan.vehicleNumber}
                                    {/* Add other properties you want to display */}
                                </Card.Text>
                                <Card.Footer className="d-flex flex-row-reverse">
                                    <Button variant="primary" className="px-4" >
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



    )
}

export default Vehicle