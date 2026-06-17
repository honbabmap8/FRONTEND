import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import { RegisterProvider } from "./context/RegisterContext";

import BtiResult from "./pages/BtiResult";
import EatBTI from "./pages/EatBTI";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import MyPage from "./pages/MyPage";
import RegisterStep1 from "./pages/RegisterStep1";
import RegisterStep2 from "./pages/RegisterStep2";
import Result from "./pages/Result";
import Review from "./pages/Review";

function App() {
  return (
    <BrowserRouter>
      <RegisterProvider>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/map" element={<Map />} />
          <Route path="/home" element={<Home />} />
          <Route path="/main" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterStep1 />} />
          <Route path="/register/step2" element={<RegisterStep2 />} />
          <Route path="/register/eatbti" element={<EatBTI />} />
          <Route path="/bti/result/:level" element={<BtiResult />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/questionlist" element={<Review />} />
        </Routes>
      </RegisterProvider>
    </BrowserRouter>
  );
}

export default App;
