import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { RegisterProvider } from "./context/RegisterContext";

import Map from "./pages/Map";
import Login from "./pages/Login";
import RegisterStep1 from "./pages/RegisterStep1";
import RegisterStep2 from "./pages/RegisterStep2";
import EatBTI from "./pages/EatBTI";

function App() {
  return (
    <BrowserRouter>
      <RegisterProvider>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterStep1 />} />
          <Route path="/register/step2" element={<RegisterStep2 />} />
          <Route path="/register/eatbti" element={<EatBTI />} />
        </Routes>
      </RegisterProvider>
    </BrowserRouter>
  );
}

export default App;
