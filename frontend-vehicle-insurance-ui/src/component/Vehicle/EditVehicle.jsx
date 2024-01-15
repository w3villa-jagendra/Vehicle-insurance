import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarProfile from '../NavbarProfile/NavbarProfile';
import { useParams } from 'react-router-dom';

function EditVehicle() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
                                  
        vehicleType:'',
        engineNumber:'',
        vehicleNumber:''
      
    });

    const navigate = useNavigate();
    const { vehicleId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {

                const token = localStorage.getItem('authToken'); // Replace 'yourTokenKey' with the actual key you use to store the token
                const response = await Axios.get(`http://localhost:5113/api/Vehicle/${vehicleId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                // const response = await Axios.get(`http://localhost:5113/api/Plan/${vehicleId}`);

                const getVehicleData = response.data;
                console.log(response.data);
                setFormData({
                    vehicleType: getVehicleData.vehicleType,
                    engineNumber: getVehicleData.engineNumber,
                    vehicleNumber: getVehicleData.vehicleNumber,
                   

                })

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [vehicleId]);


    console.log(vehicleId)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        const token = localStorage.getItem('authToken');
        const form = event.currentTarget;

        if (!token) {
            console.error('Token not available');
            return;
        }


        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            try {


                const basePrice = formData.basePrice;
                if (basePrice < 100 || basePrice > 10000) {
                    // Display an error message or alert the user
                    alert('Base price must be between 100 and 10000');
                    return;
                }

                // Make a POST request to the API endpoint with the form data

                const token = localStorage.getItem('authToken'); 
                const editPlanApi = `http://localhost:5113/api/Vehicle/${vehicleId}`;



                Axios.put(editPlanApi, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                    .catch(error => {
                        console.error('API request error:', error);
                    });

                navigate('/vehicle');
                // If the request is successful, you can handle the response or perform any other actions
                console.log('Data submitted successfully');
            } catch (error) {
                // Handle error
                console.error('Error submitting data:', error);
            }
        }

        setValidated(true);
    };

    return (

        <>
            <NavbarProfile />
            <Container className='my-5'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                            <Form.Label>Engine Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="engineNumber"
                                value={formData.engineNumber}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Vehicle Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="vehicleNumber"
                                value={formData.vehicleNumber}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
               
                    <Button type="submit">Save Changes</Button>
                </Form>
            </Container>
        </>
    );
}

export default EditVehicle;
