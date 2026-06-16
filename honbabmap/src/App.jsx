import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Map from "./pages/Map";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/map"
          element={<Map />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;