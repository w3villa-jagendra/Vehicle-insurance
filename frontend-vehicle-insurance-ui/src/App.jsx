import React, { useState } from 'react';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/Navbar/Navbar';
import SignUp from './component/LoginSignUp/SignUp';
import Login from './component/LoginSignUp/LogIn';
import ApiData from './component/ApiData/ApiData'
import Home from './component/Home/Home';

import './App.css';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <ApiData />
              </>
            }
          />
          <Route
            path="/signUp"
            // element={<LogInSignUp handleClose={handleClose} show={show} />}
            element={<SignUp/>}
          />
          <Route
            path="/logIn"
            // element={<LogInSignUp handleClose={handleClose} show={show} />}
            element={<Login/>}
          />
        </Routes>


      </Router>
    </div>
  );
}

export default App;
