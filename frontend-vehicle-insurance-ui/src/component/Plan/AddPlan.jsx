import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import NavbarProfile from '../NavbarProfile/NavbarProfile';

function FormExample() {


    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);



    // const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        userId: userId,
        vehicleType: '',
        companyName: '',
        planDetails: '',
        basePrice: null,
    });



    const storedData = localStorage.getItem('apiResponse');
    const parsedData = JSON.parse(storedData);

    useEffect(() => {

        if (storedData) {

            setUserId(parsedData.userId);
            setFormData((prevFormData) => ({
                ...prevFormData,
                userId: parsedData.userId,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(formData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const basePrice = formData.basePrice;
            if (basePrice < 100 || basePrice > 10000) {
               
                alert('Base price must be between 100 and 10000');
                return;
            }
    
           
            
            const response = await Axios.post('http://localhost:5113/api/Plan', formData);
    
            if (response.status === 201) {
                navigate('/plan')
            }
        } catch (error) {
            // Handle error
            console.error('Error submitting data:', error);
        }
    };
    


    return (

        <>
            <NavbarProfile />
            <Container className='my-5'>
                <h1 className='text-center'>Add New Plan</h1>
                <Form >
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Vehicle Type</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Plan Details</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="planDetails"
                                value={formData.planDetails}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Base Price</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="basePrice"
                                value={formData.basePrice}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Button type="submit" onClick={handleSubmit}>Submit form</Button>
                </Form>
            </Container>
        </>
    );
}

export default FormExample;
