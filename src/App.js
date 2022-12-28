import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import ManageRoom from "./pages/manageroom/ManageRoom";
import ManageAppliance from "./pages/manageappliance/ManageAppliance";

function App() {
  return (
    <div className="App">
      <ManageAppliance />
    </div>
  );
}

export default App;
