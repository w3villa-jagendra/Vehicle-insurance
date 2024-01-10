import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './component/LoginSignUp/SignUp';
import Login from './component/LoginSignUp/LogIn';
import Dashboard from './component/DashBoard/Dashboard';
import Main from './component/Main/Main';
import './App.css';

function App() {
  

  

  const isLoggedIn = !!localStorage.getItem('authToken');

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
            element={isLoggedIn ? <Dashboard /> : <Navigate to='/logIn' /> }
          />
        </Routes>


      </Router>
    </div>
  );
}

export default App;