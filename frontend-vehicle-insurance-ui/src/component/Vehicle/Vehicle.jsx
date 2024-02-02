import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Image } from "react-bootstrap";

import Axios from 'axios';

import NavbarProfile from '../NavbarProfile/NavbarProfile'
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Vehicle = () => {

    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);

    const handleAddVehicle = () => {
        navigate("/vehicle/addvehicle");
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const userId = JSON.parse(localStorage.getItem('apiResponse')).userId;

               
                const response = await Axios.get(`http://localhost:5113/api/Vehicle/user/${userId}`);

                const sortedVehicles = response.data.sort((a, b) => b.vehicleId - a.vehicleId);
                setVehicles(sortedVehicles);    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditPlan = (id)=>{
        navigate(`/vehicle/editvehicle/${id}`);
    }



    return (
        <>
            <NavbarProfile />

            <Container  ><Button className='my-3 px-5' onClick={handleAddVehicle} >Add Vehicle</Button></Container>

            <Container fluid className="content-center">

                <div className="card-container d-flex flex-wrap m-5 content-center">
                    {vehicles.map(vehicle => (
                        <Card key={vehicle.vehicleId} style={{ width: '30rem', margin: '10px' }}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    {vehicle.vehicleType}
                                    <Image
                                        src="https://via.placeholder.com/100x50" // URL for your placeholder image
                                        alt="Vehicle Type Placeholder"
                                        rounded
                                        className="mr-3"
                                    />
                                </Card.Title>
                                <Card.Text>
                                    <strong>Vehicle ID:</strong> {vehicle.vehicleId}
                                    <br />
                                    <strong>Engine Number:</strong> {vehicle.engineNumber}
                                    <br />
                                    <strong>Vehicle Number:</strong> {vehicle.vehicleNumber}
                                    
                                </Card.Text>
                                <Card.Footer className="d-flex flex-row-reverse">
                                    <Button variant="primary" className="px-4" onClick={() => handleEditPlan(vehicle.vehicleId)} >
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