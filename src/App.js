import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import ManageRoom from "./pages/manageroom/ManageRoom";
import ManageAppliance from "./pages/manageappliance/ManageAppliance";
import ApplianceDetail from "./pages/appliancedetail/ApplianceDetail";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Schedule from "./pages/schedule/Schedule";
import Optimize from "./pages/optimize/Optimize";
import EditSchedule from "./pages/schedule/EditSchedule";
import { Link, Outlet } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <h1>TodoApp</h1>
      <nav>
        <Link to="home">Home</Link>
        {" | "}
        <Link to="product">Product</Link>
        {" | "}
        <Link to="about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
