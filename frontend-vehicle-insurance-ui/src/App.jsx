// import React, { useState } from 'react';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from './component/LoginSignUp/SignUp';
import Login from './component/LoginSignUp/LogIn';
import Dashboard from './component/DashBoard/Dashboard';
import Main from './component/Main/Main';

import './App.css';

function App() {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Main />}
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
          <Route
            path="/dashboard"
            // element={<LogInSignUp handleClose={handleClose} show={show} />}
            element={<Dashboard/>}
          />
        </Routes>


      </Router>
    </div>
  );
}

export default App;