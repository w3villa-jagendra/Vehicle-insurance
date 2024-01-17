import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './component/LoginSignUp/SignUp';
import Login from './component/LoginSignUp/LogIn';
import Dashboard from './component/DashBoard/Dashboard';
import Profile from './component/Profile/Profile';
import Vehicle from './component/Vehicle/Vehicle';
import Plan from './component/Plan/Plan';
import AddVehicle from './component/Vehicle/AddVehicle';
import EditVehicle from './component/Vehicle/EditVehicle';
import AddPlan from './component/Plan/AddPlan';
import EditPlan from './component/Plan/EditPlan'
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
            element={<SignUp />}
          />
          <Route
            path="/logIn"
            // element={<LogInSignUp handleClose={handleClose} show={show} />}
            element={<Login />}
          />

          <Route
            path="/dashboard"
            // element={<LogInSignUp handleClose={handleClose} show={show} />}
            element={isLoggedIn ? <Dashboard /> : <Navigate to='/logIn' />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/vehicle"
            // element={<Vehicle/>}
            element={isLoggedIn ? <Vehicle /> : <Navigate to='/logIn' />}
          />


          <Route
            path="/addvehicle"
            // element={<Vehicle/>}
            element={isLoggedIn ? <AddVehicle /> : <Navigate to='/logIn' />}
          />

          <Route
            path="/vehicle/editvehicle/:vehicleId"
            // element={<Vehicle/>}
            element={isLoggedIn ? <EditVehicle /> : <Navigate to='/logIn' />}
          />

          <Route
            path="/plan"
            // element={<Vehicle/>}
            element={isLoggedIn ? <Plan /> : <Navigate to='/logIn' />}
          />

          <Route
            path="/plan/addplan"
            // element={<Vehicle/>}
            element={isLoggedIn ? <AddPlan /> : <Navigate to='/logIn' />}
          />
          <Route
            path="/plan/editplan/:planId"
            // element={<Vehicle/>}
            element={isLoggedIn ? <EditPlan /> : <Navigate to='/logIn' />}
          />



        </Routes>


      </Router>
    </div>
  );
}

export default App;