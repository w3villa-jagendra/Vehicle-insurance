import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Image } from "react-bootstrap";
import NavbarProfile from "../NavbarProfile/NavbarProfile";
import Footer from "../Footer/Footer";
import "./Users.css";
const User = () => {
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);


    const buttons = [1, 2, 3, 4, 5]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5113/api/Admin/Users/${currentPage}`);

                const newData = response.data;


                if (newData && newData.users) {



                    setData(newData);
                } else {
                    console.log('Invalid data structure:', newData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    console.log(data);

    console.log(currentPage)
    return (
        <>
            <NavbarProfile />
            <Container className="mb-5">
                <div className="card-container d-flex flex-wrap justify-content-center">
                    <Card className="m-3" style={{ width: '60rem' }}>
                        <Card.Body>
                            {data.users && data.users.map((user) => (
                                <Card className="my-3" key={user.id}>

                                    <Card.Header className="d-flex justify-content-between">

                                        <Card.Title>{user.username}</Card.Title>
                                        <Card.Text>{`User Role: ${user.userRole}`}</Card.Text>
                                    </Card.Header>
                                    <Card.Body className="d-flex" style={{ textAlign: 'center', width: '45%' }}>

                                        <div className="userProfile">
                                            <Image
                                                src="https://via.placeholder.com/100x100" // URL for your placeholder image
                                                alt="User Avatar"
                                                rounded
                                                className="mb-3"
                                            />
                                            <Card.Text>{` ${user.firstName} ${user.lastName}`}</Card.Text>
                                        </div>


                                        <div className="userDetail" style={{ textAlign: 'center', width: '55%' }}>
                                            <Card.Text>{`Email: ${user.email}`}</Card.Text>

                                            <Card.Text>{`Phone Number: ${user.phoneNumber || 'N/A'}`}</Card.Text>
                                            <Card.Text>{`Phone Number: ${user.phoneNumber || 'N/A'}`}</Card.Text>
                                            <Card.Text>{`Phone Number: ${user.phoneNumber || 'N/A'}`}</Card.Text>

                                        </div>


                                        {/* Add more card content as needed */}
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </div>
                <div className="page-btn m-5 d-flex justify-content-center">

                    <Button className="mb-5 mx-5" onClick={handlePrevClick} disabled={currentPage === 1}>Prev</Button>
                 
                    {Array.from({ length: data.pages }, (_, index) => (
                        <li key={index} className="mx-3 list-group-item" style={{color: currentPage === index + 1 ? 'blue' : 'black',fontWeight: currentPage === index + 1 ? 'bold' : 'normal'}} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </li>
                    ))}

                    <Button className="mb-5 mx-5" onClick={handleNextClick}>Next</Button>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default User;
