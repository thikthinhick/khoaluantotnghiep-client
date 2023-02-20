import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import ManageRoom from "./pages/manageroom/ManageRoom";
import ManageAppliance from "./pages/manageappliance/ManageAppliance";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ApplianceDetail from "./pages/appliancedetail/ApplianceDetail";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Schedule from "./pages/schedule/Schedule";
import Optimize from "./pages/optimize/Optimize";
import EditSchedule from "./pages/schedule/EditSchedule";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./pages/auth/RequireAuth";
import Navbar from "./components/Navbar";
import "./App.css";
import NotFound from "./pages/error/NotFound";
import ResetPassword from "./pages/auth/ResetPassword";
import { useStore } from "./store/AppProvider";
import { Navigate } from "react-router-dom";
function App() {
  const { loading, user } = useStore();
  return (
    <div className="App">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <div class="loader"></div>
        </div>
      ) : (
        <></>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Navbar />
            </RequireAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="room" element={<ManageRoom />} />
          <Route path="appliance" element={<ManageAppliance />} />
        </Route>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
