import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { RegisterProvider } from "./context/RegisterContext";

import Map from "./pages/Map";
import Login from "./pages/Login";
import RegisterStep1 from "./pages/RegisterStep1";
import RegisterStep2 from "./pages/RegisterStep2";
import EatBTI from "./pages/EatBTI";
import BtiResult from "./pages/BtiResult";
import MyPage from "./pages/MyPage";
import Review from "./pages/Review";

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
          <Route path="/bti/result/:level" element={<BtiResult />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/questionlist" element={<Review />} />
        </Routes>
      </RegisterProvider>
    </BrowserRouter>
  );
}

export default App;
