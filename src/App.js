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
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./pages/auth/RequireAuth";
import Navbar from "./components/Navbar";

import NotFound from "./test/NotFound";
import { useStore } from "./store/AppProvider";
function App() {
  const { loading } = useStore();
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
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
export default App;

// import React, { useState, useEffect, useContext } from "react";
// import { useStore } from "./store/useStore";
// import "./App.css";
// const App = () => {
//   const [quote, setQuote] = useState({});
//   const { state, dispatch } = useStore();
//   const getRandomQuote = () => {
//     dispatch({ type: "changeLoading" });
//     fetch("https://api.quotable.io/random")
//       .then((res) => res.json())
//       .then((data) => {
//         dispatch({ type: "changeLoading" });
//         setQuote(data);
//       });
//   };

//   return (
//     <div className="container">
//       {state.loading ? (
//         <div className="loader-container">
//           <div className="spinner"></div>
//           <div class="loader"></div>
//         </div>
//       ) : (
//         <></>
//       )}
//       <div className="main-content">
//         <h1>Hello World!</h1>
//         <p>
//           This is a demo Project to show how to add animated loading with React.
//         </p>
//         <div className="buttons">
//           <button className="btn">
//             <a href="#">Read Article</a>
//           </button>
//           <button className="btn get-quote" onClick={getRandomQuote}>
//             Generate Quote
//           </button>
//         </div>
//         <div className="quote-section">
//           <blockquote className="quote">{quote.content}</blockquote>-{" "}
//           <span className="author">{quote.author}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
