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
import Transactions from './component/Transaction/Transactions';
import Main from './component/Main/Main';
import './App.css';

function App() {


  const storedApiResponse = !!JSON.parse(localStorage.getItem('apiResponse'));
  const userRole = storedApiResponse.userRole;

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

            element={isLoggedIn ? (
              userRole === 'customer'||'admin' ? <Vehicle /> : <Navigate to='/dashboard' /> ) : <Navigate to='/logIn' />}
          />


          <Route
            path="/vehicle/addvehicle"

            element={isLoggedIn ? (userRole === 'customer'||'admin' ? <AddVehicle /> : <Navigate to='/dashboard' />) : <Navigate to='/logIn' />}
          />

          <Route
            path="/vehicle/editvehicle/:vehicleId"

            element={isLoggedIn ?( userRole === 'customer'||'admin' ?  <EditVehicle /> : <Navigate to='/dashboard' />)  : <Navigate to='/logIn' />}
          />

          <Route
            path="/plan"

            element={isLoggedIn ? ( userRole === 'vendor'||'admin'? <Plan /> : <Navigate to='/dashboard' /> ): (<Navigate to='/logIn' />)}
          />

          <Route
            path="/plan/addplan"

        
            element={isLoggedIn ? ( userRole === 'vendor'||'admin'? <AddPlan /> : <Navigate to='/dashboard' /> ): (<Navigate to='/logIn' />)}

          />
          <Route
            path="/plan/editplan/:planId"

          
            element={isLoggedIn ? ( userRole === 'vendor'||'admin'?  <EditPlan />  : <Navigate to='/dashboard' /> ): (<Navigate to='/logIn' />)}

          />
          <Route
            path="/transactions"

          
            element={isLoggedIn ? ( userRole === 'customer'||'vendor'||'admin'?  <Transactions />  : <Navigate to='/dashboard' /> ): (<Navigate to='/logIn' />)}

          />



        </Routes>


      </Router>
    </div>
  );
}

export default App;