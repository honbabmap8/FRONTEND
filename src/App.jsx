import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Map from "./pages/Map";
import Home from "./pages/Home";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/map"
          element={<Map />}
        />
        <Route
          path="/result"
          element={<Result />}
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