import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { userContext } from '../../utils/userContext';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useContext } from 'react';



const NavBar = () => {

  const { user } = useContext(userContext);

  // const [userRole, setUserRole] = useState({ userRole: "" });

  const handleUserRole = () => {
    user.userRole = "customer"
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary " >
      <Container>
        <Navbar.Brand href="#home">Vehical-Insurance</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">


            <Link to="/" className='anch mx-3' >Home</Link>
            {/* <Link to="/" className='anch mx-3 btn btn-primary px-5' >Buy Plans</Link>
            <Link to="/" className='anch mx-3 btn btn-danger px-5' >Sell Plans</Link> */}
            <Link to="/signUp" onClick={handleUserRole} className='anch btn btn-primary px-5'  >Buy Plans</Link>
            <Link to="/logIn" className='anch' >Login</Link>


            {/* <NavDropdown title="Insurance Plan" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;