import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { userContext } from '../../utils/userContext';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'



const NavBar = () => {
  const {user,setUser} = useContext(userContext)  
  const navigate = useNavigate()

  // const [userRole, setUserRole] = useState({ userRole: "" });

  useEffect(() => {
    // Retrieve userRole from localStorage when the component mounts
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUser({ ...user, userRole: storedUserRole });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = () => {
    setUser({ ...user, userRole: 'customer' });
    localStorage.setItem('userRole', 'customer'); 
    navigate("/signUp");
  }

  const handleSell = () => {
    setUser({ ...user, userRole: 'vendor' });
    localStorage.setItem('userRole', 'vendor');
    navigate("/signUp");
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
            <button  onClick={handleBuy} className='anch btn btn-primary text-white px-5'>Buy Plans</button>
            <button  onClick={handleSell} className='anch btn text-white px-5 mx-3 btn-danger'>Sell Plans</button>
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