import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import ManageRoom from "./pages/manageroom/ManageRoom";
import ManageAppliance from "./pages/manageappliance/ManageAppliance";
import ApplianceDetail from "./pages/appliancedetail/ApplianceDetail";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Optimize from "./pages/optimize/Optimize";
function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
