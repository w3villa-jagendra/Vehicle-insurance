import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Footer from '../Footer/Footer';
import HomePic from '../../assets/img/43023.jpg'

function Home() {

    return (
        <>

            <Container>
                <h1 id='mainHead' className='text-center mt-5'> Get Your Car Insured</h1>
                <Image src={HomePic} fluid />


                <Row>
                    <Col className='d-flex' xs={12} md={6} >
                        <Card style={{ width: '18rem' }} className='m-3 '>
                            <Card.Img variant="top" src="https://img.freepik.com/free-vector/car-accessories-concept-illustration_114360-7487.jpg?w=1380&t=st=1702898908~exp=1702899508~hmac=b90db84c9d71e64745cb674d668bb6af5395424e7d0fb615a0970911758b0fa1" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>

                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }} className='m-3 '>
                            <Card.Img variant="top" src="https://img.freepik.com/free-vector/umbrella-covering-cartoon-car-insurance-agent-female-driver-assurance-safety-case-accident-help-with-insurance-policy-accident-flat-vector-illustration-security-assistance-concept_74855-22085.jpg?w=996&t=st=1702897826~exp=1702898426~hmac=ee5d79c9984fb020e4c7e2df1fc8402d28ddec24a5937c1270407cbf3ca392c4" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className=' d-flex' xs={12} md={6}>

                        <Card style={{ width: '18rem' }} className='m-3 '>
                            <Card.Img variant="top" src="https://img.freepik.com/free-vector/car-accessories-concept-illustration_114360-7487.jpg?w=1380&t=st=1702898908~exp=1702899508~hmac=b90db84c9d71e64745cb674d668bb6af5395424e7d0fb615a0970911758b0fa1" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>

                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }} className='m-3 '>
                            <Card.Img variant="top" src="https://img.freepik.com/free-vector/umbrella-covering-cartoon-car-insurance-agent-female-driver-assurance-safety-case-accident-help-with-insurance-policy-accident-flat-vector-illustration-security-assistance-concept_74855-22085.jpg?w=996&t=st=1702897826~exp=1702898426~hmac=ee5d79c9984fb020e4c7e2df1fc8402d28ddec24a5937c1270407cbf3ca392c4" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Home;