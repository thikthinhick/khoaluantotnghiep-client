import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ApplianceDetail from "./pages/appliancedetail/ApplianceDetail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import { RequireAuth } from "./pages/auth/RequireAuth";
import ResetPassword from "./pages/auth/ResetPassword";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/error/NotFound";
import Home from "./pages/home/Home";
import ManageAppliance from "./pages/manageappliance/ManageAppliance";
import Statistic from "./pages/statistic/Statistic";
import ManageRoom from "./pages/manageroom/ManageRoom";
import Optimize from "./pages/optimize/Optimize";
import { useStore } from "./store/AppProvider";
import Setting from "./pages/setting/Setting";
import { useEffect, useState } from "react";
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
          <Route path="/" element={<Home />} />
          <Route path="room" element={<ManageRoom />} />
          <Route path="/room/:id" element={<ManageAppliance />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route
            path="/room/:roomId/appliance/:applianceId"
            element={<ApplianceDetail />}
          />
          <Route path="setting" element={<Setting />} />
          <Route path="optimize" element={<Optimize />} />
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
