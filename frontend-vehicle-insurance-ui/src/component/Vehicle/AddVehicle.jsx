import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import NavbarProfile from '../NavbarProfile/NavbarProfile';
import Footer from '../Footer/Footer';

const AddVehicle = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        userId: userId,
        vehicleType: "",
        engineNumber: "",
        vehicleNumber: "",
    });

    useEffect(() => {
        const storedData = localStorage.getItem('apiResponse');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserId(parsedData.userId);
            setFormData((prevFormData) => ({
                ...prevFormData,
                userId: parsedData.userId,
            }));
        }
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:5113/api/Vehicle', formData);

            console.log('Data posted successfully:', response);

            if (response.status === 201) {
                navigate('/vehicle');
            }
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server.');
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    return (
        <>
            <NavbarProfile />
            <Container className='my-5'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="vehicleType">
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="engineNumber">
                        <Form.Label>Engine Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="engineNumber"
                            value={formData.engineNumber}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="vehicleNumber">
                        <Form.Label>Vehicle Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="vehicleNumber"
                            value={formData.vehicleNumber}
                            onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="my-3">
                        Submit
                    </Button>
                </Form>
            </Container>
            
            <Footer/>
        </>
    );
};

export default AddVehicle;
