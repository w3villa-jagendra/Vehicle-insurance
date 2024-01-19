import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import NavbarProfile from '../NavbarProfile/NavbarProfile';
import Footer from '../Footer/Footer';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('apiResponse');
        const storedUser = JSON.parse(user);
        const userId = storedUser.userId;
         setUsername(storedUser.username);


         const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5113/api/Transaction/transactionInfo/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                
                const sortedTransactions = response.data.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        
                setTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        

        fetchData();
    }, []);

    return (
        <>
            <NavbarProfile />
            <Container className='mt-5'>
                <h2 className='text-center my-5'>{username} Transactions</h2>
                <Table striped bordered hover className='my-5' >
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Plan Details</th>
                            <th>Total Amount</th>
                            <th>Transaction Date</th>
                            <th>Vehicle Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.companyName}</td>
                                <td>{transaction.planDetails}</td>
                                <td>{transaction.totalAmount}</td>
                                <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                                <td>{transaction.vehicleNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Footer />
        </>
    );
};

export default Transactions;
